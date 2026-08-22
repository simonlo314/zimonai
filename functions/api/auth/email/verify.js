import {
  clearCookie,
  constantTimeEqual,
  cookieValue,
  emailAuthEnabled,
  emailChallengeCookieName,
  emailCodeHash,
  issuePortalSession,
  normalizeEmail,
  portalDb,
  portalJson,
  readPortalJson,
  requestOriginAllowed,
  sha256,
  upsertVerifiedIdentity
} from '../../../_lib/auth.js';

function invalidCodeResponse(request, remainingAttempts = undefined) {
  const payload = { error: 'email_code_invalid_or_expired' };
  if (Number.isInteger(remainingAttempts) && remainingAttempts >= 0) payload.remainingAttempts = remainingAttempts;
  const response = portalJson(payload, 400);
  if (remainingAttempts === 0) {
    response.headers.append('Set-Cookie', clearCookie(request, emailChallengeCookieName(request)));
  }
  return response;
}

export async function onRequestPost({ request, env }) {
  if (!emailAuthEnabled(env)) return portalJson({ error: 'email_sign_in_not_configured' }, 503);
  if (!requestOriginAllowed(request, env)) return portalJson({ error: 'origin_not_allowed' }, 403);
  const parsed = await readPortalJson(request, 4096);
  if (parsed.error) return parsed.error;
  const normalizedEmail = normalizeEmail(parsed.data?.email);
  const code = String(parsed.data?.code || '').trim();
  if (!normalizedEmail || !/^\d{6}$/.test(code)) return portalJson({ error: 'validation_failed' }, 400);

  const challengeToken = cookieValue(request, emailChallengeCookieName(request));
  if (!challengeToken || challengeToken.length > 180) return invalidCodeResponse(request, 0);
  const challengeHash = await sha256(challengeToken);
  const db = portalDb(env);
  const now = new Date();
  const timestamp = now.toISOString();
  const challenge = await db.prepare(`
    SELECT id_hash, email_normalized, email_display, code_hash, locale, return_path,
           expires_at, attempts, max_attempts, consumed_at, invalidated_at, sent_at
    FROM portal_email_challenges
    WHERE id_hash = ?1
    LIMIT 1
  `).bind(challengeHash).first();
  const alreadyInvalid = !challenge
    || challenge.consumed_at !== ''
    || challenge.invalidated_at !== ''
    || challenge.sent_at === ''
    || challenge.expires_at <= timestamp
    || Number(challenge.attempts) >= Number(challenge.max_attempts);
  if (alreadyInvalid) return invalidCodeResponse(request, 0);

  const submittedHash = await emailCodeHash(challengeHash, code, env);
  const matches = challenge.email_normalized === normalizedEmail.normalized
    && constantTimeEqual(challenge.code_hash, submittedHash);
  if (!matches) {
    const failed = await db.prepare(`
      UPDATE portal_email_challenges
      SET attempts = attempts + 1,
          invalidated_at = CASE WHEN attempts + 1 >= max_attempts THEN ?1 ELSE invalidated_at END
      WHERE id_hash = ?2
        AND consumed_at = ''
        AND invalidated_at = ''
        AND expires_at > ?1
        AND attempts < max_attempts
    `).bind(timestamp, challengeHash).run();
    const consumedAttempt = Number(failed.meta?.changes || 0) === 1;
    const remaining = consumedAttempt
      ? Math.max(0, Number(challenge.max_attempts) - Number(challenge.attempts) - 1)
      : 0;
    return invalidCodeResponse(request, remaining);
  }

  const consumed = await db.prepare(`
    UPDATE portal_email_challenges
    SET consumed_at = ?1
    WHERE id_hash = ?2
      AND email_normalized = ?3
      AND consumed_at = ''
      AND invalidated_at = ''
      AND sent_at <> ''
      AND expires_at > ?1
      AND attempts < max_attempts
  `).bind(timestamp, challengeHash, normalizedEmail.normalized).run();
  if (Number(consumed.meta?.changes || 0) !== 1) return invalidCodeResponse(request, 0);

  let user;
  try {
    user = await upsertVerifiedIdentity(env, {
      provider: 'email',
      providerSubject: normalizedEmail.normalized,
      email: challenge.email_display,
      displayName: '',
      locale: challenge.locale,
      now
    });
  } catch (error) {
    const status = error?.message === 'account_access_disabled' ? 403 : 503;
    const publicError = status === 403 ? 'account_access_disabled' : 'account_access_unavailable';
    return portalJson({ error: publicError }, status, {
      'Set-Cookie': clearCookie(request, emailChallengeCookieName(request))
    });
  }

  let session;
  try {
    session = await issuePortalSession(request, env, user.id, {
      provider: 'email',
      providerSubject: normalizedEmail.normalized
    }, now);
  } catch {
    return portalJson({ error: 'session_creation_failed' }, 503, {
      'Set-Cookie': clearCookie(request, emailChallengeCookieName(request))
    });
  }
  const response = portalJson({
    authenticated: true,
    returnTo: challenge.return_path,
    user: {
      id: user.id,
      email: user.primary_email,
      name: user.display_name,
      locale: user.locale
    }
  });
  response.headers.append('Set-Cookie', clearCookie(request, emailChallengeCookieName(request)));
  response.headers.append('Set-Cookie', session.cookie);
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
