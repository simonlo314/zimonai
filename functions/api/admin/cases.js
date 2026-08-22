import {
  cleanPortalLocale,
  portalDb,
  portalJson,
  readPortalJson,
  requireAdmin
} from '../../_lib/auth.js';
import { createAdminCase, adminCase } from '../../_lib/workflow.js';
import { deliverQueuedNotifications, queueNotification } from '../../_lib/notifications.js';

export async function onRequestGet({ request, env }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const db = portalDb(env);
  const current = await db.prepare(`
    SELECT c.*, u.primary_email AS owner_email, n.note AS internal_note,
           0 AS pending_invitation, 'portal' AS status_source
    FROM portal_cases c
    JOIN portal_users u ON u.id = c.owner_user_id
    LEFT JOIN portal_case_internal_notes n ON n.case_id = c.id
    ORDER BY c.updated_at DESC
    LIMIT 100
  `).all();
  const invited = await db.prepare(`
    SELECT d.case_id AS id, d.case_public_reference AS public_reference, NULL AS owner_user_id,
           d.service_tier, d.supplier_name, d.supplier_url, d.chinese_legal_name,
           d.product_category, d.product_model, d.decision_context, d.requested_checks,
           d.case_status AS status, d.expected_delivery_at, d.client_status_note,
           '' AS report_url, '' AS report_published_at, d.created_at, d.updated_at,
           i.email_display AS owner_email, n.note AS internal_note,
           1 AS pending_invitation, 'invited' AS status_source, 'admin' AS case_source
    FROM portal_invited_cases d
    JOIN portal_customer_invites i ON i.id = d.invite_id
    LEFT JOIN portal_case_internal_notes n ON n.case_id = d.case_id
    WHERE d.status = 'pending' AND i.status = 'pending'
    ORDER BY d.updated_at DESC
    LIMIT 100
  `).all();
  const cases = [...(current.results || []), ...(invited.results || [])]
    .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)))
    .slice(0, 100)
    .map(adminCase);
  return portalJson({ cases });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  try {
    const created = await createAdminCase(env, authorization.session, parsed.data || {});
    const locale = cleanPortalLocale(parsed.data?.locale);
    const recipient = created.ownerEmail || (created.ownerUserId
      ? (await portalDb(env).prepare('SELECT primary_email FROM portal_users WHERE id = ?1').bind(created.ownerUserId).first())?.primary_email
      : '');
    if (recipient) {
      await queueNotification(env, {
        type: 'customer_case_invited',
        to: recipient,
        locale,
        payload: { caseReference: created.reference },
        dedupeKey: `customer_case_invited:${created.caseId}`
      });
      if (typeof context.waitUntil === 'function') {
        context.waitUntil(deliverQueuedNotifications(env, { limit: 4 }).catch(() => null));
      }
    }
    return portalJson({ case: created }, 201);
  } catch (error) {
    const code = String(error?.message || 'case_creation_failed');
    const status = ['validation_failed', 'customer_required'].includes(code) ? 400 : 503;
    return portalJson({ error: code }, status);
  }
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
