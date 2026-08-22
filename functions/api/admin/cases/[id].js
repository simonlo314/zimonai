import {
  cleanExternalUrl,
  cleanText,
  portalDb,
  portalJson,
  readPortalJson,
  requireAdmin
} from '../../../_lib/auth.js';
import {
  CASE_STATUSES,
  adminCase,
  auditStatement,
  validateCaseInput
} from '../../../_lib/workflow.js';

function validId(value) {
  const id = String(value || '');
  return /^case_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

async function findCase(db, id) {
  const current = await db.prepare(`
    SELECT c.*, u.primary_email AS owner_email, n.note AS internal_note,
           0 AS pending_invitation, 'portal' AS status_source
    FROM portal_cases c
    JOIN portal_users u ON u.id = c.owner_user_id
    LEFT JOIN portal_case_internal_notes n ON n.case_id = c.id
    WHERE c.id = ?1
    LIMIT 1
  `).bind(id).first();
  if (current) return current;
  return db.prepare(`
    SELECT d.case_id AS id, d.case_public_reference AS public_reference, NULL AS owner_user_id,
           d.service_tier, d.supplier_name, d.supplier_url, d.chinese_legal_name,
           d.product_category, d.product_model, d.decision_context, d.requested_checks,
           d.case_status AS status, d.expected_delivery_at, d.client_status_note,
           '' AS report_url, '' AS report_published_at, d.created_at, d.updated_at,
           i.email_display AS owner_email, n.note AS internal_note,
           1 AS pending_invitation, 'invited' AS status_source, 'admin' AS case_source,
           d.id AS pending_row_id
    FROM portal_invited_cases d
    JOIN portal_customer_invites i ON i.id = d.invite_id
    LEFT JOIN portal_case_internal_notes n ON n.case_id = d.case_id
    WHERE d.case_id = ?1 AND d.status = 'pending' AND i.status = 'pending'
    LIMIT 1
  `).bind(id).first();
}

function cleanDateTime(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  const parsed = Date.parse(text);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

export async function onRequestGet({ request, env, params }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'case_not_found' }, 404);
  const row = await findCase(portalDb(env), id);
  if (!row) return portalJson({ error: 'case_not_found' }, 404);
  return portalJson({ case: adminCase(row) });
}

export async function onRequestPatch({ request, env, params }) {
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'case_not_found' }, 404);
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};
  const allowed = new Set([
    'tier', 'supplierName', 'supplierUrl', 'chineseLegalName', 'productCategory', 'productModel',
    'decisionContext', 'requestedChecks', 'status', 'expectedDeliveryAt', 'clientStatusNote',
    'reportUrl', 'publishReport', 'internalNote'
  ]);
  const fields = Object.keys(payload);
  if (!fields.length || fields.some((key) => !allowed.has(key))) return portalJson({ error: 'validation_failed' }, 400);
  if ((Object.hasOwn(payload, 'status') && !CASE_STATUSES.has(payload.status))
    || (Object.hasOwn(payload, 'publishReport') && typeof payload.publishReport !== 'boolean')) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const db = portalDb(env);
  const existing = await findCase(db, id);
  if (!existing) return portalJson({ error: 'case_not_found' }, 404);
  const input = validateCaseInput(payload, existing);
  const status = Object.hasOwn(payload, 'status') ? payload.status : existing.status;
  const expectedDeliveryAt = Object.hasOwn(payload, 'expectedDeliveryAt')
    ? cleanDateTime(payload.expectedDeliveryAt) : existing.expected_delivery_at || '';
  const clientStatusNote = Object.hasOwn(payload, 'clientStatusNote')
    ? cleanText(payload.clientStatusNote, 1200) : existing.client_status_note || '';
  const internalNote = Object.hasOwn(payload, 'internalNote')
    ? cleanText(payload.internalNote, 5000) : existing.internal_note || '';
  let reportUrl = existing.report_url || '';
  let reportPublishedAt = existing.report_published_at || '';
  if (Object.hasOwn(payload, 'reportUrl')) reportUrl = cleanExternalUrl(payload.reportUrl);
  if (payload.publishReport === true) {
    if (!reportUrl || !reportUrl.startsWith('https://')) return portalJson({ error: 'valid_report_url_required' }, 400);
    reportPublishedAt = new Date().toISOString();
  } else if (payload.publishReport === false) {
    reportPublishedAt = '';
  }
  if (!input || !CASE_STATUSES.has(status) || expectedDeliveryAt === null || clientStatusNote === null
    || internalNote === null || reportUrl === null) return portalJson({ error: 'validation_failed' }, 400);
  if (existing.status_source === 'invited' && (Object.hasOwn(payload, 'reportUrl') || Object.hasOwn(payload, 'publishReport'))) {
    return portalJson({ error: 'claim_required_before_report_publication' }, 409);
  }
  const now = new Date();
  const timestamp = now.toISOString();
  const noteStatement = db.prepare(`
    INSERT INTO portal_case_internal_notes (case_id, note, updated_by_user_id, created_at, updated_at)
    VALUES (?1, ?2, ?3, ?4, ?4)
    ON CONFLICT(case_id) DO UPDATE SET
      note = excluded.note, updated_by_user_id = excluded.updated_by_user_id, updated_at = excluded.updated_at
  `).bind(id, internalNote, authorization.session.user_id, timestamp);
  const audit = auditStatement(db, {
    actorUserId: authorization.session.user_id,
    targetUserId: existing.owner_user_id || null,
    caseId: existing.status_source === 'portal' ? id : null,
    eventType: existing.status_source === 'portal' ? 'admin_case_updated' : 'admin_invited_case_updated',
    details: { pendingCaseId: existing.status_source === 'invited' ? id : undefined, fields: fields.sort(), status },
    now
  });
  if (existing.status_source === 'portal') {
    await db.batch([
      db.prepare(`
        UPDATE portal_cases
        SET service_tier = ?1, supplier_name = ?2, supplier_url = ?3, chinese_legal_name = ?4,
            product_category = ?5, product_model = ?6, decision_context = ?7, requested_checks = ?8,
            status = ?9, expected_delivery_at = ?10, client_status_note = ?11,
            report_url = ?12, report_published_at = ?13,
            status_updated_at = CASE WHEN status <> ?9 THEN ?14 ELSE status_updated_at END,
            updated_at = ?14
        WHERE id = ?15
      `).bind(input.tier, input.supplierName, input.supplierUrl, input.chineseLegalName,
        input.productCategory, input.productModel, input.decisionContext, input.requestedChecks,
        status, expectedDeliveryAt, clientStatusNote, reportUrl, reportPublishedAt, timestamp, id),
      noteStatement,
      audit
    ]);
  } else {
    await db.batch([
      db.prepare(`
        UPDATE portal_invited_cases
        SET service_tier = ?1, supplier_name = ?2, supplier_url = ?3, chinese_legal_name = ?4,
            product_category = ?5, product_model = ?6, decision_context = ?7, requested_checks = ?8,
            case_status = ?9, expected_delivery_at = ?10, client_status_note = ?11, updated_at = ?12
        WHERE case_id = ?13 AND status = 'pending'
      `).bind(input.tier, input.supplierName, input.supplierUrl, input.chineseLegalName,
        input.productCategory, input.productModel, input.decisionContext, input.requestedChecks,
        status, expectedDeliveryAt, clientStatusNote, timestamp, id),
      noteStatement,
      audit
    ]);
  }
  return portalJson({ case: adminCase(await findCase(db, id)) });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
