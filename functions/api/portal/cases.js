import {
  getPortalSession,
  portalDb,
  portalJson
} from '../../_lib/auth.js';
import { publicCase } from '../../_lib/workflow.js';

export async function onRequestGet({ request, env }) {
  const session = await getPortalSession(request, env);
  if (!session) return portalJson({ error: 'authentication_required' }, 401);
  const rows = await portalDb(env).prepare(`
    SELECT id, public_reference, service_tier, supplier_name, supplier_url, chinese_legal_name,
           product_category, product_model, decision_context, requested_checks, status, expected_delivery_at,
           client_status_note, report_url, report_published_at, created_at, updated_at
    FROM portal_cases
    WHERE owner_user_id = ?1
    ORDER BY updated_at DESC
    LIMIT 100
  `).bind(session.user_id).all();
  return portalJson({ cases: (rows.results || []).map(publicCase) });
}

// Client cases are created only after an eligible Stripe payment has been
// verified, or by an administrator after a one-to-one scope review.
export function onRequestPost() {
  return portalJson({ error: 'client_case_creation_disabled' }, 405, { Allow: 'GET' });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405, { Allow: 'GET' });
}
