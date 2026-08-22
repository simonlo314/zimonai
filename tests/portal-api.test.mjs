import assert from 'node:assert/strict';
import test from 'node:test';
import { sessionTokenHash } from '../functions/_lib/auth.js';
import { onRequestGet as getCases, onRequestPost as createCase } from '../functions/api/portal/cases.js';
import { onRequestGet as getMe } from '../functions/api/portal/me.js';
import { onRequestPost as logout } from '../functions/api/auth/logout.js';

const secret = 'portal-api-test-secret-that-is-longer-than-thirty-two';
const localOrigin = 'http://127.0.0.1:8788';

class FakeStatement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql.replace(/\s+/g, ' ').trim();
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  first() { return this.db.execute(this.sql, this.values, 'first'); }
  all() { return this.db.execute(this.sql, this.values, 'all'); }
  run() { return this.db.execute(this.sql, this.values, 'run'); }
}

class FakeD1 {
  constructor({ users = [], sessions = [], cases = [], audits = [] } = {}) {
    this.users = users;
    this.sessions = sessions;
    this.cases = cases;
    this.audits = audits;
  }

  prepare(sql) { return new FakeStatement(this, sql); }

  async batch(statements) {
    const results = [];
    for (const statement of statements) results.push(await statement.run());
    return results;
  }

  async execute(sql, values, mode) {
    if (sql.includes('FROM portal_sessions s JOIN portal_users u')) {
      const [tokenHash, now, idleCutoff] = values;
      const session = this.sessions.find((item) => item.token_hash === tokenHash
        && item.revoked_at === '' && item.expires_at > now && item.last_seen_at > idleCutoff);
      const user = session && this.users.find((item) => item.id === session.user_id && item.status === 'active');
      if (!session || !user) return null;
      return {
        token_hash: session.token_hash,
        user_id: session.user_id,
        csrf_token: session.csrf_token,
        expires_at: session.expires_at,
        last_seen_at: session.last_seen_at,
        primary_email: user.primary_email,
        display_name: user.display_name,
        locale: user.locale,
        role: user.role,
        status: user.status
      };
    }
    if (sql.startsWith('UPDATE portal_sessions SET last_seen_at')) {
      const [lastSeen, tokenHash] = values;
      const session = this.sessions.find((item) => item.token_hash === tokenHash);
      if (session) session.last_seen_at = lastSeen;
      return { meta: { changes: session ? 1 : 0 } };
    }
    if (sql.startsWith('UPDATE portal_sessions SET revoked_at')) {
      const [revokedAt, tokenHash] = values;
      const session = this.sessions.find((item) => item.token_hash === tokenHash);
      if (session) session.revoked_at = revokedAt;
      return { meta: { changes: session ? 1 : 0 } };
    }
    if (sql.includes('AS recent_count') && sql.includes('AS open_count')) {
      const [owner, cutoff] = values;
      const owned = this.cases.filter((item) => item.owner_user_id === owner);
      const recent = owned.filter((item) => item.created_at >= cutoff);
      const open = owned.filter((item) => !['delivered', 'closed'].includes(item.status));
      return {
        recent_count: recent.length,
        open_count: open.length,
        oldest_recent_at: recent.map((item) => item.created_at).sort()[0] || null
      };
    }
    if (sql.includes('FROM portal_cases WHERE owner_user_id = ?1 ORDER BY')) {
      const results = this.cases.filter((item) => item.owner_user_id === values[0]);
      return { results };
    }
    if (sql.includes('COALESCE(SUM(CASE WHEN created_at >= ?2')) {
      const [ownerUserId, cutoff] = values;
      const owned = this.cases.filter((item) => item.owner_user_id === ownerUserId);
      const recent = owned.filter((item) => item.created_at >= cutoff);
      return {
        recent_count: recent.length,
        open_count: owned.filter((item) => !['delivered', 'closed'].includes(item.status)).length,
        oldest_recent_at: recent.map((item) => item.created_at).sort()[0] || null
      };
    }
    if (sql.startsWith('INSERT INTO portal_cases')) {
      const [id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url,
        chinese_legal_name, product_category, product_model, decision_context,
        requested_checks, created_at, cutoff, recentLimit, openLimit] = values;
      const owned = this.cases.filter((item) => item.owner_user_id === owner_user_id);
      const recentCount = owned.filter((item) => item.created_at >= cutoff).length;
      const openCount = owned.filter((item) => !['delivered', 'closed'].includes(item.status)).length;
      if (recentCount >= recentLimit || openCount >= openLimit) return { meta: { changes: 0 } };
      this.cases.push({
        id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url,
        chinese_legal_name, product_category, product_model, decision_context,
        requested_checks, status: 'submitted', created_at, updated_at: created_at
      });
      return { meta: { changes: 1 } };
    }
    if (sql.startsWith('INSERT INTO portal_audit_events')) {
      const [id, user_id, case_id, created_at] = values;
      if (sql.includes('WHERE EXISTS') && !this.cases.some((item) => item.id === case_id && item.owner_user_id === user_id)) {
        return { meta: { changes: 0 } };
      }
      this.audits.push({ id, user_id, case_id, event_type: 'case_submitted', created_at });
      return { meta: { changes: 1 } };
    }
    if (sql.includes('FROM portal_cases WHERE id = ?1 AND owner_user_id = ?2')) {
      return this.cases.find((item) => item.id === values[0] && item.owner_user_id === values[1]) || null;
    }
    throw new Error(`Unhandled fake D1 statement (${mode}): ${sql}`);
  }
}

