import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import {
  authCapabilities,
  emailAuthEnabled,
  getPortalSession,
  issuePortalSession,
  googleEmailIsAuthoritative,
  normalizeEmail,
  requireAdmin,
  sessionTokenHash,
  upsertVerifiedIdentity
} from '../functions/_lib/auth.js';
import { emailSenderConfigured, verificationEmail } from '../functions/_lib/email.js';
import { onRequestPost as requestEmailCode } from '../functions/api/auth/email/request.js';
import { onRequestPost as verifyEmailCode } from '../functions/api/auth/email/verify.js';
import { createAdminCase } from '../functions/_lib/workflow.js';
import { SqliteD1 } from './helpers/sqlite-d1.mjs';

const localOrigin = 'http://127.0.0.1:8788';

function env(db, extra = {}) {
  return {
    PORTAL_DB: db,
    PORTAL_AUTH_ENABLED: 'true',
    PORTAL_EMAIL_AUTH_ENABLED: 'true',
    PORTAL_SESSION_SECRET: 'email-session-secret-longer-than-thirty-two-bytes',
    PORTAL_EMAIL_CODE_SECRET: 'email-code-secret-longer-than-thirty-two-bytes',
    EMAIL_FROM: 'ZimonAI <login@zimonai.com>',
    EMAIL_REPLY_TO: 'simonlo@zimonai.com',
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        return { provider: 'test-binding', id: 'email-delivery-default' };
      }
    },
    ALLOW_LOCAL_PORTAL: 'true',
    ...extra
  };
}

function emailRequest(email, overrides = {}) {
  return new Request(`${localOrigin}/api/auth/email/request`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.42',
      'User-Agent': 'ZimonAI email auth test',
      ...(overrides.headers || {})
    },
    body: overrides.body ?? JSON.stringify({ email, locale: 'zh-tw', returnTo: '/zh-tw/portal/' })
  });
}

function verificationRequest(email, code, cookie) {
  return new Request(`${localOrigin}/api/auth/email/verify`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      'Content-Type': 'application/json',
      Cookie: cookie
    },
    body: JSON.stringify({ email, code })
  });
}

async function requestChallenge(db, email = 'buyer@example.com') {
  let delivery;
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail(message) {
        delivery = message;
        return { provider: 'test-binding', id: 'email-delivery-1' };
      }
    }
  });
  const response = await requestEmailCode({ request: emailRequest(email), env: configured });
  const setCookie = response.headers.get('Set-Cookie') || '';
  const cookieMatch = setCookie.match(/(?:^|,\s*)(zm_email_challenge=[^;]+)/);
  const code = delivery?.text?.match(/\b\d{6}\b/)?.[0] || '';
  return { response, delivery, cookie: cookieMatch?.[1] || '', code };
}

test('email authentication is provider-neutral and fails closed without a configured sender', () => {
  const db = {};
  const configured = env(db);
  assert.equal(emailSenderConfigured(configured), true);
  assert.equal(emailAuthEnabled(configured), true);
  assert.deepEqual(authCapabilities(configured), { google: false, email: true });
  assert.equal(emailAuthEnabled({ ...configured, EMAIL_TRANSPORT: null, EMAIL_PROVIDER: '' }), false);
  assert.equal(emailAuthEnabled({ ...configured, EMAIL_TRANSPORT: null, EMAIL_PROVIDER: 'unsupported' }), false);
  assert.equal(emailAuthEnabled({ ...configured, PORTAL_EMAIL_CODE_SECRET: 'short' }), false);
  assert.match(verificationEmail('zh-tw', '123456').text, /10 分鐘/);
  assert.match(verificationEmail('zh-cn', '123456').text, /10 分钟/);
  assert.match(verificationEmail('en', '123456').html, />123456</);
});

test('workflow migration applies after the existing portal schema and requires finite invitations', () => {
  const raw = new DatabaseSync(':memory:');
  try {
    raw.exec('PRAGMA foreign_keys = ON');
    raw.exec(readFileSync(new URL('../migrations-portal/0001_portal.sql', import.meta.url), 'utf8'));
    raw.exec(readFileSync(new URL('../migrations-portal/0002_portal_oauth_rate_limit.sql', import.meta.url), 'utf8'));
    const timestamp = '2026-08-22T00:00:00.000Z';
    raw.prepare(`
      INSERT INTO portal_users
        (id, primary_email, email_normalized, display_name, locale, role, status, created_at, updated_at, last_login_at)
      VALUES ('usr_existing', 'existing@gmail.com', 'existing@gmail.com', '', 'en', 'client', 'active', ?, ?, ?)
    `).run(timestamp, timestamp, timestamp);
    raw.prepare(`
      INSERT INTO portal_identities
        (provider, provider_subject, user_id, provider_email, created_at, updated_at)
      VALUES ('google', 'existing-google-subject', 'usr_existing', 'existing@gmail.com', ?, ?)
    `).run(timestamp, timestamp);
    raw.prepare(`
      INSERT INTO portal_sessions
        (token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, revoked_at)
      VALUES ('old-session', 'usr_existing', 'csrf', '2026-08-23T00:00:00.000Z', ?, ?, '')
    `).run(timestamp, timestamp);

    raw.exec(readFileSync(new URL('../migrations-portal/0003_workflow.sql', import.meta.url), 'utf8'));
    assert.equal(
      raw.prepare('SELECT user_id FROM portal_verified_emails WHERE email_normalized = ?').get('existing@gmail.com').user_id,
      'usr_existing'
    );
    const migratedSession = raw.prepare(`
      SELECT auth_provider, auth_provider_subject FROM portal_sessions WHERE token_hash = 'old-session'
    `).get();
    assert.deepEqual({ ...migratedSession }, { auth_provider: '', auth_provider_subject: '' });
    assert.throws(() => raw.prepare(`
      INSERT INTO portal_customer_invites
        (id, email_normalized, email_display, locale, status, created_by_user_id, created_at, updated_at)
      VALUES ('no-expiry', 'buyer@example.com', 'buyer@example.com', 'en', 'pending', 'usr_existing', ?, ?)
    `).run(timestamp, timestamp), /NOT NULL constraint failed: portal_customer_invites\.expires_at/);
  } finally {
    raw.close();
  }
});

