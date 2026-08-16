import { STRIPE_PRODUCTS, json, stripeRequest } from '../_lib/stripe.js';

function displayEmail(value = '') {
  const [local, domain] = String(value).split('@');
  if (!local || !domain) return '';
  if (local.length < 3) return `${local[0] || ''}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id') || '';
  if (!/^cs_(?:test|live)_[A-Za-z0-9]+$/.test(sessionId) || sessionId.length > 220) return json({ error: 'invalid_session' }, 400);

  try {
    const session = await stripeRequest(env, `checkout/sessions/${encodeURIComponent(sessionId)}`);
    const productKey = session.metadata?.product_key || '';
    const product = STRIPE_PRODUCTS[productKey];
    return json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      product: productKey,
      productName: product?.names?.[session.metadata?.locale] || product?.names?.en || 'ZimonAI service',
      amountTotal: session.amount_total,
      currency: session.currency,
      quantity: Number(session.metadata?.quantity || 1),
      reference: session.metadata?.reference || session.client_reference_id || '',
      receiptEmail: displayEmail(session.customer_details?.email || session.customer_email)
    });
  } catch (error) {
    const status = error.message === 'stripe_not_configured' ? 503 : 404;
    return json({ error: error.message }, status);
  }
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
