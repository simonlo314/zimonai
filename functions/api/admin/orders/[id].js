import { cleanText, portalDb, portalJson, readPortalJson, requireAdmin } from '../../../_lib/auth.js';
import { auditStatement, FULFILLMENT_STATUSES, PAYMENT_STATUSES } from '../../../_lib/workflow.js';
import { adminNotificationEmails, deliverQueuedNotifications, queueNotification } from '../../../_lib/notifications.js';

function validId(value) {
  const id = String(value || '');
  return /^ord_[A-Za-z0-9_-]{8,100}$/.test(id) ? id : '';
}

async function queuePaidNotifications(env, order, locale) {
  const payload = {
    orderReference: order.public_reference,
    description: order.product_description,
    amountTotal: Number(order.amount_total),
    currency: order.currency
  };
  await queueNotification(env, {
    type: 'customer_order_paid',
    to: order.owner_email,
    locale,
    payload,
    dedupeKey: `customer_order_paid:${order.id}`
  });
  for (const email of adminNotificationEmails(env)) {
    await queueNotification(env, {
      type: 'admin_order_paid',
      to: email,
      locale: 'zh-tw',
      payload,
      dedupeKey: `admin_order_paid:${order.id}:${email}`
    });
  }
}

export async function onRequestPatch(context) {
  const { request, env, params } = context;
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const id = validId(params?.id);
  if (!id) return portalJson({ error: 'order_not_found' }, 404);
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};
  const allowed = new Set(['paymentStatus', 'fulfillmentStatus', 'paymentMethodNote']);
  const fields = Object.keys(payload);
  if (!fields.length || fields.some((key) => !allowed.has(key))) return portalJson({ error: 'validation_failed' }, 400);
  const db = portalDb(env);
  let order = await db.prepare(`
    SELECT o.*, u.primary_email AS owner_email, u.locale AS owner_locale, 0 AS pending_invitation
    FROM portal_orders o JOIN portal_users u ON u.id = o.owner_user_id
    WHERE o.id = ?1 LIMIT 1
  `).bind(id).first();
  let invited = null;
  if (!order) {
    invited = await db.prepare(`
      SELECT d.*, i.email_display AS owner_email, i.locale AS owner_locale
      FROM portal_invited_cases d JOIN portal_customer_invites i ON i.id = d.invite_id
      WHERE d.order_id = ?1 AND d.status = 'pending' AND i.status = 'pending'
      LIMIT 1
    `).bind(id).first();
  }
  if (!order && !invited) return portalJson({ error: 'order_not_found' }, 404);
  const previousPayment = order?.payment_status || invited.order_payment_status;
  const previousFulfillment = order?.fulfillment_status || invited.order_fulfillment_status;
  const source = order?.source || 'manual';
  const paymentStatus = Object.hasOwn(payload, 'paymentStatus') ? payload.paymentStatus : previousPayment;
  const fulfillmentStatus = Object.hasOwn(payload, 'fulfillmentStatus') ? payload.fulfillmentStatus : previousFulfillment;
  const paymentMethodNote = Object.hasOwn(payload, 'paymentMethodNote')
    ? cleanText(payload.paymentMethodNote, 500)
    : order?.payment_method_note || invited?.order_payment_method_note || '';
  if (!PAYMENT_STATUSES.has(paymentStatus) || !FULFILLMENT_STATUSES.has(fulfillmentStatus) || paymentMethodNote === null) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
  if (source === 'stripe' && paymentStatus !== previousPayment) {
    return portalJson({ error: 'stripe_payment_status_is_webhook_managed' }, 409);
  }
  const now = new Date();
  const timestamp = now.toISOString();
  const paidAt = ['paid', 'waived'].includes(paymentStatus)
    ? (order?.paid_at || invited?.paid_at || timestamp)
    : (paymentStatus === 'refunded' ? (order?.paid_at || invited?.paid_at || '') : '');
  if (order) {
    await db.batch([
      db.prepare(`
        UPDATE portal_orders
        SET payment_status = ?1, fulfillment_status = ?2, payment_method_note = ?3,
            paid_at = ?4, updated_at = ?5
        WHERE id = ?6 AND source = ?7
      `).bind(paymentStatus, fulfillmentStatus, paymentMethodNote, paidAt, timestamp, id, source),
      auditStatement(db, {
        actorUserId: authorization.session.user_id,
        targetUserId: order.owner_user_id,
        caseId: order.case_id || null,
        orderId: id,
        eventType: 'admin_order_updated',
        details: { fields: fields.sort(), paymentStatus, fulfillmentStatus },
        now
      })
    ]);
    order = await db.prepare(`
      SELECT o.*, u.primary_email AS owner_email, u.locale AS owner_locale
      FROM portal_orders o JOIN portal_users u ON u.id = o.owner_user_id
      WHERE o.id = ?1 LIMIT 1
    `).bind(id).first();
  } else {
    await db.batch([
      db.prepare(`
        UPDATE portal_invited_cases
        SET order_payment_status = ?1, order_fulfillment_status = ?2,
            order_payment_method_note = ?3, paid_at = ?4, updated_at = ?5
        WHERE order_id = ?6 AND status = 'pending'
      `).bind(paymentStatus, fulfillmentStatus, paymentMethodNote, paidAt, timestamp, id),
      auditStatement(db, {
        actorUserId: authorization.session.user_id,
        eventType: 'admin_invited_order_updated',
        details: { orderId: id, pendingCaseId: invited.case_id, fields: fields.sort(), paymentStatus, fulfillmentStatus },
        now
      })
    ]);
  }
  // A waived charge settles the manual ledger without representing money
  // received. Never reuse the paid receipt/alert for that distinct outcome.
  if (paymentStatus === 'paid') {
    const notificationOrder = order || {
      id,
      public_reference: invited.order_public_reference,
      product_description: invited.order_product_description,
      amount_total: invited.order_amount_total,
      currency: invited.order_currency,
      owner_email: invited.owner_email
    };
    await queuePaidNotifications(env, notificationOrder, order?.owner_locale || invited?.owner_locale || 'en');
    if (typeof context.waitUntil === 'function') {
      context.waitUntil(deliverQueuedNotifications(env, { limit: 6 }).catch(() => null));
    }
  }
  return portalJson({
    order: {
      id,
      paymentStatus,
      fulfillmentStatus,
      paidAt,
      pendingInvitation: Boolean(invited)
    }
  });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
