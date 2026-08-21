import { createRemoteJWKSet, jwtVerify } from 'jose';

const encoder = new TextEncoder();
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const PORTAL_PATHS = new Set(['/portal/', '/zh-tw/portal/', '/zh-cn/portal/']);
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
const SESSION_IDLE_SECONDS = 24 * 60 * 60;
const SESSION_TOUCH_INTERVAL_SECONDS = 5 * 60;

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

export function authEnabled(env) {
  const sessionSecret = String(env.PORTAL_SESSION_SECRET || env.AUTH_SESSION_SECRET || '');
  return env.PORTAL_AUTH_ENABLED === 'true'
    && Boolean(env.PORTAL_DB || (env.ALLOW_LOCAL_PORTAL === 'true' && env.ANALYTICS_DB))
    && Boolean(String(env.GOOGLE_CLIENT_ID || '').trim())
    && Boolean(String(env.GOOGLE_CLIENT_SECRET || '').trim())
    && encoder.encode(sessionSecret).byteLength >= 32;
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
           u.primary_email, u.display_name, u.locale, u.role, u.status
    FROM portal_sessions s
    JOIN portal_users u ON u.id = s.user_id
    WHERE s.token_hash = ?1
      AND s.revoked_at = ''
      AND s.expires_at > ?2
      AND s.last_seen_at > ?3
      AND u.status = 'active'
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

export function sessionExpiry(now = new Date()) {
  return new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);
}

export { SESSION_TOUCH_INTERVAL_SECONDS, SESSION_TTL_SECONDS };
