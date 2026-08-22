import {
  EMAIL_CHALLENGE_TTL_SECONDS,
  cleanPortalLocale,
  emailAuthEnabled,
  emailChallengeCookieName,
  emailCodeHash,
  normalizeEmail,
  portalDb,
  portalJson,
  randomToken,
  readPortalJson,
  requestOriginAllowed,
  safeReturnPath,
  sessionTokenHash,
  setCookie,
  sha256
} from '../../../_lib/auth.js';
import { sendTransactionalEmail, verificationEmail } from '../../../_lib/email.js';

const EMAIL_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_WINDOW_LIMIT = 5;
const FINGERPRINT_WINDOW_LIMIT = 10;
const REQUEST_COOLDOWN_MS = 60 * 1000;

export function generateVerificationCode() {
  const range = 1_000_000;
  const maximum = 0x1_0000_0000 - (0x1_0000_0000 % range);
  const value = new Uint32Array(1);
  do crypto.getRandomValues(value); while (value[0] >= maximum);
  return String(value[0] % range).padStart(6, '0');
}

async function requestFingerprint(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unavailable';
  return sessionTokenHash(`email-auth-ip:${ip}`, env);
}

function rateLimitResponse(retryAfter) {
  const seconds = Math.max(1, Math.ceil(retryAfter));
  return portalJson({ error: 'email_code_rate_limited', retryAfter: seconds }, 429, { 'Retry-After': String(seconds) });
}

export async function onRequestPost({ request, env }) {
  if (!emailAuthEnabled(env)) return portalJson({ error: 'email_sign_in_not_configured' }, 503);
  if (!requestOriginAllowed(request, env)) return portalJson({ error: 'origin_not_allowed' }, 403);
  const parsed = await readPortalJson(request, 4096);
  if (parsed.error) return parsed.error;
  const normalizedEmail = normalizeEmail(parsed.data?.email);
  if (!normalizedEmail) return portalJson({ error: 'validation_failed' }, 400);

  const locale = cleanPortalLocale(parsed.data?.locale);
  const returnPath = safeReturnPath(parsed.data?.returnTo, locale);
  const db = portalDb(env);
  const now = new Date();
  const timestamp = now.toISOString();
  const windowStart = new Date(now.getTime() - EMAIL_WINDOW_MS).toISOString();
  const cooldownStart = new Date(now.getTime() - REQUEST_COOLDOWN_MS).toISOString();
  const fingerprintHash = await requestFingerprint(request, env);

  await db.prepare(`
    DELETE FROM portal_email_challenges
    WHERE id_hash IN (
      SELECT id_hash FROM portal_email_challenges
      WHERE created_at <= ?1
      ORDER BY created_at ASC
      LIMIT 50
    )
  `).bind(windowStart).run();
  const challengeToken = randomToken(32);
  const challengeHash = await sha256(challengeToken);
  const code = generateVerificationCode();
  const expiresAt = new Date(now.getTime() + EMAIL_CHALLENGE_TTL_SECONDS * 1000).toISOString();
  // Admission and insertion are one database write.  Separate count reads let
  // concurrent requests all observe the same old quota and then send a burst
  // of codes before any request records its challenge.
  const admitted = await db.prepare(`
    INSERT INTO portal_email_challenges
      (id_hash, email_normalized, email_display, code_hash, request_fingerprint_hash, locale,
       return_path, expires_at, attempts, max_attempts, consumed_at, invalidated_at, sent_at, created_at)
    SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 0, 5, '', '', '', ?9
    WHERE (
        SELECT COUNT(*) FROM portal_email_challenges
        WHERE email_normalized = ?2 AND created_at > ?10
      ) < ?11
      AND (
        SELECT COUNT(*) FROM portal_email_challenges
        WHERE request_fingerprint_hash = ?5 AND created_at > ?10
      ) < ?12
      AND NOT EXISTS (
        SELECT 1 FROM portal_email_challenges
        WHERE created_at > ?13
          AND (email_normalized = ?2 OR request_fingerprint_hash = ?5)
      )
  `).bind(
    challengeHash,
    normalizedEmail.normalized,
    normalizedEmail.display,
    await emailCodeHash(challengeHash, code, env),
    fingerprintHash,
    locale,
    returnPath,
    expiresAt,
    timestamp,
    windowStart,
    EMAIL_WINDOW_LIMIT,
    FINGERPRINT_WINDOW_LIMIT,
    cooldownStart
  ).run();
  if (Number(admitted.meta?.changes || 0) !== 1) {
    const [emailRate, fingerprintRate] = await Promise.all([
      db.prepare(`
        SELECT COUNT(*) AS challenge_count, MAX(created_at) AS latest_at
        FROM portal_email_challenges
        WHERE email_normalized = ?1 AND created_at > ?2
      `).bind(normalizedEmail.normalized, windowStart).first(),
      db.prepare(`
        SELECT COUNT(*) AS challenge_count, MAX(created_at) AS latest_at
        FROM portal_email_challenges
        WHERE request_fingerprint_hash = ?1 AND created_at > ?2
      `).bind(fingerprintHash, windowStart).first()
    ]);
    if (Number(emailRate?.challenge_count || 0) >= EMAIL_WINDOW_LIMIT
      || Number(fingerprintRate?.challenge_count || 0) >= FINGERPRINT_WINDOW_LIMIT) {
      return rateLimitResponse(EMAIL_WINDOW_MS / 1000);
    }
    const latestCandidates = [emailRate?.latest_at, fingerprintRate?.latest_at]
      .map((value) => Date.parse(value || ''))
      .filter(Number.isFinite);
    const latest = latestCandidates.length ? Math.max(...latestCandidates) : Number.NaN;
    const retryAfter = Number.isFinite(latest)
      ? (latest + REQUEST_COOLDOWN_MS - now.getTime()) / 1000
      : REQUEST_COOLDOWN_MS / 1000;
    return rateLimitResponse(retryAfter);
  }

  try {
    const message = verificationEmail(locale, code);
    await sendTransactionalEmail(env, {
      to: normalizedEmail.display,
      ...message,
      replyTo: String(env.EMAIL_REPLY_TO || ''),
      idempotencyKey: `zimonai-email-auth-${challengeHash}`
    });
  } catch {
    await db.prepare(`
      UPDATE portal_email_challenges
      SET invalidated_at = ?1
      WHERE id_hash = ?2 AND consumed_at = ''
    `).bind(new Date().toISOString(), challengeHash).run();
    return portalJson({ error: 'email_delivery_unavailable' }, 503);
  }
  const sentAt = new Date().toISOString();
  const activation = await db.batch([
    db.prepare(`
      UPDATE portal_email_challenges
      SET invalidated_at = ?1
      WHERE email_normalized = ?2 AND id_hash <> ?3
        AND consumed_at = '' AND invalidated_at = '' AND sent_at <> ''
    `).bind(sentAt, normalizedEmail.normalized, challengeHash),
    db.prepare(`
      UPDATE portal_email_challenges
      SET sent_at = ?1
      WHERE id_hash = ?2 AND consumed_at = '' AND invalidated_at = '' AND sent_at = ''
    `).bind(sentAt, challengeHash)
  ]);
  if (Number(activation[1]?.meta?.changes || 0) !== 1) {
    return portalJson({ error: 'email_delivery_unavailable' }, 503);
  }

  const response = portalJson({ accepted: true, expiresIn: EMAIL_CHALLENGE_TTL_SECONDS }, 202);
  response.headers.append('Set-Cookie', setCookie(
    request,
    emailChallengeCookieName(request),
    challengeToken,
    EMAIL_CHALLENGE_TTL_SECONDS
  ));
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
