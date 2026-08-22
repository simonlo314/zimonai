import {
  clearCookie,
  cookieValue,
  googleEmailIsAuthoritative,
  googleAuthEnabled,
  issuePortalSession,
  oauthBaseUrl,
  oauthCookieName,
  oauthRequestAllowed,
  portalDb,
  portalJson,
  portalRedirect,
  safeReturnPath,
  sha256,
  upsertVerifiedIdentity,
  verifyGoogleIdToken
} from '../../../_lib/auth.js';

function publicAuthError(message) {
  if (message === 'google_sign_in_cancelled') return 'cancelled';
  if (message === 'oauth_attempt_expired' || message === 'oauth_attempt_replayed') return 'expired';
  if (message === 'google_email_link_required') return 'email_link_required';
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
  if (!googleAuthEnabled(env)) return oauthFailure(request, 'google_sign_in_not_configured', 503);
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

  const locale = attempt.return_path.startsWith('/zh-tw/') ? 'zh-tw' : attempt.return_path.startsWith('/zh-cn/') ? 'zh-cn' : 'en';
  let user;
  try {
    user = await upsertVerifiedIdentity(env, {
      provider: 'google',
      providerSubject: String(identity.sub),
      email: String(identity.email),
      providerEmailAuthoritative: googleEmailIsAuthoritative(identity),
      displayName: '',
      locale,
      now
    });
  } catch (error) {
    if (error?.message === 'account_access_disabled') {
      return oauthFailure(request, 'account_access_disabled', 403, attempt.return_path);
    }
    if (error?.message === 'google_email_link_required') {
      return oauthFailure(request, 'google_email_link_required', 409, attempt.return_path);
    }
    return oauthFailure(request, 'google_account_creation_failed', 503, attempt.return_path);
  }

  let session;
  try {
    session = await issuePortalSession(request, env, user.id, {
      provider: 'google',
      providerSubject: String(identity.sub)
    }, now);
  } catch {
    return oauthFailure(request, 'google_session_creation_failed', 503, attempt.return_path);
  }

  const response = portalRedirect(attempt.return_path);
  response.headers.append('Set-Cookie', clearCookie(request, oauthCookieName(request)));
  response.headers.append('Set-Cookie', session.cookie);
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
