import { getPortalSession, portalDb } from '../_lib/auth.js';
import {
  STRIPE_PRODUCTS,
  cleanLocale,
  json,
  stripeModeError,
  stripeSecretMode,
  stripeSessionMode,
  stripeRequest
} from '../_lib/stripe.js';
import { publicOrder } from '../_lib/workflow.js';

const STRIPE_FALLBACK_TIMEOUT_MS = 1800;

function displayEmail(value = '') {
  const [local, domain] = String(value).split('@');
  if (!local || !domain) return '';
  if (local.length < 3) return `${local[0] || ''}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

function stripeSessionMatchesOrder(session, order, env) {
  return session?.object === 'checkout.session'
    && session.id === order.stripe_session_id
    && session.mode === 'payment'
    && session.livemode === (stripeSecretMode(env) === 'live')
    && session.client_reference_id === order.public_reference
    && session.metadata?.portal_order_id === order.id
    && session.metadata?.portal_user_id === order.owner_user_id
    && Number(session.amount_total) === Number(order.amount_total)
    && String(session.currency || '').toLowerCase() === order.currency;
}

function summaryPayload(order, locale, paymentStatus = order.payment_status, stateSource = 'portal') {
  const product = STRIPE_PRODUCTS[order.product_key];
  return {
    id: order.stripe_session_id,
    status: ['paid', 'waived', 'refunded'].includes(paymentStatus) ? 'complete' : 'open',
    paymentStatus,
    stateSource,
    order: publicOrder({ ...order, payment_status: paymentStatus }),
    product: order.product_key,
    productName: product?.names?.[locale] || product?.names?.en || order.product_description,
    amountTotal: Number(order.amount_total),
    currency: order.currency,
    quantity: Number(order.quantity),
    reference: order.service_reference,
    receiptEmail: displayEmail(order.owner_email)
  };
}

export async function onRequestGet({ request, env }) {
  const requestStarted = Date.now();
  const requestId = crypto.randomUUID();
  const timings = [];
  const respond = (data, status = 200) => json({ ...data, requestId }, status, {
    'Request-Id': requestId,
    'Server-Timing': [...timings, `app;dur=${Math.max(0, Date.now() - requestStarted)}`].join(', ')
  });
  const portalSession = await getPortalSession(request, env);
  if (!portalSession) return json({ error: 'authentication_required' }, 401);
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id') || '';
  const locale = cleanLocale(url.searchParams.get('locale'));
  if (!/^cs_(?:test|live)_[A-Za-z0-9]+$/.test(sessionId) || sessionId.length > 220) {
    return respond({ error: 'invalid_session' }, 400);
  }
  const dbStarted = Date.now();
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
  timings.push(`db;dur=${Math.max(0, Date.now() - dbStarted)}`);
  if (!order) return respond({ error: 'checkout_session_not_found' }, 404);
  const modeError = stripeModeError(env, url.origin, sessionId);
  if (modeError) return respond({ error: modeError }, modeError === 'stripe_not_configured' ? 503 : 409);

  // The signed webhook is the source of payment truth. Reading the owner-scoped
  // D1 order avoids Stripe latency in the common path. Only a just-returned,
  // still-pending order gets one bounded Stripe read while its webhook catches up.
  if (order.payment_status !== 'pending') return respond(summaryPayload(order, locale));

  const stripeStarted = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort('stripe_timeout'), STRIPE_FALLBACK_TIMEOUT_MS);
  try {
    const stripeSession = await stripeRequest(env, `checkout/sessions/${encodeURIComponent(sessionId)}`, {
      signal: controller.signal
    });
    timings.push(`stripe;dur=${Math.max(0, Date.now() - stripeStarted)}`);
    const secretMode = stripeSecretMode(env);
    if (stripeSessionMode(stripeSession?.id) !== secretMode
      || stripeSession?.livemode !== (secretMode === 'live')) {
      return respond({ error: 'stripe_mode_mismatch' }, 409);
    }
    if (!stripeSessionMatchesOrder(stripeSession, order, env)) {
      return respond({ error: 'checkout_session_mismatch' }, 409);
    }
    const paid = stripeSession.payment_status === 'paid' && stripeSession.status === 'complete';
    return respond(summaryPayload(order, locale, paid ? 'paid' : order.payment_status, paid ? 'stripe' : 'portal'));
  } catch (error) {
    timings.push(`stripe;dur=${Math.max(0, Date.now() - stripeStarted)}`);
    if (error?.code === 'stripe_mode_mismatch' || error?.message === 'stripe_mode_mismatch') {
      return respond({ error: 'stripe_mode_mismatch' }, 409);
    }
    // A bounded fallback failure does not erase the authenticated local order.
    // The page remains in its honest waiting state until the signed webhook lands.
    return respond(summaryPayload(order, locale));
  } finally {
    clearTimeout(timeout);
  }
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
