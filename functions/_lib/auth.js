import { createRemoteJWKSet, jwtVerify } from 'jose';
import { emailSenderConfigured } from './email.js';

const encoder = new TextEncoder();
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const PORTAL_PATHS = new Set(['/portal/', '/zh-tw/portal/', '/zh-cn/portal/']);
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const SESSION_IDLE_SECONDS = 24 * 60 * 60;
const SESSION_TOUCH_INTERVAL_SECONDS = 5 * 60;
const EMAIL_CHALLENGE_TTL_SECONDS = 10 * 60;
const INVITE_CLAIM_BATCH_LIMIT = 100;

export const PORTAL_SECURITY_HEADERS = Object.freeze({
  'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
});

export function portalJson(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
      'Vary': 'Cookie',
      ...extraHeaders,
      ...PORTAL_SECURITY_HEADERS
    }
  });
}

export function portalRedirect(location, status = 302, extraHeaders = {}) {
  return new Response(null, {
    status,
    headers: {
      Location: String(location),
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex',
      ...extraHeaders,
      ...PORTAL_SECURITY_HEADERS
    }
  });
}

export function portalDb(env) {
  if (env.PORTAL_DB) return env.PORTAL_DB;
  if (env.ALLOW_LOCAL_PORTAL === 'true' && env.ANALYTICS_DB) return env.ANALYTICS_DB;
  throw new Error('portal_database_not_configured');
}

export function portalCoreEnabled(env) {
  const sessionSecret = String(env.PORTAL_SESSION_SECRET || env.AUTH_SESSION_SECRET || '');
  return env.PORTAL_AUTH_ENABLED === 'true'
    && Boolean(env.PORTAL_DB || (env.ALLOW_LOCAL_PORTAL === 'true' && env.ANALYTICS_DB))
    && encoder.encode(sessionSecret).byteLength >= 32;
}

export function googleAuthEnabled(env) {
  return portalCoreEnabled(env)
    && Boolean(String(env.GOOGLE_CLIENT_ID || '').trim())
    && Boolean(String(env.GOOGLE_CLIENT_SECRET || '').trim());
}

export function emailAuthEnabled(env) {
  const codeSecret = String(env.PORTAL_EMAIL_CODE_SECRET || '');
  return portalCoreEnabled(env)
    && env.PORTAL_EMAIL_AUTH_ENABLED === 'true'
    && encoder.encode(codeSecret).byteLength >= 32
    && emailSenderConfigured(env);
}

export function authEnabled(env) {
  return googleAuthEnabled(env) || emailAuthEnabled(env);
}

export function authCapabilities(env) {
  return {
    google: googleAuthEnabled(env),
    email: emailAuthEnabled(env)
  };
}

export function cleanPortalLocale(value) {
  return ['en', 'zh-tw', 'zh-cn'].includes(value) ? value : 'en';
}

export function portalPath(locale) {
  return locale === 'en' ? '/portal/' : `/${cleanPortalLocale(locale)}/portal/`;
}

export function safeReturnPath(value, locale = 'en') {
  const candidate = String(value || '');
  return PORTAL_PATHS.has(candidate) ? candidate : portalPath(locale);
}

export function randomToken(bytes = 32) {
  const value = new Uint8Array(bytes);
  crypto.getRandomValues(value);
  return base64Url(value);
}

function base64Url(value) {
  let binary = '';
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export async function sha256(value) {
  return base64Url(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(String(value)))));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(String(value)))));
}

export async function sessionTokenHash(token, env) {
  const secret = String(env.PORTAL_SESSION_SECRET || env.AUTH_SESSION_SECRET || '');
  if (encoder.encode(secret).byteLength < 32) throw new Error('portal_session_secret_not_configured');
  return hmac(token, secret);
}

export async function emailCodeHash(challengeHash, code, env) {
  const secret = String(env.PORTAL_EMAIL_CODE_SECRET || '');
  if (encoder.encode(secret).byteLength < 32) throw new Error('portal_email_code_secret_not_configured');
  return hmac(`${challengeHash}:${String(code)}`, secret);
}

export function constantTimeEqual(left, right) {
  const a = String(left || '');
  const b = String(right || '');
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return difference === 0;
}

export function cookieValue(request, name) {
  const cookies = request.headers.get('Cookie') || '';
  for (const part of cookies.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) {
      try {
        return decodeURIComponent(value.join('='));
      } catch {
        return '';
      }
    }
  }
  return '';
}

function isLocalRequest(request) {
  const url = new URL(request.url);
  return url.protocol === 'http:' && (url.hostname === '127.0.0.1' || url.hostname === 'localhost');
}

export function oauthRequestAllowed(request, env) {
  const origin = new URL(request.url).origin;
  if (origin === 'https://zimonai.com') return true;
  return env.ALLOW_LOCAL_PORTAL === 'true' && isLocalRequest(request);
}