function user(id, email) {
  return { id, primary_email: email, display_name: id.toUpperCase(), avatar_url: '', locale: 'en', role: 'client', status: 'active' };
}

function existingCase(id, owner) {
  return {
    id, public_reference: `ZM-2026-${id.toUpperCase()}`, owner_user_id: owner, service_tier: 't1',
    supplier_name: `${owner} supplier`, supplier_url: '', chinese_legal_name: '',
    product_category: 'charger', product_model: '65W', decision_context: 'deposit decision',
    requested_checks: '', status: 'submitted', created_at: '2026-08-21T00:00:00.000Z', updated_at: '2026-08-21T00:00:00.000Z'
  };
}

async function fixture() {
  const tokens = { a: 'local-session-token-a', b: 'local-session-token-b' };
  const now = Date.now();
  const sessions = [];
  for (const key of ['a', 'b']) {
    sessions.push({
      token_hash: await sessionTokenHash(tokens[key], { PORTAL_SESSION_SECRET: secret }),
      user_id: `user-${key}`,
      csrf_token: `csrf-${key}`,
      expires_at: new Date(now + 60 * 60 * 1000).toISOString(),
      last_seen_at: new Date(now - 60 * 1000).toISOString(),
      revoked_at: ''
    });
  }
  const db = new FakeD1({
    users: [user('user-a', 'a@example.com'), user('user-b', 'b@example.com')],
    sessions,
    cases: [existingCase('case-a', 'user-a'), existingCase('case-b', 'user-b')]
  });
  return { db, tokens, env: { ANALYTICS_DB: db, PORTAL_SESSION_SECRET: secret, ALLOW_LOCAL_PORTAL: 'true' } };
}

function requestFor(token, path = '/api/portal/cases', options = {}) {
  return new Request(`${localOrigin}${path}`, {
    ...options,
    headers: { Cookie: `zm_session=${encodeURIComponent(token)}`, ...(options.headers || {}) }
  });
}

test('case lists are isolated by the authenticated account', async () => {
  const { env, tokens } = await fixture();
  const responseA = await getCases({ request: requestFor(tokens.a), env });
  const responseB = await getCases({ request: requestFor(tokens.b), env });
  assert.equal(responseA.status, 200);
  assert.deepEqual((await responseA.json()).cases.map((item) => item.id), ['case-a']);
  assert.deepEqual((await responseB.json()).cases.map((item) => item.id), ['case-b']);
});

test('customers cannot create cases directly', async () => {
  const { env, db, tokens } = await fixture();
  const beforeCases = db.cases.length;
  const beforeAudits = db.audits.length;
  const payload = {
    supplierName: 'Direct case attempt', productCategory: 'power adapter',
    decisionContext: 'Whether to sign the contract', consent: true,
    user_id: 'user-b', owner_user_id: 'user-b'
  };
  const request = requestFor(tokens.a, '/api/portal/cases', {
    method: 'POST',
    headers: { Origin: localOrigin, 'Content-Type': 'application/json', 'X-CSRF-Token': 'csrf-a' },
    body: JSON.stringify(payload)
  });
  const response = await createCase({ request, env });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'GET');
  assert.deepEqual(await response.json(), { error: 'client_case_creation_disabled' });
  assert.equal(db.cases.length, beforeCases);
  assert.equal(db.audits.length, beforeAudits);
});

test('session API returns only public account fields and logout revokes the current session', async () => {
  const { env, db, tokens } = await fixture();
  const me = await getMe({ request: requestFor(tokens.a, '/api/portal/me'), env });
  const payload = await me.json();
  assert.equal(me.status, 200);
  assert.deepEqual(payload.authCapabilities, { google: false, email: false });
  assert.deepEqual(Object.keys(payload.user).sort(), ['email', 'id', 'isAdmin', 'locale', 'name']);
  assert.equal(payload.user.isAdmin, false);

  const logoutResponse = await logout({
    request: requestFor(tokens.a, '/api/auth/logout', { method: 'POST', headers: { Origin: localOrigin, 'X-CSRF-Token': 'csrf-a' } }),
    env
  });
  assert.equal(logoutResponse.status, 204);
  assert.match(logoutResponse.headers.get('Set-Cookie'), /Max-Age=0/);
  assert.notEqual(db.sessions.find((item) => item.user_id === 'user-a').revoked_at, '');
  assert.equal(db.sessions.find((item) => item.user_id === 'user-b').revoked_at, '');
  const signedOut = await getMe({ request: requestFor(tokens.a, '/api/portal/me'), env });
  assert.equal(signedOut.status, 401);
  assert.deepEqual((await signedOut.json()).authCapabilities, { google: false, email: false });
});
