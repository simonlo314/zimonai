import assert from 'node:assert/strict';
import test from 'node:test';
import { inspectD1ReadOnly } from '../scripts/d1-readonly-inspection.mjs';

const SQL = "SELECT name, upper(type) AS type FROM pragma_table_info('portal_identities') ORDER BY cid;";
const OPTIONS = { database: 'PORTAL_DB', sql: SQL, wrangler: '/fake/wrangler', cwd: '/fake/release' };
const ROWS = [{ success: true, results: [{ name: 'provider', type: 'TEXT' }] }];
const ok = () => ({ status: 0, stdout: JSON.stringify(ROWS), stderr: '' });
const lost = () => ({ status: 1, stdout: JSON.stringify({ error: { text: 'fetch failed' } }), stderr: '' });

test('all release schema and ledger queries return verified results through the same CLI', () => {
  for (const sql of [
    "SELECT name FROM sqlite_master WHERE type IN ('table', 'index') ORDER BY name;",
    'SELECT name FROM d1_migrations ORDER BY id;',
    SQL,
    "SELECT name FROM pragma_index_info('notification_outbox_delivery_idx') ORDER BY seqno;",
  ]) {
    for (const database of ['PORTAL_DB', 'zimonai-analytics']) {
      let calls = 0;
      const result = inspectD1ReadOnly({ ...OPTIONS, database, sql, execute(command, args, options) {
        calls += 1;
        assert.equal(command, OPTIONS.wrangler);
        assert.deepEqual(args, ['d1', 'execute', database, '--remote', '--json', '--command', sql]);
        assert.equal(options.cwd, OPTIONS.cwd);
        return ok();
      } });
      assert.deepEqual(result, ROWS);
      assert.equal(calls, 1);
    }
  }
});

test('write SQL, additional statements and unrelated commands/databases never execute', () => {
  let calls = 0;
  for (const sql of [
    'DROP TABLE portal_users;', 'INSERT INTO d1_migrations(name) VALUES (1);',
    'PRAGMA foreign_keys=OFF;', 'SELECT 1;', SQL + ' DROP TABLE portal_users;',
    "SELECT name FROM pragma_index_info('x'); DELETE FROM portal_users; --') ORDER BY seqno;",
    "SELECT name FROM pragma_index_info('unknown-name') ORDER BY seqno;",
  ]) {
    assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, sql, execute() { calls += 1; return ok(); } }), /allowlisted/);
  }
  assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, database: 'other-production-db', execute() { calls += 1; return ok(); } }), /allowlisted/);
  assert.equal(calls, 0);
});

test('two exact transport failures retry only the identical read and accept a later valid result', () => {
  const calls = [], pauses = [], reports = [];
  const result = inspectD1ReadOnly({ ...OPTIONS, execute(command, args) {
    calls.push([command, [...args]]);
    return calls.length < 3 ? lost() : ok();
  }, pause: ms => pauses.push(ms), report: message => reports.push(message) });
  assert.deepEqual(result, ROWS);
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[0], calls[1]); assert.deepEqual(calls[1], calls[2]);
  assert.deepEqual(pauses, [2000, 5000]);
  assert.equal(reports.length, 2);
});

test('persistent connection failure stops after three attempts without accepting a result', () => {
  let calls = 0;
  const pauses = [];
  assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, execute() { calls += 1; return lost(); }, pause: ms => pauses.push(ms), report() {} }), /after 3 attempt\(s\): fetch failed.*blocked/);
  assert.equal(calls, 3); assert.deepEqual(pauses, [2000, 5000]);
});

test('authentication, SQL, configuration and unknown CLI errors fail immediately', () => {
  for (const failure of [
    { error: { text: 'Authentication error', code: 7403 } },
    { error: { text: 'fetch failed', code: 10000 } },
    { error: { text: 'no such table: portal_identities' } },
    { error: { text: 'invalid config' } },
    { error: { text: 'request failed' } },
    { error: { text: 'fetch failed' }, unrelated: true },
  ]) {
    let calls = 0;
    assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, execute() { calls += 1; return { status: 1, stdout: JSON.stringify(failure) }; }, pause() { assert.fail('Unexpected retry'); } }), /non-retryable.*blocked/);
    assert.equal(calls, 1);
  }
  assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, execute: () => ({ ...lost(), stderr: 'permission denied' }), pause() { assert.fail('Unexpected retry'); } }), /non-retryable/);
});

test('invalid JSON and unsuccessful or incomplete successful-exit envelopes fail immediately', () => {
  for (const stdout of ['bad json', '{}', '[]', '[null]', '[{"success":false,"results":[]}]', '[{"success":true}]']) {
    let calls = 0;
    assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, execute() { calls += 1; return { status: 0, stdout }; }, pause() { assert.fail('Unexpected retry'); } }), /Invalid (?:JSON|result)/);
    assert.equal(calls, 1);
  }
});

test('process-launch errors and termination are not treated as retryable API transport failures', () => {
  for (const failure of [{ ...lost(), error: new Error('spawn failed') }, { ...lost(), status: null, signal: 'SIGTERM' }]) {
    let calls = 0;
    assert.throws(() => inspectD1ReadOnly({ ...OPTIONS, execute() { calls += 1; return failure; }, pause() { assert.fail('Unexpected retry'); } }), /blocked/);
    assert.equal(calls, 1);
  }
});

test('failure reporting never exposes CLI output, credentials or unexpected response data', () => {
  const secret = 'SENSITIVE_TEST_VALUE';
  let message;
  try { inspectD1ReadOnly({ ...OPTIONS, execute: () => ({ status: 1, stdout: secret, stderr: secret }) }); }
  catch (error) { message = error.message; }
  assert.ok(message.includes('blocked'));
  assert.ok(!message.includes(secret));
  assert.ok(!message.includes(SQL));
});
