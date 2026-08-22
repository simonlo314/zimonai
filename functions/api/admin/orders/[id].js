import { cleanText, portalDb, portalJson, readPortalJson, requireAdmin } from '../../../_lib/auth.js';
import {
  cancelPortalOrder,
  OrderLifecycleError,
  orderIsCancellable
} from '../../../_lib/order-lifecycle.js';
import {
  auditStatement,
  FULFILLMENT_STATUSES,
  PAYMENT_STATUSES,
  workflowId
} from '../../../_lib/workflow.js';
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

function lifecycleError(error) {
  if (error instanceof OrderLifecycleError) {
    return portalJson({ error: error.code }, error.status);
  }
  throw error;
}

async function setPortalArchive(db, order, actorUserId, action, now = new Date()) {
  const archiving = action === 'archive';
  if ((archiving && order.archived_at) || (!archiving && !order.archived_at)) return order;
  const timestamp = now.toISOString();
  const archivedAt = archiving ? timestamp : '';
  const archivedBy = archiving ? actorUserId : null;
  const eventType = archiving ? 'admin_order_archived' : 'admin_order_unarchived';
  const previousArchivedAt = order.archived_at || '';
  await db.batch([
    db.prepare(`
      UPDATE portal_orders
      SET archived_at = ?1, archived_by_user_id = ?2, updated_at = ?3
      WHERE id = ?4 AND archived_at = ?5
    `).bind(archivedAt, archivedBy, timestamp, order.id, previousArchivedAt),
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      SELECT ?1, ?2, case_id, ?3, ?4, id, owner_user_id, ?5
      FROM portal_orders
      WHERE id = ?6 AND archived_at = ?7 AND updated_at = ?4
    `).bind(
      workflowId('evt'), actorUserId, eventType, timestamp,
      JSON.stringify({ archived: archiving }), order.id, archivedAt
    )
  ]);
  return db.prepare('SELECT * FROM portal_orders WHERE id = ?1 LIMIT 1').bind(order.id).first();
}

async function setInvitedLifecycle(db, invited, actorUserId, action, now = new Date()) {
  const timestamp = now.toISOString();
  if (action === 'cancel') {
    if (invited.order_cancelled_at) return invited;
    if (!orderIsCancellable({
      payment_status: invited.order_payment_status,
      fulfillment_status: invited.order_fulfillment_status
    })) throw new OrderLifecycleError('order_not_cancellable');
    await db.batch([
      db.prepare(`
        UPDATE portal_invited_cases
        SET order_payment_status = 'expired', order_cancelled_at = ?1,
            order_cancelled_by_user_id = ?2, updated_at = ?1
        WHERE id = ?3 AND status = 'pending' AND order_cancelled_at = ''
          AND order_payment_status IN ('pending', 'unpaid', 'failed', 'expired')
          AND order_fulfillment_status = 'awaiting_payment'
      `).bind(timestamp, actorUserId, invited.id),
      db.prepare(`
        INSERT INTO portal_audit_events
          (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
        SELECT ?1, ?2, NULL, 'admin_invited_order_cancelled', ?3, NULL, NULL, ?4
        FROM portal_invited_cases
        WHERE id = ?5 AND order_cancelled_at = ?3 AND updated_at = ?3
      `).bind(
        workflowId('evt'), actorUserId, timestamp,
        JSON.stringify({ orderId: invited.order_id, pendingCaseId: invited.case_id, paymentStatus: 'expired' }),
        invited.id
      )
    ]);
  } else {
    const archiving = action === 'archive';
    if ((archiving && invited.order_archived_at) || (!archiving && !invited.order_archived_at)) return invited;
    const archivedAt = archiving ? timestamp : '';
    const archivedBy = archiving ? actorUserId : null;
    const previousArchivedAt = invited.order_archived_at || '';
    const eventType = archiving ? 'admin_invited_order_archived' : 'admin_invited_order_unarchived';
    await db.batch([
      db.prepare(`
        UPDATE portal_invited_cases
        SET order_archived_at = ?1, order_archived_by_user_id = ?2, updated_at = ?3
        WHERE id = ?4 AND status = 'pending' AND order_archived_at = ?5
      `).bind(archivedAt, archivedBy, timestamp, invited.id, previousArchivedAt),
      db.prepare(`
        INSERT INTO portal_audit_events
          (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
        SELECT ?1, ?2, NULL, ?3, ?4, NULL, NULL, ?5
        FROM portal_invited_cases
        WHERE id = ?6 AND order_archived_at = ?7 AND updated_at = ?4
      `).bind(
        workflowId('evt'), actorUserId, eventType, timestamp,
        JSON.stringify({ orderId: invited.order_id, pendingCaseId: invited.case_id, archived: archiving }),
        invited.id, archivedAt
      )
    ]);
  }
  return db.prepare('SELECT * FROM portal_invited_cases WHERE id = ?1 LIMIT 1').bind(invited.id).first();
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
  const allowed = new Set(['paymentStatus', 'fulfillmentStatus', 'paymentMethodNote', 'action']);
  const fields = Object.keys(payload);
  if (!fields.length || fields.some((key) => !allowed.has(key))) return portalJson({ error: 'validation_failed' }, 400);
  const lifecycleAction = payload.action;
  if (Object.hasOwn(payload, 'action')
    && (fields.length !== 1 || !['archive', 'unarchive', 'cancel'].includes(lifecycleAction))) {
    return portalJson({ error: 'validation_failed' }, 400);
  }
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
  if (lifecycleAction) {
    try {
      if (order) {
        order = lifecycleAction === 'cancel'
          ? await cancelPortalOrder({
            db,
            env,
            order,
            actorUserId: authorization.session.user_id,
            eventType: 'admin_order_cancelled'
          })
          : await setPortalArchive(db, order, authorization.session.user_id, lifecycleAction);
      } else {
        invited = await setInvitedLifecycle(db, invited, authorization.session.user_id, lifecycleAction);
      }
    } catch (error) {
      return lifecycleError(error);
    }
    return portalJson({
      order: {
        id,
        paymentStatus: order ? order.payment_status : invited.order_payment_status,
        fulfillmentStatus: order ? order.fulfillment_status : invited.order_fulfillment_status,
        cancelledAt: (order ? order.cancelled_at : invited.order_cancelled_at) || '',
        archivedAt: (order ? order.archived_at : invited.order_archived_at) || '',
        pendingInvitation: Boolean(invited)
      }
    });
  }
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
      cancelledAt: order?.cancelled_at || invited?.order_cancelled_at || '',
      archivedAt: order?.archived_at || invited?.order_archived_at || '',
      pendingInvitation: Boolean(invited)
    }
  });
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
