import assert from 'node:assert/strict';
import test from 'node:test';
import {
  cleanExternalUrl,
  cleanPortalLocale,
  cleanText,
  clearCookie,
  authEnabled,
  cookieValue,
  getPortalSession,
  oauthCookieName,
  oauthRequestAllowed,
  portalJson,
  portalDb,
  portalPath,
  portalRedirect,
  readPortalJson,
  safeReturnPath,
  sessionCookieName,
  sessionTokenHash,
  setCookie,
  sha256
} from '../functions/_lib/auth.js';

function request(url) {
  return new Request(url);
}

test('portal return paths only allow exact internal locale routes', () => {
  assert.equal(safeReturnPath('/portal/', 'en'), '/portal/');
  assert.equal(safeReturnPath('/zh-tw/portal/', 'zh-tw'), '/zh-tw/portal/');
  assert.equal(safeReturnPath('//evil.example', 'zh-tw'), '/zh-tw/portal/');
  assert.equal(safeReturnPath('https://evil.example/portal/', 'en'), '/portal/');
  assert.equal(safeReturnPath('/portal/%2e%2e/payments/', 'en'), '/portal/');
});

test('locale and portal route helpers are deterministic', () => {
  assert.equal(cleanPortalLocale('zh-cn'), 'zh-cn');
  assert.equal(cleanPortalLocale('fr'), 'en');
  assert.equal(portalPath('en'), '/portal/');
  assert.equal(portalPath('zh-tw'), '/zh-tw/portal/');
});

test('production session cookies use __Host, Secure, HttpOnly and SameSite', () => {
  const production = request('https://zimonai.com/api/portal/me');
  assert.equal(sessionCookieName(production), '__Host-zm_session');
  assert.equal(oauthCookieName(production), '__Host-zm_oauth');
  const cookie = setCookie(production, sessionCookieName(production), 'token', 60);
  assert.match(cookie, /^__Host-zm_session=/);
  assert.match(cookie, /; Path=\//);
  assert.match(cookie, /; HttpOnly/);
  assert.match(cookie, /; Secure/);
  assert.match(cookie, /; SameSite=Lax/);
  assert.match(clearCookie(production, sessionCookieName(production)), /Max-Age=0$/);
});

test('localhost cookies never masquerade as production __Host cookies', () => {
  const local = request('http://127.0.0.1:8788/api/portal/me');
  assert.equal(sessionCookieName(local), 'zm_session');
  const cookie = setCookie(local, sessionCookieName(local), 'token', 60);
  assert.doesNotMatch(cookie, /; Secure/);
  assert.match(cookie, /; HttpOnly/);
});

test('malformed percent-encoded cookies are treated as invalid rather than throwing', () => {
  const malformed = new Request('http://127.0.0.1:8788/api/portal/me', { headers: { Cookie: 'zm_session=%' } });
  assert.doesNotThrow(() => cookieValue(malformed, 'zm_session'));
  assert.equal(cookieValue(malformed, 'zm_session'), '');
});

test('portal authentication stays disabled when the session secret is too short', () => {
  const base = { PORTAL_DB: {}, GOOGLE_CLIENT_ID: 'client', GOOGLE_CLIENT_SECRET: 'secret', PORTAL_AUTH_ENABLED: 'true' };
  assert.equal(authEnabled({ ...base, PORTAL_SESSION_SECRET: 'short' }), false);
  assert.equal(authEnabled({ ...base, PORTAL_SESSION_SECRET: 'x'.repeat(32) }), true);
  assert.equal(authEnabled({ ...base, PORTAL_SESSION_SECRET: 'x'.repeat(32), PORTAL_AUTH_ENABLED: 'false' }), false);
});

test('portal authentication is opt-in and requires the database and Google credentials', () => {
  const configured = {
    PORTAL_DB: {}, GOOGLE_CLIENT_ID: 'client', GOOGLE_CLIENT_SECRET: 'secret',
    PORTAL_SESSION_SECRET: 'x'.repeat(32)
  };
  assert.equal(authEnabled(configured), false);
  assert.equal(authEnabled({ ...configured, PORTAL_AUTH_ENABLED: 'false' }), false);
  assert.equal(authEnabled({ ...configured, PORTAL_AUTH_ENABLED: 'true', PORTAL_DB: undefined }), false);
  assert.equal(authEnabled({ ...configured, PORTAL_AUTH_ENABLED: 'true', GOOGLE_CLIENT_ID: '' }), false);
  assert.equal(authEnabled({ ...configured, PORTAL_AUTH_ENABLED: 'true' }), true);
});

test('production portal data requires PORTAL_DB while local development may use the analytics fallback', () => {
  const portal = {};
  const analytics = {};
  assert.equal(portalDb({ PORTAL_DB: portal, ANALYTICS_DB: analytics }), portal);
  assert.throws(() => portalDb({ ANALYTICS_DB: analytics }), /portal_database_not_configured/);
  assert.equal(portalDb({ ANALYTICS_DB: analytics, ALLOW_LOCAL_PORTAL: 'true' }), analytics);

  const auth = {
    PORTAL_AUTH_ENABLED: 'true', GOOGLE_CLIENT_ID: 'client', GOOGLE_CLIENT_SECRET: 'secret',
    PORTAL_SESSION_SECRET: 'x'.repeat(32), ANALYTICS_DB: analytics
  };
  assert.equal(authEnabled(auth), false);
  assert.equal(authEnabled({ ...auth, ALLOW_LOCAL_PORTAL: 'true' }), true);
});

test('session secrets are measured in bytes consistently', async () => {
  const multibyteSecret = '密'.repeat(11);
  const configured = {
    PORTAL_DB: {}, GOOGLE_CLIENT_ID: 'client', GOOGLE_CLIENT_SECRET: 'secret',
    PORTAL_AUTH_ENABLED: 'true', PORTAL_SESSION_SECRET: multibyteSecret
  };
  assert.equal(authEnabled(configured), true);
  assert.match(await sessionTokenHash('token', configured), /^[A-Za-z0-9_-]{43}$/);
});

test('active sessions are touched at most once every five minutes', async () => {
  const secret = 'portal-session-touch-test-secret-123456789';
  let lastSeenAt = new Date(Date.now() - 60_000).toISOString();
  let writes = 0;
  const db = {
    prepare(sql) {
      return {
        bind() {
          if (sql.includes('SELECT s.token_hash')) {
            return {
              async first() {
                return {
                  token_hash: 'hash', user_id: 'user', csrf_token: 'csrf',
                  expires_at: new Date(Date.now() + 60_000).toISOString(), last_seen_at: lastSeenAt,
                  primary_email: 'user@example.com', display_name: 'User', locale: 'en', role: 'client', status: 'active'
                };
              }
            };
          }
          return {
            async run() {
              writes += 1;
              return { meta: { changes: 1 } };
            }
          };
        }
      };
    }
  };
  const env = { PORTAL_DB: db, PORTAL_SESSION_SECRET: secret };
  const sessionRequest = new Request('https://zimonai.com/api/portal/me', {
    headers: { Cookie: '__Host-zm_session=token' }
  });
  assert.ok(await getPortalSession(sessionRequest, env));
  assert.equal(writes, 0);

  lastSeenAt = new Date(Date.now() - 6 * 60_000).toISOString();
  assert.ok(await getPortalSession(sessionRequest, env));
  assert.equal(writes, 1);
});

test('portal JSON and redirects include defensive browser headers', () => {
  for (const response of [portalJson({ ok: true }), portalRedirect('https://accounts.google.com/')]) {
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(response.headers.get('Referrer-Policy'), 'no-referrer');
    assert.equal(response.headers.get('Cross-Origin-Resource-Policy'), 'same-origin');
    assert.equal(response.headers.get('X-Frame-Options'), 'DENY');
    assert.match(response.headers.get('Content-Security-Policy'), /default-src 'none'/);
    assert.match(response.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
  }
});

test('portal JSON rejects an oversized chunked body without Content-Length', async () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"value":"'));
      controller.enqueue(new Uint8Array(40));
      controller.enqueue(new TextEncoder().encode('"}'));
      controller.close();
    }
  });
  const oversized = new Request('https://zimonai.com/api/portal/cases', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: stream, duplex: 'half'
  });
  const parsed = await readPortalJson(oversized, 32);
  assert.equal(parsed.error.status, 413);
  assert.deepEqual(await parsed.error.json(), { error: 'request_too_large' });
});