test('identity-authority migration isolates unsafe historical Google email mappings and their data', () => {
  const raw = new DatabaseSync(':memory:');
  try {
    raw.exec('PRAGMA foreign_keys = ON');
    raw.exec(readFileSync(new URL('../migrations-portal/0001_portal.sql', import.meta.url), 'utf8'));
    raw.exec(readFileSync(new URL('../migrations-portal/0002_portal_oauth_rate_limit.sql', import.meta.url), 'utf8'));
    const timestamp = '2026-08-22T00:00:00.000Z';
    raw.prepare(`
      INSERT INTO portal_users
        (id, primary_email, email_normalized, display_name, locale, role, status, created_at, updated_at, last_login_at)
      VALUES ('usr_legacy_external', 'victim@external.example', 'victim@external.example', '', 'en',
              'client', 'active', ?, ?, ?)
    `).run(timestamp, timestamp, timestamp);
    raw.prepare(`
      INSERT INTO portal_identities
        (provider, provider_subject, user_id, provider_email, created_at, updated_at)
      VALUES ('google', 'legacy-external-google', 'usr_legacy_external',
              'victim@external.example', ?, ?)
    `).run(timestamp, timestamp);
    raw.prepare(`
      INSERT INTO portal_sessions
        (token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, revoked_at)
      VALUES ('legacy-external-session', 'usr_legacy_external', 'csrf',
              '2026-08-23T00:00:00.000Z', ?, ?, '')
    `).run(timestamp, timestamp);
    raw.prepare(`
      INSERT INTO portal_cases
        (id, public_reference, owner_user_id, service_tier, supplier_name, product_category,
         decision_context, status, created_at, updated_at)
      VALUES ('case_legacy_external', 'ZM-2026-LEGACY', 'usr_legacy_external', 't1',
              'Potentially exposed supplier', 'charger', 'Must remain quarantined', 'submitted', ?, ?)
    `).run(timestamp, timestamp);

    raw.exec(readFileSync(new URL('../migrations-portal/0003_workflow.sql', import.meta.url), 'utf8'));
    raw.exec(readFileSync(new URL('../migrations-portal/0004_admin_workflow.sql', import.meta.url), 'utf8'));
    raw.prepare(`
      UPDATE portal_sessions
      SET auth_provider = 'google', auth_provider_subject = 'legacy-external-google'
      WHERE token_hash = 'legacy-external-session'
    `).run();
    raw.prepare(`
      INSERT INTO portal_admin_identities
        (provider, provider_subject, user_id, verified_email, created_at)
      VALUES ('google', 'legacy-external-google', 'usr_legacy_external',
              'victim@external.example', ?)
    `).run(timestamp);
    raw.prepare("UPDATE portal_users SET role = 'admin' WHERE id = 'usr_legacy_external'").run();
    assert.equal(
      raw.prepare("SELECT COUNT(*) AS count FROM portal_verified_emails WHERE email_normalized = 'victim@external.example'").get().count,
      1
    );

    raw.exec(readFileSync(new URL('../migrations-portal/0005_identity_email_authority.sql', import.meta.url), 'utf8'));
    const quarantine = raw.prepare(`
      SELECT original_user_id, isolated_user_id, reason
      FROM portal_identity_quarantine
      WHERE provider = 'google' AND provider_subject = 'legacy-external-google'
    `).get();
    assert.equal(quarantine.original_user_id, 'usr_legacy_external');
    assert.equal(quarantine.reason, 'non_authoritative_google_email_mapping');
    assert.notEqual(quarantine.isolated_user_id, quarantine.original_user_id);
    assert.equal(
      raw.prepare("SELECT user_id FROM portal_identities WHERE provider_subject = 'legacy-external-google'").get().user_id,
      quarantine.isolated_user_id
    );
    assert.deepEqual(
      { ...raw.prepare('SELECT status, role FROM portal_users WHERE id = ?').get(quarantine.isolated_user_id) },
      { status: 'active', role: 'client' }
    );
    assert.equal(raw.prepare("SELECT status FROM portal_users WHERE id = 'usr_legacy_external'").get().status, 'disabled');
    assert.equal(raw.prepare("SELECT owner_user_id FROM portal_cases WHERE id = 'case_legacy_external'").get().owner_user_id, 'usr_legacy_external');
    assert.equal(raw.prepare("SELECT COUNT(*) AS count FROM portal_verified_emails WHERE email_normalized = 'victim@external.example'").get().count, 0);
    assert.equal(raw.prepare("SELECT COUNT(*) AS count FROM portal_admin_identities WHERE provider_subject = 'legacy-external-google'").get().count, 0);
    assert.notEqual(raw.prepare("SELECT revoked_at FROM portal_sessions WHERE token_hash = 'legacy-external-session'").get().revoked_at, '');
  } finally {
    raw.close();
  }
});

