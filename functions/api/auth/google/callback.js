import {
  SESSION_TTL_SECONDS,
  authEnabled,
  clearCookie,
  cookieValue,
  oauthBaseUrl,
  oauthCookieName,
  oauthRequestAllowed,
  portalDb,
  portalJson,
  portalRedirect,
  randomToken,
  safeReturnPath,
  sessionCookieName,
  sessionExpiry,
  sessionTokenHash,
  setCookie,
  sha256,
  verifyGoogleIdToken
} from '../../../_lib/auth.js';

function publicAuthError(message) {
  if (message === 'google_sign_in_cancelled') return 'cancelled';
  if (message === 'oauth_attempt_expired' || message === 'oauth_attempt_replayed') return 'expired';
  if (['invalid_oauth_callback', 'oauth_state_mismatch', 'google_identity_verification_failed'].includes(message)) return 'invalid';
  return 'service';
}

function oauthFailure(request, message, status = 400, returnPath = '/portal/') {
  const accept = request.headers.get('Accept') || '';
  if (accept.includes('application/json')) {
    const response = portalJson({ error: message }, status);
    response.headers.append('Set-Cookie', clearCookie(request, oauthCookieName(request)));
    return response;
  }
  const destination = new URL(safeReturnPath(returnPath), new URL(request.url).origin);
  destination.searchParams.set('auth_error', publicAuthError(message));
  const response = portalRedirect(destination.toString());
  response.headers.append('Set-Cookie', clearCookie(request, oauthCookieName(request)));
  return response;
}

