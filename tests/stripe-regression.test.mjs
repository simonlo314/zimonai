import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { issuePortalSession, upsertVerifiedIdentity } from '../functions/_lib/auth.js';
import { STRIPE_PRODUCTS, isJsonContentType, readJsonRequest } from '../functions/_lib/stripe.js';
import { onRequestGet as checkoutSummary } from '../functions/api/checkout-session.js';
import { onRequest, onRequestPost as createCheckout } from '../functions/api/create-checkout-session.js';
import { onRequestPost as stripeWebhook } from '../functions/api/stripe-webhook.js';
import { SqliteD1 } from './helpers/sqlite-d1.mjs';

const origin = 'http://127.0.0.1:8788';
const sessionSecret = 'stripe-regression-session-secret-is-at-least-32-bytes';
const webhookSecret = 'whsec_local_regression';

function analyticsDb() {
  const db = new SqliteD1();
  db.raw.exec(readFileSync(new URL('../migrations/0002_payments.sql', import.meta.url), 'utf8'));
  db.raw.exec(readFileSync(new URL('../migrations/0003_payment_customer_details.sql', import.meta.url), 'utf8'));
  return db;
}

async function account(db, env, email, subject) {
  const user = await upsertVerifiedIdentity(env, {
    provider: 'email', providerSubject: subject, email, displayName: subject, locale: 'en'
  });
  const session = await issuePortalSession(new Request(`${origin}/portal/`), env, user.id, {
    provider: 'email',
    providerSubject: subject
  });
  return { user, session, cookie: session.cookie.split(';', 1)[0] };
}

async function fixture() {
  const portal = new SqliteD1();
  const analytics = analyticsDb();
  const env = {
    PORTAL_DB: portal,
    ANALYTICS_DB: analytics,
    PORTAL_AUTH_ENABLED: 'true',
    PORTAL_SESSION_SECRET: sessionSecret,
    ALLOW_LOCAL_PORTAL: 'true',
    ALLOW_LOCAL_CHECKOUT: 'true',
    SITE_URL: origin,
    STRIPE_SECRET_KEY: 'sk_test_local_regression_only',
    STRIPE_WEBHOOK_SECRET: webhookSecret,
    PORTAL_ADMIN_NOTIFICATION_EMAILS: 'owner@example.com, backup@example.com'
  };
  const owner = await account(portal, env, 'owner@example.com', 'owner-subject');
  const other = await account(portal, env, 'other@example.com', 'other-subject');
  return {
    portal, analytics, env, owner, other,
    close() { portal.close(); analytics.close(); }
  };
}

function checkoutRequest(payload, accountInfo, {
  csrf = accountInfo?.session.csrfToken,
  requestOrigin = origin,
  contentType = 'application/json'
} = {}) {
  const headers = { Origin: requestOrigin, 'Content-Type': contentType };
  if (accountInfo) {
    headers.Cookie = accountInfo.cookie;
    if (csrf !== null) headers['X-CSRF-Token'] = csrf;
  }
  return new Request(`${origin}/api/create-checkout-session`, {
    method: 'POST', headers, body: JSON.stringify(payload)
  });
}

function portalRequest(path, accountInfo) {
  return new Request(`${origin}${path}`, { headers: { Cookie: accountInfo.cookie } });
}

