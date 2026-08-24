import {
  portalDb,
  portalJson,
  readPortalJson,
  requestOriginAllowed
} from '../_lib/auth.js';
import {
  admitInquiry,
  inquiryId,
  inquiryReference,
  parseInquiryPayload,
  pruneInquiryRateLimits
} from '../_lib/inquiries.js';
import {
  adminNotificationEmails,
  deliverQueuedNotifications,
  notificationStatement
} from '../_lib/notifications.js';

const MAX_BODY_BYTES = 16_000;

function accepted(reference, status = 201) {
  return portalJson({ accepted: true, reference }, status);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!requestOriginAllowed(request, env)) {
    return portalJson({ error: 'origin_not_allowed' }, 403);
  }
  const parsed = await readPortalJson(request, MAX_BODY_BYTES);
  if (parsed.error) return parsed.error;
  const inquiry = parseInquiryPayload(parsed.data);
  if (inquiry.error) return portalJson({ error: inquiry.error }, 400);

  // A known honeypot submission receives the same outward success shape as a
  // real request but creates no business record and queues no notification.
  if (inquiry.honeypot) return accepted(inquiryReference());

  try {
    const db = portalDb(env);
    const now = new Date();
    const admission = await admitInquiry(
      db,
      request,
      inquiry.data.emailNormalized,
      env,
      now
    );
    if (!admission.admitted) {
      return portalJson(
        { error: 'rate_limited', retryAfter: admission.retryAfter },
        429,
        { 'Retry-After': String(admission.retryAfter) }
      );
    }

    const id = inquiryId();
    const reference = inquiryReference(now);
    const timestamp = now.toISOString();
    const statements = [db.prepare(`
      INSERT INTO public_inquiries
        (id, public_reference, locale, contact_name, contact_email,
         contact_email_normalized, company_name, supplier_name, supplier_url,
         chinese_legal_name, product_category, question, consent_at, status,
         created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, 'new', ?13, ?13)
    `).bind(
      id,
      reference,
      inquiry.data.locale,
      inquiry.data.name,
      inquiry.data.emailDisplay,
      inquiry.data.emailNormalized,
      inquiry.data.company,
      inquiry.data.supplier,
      inquiry.data.supplierUrl,
      inquiry.data.chineseLegalName,
      inquiry.data.product,
      inquiry.data.question,
      timestamp
    )];

    const recipients = adminNotificationEmails(env);
    for (const recipient of recipients) {
      statements.push(notificationStatement(db, {
        type: 'admin_public_inquiry_received',
        to: recipient,
        locale: inquiry.data.locale,
        payload: {
          inquiryReference: reference,
          contactName: inquiry.data.name,
          contactEmail: inquiry.data.emailDisplay,
          companyName: inquiry.data.company,
          supplierName: inquiry.data.supplier,
          productCategory: inquiry.data.product
        },
        dedupeKey: `admin_public_inquiry_received:${id}:${recipient}`,
        now
      }));
    }

    // The durable inquiry and any admin outbox rows are committed together.
    // Email delivery is deliberately outside the request's success condition.
    await db.batch(statements);
    if (typeof context.waitUntil === 'function') {
      context.waitUntil(Promise.allSettled([
        pruneInquiryRateLimits(db, now),
        recipients.length
          ? deliverQueuedNotifications(env, { limit: Math.min(10, recipients.length) })
          : Promise.resolve()
      ]));
    }
    return accepted(reference);
  } catch {
    return portalJson({ error: 'inquiry_service_unavailable' }, 503);
  }
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
}
