import assert from 'node:assert/strict';
import test from 'node:test';
import { issuePortalSession, upsertVerifiedIdentity } from '../functions/_lib/auth.js';
import { INQUIRY_EMAIL_WINDOW_LIMIT } from '../functions/_lib/inquiries.js';
import { onRequest as inquiryMethod, onRequestPost as submitInquiry } from '../functions/api/inquiries.js';
import {
  onRequestGet as listInquiries,
  onRequestPatch as updateInquiry
} from '../functions/api/admin/inquiries.js';
import { SqliteD1 } from './helpers/sqlite-d1.mjs';

const origin = 'http://127.0.0.1:8788';
const sessionSecret = 'public-inquiry-test-session-secret-longer-than-thirty-two';

function environment(db, extra = {}) {
  return {
    PORTAL_DB: db,
    PORTAL_AUTH_ENABLED: 'true',
    PORTAL_SESSION_SECRET: sessionSecret,
    PORTAL_ADMIN_EMAILS: 'admin@example.com',
    PORTAL_ADMIN_NOTIFICATION_EMAILS: 'admin@example.com',
    ALLOW_LOCAL_PORTAL: 'true',
    ...extra
  };
}

function validPayload(overrides = {}) {
  return {
    locale: 'zh-tw',
    name: '羅亦斈',
    email: 'buyer@example.com',
    company: 'Buyer Co.',
    supplier: 'Shenzhen Charger Supplier',
    url: 'https://supplier.example.com/catalogue',
    chinese: '深圳市充電科技有限公司',
    product: '65W GaN 充電器',
    question: '請核對營業登記、FCC ID 與 UL 檔案號。',
    consent: true,
    website: '',
    ...overrides
  };
}

function publicRequest(payload = validPayload(), {
  requestOrigin = origin,
  contentType = 'application/json',
  ip = '203.0.113.20',
  body
} = {}) {
  return new Request(`${origin}/api/inquiries?ignored=1`, {
    method: 'POST',
    headers: {
      Origin: requestOrigin,
      'Content-Type': contentType,
      'CF-Connecting-IP': ip,
      'User-Agent': 'Inquiry test browser/1.0'
    },
    body: body ?? JSON.stringify(payload)
  });
}

async function invoke(context, { wait = true } = {}) {
  const waits = [];
  const response = await submitInquiry({
    ...context,
    waitUntil(promise) { waits.push(promise); }
  });
  if (wait) await Promise.allSettled(waits);
  return response;
}

async function account(db, env, email, subject) {
  const user = await upsertVerifiedIdentity(env, {
    provider: 'email', providerSubject: subject, email, displayName: subject, locale: 'zh-tw'
  });
  const session = await issuePortalSession(new Request(`${origin}/portal/`), env, user.id, {
    provider: 'email', providerSubject: subject
  });
  return { user, session, cookie: session.cookie.split(';', 1)[0] };
}

function adminRequest(accountInfo, path, { method = 'GET', payload } = {}) {
  const headers = { Cookie: accountInfo.cookie };
  if (method !== 'GET') {
    headers.Origin = origin;
    headers['Content-Type'] = 'application/json';
    headers['X-CSRF-Token'] = accountInfo.session.csrfToken;
  }
  return new Request(`${origin}${path}`, {
    method,
    headers,
    ...(payload === undefined ? {} : { body: JSON.stringify(payload) })
  });
}

test('a valid inquiry is durably stored without creating a portal user, case or order', async () => {
  const db = new SqliteD1();
  const env = environment(db);
  try {
    const response = await invoke({ request: publicRequest(), env });
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.equal(result.accepted, true);
    assert.match(result.reference, /^ZMR-\d{4}-[A-Z0-9_-]{8}$/);

    const inquiry = db.raw.prepare('SELECT * FROM public_inquiries').get();
    assert.equal(inquiry.public_reference, result.reference);
    assert.equal(inquiry.contact_name, '羅亦斈');
    assert.equal(inquiry.contact_email_normalized, 'buyer@example.com');
    assert.equal(inquiry.status, 'new');
    assert.ok(inquiry.consent_at);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_users').get().count, 0);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders').get().count, 0);

    const queued = db.raw.prepare('SELECT * FROM notification_outbox').get();
    assert.equal(queued.notification_type, 'admin_public_inquiry_received');
    assert.equal(queued.status, 'queued');
    assert.equal(queued.recipient_email, 'admin@example.com');

    const columns = db.raw.prepare('PRAGMA table_info(public_inquiries)').all().map((row) => row.name);
    assert.equal(columns.some((name) => /(?:^|_)ip(?:_|$)|user_agent|query/i.test(name)), false);
    assert.equal(JSON.stringify(inquiry).includes('203.0.113.20'), false);
    assert.equal(JSON.stringify(inquiry).includes('Inquiry test browser'), false);
    assert.equal(JSON.stringify(inquiry).includes('ignored=1'), false);
  } finally { db.close(); }
});

test('untrusted markup is stored as ordinary text and notification delivery is non-blocking', async () => {
  const db = new SqliteD1();
  let delivered;
  const env = environment(db, {
    EMAIL_FROM: 'ZimonAI <notify@zimonai.com>',
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail(message) {
        delivered = message;
        return { provider: 'test-binding', id: 'inquiry-email-1' };
      }
    }
  });
  const markup = '<img src=x onerror=alert(1)><script>alert("x")</script>';
  try {
    const response = await invoke({
      request: publicRequest(validPayload({ question: markup })), env
    });
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.equal(db.raw.prepare('SELECT question FROM public_inquiries').get().question, markup);
    assert.match(delivered.subject, new RegExp(result.reference));
    assert.match(delivered.subject, /新查核需求/);
    assert.doesNotMatch(delivered.html, /<script>alert/);
    assert.match(delivered.html, /管理工作台/);
    assert.equal(db.raw.prepare('SELECT status FROM notification_outbox').get().status, 'sent');
  } finally { db.close(); }
});

