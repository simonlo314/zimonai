import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  PORTAL_BASE_INDEXES,
  PORTAL_BASE_TABLES,
  assertReleaseSource,
} from '../scripts/release-production.mjs';

const COMMIT = '0123456789abcdef0123456789abcdef01234567';

function fakeGit(overrides = {}) {
  const values = new Map([
    ['rev-parse --show-toplevel', '/tmp/zimonai-release-test'],
    ['status --porcelain=v1 --untracked-files=all', ''],
    ['rev-parse HEAD', COMMIT],
    ['rev-parse --verify origin/main', COMMIT],
    ['ls-remote --exit-code origin refs/heads/main', `${COMMIT}\trefs/heads/main`],
    ['log -1 --format=%s', 'Verified production release'],
    ...Object.entries(overrides),
  ]);
  return (args) => {
    const key = args.join(' ');
    if (!values.has(key)) throw new Error(`Unexpected git command: ${key}`);
    return values.get(key);
  };
}

test('production source gate accepts only a clean commit equal to local and live origin/main', () => {
  assert.deepEqual(
    assertReleaseSource({ git: fakeGit(), expectedRoot: '/tmp/zimonai-release-test' }),
    { commitHash: COMMIT, commitMessage: 'Verified production release' },
  );

  assert.throws(
    () => assertReleaseSource({
      git: fakeGit({ 'status --porcelain=v1 --untracked-files=all': ' M src/site.js' }),
      expectedRoot: '/tmp/zimonai-release-test',
    }),
    /clean Git worktree/,
  );
  assert.throws(
    () => assertReleaseSource({
      git: fakeGit({ 'rev-parse --verify origin/main': 'a'.repeat(40) }),
      expectedRoot: '/tmp/zimonai-release-test',
    }),
    /local origin\/main/,
  );
  assert.throws(
    () => assertReleaseSource({
      git: fakeGit({
        'ls-remote --exit-code origin refs/heads/main': `${'b'.repeat(40)}\trefs/heads/main`,
      }),
      expectedRoot: '/tmp/zimonai-release-test',
    }),
    /live origin\/main/,
  );
});

test('Portal release contract exactly matches migrations 0001 through 0007', () => {
  const database = new DatabaseSync(':memory:');
  database.exec('PRAGMA foreign_keys = ON');
  for (const migration of [
    '0001_portal.sql',
    '0002_portal_oauth_rate_limit.sql',
    '0003_workflow.sql',
    '0004_admin_workflow.sql',
    '0005_identity_email_authority.sql',
    '0006_order_lifecycle.sql',
    '0007_case_archive.sql',
  ]) {
    database.exec(readFileSync(new URL(`../migrations-portal/${migration}`, import.meta.url), 'utf8'));
  }

  for (const [table, expected] of Object.entries(PORTAL_BASE_TABLES)) {
    const actual = database.prepare(`PRAGMA table_info('${table}')`).all()
      .map((column) => `${column.name}:${String(column.type).toUpperCase()}`);
    assert.deepEqual(actual, expected, `${table} contract drifted`);
  }
  for (const [index, expected] of Object.entries(PORTAL_BASE_INDEXES)) {
    const actual = database.prepare(`PRAGMA index_info('${index}')`).all()
      .map((column) => column.name);
    assert.deepEqual(actual, expected, `${index} contract drifted`);
  }

  database.close();
});
