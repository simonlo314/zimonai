import assert from 'node:assert/strict';
import test from 'node:test';
import { STRIPE_PRODUCTS, isJsonContentType, readJsonRequest } from '../functions/_lib/stripe.js';
import { onRequest, onRequestPost } from '../functions/api/create-checkout-session.js';

const localEnv = {
  ALLOW_LOCAL_CHECKOUT: 'true',
  SITE_URL: 'http://127.0.0.1:8788',
  STRIPE_SECRET_KEY: 'sk_test_local_regression_only'
};

function checkoutRequest(payload, contentType = 'application/json') {
  return new Request('http://127.0.0.1:8788/api/create-checkout-session', {
    method: 'POST',
    headers: { Origin: 'http://127.0.0.1:8788', 'Content-Type': contentType },
    body: JSON.stringify(payload)
  });
}

test('server-owned Stripe catalogue amounts remain fixed', () => {
  assert.deepEqual(
    Object.fromEntries(Object.entries(STRIPE_PRODUCTS).map(([key, product]) => [key, product.amount])),
    { consultation: 9900, t1: 14900, t2: 34900, balance: 1000, 'consultation-extension': 4900 }
  );
});

test('JSON media type matching does not accept JSONP lookalikes', () => {
  assert.equal(isJsonContentType('application/json'), true);
  assert.equal(isJsonContentType('application/json; charset=utf-8'), true);
  assert.equal(isJsonContentType('application/jsonp'), false);
  assert.equal(isJsonContentType('application/json-evil'), false);
  assert.equal(isJsonContentType('text/plain'), false);
});

test('checkout JSON rejects an oversized chunked body without Content-Length', async () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"product":"'));
      controller.enqueue(new Uint8Array(32));
      controller.enqueue(new TextEncoder().encode('"}'));
      controller.close();
    }
  });
  const request = new Request('http://127.0.0.1:8788/api/create-checkout-session', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: stream, duplex: 'half'
  });
  const parsed = await readJsonRequest(request, 24);
  assert.equal(parsed.error.status, 413);
  assert.deepEqual(await parsed.error.json(), { error: 'request_too_large' });
});

test('checkout ignores a client-supplied amount and sends the catalogue amount to Stripe', async () => {
  const originalFetch = globalThis.fetch;
  let stripeBody;
  globalThis.fetch = async (_url, options) => {
    stripeBody = options.body;
    return new Response(JSON.stringify({ id: 'cs_test_local', url: 'https://checkout.stripe.com/test' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };
  try {
    const response = await onRequestPost({
      request: checkoutRequest({ product: 't1', locale: 'en', quantity: 1, amount: 1 }),
      env: localEnv
    });
    assert.equal(response.status, 200);
    assert.equal(stripeBody.get('line_items[0][price_data][unit_amount]'), '14900');
    assert.equal(stripeBody.get('line_items[0][quantity]'), '1');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('checkout rejects an unconfirmed balance, wrong origin and JSONP content type', async () => {
  const missingReference = await onRequestPost({
    request: checkoutRequest({ product: 'balance', locale: 'en', quantity: 1 }),
    env: localEnv
  });
  assert.equal(missingReference.status, 400);

  const wrongOrigin = new Request('http://127.0.0.1:8788/api/create-checkout-session', {
    method: 'POST',
    headers: { Origin: 'https://zimonai.com.evil.example', 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: 't1' })
  });
  assert.equal((await onRequestPost({ request: wrongOrigin, env: localEnv })).status, 403);
  assert.equal((await onRequestPost({ request: checkoutRequest({ product: 't1' }, 'application/jsonp'), env: localEnv })).status, 415);
  assert.equal((await onRequest()).status, 405);
});
