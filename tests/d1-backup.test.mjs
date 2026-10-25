import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { exportDatabaseBackup, isTransientExportFailure, validateSqlBackup } from '../scripts/d1-backup.mjs';

const sql = 'CREATE TABLE parent(id INTEGER PRIMARY KEY); CREATE TABLE child(id INTEGER PRIMARY KEY, parent_id INTEGER REFERENCES parent(id)); CREATE INDEX child_parent_idx ON child(parent_id); INSERT INTO parent VALUES(1); INSERT INTO child VALUES(1,1);';
const expectedObjects = ['parent', 'child', 'child_parent_idx'];
const network = { status: 1, stdout: 'Creating export', stderr: 'ERROR Network connection lost.' };
function fixture() {
  const directory = mkdtempSync(path.join(tmpdir(), 'zimonai-backup-test-'));
  const output = path.join(directory, 'full.sql');
  return { directory, output, database: 'test-database', expectedObjects, wrangler: '/test/wrangler', cwd: directory };
}
function success(args, contents = sql) {
  const output = args[args.indexOf('--output') + 1];
  writeFileSync(output, contents, { mode: 0o600 });
  return { status: 0, stdout: 'Download https://private.example/backup?secret=not-for-logs', stderr: '' };
}

test('backup retries only the exact D1 connection-loss error, never auth or unknown errors', () => {
  assert.equal(isTransientExportFailure(network), true);
  for (const result of [
    { status: 0, stderr: network.stderr },
    { ...network, error: new Error('spawn failed') },
    { ...network, stderr: network.stderr + ' Authentication error [code: 10000]' },
    { ...network, stderr: network.stderr + ' permission denied' },
    { status: 1, stderr: 'SQL schema mismatch' },
    { status: 1, stderr: 'fetch failed' },
  ]) assert.equal(isTransientExportFailure(result), false);
});

test('transient backup failures retry the full export then require verified private SQL', () => {
  const options = fixture(), calls = [], pauses = [], messages = [];
  const originalUmask = process.umask();
  const result = exportDatabaseBackup({ ...options, pause: ms => pauses.push(ms), report: text => messages.push(text), execute: (command, args) => {
    assert.equal(command, '/test/wrangler');
    assert.ok(args.includes('--remote') && args.includes('--skip-confirmation'));
    assert.ok(!args.includes('--no-data') && !args.includes('--no-schema') && !args.includes('--table'));
    assert.equal(process.umask(), 0o077);
    calls.push(args);
    return calls.length < 3 ? network : success(args);
  }});
  assert.equal(calls.length, 3);
  assert.deepEqual(pauses, [2000, 5000]);
  assert.equal(process.umask(), originalUmask);
  assert.equal(readFileSync(options.output, 'utf8'), sql);
  assert.equal(statSync(options.output).mode & 0o777, 0o600);
  assert.equal(result.bytes, Buffer.byteLength(sql));
  assert.match(result.sha256, /^[a-f0-9]{64}$/);
  assert.ok(messages.every(text => !text.includes('private.example') && !text.includes('secret=') && !text.includes('INSERT')));
});

test('persistent D1 export failures stop after three attempts without a final backup', () => {
  const options = fixture(); let calls = 0;
  assert.throws(() => exportDatabaseBackup({ ...options, execute: () => { calls++; return network; }, pause: () => {}, report: () => {} }), /after 3 attempt/);
  assert.equal(calls, 3); assert.equal(existsSync(options.output), false);
});

test('authentication and unknown errors fail immediately without retry', () => {
  for (const stderr of ['Authentication error [code: 10000]', 'unknown export failure']) {
    const options = fixture(); let calls = 0;
    assert.throws(() => exportDatabaseBackup({ ...options, execute: () => { calls++; return { status: 1, stderr }; }, pause: () => { throw new Error('must not retry'); }, report: () => {} }), /after 1 attempt/);
    assert.equal(calls, 1); assert.equal(existsSync(options.output), false);
  }
});

test('zero-exit export with missing, empty, malformed, incomplete or FK-invalid SQL stays blocked', () => {
  const invalid = [undefined, '', 'INSERT INTO missing VALUES(1);', 'CREATE TABLE parent(id INTEGER);', sql.replace('INSERT INTO parent VALUES(1);', '')];
  for (const contents of invalid) {
    const options = fixture(); let calls = 0;
    assert.throws(() => exportDatabaseBackup({ ...options, execute: (_command, args) => { calls++; return contents === undefined ? { status: 0 } : success(args, contents); }, pause: () => { throw new Error('must not retry validation'); }, report: () => {} }), /without a file|non-empty|restored|missing objects|foreign-key/);
    assert.equal(calls, 1); assert.equal(existsSync(options.output), false);
  }
});

test('local validation accommodates dump table order but still checks every foreign key', () => {
  const options = fixture();
  writeFileSync(options.output, 'CREATE TABLE child(id INTEGER REFERENCES parent(id)); INSERT INTO child VALUES(1); CREATE TABLE parent(id INTEGER PRIMARY KEY); INSERT INTO parent VALUES(1);', { mode: 0o600 });
  assert.ok(validateSqlBackup(options.output, ['parent', 'child']).bytes > 0);
  assert.throws(() => validateSqlBackup(options.output, []), /remote schema inventory/);
});

test('existing completed backup or failed attempt is preserved without executing export', () => {
  for (const suffix of ['', '.attempt-1']) {
    const options = fixture(), existing = options.output + suffix;
    writeFileSync(existing, 'preserve', { mode: 0o600 });
    assert.throws(() => exportDatabaseBackup({ ...options, execute: () => { throw new Error('must not run'); }, report: () => {} }), /overwrite/);
    assert.equal(readFileSync(existing, 'utf8'), 'preserve');
  }
});