export function sessionCookieName(request) {
  return isLocalRequest(request) ? 'zm_session' : '__Host-zm_session';
}

export function oauthCookieName(request) {
  return isLocalRequest(request) ? 'zm_oauth' : '__Host-zm_oauth';
}

export function emailChallengeCookieName(request) {
  return isLocalRequest(request) ? 'zm_email_challenge' : '__Host-zm_email_challenge';
}

export function setCookie(request, name, value, maxAge) {
  const secure = isLocalRequest(request) ? '' : '; Secure';
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${Math.max(0, Math.floor(maxAge))}`;
}

export function clearCookie(request, name) {
  return setCookie(request, name, '', 0);
}

export function requestOriginAllowed(request, env) {
  const origin = request.headers.get('Origin') || '';
  if (origin === 'https://zimonai.com' || origin === 'https://www.zimonai.com') return true;
  return env.ALLOW_LOCAL_PORTAL === 'true' && /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/.test(origin);
}

export function oauthBaseUrl(request, env) {
  const current = new URL(request.url);
  if (env.AUTH_BASE_URL === 'https://zimonai.com') return env.AUTH_BASE_URL;
  if (env.ALLOW_LOCAL_PORTAL === 'true' && isLocalRequest(request)) return current.origin;
  return 'https://zimonai.com';
}

export async function readPortalJson(request, maxBytes = 24_000) {
  const mediaType = String(request.headers.get('Content-Type') || '').split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return { error: portalJson({ error: 'invalid_content_type' }, 415) };
  }
  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > maxBytes) return { error: portalJson({ error: 'request_too_large' }, 413) };
  const body = await readBoundedBody(request, maxBytes);
  if (body === null) return { error: portalJson({ error: 'request_too_large' }, 413) };
  try {
    return { data: JSON.parse(new TextDecoder().decode(body)) };
  } catch {
    return { error: portalJson({ error: 'invalid_json' }, 400) };
  }
}

async function readBoundedBody(request, maxBytes) {
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      try {
        await reader.cancel('request_too_large');
      } catch {
        // The size limit has already been enforced; cancellation is best-effort.
      }
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

export function cleanText(value, maxLength, required = false) {
  const text = String(value || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  if ((required && !text) || text.length > maxLength) return null;
  return text;
}

export function cleanExternalUrl(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (text.length > 500) return null;
  try {
    const url = new URL(text);
    return ['https:', 'http:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function normalizeEmail(value) {
  const input = String(value || '').normalize('NFKC').trim();
  if (!input || input.length > 254 || /[\s\u0000-\u001F\u007F]/.test(input)) return null;
  const at = input.lastIndexOf('@');
  if (at <= 0 || at !== input.indexOf('@') || at > 64 || at === input.length - 1) return null;
  const local = input.slice(0, at).toLowerCase();
  const domain = input.slice(at + 1).toLowerCase();
  if (!/^[a-z0-9.-]+$/.test(domain) || !domain.includes('.') || domain.length > 253
    || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return null;
  const labels = domain.split('.');
  if (labels.some((label) => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))) return null;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return null;
  if (!local || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return null;
  return { display: `${local}@${domain}`, normalized: `${local}@${domain}` };
}

export function adminEmails(env) {
  return new Set(String(env.PORTAL_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => normalizeEmail(email)?.normalized || '')
    .filter(Boolean));
}

export function isAdminEmail(email, env) {
  const normalized = normalizeEmail(email)?.normalized;
  return Boolean(normalized && adminEmails(env).has(normalized));
}

async function isolateUnsafeVerifiedEmail(db, normalizedEmail, timestamp) {
  const unsafe = await db.prepare(`
    SELECT 1 AS unsafe
    FROM portal_verified_emails e
    JOIN portal_identities i ON i.user_id = e.user_id
    WHERE e.email_normalized = ?1
      AND i.provider = 'google'
      AND i.email_authoritative = 0
      AND lower(trim(i.provider_email)) = ?1
    LIMIT 1
  `).bind(normalizedEmail.normalized).first();
  if (!unsafe?.unsafe) return false;

  // This also closes the migration-to-code cutover window: if the previous
  // release writes a mapping after migration 0005 ran, either a Google or Email
  // login will isolate every unsupported Google principal before ownership is
  // resolved. Existing data never follows those principals automatically.
  await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO portal_identity_quarantine
        (provider, provider_subject, original_user_id, isolated_user_id,
         email_normalized, reason, created_at)
      SELECT i.provider, i.provider_subject, i.user_id,
             'usr_isolated_' || lower(hex(randomblob(16))), ?1,
             'runtime_non_authoritative_google_isolation', ?2
      FROM portal_identities i
      JOIN portal_verified_emails e ON e.user_id = i.user_id AND e.email_normalized = ?1
      WHERE i.provider = 'google' AND i.email_authoritative = 0
        AND lower(trim(i.provider_email)) = ?1
    `).bind(normalizedEmail.normalized, timestamp),
    db.prepare(`
      INSERT OR IGNORE INTO portal_users
        (id, primary_email, email_normalized, display_name, avatar_url, locale,
         role, status, created_at, updated_at, last_login_at)
      SELECT q.isolated_user_id, i.provider_email, q.email_normalized, '', '', u.locale,
             'client', 'active', ?1, ?1, ?1
      FROM portal_identity_quarantine q
      JOIN portal_identities i
        ON i.provider = q.provider AND i.provider_subject = q.provider_subject
      JOIN portal_users u ON u.id = q.original_user_id
      WHERE q.email_normalized = ?2
    `).bind(timestamp, normalizedEmail.normalized),
    db.prepare(`
      UPDATE portal_sessions
      SET revoked_at = ?1
      WHERE (auth_provider, auth_provider_subject) IN (
        SELECT provider, provider_subject FROM portal_identity_quarantine
        WHERE email_normalized = ?2
      )
    `).bind(timestamp, normalizedEmail.normalized),
    db.prepare(`
      DELETE FROM portal_admin_identities
      WHERE (provider, provider_subject) IN (
        SELECT provider, provider_subject FROM portal_identity_quarantine
        WHERE email_normalized = ?1
      )
    `).bind(normalizedEmail.normalized),
    db.prepare(`
      UPDATE portal_identities
      SET user_id = (
            SELECT q.isolated_user_id FROM portal_identity_quarantine q
            WHERE q.provider = portal_identities.provider
              AND q.provider_subject = portal_identities.provider_subject
          ),
          email_authoritative = 0,
          updated_at = ?1
      WHERE (provider, provider_subject) IN (
        SELECT provider, provider_subject FROM portal_identity_quarantine
        WHERE email_normalized = ?2
      )
    `).bind(timestamp, normalizedEmail.normalized),
    db.prepare(`
      DELETE FROM portal_verified_emails
      WHERE email_normalized = ?1
        AND NOT EXISTS (
          SELECT 1 FROM portal_identities i
          WHERE i.user_id = portal_verified_emails.user_id
            AND i.email_authoritative = 1
            AND lower(trim(i.provider_email)) = ?1
        )
    `).bind(normalizedEmail.normalized),
    db.prepare(`
      UPDATE portal_users
      SET status = 'disabled', role = 'client', updated_at = ?1
      WHERE id IN (
          SELECT original_user_id FROM portal_identity_quarantine
          WHERE email_normalized = ?2
        )
        AND NOT EXISTS (
          SELECT 1 FROM portal_identities i
          WHERE i.user_id = portal_users.id AND i.email_authoritative = 1
        )
        AND (
          EXISTS (SELECT 1 FROM portal_cases c WHERE c.owner_user_id = portal_users.id)
          OR EXISTS (SELECT 1 FROM portal_orders o WHERE o.owner_user_id = portal_users.id)
        )
    `).bind(timestamp, normalizedEmail.normalized),
    db.prepare(`
      UPDATE portal_sessions
      SET revoked_at = ?1
      WHERE user_id IN (SELECT id FROM portal_users WHERE status = 'disabled')
    `).bind(timestamp),
    db.prepare(`
      UPDATE portal_users
      SET role = 'client', updated_at = ?1
      WHERE role = 'admin'
        AND id IN (
          SELECT original_user_id FROM portal_identity_quarantine
          WHERE email_normalized = ?2
        )
        AND NOT EXISTS (
          SELECT 1 FROM portal_admin_identities a WHERE a.user_id = portal_users.id
        )
    `).bind(timestamp, normalizedEmail.normalized)
  ]);
  return true;
}