test('runtime isolation closes a stale mapping written after migration and Email OTP does not inherit it', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const admin = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'owner@example.com', email: 'owner@example.com'
  });
  const timestamp = new Date().toISOString();
  const staleToken = 'post-migration-stale-google-session';
  const staleTokenHash = await sessionTokenHash(staleToken, configured);
  db.raw.prepare(`
    INSERT INTO portal_users
      (id, primary_email, email_normalized, display_name, locale, role, status,
       created_at, updated_at, last_login_at)
    VALUES ('usr_cutover_stale', 'victim@external.example', 'victim@external.example', '',
            'en', 'client', 'active', ?, ?, ?)
  `).run(timestamp, timestamp, timestamp);
  db.raw.prepare(`
    INSERT INTO portal_identities
      (provider, provider_subject, user_id, provider_email, created_at, updated_at, email_authoritative)
    VALUES ('google', 'cutover-google-subject', 'usr_cutover_stale',
            'victim@external.example', ?, ?, 0)
  `).run(timestamp, timestamp);
  db.raw.prepare(`
    INSERT INTO portal_verified_emails
      (email_normalized, email_display, user_id, verified_by, verified_at, created_at, updated_at)
    VALUES ('victim@external.example', 'victim@external.example', 'usr_cutover_stale',
            'google', ?, ?, ?)
  `).run(timestamp, timestamp, timestamp);
  db.raw.prepare(`
    INSERT INTO portal_sessions
      (token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, revoked_at,
       auth_provider, auth_provider_subject)
    VALUES (?, 'usr_cutover_stale', 'csrf-cutover', ?, ?, ?, '',
            'google', 'cutover-google-subject')
  `).run(staleTokenHash, new Date(Date.now() + 60 * 60 * 1000).toISOString(), timestamp, timestamp);
  db.raw.prepare(`
    INSERT INTO portal_cases
      (id, public_reference, owner_user_id, service_tier, supplier_name, product_category,
       decision_context, status, created_at, updated_at)
    VALUES ('case_cutover_stale', 'ZM-2026-CUTOVER', 'usr_cutover_stale', 't1',
            'Quarantined supplier', 'charger', 'Ownership must be reviewed', 'submitted', ?, ?)
  `).run(timestamp, timestamp);

  const staleRequest = new Request(`${localOrigin}/portal/`, {
    headers: { Cookie: `zm_session=${staleToken}` }
  });
  assert.equal(await getPortalSession(staleRequest, configured), null);

  const pending = await createAdminCase(configured, { user_id: admin.id }, {
    customerEmail: 'victim@external.example', locale: 'en', tier: 't1',
    supplierName: 'New email-owned supplier', productCategory: 'adapter',
    decisionContext: 'Must go only to a mailbox-verified user'
  });
  assert.equal(pending.pendingInvitation, true);

  const emailOwner = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'victim@external.example', email: 'victim@external.example'
  });
  assert.notEqual(emailOwner.id, 'usr_cutover_stale');
  assert.equal(emailOwner.claimedCases, 1);
  const googleIdentity = db.raw.prepare(`
    SELECT user_id FROM portal_identities
    WHERE provider = 'google' AND provider_subject = 'cutover-google-subject'
  `).get();
  assert.notEqual(googleIdentity.user_id, 'usr_cutover_stale');
  assert.notEqual(googleIdentity.user_id, emailOwner.id);
  assert.equal(db.raw.prepare("SELECT status FROM portal_users WHERE id = 'usr_cutover_stale'").get().status, 'disabled');
  assert.equal(
    db.raw.prepare("SELECT owner_user_id FROM portal_cases WHERE id = 'case_cutover_stale'").get().owner_user_id,
    'usr_cutover_stale'
  );
  assert.equal(
    db.raw.prepare('SELECT owner_user_id FROM portal_cases WHERE id = ?').get(pending.caseId).owner_user_id,
    emailOwner.id
  );
  assert.equal(
    db.raw.prepare("SELECT user_id FROM portal_verified_emails WHERE email_normalized = 'victim@external.example'").get().user_id,
    emailOwner.id
  );
  assert.notEqual(db.raw.prepare('SELECT revoked_at FROM portal_sessions WHERE token_hash = ?').get(staleTokenHash).revoked_at, '');
});