test('OAuth accepts only the canonical production host or an explicitly enabled localhost', () => {
  assert.equal(oauthRequestAllowed(request('https://zimonai.com/api/auth/google/start'), {}), true);
  assert.equal(oauthRequestAllowed(request('https://www.zimonai.com/api/auth/google/start'), {}), false);
  assert.equal(oauthRequestAllowed(request('https://preview.pages.dev/api/auth/google/start'), {}), false);
  assert.equal(oauthRequestAllowed(request('http://127.0.0.1:8788/api/auth/google/start'), { ALLOW_LOCAL_PORTAL: 'true' }), true);
  assert.equal(oauthRequestAllowed(request('http://127.0.0.1:8788/api/auth/google/start'), { ALLOW_LOCAL_PORTAL: 'false' }), false);
});

test('text and URL validation rejects unsafe or oversized values', () => {
  assert.equal(cleanText('  supplier\u0000 name  ', 30, true), 'supplier name');
  assert.equal(cleanText('', 30, true), null);
  assert.equal(cleanText('123456', 5), null);
  assert.equal(cleanExternalUrl('https://example.com/a'), 'https://example.com/a');
  assert.equal(cleanExternalUrl('javascript:alert(1)'), null);
  assert.equal(cleanExternalUrl('not a url'), null);
});

test('sha256 is stable and URL-safe', async () => {
  const digest = await sha256('ZimonAI');
  assert.equal(digest, await sha256('ZimonAI'));
  assert.match(digest, /^[A-Za-z0-9_-]{43}$/);
});