export async function upsertVerifiedIdentity(env, {
  provider,
  providerSubject,
  email,
  providerEmailAuthoritative = provider !== 'google',
  displayName = '',
  locale = 'en',
  now = new Date()
}) {
  if (!['google', 'email'].includes(provider)) throw new Error('identity_provider_not_supported');
  const subject = cleanText(providerSubject, 512, true);
  const normalizedEmail = normalizeEmail(email);
  const name = cleanText(displayName, 160) ?? '';
  if (!subject || !normalizedEmail) throw new Error('verified_identity_invalid');
  const authoritativeProviderEmail = provider !== 'google' || providerEmailAuthoritative === true;

  const db = portalDb(env);
  const timestamp = now.toISOString();
  await isolateUnsafeVerifiedEmail(db, normalizedEmail, timestamp);
  let identity = await db.prepare(`
    SELECT u.id, u.status, i.provider_email, i.email_authoritative
    FROM portal_identities i
    JOIN portal_users u ON u.id = i.user_id
    WHERE i.provider = ?1 AND i.provider_subject = ?2
    LIMIT 1
  `).bind(provider, subject).first();
  if (identity) {
    const previousProviderEmail = normalizeEmail(identity.provider_email);
    if (!previousProviderEmail || previousProviderEmail.normalized !== normalizedEmail.normalized) {
      // A provider subject is the stable principal.  A changed mailbox must be
      // reviewed/re-linked explicitly; silently accepting it would leave the
      // previous verified address able to reach the same account.
      throw new Error('provider_email_changed');
    }
  }
  const verifiedEmail = await db.prepare(`
    SELECT u.id, u.status
    FROM portal_verified_emails e
    JOIN portal_users u ON u.id = e.user_id
    WHERE e.email_normalized = ?1
    LIMIT 1
  `).bind(normalizedEmail.normalized).first();

  // For Gmail and Google Workspace, the signed Google token is authoritative
  // for the mailbox.  A Google account using an address hosted elsewhere is
  // not: control of that Google subject must not silently grant access to an
  // account that was created through email verification (or another identity).
  // Existing provider subjects remain usable because they are already bound to
  // a user; linking a new non-authoritative subject requires an explicit flow.
  const emailAlreadyMapped = Boolean(verifiedEmail?.id);
  if (provider === 'google' && !identity && !authoritativeProviderEmail && emailAlreadyMapped) {
    throw new Error('google_email_link_required');
  }

  if (identity && authoritativeProviderEmail && verifiedEmail?.id && verifiedEmail.id !== identity.id) {
    throw new Error('verified_email_identity_conflict');
  }
  let userId = identity?.id || (authoritativeProviderEmail ? verifiedEmail?.id : '') || '';
  if (identity?.status === 'disabled' || (authoritativeProviderEmail && verifiedEmail?.status === 'disabled')) {
    throw new Error('account_access_disabled');
  }
  // A stable, secret-derived ID makes simultaneous Google/email verification
  // of the same new address converge before the unique verified-email mapping
  // exists. Non-authoritative Google addresses derive from the provider
  // subject instead, so a concurrent email login cannot accidentally turn an
  // implicit match into an account link. The source value is never exposed.
  if (!userId) {
    const stableSource = provider === 'google' && !authoritativeProviderEmail
      ? `portal-google-user:${subject}`
      : `portal-user:${normalizedEmail.normalized}`;
    const stableUserKey = await sessionTokenHash(stableSource, env);
    userId = `usr_${stableUserKey.slice(0, 24)}`;
  }

  const targetUser = await db.prepare(`
    SELECT id, status FROM portal_users WHERE id = ?1 LIMIT 1
  `).bind(userId).first();
  if (targetUser?.status === 'disabled') throw new Error('account_access_disabled');

  const persistedAdmin = await db.prepare(`
    SELECT 1 AS allowed
    FROM portal_admin_identities a
    JOIN portal_identities i
      ON i.provider = a.provider AND i.provider_subject = a.provider_subject AND i.user_id = a.user_id
    WHERE a.user_id = ?1 AND i.email_authoritative = 1
    LIMIT 1
  `).bind(userId).first();
  const bootstrapAdmin = isAdminEmail(normalizedEmail.normalized, env)
    && authoritativeProviderEmail;
  const role = persistedAdmin?.allowed || bootstrapAdmin ? 'admin' : 'client';
  const userExists = Boolean(targetUser?.id);
  const statements = [];
  if (!userExists) {
    statements.push(db.prepare(`
      INSERT OR IGNORE INTO portal_users
        (id, primary_email, email_normalized, display_name, avatar_url, locale, role, status, created_at, updated_at, last_login_at)
      VALUES (?1, ?2, ?3, ?4, '', ?5, ?6, 'active', ?7, ?7, ?7)
    `).bind(userId, normalizedEmail.display, normalizedEmail.normalized, name, cleanPortalLocale(locale), role, timestamp));
  }
  if (authoritativeProviderEmail) {
    statements.push(db.prepare(`
      INSERT INTO portal_verified_emails
        (email_normalized, email_display, user_id, verified_by, verified_at, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?5, ?5)
      ON CONFLICT(email_normalized) DO UPDATE SET
        email_display = excluded.email_display,
        verified_by = excluded.verified_by,
        verified_at = excluded.verified_at,
        updated_at = excluded.updated_at
      WHERE portal_verified_emails.user_id = excluded.user_id
    `).bind(normalizedEmail.normalized, normalizedEmail.display, userId, provider, timestamp));
  }
  statements.push(db.prepare(`
    INSERT INTO portal_identities
      (provider, provider_subject, user_id, provider_email, created_at, updated_at, email_authoritative)
    SELECT ?1, ?2, ?3, ?4, ?5, ?5, ?6
    WHERE EXISTS (SELECT 1 FROM portal_users WHERE id = ?3 AND status = 'active')
      AND (?6 = 0 OR EXISTS (
        SELECT 1 FROM portal_verified_emails
        WHERE email_normalized = ?7 AND user_id = ?3
      ))
    ON CONFLICT(provider, provider_subject) DO UPDATE SET
      provider_email = excluded.provider_email,
      updated_at = excluded.updated_at,
      email_authoritative = excluded.email_authoritative
    WHERE portal_identities.user_id = excluded.user_id
  `).bind(
    provider, subject, userId, normalizedEmail.display, timestamp,
    authoritativeProviderEmail ? 1 : 0, normalizedEmail.normalized
  ));
  if (bootstrapAdmin) {
    statements.push(db.prepare(`
      INSERT INTO portal_admin_identities
        (provider, provider_subject, user_id, verified_email, created_at)
      SELECT ?1, ?2, ?3, ?4, ?5
      WHERE EXISTS (
        SELECT 1
        FROM portal_verified_emails e
        JOIN portal_identities i
          ON i.provider = ?1 AND i.provider_subject = ?2 AND i.user_id = ?3
        WHERE e.email_normalized = ?6 AND e.user_id = ?3 AND i.email_authoritative = 1
      )
      ON CONFLICT(provider, provider_subject) DO NOTHING
    `).bind(provider, subject, userId, normalizedEmail.display, timestamp, normalizedEmail.normalized));
  }
  if (!authoritativeProviderEmail) {
    statements.push(db.prepare(`
      DELETE FROM portal_admin_identities
      WHERE provider = ?1 AND provider_subject = ?2 AND user_id = ?3
    `).bind(provider, subject, userId));
    statements.push(db.prepare(`
      DELETE FROM portal_verified_emails
      WHERE email_normalized = ?1 AND user_id = ?2
        AND NOT EXISTS (
          SELECT 1 FROM portal_identities i
          WHERE i.user_id = ?2 AND i.email_authoritative = 1
            AND lower(trim(i.provider_email)) = ?1
        )
    `).bind(normalizedEmail.normalized, userId));
  }
  statements.push(db.prepare(`
    UPDATE portal_users
    SET primary_email = ?1,
        email_normalized = ?2,
        display_name = CASE WHEN ?3 <> '' THEN ?3 ELSE display_name END,
        locale = ?4,
        role = ?5,
        updated_at = ?6,
        last_login_at = ?6
    WHERE id = ?7 AND status = 'active'
  `).bind(normalizedEmail.display, normalizedEmail.normalized, name, cleanPortalLocale(locale), role, timestamp, userId));
  await db.batch(statements);

  const confirmed = await db.prepare(`
    SELECT u.id, u.primary_email, u.email_normalized, u.display_name, u.locale, u.role, u.status,
           i.email_authoritative,
           CASE WHEN e.email_normalized IS NULL THEN 0 ELSE 1 END AS has_verified_email,
           CASE WHEN a.provider_subject IS NULL THEN 0 ELSE 1 END AS is_admin_identity
    FROM portal_identities i
    JOIN portal_users u ON u.id = i.user_id
    LEFT JOIN portal_verified_emails e ON e.user_id = i.user_id AND e.email_normalized = ?3
    LEFT JOIN portal_admin_identities a
      ON a.provider = i.provider AND a.provider_subject = i.provider_subject AND a.user_id = i.user_id
    WHERE i.provider = ?1 AND i.provider_subject = ?2
    LIMIT 1
  `).bind(provider, subject, normalizedEmail.normalized).first();
  if (!confirmed?.id || confirmed.id !== userId) throw new Error('verified_email_identity_conflict');
  if (confirmed.status !== 'active') throw new Error('account_access_disabled');
  if (authoritativeProviderEmail
    && (Number(confirmed.email_authoritative) !== 1 || Number(confirmed.has_verified_email) !== 1)) {
    throw new Error('verified_email_identity_conflict');
  }
  if (!authoritativeProviderEmail && Number(confirmed.email_authoritative) !== 0) {
    throw new Error('verified_email_identity_conflict');
  }
  if (bootstrapAdmin && Number(confirmed.is_admin_identity) !== 1) throw new Error('admin_identity_conflict');
  // A verified Google token for an externally hosted mailbox proves control of
  // the Google subject, but Google is not authoritative for that mailbox. Such
  // a principal may use its own portal account, but it must not claim work that
  // an administrator prepared for the email address. A Gmail/Workspace token
  // or a fresh email-code verification is required for that ownership step.
  const mayClaimEmailInvites = provider === 'email' || authoritativeProviderEmail;
  confirmed.claimedCases = mayClaimEmailInvites
    ? await claimPendingCustomerInvites(env, confirmed, now)
    : 0;
  return confirmed;
}

