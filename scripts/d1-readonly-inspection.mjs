import { spawnSync } from 'node:child_process';

const DELAYS_MS = [2000, 5000];
const DATABASES = new Set(['zimonai-analytics', 'PORTAL_DB']);
const QUERIES = [
  /^SELECT name FROM sqlite_master WHERE type IN \('table', 'index'\) ORDER BY name;$/,
  /^SELECT name FROM d1_migrations ORDER BY id;$/,
  /^SELECT name, upper\(type\) AS type FROM pragma_table_info\('[A-Za-z_][A-Za-z0-9_]*'\) ORDER BY cid;$/,
  /^SELECT name FROM pragma_index_info\('[A-Za-z_][A-Za-z0-9_]*'\) ORDER BY seqno;$/,
];

function isConnectionFailure(result) {
  if (result.status !== 1 || result.error || result.signal) return false;
  // Wrangler's JSON formatter drops the underlying socket error. Accept only
  // its exact network-failure envelope, never API/auth/SQL/config error codes.
  if (/Authentication error|\b(?:7403|10000)\b|permission|not authorized|invalid (?:token|config)/i.test(`${result.stdout || ''}\n${result.stderr || ''}`)) return false;
  try {
    const value = JSON.parse(result.stdout || result.stderr || '');
    return Object.keys(value).length === 1
      && Object.keys(value.error || {}).length === 1
      && value.error.text === 'fetch failed';
  } catch {
    return false;
  }
}

export function inspectD1ReadOnly({
  database, sql, wrangler, cwd,
  execute = spawnSync,
  pause = milliseconds => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds),
  report = console.warn,
}) {
  // This is deliberately not a general Wrangler retry wrapper. Only the four
  // release schema/ledger SELECT shapes can enter it, even on the first try.
  if (!DATABASES.has(database) || typeof sql !== 'string' || !QUERIES.some(pattern => pattern.test(sql))) {
    throw new Error('Only allowlisted release schema/ledger inspections may use this transport.');
  }
  const args = ['d1', 'execute', database, '--remote', '--json', '--command', sql];
  for (let attempt = 1; attempt <= DELAYS_MS.length + 1; attempt += 1) {
    const result = execute(wrangler, args, {
      cwd, env: process.env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (!result.error && result.status === 0) {
      let response;
      try { response = JSON.parse(result.stdout); }
      catch { throw new Error(`Invalid JSON in required read-only D1 inspection for ${database}.`); }
      if (!Array.isArray(response) || response.length === 0 || response.some(entry => entry?.success !== true || !Array.isArray(entry.results))) {
        throw new Error(`Invalid result in required read-only D1 inspection for ${database}.`);
      }
      return response;
    }
    const transient = isConnectionFailure(result);
    if (!transient || attempt > DELAYS_MS.length) {
      throw new Error(`Required read-only D1 inspection failed for ${database} after ${attempt} attempt(s): ${transient ? 'fetch failed' : 'non-retryable CLI failure'}. Release remains blocked.`);
    }
    const delay = DELAYS_MS[attempt - 1];
    report(`Read-only D1 connection failed for ${database}; retrying the identical inspection in ${delay / 1000}s (${attempt + 1}/3). No result has been accepted.`);
    pause(delay);
  }
}
