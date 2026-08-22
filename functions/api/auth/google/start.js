import {
  cleanPortalLocale,
  googleAuthEnabled,
  oauthBaseUrl,
  oauthCookieName,
  oauthRequestAllowed,
  portalDb,
  portalJson,
  portalRedirect,
  randomToken,
  safeReturnPath,
  sessionTokenHash,
  setCookie,
  sha256
} from '../../../_lib/auth.js';

const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const ATTEMPT_LIMIT = 10;

async function requestFingerprint(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const userAgent = (request.headers.get('User-Agent') || '').slice(0, 240);
  return sessionTokenHash(`oauth-start:${ip}:${userAgent}`, env);
}

export async function onRequestGet({ request, env }) {
  if (!googleAuthEnabled(env)) return portalJson({ error: 'google_sign_in_not_configured' }, 503);
  if (!oauthRequestAllowed(request, env)) return portalJson({ error: 'oauth_host_not_allowed' }, 403);

  const url = new URL(request.url);
  const locale = cleanPortalLocale(url.searchParams.get('locale'));
  const returnPath = safeReturnPath(url.searchParams.get('returnTo'), locale);
  const attemptToken = randomToken(32);
  const state = randomToken(32);
  const nonce = randomToken(32);
  const codeVerifier = randomToken(64);
  const codeChallenge = await sha256(codeVerifier);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
  const fingerprintHash = await requestFingerprint(request, env);
  const rateWindowStart = new Date(now.getTime() - ATTEMPT_WINDOW_MS).toISOString();
  const recent = await portalDb(env).prepare(`
    SELECT COUNT(*) AS attempt_count
    FROM portal_oauth_attempts
    WHERE request_fingerprint_hash = ?1 AND created_at > ?2
  `).bind(fingerprintHash, rateWindowStart).first();
  if (Number(recent?.attempt_count || 0) >= ATTEMPT_LIMIT) {
    return portalJson({ error: 'oauth_rate_limited', retryAfter: 600 }, 429, { 'Retry-After': '600' });
  }

  await portalDb(env).prepare(`
    DELETE FROM portal_oauth_attempts
    WHERE id_hash IN (
      SELECT id_hash FROM portal_oauth_attempts
      WHERE expires_at <= ?1 OR consumed_at <> ''
      ORDER BY created_at ASC
      LIMIT 25
    )
  `)
    .bind(now.toISOString()).run();
  await portalDb(env).prepare(`
    INSERT INTO portal_oauth_attempts
      (id_hash, state_hash, code_verifier, nonce, return_path, expires_at, consumed_at, created_at, request_fingerprint_hash)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, '', ?7, ?8)
  `).bind(await sha256(attemptToken), await sha256(state), codeVerifier, nonce, returnPath, expiresAt, now.toISOString(), fingerprintHash).run();

  const callbackUrl = `${oauthBaseUrl(request, env)}/api/auth/google/callback`;
  const authorization = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authorization.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  authorization.searchParams.set('redirect_uri', callbackUrl);
  authorization.searchParams.set('response_type', 'code');
  authorization.searchParams.set('scope', 'openid email');
  authorization.searchParams.set('state', state);
  authorization.searchParams.set('nonce', nonce);
  authorization.searchParams.set('code_challenge', codeChallenge);
  authorization.searchParams.set('code_challenge_method', 'S256');
  authorization.searchParams.set('prompt', 'select_account');

  const response = portalRedirect(authorization.toString());
  response.headers.append('Set-Cookie', setCookie(request, oauthCookieName(request), attemptToken, 600));
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