export async function claimPendingCustomerInvites(env, user, now = new Date()) {
  const normalized = normalizeEmail(user?.email_normalized || user?.primary_email);
  if (!user?.id || !normalized) throw new Error('verified_identity_invalid');
  const db = portalDb(env);
  const timestamp = now.toISOString();
  const verified = await db.prepare(`
    SELECT 1 AS verified
    FROM portal_verified_emails e
    WHERE e.email_normalized = ?1 AND e.user_id = ?2
      AND EXISTS (
        SELECT 1 FROM portal_identities i
        WHERE i.user_id = e.user_id AND i.email_authoritative = 1
          AND lower(trim(i.provider_email)) = e.email_normalized
      )
    LIMIT 1
  `).bind(normalized.normalized, user.id).first();
  if (!verified?.verified) throw new Error('invite_claim_requires_verified_email');
  await db.batch([
    db.prepare(`
      UPDATE portal_invited_cases
      SET status = 'revoked', updated_at = ?1
      WHERE status = 'pending'
        AND invite_id IN (
          SELECT id FROM portal_customer_invites
          WHERE status = 'pending' AND expires_at <= ?1
        )
    `).bind(timestamp),
    db.prepare(`
      UPDATE portal_customer_invites
      SET status = 'revoked', updated_at = ?1
      WHERE status = 'pending' AND expires_at <= ?1
    `).bind(timestamp)
  ]);
  // A fixed set of set-based statements keeps one login well below D1's free
  // per-invocation query limit and every query below its bound-parameter limit.
  // LIMIT makes the operation resumable: a later verified login claims the next
  // batch without re-processing rows already marked claimed.
  const claimed = await db.batch([
    db.prepare(`
      INSERT OR IGNORE INTO portal_cases
        (id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url, chinese_legal_name,
         product_category, product_model, decision_context, requested_checks, status, created_at, updated_at,
         case_source, expected_delivery_at, client_status_note, status_updated_at)
      SELECT d.case_id, d.case_public_reference, ?1, d.service_tier, d.supplier_name, d.supplier_url,
             d.chinese_legal_name, d.product_category, d.product_model, d.decision_context,
             d.requested_checks, d.case_status, d.created_at, ?2, 'admin', d.expected_delivery_at,
             d.client_status_note, ?2
      FROM portal_invited_cases d
      JOIN portal_customer_invites i ON i.id = d.invite_id
      WHERE i.email_normalized = ?3 AND i.status = 'pending'
        AND i.expires_at > ?2 AND d.status = 'pending'
      ORDER BY d.created_at ASC, d.id ASC
      LIMIT ?4
    `).bind(user.id, timestamp, normalized.normalized, INVITE_CLAIM_BATCH_LIMIT),
    db.prepare(`
      INSERT OR IGNORE INTO portal_orders
        (id, public_reference, owner_user_id, case_id, source, product_key, product_description,
         amount_total, currency, quantity, stripe_session_id, payment_intent_id, payment_method_note,
         service_reference, payment_status, fulfillment_status, created_by_user_id, paid_at, created_at, updated_at,
         cancelled_at, cancelled_by_user_id, archived_at, archived_by_user_id)
      SELECT d.order_id, d.order_public_reference, ?1, d.case_id, 'manual', d.order_product_key,
             d.order_product_description, d.order_amount_total, d.order_currency, d.order_quantity,
             NULL, '', d.order_payment_method_note, d.order_service_reference, d.order_payment_status,
             d.order_fulfillment_status, i.created_by_user_id, d.paid_at, d.created_at, ?2,
             d.order_cancelled_at, d.order_cancelled_by_user_id,
             d.order_archived_at, d.order_archived_by_user_id
      FROM portal_invited_cases d
      JOIN portal_customer_invites i ON i.id = d.invite_id
      WHERE i.email_normalized = ?3 AND i.status = 'pending'
        AND i.expires_at > ?2 AND d.status = 'pending'
        AND d.order_id <> '' AND d.order_public_reference <> ''
        AND EXISTS (SELECT 1 FROM portal_cases c WHERE c.id = d.case_id AND c.owner_user_id = ?1)
      ORDER BY d.created_at ASC, d.id ASC
      LIMIT ?4
    `).bind(user.id, timestamp, normalized.normalized, INVITE_CLAIM_BATCH_LIMIT),
    db.prepare(`
      UPDATE portal_cases
      SET payment_order_id = (
            SELECT d.order_id FROM portal_invited_cases d
            WHERE d.case_id = portal_cases.id AND d.order_id <> '' LIMIT 1
          ),
          updated_at = ?1
      WHERE owner_user_id = ?2
        AND id IN (
          SELECT d.case_id
          FROM portal_invited_cases d
          JOIN portal_customer_invites i ON i.id = d.invite_id
          WHERE i.email_normalized = ?3 AND i.status = 'pending'
            AND i.expires_at > ?1 AND d.status = 'pending'
            AND d.order_id <> ''
          ORDER BY d.created_at ASC, d.id ASC
          LIMIT ?4
        )
        AND EXISTS (
          SELECT 1 FROM portal_orders o
          WHERE o.id = (SELECT d.order_id FROM portal_invited_cases d WHERE d.case_id = portal_cases.id LIMIT 1)
            AND o.owner_user_id = ?2
        )
    `).bind(timestamp, user.id, normalized.normalized, INVITE_CLAIM_BATCH_LIMIT),
    db.prepare(`
      UPDATE portal_invited_cases
      SET status = 'claimed', claimed_case_id = case_id,
          claimed_order_id = CASE WHEN order_id = '' THEN NULL ELSE order_id END,
          claimed_at = ?1, updated_at = ?1
      WHERE id IN (
          SELECT d.id
          FROM portal_invited_cases d
          JOIN portal_customer_invites i ON i.id = d.invite_id
          WHERE i.email_normalized = ?2 AND i.status = 'pending'
            AND i.expires_at > ?1 AND d.status = 'pending'
          ORDER BY d.created_at ASC, d.id ASC
          LIMIT ?4
        )
        AND status = 'pending'
        AND EXISTS (SELECT 1 FROM portal_cases c WHERE c.id = case_id AND c.owner_user_id = ?3)
        AND (order_id = '' OR EXISTS (
          SELECT 1 FROM portal_orders o WHERE o.id = order_id AND o.owner_user_id = ?3
        ))
    `).bind(timestamp, normalized.normalized, user.id, INVITE_CLAIM_BATCH_LIMIT),
    db.prepare(`
      INSERT OR IGNORE INTO portal_audit_events (id, user_id, case_id, event_type, created_at)
      SELECT 'evt_claim_' || d.id, ?1, d.case_id, 'case_claimed_from_invite', ?2
      FROM portal_invited_cases d
      JOIN portal_customer_invites i ON i.id = d.invite_id
      WHERE i.email_normalized = ?3 AND d.status = 'claimed' AND d.claimed_at = ?2
        AND NOT EXISTS (
          SELECT 1 FROM portal_audit_events a
          WHERE a.case_id = d.case_id AND a.event_type = 'case_claimed_from_invite'
        )
    `).bind(user.id, timestamp, normalized.normalized),
    db.prepare(`
      UPDATE portal_customer_invites
      SET status = 'claimed', claimed_by_user_id = ?1, claimed_at = ?2, updated_at = ?2
      WHERE email_normalized = ?3 AND status = 'pending'
        AND expires_at > ?2
        AND NOT EXISTS (
          SELECT 1 FROM portal_invited_cases d
          WHERE d.invite_id = portal_customer_invites.id AND d.status = 'pending'
        )
    `).bind(user.id, timestamp, normalized.normalized)
  ]);
  return Number(claimed[3]?.meta?.changes || 0);
}

