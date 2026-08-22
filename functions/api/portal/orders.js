import { getPortalSession, portalDb, portalJson } from '../../_lib/auth.js';
import { publicOrder } from '../../_lib/workflow.js';

export async function onRequestGet({ request, env }) {
  const session = await getPortalSession(request, env);
  if (!session) return portalJson({ error: 'authentication_required' }, 401);
  const rows = await portalDb(env).prepare(`
    SELECT id, public_reference, owner_user_id, case_id, source, product_key, product_description,
           amount_total, currency, quantity, service_reference, payment_status, fulfillment_status,
           paid_at, created_at, updated_at
    FROM portal_orders
    WHERE owner_user_id = ?1
    ORDER BY updated_at DESC
    LIMIT 100
  `).bind(session.user_id).all();
  return portalJson({ orders: (rows.results || []).map(publicOrder) });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
