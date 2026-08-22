import assert from 'node:assert/strict';
import test from 'node:test';
import { issuePortalSession, upsertVerifiedIdentity } from '../functions/_lib/auth.js';
import { onRequestGet as adminCases, onRequestPost as adminCreateCase } from '../functions/api/admin/cases.js';
import { onRequestGet as adminCaseDetail, onRequestPatch as adminUpdateCase } from '../functions/api/admin/cases/[id].js';
import { onRequestGet as adminCustomers } from '../functions/api/admin/customers.js';
import { onRequestGet as adminNotifications, onRequestPost as adminRetryNotifications } from '../functions/api/admin/notifications.js';
import { onRequestGet as adminOrders, onRequestPost as adminCreateOrder } from '../functions/api/admin/orders.js';
import { onRequestPatch as adminUpdateOrder } from '../functions/api/admin/orders/[id].js';
import {
  onRequestGet as customerCaseDetail,
  onRequestPatch as customerUpdateCase
} from '../functions/api/portal/cases/[id].js';
import { onRequestGet as customerOrders } from '../functions/api/portal/orders.js';
import { onRequestPatch as customerUpdateOrder } from '../functions/api/portal/orders/[id].js';
import { queueNotification } from '../functions/_lib/notifications.js';
import { createAdminCase } from '../functions/_lib/workflow.js';
import { SqliteD1 } from './helpers/sqlite-d1.mjs';

const origin = 'http://127.0.0.1:8788';
const sessionSecret = 'admin-workflow-session-secret-is-longer-than-thirty-two';

async function account(db, env, email, subject, locale = 'en') {
  const user = await upsertVerifiedIdentity(env, {
    provider: 'email', providerSubject: subject, email, displayName: subject, locale
  });
  const session = await issuePortalSession(new Request(`${origin}/portal/`), env, user.id, {
    provider: 'email',
    providerSubject: subject
  });
  return { user, session, cookie: session.cookie.split(';', 1)[0] };
}

async function fixture() {
  const db = new SqliteD1();
  const env = {
    PORTAL_DB: db,
    PORTAL_AUTH_ENABLED: 'true',
    PORTAL_SESSION_SECRET: sessionSecret,
    PORTAL_ADMIN_EMAILS: 'admin@example.com',
    PORTAL_ADMIN_NOTIFICATION_EMAILS: 'admin@example.com, backup@example.com',
    ALLOW_LOCAL_PORTAL: 'true'
  };
  const admin = await account(db, env, 'admin@example.com', 'admin-email-subject', 'zh-tw');
  const client = await account(db, env, 'client@example.com', 'client-email-subject');
  const other = await account(db, env, 'other@example.com', 'other-email-subject');
  return { db, env, admin, client, other, close() { db.close(); } };
}

function requestFor(accountInfo, path, { method = 'GET', payload, csrf = accountInfo?.session.csrfToken } = {}) {
  const headers = {};
  if (accountInfo) headers.Cookie = accountInfo.cookie;
  if (method !== 'GET') {
    headers.Origin = origin;
    headers['Content-Type'] = 'application/json';
    if (csrf !== null) headers['X-CSRF-Token'] = csrf;
  }
  return new Request(`${origin}${path}`, {
    method, headers, ...(payload === undefined ? {} : { body: JSON.stringify(payload) })
  });
}

async function invokeWithWait(handler, context) {
  const waits = [];
  const response = await handler({ ...context, waitUntil(promise) { waits.push(promise); } });
  await Promise.allSettled(waits);
  return response;
}

test('admin APIs require a persisted exact admin identity, not a forged role', async () => {
  const fx = await fixture();
  try {
    const clientDenied = await adminCases({
      request: requestFor(fx.client, '/api/admin/cases'), env: fx.env
    });
    assert.equal(clientDenied.status, 403);

    fx.db.raw.prepare("UPDATE portal_users SET role = 'admin' WHERE id = ?").run(fx.client.user.id);
    const forgedDenied = await adminCases({
      request: requestFor(fx.client, '/api/admin/cases'), env: fx.env
    });
    assert.equal(forgedDenied.status, 403);

    const allowed = await adminCases({
      request: requestFor(fx.admin, '/api/admin/cases'), env: fx.env
    });
    assert.equal(allowed.status, 200);
  } finally { fx.close(); }
});

