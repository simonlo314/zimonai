import { authEnabled, getPortalSession, portalJson } from '../../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  const session = await getPortalSession(request, env);
  if (!session) return portalJson({ error: 'authentication_required', authEnabled: authEnabled(env) }, 401);
  return portalJson({
    authenticated: true,
    authEnabled: authEnabled(env),
    csrfToken: session.csrf_token,
    user: {
      id: session.user_id,
      email: session.primary_email,
      name: session.display_name,
      locale: session.locale
    }
  });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