test('public inquiry endpoint enforces origin, JSON type, bounded body and strict validation', async (t) => {
  const cases = [
    ['origin', publicRequest(validPayload(), { requestOrigin: 'https://attacker.example' }), 403, 'origin_not_allowed'],
    ['content type', publicRequest(validPayload(), { contentType: 'text/plain' }), 415, 'invalid_content_type'],
    ['invalid JSON', publicRequest(validPayload(), { body: '{not json' }), 400, 'invalid_json'],
    ['extra field', publicRequest({ ...validPayload(), role: 'admin' }), 400, 'validation_failed'],
    ['array body', publicRequest([]), 400, 'validation_failed'],
    ['non-string field', publicRequest(validPayload({ supplier: { name: 'object' } })), 400, 'validation_failed'],
    ['invalid email', publicRequest(validPayload({ email: 'invalid' })), 400, 'validation_failed'],
    ['invalid URL', publicRequest(validPayload({ url: 'javascript:alert(1)' })), 400, 'validation_failed'],
    ['missing consent', publicRequest(validPayload({ consent: false })), 400, 'validation_failed'],
    ['oversize', publicRequest(validPayload({ question: 'x'.repeat(20_000) })), 413, 'request_too_large']
  ];
  for (const [label, request, status, error] of cases) {
    await t.test(label, async () => {
      const db = new SqliteD1();
      try {
        const response = await submitInquiry({ request, env: environment(db) });
        assert.equal(response.status, status);
        assert.equal((await response.json()).error, error);
        assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM public_inquiries').get().count, 0);
      } finally { db.close(); }
    });
  }
  const method = inquiryMethod();
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('Allow'), 'POST');
});

test('honeypot receives a safe success response but creates no record or outbox entry', async () => {
  const db = new SqliteD1();
  try {
    const response = await invoke({
      request: publicRequest(validPayload({ website: 'https://spam.example' })),
      env: environment(db)
    });
    assert.equal(response.status, 201);
    assert.equal((await response.json()).accepted, true);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM public_inquiries').get().count, 0);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM notification_outbox').get().count, 0);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM public_inquiry_rate_limits').get().count, 0);
  } finally { db.close(); }
});

test('email and IP admission counters reject a burst with an atomic database limit', async () => {
  const db = new SqliteD1();
  const env = environment(db, { PORTAL_ADMIN_NOTIFICATION_EMAILS: '' });
  try {
    for (let index = 0; index < INQUIRY_EMAIL_WINDOW_LIMIT; index += 1) {
      const response = await submitInquiry({
        request: publicRequest(validPayload({ question: `Request ${index}` })), env
      });
      assert.equal(response.status, 201);
    }
    const limited = await submitInquiry({
      request: publicRequest(validPayload({ question: 'One too many' })), env
    });
    assert.equal(limited.status, 429);
    const result = await limited.json();
    assert.equal(result.error, 'rate_limited');
    assert.ok(result.retryAfter > 0);
    assert.ok(Number(limited.headers.get('Retry-After')) > 0);
    assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM public_inquiries').get().count, INQUIRY_EMAIL_WINDOW_LIMIT);
    const emailCounter = db.raw.prepare(`
      SELECT request_count FROM public_inquiry_rate_limits WHERE scope = 'email'
    `).get();
    assert.equal(emailCounter.request_count, INQUIRY_EMAIL_WINDOW_LIMIT);
  } finally { db.close(); }
});

test('only an exact admin identity can list full inquiries or update status', async () => {
  const db = new SqliteD1();
  const env = environment(db, { PORTAL_ADMIN_NOTIFICATION_EMAILS: '' });
  try {
    const submitted = await submitInquiry({ request: publicRequest(), env });
    assert.equal(submitted.status, 201);
    const admin = await account(db, env, 'admin@example.com', 'admin-inquiry-subject');
    const client = await account(db, env, 'client@example.com', 'client-inquiry-subject');

    const signedOut = await listInquiries({
      request: new Request(`${origin}/api/admin/inquiries`), env
    });
    assert.equal(signedOut.status, 401);
    const clientDenied = await listInquiries({
      request: adminRequest(client, '/api/admin/inquiries'), env
    });
    assert.equal(clientDenied.status, 403);

    const list = await listInquiries({
      request: adminRequest(admin, '/api/admin/inquiries'), env
    });
    assert.equal(list.status, 200);
    const item = (await list.json()).inquiries[0];
    assert.equal(item.email, 'buyer@example.com');
    assert.equal(item.question, '請核對營業登記、FCC ID 與 UL 檔案號。');

    const clientMutation = await updateInquiry({
      request: adminRequest(client, '/api/admin/inquiries', {
        method: 'PATCH', payload: { id: item.id, status: 'contacted' }
      }),
      env
    });
    assert.equal(clientMutation.status, 403);
    const updated = await updateInquiry({
      request: adminRequest(admin, '/api/admin/inquiries', {
        method: 'PATCH', payload: { id: item.id, status: 'contacted' }
      }),
      env
    });
    assert.equal(updated.status, 200);
    assert.equal((await updated.json()).inquiry.status, 'contacted');
    assert.equal(
      db.raw.prepare("SELECT COUNT(*) AS count FROM portal_audit_events WHERE event_type = 'admin_public_inquiry_status_updated'").get().count,
      1
    );
  } finally { db.close(); }
});