test('admin can create a direct case for an existing verified customer', async () => {
  const fx = await fixture();
  try {
    const response = await adminCreateCase({
      request: requestFor(fx.admin, '/api/admin/cases', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          locale: 'en',
          tier: 't2',
          supplierName: 'Existing Customer Supplier',
          productCategory: 'power adapter',
          decisionContext: 'Contract review'
        }
      }),
      env: fx.env
    });
    assert.equal(response.status, 201);
    const created = (await response.json()).case;
    assert.equal(created.pendingInvitation, false);
    const row = fx.db.raw.prepare('SELECT * FROM portal_cases WHERE id = ?').get(created.caseId);
    assert.equal(row.owner_user_id, fx.client.user.id);
    assert.equal(row.case_source, 'admin');
    assert.equal(row.status, 'submitted');
    assert.equal(
      fx.db.raw.prepare("SELECT COUNT(*) AS count FROM portal_audit_events WHERE event_type = 'admin_case_created'").get().count,
      1
    );
  } finally { fx.close(); }
});

test('customer invitations expire after fourteen days, renew while active and are recreated after expiry', async () => {
  const fx = await fixture();
  try {
    const actor = { user_id: fx.admin.user.id };
    const payload = {
      customerEmail: 'invite-lifecycle@example.com',
      locale: 'en',
      tier: 't1',
      supplierName: 'Invite Lifecycle Supplier',
      productCategory: 'charger',
      decisionContext: 'Verify before deposit'
    };
    const firstNow = new Date('2026-08-22T00:00:00.000Z');
    await createAdminCase(fx.env, actor, payload, firstNow);
    const firstInvite = fx.db.raw.prepare(`
      SELECT id, status, expires_at FROM portal_customer_invites
      WHERE email_normalized = ? AND status = 'pending'
    `).get(payload.customerEmail);
    assert.equal(firstInvite.expires_at, '2026-09-05T00:00:00.000Z');

    const renewalNow = new Date('2026-08-23T00:00:00.000Z');
    await createAdminCase(fx.env, actor, payload, renewalNow);
    const renewedInvite = fx.db.raw.prepare(`
      SELECT id, expires_at FROM portal_customer_invites
      WHERE email_normalized = ? AND status = 'pending'
    `).get(payload.customerEmail);
    assert.equal(renewedInvite.id, firstInvite.id);
    assert.equal(renewedInvite.expires_at, '2026-09-06T00:00:00.000Z');
    assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM portal_customer_invites').get().count, 1);

    const recreateNow = new Date('2026-09-07T00:00:00.000Z');
    await createAdminCase(fx.env, actor, payload, recreateNow);
    const invitations = fx.db.raw.prepare(`
      SELECT id, status, expires_at FROM portal_customer_invites
      WHERE email_normalized = ? ORDER BY created_at ASC
    `).all(payload.customerEmail);
    assert.equal(invitations.length, 2);
    assert.equal(invitations[0].id, firstInvite.id);
    assert.equal(invitations[0].status, 'revoked');
    assert.equal(invitations[1].status, 'pending');
    assert.equal(invitations[1].expires_at, '2026-09-21T00:00:00.000Z');
    assert.equal(
      fx.db.raw.prepare("SELECT COUNT(*) AS count FROM portal_invited_cases WHERE status = 'revoked'").get().count,
      2
    );
    assert.equal(
      fx.db.raw.prepare("SELECT COUNT(*) AS count FROM portal_invited_cases WHERE status = 'pending'").get().count,
      1
    );
  } finally { fx.close(); }
});

