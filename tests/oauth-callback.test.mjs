import assert from 'node:assert/strict';
import test from 'node:test';
import { sha256 } from '../functions/_lib/auth.js';
import { onRequestGet as googleCallback } from '../functions/api/auth/google/callback.js';

class CallbackStatement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql.replace(/\s+/g, ' ').trim();
  }
  bind(...values) { this.values = values; return this; }
  async first() {
    if (this.sql.includes('FROM portal_oauth_attempts')) return this.db.attempt;
    throw new Error(`Unexpected callback first query: ${this.sql}`);
  }
  async run() {
    if (this.sql.startsWith('UPDATE portal_oauth_attempts SET consumed_at')) {
      this.db.consumeCalls += 1;
      return { meta: { changes: 1 } };
    }
    throw new Error(`Unexpected callback run query: ${this.sql}`);
  }
}

class CallbackDb {
  constructor(attempt) { this.attempt = attempt; this.consumeCalls = 0; }
  prepare(sql) { return new CallbackStatement(this, sql); }
}

function env(db) {
  return {
    ANALYTICS_DB: db,
    ALLOW_LOCAL_PORTAL: 'true',
    PORTAL_AUTH_ENABLED: 'true',
    PORTAL_SESSION_SECRET: 'oauth-callback-test-secret-longer-than-thirty-two',
    GOOGLE_CLIENT_ID: 'client-id',
    GOOGLE_CLIENT_SECRET: 'client-secret'
  };
}

function request(params, token = 'attempt-token') {
  return new Request(`http://127.0.0.1:8788/api/auth/google/callback?${params}`, {
    headers: { Accept: 'text/html', Cookie: `zm_oauth=${token}` }
  });
}

test('a mismatched OAuth state does not consume the legitimate attempt', async () => {
  const db = new CallbackDb({
    id_hash: await sha256('attempt-token'),
    state_hash: await sha256('correct-state'),
    code_verifier: 'verifier', nonce: 'nonce',
    return_path: '/zh-tw/portal/',
    expires_at: new Date(Date.now() + 60_000).toISOString()
  });
  const response = await googleCallback({ request: request('code=code&state=wrong-state'), env: env(db) });
  assert.equal(response.status, 302);
  assert.equal(db.consumeCalls, 0);
  const destination = new URL(response.headers.get('Location'));
  assert.equal(destination.pathname, '/zh-tw/portal/');
  assert.equal(destination.searchParams.get('auth_error'), 'invalid');
});

test('a valid state is consumed before a Google cancellation returns to the portal', async () => {
  const db = new CallbackDb({
    id_hash: await sha256('attempt-token'),
    state_hash: await sha256('correct-state'),
    code_verifier: 'verifier', nonce: 'nonce',
    return_path: '/zh-tw/portal/',
    expires_at: new Date(Date.now() + 60_000).toISOString()
  });
  const response = await googleCallback({
    request: request('error=access_denied&state=correct-state'), env: env(db)
  });
  assert.equal(response.status, 302);
  assert.equal(db.consumeCalls, 1);
  assert.equal(new URL(response.headers.get('Location')).searchParams.get('auth_error'), 'cancelled');
});