export async function issuePortalSession(request, env, userId, principal, now = new Date()) {
  const db = portalDb(env);
  const provider = cleanText(principal?.provider, 32, true);
  const providerSubject = cleanText(principal?.providerSubject, 512, true);
  if (!['google', 'email'].includes(provider) || !providerSubject) {
    throw new Error('session_principal_invalid');
  }
  const timestamp = now.toISOString();
  await db.prepare(`
    DELETE FROM portal_sessions
    WHERE token_hash IN (
      SELECT token_hash FROM portal_sessions
      WHERE user_id = ?1 AND (expires_at <= ?2 OR revoked_at <> '')
      ORDER BY created_at ASC
      LIMIT 25
    )
  `).bind(userId, timestamp).run();
  await db.prepare(`
    UPDATE portal_sessions
    SET revoked_at = ?1
    WHERE user_id = ?2 AND revoked_at = '' AND token_hash NOT IN (
      SELECT token_hash FROM portal_sessions
      WHERE user_id = ?2 AND revoked_at = '' AND expires_at > ?1
      ORDER BY created_at DESC
      LIMIT 4
    )
  `).bind(timestamp, userId).run();

  const token = randomToken(40);
  const csrfToken = randomToken(32);
  const expiresAt = sessionExpiry(now);
  const created = await db.prepare(`
    INSERT INTO portal_sessions
      (token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, revoked_at,
       auth_provider, auth_provider_subject)
    SELECT ?1, ?2, ?3, ?4, ?5, ?5, '', ?6, ?7
    FROM portal_identities
    WHERE provider = ?6 AND provider_subject = ?7 AND user_id = ?2
  `).bind(
    await sessionTokenHash(token, env),
    userId,
    csrfToken,
    expiresAt.toISOString(),
    timestamp,
    provider,
    providerSubject
  ).run();
  if (Number(created.meta?.changes || 0) !== 1) throw new Error('session_principal_invalid');
  return {
    token,
    csrfToken,
    expiresAt,
    cookie: setCookie(request, sessionCookieName(request), token, SESSION_TTL_SECONDS)
  };
}

