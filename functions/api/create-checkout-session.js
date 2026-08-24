import { portalDb, requireMutation } from '../_lib/auth.js';
import {
  STRIPE_PRODUCTS,
  allowedRequestOrigin,
  checkoutBaseUrl,
  cleanLocale,
  cleanReference,
  json,
  readJsonRequest,
  stripeModeError,
  stripeSecretMode,
  stripeSessionMode,
  stripeRequest
} from '../_lib/stripe.js';
import {
  auditStatement,
  publicReference,
  resolveOwnedServiceReference,
  workflowId
} from '../_lib/workflow.js';

export async function onRequestPost({ request, env }) {
  const requestStarted = Date.now();
  const requestId = crypto.randomUUID();
  const respond = (data, status = 200) => json(data, status, {
    'Request-Id': requestId,
    'Server-Timing': `app;dur=${Math.max(0, Date.now() - requestStarted)}`
  });
  const authorization = await requireMutation(request, env);
  if (authorization.error) return authorization.error;
  const origin = allowedRequestOrigin(request, env);
  if (!origin) return respond({ error: 'origin_not_allowed', requestId }, 403);
  const modeError = stripeModeError(env, origin);
  if (modeError) {
    return respond({ error: modeError, requestId }, modeError === 'stripe_not_configured' ? 503 : 409);
  }
  const parsed = await readJsonRequest(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};

  const productKey = String(payload.product || '');
  const product = STRIPE_PRODUCTS[productKey];
  if (!product) return json({ error: 'unknown_product' }, 400);
  const locale = cleanLocale(payload.locale);
  const quantity = Number(payload.quantity ?? 1);
  if (!Number.isInteger(quantity) || quantity < product.min || quantity > product.max) {
    return json({ error: 'invalid_quantity' }, 400);
  }
  const reference = cleanReference(payload.reference);
  if (product.referenceRequired && reference.length < 2) return json({ error: 'reference_required' }, 400);

  const db = portalDb(env);
  let linked = null;
  if (product.referenceRequired) {
    linked = await resolveOwnedServiceReference(db, authorization.session.user_id, productKey, reference);
    if (!linked) return json({ error: 'owned_service_reference_required' }, 404);
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const orderId = workflowId('ord');
  const orderReference = publicReference('ORD', now);
  const amountTotal = product.amount * quantity;
  await db.batch([
    db.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, case_id, source, product_key, product_description,
         amount_total, currency, quantity, stripe_session_id, payment_intent_id, payment_method_note,
         service_reference, payment_status, fulfillment_status, created_by_user_id, paid_at, created_at, updated_at,
         last_stripe_event_created, last_stripe_event_id, checkout_error)
      VALUES (?1, ?2, ?3, ?4, 'stripe', ?5, ?6, ?7, 'usd', ?8, NULL, '', '', ?9,
              'pending', 'awaiting_payment', ?3, '', ?10, ?10, 0, '', '')
    `).bind(orderId, orderReference, authorization.session.user_id, linked?.caseId || null,
      productKey, product.descriptions[locale], amountTotal, quantity, linked?.reference || '', timestamp),
    auditStatement(db, {
      actorUserId: authorization.session.user_id,
      targetUserId: authorization.session.user_id,
      caseId: linked?.caseId || null,
      orderId,
      eventType: 'stripe_checkout_requested',
      details: { product: productKey, amountTotal, currency: 'usd', quantity },
      now
    })
  ]);

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const baseUrl = checkoutBaseUrl(origin);
  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('customer_creation', 'always');
  body.set('customer_email', authorization.session.primary_email);
  body.set('name_collection[individual][enabled]', 'true');
  body.set('name_collection[individual][optional]', 'false');
  if (['consultation', 't1', 't2'].includes(productKey)) {
    body.set('name_collection[business][enabled]', 'true');
    body.set('name_collection[business][optional]', 'true');
    body.set('phone_number_collection[enabled]', 'true');
    body.set('tax_id_collection[enabled]', 'true');
  }
  body.set('line_items[0][price_data][currency]', 'usd');
  body.set('line_items[0][price_data][unit_amount]', String(product.amount));
  body.set('line_items[0][price_data][product_data][name]', product.names[locale]);
  body.set('line_items[0][price_data][product_data][description]', product.descriptions[locale]);
  body.set('line_items[0][quantity]', String(quantity));
  body.set('metadata[product_key]', productKey);
  body.set('metadata[locale]', locale);
  body.set('metadata[quantity]', String(quantity));
  body.set('metadata[reference]', linked?.reference || '');
  body.set('metadata[portal_user_id]', authorization.session.user_id);
  body.set('metadata[portal_order_id]', orderId);
  body.set('client_reference_id', orderReference);
  body.set('success_url', `${baseUrl}${prefix}/payment-success/?session_id={CHECKOUT_SESSION_ID}`);
  body.set('cancel_url', `${baseUrl}${prefix}/services/?cancelled=1&item=${encodeURIComponent(productKey)}`);

  try {
    const stripeSession = await stripeRequest(env, 'checkout/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': `portal-checkout-${orderId}`
      },
      body
    });
    const secretMode = stripeSecretMode(env);
    if (stripeSessionMode(stripeSession.id) !== secretMode || stripeSession.livemode !== (secretMode === 'live')) {
      const error = new Error('stripe_mode_mismatch');
      error.code = 'stripe_mode_mismatch';
      error.status = 409;
      throw error;
    }
    if (!/^https:\/\/checkout\.stripe\.com\//.test(String(stripeSession.url || ''))) {
      throw new Error('stripe_checkout_response_invalid');
    }
    const attachedAt = new Date();
    const createdAuditId = workflowId('evt');
    const [attached] = await db.batch([
      db.prepare(`
        UPDATE portal_orders
        SET stripe_session_id = ?1, checkout_error = '', updated_at = ?2
        WHERE id = ?3 AND owner_user_id = ?4 AND stripe_session_id IS NULL AND payment_status = 'pending'
      `).bind(stripeSession.id, attachedAt.toISOString(), orderId, authorization.session.user_id),
      db.prepare(`
        INSERT INTO portal_audit_events
          (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
        SELECT ?1, ?2, ?3, 'stripe_checkout_created', ?4, ?5, ?2, ?6
        WHERE EXISTS (
          SELECT 1 FROM portal_orders
          WHERE id = ?5 AND owner_user_id = ?2 AND stripe_session_id = ?7 AND payment_status = 'pending'
        )
      `).bind(createdAuditId, authorization.session.user_id, linked?.caseId || null,
        attachedAt.toISOString(), orderId, JSON.stringify({ stripeSessionId: stripeSession.id }), stripeSession.id)
    ]);
    if (Number(attached.meta?.changes || 0) !== 1) throw new Error('stripe_checkout_attachment_failed');
    return respond({ url: stripeSession.url, id: stripeSession.id, orderReference, requestId });
  } catch (error) {
    const errorCode = ['stripe_not_configured', 'stripe_mode_mismatch', 'stripe_request_failed',
      'stripe_checkout_response_invalid', 'stripe_checkout_attachment_failed'].includes(error?.code || error?.message)
      ? (error.code || error.message)
      : 'stripe_request_failed';
    const failedAt = new Date();
    await db.batch([
      db.prepare(`
        UPDATE portal_orders
        SET payment_status = 'failed', checkout_error = ?1, updated_at = ?2
        WHERE id = ?3 AND owner_user_id = ?4 AND payment_status = 'pending'
      `).bind(errorCode, failedAt.toISOString(), orderId, authorization.session.user_id),
      auditStatement(db, {
        actorUserId: authorization.session.user_id,
        targetUserId: authorization.session.user_id,
        caseId: linked?.caseId || null,
        orderId,
        eventType: 'stripe_checkout_failed',
        details: { error: errorCode, requestId },
        now: failedAt
      })
    ]);
    const status = errorCode === 'stripe_not_configured' ? 503 : errorCode === 'stripe_mode_mismatch' ? 409 : 502;
    return respond({ error: errorCode, requestId }, status);
  }
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
