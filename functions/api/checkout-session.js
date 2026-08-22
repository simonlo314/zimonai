import { getPortalSession, portalDb } from '../_lib/auth.js';
import { STRIPE_PRODUCTS, cleanLocale, json } from '../_lib/stripe.js';
import { publicOrder } from '../_lib/workflow.js';

function displayEmail(value = '') {
  const [local, domain] = String(value).split('@');
  if (!local || !domain) return '';
  if (local.length < 3) return `${local[0] || ''}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function onRequestGet({ request, env }) {
  const portalSession = await getPortalSession(request, env);
  if (!portalSession) return json({ error: 'authentication_required' }, 401);
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id') || '';
  const locale = cleanLocale(url.searchParams.get('locale'));
  if (!/^cs_(?:test|live)_[A-Za-z0-9]+$/.test(sessionId) || sessionId.length > 220) {
    return json({ error: 'invalid_session' }, 400);
  }
  const order = await portalDb(env).prepare(`
    SELECT o.id, o.public_reference, o.owner_user_id, o.case_id, o.source, o.product_key,
           o.product_description, o.amount_total, o.currency, o.quantity, o.stripe_session_id,
           o.service_reference, o.payment_status, o.fulfillment_status, o.paid_at,
           o.created_at, o.updated_at, u.primary_email AS owner_email
    FROM portal_orders o
    JOIN portal_users u ON u.id = o.owner_user_id
    WHERE o.stripe_session_id = ?1 AND o.owner_user_id = ?2
    LIMIT 1
  `).bind(sessionId, portalSession.user_id).first();
  if (!order) return json({ error: 'checkout_session_not_found' }, 404);

  // The signed webhook is the source of payment truth. Reading the owner-scoped
  // D1 order here avoids a second Stripe round trip and prevents a historical
  // test Checkout ID from being queried with a live-mode key.
  const product = STRIPE_PRODUCTS[order.product_key];
  return json({
    id: order.stripe_session_id,
    status: ['paid', 'waived', 'refunded'].includes(order.payment_status) ? 'complete' : 'open',
    paymentStatus: order.payment_status,
    order: publicOrder(order),
    product: order.product_key,
    productName: product?.names?.[locale] || product?.names?.en || order.product_description,
    amountTotal: Number(order.amount_total),
    currency: order.currency,
    quantity: Number(order.quantity),
    reference: order.service_reference,
    receiptEmail: displayEmail(order.owner_email)
  });
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