test('request and verify handlers issue a hashed, one-time six-digit challenge and one portal session', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const challenge = await requestChallenge(db, 'Buyer@Example.com');
  assert.equal(challenge.response.status, 202);
  assert.deepEqual(await challenge.response.json(), { accepted: true, expiresIn: 600 });
  assert.equal(challenge.delivery.replyTo, 'simonlo@zimonai.com');
  assert.equal(challenge.delivery.to, 'buyer@example.com');
  assert.match(challenge.code, /^\d{6}$/);
  assert.match(challenge.cookie, /^zm_email_challenge=/);
  assert.match(challenge.response.headers.get('Set-Cookie'), /HttpOnly/);
  assert.match(challenge.response.headers.get('Set-Cookie'), /SameSite=Lax/);

  const stored = db.raw.prepare('SELECT * FROM portal_email_challenges').get();
  assert.equal(stored.email_normalized, 'buyer@example.com');
  assert.notEqual(stored.code_hash, challenge.code);
  assert.equal(stored.code_hash.includes(challenge.code), false);
  assert.equal(stored.request_fingerprint_hash.includes('203.0.113.42'), false);
  assert.notEqual(stored.sent_at, '');

  const verified = await verifyEmailCode({
    request: verificationRequest('buyer@example.com', challenge.code, challenge.cookie),
    env: env(db)
  });
  assert.equal(verified.status, 200);
  const verifiedBody = await verified.json();
  assert.equal(verifiedBody.authenticated, true);
  assert.equal(verifiedBody.returnTo, '/zh-tw/portal/');
  assert.equal(verifiedBody.user.email, 'buyer@example.com');
  assert.match(verified.headers.get('Set-Cookie'), /zm_session=/);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_users').get().count, 1);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_verified_emails').get().count, 1);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_sessions').get().count, 1);
  assert.notEqual(db.raw.prepare('SELECT consumed_at FROM portal_email_challenges').get().consumed_at, '');

  const replay = await verifyEmailCode({
    request: verificationRequest('buyer@example.com', challenge.code, challenge.cookie),
    env: env(db)
  });
  assert.equal(replay.status, 400);
  assert.equal((await replay.json()).error, 'email_code_invalid_or_expired');
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_sessions').get().count, 1);
});

test('five incorrect codes invalidate the challenge and a later correct code cannot revive it', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const challenge = await requestChallenge(db, 'mistake@example.com');
  const wrongCode = challenge.code === '000000' ? '111111' : '000000';
  for (let index = 0; index < 5; index += 1) {
    const response = await verifyEmailCode({
      request: verificationRequest('mistake@example.com', wrongCode, challenge.cookie),
      env: env(db)
    });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).remainingAttempts, 4 - index);
  }
  const row = db.raw.prepare('SELECT attempts, invalidated_at FROM portal_email_challenges').get();
  assert.equal(row.attempts, 5);
  assert.notEqual(row.invalidated_at, '');
  const correctAfterLock = await verifyEmailCode({
    request: verificationRequest('mistake@example.com', challenge.code, challenge.cookie),
    env: env(db)
  });
  assert.equal(correctAfterLock.status, 400);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_sessions').get().count, 0);
});

test('email request enforces exact Origin, strict JSON and email-window rate limits before delivery', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const missingProvider = await requestEmailCode({
    request: emailRequest('buyer@example.com'),
    env: env(db, { EMAIL_PROVIDER: '', EMAIL_TRANSPORT: null })
  });
  assert.equal(missingProvider.status, 503);

  const evil = await requestEmailCode({
    request: emailRequest('buyer@example.com', { headers: { Origin: 'https://zimonai.com.evil.example' } }),
    env: env(db)
  });
  assert.equal(evil.status, 403);

  const wrongType = await requestEmailCode({
    request: emailRequest('buyer@example.com', { headers: { 'Content-Type': 'text/plain' } }),
    env: env(db)
  });
  assert.equal(wrongType.status, 415);

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000).toISOString();
  const oneHourLater = new Date(Date.now() + 60 * 60_000).toISOString();
  const insert = db.raw.prepare(`
    INSERT INTO portal_email_challenges
      (id_hash, email_normalized, email_display, code_hash, request_fingerprint_hash, locale,
       return_path, expires_at, attempts, max_attempts, consumed_at, invalidated_at, sent_at, created_at)
    VALUES (?, 'limited@example.com', 'limited@example.com', 'hash', ?, 'en', '/portal/', ?, 0, 5, '', '', ?, ?)
  `);
  for (let index = 0; index < 5; index += 1) {
    insert.run(`rate-${index}`, `fingerprint-${index}`, oneHourLater, fiveMinutesAgo, fiveMinutesAgo);
  }
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        throw new Error('rate-limited requests must not send email');
      }
    }
  });
  const limited = await requestEmailCode({ request: emailRequest('limited@example.com'), env: configured });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '3600');
});

test('concurrent email-code requests are admitted atomically before any delivery', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  let deliveries = 0;
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        deliveries += 1;
        // Keep delivery asynchronous so every request overlaps the admission
        // window instead of becoming a serial test by accident.
        await Promise.resolve();
        return { provider: 'test-binding', id: `concurrent-delivery-${deliveries}` };
      }
    }
  });
  const responses = await Promise.all(Array.from({ length: 12 }, () => requestEmailCode({
    request: emailRequest('concurrent-limit@example.com'),
    env: configured
  })));
  const statuses = responses.map((response) => response.status).sort((a, b) => a - b);
  assert.deepEqual(statuses, [202, ...Array(11).fill(429)]);
  assert.equal(deliveries, 1);
  assert.equal(
    db.raw.prepare("SELECT COUNT(*) AS count FROM portal_email_challenges WHERE email_normalized = 'concurrent-limit@example.com'").get().count,
    1
  );
});