function stripeCreateStub(sessionId = 'cs_test_local123') {
  let requestBody;
  return {
    get body() { return requestBody; },
    fetch: async (_url, options) => {
      requestBody = options.body;
      return new Response(JSON.stringify({ id: sessionId, url: `https://checkout.stripe.com/c/pay/${sessionId}` }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    }
  };
}

async function createOrderWithCheckout(
  fx,
  product,
  accountInfo = fx.owner,
  extra = {},
  sessionId = `cs_test_${product.replaceAll('-', '')}123`
) {
  const stub = stripeCreateStub(sessionId);
  const previous = globalThis.fetch;
  globalThis.fetch = stub.fetch;
  try {
    const response = await createCheckout({
      request: checkoutRequest({ product, locale: 'en', quantity: 1, ...extra }, accountInfo), env: fx.env
    });
    assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
    const body = await response.json();
    const order = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE stripe_session_id = ?').get(body.id);
    assert.ok(order);
    return { body, order, stripeBody: stub.body };
  } finally {
    globalThis.fetch = previous;
  }
}

async function stripeSignature(raw, timestamp = Math.floor(Date.now() / 1000)) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(webhookSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${raw}`));
  const signature = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return `t=${timestamp},v1=${signature}`;
}

function paidEvent(order, {
  id = 'evt_paid123',
  type = 'checkout.session.completed',
  created = Math.floor(Date.now() / 1000),
  amountTotal = order.amount_total
} = {}) {
  return {
    id, type, created, livemode: false,
    data: {
      object: {
        object: 'checkout.session', id: order.stripe_session_id, mode: 'payment', livemode: false,
        client_reference_id: order.public_reference,
        payment_status: type === 'checkout.session.expired' ? 'unpaid' : 'paid',
        payment_intent: 'pi_testlocal123', amount_total: amountTotal, currency: 'usd',
        customer_details: { email: 'owner@example.com', name: 'Owner Example', phone: '', tax_ids: [] },
        metadata: {
          portal_order_id: order.id,
          portal_user_id: order.owner_user_id,
          product_key: order.product_key,
          quantity: String(order.quantity),
          locale: 'en',
          reference: order.service_reference || ''
        }
      }
    }
  };
}

function refundEvent(order, {
  id = 'evt_refunded123',
  created = Math.floor(Date.now() / 1000),
  chargeId = 'ch_testrefunded123',
  amount = order.amount_total,
  amountRefunded = amount,
  currency = order.currency,
  paymentIntent = order.payment_intent_id,
  refunded = true,
  liveMode = false
} = {}) {
  return {
    id,
    type: 'charge.refunded',
    created,
    livemode: liveMode,
    data: {
      object: {
        object: 'charge',
        id: chargeId,
        payment_intent: paymentIntent,
        amount,
        amount_refunded: amountRefunded,
        currency,
        paid: true,
        refunded,
        status: 'succeeded',
        livemode: liveMode
      }
    }
  };
}

async function sendEvent(fx, event) {
  const raw = JSON.stringify(event);
  const waits = [];
  const response = await stripeWebhook({
    request: new Request(`${origin}/api/stripe-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Stripe-Signature': await stripeSignature(raw) },
      body: raw
    }),
    env: fx.env,
    waitUntil(promise) { waits.push(promise); }
  });
  await Promise.allSettled(waits);
  return response;
}

function serializeBatches(db) {
  const original = db.batch.bind(db);
  let tail = Promise.resolve();
  db.batch = (statements) => {
    const result = tail.then(() => original(statements));
    tail = result.catch(() => null);
    return result;
  };
}

function forceSharedOrderSnapshotThenPaidWriteFirst(db) {
  const originalPrepare = db.prepare.bind(db);
  let orderReads = 0;
  let releaseReads;
  let releasePaid;
  const readsReady = new Promise((resolve) => { releaseReads = resolve; });
  const paidWritten = new Promise((resolve) => { releasePaid = resolve; });
  db.prepare = (sql) => {
    const statement = originalPrepare(sql);
    if (sql.includes('SELECT o.*, u.primary_email AS owner_email')) {
      const originalFirst = statement.first.bind(statement);
      statement.first = async () => {
        const snapshot = await originalFirst();
        orderReads += 1;
        if (orderReads === 2) releaseReads();
        else await readsReady;
        return snapshot;
      };
    }
    if (sql.includes('atomic_payment_transition')) {
      const originalRun = statement.run.bind(statement);
      statement.run = async () => {
        const incomingStatus = statement.values[1];
        if (incomingStatus === 'expired') await paidWritten;
        const result = await originalRun();
        if (incomingStatus === 'paid') releasePaid();
        return result;
      };
    }
    return statement;
  };
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
  const request = new Request(`${origin}/api/create-checkout-session`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: stream, duplex: 'half'
  });
  const parsed = await readJsonRequest(request, 24);
  assert.equal(parsed.error.status, 413);
  assert.deepEqual(await parsed.error.json(), { error: 'request_too_large' });
});

