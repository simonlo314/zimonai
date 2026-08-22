import { getPortalSession, portalDb } from '../_lib/auth.js';
import { STRIPE_PRODUCTS, json, stripeRequest } from '../_lib/stripe.js';
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
  if (!/^cs_(?:test|live)_[A-Za-z0-9]+$/.test(sessionId) || sessionId.length > 220) {
    return json({ error: 'invalid_session' }, 400);
  }
  const order = await portalDb(env).prepare(`
    SELECT id, public_reference, owner_user_id, case_id, source, product_key, product_description,
           amount_total, currency, quantity, stripe_session_id, service_reference, payment_status,
           fulfillment_status, paid_at, created_at, updated_at
    FROM portal_orders
    WHERE stripe_session_id = ?1 AND owner_user_id = ?2
    LIMIT 1
  `).bind(sessionId, portalSession.user_id).first();
  if (!order) return json({ error: 'checkout_session_not_found' }, 404);

  try {
    const stripeSession = await stripeRequest(env, `checkout/sessions/${encodeURIComponent(sessionId)}`);
    const productKey = stripeSession.metadata?.product_key || '';
    const quantity = Number(stripeSession.metadata?.quantity || 0);
    const integrityOk = stripeSession.id === order.stripe_session_id
      && stripeSession.metadata?.portal_user_id === portalSession.user_id
      && stripeSession.metadata?.portal_order_id === order.id
      && productKey === order.product_key
      && quantity === Number(order.quantity)
      && Number(stripeSession.amount_total) === Number(order.amount_total)
      && String(stripeSession.currency || '').toLowerCase() === String(order.currency || '').toLowerCase();
    if (!integrityOk) return json({ error: 'checkout_session_integrity_failed' }, 409);
    const product = STRIPE_PRODUCTS[productKey];
    return json({
      id: stripeSession.id,
      status: stripeSession.status,
      paymentStatus: stripeSession.payment_status,
      order: publicOrder(order),
      product: productKey,
      productName: product?.names?.[stripeSession.metadata?.locale] || product?.names?.en || order.product_description,
      amountTotal: stripeSession.amount_total,
      currency: stripeSession.currency,
      quantity,
      reference: order.service_reference,
      receiptEmail: displayEmail(stripeSession.customer_details?.email || stripeSession.customer_email)
    });
  } catch (error) {
    const status = error.message === 'stripe_not_configured' ? 503 : 502;
    return json({ error: String(error.message || 'stripe_request_failed') }, status);
  }
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
