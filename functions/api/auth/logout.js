import {
  clearCookie,
  getPortalSession,
  portalDb,
  portalJson,
  requestOriginAllowed,
  sessionCookieName
} from '../../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  if (!requestOriginAllowed(request, env)) return portalJson({ error: 'origin_not_allowed' }, 403);
  const session = await getPortalSession(request, env, { touch: false });
  if (session) {
    const csrf = request.headers.get('X-CSRF-Token') || '';
    if (!csrf || csrf !== session.csrf_token) return portalJson({ error: 'csrf_failed' }, 403);
    await portalDb(env).prepare('UPDATE portal_sessions SET revoked_at = ?1 WHERE token_hash = ?2')
      .bind(new Date().toISOString(), session.tokenHash).run();
  }
  const response = new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex', Vary: 'Cookie' }
  });
  response.headers.append('Set-Cookie', clearCookie(request, sessionCookieName(request)));
  return response;
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}