test('checkout requires login, exact origin and CSRF before creating an order', async () => {
  const fx = await fixture();
  try {
    const anonymous = await createCheckout({ request: checkoutRequest({ product: 't1' }, null), env: fx.env });
    assert.equal(anonymous.status, 401);
    const noCsrf = await createCheckout({
      request: checkoutRequest({ product: 't1' }, fx.owner, { csrf: null }), env: fx.env
    });
    assert.equal(noCsrf.status, 403);
    const evil = await createCheckout({
      request: checkoutRequest({ product: 't1' }, fx.owner, { requestOrigin: 'https://zimonai.com.evil.example' }),
      env: fx.env
    });
    assert.equal(evil.status, 403);
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders').get().count, 0);
  } finally { fx.close(); }
});

test('checkout ignores client amount and binds verified owner, order and email to Stripe', async () => {
  const fx = await fixture();
  try {
    const created = await createOrderWithCheckout(fx, 't1', fx.owner, { amount: 1 });
    assert.equal(created.stripeBody.get('line_items[0][price_data][unit_amount]'), '14900');
    assert.equal(created.stripeBody.get('line_items[0][quantity]'), '1');
    assert.equal(created.stripeBody.get('customer_email'), 'owner@example.com');
    assert.equal(created.stripeBody.get('metadata[portal_user_id]'), fx.owner.user.id);
    assert.equal(created.stripeBody.get('metadata[portal_order_id]'), created.order.id);
    assert.equal(created.order.amount_total, 14900);
    assert.equal(created.order.owner_user_id, fx.owner.user.id);
    assert.equal(created.order.payment_status, 'pending');
  } finally { fx.close(); }
});

test('checkout rejects non-integer and parseable-looking quantities', async () => {
  const fx = await fixture();
  try {
    for (const quantity of ['1item', 1.5, 0, 101]) {
      const response = await createCheckout({
        request: checkoutRequest({ product: 'balance', reference: 'missing', quantity }, fx.owner), env: fx.env
      });
      assert.equal(response.status, 400);
      assert.equal((await response.json()).error, 'invalid_quantity');
    }
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders').get().count, 0);
  } finally { fx.close(); }
});