test('invalidated challenges remain in the rolling window and cannot reset the hourly limit', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  let deliveries = 0;
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        deliveries += 1;
        return { provider: 'test-binding', id: `rolling-window-${deliveries}` };
      }
    }
  });
  for (let index = 0; index < 5; index += 1) {
    const response = await requestEmailCode({
      request: emailRequest('rolling-limit@example.com'),
      env: configured
    });
    assert.equal(response.status, 202);
    const outsideCooldown = new Date(Date.now() - (index + 2) * 60_000).toISOString();
    db.raw.prepare(`
      UPDATE portal_email_challenges SET created_at = ?
      WHERE rowid = (SELECT max(rowid) FROM portal_email_challenges)
    `).run(outsideCooldown);
  }
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_email_challenges').get().count, 5);
  const limited = await requestEmailCode({
    request: emailRequest('rolling-limit@example.com'),
    env: configured
  });
  assert.equal(limited.status, 429);
  assert.equal(deliveries, 5);
});

test('fingerprint limits requests across addresses without persisting a raw IP address', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  await requestChallenge(db, 'first@example.com');
  const seed = db.raw.prepare('SELECT request_fingerprint_hash FROM portal_email_challenges').get();
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000).toISOString();
  const oneHourLater = new Date(Date.now() + 60 * 60_000).toISOString();
  db.raw.prepare('UPDATE portal_email_challenges SET created_at = ?').run(fiveMinutesAgo);
  const insert = db.raw.prepare(`
    INSERT INTO portal_email_challenges
      (id_hash, email_normalized, email_display, code_hash, request_fingerprint_hash, locale,
       return_path, expires_at, attempts, max_attempts, consumed_at, invalidated_at, sent_at, created_at)
    VALUES (?, ?, ?, 'hash', ?, 'en', '/portal/', ?, 0, 5, '', '', ?, ?)
  `);
  for (let index = 1; index < 10; index += 1) {
    const address = `fingerprint-${index}@example.com`;
    insert.run(`fingerprint-rate-${index}`, address, address, seed.request_fingerprint_hash, oneHourLater, fiveMinutesAgo, fiveMinutesAgo);
  }
  assert.equal(seed.request_fingerprint_hash.includes('203.0.113.42'), false);
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        throw new Error('fingerprint-limited requests must not send email');
      }
    }
  });
  const response = await requestEmailCode({ request: emailRequest('another@example.com'), env: configured });
  assert.equal(response.status, 429);
  assert.equal((await response.json()).error, 'email_code_rate_limited');
});

test('a delivery failure invalidates only the unsent challenge and returns no challenge cookie', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, {
    EMAIL_TRANSPORT: {
      async sendTransactionalEmail() {
        throw new Error('provider unavailable');
      }
    }
  });
  const response = await requestEmailCode({ request: emailRequest('delivery@example.com'), env: configured });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('Set-Cookie'), null);
  const stored = db.raw.prepare('SELECT invalidated_at, sent_at FROM portal_email_challenges').get();
  assert.notEqual(stored.invalidated_at, '');
  assert.equal(stored.sent_at, '');
});

test('Google and email verification converge on one account, while admin access needs a persisted identity', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com, backup@example.com' });
  const google = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'google-subject-123', email: 'Owner@Example.com',
    providerEmailAuthoritative: true
  });
  const email = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'owner@example.com', email: 'owner@example.com'
  });
  assert.equal(email.id, google.id);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_users').get().count, 1);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_identities').get().count, 2);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_verified_emails').get().count, 1);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_admin_identities').get().count, 2);

  const adminSession = await issuePortalSession(
    new Request(`${localOrigin}/api/admin/cases`), configured, google.id,
    { provider: 'google', providerSubject: 'google-subject-123' }
  );
  const adminRequest = new Request(`${localOrigin}/api/admin/cases`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      Cookie: adminSession.cookie,
      'X-CSRF-Token': adminSession.csrfToken
    }
  });
  assert.equal((await requireAdmin(adminRequest, configured)).session.user_id, google.id);

  const client = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'client@example.com', email: 'client@example.com'
  });
  db.raw.prepare("UPDATE portal_users SET role = 'admin' WHERE id = ?").run(client.id);
  const forgedSession = await issuePortalSession(
    new Request(`${localOrigin}/api/admin/cases`), configured, client.id,
    { provider: 'email', providerSubject: 'client@example.com' }
  );
  const forgedRequest = new Request(`${localOrigin}/api/admin/cases`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      Cookie: forgedSession.cookie,
      'X-CSRF-Token': forgedSession.csrfToken
    }
  });
  assert.equal((await requireAdmin(forgedRequest, configured)).error.status, 403);
});

