import assert from 'node:assert/strict';
import test from 'node:test';
import { onRequestGet as startGoogleOauth } from '../functions/api/auth/google/start.js';

class OAuthStatement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql.replace(/\s+/g, ' ').trim();
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    if (this.sql.includes('COUNT(*) AS attempt_count')) {
      const [fingerprint, cutoff] = this.values;
      return {
        attempt_count: this.db.attempts.filter((item) => item.fingerprint === fingerprint && item.createdAt > cutoff).length
      };
    }
    throw new Error(`Unhandled OAuth first query: ${this.sql}`);
  }

  async run() {
    if (this.sql.startsWith('DELETE FROM portal_oauth_attempts')) return { meta: { changes: 0 } };
    if (this.sql.startsWith('INSERT INTO portal_oauth_attempts')) {
      this.db.attempts.push({ fingerprint: this.values[7], createdAt: this.values[6] });
      return { meta: { changes: 1 } };
    }
    throw new Error(`Unhandled OAuth run query: ${this.sql}`);
  }
}

class OAuthDb {
  constructor() { this.attempts = []; }
  prepare(sql) { return new OAuthStatement(this, sql); }
}

function fixture(db) {
  return {
    request: new Request('http://127.0.0.1:8788/api/auth/google/start?locale=zh-tw&returnTo=/zh-tw/portal/', {
      headers: { 'CF-Connecting-IP': '203.0.113.8', 'User-Agent': 'ZimonAI OAuth test' }
    }),
    env: {
      ANALYTICS_DB: db,
      ALLOW_LOCAL_PORTAL: 'true',
      PORTAL_AUTH_ENABLED: 'true',
      PORTAL_SESSION_SECRET: 'oauth-start-test-secret-longer-than-thirty-two',
      GOOGLE_CLIENT_ID: 'client-id',
      GOOGLE_CLIENT_SECRET: 'client-secret'
    }
  };
}

test('OAuth start creates a PKCE redirect and rate-limits repeated attempts', async () => {
  const db = new OAuthDb();
  const context = fixture(db);
  for (let index = 0; index < 10; index += 1) {
    const response = await startGoogleOauth(context);
    assert.equal(response.status, 302);
    const location = new URL(response.headers.get('Location'));
    assert.equal(location.origin, 'https://accounts.google.com');
    assert.equal(location.searchParams.get('code_challenge_method'), 'S256');
    assert.equal(location.searchParams.get('state')?.length > 30, true);
  }
  const limited = await startGoogleOauth(context);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '600');
  assert.deepEqual(await limited.json(), { error: 'oauth_rate_limited', retryAfter: 600 });
  assert.equal(db.attempts.length, 10);
});