test('balance and consultation extension references must belong to the signed-in account', async () => {
  const fx = await fixture();
  try {
    const now = new Date().toISOString();
    fx.portal.raw.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, source, product_key, product_description, amount_total, currency,
         quantity, service_reference, payment_status, fulfillment_status, paid_at, created_at, updated_at)
      VALUES (?, ?, ?, 'manual', 'consultation', 'Consultation', 9900, 'usd', 1, '', 'paid', 'reviewing', ?, ?, ?)
    `).run('ord_existing_paid', 'ORD-2026-OWNERPAID', fx.owner.user.id, now, now, now);

    const foreign = await createCheckout({
      request: checkoutRequest({ product: 'balance', reference: 'ORD-2026-OWNERPAID' }, fx.other), env: fx.env
    });
    assert.equal(foreign.status, 404);

    const balance = await createOrderWithCheckout(
      fx, 'balance', fx.owner, { reference: 'ORD-2026-OWNERPAID' }, 'cs_test_balanceowned123'
    );
    assert.equal(balance.order.service_reference, 'ORD-2026-OWNERPAID');

    const extension = await createOrderWithCheckout(
      fx, 'consultation-extension', fx.owner, { reference: 'ORD-2026-OWNERPAID' }, 'cs_test_extensionowned123'
    );
    assert.equal(extension.order.service_reference, 'ORD-2026-OWNERPAID');
  } finally { fx.close(); }
});

test('checkout summary is owner-only and validates Stripe metadata integrity', async () => {
  const fx = await fixture();
  try {
    const created = await createOrderWithCheckout(fx, 'consultation');
    const denied = await checkoutSummary({
      request: portalRequest(`/api/checkout-session?session_id=${created.body.id}`, fx.other), env: fx.env
    });
    assert.equal(denied.status, 404);

    const previous = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({
      id: created.body.id,
      status: 'complete', payment_status: 'paid', amount_total: 9900, currency: 'usd',
      customer_details: { email: 'owner@example.com' },
      metadata: {
        portal_user_id: fx.owner.user.id, portal_order_id: created.order.id,
        product_key: 'consultation', quantity: '1', locale: 'en'
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    try {
      const allowed = await checkoutSummary({
        request: portalRequest(`/api/checkout-session?session_id=${created.body.id}`, fx.owner), env: fx.env
      });
      assert.equal(allowed.status, 200);
      const body = await allowed.json();
      assert.equal(body.order.id, created.order.id);
      assert.equal(body.receiptEmail, 'ow***@example.com');
    } finally { globalThis.fetch = previous; }
  } finally { fx.close(); }
});

test('webhook rejects amount mismatch without changing the operational order', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't1');
    const response = await sendEvent(fx, paidEvent(order, { id: 'evt_mismatch123', amountTotal: 1 }));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ignored, 'stripe_amount_mismatch');
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'pending'
    );
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
  } finally { fx.close(); }
});

test('paid T1 creates one awaiting-client case and idempotent notification outbox', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't1');
    const event = paidEvent(order);
    assert.equal((await sendEvent(fx, event)).status, 200);
    const replay = await sendEvent(fx, event);
    assert.equal(replay.status, 200);
    assert.equal((await replay.json()).replayed, true);

    const updated = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE id = ?').get(order.id);
    assert.equal(updated.payment_status, 'paid');
    assert.equal(updated.fulfillment_status, 'awaiting_intake');
    const cases = fx.portal.raw.prepare('SELECT * FROM portal_cases WHERE payment_order_id = ?').all(order.id);
    assert.equal(cases.length, 1);
    assert.equal(cases[0].status, 'awaiting_client');
    assert.equal(cases[0].supplier_name, '');
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM notification_outbox').get().count, 3);
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_stripe_events').get().count, 1);
  } finally { fx.close(); }
});

test('out-of-order expiry cannot regress paid state or duplicate the T2 case', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't2');
    const created = Math.floor(Date.now() / 1000);
    assert.equal((await sendEvent(fx, paidEvent(order, { id: 'evt_t2paid123', created }))).status, 200);
    assert.equal((await sendEvent(fx, paidEvent(order, {
      id: 'evt_t2expired123', type: 'checkout.session.expired', created: created - 60
    }))).status, 200);
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'paid'
    );
    assert.equal(
      fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases WHERE payment_order_id = ?').get(order.id).count,
      1
    );
  } finally { fx.close(); }
});

test('a fully refunded Charge atomically updates the exact portal and analytics order once', async () => {
  const fx = await fixture();
  try {
    const { order: createdOrder } = await createOrderWithCheckout(fx, 't1');
    const created = Math.floor(Date.now() / 1000);
    assert.equal((await sendEvent(fx, paidEvent(createdOrder, {
      id: 'evt_refundpaid123', created
    }))).status, 200);
    const paidOrder = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE id = ?').get(createdOrder.id);
    const paidAt = paidOrder.paid_at;
    assert.equal(paidOrder.payment_status, 'paid');
    assert.equal(paidOrder.payment_intent_id, 'pi_testlocal123');

    const refund = refundEvent(paidOrder, {
      id: 'evt_fullrefund123',
      chargeId: 'ch_fullrefund123',
      created: created + 60
    });
    const first = await sendEvent(fx, refund);
    assert.equal(first.status, 200);
    assert.deepEqual(await first.json(), { received: true });

    const refunded = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE id = ?').get(createdOrder.id);
    assert.equal(refunded.payment_status, 'refunded');
    assert.equal(refunded.fulfillment_status, 'awaiting_intake');
    assert.equal(refunded.paid_at, paidAt);
    assert.equal(refunded.last_stripe_event_created, created + 60);
    assert.equal(refunded.last_stripe_event_id, refund.id);
    assert.equal(
      fx.analytics.raw.prepare('SELECT payment_status FROM payment_orders WHERE stripe_session_id = ?')
        .get(createdOrder.stripe_session_id).payment_status,
      'refunded'
    );
    assert.equal(
      fx.analytics.raw.prepare('SELECT COUNT(*) AS count FROM payment_orders WHERE stripe_session_id = ?')
        .get(refund.data.object.id).count,
      0
    );
    assert.equal(fx.analytics.raw.prepare('SELECT COUNT(*) AS count FROM payment_orders').get().count, 1);
    const refundAudits = fx.portal.raw.prepare(`
      SELECT id FROM portal_audit_events WHERE order_id = ? AND event_type = 'stripe_payment_refunded'
    `).all(createdOrder.id);
    assert.equal(refundAudits.length, 1);
    assert.equal(refundAudits[0].id, `evt_stripe_refund_${refund.id}`);
    assert.equal(
      fx.portal.raw.prepare('SELECT processing_status FROM portal_stripe_events WHERE event_id = ?')
        .get(refund.id).processing_status,
      'processed'
    );

    const replay = await sendEvent(fx, refund);
    assert.equal(replay.status, 200);
    assert.equal((await replay.json()).replayed, true);
    assert.equal(
      fx.portal.raw.prepare("SELECT COUNT(*) AS count FROM portal_audit_events WHERE order_id = ? AND event_type = 'stripe_payment_refunded'")
        .get(createdOrder.id).count,
      1
    );

    // A later delivery of the original paid state is valid but cannot undo the
    // terminal refund in either database.
    const latePaid = paidEvent(refunded, { id: 'evt_latepaidafterrefund123', created: created + 120 });
    assert.equal((await sendEvent(fx, latePaid)).status, 200);
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(createdOrder.id).payment_status,
      'refunded'
    );
    assert.equal(
      fx.analytics.raw.prepare('SELECT payment_status FROM payment_orders WHERE stripe_session_id = ?')
        .get(createdOrder.stripe_session_id).payment_status,
      'refunded'
    );
  } finally { fx.close(); }
});

test('partial, mismatched and unlinked refunds never change or guess a portal order', async () => {
  const fx = await fixture();
  try {
    const { order: createdOrder } = await createOrderWithCheckout(fx, 'consultation');
    const created = Math.floor(Date.now() / 1000);
    assert.equal((await sendEvent(fx, paidEvent(createdOrder, {
      id: 'evt_refundvalidationpaid123', created
    }))).status, 200);
    const order = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE id = ?').get(createdOrder.id);

    const rejected = [
      [refundEvent(order, {
        id: 'evt_partialrefund123', chargeId: 'ch_partialrefund123', created: created + 10,
        refunded: false, amountRefunded: order.amount_total - 100
      }), 'stripe_partial_refund_not_supported'],
      [refundEvent(order, {
        id: 'evt_refundamountmismatch123', chargeId: 'ch_refundamountmismatch123', created: created + 20,
        amount: order.amount_total + 100, amountRefunded: order.amount_total + 100
      }), 'stripe_refund_amount_mismatch'],
      [refundEvent(order, {
        id: 'evt_refundcurrencymismatch123', chargeId: 'ch_refundcurrencymismatch123', created: created + 30,
        currency: 'eur'
      }), 'stripe_refund_amount_mismatch'],
      [refundEvent(order, {
        id: 'evt_refundlivemismatch123', chargeId: 'ch_refundlivemismatch123', created: created + 40,
        liveMode: true
      }), 'stripe_refund_livemode_mismatch']
    ];
    for (const [event, error] of rejected) {
      const response = await sendEvent(fx, event);
      assert.equal(response.status, 200, event.id);
      assert.equal((await response.json()).ignored, error, event.id);
      const record = fx.portal.raw.prepare(`
        SELECT processing_status, error_code FROM portal_stripe_events WHERE event_id = ?
      `).get(event.id);
      assert.equal(record.processing_status, 'rejected');
      assert.equal(record.error_code, error);
    }

    const unlinked = refundEvent(order, {
      id: 'evt_refundunlinked123', chargeId: 'ch_refundunlinked123', created: created + 50,
      paymentIntent: 'pi_unlinkedrefund123'
    });
    const unlinkedResponse = await sendEvent(fx, unlinked);
    assert.equal(unlinkedResponse.status, 503);
    assert.equal((await unlinkedResponse.json()).error, 'portal_workflow_failed');
    assert.equal(
      fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_stripe_events WHERE event_id = ?')
        .get(unlinked.id).count,
      0
    );
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'paid'
    );
    assert.equal(
      fx.analytics.raw.prepare('SELECT payment_status FROM payment_orders WHERE stripe_session_id = ?')
        .get(order.stripe_session_id).payment_status,
      'paid'
    );
    assert.equal(
      fx.portal.raw.prepare("SELECT COUNT(*) AS count FROM portal_audit_events WHERE order_id = ? AND event_type = 'stripe_payment_refunded'")
        .get(order.id).count,
      0
    );
  } finally { fx.close(); }
});

test('different event IDs use the current database row during a deterministic stale-snapshot interleaving', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't1');
    serializeBatches(fx.portal);
    serializeBatches(fx.analytics);
    forceSharedOrderSnapshotThenPaidWriteFirst(fx.portal);
    const created = Math.floor(Date.now() / 1000);
    const expired = paidEvent(order, {
      id: 'evt_concurrentexpired123', type: 'checkout.session.expired', created: created + 60
    });
    const paid = paidEvent(order, { id: 'evt_concurrentpaid123', created });

    // The expired handler reads first and waits. The paid handler then reads the
    // same pending snapshot, writes paid, and only then permits expired to write.
    const [expiredResponse, paidResponse] = await Promise.all([
      sendEvent(fx, expired),
      sendEvent(fx, paid)
    ]);
    assert.equal(expiredResponse.status, 200);
    assert.equal(paidResponse.status, 200);
    const finalOrder = fx.portal.raw.prepare('SELECT * FROM portal_orders WHERE id = ?').get(order.id);
    assert.equal(finalOrder.payment_status, 'paid');
    assert.equal(finalOrder.fulfillment_status, 'awaiting_intake');
    assert.equal(finalOrder.last_stripe_event_created, created + 60);
    assert.equal(finalOrder.last_stripe_event_id, expired.id);
    assert.equal(
      fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases WHERE payment_order_id = ?').get(order.id).count,
      1
    );
    assert.equal(
      fx.portal.raw.prepare("SELECT COUNT(*) AS count FROM portal_stripe_events WHERE processing_status = 'processed'").get().count,
      2
    );
    assert.equal(
      fx.analytics.raw.prepare('SELECT payment_status FROM payment_orders WHERE stripe_session_id = ?').get(order.stripe_session_id).payment_status,
      'paid'
    );
  } finally { fx.close(); }
});

test('a valid pre-portal Checkout payment is mirrored and alerted without guessing an owner', async () => {
  const fx = await fixture();
  try {
    const delivered = [];
    fx.env.EMAIL_FROM = 'ZimonAI <notifications@zimonai.com>';
    fx.env.EMAIL_TRANSPORT = {
      async sendTransactionalEmail(message) {
        delivered.push(message);
        return { id: `provider-legacy-${delivered.length}`, provider: 'test' };
      }
    };
    const event = {
      id: 'evt_legacypaid123', type: 'checkout.session.completed', created: Math.floor(Date.now() / 1000),
      livemode: false,
      data: {
        object: {
          object: 'checkout.session', id: 'cs_test_legacypaid123', mode: 'payment', livemode: false,
          client_reference_id: 'PREPORTAL-REFERENCE', payment_status: 'paid',
          payment_intent: 'pi_test_legacypaid123', amount_total: 14900, currency: 'usd',
          customer_details: { email: 'legacy@example.com', name: 'Legacy Buyer', phone: '', tax_ids: [] },
          metadata: { product_key: 't1', quantity: '1', locale: 'en', reference: 'PREPORTAL-REFERENCE' }
        }
      }
    };
    const first = await sendEvent(fx, event);
    assert.equal(first.status, 200);
    assert.equal((await first.json()).legacyUnlinked, true);
    const replay = await sendEvent(fx, event);
    assert.equal(replay.status, 200);
    assert.equal((await replay.json()).legacyUnlinked, true);

    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders').get().count, 0);
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
    assert.equal(
      fx.analytics.raw.prepare('SELECT payment_status FROM payment_orders WHERE stripe_session_id = ?').get(event.data.object.id).payment_status,
      'paid'
    );
    assert.equal(fx.analytics.raw.prepare('SELECT COUNT(*) AS count FROM stripe_events WHERE event_id = ?').get(event.id).count, 1);
    const notices = fx.portal.raw.prepare(`
      SELECT notification_type, payload_json FROM notification_outbox
      WHERE dedupe_key LIKE 'admin_legacy_payment:%' ORDER BY recipient_email
    `).all();
    assert.equal(notices.length, 2);
    assert.equal(notices.every((row) => row.notification_type === 'admin_legacy_payment_detected'), true);
    assert.equal(JSON.parse(notices[0].payload_json).sessionId, event.data.object.id);
    assert.equal(delivered.length, 2);
    assert.equal(delivered.every((message) => message.subject.includes(event.data.object.id)), true);
    assert.equal(delivered.every((message) => message.text.includes('未自動指定客戶或建立案件')), true);

    const tampered = structuredClone(event);
    tampered.id = 'evt_legacytampered123';
    tampered.data.object.id = 'cs_test_legacytampered123';
    tampered.data.object.amount_total = 1;
    const rejected = await sendEvent(fx, tampered);
    assert.equal(rejected.status, 200);
    assert.equal((await rejected.json()).ignored, 'legacy_amount_mismatch');
    assert.equal(fx.analytics.raw.prepare('SELECT COUNT(*) AS count FROM payment_orders').get().count, 1);
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM notification_outbox').get().count, 2);

    const missingPortalOrder = structuredClone(event);
    missingPortalOrder.id = 'evt_missingportalorder123';
    missingPortalOrder.data.object.id = 'cs_test_missingportalorder123';
    missingPortalOrder.data.object.metadata.portal_order_id = 'ord_missingportalorder123';
    missingPortalOrder.data.object.metadata.portal_user_id = fx.owner.user.id;
    const retryable = await sendEvent(fx, missingPortalOrder);
    assert.equal(retryable.status, 503);
    assert.equal((await retryable.json()).error, 'portal_workflow_failed');
    assert.equal(fx.analytics.raw.prepare('SELECT COUNT(*) AS count FROM payment_orders').get().count, 1);
  } finally { fx.close(); }
});

test('a stale webhook processing lease is reclaimed without duplicate fulfillment', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't1');
    const event = paidEvent(order, { id: 'evt_stalelease123' });
    const stale = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    fx.portal.raw.prepare(`
      INSERT INTO portal_stripe_events
        (event_id, event_type, stripe_session_id, portal_order_id, event_created,
         processing_status, error_code, received_at, updated_at, processed_at)
      VALUES (?, ?, ?, ?, ?, 'processing', '', ?, ?, '')
    `).run(event.id, event.type, order.stripe_session_id, order.id, event.created, stale, stale);

    const recovered = await sendEvent(fx, event);
    assert.equal(recovered.status, 200);
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'paid'
    );
    assert.equal(
      fx.portal.raw.prepare('SELECT processing_status FROM portal_stripe_events WHERE event_id = ?').get(event.id).processing_status,
      'processed'
    );
    assert.equal(
      fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases WHERE payment_order_id = ?').get(order.id).count,
      1
    );

    const replay = await sendEvent(fx, event);
    assert.equal(replay.status, 200);
    assert.equal((await replay.json()).replayed, true);
    assert.equal(
      fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases WHERE payment_order_id = ?').get(order.id).count,
      1
    );
  } finally { fx.close(); }
});

test('an active webhook processing lease is not acknowledged as a completed replay', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 't1');
    const event = paidEvent(order, { id: 'evt_activelease123' });
    const timestamp = new Date().toISOString();
    fx.portal.raw.prepare(`
      INSERT INTO portal_stripe_events
        (event_id, event_type, stripe_session_id, portal_order_id, event_created,
         processing_status, error_code, received_at, updated_at, processed_at)
      VALUES (?, ?, ?, ?, ?, 'processing', '', ?, ?, '')
    `).run(event.id, event.type, order.stripe_session_id, order.id, event.created, timestamp, timestamp);

    const response = await sendEvent(fx, event);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, 'portal_workflow_failed');
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'pending'
    );
    assert.equal(
      fx.portal.raw.prepare('SELECT processing_status FROM portal_stripe_events WHERE event_id = ?').get(event.id).processing_status,
      'processing'
    );
  } finally { fx.close(); }
});

test('paid consultation creates an order but no verification case', async () => {
  const fx = await fixture();
  try {
    const { order } = await createOrderWithCheckout(fx, 'consultation');
    assert.equal((await sendEvent(fx, paidEvent(order, { id: 'evt_consultation123' }))).status, 200);
    assert.equal(
      fx.portal.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'paid'
    );
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
  } finally { fx.close(); }
});

test('paid balance and consultation extension attach to owned work without creating cases', async () => {
  const fx = await fixture();
  try {
    const now = new Date().toISOString();
    fx.portal.raw.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, source, product_key, product_description, amount_total, currency,
         quantity, service_reference, payment_status, fulfillment_status, paid_at, created_at, updated_at)
      VALUES (?, ?, ?, 'manual', 'consultation', 'Consultation', 9900, 'usd', 1, '', 'paid', 'reviewing', ?, ?, ?)
    `).run('ord_parent_service', 'ORD-2026-PARENTSERVICE', fx.owner.user.id, now, now, now);

    const balance = await createOrderWithCheckout(
      fx, 'balance', fx.owner, { reference: 'ORD-2026-PARENTSERVICE' }, 'cs_test_balancenocase123'
    );
    const extension = await createOrderWithCheckout(
      fx, 'consultation-extension', fx.owner, { reference: 'ORD-2026-PARENTSERVICE' }, 'cs_test_extensionnocase123'
    );
    assert.equal((await sendEvent(fx, paidEvent(balance.order, { id: 'evt_balancenocase123' }))).status, 200);
    assert.equal((await sendEvent(fx, paidEvent(extension.order, { id: 'evt_extensionnocase123' }))).status, 200);
    assert.equal(fx.portal.raw.prepare('SELECT COUNT(*) AS count FROM portal_cases').get().count, 0);
    assert.equal(fx.portal.raw.prepare("SELECT COUNT(*) AS count FROM portal_orders WHERE payment_status = 'paid'").get().count, 3);
  } finally { fx.close(); }
});