export async function onRequestGet({ request, env }) {
  if (!authEnabled(env)) return oauthFailure(request, 'google_sign_in_not_configured', 503);
  if (!oauthRequestAllowed(request, env)) return oauthFailure(request, 'oauth_host_not_allowed', 403);
  const url = new URL(request.url);
  const code = url.searchParams.get('code') || '';
  const state = url.searchParams.get('state') || '';
  const attemptToken = cookieValue(request, oauthCookieName(request));
  if (!attemptToken) return oauthFailure(request, 'invalid_oauth_callback');

  const db = portalDb(env);
  const now = new Date();
  const idHash = await sha256(attemptToken);
  const attempt = await db.prepare(`
    SELECT id_hash, state_hash, code_verifier, nonce, return_path, expires_at
    FROM portal_oauth_attempts
    WHERE id_hash = ?1 AND consumed_at = '' AND expires_at > ?2
    LIMIT 1
  `).bind(idHash, now.toISOString()).first();
  if (!attempt) return oauthFailure(request, 'oauth_attempt_expired');

  if (!state || await sha256(state) !== attempt.state_hash) {
    return oauthFailure(request, 'oauth_state_mismatch', 400, attempt.return_path);
  }

  const consumed = await db.prepare(`
    UPDATE portal_oauth_attempts
    SET consumed_at = ?1
    WHERE id_hash = ?2 AND consumed_at = '' AND expires_at > ?1
  `).bind(now.toISOString(), idHash).run();
  if (Number(consumed.meta?.changes || 0) !== 1) {
    return oauthFailure(request, 'oauth_attempt_replayed', 400, attempt.return_path);
  }
  if (url.searchParams.get('error')) {
    return oauthFailure(request, 'google_sign_in_cancelled', 400, attempt.return_path);
  }
  if (!code || code.length > 2048) {
    return oauthFailure(request, 'invalid_oauth_callback', 400, attempt.return_path);
  }

  const redirectUri = `${oauthBaseUrl(request, env)}/api/auth/google/callback`;
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: attempt.code_verifier
    })
  });
  const tokenData = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok || !tokenData.id_token) {
    return oauthFailure(request, 'google_token_exchange_failed', 502, attempt.return_path);
  }

  let identity;
  try {
    identity = await verifyGoogleIdToken(tokenData.id_token, env, attempt.nonce);
  } catch {
    return oauthFailure(request, 'google_identity_verification_failed', 400, attempt.return_path);
  }

  const email = String(identity.email).trim();
  const emailNormalized = email.toLowerCase();
  const displayName = String(identity.name || '').trim().slice(0, 160);
  const locale = attempt.return_path.startsWith('/zh-tw/') ? 'zh-tw' : attempt.return_path.startsWith('/zh-cn/') ? 'zh-cn' : 'en';
  let existing = await db.prepare(`
    SELECT u.id, u.status
    FROM portal_identities i
    JOIN portal_users u ON u.id = i.user_id
    WHERE i.provider = 'google' AND i.provider_subject = ?1
    LIMIT 1
  `).bind(String(identity.sub)).first();
  if (existing && existing.status !== 'active') {
    return oauthFailure(request, 'account_access_disabled', 403, attempt.return_path);
  }
  let userId = existing?.id || `usr_${randomToken(18)}`;

  if (existing) {
    await db.batch([
      db.prepare(`UPDATE portal_users SET primary_email = ?1, email_normalized = ?2, display_name = ?3, avatar_url = '', locale = ?4, updated_at = ?5, last_login_at = ?5 WHERE id = ?6`)
        .bind(email, emailNormalized, displayName, locale, now.toISOString(), userId),
      db.prepare(`UPDATE portal_identities SET provider_email = ?1, updated_at = ?2 WHERE provider = 'google' AND provider_subject = ?3`)
        .bind(email, now.toISOString(), String(identity.sub))
    ]);
  } else {
    try {
      await db.batch([
        db.prepare(`INSERT INTO portal_users (id, primary_email, email_normalized, display_name, locale, role, status, created_at, updated_at, last_login_at) VALUES (?1, ?2, ?3, ?4, ?5, 'client', 'active', ?6, ?6, ?6)`)
          .bind(userId, email, emailNormalized, displayName, locale, now.toISOString()),
        db.prepare(`INSERT INTO portal_identities (provider, provider_subject, user_id, provider_email, created_at, updated_at) VALUES ('google', ?1, ?2, ?3, ?4, ?4)`)
          .bind(String(identity.sub), userId, email, now.toISOString())
      ]);
    } catch {
      existing = await db.prepare(`
        SELECT u.id, u.status
        FROM portal_identities i
        JOIN portal_users u ON u.id = i.user_id
        WHERE i.provider = 'google' AND i.provider_subject = ?1
        LIMIT 1
      `).bind(String(identity.sub)).first();
      if (!existing?.id) {
        return oauthFailure(request, 'google_account_creation_failed', 503, attempt.return_path);
      }
      if (existing.status !== 'active') {
        return oauthFailure(request, 'account_access_disabled', 403, attempt.return_path);
      }
      userId = existing.id;
    }
  }

  await db.prepare(`
    DELETE FROM portal_sessions
    WHERE token_hash IN (
      SELECT token_hash FROM portal_sessions
      WHERE user_id = ?1 AND (expires_at <= ?2 OR revoked_at <> '')
      ORDER BY created_at ASC
      LIMIT 25
    )
  `).bind(userId, now.toISOString()).run();

  await db.prepare(`
    UPDATE portal_sessions
    SET revoked_at = ?1
    WHERE user_id = ?2 AND revoked_at = '' AND token_hash NOT IN (
      SELECT token_hash FROM portal_sessions
      WHERE user_id = ?2 AND revoked_at = '' AND expires_at > ?1
      ORDER BY created_at DESC
      LIMIT 4
    )
  `).bind(now.toISOString(), userId).run();

  const sessionToken = randomToken(40);
  const csrfToken = randomToken(32);
  await db.prepare(`
    INSERT INTO portal_sessions (token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, revoked_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?5, '')
  `).bind(await sessionTokenHash(sessionToken, env), userId, csrfToken, sessionExpiry(now).toISOString(), now.toISOString()).run();

  const response = portalRedirect(attempt.return_path);
  response.headers.append('Set-Cookie', setCookie(request, oauthCookieName(request), '', 0));
  response.headers.append('Set-Cookie', setCookie(request, sessionCookieName(request), sessionToken, SESSION_TTL_SECONDS));
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