test('pending-email case, manual order and payment confirmation remain separate audited mutations', async () => {
  const fx = await fixture();
  try {
    const createCaseResponse = await invokeWithWait(adminCreateCase, {
      request: requestFor(fx.admin, '/api/admin/cases', {
        method: 'POST',
        payload: { customerEmail: 'pending@example.com', locale: 'zh-tw', tier: 't1' }
      }),
      env: fx.env
    });
    assert.equal(createCaseResponse.status, 201);
    const createdCase = (await createCaseResponse.json()).case;
    assert.equal(createdCase.pendingInvitation, true);
    assert.equal(fx.db.raw.prepare("SELECT COUNT(*) AS count FROM portal_users WHERE email_normalized = 'pending@example.com'").get().count, 0);
    assert.equal(fx.db.raw.prepare('SELECT case_status FROM portal_invited_cases WHERE case_id = ?').get(createdCase.caseId).case_status, 'awaiting_client');

    const noteResponse = await adminUpdateCase({
      request: requestFor(fx.admin, `/api/admin/cases/${createdCase.caseId}`, {
        method: 'PATCH', payload: { internalNote: 'Private: confirm payment source before work.' }
      }),
      env: fx.env,
      params: { id: createdCase.caseId }
    });
    assert.equal(noteResponse.status, 200);
    assert.equal((await noteResponse.json()).case.internalNote, 'Private: confirm payment source before work.');

    const createOrderResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          caseId: createdCase.caseId,
          product: 't1',
          description: 'T1 manual payment record',
          amountTotal: 14900,
          currency: 'usd',
          quantity: 1,
          paymentMethodNote: 'Bank transfer pending'
        }
      }),
      env: fx.env
    });
    assert.equal(createOrderResponse.status, 201);
    const createdOrder = (await createOrderResponse.json()).order;
    assert.equal(createdOrder.paymentStatus, 'unpaid');
    assert.equal(fx.db.raw.prepare('SELECT order_payment_status FROM portal_invited_cases WHERE order_id = ?').get(createdOrder.id).order_payment_status, 'unpaid');

    const paidResponse = await invokeWithWait(adminUpdateOrder, {
      request: requestFor(fx.admin, `/api/admin/orders/${createdOrder.id}`, {
        method: 'PATCH',
        payload: { paymentStatus: 'paid', fulfillmentStatus: 'awaiting_intake', paymentMethodNote: 'Transfer verified' }
      }),
      env: fx.env,
      params: { id: createdOrder.id }
    });
    assert.equal(paidResponse.status, 200);
    assert.equal((await paidResponse.json()).order.paymentStatus, 'paid');
    assert.equal(fx.db.raw.prepare('SELECT order_payment_status FROM portal_invited_cases WHERE order_id = ?').get(createdOrder.id).order_payment_status, 'paid');
    assert.equal(
      fx.db.raw.prepare("SELECT COUNT(*) AS count FROM portal_audit_events WHERE event_type IN ('admin_invited_case_created', 'admin_invited_case_updated', 'admin_manual_order_created_for_invite', 'admin_invited_order_updated')").get().count,
      4
    );
    assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM notification_outbox').get().count, 4);

    const pendingCustomer = await account(fx.db, fx.env, 'pending@example.com', 'pending-email-subject', 'zh-tw');
    assert.equal(pendingCustomer.user.claimedCases, 1);
    const customerView = await customerCaseDetail({
      request: requestFor(pendingCustomer, `/api/portal/cases/${createdCase.caseId}`),
      env: fx.env,
      params: { id: createdCase.caseId }
    });
    assert.equal(customerView.status, 200);
    const customerCase = (await customerView.json()).case;
    assert.equal(Object.hasOwn(customerCase, 'internalNote'), false);
    assert.equal(customerCase.status, 'awaiting_client');
    assert.equal(
      fx.db.raw.prepare('SELECT note FROM portal_case_internal_notes WHERE case_id = ?').get(createdCase.caseId).note,
      'Private: confirm payment source before work.'
    );
    const orderList = await customerOrders({
      request: requestFor(pendingCustomer, '/api/portal/orders'), env: fx.env
    });
    assert.equal(orderList.status, 200);
    assert.equal((await orderList.json()).orders[0].paymentStatus, 'paid');

    const otherView = await customerCaseDetail({
      request: requestFor(fx.other, `/api/portal/cases/${createdCase.caseId}`),
      env: fx.env,
      params: { id: createdCase.caseId }
    });
    assert.equal(otherView.status, 404);
  } finally { fx.close(); }
});