test('webhook enforces the actual one-megabyte body limit before parsing', async () => {
  const fx = await fixture();
  try {
    const oversized = new Uint8Array(1024 * 1024 + 1);
    const response = await stripeWebhook({
      request: new Request(`${origin}/api/stripe-webhook`, {
        method: 'POST', headers: { 'Stripe-Signature': 't=1,v1=invalid' }, body: oversized
      }),
      env: fx.env
    });
    assert.equal(response.status, 413);
  } finally { fx.close(); }
});

test('portal database failure returns non-2xx so Stripe can retry', async () => {
  const fx = await fixture();
  try {
    const raw = JSON.stringify({
      id: 'evt_portalfailure123', type: 'checkout.session.completed', created: Math.floor(Date.now() / 1000),
      livemode: false,
      data: { object: { object: 'checkout.session', id: 'cs_test_portalfailure123' } }
    });
    const response = await stripeWebhook({
      request: new Request(`${origin}/api/stripe-webhook`, {
        method: 'POST',
        headers: { 'Stripe-Signature': await stripeSignature(raw) },
        body: raw
      }),
      env: { ...fx.env, PORTAL_DB: { prepare() { throw new Error('database_unavailable'); } } }
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, 'portal_workflow_failed');
  } finally { fx.close(); }
});

test('method fallback remains closed', async () => {
  assert.equal((await onRequest()).status, 405);
});
