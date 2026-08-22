import { stripeRequest } from './stripe.js';
import { workflowId } from './workflow.js';

const CANCELLABLE_PAYMENT_STATUSES = new Set(['pending', 'unpaid', 'failed', 'expired']);
const CHECKOUT_INITIALIZATION_GRACE_MS = 2 * 60 * 1000;

export class OrderLifecycleError extends Error {
  constructor(code, status = 409) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

function orderAgeMs(order, now) {
  const created = Date.parse(order.created_at || '');
  return Number.isFinite(created) ? Math.max(0, now.getTime() - created) : Number.POSITIVE_INFINITY;
}

export function orderIsCancellable(order) {
  // Cancellation is a payment-ledger decision. An administrator may already
  // have closed the operational workflow, but an unsettled Checkout Session
  // must still be cancellable so it cannot remain payable indefinitely.
  return CANCELLABLE_PAYMENT_STATUSES.has(order.payment_status);
}

async function expireStripeCheckout(env, order) {
  if (!order.stripe_session_id) return;
  let session;
  try {
    session = await stripeRequest(env, `checkout/sessions/${encodeURIComponent(order.stripe_session_id)}`);
  } catch (error) {
    // A session missing from the currently configured Stripe account cannot
    // accept payment there.  Retain the local ledger row and close it safely.
    if (error?.status === 404) return;
    throw new OrderLifecycleError(
      error?.message === 'stripe_not_configured' ? 'stripe_not_configured' : 'stripe_order_state_unavailable',
      error?.message === 'stripe_not_configured' ? 503 : 502
    );
  }
  if (session.payment_status === 'paid' || session.status === 'complete') {
    throw new OrderLifecycleError('order_not_cancellable');
  }
  if (session.status === 'expired') return;
  if (session.status !== 'open') throw new OrderLifecycleError('order_not_cancellable');
  try {
    await stripeRequest(env, `checkout/sessions/${encodeURIComponent(order.stripe_session_id)}/expire`, {
      method: 'POST'
    });
  } catch (error) {
    throw new OrderLifecycleError(
      error?.message === 'stripe_not_configured' ? 'stripe_not_configured' : 'stripe_order_state_unavailable',
      error?.message === 'stripe_not_configured' ? 503 : error?.status === 400 ? 409 : 502
    );
  }
}

export async function cancelPortalOrder({ db, env, order, actorUserId, eventType, now = new Date() }) {
  if (order.cancelled_at) return order;
  if (!orderIsCancellable(order)) {
    throw new OrderLifecycleError('order_not_cancellable');
  }
  if (order.source === 'stripe' && !order.stripe_session_id
    && order.payment_status === 'pending' && orderAgeMs(order, now) < CHECKOUT_INITIALIZATION_GRACE_MS) {
    // create-checkout-session inserts the order before attaching the Stripe
    // session.  Closing it during that short window could orphan a live session.
    throw new OrderLifecycleError('order_checkout_initializing');
  }
  if (order.source === 'stripe') await expireStripeCheckout(env, order);

  const timestamp = now.toISOString();
  const eventId = workflowId('evt');
  const detail = JSON.stringify({ previousPaymentStatus: order.payment_status, paymentStatus: 'expired' });
  const results = await db.batch([
    db.prepare(`
      UPDATE portal_orders
      SET payment_status = 'expired', cancelled_at = ?1, cancelled_by_user_id = ?2, updated_at = ?1
      WHERE id = ?3 AND cancelled_at = ''
        AND payment_status IN ('pending', 'unpaid', 'failed', 'expired')
    `).bind(timestamp, actorUserId, order.id),
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      SELECT ?1, ?2, case_id, ?3, ?4, id, owner_user_id, ?5
      FROM portal_orders
      WHERE id = ?6 AND cancelled_at = ?4 AND cancelled_by_user_id = ?2
    `).bind(eventId, actorUserId, eventType, timestamp, detail, order.id)
  ]);
  const updated = await db.prepare('SELECT * FROM portal_orders WHERE id = ?1 LIMIT 1').bind(order.id).first();
  if (Number(results[0]?.meta?.changes || 0) !== 1 && !updated?.cancelled_at) {
    throw new OrderLifecycleError('order_not_cancellable');
  }
  return updated || order;
}