test('manual T1/T2 order requires a case and Stripe payment cannot be manually overridden', async () => {
  const fx = await fixture();
  try {
    const missingCase = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          product: 't1', description: 'T1', amountTotal: 14900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    assert.equal(missingCase.status, 400);

    const unregisteredConsultation = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerEmail: 'not-registered@example.com', product: 'consultation',
          description: 'Consultation', amountTotal: 9900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    assert.equal(unregisteredConsultation.status, 400);
    assert.equal((await unregisteredConsultation.json()).error, 'verified_customer_or_invited_case_required');

    const now = new Date().toISOString();
    fx.db.raw.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, source, product_key, product_description, amount_total, currency,
         quantity, stripe_session_id, payment_status, fulfillment_status, created_at, updated_at)
      VALUES ('ord_stripe_owned', 'ORD-2026-STRIPE', ?, 'stripe', 'consultation', 'Consultation', 9900, 'usd',
              1, 'cs_test_admincannotchange', 'pending', 'awaiting_payment', ?, ?)
    `).run(fx.client.user.id, now, now);
    const forbidden = await adminUpdateOrder({
      request: requestFor(fx.admin, '/api/admin/orders/ord_stripe_owned', {
        method: 'PATCH', payload: { paymentStatus: 'paid' }
      }),
      env: fx.env,
      params: { id: 'ord_stripe_owned' }
    });
    assert.equal(forbidden.status, 409);
    assert.equal(fx.db.raw.prepare("SELECT payment_status FROM portal_orders WHERE id = 'ord_stripe_owned'").get().payment_status, 'pending');
  } finally { fx.close(); }
});

test('waiving a manual order is audited but never emits a paid receipt or paid-order alert', async () => {
  const fx = await fixture();
  try {
    const delivered = [];
    fx.env.EMAIL_FROM = 'ZimonAI <notifications@zimonai.com>';
    fx.env.EMAIL_TRANSPORT = {
      async sendTransactionalEmail(message) {
        delivered.push(message);
        return { id: `provider-waived-${delivered.length}`, provider: 'test' };
      }
    };
    const createdResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          product: 'consultation',
          description: 'Waived consultation',
          amountTotal: 9900,
          currency: 'usd',
          quantity: 1
        }
      }),
      env: fx.env
    });
    assert.equal(createdResponse.status, 201);
    const order = (await createdResponse.json()).order;

    const waivedResponse = await invokeWithWait(adminUpdateOrder, {
      request: requestFor(fx.admin, `/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        payload: { paymentStatus: 'waived', fulfillmentStatus: 'reviewing' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal(waivedResponse.status, 200);
    assert.equal((await waivedResponse.json()).order.paymentStatus, 'waived');
    assert.equal(
      fx.db.raw.prepare('SELECT payment_status FROM portal_orders WHERE id = ?').get(order.id).payment_status,
      'waived'
    );
    assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM notification_outbox').get().count, 0);
    assert.equal(delivered.length, 0);
    const audit = fx.db.raw.prepare(`
      SELECT detail_json FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'admin_order_updated'
      ORDER BY created_at DESC LIMIT 1
    `).get(order.id);
    assert.equal(JSON.parse(audit.detail_json).paymentStatus, 'waived');
  } finally { fx.close(); }
});

test('admin case updates reject unknown states instead of silently keeping the old state', async () => {
  const fx = await fixture();
  try {
    const createResponse = await adminCreateCase({
      request: requestFor(fx.admin, '/api/admin/cases', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id, tier: 't1', supplierName: 'Supplier',
          productCategory: 'charger', decisionContext: 'Deposit decision'
        }
      }),
      env: fx.env
    });
    const id = (await createResponse.json()).case.caseId;
    const invalid = await adminUpdateCase({
      request: requestFor(fx.admin, `/api/admin/cases/${id}`, {
        method: 'PATCH', payload: { status: 'finished' }
      }),
      env: fx.env,
      params: { id }
    });
    assert.equal(invalid.status, 400);
    assert.equal(fx.db.raw.prepare('SELECT status FROM portal_cases WHERE id = ?').get(id).status, 'submitted');
  } finally { fx.close(); }
});