export async function requireAdmin(request, env, { mutation = true } = {}) {
  let session;
  if (mutation) {
    const authorization = await requireMutation(request, env);
    if (authorization.error) return authorization;
    session = authorization.session;
  } else {
    session = await getPortalSession(request, env);
    if (!session) return { error: portalJson({ error: 'authentication_required' }, 401) };
  }
  if (session.role !== 'admin' || Number(session.is_admin_principal) !== 1) {
    return { error: portalJson({ error: 'admin_required' }, 403) };
  }
  return { session };
}

export async function getPortalSession(request, env, { touch = true } = {}) {
  const token = cookieValue(request, sessionCookieName(request));
  if (!token || token.length > 180) return null;
  let tokenHash;
  try {
    tokenHash = await sessionTokenHash(token, env);
  } catch {
    return null;
  }
  const now = new Date();
  const idleCutoff = new Date(now.getTime() - SESSION_IDLE_SECONDS * 1000).toISOString();
  const row = await portalDb(env).prepare(`
    SELECT s.token_hash, s.user_id, s.csrf_token, s.expires_at, s.last_seen_at,
           s.auth_provider, s.auth_provider_subject,
           u.primary_email, u.display_name, u.locale, u.role, u.status,
           CASE WHEN a.provider_subject IS NULL THEN 0 ELSE 1 END AS is_admin_principal
    FROM portal_sessions s
    JOIN portal_users u ON u.id = s.user_id
    JOIN portal_identities i
      ON i.provider = s.auth_provider
     AND i.provider_subject = s.auth_provider_subject
     AND i.user_id = s.user_id
    LEFT JOIN portal_admin_identities a
      ON a.provider = s.auth_provider
     AND a.provider_subject = s.auth_provider_subject
     AND a.user_id = s.user_id
    WHERE s.token_hash = ?1
      AND s.revoked_at = ''
      AND s.expires_at > ?2
      AND s.last_seen_at > ?3
      AND u.status = 'active'
      AND NOT (
        i.provider = 'google'
        AND i.email_authoritative = 0
        AND EXISTS (
          SELECT 1 FROM portal_verified_emails e
          WHERE e.user_id = i.user_id
            AND e.email_normalized = lower(trim(i.provider_email))
        )
      )
    LIMIT 1
  `).bind(tokenHash, now.toISOString(), idleCutoff).first();
  if (!row) return null;
  const lastSeenAt = Date.parse(row.last_seen_at);
  const shouldTouch = touch && (!Number.isFinite(lastSeenAt)
    || now.getTime() - lastSeenAt >= SESSION_TOUCH_INTERVAL_SECONDS * 1000);
  if (shouldTouch) {
    await portalDb(env).prepare('UPDATE portal_sessions SET last_seen_at = ?1 WHERE token_hash = ?2')
      .bind(now.toISOString(), tokenHash).run();
  }
  return { ...row, token, tokenHash };
}

