import {
  getPortalSession,
  portalDb,
  portalJson,
  readPortalJson,
  requireMutation
} from '../../../_lib/auth.js';
import { intakeReady, publicCase, validateCaseInput, workflowId } from '../../../_lib/workflow.js';

function validId(value) {
  const id = String(value || '');
  return /^case_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

const CASE_SELECT = `
  SELECT id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url, chinese_legal_name,
         product_category, product_model, decision_context, requested_checks, status, expected_delivery_at,
         client_status_note, report_url, report_published_at, created_at, updated_at
  FROM portal_cases
  WHERE id = ?1 AND owner_user_id = ?2
  LIMIT 1
`;

export async function onRequestGet({ request, env, params }) {
  const session = await getPortalSession(request, env);
  if (!session) return portalJson({ error: 'authentication_required' }, 401);
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'case_not_found' }, 404);
  const row = await portalDb(env).prepare(CASE_SELECT).bind(id, session.user_id).first();
  if (!row) return portalJson({ error: 'case_not_found' }, 404);
  return portalJson({ case: publicCase(row) });
}

export async function onRequestPatch({ request, env, params }) {
  const authorization = await requireMutation(request, env);
  if (authorization.error) return authorization.error;
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'case_not_found' }, 404);
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const db = portalDb(env);
  const existing = await db.prepare(CASE_SELECT).bind(id, authorization.session.user_id).first();
  if (!existing) return portalJson({ error: 'case_not_found' }, 404);
  if (existing.status !== 'awaiting_client') return portalJson({ error: 'case_intake_locked' }, 409);
  const allowed = new Set([
    'tier', 'supplierName', 'supplierUrl', 'chineseLegalName', 'productCategory',
    'productModel', 'decisionContext', 'requestedChecks'
  ]);
  const supplied = Object.keys(parsed.data || {});
  if (!supplied.length || supplied.some((key) => !allowed.has(key))) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const input = validateCaseInput(parsed.data, existing);
  if (!input) return portalJson({ error: 'validation_failed' }, 400);
  const now = new Date();
  const timestamp = now.toISOString();
  const status = existing.status === 'awaiting_client' && intakeReady(input) ? 'submitted' : existing.status;
  const clientNote = status === 'submitted' && existing.status === 'awaiting_client' ? '' : existing.client_status_note;
  const details = JSON.stringify({ fields: supplied.sort(), status });
  const results = await db.batch([
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      SELECT ?1, ?2, id, 'case_intake_updated', ?3, NULL, ?2, ?4
      FROM portal_cases
      WHERE id = ?5 AND owner_user_id = ?2 AND status = 'awaiting_client'
    `).bind(workflowId('evt'), authorization.session.user_id, timestamp, details, id),
    db.prepare(`
      UPDATE portal_cases
      SET service_tier = ?1, supplier_name = ?2, supplier_url = ?3, chinese_legal_name = ?4,
          product_category = ?5, product_model = ?6, decision_context = ?7, requested_checks = ?8,
          status = ?9, client_status_note = ?10, status_updated_at = CASE WHEN status <> ?9 THEN ?11 ELSE status_updated_at END,
          updated_at = ?11
      WHERE id = ?12 AND owner_user_id = ?13 AND status = 'awaiting_client'
    `).bind(input.tier, input.supplierName, input.supplierUrl, input.chineseLegalName,
      input.productCategory, input.productModel, input.decisionContext, input.requestedChecks,
      status, clientNote, timestamp, id, authorization.session.user_id)
  ]);
  if (Number(results[1]?.meta?.changes || 0) !== 1) {
    return portalJson({ error: 'case_intake_locked' }, 409);
  }
  const row = await db.prepare(CASE_SELECT).bind(id, authorization.session.user_id).first();
  return portalJson({ case: publicCase(row) });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
