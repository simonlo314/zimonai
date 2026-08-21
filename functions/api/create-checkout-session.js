import {
  STRIPE_PRODUCTS,
  allowedRequestOrigin,
  checkoutBaseUrl,
  cleanLocale,
  cleanReference,
  json,
  stripeRequest
} from '../_lib/stripe.js';

export async function onRequestPost({ request, env }) {
  const origin = allowedRequestOrigin(request, env);
  if (!origin) return json({ error: 'origin_not_allowed' }, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ error: 'invalid_content_type' }, 415);
  if (Number(request.headers.get('Content-Length') || 0) > 4096) return json({ error: 'request_too_large' }, 413);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const productKey = String(payload.product || '');
  const product = STRIPE_PRODUCTS[productKey];
  if (!product) return json({ error: 'unknown_product' }, 400);

  const locale = cleanLocale(payload.locale);
  const quantity = Number.parseInt(payload.quantity || 1, 10);
  if (!Number.isInteger(quantity) || quantity < product.min || quantity > product.max) return json({ error: 'invalid_quantity' }, 400);

  const reference = cleanReference(payload.reference);
  if (product.referenceRequired && reference.length < 2) return json({ error: 'reference_required' }, 400);

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const baseUrl = checkoutBaseUrl(origin, env);
  const body = new URLSearchParams();
  body.set('mode', 'payment');
  body.set('customer_creation', 'always');
  body.set('name_collection[individual][enabled]', 'true');
  body.set('name_collection[individual][optional]', 'false');

  const needsFullBuyerContact = ['consultation', 't1', 't2'].includes(productKey);
  if (needsFullBuyerContact) {
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
  body.set('metadata[reference]', reference);
  if (reference) body.set('client_reference_id', reference);
  body.set('success_url', `${baseUrl}${prefix}/payment-success/?session_id={CHECKOUT_SESSION_ID}`);
  body.set('cancel_url', `${baseUrl}${prefix}/payments/?cancelled=1&item=${encodeURIComponent(productKey)}`);

  try {
    const session = await stripeRequest(env, 'checkout/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    return json({ url: session.url, id: session.id });
  } catch (error) {
    const status = error.message === 'stripe_not_configured' ? 503 : 502;
    return json({ error: error.message }, status);
  }
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