test('customer intake PATCH is allowed only while awaiting client and closes its status race', async () => {
  const fx = await fixture();
  try {
    const pending = await createAdminCase(fx.env, { user_id: fx.admin.user.id }, {
      customerUserId: fx.client.user.id,
      locale: 'en',
      tier: 't1'
    });
    const accepted = await customerUpdateCase({
      request: requestFor(fx.client, `/api/portal/cases/${pending.caseId}`, {
        method: 'PATCH',
        payload: {
          supplierName: 'Client supplied name', productCategory: 'charger',
          decisionContext: 'Decide whether to pay a deposit'
        }
      }),
      env: fx.env,
      params: { id: pending.caseId }
    });
    assert.equal(accepted.status, 200);
    assert.equal((await accepted.json()).case.status, 'submitted');
    const auditCount = fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE case_id = ? AND event_type = 'case_intake_updated'
    `).get(pending.caseId).count;
    assert.equal(auditCount, 1);

    for (const status of ['submitted', 'reviewing', 'scoped', 'in_progress', 'delivered', 'closed']) {
      fx.db.raw.prepare(`
        UPDATE portal_cases SET status = ?, supplier_name = 'Frozen baseline' WHERE id = ?
      `).run(status, pending.caseId);
      const locked = await customerUpdateCase({
        request: requestFor(fx.client, `/api/portal/cases/${pending.caseId}`, {
          method: 'PATCH', payload: { supplierName: `Overwrite from ${status}` }
        }),
        env: fx.env,
        params: { id: pending.caseId }
      });
      assert.equal(locked.status, 409, status);
      assert.equal((await locked.json()).error, 'case_intake_locked');
      assert.equal(
        fx.db.raw.prepare('SELECT supplier_name FROM portal_cases WHERE id = ?').get(pending.caseId).supplier_name,
        'Frozen baseline'
      );
    }
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE case_id = ? AND event_type = 'case_intake_updated'
    `).get(pending.caseId).count, 1);

    const raced = await createAdminCase(fx.env, { user_id: fx.admin.user.id }, {
      customerUserId: fx.client.user.id, locale: 'en', tier: 't1'
    });
    const originalBatch = fx.db.batch.bind(fx.db);
    let flipped = false;
    fx.db.batch = async (statements) => {
      if (!flipped) {
        flipped = true;
        fx.db.raw.prepare("UPDATE portal_cases SET status = 'reviewing' WHERE id = ?").run(raced.caseId);
      }
      return originalBatch(statements);
    };
    const lostRace = await customerUpdateCase({
      request: requestFor(fx.client, `/api/portal/cases/${raced.caseId}`, {
        method: 'PATCH', payload: { supplierName: 'Too late' }
      }),
      env: fx.env,
      params: { id: raced.caseId }
    });
    assert.equal(lostRace.status, 409);
    assert.equal(fx.db.raw.prepare('SELECT supplier_name FROM portal_cases WHERE id = ?').get(raced.caseId).supplier_name, '');
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE case_id = ? AND event_type = 'case_intake_updated'
    `).get(raced.caseId).count, 0);
  } finally { fx.close(); }
});

test('admin workbench lists cases, orders and verified or invited customers', async () => {
  const fx = await fixture();
  try {
    const casesResponse = await adminCaseDetail({
      request: requestFor(fx.admin, '/api/admin/cases/case_missing123'),
      env: fx.env,
      params: { id: 'case_missing123' }
    });
    assert.equal(casesResponse.status, 404);
    assert.equal((await adminOrders({ request: requestFor(fx.admin, '/api/admin/orders'), env: fx.env })).status, 200);
    const customersResponse = await adminCustomers({
      request: requestFor(fx.admin, '/api/admin/customers'), env: fx.env
    });
    assert.equal(customersResponse.status, 200);
    const customers = (await customersResponse.json()).customers;
    assert.equal(customers.some((item) => item.email === 'client@example.com'), true);
  } finally { fx.close(); }
});

test('failed email is visible and an exact admin can retry it without silent success', async () => {
  const fx = await fixture();
  try {
    await queueNotification(fx.env, {
      type: 'customer_order_paid',
      to: 'client@example.com',
      locale: 'en',
      payload: { orderReference: 'ORD-RETRY', amountTotal: 9900, currency: 'usd' },
      dedupeKey: 'retry-test'
    });
    const row = fx.db.raw.prepare('SELECT id FROM notification_outbox WHERE dedupe_key = ?').get('retry-test');
    fx.db.raw.prepare(`
      UPDATE notification_outbox
      SET status = 'failed', attempts = 1, available_at = '2099-01-01T00:00:00.000Z', last_error = 'provider_down'
      WHERE id = ?
    `).run(row.id);

    const denied = await adminNotifications({
      request: requestFor(fx.client, '/api/admin/notifications'), env: fx.env
    });
    assert.equal(denied.status, 403);

    const visible = await adminNotifications({
      request: requestFor(fx.admin, '/api/admin/notifications'), env: fx.env
    });
    assert.equal(visible.status, 200);
    assert.equal((await visible.json()).notifications[0].lastError, 'provider_down');

    const unconfiguredRetry = await adminRetryNotifications({
      request: requestFor(fx.admin, '/api/admin/notifications', {
        method: 'POST', payload: { notificationId: row.id }
      }),
      env: fx.env
    });
    assert.equal(unconfiguredRetry.status, 200);
    assert.deepEqual((await unconfiguredRetry.json()).delivery, { configured: false, sent: 0, failed: 0 });
    assert.equal(fx.db.raw.prepare('SELECT status FROM notification_outbox WHERE id = ?').get(row.id).status, 'failed');

    fx.env.EMAIL_FROM = 'ZimonAI <simonlo@zimonai.com>';
    fx.env.EMAIL_TRANSPORT = {
      async sendTransactionalEmail(message) {
        assert.equal(message.to, 'client@example.com');
        assert.equal(message.from, 'ZimonAI <simonlo@zimonai.com>');
        return { id: 'provider-message-123', provider: 'test' };
      }
    };
    fx.db.raw.prepare("UPDATE notification_outbox SET status = 'failed', attempts = 6, last_error = 'retry' WHERE id = ?").run(row.id);
    const delivered = await adminRetryNotifications({
      request: requestFor(fx.admin, '/api/admin/notifications', {
        method: 'POST', payload: { notificationId: row.id }
      }),
      env: fx.env
    });
    assert.equal(delivered.status, 200);
    assert.equal((await delivered.json()).delivery.sent, 1);
    const finalRow = fx.db.raw.prepare('SELECT status, provider_message_id FROM notification_outbox WHERE id = ?').get(row.id);
    assert.equal(finalRow.status, 'sent');
    assert.equal(finalRow.provider_message_id, 'provider-message-123');
  } finally { fx.close(); }
});

test('customers can safely hide, restore and cancel their own unpaid order without deleting its ledger row', async () => {
  const fx = await fixture();
  try {
    const createdResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          product: 'consultation', description: 'Lifecycle consultation',
          amountTotal: 9900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    const order = (await createdResponse.json()).order;

    const hide = () => customerUpdateOrder({
      request: requestFor(fx.client, `/api/portal/orders/${order.id}`, {
        method: 'PATCH', payload: { action: 'hide' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal((await hide()).status, 200);
    assert.equal((await hide()).status, 200);
    assert.equal((await (await customerOrders({
      request: requestFor(fx.client, '/api/portal/orders'), env: fx.env
    })).json()).orders.some((item) => item.id === order.id), false);
    const hidden = (await (await customerOrders({
      request: requestFor(fx.client, '/api/portal/orders?includeHidden=1'), env: fx.env
    })).json()).orders.find((item) => item.id === order.id);
    assert.ok(hidden.customerHiddenAt);
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'customer_order_hidden'
    `).get(order.id).count, 1);

    const otherRestore = await customerUpdateOrder({
      request: requestFor(fx.other, `/api/portal/orders/${order.id}`, {
        method: 'PATCH', payload: { action: 'restore' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal(otherRestore.status, 404);
    const restored = await customerUpdateOrder({
      request: requestFor(fx.client, `/api/portal/orders/${order.id}`, {
        method: 'PATCH', payload: { action: 'restore' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal(restored.status, 200);
    assert.equal((await restored.json()).order.customerHiddenAt, '');
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'customer_order_restored'
    `).get(order.id).count, 1);

    // Operational status and payment status are separate. An accidentally
    // opened, still-unpaid order must remain cancellable even if its workflow
    // was already marked closed.
    fx.db.raw.prepare(`
      UPDATE portal_orders SET fulfillment_status = 'closed' WHERE id = ?
    `).run(order.id);

    const cancel = () => customerUpdateOrder({
      request: requestFor(fx.client, `/api/portal/orders/${order.id}`, {
        method: 'PATCH', payload: { action: 'cancel' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    const cancelled = await cancel();
    assert.equal(cancelled.status, 200);
    const cancelledOrder = (await cancelled.json()).order;
    assert.equal(cancelledOrder.paymentStatus, 'expired');
    assert.ok(cancelledOrder.cancelledAt);
    assert.equal((await cancel()).status, 200);
    assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders WHERE id = ?').get(order.id).count, 1);
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'customer_order_cancelled'
    `).get(order.id).count, 1);
  } finally { fx.close(); }
});

test('paid, refunded and waived orders cannot be cancelled but may be hidden without ledger deletion', async () => {
  const fx = await fixture();
  try {
    const createdResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          product: 'consultation', description: 'Settled consultation',
          amountTotal: 9900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    const order = (await createdResponse.json()).order;
    for (const paymentStatus of ['paid', 'refunded', 'waived']) {
      fx.db.raw.prepare(`
        UPDATE portal_orders SET payment_status = ?, fulfillment_status = 'reviewing', cancelled_at = '' WHERE id = ?
      `).run(paymentStatus, order.id);
      const denied = await customerUpdateOrder({
        request: requestFor(fx.client, `/api/portal/orders/${order.id}`, {
          method: 'PATCH', payload: { action: 'cancel' }
        }),
        env: fx.env,
        params: { id: order.id }
      });
      assert.equal(denied.status, 409, paymentStatus);
      assert.equal((await denied.json()).error, 'order_not_cancellable');
      assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders WHERE id = ?').get(order.id).count, 1);
    }
    const hidden = await customerUpdateOrder({
      request: requestFor(fx.client, `/api/portal/orders/${order.id}`, {
        method: 'PATCH', payload: { action: 'hide' }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal(hidden.status, 200);
    assert.ok((await hidden.json()).order.customerHiddenAt);
  } finally { fx.close(); }
});

test('admin archive is reversible, excluded by default and audited without deleting paid orders', async () => {
  const fx = await fixture();
  try {
    const createdResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          customerUserId: fx.client.user.id,
          product: 'consultation', description: 'Archived paid consultation',
          amountTotal: 9900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    const order = (await createdResponse.json()).order;
    fx.db.raw.prepare(`
      UPDATE portal_orders SET payment_status = 'paid', fulfillment_status = 'reviewing' WHERE id = ?
    `).run(order.id);
    const action = (value) => adminUpdateOrder({
      request: requestFor(fx.admin, `/api/admin/orders/${order.id}`, {
        method: 'PATCH', payload: { action: value }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    const archived = await action('archive');
    assert.equal(archived.status, 200);
    assert.ok((await archived.json()).order.archivedAt);
    assert.equal((await action('archive')).status, 200);
    const defaultOrders = (await (await adminOrders({
      request: requestFor(fx.admin, '/api/admin/orders'), env: fx.env
    })).json()).orders;
    assert.equal(defaultOrders.some((item) => item.id === order.id), false);
    const allOrders = (await (await adminOrders({
      request: requestFor(fx.admin, '/api/admin/orders?includeArchived=1'), env: fx.env
    })).json()).orders;
    assert.ok(allOrders.find((item) => item.id === order.id)?.archivedAt);
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'admin_order_archived'
    `).get(order.id).count, 1);

    const unarchived = await action('unarchive');
    assert.equal(unarchived.status, 200);
    assert.equal((await unarchived.json()).order.archivedAt, '');
    assert.equal(fx.db.raw.prepare('SELECT COUNT(*) AS count FROM portal_orders WHERE id = ?').get(order.id).count, 1);
    assert.equal(fx.db.raw.prepare(`
      SELECT COUNT(*) AS count FROM portal_audit_events
      WHERE order_id = ? AND event_type = 'admin_order_unarchived'
    `).get(order.id).count, 1);
  } finally { fx.close(); }
});

test('cancelling an open Stripe order expires its Checkout Session before closing the local ledger', async () => {
  const fx = await fixture();
  const previousFetch = globalThis.fetch;
  try {
    fx.env.STRIPE_SECRET_KEY = 'sk_test_lifecycle_regression_only';
    const createdAt = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    fx.db.raw.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, source, product_key, product_description, amount_total,
         currency, quantity, stripe_session_id, payment_status, fulfillment_status, created_at, updated_at)
      VALUES ('ord_stripecancel123', 'ORD-STRIPE-CANCEL', ?, 'stripe', 'consultation', 'Consultation', 9900,
              'usd', 1, 'cs_test_cancel123', 'pending', 'awaiting_payment', ?, ?)
    `).run(fx.client.user.id, createdAt, createdAt);
    const calls = [];
    globalThis.fetch = async (url, options = {}) => {
      calls.push({ url: String(url), method: options.method || 'GET' });
      const expired = String(url).endsWith('/expire');
      return new Response(JSON.stringify(expired
        ? { id: 'cs_test_cancel123', status: 'expired', payment_status: 'unpaid' }
        : { id: 'cs_test_cancel123', status: 'open', payment_status: 'unpaid' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    };
    const response = await customerUpdateOrder({
      request: requestFor(fx.client, '/api/portal/orders/ord_stripecancel123', {
        method: 'PATCH', payload: { action: 'cancel' }
      }),
      env: fx.env,
      params: { id: 'ord_stripecancel123' }
    });
    assert.equal(response.status, 200);
    assert.deepEqual(calls.map((item) => item.method), ['GET', 'POST']);
    assert.equal(fx.db.raw.prepare(`
      SELECT payment_status FROM portal_orders WHERE id = 'ord_stripecancel123'
    `).get().payment_status, 'expired');
  } finally {
    globalThis.fetch = previousFetch;
    fx.close();
  }
});

test('invited manual order cancellation and archive survive verified customer claim', async () => {
  const fx = await fixture();
  try {
    const caseResponse = await adminCreateCase({
      request: requestFor(fx.admin, '/api/admin/cases', {
        method: 'POST',
        payload: { customerEmail: 'lifecycle-invite@example.com', locale: 'en', tier: 't1' }
      }),
      env: fx.env
    });
    const pendingCase = (await caseResponse.json()).case;
    const orderResponse = await adminCreateOrder({
      request: requestFor(fx.admin, '/api/admin/orders', {
        method: 'POST',
        payload: {
          caseId: pendingCase.caseId,
          product: 't1', description: 'Invited lifecycle order',
          amountTotal: 14900, currency: 'usd', quantity: 1
        }
      }),
      env: fx.env
    });
    const order = (await orderResponse.json()).order;
    const action = (value) => adminUpdateOrder({
      request: requestFor(fx.admin, `/api/admin/orders/${order.id}`, {
        method: 'PATCH', payload: { action: value }
      }),
      env: fx.env,
      params: { id: order.id }
    });
    assert.equal((await action('archive')).status, 200);
    const cancelled = await action('cancel');
    assert.equal(cancelled.status, 200);
    assert.equal((await cancelled.json()).order.paymentStatus, 'expired');
    const invited = fx.db.raw.prepare(`
      SELECT order_archived_at, order_cancelled_at FROM portal_invited_cases WHERE order_id = ?
    `).get(order.id);
    assert.ok(invited.order_archived_at);
    assert.ok(invited.order_cancelled_at);

    const customer = await account(fx.db, fx.env, 'lifecycle-invite@example.com', 'lifecycle-invite-subject');
    assert.equal(customer.user.claimedCases, 1);
    const claimed = fx.db.raw.prepare(`
      SELECT payment_status, archived_at, cancelled_at FROM portal_orders WHERE id = ?
    `).get(order.id);
    assert.equal(claimed.payment_status, 'expired');
    assert.ok(claimed.archived_at);
    assert.ok(claimed.cancelled_at);
    const defaultAdmin = (await (await adminOrders({
      request: requestFor(fx.admin, '/api/admin/orders'), env: fx.env
    })).json()).orders;
    assert.equal(defaultAdmin.some((item) => item.id === order.id), false);
    const archivedAdmin = (await (await adminOrders({
      request: requestFor(fx.admin, '/api/admin/orders?includeArchived=1'), env: fx.env
    })).json()).orders.find((item) => item.id === order.id);
    assert.equal(archivedAdmin.paymentStatus, 'expired');
    assert.ok(archivedAdmin.archivedAt);
  } finally { fx.close(); }
});
