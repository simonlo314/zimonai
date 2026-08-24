import {
  portalDb,
  portalJson,
  readPortalJson,
  requireAdmin
} from '../../_lib/auth.js';
import { INQUIRY_STATUSES, publicInquiry } from '../../_lib/inquiries.js';
import { auditStatement } from '../../_lib/workflow.js';

function inquiryId(value) {
  const id = String(value || '');
  return /^inq_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

export async function onRequestGet({ request, env }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const requestedStatus = new URL(request.url).searchParams.get('status') || '';
  if (requestedStatus && !INQUIRY_STATUSES.has(requestedStatus)) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const rows = await portalDb(env).prepare(`
    SELECT id, public_reference, locale, contact_name, contact_email,
           company_name, supplier_name, supplier_url, chinese_legal_name,
           product_category, question, consent_at, status, created_at, updated_at
    FROM public_inquiries
    WHERE (?1 = '' OR status = ?1)
    ORDER BY created_at DESC
    LIMIT 150
  `).bind(requestedStatus).all();
  return portalJson({ inquiries: (rows.results || []).map(publicInquiry) });
}

export async function onRequestPatch({ request, env }) {
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const parsed = await readPortalJson(request, 4000);
  if (parsed.error) return parsed.error;
  const payload = parsed.data;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)
    || Object.keys(payload).some((key) => !['id', 'status'].includes(key))) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const id = inquiryId(payload.id);
  const status = String(payload.status || '');
  if (!id || !INQUIRY_STATUSES.has(status)) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  const db = portalDb(env);
  const now = new Date();
  const existing = await db.prepare(`
    SELECT status FROM public_inquiries WHERE id = ?1 LIMIT 1
  `).bind(id).first();
  if (!existing) return portalJson({ error: 'inquiry_not_found' }, 404);
  if (existing.status !== status) {
    await db.batch([
      db.prepare(`
        UPDATE public_inquiries
        SET status = ?1, updated_at = ?2
        WHERE id = ?3 AND status = ?4
      `).bind(status, now.toISOString(), id, existing.status),
      auditStatement(db, {
        actorUserId: authorization.session.user_id,
        eventType: 'admin_public_inquiry_status_updated',
        details: { inquiryId: id, from: existing.status, to: status },
        now
      })
    ]);
  }
  const updated = await db.prepare(`
    SELECT id, public_reference, locale, contact_name, contact_email,
           company_name, supplier_name, supplier_url, chinese_legal_name,
           product_category, question, consent_at, status, created_at, updated_at
    FROM public_inquiries WHERE id = ?1 LIMIT 1
  `).bind(id).first();
  return portalJson({ inquiry: publicInquiry(updated) });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405, { Allow: 'GET, PATCH' });
}
