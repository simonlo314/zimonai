import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, lstatSync, readFileSync, renameSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const RETRY_DELAYS_MS = [2000, 5000];
const stripAnsi = value => value.replace(/\u001b\[[0-9;]*m/g, '');

export function isTransientExportFailure(result) {
  if (result.status === 0 || result.error) return false;
  const text = stripAnsi(`${result.stdout || ''}\n${result.stderr || ''}`);
  // This exact message is returned by D1's export service, not a SQL migration.
  // Never turn authentication, schema, configuration or unknown errors into retries.
  return /\bNetwork connection lost\./.test(text)
    && !/Authentication error|\b(?:7403|10000)\b|permission|not authorized|invalid (?:token|config)/i.test(text);
}

export function validateSqlBackup(output, expectedObjects) {
  if (!Array.isArray(expectedObjects) || expectedObjects.length === 0) {
    throw new Error('Backup validation requires the inspected remote schema inventory.');
  }
  const stat = lstatSync(output);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0 || (stat.mode & 0o777) !== 0o600) {
    throw new Error('Backup must be a non-empty private regular file (0600).');
  }
  const bytes = readFileSync(output);
  // D1 dumps may create referencing tables before their targets. Disable FK
  // enforcement only during this LOCAL in-memory restore, then check every FK.
  const database = new DatabaseSync(':memory:', { enableForeignKeyConstraints: false });
  try {
    try {
      database.exec(bytes.toString('utf8'));
      database.exec('PRAGMA foreign_keys = ON;');
    } catch {
      // Do not expose SQL or customer data through a SQLite error message.
      throw new Error('Backup SQL could not be restored locally.');
    }
    const integrity = database.prepare('PRAGMA integrity_check;').all();
    if (integrity.length !== 1 || Object.values(integrity[0])[0] !== 'ok') {
      throw new Error('Backup failed local SQLite integrity validation.');
    }
    if (database.prepare('PRAGMA foreign_key_check;').all().length) {
      throw new Error('Backup failed local foreign-key validation.');
    }
    const actual = new Set(database.prepare("SELECT name FROM sqlite_schema WHERE type IN ('table', 'index');").all().map(row => row.name));
    if (expectedObjects.some(name => !/^(_cf_|sqlite_)/.test(name) && !actual.has(name))) {
      throw new Error('Backup is missing objects from the inspected remote schema.');
    }
    return { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), objects: actual.size };
  } finally {
    database.close();
  }
}

export function exportDatabaseBackup({
  database, output, expectedObjects, wrangler, cwd,
  execute = spawnSync,
  pause = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds),
  report = console.log,
}) {
  if (existsSync(output)) throw new Error('Refusing to overwrite an existing backup.');
  for (let attempt = 1; attempt <= RETRY_DELAYS_MS.length + 1; attempt += 1) {
    const candidate = `${output}.attempt-${attempt}`;
    if (existsSync(candidate)) throw new Error('Refusing to overwrite a previous backup attempt.');
    report(`Full backup export: ${database}, attempt ${attempt}/3.`);
    const priorUmask = process.umask(0o077);
    let result;
    try {
      result = execute(wrangler, ['d1', 'export', database, '--remote', '--skip-confirmation', '--output', candidate], {
        cwd, env: process.env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 8 * 1024 * 1024,
      });
    } finally {
      process.umask(priorUmask);
    }
    // CLI output can contain a presigned download URL. Report only fixed status
    // messages, never raw output, SQL, credentials or signed URLs.
    if (!result.error && result.status === 0) {
      if (!existsSync(candidate)) throw new Error('Backup export reported success without a file.');
      const candidateStat = lstatSync(candidate);
      if (!candidateStat.isFile() || candidateStat.isSymbolicLink() || candidateStat.nlink !== 1) {
        throw new Error('Backup export did not produce a private standalone regular file.');
      }
      chmodSync(candidate, 0o600);
      const verified = validateSqlBackup(candidate, expectedObjects);
      if (existsSync(output)) throw new Error('Refusing to replace an existing backup.');
      renameSync(candidate, output);
      report(`Verified private backup: ${database}, ${verified.bytes} bytes, SHA-256 ${verified.sha256}, local restore/integrity/schema/FK checks passed.`);
      return verified;
    }
    if (!isTransientExportFailure(result) || attempt > RETRY_DELAYS_MS.length) {
      throw new Error(`Required full backup export failed for ${database} after ${attempt} attempt(s); production remains blocked.`);
    }
    const delay = RETRY_DELAYS_MS[attempt - 1];
    report(`D1 export service returned a transient connection loss for ${database}; retrying the full backup in ${delay / 1000}s. No migration or deployment has run.`);
    pause(delay);
  }
  throw new Error('Required backup was not verified; production remains blocked.');
}