test('a non-authoritative Google address cannot silently merge an existing email account or bootstrap admin', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'external-admin@example.com' });
  const emailUser = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'buyer@example.com', email: 'buyer@example.com'
  });

  await assert.rejects(
    upsertVerifiedIdentity(configured, {
      provider: 'google', providerSubject: 'external-google-buyer', email: 'buyer@example.com',
      providerEmailAuthoritative: false
    }),
    /google_email_link_required/
  );
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_users').get().count, 1);
  assert.equal(db.raw.prepare("SELECT COUNT(*) AS count FROM portal_identities WHERE provider = 'google'").get().count, 0);

  const externalAdmin = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'external-google-admin', email: 'external-admin@example.com',
    providerEmailAuthoritative: false
  });
  assert.equal(externalAdmin.role, 'client');
  assert.equal(externalAdmin.is_admin_identity, 0);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_admin_identities').get().count, 0);
  assert.equal(
    db.raw.prepare("SELECT email_authoritative FROM portal_identities WHERE provider_subject = 'external-google-admin'").get().email_authoritative,
    0
  );
  assert.equal(
    db.raw.prepare("SELECT COUNT(*) AS count FROM portal_verified_emails WHERE email_normalized = 'external-admin@example.com'").get().count,
    0
  );

  const explicitEmailLink = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'external-admin@example.com', email: 'external-admin@example.com'
  });
  assert.notEqual(explicitEmailLink.id, externalAdmin.id);
  assert.equal(explicitEmailLink.role, 'admin');
  assert.notEqual(explicitEmailLink.id, emailUser.id);
  assert.equal(
    db.raw.prepare("SELECT user_id FROM portal_verified_emails WHERE email_normalized = 'external-admin@example.com'").get().user_id,
    explicitEmailLink.id
  );
  assert.equal(
    db.raw.prepare("SELECT user_id FROM portal_identities WHERE provider_subject = 'external-google-admin'").get().user_id,
    externalAdmin.id
  );

  const assigned = await createAdminCase(configured, { user_id: explicitEmailLink.id }, {
    customerEmail: 'external-admin@example.com',
    locale: 'en',
    tier: 't1',
    supplierName: 'Email-owned supplier',
    productCategory: 'charger',
    decisionContext: 'Must not be assigned to the Google-only account'
  });
  assert.equal(assigned.pendingInvitation, false);
  assert.equal(assigned.ownerUserId, explicitEmailLink.id);
  assert.notEqual(assigned.ownerUserId, externalAdmin.id);
});

test('a non-authoritative Google address cannot claim an admin invitation for that mailbox', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const admin = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'owner@example.com', email: 'owner@example.com'
  });
  const timestamp = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
  db.raw.prepare(`
    INSERT INTO portal_customer_invites
      (id, email_normalized, email_display, locale, status, created_by_user_id, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, 'en', 'pending', ?, ?, ?, ?)
  `).run(
    'invite-non-authoritative-google', 'invited@external.example', 'invited@external.example',
    admin.id, expiresAt, timestamp, timestamp
  );
  db.raw.prepare(`
    INSERT INTO portal_invited_cases
      (id, invite_id, case_id, case_public_reference, service_tier, supplier_name,
       product_category, decision_context, created_at, updated_at)
    VALUES (?, ?, ?, ?, 't1', ?, 'charger', ?, ?, ?)
  `).run(
    'draft-non-authoritative-google', 'invite-non-authoritative-google',
    'case-non-authoritative-google', 'ZM-2026-NONAUTH', 'Private Invited Factory',
    'Must require authoritative mailbox verification', timestamp, timestamp
  );

  const googleUser = await upsertVerifiedIdentity(configured, {
    provider: 'google',
    providerSubject: 'external-google-subject',
    email: 'invited@external.example',
    providerEmailAuthoritative: false
  });
  assert.equal(googleUser.claimedCases, 0);
  assert.equal(
    db.raw.prepare("SELECT COUNT(*) AS count FROM portal_verified_emails WHERE email_normalized = 'invited@external.example'").get().count,
    0
  );
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
  assert.equal(
    db.raw.prepare('SELECT status FROM portal_customer_invites WHERE id = ?').get('invite-non-authoritative-google').status,
    'pending'
  );
  assert.equal(
    db.raw.prepare('SELECT status FROM portal_invited_cases WHERE id = ?').get('draft-non-authoritative-google').status,
    'pending'
  );

  const emailUser = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'invited@external.example', email: 'invited@external.example'
  });
  assert.notEqual(emailUser.id, googleUser.id);
  assert.equal(emailUser.claimedCases, 1);
  assert.equal(
    db.raw.prepare("SELECT owner_user_id FROM portal_cases WHERE id = 'case-non-authoritative-google'").get().owner_user_id,
    emailUser.id
  );
  assert.equal(
    db.raw.prepare("SELECT user_id FROM portal_identities WHERE provider_subject = 'external-google-subject'").get().user_id,
    googleUser.id
  );
});