export async function requireMutation(request, env) {
  if (!requestOriginAllowed(request, env)) return { error: portalJson({ error: 'origin_not_allowed' }, 403) };
  const session = await getPortalSession(request, env);
  if (!session) return { error: portalJson({ error: 'authentication_required', authEnabled: authEnabled(env) }, 401) };
  const csrf = request.headers.get('X-CSRF-Token') || '';
  if (!csrf || csrf !== session.csrf_token) return { error: portalJson({ error: 'csrf_failed' }, 403) };
  return { session };
}

export async function verifyGoogleIdToken(idToken, env, expectedNonce) {
  const result = await jwtVerify(idToken, GOOGLE_JWKS, {
    issuer: GOOGLE_ISSUERS,
    audience: env.GOOGLE_CLIENT_ID,
    algorithms: ['RS256'],
    clockTolerance: 5,
    maxTokenAge: '10m'
  });
  const claims = result.payload;
  if (claims.nonce !== expectedNonce) throw new Error('google_nonce_mismatch');
  if (claims.email_verified !== true || !claims.sub || !claims.email) throw new Error('google_identity_unverified');
  const hasMultipleAudiences = Array.isArray(claims.aud) && claims.aud.length > 1;
  if ((hasMultipleAudiences || claims.azp) && claims.azp !== env.GOOGLE_CLIENT_ID) {
    throw new Error('google_authorized_party_mismatch');
  }
  return claims;
}

export function googleEmailIsAuthoritative(claims) {
  if (claims?.email_verified !== true) return false;
  const normalized = normalizeEmail(claims?.email);
  if (!normalized) return false;
  if (normalized.normalized.endsWith('@gmail.com')) return true;
  const hostedDomain = String(claims?.hd || '').trim().toLowerCase();
  const emailDomain = normalized.normalized.slice(normalized.normalized.lastIndexOf('@') + 1);
  return Boolean(hostedDomain
    && hostedDomain.length <= 253
    && /^[a-z0-9.-]+$/.test(hostedDomain)
    && !hostedDomain.startsWith('.')
    && !hostedDomain.endsWith('.')
    && !hostedDomain.includes('..')
    && hostedDomain === emailDomain);
}

export function sessionExpiry(now = new Date()) {
  return new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);
}

export { EMAIL_CHALLENGE_TTL_SECONDS, SESSION_TOUCH_INTERVAL_SECONDS, SESSION_TTL_SECONDS };