test('Gmail and hd-verified Workspace identities may authoritatively merge by email', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db);
  assert.equal(googleEmailIsAuthoritative({ email: 'buyer@gmail.com', email_verified: true }), true);
  assert.equal(googleEmailIsAuthoritative({
    email: 'buyer@company.example', email_verified: true, hd: 'company.example'
  }), true);
  assert.equal(googleEmailIsAuthoritative({ email: 'buyer@company.example', email_verified: true }), false);
  assert.equal(googleEmailIsAuthoritative({
    email: 'buyer@company.example', email_verified: true, hd: 'different.example'
  }), false);
  assert.equal(googleEmailIsAuthoritative({ email: 'buyer@gmail.com', email_verified: false }), false);

  const gmailEmail = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'buyer@gmail.com', email: 'buyer@gmail.com'
  });
  const gmailGoogle = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'gmail-google-subject', email: 'buyer@gmail.com',
    providerEmailAuthoritative: googleEmailIsAuthoritative({ email: 'buyer@gmail.com', email_verified: true })
  });
  assert.equal(gmailGoogle.id, gmailEmail.id);

  const workspaceEmail = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'buyer@company.example', email: 'buyer@company.example'
  });
  const workspaceGoogle = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'workspace-google-subject', email: 'buyer@company.example',
    providerEmailAuthoritative: googleEmailIsAuthoritative({
      email: 'buyer@company.example', email_verified: true, hd: 'company.example'
    })
  });
  assert.equal(workspaceGoogle.id, workspaceEmail.id);
});

test('provider email drift fails closed and an email session cannot inherit another principal admin grant', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const bootstrap = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const google = await upsertVerifiedIdentity(bootstrap, {
    provider: 'google', providerSubject: 'stable-google-subject', email: 'owner@example.com',
    providerEmailAuthoritative: true
  });
  const persistedOnly = env(db, { PORTAL_ADMIN_EMAILS: '' });

  await assert.rejects(
    upsertVerifiedIdentity(persistedOnly, {
      provider: 'google', providerSubject: 'stable-google-subject', email: 'replacement@example.com'
    }),
    /provider_email_changed/
  );
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_verified_emails').get().count, 1);

  const sameAccountViaEmail = await upsertVerifiedIdentity(persistedOnly, {
    provider: 'email', providerSubject: 'owner@example.com', email: 'owner@example.com'
  });
  assert.equal(sameAccountViaEmail.id, google.id);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_admin_identities').get().count, 1);

  const googleSession = await issuePortalSession(
    new Request(`${localOrigin}/api/admin/cases`), persistedOnly, google.id,
    { provider: 'google', providerSubject: 'stable-google-subject' }
  );
  const googleRequest = new Request(`${localOrigin}/api/admin/cases`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      Cookie: googleSession.cookie,
      'X-CSRF-Token': googleSession.csrfToken
    }
  });
  assert.equal((await requireAdmin(googleRequest, persistedOnly)).session.user_id, google.id);

  const emailSession = await issuePortalSession(
    new Request(`${localOrigin}/api/admin/cases`), persistedOnly, google.id,
    { provider: 'email', providerSubject: 'owner@example.com' }
  );
  const emailRequestForAdmin = new Request(`${localOrigin}/api/admin/cases`, {
    method: 'POST',
    headers: {
      Origin: localOrigin,
      Cookie: emailSession.cookie,
      'X-CSRF-Token': emailSession.csrfToken
    }
  });
  assert.equal((await requireAdmin(emailRequestForAdmin, persistedOnly)).error.status, 403);
});

test('an admin-prepared case stays outside customer tables until the invited email verifies and claims it', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const admin = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'owner-google-subject', email: 'owner@example.com'
  });
  const now = new Date().toISOString();
  const inviteExpiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
  db.raw.prepare(`
    INSERT INTO portal_customer_invites
      (id, email_normalized, email_display, locale, status, created_by_user_id, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, 'en', 'pending', ?, ?, ?, ?)
  `).run('invite-1', 'new-buyer@example.com', 'new-buyer@example.com', admin.id, inviteExpiresAt, now, now);
  db.raw.prepare(`
    INSERT INTO portal_invited_cases
      (id, invite_id, case_id, case_public_reference, service_tier, supplier_name, product_category,
       decision_context, order_id, order_public_reference, order_product_key, order_amount_total,
       order_payment_status, order_fulfillment_status, created_at, updated_at)
    VALUES (?, ?, ?, ?, 't1', ?, 'charger', ?, ?, ?, 't1', 14900, 'paid', 'awaiting_intake', ?, ?)
  `).run(
    'draft-1', 'invite-1', 'case-invited-1', 'ZM-2026-INVITED1', 'Invited Factory',
    'Manually created after an external payment', 'order-invited-1', 'ORDER-INVITED1', now, now
  );
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_users').get().count, 1);

  const buyer = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'new-buyer@example.com', email: 'new-buyer@example.com'
  });
  assert.equal(buyer.claimedCases, 1);
  const claimedCase = db.raw.prepare('SELECT owner_user_id, payment_order_id FROM portal_cases').get();
  assert.equal(claimedCase.owner_user_id, buyer.id);
  assert.equal(claimedCase.payment_order_id, 'order-invited-1');
  assert.equal(db.raw.prepare('SELECT owner_user_id FROM portal_orders').get().owner_user_id, buyer.id);
  const claimedInvite = db.raw.prepare('SELECT status, claimed_by_user_id FROM portal_customer_invites').get();
  assert.equal(claimedInvite.status, 'claimed');
  assert.equal(claimedInvite.claimed_by_user_id, buyer.id);
});

test('an expired customer invitation is revoked and cannot be claimed by a later login', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const admin = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'owner-expiry-subject', email: 'owner@example.com'
  });
  const now = new Date();
  const timestamp = now.toISOString();
  const expiredAt = new Date(now.getTime() - 60_000).toISOString();
  db.raw.prepare(`
    INSERT INTO portal_customer_invites
      (id, email_normalized, email_display, locale, status, created_by_user_id, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, 'en', 'pending', ?, ?, ?, ?)
  `).run('invite-expired', 'late@example.com', 'late@example.com', admin.id, expiredAt, timestamp, timestamp);
  db.raw.prepare(`
    INSERT INTO portal_invited_cases
      (id, invite_id, case_id, case_public_reference, service_tier, supplier_name, product_category,
       decision_context, created_at, updated_at)
    VALUES (?, ?, ?, ?, 't1', ?, 'charger', ?, ?, ?)
  `).run(
    'draft-expired', 'invite-expired', 'case-expired', 'ZM-2026-EXPIRED', 'Expired Factory',
    'Must not become visible after expiration', timestamp, timestamp
  );

  const buyer = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'late@example.com', email: 'late@example.com', now
  });
  assert.equal(buyer.claimedCases, 0);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
  assert.equal(db.raw.prepare('SELECT status FROM portal_customer_invites').get().status, 'revoked');
  assert.equal(db.raw.prepare('SELECT status FROM portal_invited_cases').get().status, 'revoked');
});

test('large invite sets claim in resumable batches below D1 query and parameter limits', async (t) => {
  const db = new SqliteD1();
  t.after(() => db.close());
  const configured = env(db, { PORTAL_ADMIN_EMAILS: 'owner@example.com' });
  const admin = await upsertVerifiedIdentity(configured, {
    provider: 'google', providerSubject: 'batch-owner-subject', email: 'owner@example.com'
  });
  const timestamp = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
  db.raw.prepare(`
    INSERT INTO portal_customer_invites
      (id, email_normalized, email_display, locale, status, created_by_user_id, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, 'en', 'pending', ?, ?, ?, ?)
  `).run('invite-batch', 'batch-buyer@example.com', 'batch-buyer@example.com', admin.id, expiresAt, timestamp, timestamp);
  const insertDraft = db.raw.prepare(`
    INSERT INTO portal_invited_cases
      (id, invite_id, case_id, case_public_reference, service_tier, supplier_name,
       product_category, decision_context, created_at, updated_at)
    VALUES (?, 'invite-batch', ?, ?, 't1', ?, 'charger', 'Batch claim test', ?, ?)
  `);
  for (let index = 0; index < 120; index += 1) {
    const suffix = String(index).padStart(3, '0');
    insertDraft.run(
      `draft-batch-${suffix}`,
      `case-batch-${suffix}`,
      `ZM-2026-BATCH${suffix}`,
      `Batch Factory ${suffix}`,
      timestamp,
      timestamp
    );
  }

  db.resetMetrics();
  const first = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'batch-buyer@example.com', email: 'batch-buyer@example.com'
  });
  assert.equal(first.claimedCases, 100);
  assert.equal(db.queryCount < 50, true, `first claim used ${db.queryCount} D1 queries`);
  assert.equal(db.maxBoundParameters < 100, true, `first claim bound ${db.maxBoundParameters} parameters`);
  assert.equal(db.raw.prepare("SELECT COUNT(*) AS count FROM portal_invited_cases WHERE status = 'pending'").get().count, 20);

  db.resetMetrics();
  const second = await upsertVerifiedIdentity(configured, {
    provider: 'email', providerSubject: 'batch-buyer@example.com', email: 'batch-buyer@example.com'
  });
  assert.equal(second.claimedCases, 20);
  assert.equal(db.queryCount < 50, true, `continued claim used ${db.queryCount} D1 queries`);
  assert.equal(db.maxBoundParameters < 100, true, `continued claim bound ${db.maxBoundParameters} parameters`);
  assert.equal(db.raw.prepare("SELECT COUNT(*) AS count FROM portal_cases WHERE owner_user_id = ?").get(second.id).count, 120);
  assert.equal(db.raw.prepare('SELECT status FROM portal_customer_invites WHERE id = ?').get('invite-batch').status, 'claimed');
});

test('email normalization rejects malformed addresses and canonicalizes casing', () => {
  assert.deepEqual(normalizeEmail('  Buyer@Example.COM  '), {
    display: 'buyer@example.com', normalized: 'buyer@example.com'
  });
  assert.equal(normalizeEmail('two@@example.com'), null);
  assert.equal(normalizeEmail('buyer@localhost'), null);
  assert.equal(normalizeEmail('buyer@example.com:443'), null);
  assert.equal(normalizeEmail('buyer@example.com/path'), null);
  assert.equal(normalizeEmail('buyer@-example.com'), null);
  assert.equal(normalizeEmail('buyer@example..com'), null);
  assert.equal(normalizeEmail('.buyer@example.com'), null);
});
