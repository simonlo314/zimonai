import { portalDb, randomToken } from '../_lib/auth.js';
import { STRIPE_PRODUCTS, json } from '../_lib/stripe.js';
import { adminNotificationEmails, deliverQueuedNotifications, notificationStatement } from '../_lib/notifications.js';
import { auditStatement, publicReference, workflowId } from '../_lib/workflow.js';

const MAX_WEBHOOK_BYTES = 1024 * 1024;
const STRIPE_EVENT_PROCESSING_LEASE_MS = 5 * 60 * 1000;
const CHECKOUT_EVENTS = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'checkout.session.expired'
]);
const RELEVANT_EVENTS = new Set([...CHECKOUT_EVENTS, 'charge.refunded']);

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function equalHex(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

export async function verifyStripeSignature(rawBody, header, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (!header || !secret) return false;
  const parts = header.split(',').map((part) => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!/^\d{10,}$/.test(String(timestamp || '')) || !signatures.length) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = bytesToHex(digest);
  return signatures.some((signature) => /^[a-f0-9]{64}$/.test(signature) && equalHex(signature, expected));
}

async function readBoundedText(request, maxBytes = MAX_WEBHOOK_BYTES) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (!Number.isFinite(declared) || declared < 0 || declared > maxBytes) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      try { await reader.cancel('request_too_large'); } catch { /* already bounded */ }
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function eventPaymentStatus(eventType, session) {
  if (eventType === 'checkout.session.async_payment_succeeded') return 'paid';
  if (eventType === 'checkout.session.async_payment_failed') return 'failed';
  if (eventType === 'checkout.session.expired') return 'expired';
  return session.payment_status === 'paid' ? 'paid' : 'unpaid';
}

export function nextPaymentState(current, incoming, incomingCreated, lastCreated) {
  if (['refunded', 'waived'].includes(current)) return current;
  if (incoming === 'paid') return 'paid';
  if (current === 'paid') return 'paid';
  if (Number(incomingCreated || 0) < Number(lastCreated || 0)) return current;
  if (['pending', 'unpaid', 'failed', 'expired'].includes(current)
    && ['unpaid', 'failed', 'expired'].includes(incoming)) return incoming;
  return current;
}

function customerTaxIds(session) {
  const taxIds = session.customer_details?.tax_ids;
  if (!Array.isArray(taxIds)) return '';
  return JSON.stringify(taxIds.map(({ type = '', value = '' }) => ({ type, value })));
}

function eventShapeValid(event) {
  const baseValid = /^evt_[A-Za-z0-9]+$/.test(String(event?.id || ''))
    && String(event.id).length <= 220
    && Number.isSafeInteger(Number(event.created))
    && Number(event.created) > 0;
  if (!baseValid) return false;
  const object = event?.data?.object;
  if (CHECKOUT_EVENTS.has(event.type)) {
    return object?.object === 'checkout.session'
      && /^cs_(?:test|live)_[A-Za-z0-9]+$/.test(String(object.id || ''));
  }
  if (event.type === 'charge.refunded') {
    return object?.object === 'charge'
      && /^ch_[A-Za-z0-9]+$/.test(String(object.id || ''))
      && /^pi_[A-Za-z0-9]+$/.test(String(object.payment_intent || ''))
      && Number.isSafeInteger(Number(object.amount))
      && Number(object.amount) >= 0
      && Number.isSafeInteger(Number(object.amount_refunded))
      && Number(object.amount_refunded) >= 0
      && /^[a-z]{3}$/.test(String(object.currency || '').toLowerCase());
  }
  return false;
}

function expectedLiveMode(env) {
  if (/^sk_live_/.test(String(env.STRIPE_SECRET_KEY || ''))) return true;
  if (/^sk_test_/.test(String(env.STRIPE_SECRET_KEY || ''))) return false;
  return null;
}

function catalogueIntegrity(order, session, event, env) {
  const product = STRIPE_PRODUCTS[order.product_key];
  const quantity = Number(session.metadata?.quantity || 0);
  const liveMode = expectedLiveMode(env);
  if (!product) return 'unknown_product';
  if (session.metadata?.portal_order_id !== order.id || session.metadata?.portal_user_id !== order.owner_user_id) return 'owner_metadata_mismatch';
  if (session.metadata?.product_key !== order.product_key || quantity !== Number(order.quantity)) return 'catalogue_metadata_mismatch';
  if (quantity < product.min || quantity > product.max || product.amount * quantity !== Number(order.amount_total)) return 'catalogue_amount_mismatch';
  if (Number(session.amount_total) !== Number(order.amount_total) || String(session.currency || '').toLowerCase() !== order.currency) return 'stripe_amount_mismatch';
  if (session.id !== order.stripe_session_id || session.client_reference_id !== order.public_reference) return 'stripe_session_mismatch';
  if (session.mode !== 'payment') return 'stripe_mode_mismatch';
  if (liveMode === null || event.livemode !== liveMode || session.livemode !== liveMode) return 'stripe_livemode_mismatch';
  return '';
}

function legacyCatalogueIntegrity(session, event, env) {
  const metadata = session.metadata || {};
  const product = STRIPE_PRODUCTS[metadata.product_key];
  const quantity = Number(metadata.quantity);
  const liveMode = expectedLiveMode(env);
  if (!product) return 'legacy_unknown_product';
  if (!Number.isSafeInteger(quantity) || quantity < product.min || quantity > product.max) {
    return 'legacy_quantity_mismatch';
  }
  if (product.amount * quantity !== Number(session.amount_total)
    || String(session.currency || '').toLowerCase() !== 'usd') return 'legacy_amount_mismatch';
  if (session.mode !== 'payment') return 'legacy_mode_mismatch';
  if (liveMode === null || event.livemode !== liveMode || session.livemode !== liveMode) {
    return 'legacy_livemode_mismatch';
  }
  return '';
}

function refundIntegrity(order, charge, event, env) {
  const liveMode = expectedLiveMode(env);
  if (!order.payment_intent_id || charge.payment_intent !== order.payment_intent_id) {
    return 'stripe_refund_payment_intent_mismatch';
  }
  if (Number(charge.amount) !== Number(order.amount_total)
    || String(charge.currency || '').toLowerCase() !== order.currency) {
    return 'stripe_refund_amount_mismatch';
  }
  if (charge.paid !== true || charge.status !== 'succeeded') return 'stripe_refund_charge_not_paid';
  if (liveMode === null || event.livemode !== liveMode || charge.livemode !== liveMode) {
    return 'stripe_refund_livemode_mismatch';
  }
  // Stripe emits charge.refunded for partial refunds too. Only the Charge's
  // terminal refunded flag plus equality of both server-owned amounts proves a
  // full-order refund; partial refunds require an explicit product decision.
  if (charge.refunded !== true
    || Number(charge.amount_refunded) !== Number(charge.amount)
    || Number(charge.amount_refunded) !== Number(order.amount_total)) {
    return 'stripe_partial_refund_not_supported';
  }
  return '';
}

async function recordLegacyPayment(env, session, paymentStatus) {
  if (paymentStatus !== 'paid') return;
  const recipients = adminNotificationEmails(env);
  if (!recipients.length) return;
  const db = portalDb(env);
  const now = new Date();
  const payload = {
    sessionId: session.id,
    productKey: String(session.metadata?.product_key || ''),
    customerEmail: String(session.customer_details?.email || session.customer_email || ''),
    amountTotal: Number(session.amount_total || 0),
    currency: String(session.currency || 'usd').toLowerCase()
  };
  await db.batch(recipients.map((email) => notificationStatement(db, {
    type: 'admin_legacy_payment_detected',
    to: email,
    locale: 'zh-tw',
    payload,
    dedupeKey: `admin_legacy_payment:${session.id}:${email}`,
    now
  })));
}

async function markEvent(db, event, order, status, errorCode = '') {
  const timestamp = new Date().toISOString();
  await db.prepare(`
    INSERT OR IGNORE INTO portal_stripe_events
      (event_id, event_type, stripe_session_id, portal_order_id, event_created,
       processing_status, error_code, received_at, updated_at, processed_at)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?8, '')
  `).bind(event.id, event.type, order.stripe_session_id, order.id, Number(event.created), status, errorCode, timestamp).run();
  if (status === 'rejected') {
    await db.prepare(`
      UPDATE portal_stripe_events
      SET processing_status = 'rejected', error_code = ?1, updated_at = ?2, processed_at = ?2
      WHERE event_id = ?3 AND processing_status <> 'processed'
    `).bind(errorCode, timestamp, event.id).run();
  }
}

async function claimEvent(db, event, order) {
  await markEvent(db, event, order, 'received');
  const existingEvent = await db.prepare(`
    SELECT processing_status, updated_at FROM portal_stripe_events WHERE event_id = ?1 LIMIT 1
  `).bind(event.id).first();
  if (existingEvent?.processing_status === 'processed') return { replayed: true };

  const claimedAt = new Date();
  const staleBefore = new Date(claimedAt.getTime() - STRIPE_EVENT_PROCESSING_LEASE_MS).toISOString();
  const claimed = await db.prepare(`
    UPDATE portal_stripe_events
    SET processing_status = 'processing', error_code = '', updated_at = ?1
    WHERE event_id = ?2
      AND (
        processing_status IN ('received', 'failed')
        OR (processing_status = 'processing' AND updated_at <= ?3)
      )
  `).bind(claimedAt.toISOString(), event.id, staleBefore).run();
  if (Number(claimed.meta?.changes || 0) === 1) return { replayed: false };

  // Do not acknowledge a still-active lease as a replay. If that worker is
  // interrupted after this response, Stripe must retain a non-2xx delivery to
  // retry once the bounded lease expires.
  const latestEvent = await db.prepare(`
    SELECT processing_status FROM portal_stripe_events WHERE event_id = ?1 LIMIT 1
  `).bind(event.id).first();
  if (latestEvent?.processing_status === 'processed') return { replayed: true };
  throw new Error('stripe_event_processing');
}

async function mirrorAnalytics(env, event, session, paymentStatus) {
  const eventInsert = env.ANALYTICS_DB.prepare(`
    INSERT OR IGNORE INTO stripe_events (event_id, event_type, created_at)
    VALUES (?1, ?2, datetime('now'))
  `).bind(event.id, event.type);
  const orderUpsert = env.ANALYTICS_DB.prepare(`
    INSERT INTO payment_orders (
      stripe_session_id, payment_intent_id, product_key, amount_total, currency,
      quantity, customer_email, customer_name, customer_business_name, customer_phone,
      customer_tax_ids, service_reference, payment_status, created_at, updated_at
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, datetime('now'), datetime('now'))
    ON CONFLICT(stripe_session_id) DO UPDATE SET
      payment_intent_id = excluded.payment_intent_id,
      amount_total = excluded.amount_total,
      currency = excluded.currency,
      customer_email = excluded.customer_email,
      customer_name = excluded.customer_name,
      customer_business_name = excluded.customer_business_name,
      customer_phone = excluded.customer_phone,
      customer_tax_ids = excluded.customer_tax_ids,
      payment_status = CASE
        WHEN payment_orders.payment_status IN ('paid', 'refunded') AND excluded.payment_status <> 'refunded'
          THEN payment_orders.payment_status
        ELSE excluded.payment_status
      END,
      updated_at = datetime('now')
  `).bind(
    session.id,
    session.payment_intent || '',
    session.metadata?.product_key || '',
    Number(session.amount_total || 0),
    String(session.currency || 'usd').toLowerCase(),
    Number(session.metadata?.quantity || 1),
    session.customer_details?.email || session.customer_email || '',
    session.customer_details?.individual_name || session.collected_information?.individual_name || session.customer_details?.name || '',
    session.customer_details?.business_name || session.collected_information?.business_name || '',
    session.customer_details?.phone || '',
    customerTaxIds(session),
    session.metadata?.reference || '',
    paymentStatus
  );
  await env.ANALYTICS_DB.batch([eventInsert, orderUpsert]);
}

async function mirrorRefundAnalytics(env, event, order, charge) {
  const results = await env.ANALYTICS_DB.batch([
    env.ANALYTICS_DB.prepare(`
      INSERT OR IGNORE INTO stripe_events (event_id, event_type, created_at)
      VALUES (?1, ?2, datetime('now'))
    `).bind(event.id, event.type),
    env.ANALYTICS_DB.prepare(`
      UPDATE payment_orders
      SET payment_status = 'refunded', updated_at = datetime('now')
      WHERE stripe_session_id = ?1
        AND payment_intent_id = ?2
        AND amount_total = ?3
        AND lower(currency) = ?4
        AND payment_status IN ('paid', 'refunded')
    `).bind(
      order.stripe_session_id,
      charge.payment_intent,
      Number(order.amount_total),
      order.currency
    )
  ]);
  if (Number(results[1]?.meta?.changes || 0) !== 1) throw new Error('analytics_refund_order_mismatch');
}

async function processCheckoutEvent(env, event) {
  const db = portalDb(env);
  const session = event.data.object;
  const metadataOrderId = String(session.metadata?.portal_order_id || '');
  const order = await db.prepare(`
    SELECT o.*, u.primary_email AS owner_email, u.locale AS owner_locale
    FROM portal_orders o JOIN portal_users u ON u.id = o.owner_user_id
    WHERE o.id = ?1 AND o.stripe_session_id = ?2 AND o.source = 'stripe'
    LIMIT 1
  `).bind(metadataOrderId, session.id).first();
  if (!order) {
    if (Object.hasOwn(session.metadata || {}, 'portal_order_id')
      || Object.hasOwn(session.metadata || {}, 'portal_user_id')) {
      // A portal-tagged payment must never fall through to the unowned legacy
      // path. Keep returning non-2xx so Stripe surfaces and retries the missing
      // operational order instead of silently acknowledging it.
      throw new Error('stripe_portal_order_not_found');
    }
    const legacyError = legacyCatalogueIntegrity(session, event, env);
    if (legacyError) {
      return { ignored: legacyError, session, paymentStatus: eventPaymentStatus(event.type, session) };
    }
    const paymentStatus = eventPaymentStatus(event.type, session);
    await recordLegacyPayment(env, session, paymentStatus);
    return { legacyUnlinked: true, session, paymentStatus };
  }
  const integrityError = catalogueIntegrity(order, session, event, env);
  if (integrityError) {
    await markEvent(db, event, order, 'rejected', integrityError);
    return { ignored: integrityError, session, paymentStatus: order.payment_status };
  }
  const claim = await claimEvent(db, event, order);
  if (claim.replayed) {
    const latestOrder = await db.prepare(`
      SELECT payment_status FROM portal_orders WHERE id = ?1 LIMIT 1
    `).bind(order.id).first();
    return { replayed: true, session, paymentStatus: latestOrder?.payment_status || order.payment_status };
  }

  const incomingStatus = eventPaymentStatus(event.type, session);
  const now = new Date();
  const timestamp = now.toISOString();
  // Every expression is evaluated against the row at write-lock time. Two
  // different event IDs may both have read an older snapshot, so a derived
  // JavaScript status must never be written back unconditionally.
  const transition = await db.prepare(`
    /* atomic_payment_transition */
    UPDATE portal_orders
    SET payment_intent_id = CASE
          WHEN payment_intent_id = '' AND ?1 <> '' THEN ?1
          ELSE payment_intent_id
        END,
        payment_status = CASE
          WHEN payment_status IN ('refunded', 'waived') THEN payment_status
          WHEN ?2 = 'paid' THEN 'paid'
          WHEN payment_status = 'paid' THEN 'paid'
          WHEN ?3 < last_stripe_event_created THEN payment_status
          WHEN ?2 IN ('unpaid', 'failed', 'expired') THEN ?2
          ELSE payment_status
        END,
        fulfillment_status = CASE
          WHEN fulfillment_status = 'awaiting_payment'
            AND payment_status NOT IN ('refunded', 'waived')
            AND (?2 = 'paid' OR payment_status = 'paid')
            THEN CASE WHEN product_key IN ('t1', 't2') THEN 'awaiting_intake' ELSE 'reviewing' END
          ELSE fulfillment_status
        END,
        paid_at = CASE
          WHEN payment_status NOT IN ('refunded', 'waived')
            AND (?2 = 'paid' OR payment_status = 'paid')
            THEN CASE WHEN paid_at = '' THEN ?4 ELSE paid_at END
          ELSE paid_at
        END,
        last_stripe_event_created = CASE
          WHEN ?3 > last_stripe_event_created
            OR (?3 = last_stripe_event_created AND ?5 > last_stripe_event_id)
            THEN ?3 ELSE last_stripe_event_created
        END,
        last_stripe_event_id = CASE
          WHEN ?3 > last_stripe_event_created
            OR (?3 = last_stripe_event_created AND ?5 > last_stripe_event_id)
            THEN ?5 ELSE last_stripe_event_id
        END,
        checkout_error = '', updated_at = ?4
    WHERE id = ?6 AND owner_user_id = ?7 AND stripe_session_id = ?8 AND source = 'stripe'
  `).bind(
    session.payment_intent || '', incomingStatus, Number(event.created), timestamp, event.id,
    order.id, order.owner_user_id, session.id
  ).run();
  if (Number(transition.meta?.changes || 0) !== 1) throw new Error('stripe_order_transition_failed');
  const finalOrder = await db.prepare(`
    SELECT payment_status, fulfillment_status, paid_at, last_stripe_event_created, last_stripe_event_id
    FROM portal_orders WHERE id = ?1 LIMIT 1
  `).bind(order.id).first();
  if (!finalOrder) throw new Error('stripe_order_transition_failed');
  const paymentStatus = finalOrder.payment_status;
  const fulfillmentStatus = finalOrder.fulfillment_status;
  const isPaid = paymentStatus === 'paid';
  const caseId = workflowId('case');
  const caseReference = publicReference('ZM', now);
  const locale = ['en', 'zh-tw', 'zh-cn'].includes(session.metadata?.locale) ? session.metadata.locale : order.owner_locale;
  const intakeNote = {
    en: 'Please complete the supplier and product intake.',
    'zh-tw': '請補充供應商與產品資料。',
    'zh-cn': '请补充供应商与产品资料。'
  }[locale] || 'Please complete the supplier and product intake.';
  const statements = [
    db.prepare(`
      INSERT OR IGNORE INTO portal_cases
        (id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url, chinese_legal_name,
         product_category, product_model, decision_context, requested_checks, status, created_at, updated_at,
         payment_order_id, case_source, expected_delivery_at, client_status_note, status_updated_at)
      SELECT ?1, ?2, owner_user_id, product_key, '', '', '', '', '', '', '', 'awaiting_client', ?3, ?3,
             id, 'stripe', '', ?4, ?3
      FROM portal_orders
      WHERE id = ?5 AND payment_status = 'paid' AND product_key IN ('t1', 't2')
        AND NOT EXISTS (SELECT 1 FROM portal_cases WHERE payment_order_id = ?5)
    `).bind(caseId, caseReference, timestamp, intakeNote, order.id),
    db.prepare(`
      UPDATE portal_orders
      SET case_id = COALESCE(case_id, (SELECT id FROM portal_cases WHERE payment_order_id = ?1)), updated_at = ?2
      WHERE id = ?1
    `).bind(order.id, timestamp),
    auditStatement(db, {
      actorUserId: order.owner_user_id,
      targetUserId: order.owner_user_id,
      caseId: order.case_id || null,
      orderId: order.id,
      eventType: 'stripe_payment_state_updated',
      details: { eventId: event.id, eventType: event.type, paymentStatus, fulfillmentStatus },
      now
    }),
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      SELECT ?1, ?2, id, 'stripe_case_created', ?3, ?4, ?2, ?5
      FROM portal_cases
      WHERE id = ?6 AND payment_order_id = ?4
        AND NOT EXISTS (SELECT 1 FROM portal_audit_events WHERE case_id = ?6 AND event_type = 'stripe_case_created')
    `).bind(`evt_${randomToken(18)}`, order.owner_user_id, timestamp, order.id,
      JSON.stringify({ eventId: event.id }), caseId),
    db.prepare(`
      UPDATE portal_stripe_events
      SET processing_status = 'processed', error_code = '', processed_at = ?1, updated_at = ?1
      WHERE event_id = ?2 AND processing_status = 'processing'
    `).bind(timestamp, event.id)
  ];
  if (isPaid) {
    const noticePayload = {
      orderReference: order.public_reference,
      description: order.product_description,
      amountTotal: Number(order.amount_total),
      currency: order.currency
    };
    statements.push(notificationStatement(db, {
      type: 'customer_order_paid',
      to: order.owner_email,
      locale,
      payload: noticePayload,
      dedupeKey: `customer_order_paid:${order.id}`,
      now
    }));
    for (const email of adminNotificationEmails(env)) {
      statements.push(notificationStatement(db, {
        type: 'admin_order_paid',
        to: email,
        locale: 'zh-tw',
        payload: noticePayload,
        dedupeKey: `admin_order_paid:${order.id}:${email}`,
        now
      }));
    }
  }
  try {
    await db.batch(statements);
  } catch (error) {
    await db.prepare(`
      UPDATE portal_stripe_events
      SET processing_status = 'failed', error_code = ?1, updated_at = ?2
      WHERE event_id = ?3 AND processing_status = 'processing'
    `).bind(String(error?.message || 'portal_processing_failed').slice(0, 180), new Date().toISOString(), event.id).run();
    throw error;
  }
  return { session, paymentStatus, processed: true };
}

async function processRefundEvent(env, event) {
  const db = portalDb(env);
  const charge = event.data.object;
  const matches = await db.prepare(`
    SELECT o.*
    FROM portal_orders o
    WHERE o.source = 'stripe' AND o.payment_intent_id = ?1
    ORDER BY o.created_at ASC, o.id ASC
    LIMIT 2
  `).bind(charge.payment_intent).all();
  const orders = matches.results || [];
  if (orders.length !== 1) {
    // A PaymentIntent is the only strong relationship available on the Charge.
    // Zero or multiple matches must surface to Stripe; never infer an owner from
    // email, amount, metadata copied from elsewhere, or row ordering.
    throw new Error(orders.length ? 'stripe_refund_order_ambiguous' : 'stripe_refund_order_not_found');
  }
  const order = orders[0];
  const integrityError = refundIntegrity(order, charge, event, env);
  if (integrityError) {
    await markEvent(db, event, order, 'rejected', integrityError);
    return { ignored: integrityError, refund: true, charge, order, paymentStatus: order.payment_status };
  }

  const claim = await claimEvent(db, event, order);
  if (claim.replayed) {
    const latestOrder = await db.prepare(`
      SELECT * FROM portal_orders WHERE id = ?1 LIMIT 1
    `).bind(order.id).first();
    return {
      replayed: true,
      refund: true,
      charge,
      order: latestOrder || order,
      paymentStatus: latestOrder?.payment_status || order.payment_status
    };
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const auditId = `evt_stripe_refund_${event.id}`;
  const details = JSON.stringify({
    eventId: event.id,
    chargeId: charge.id,
    paymentIntentId: charge.payment_intent,
    amountRefunded: Number(charge.amount_refunded),
    currency: order.currency
  });
  let results;
  try {
    results = await db.batch([
      db.prepare(`
        UPDATE portal_orders
        SET payment_status = 'refunded',
            last_stripe_event_created = CASE
              WHEN ?1 > last_stripe_event_created
                OR (?1 = last_stripe_event_created AND ?2 > last_stripe_event_id)
                THEN ?1 ELSE last_stripe_event_created
            END,
            last_stripe_event_id = CASE
              WHEN ?1 > last_stripe_event_created
                OR (?1 = last_stripe_event_created AND ?2 > last_stripe_event_id)
                THEN ?2 ELSE last_stripe_event_id
            END,
            checkout_error = '', updated_at = ?3
        WHERE id = ?4 AND source = 'stripe' AND stripe_session_id = ?5
          AND payment_intent_id = ?6 AND amount_total = ?7 AND lower(currency) = ?8
          AND payment_status IN ('paid', 'refunded')
      `).bind(
        Number(event.created), event.id, timestamp, order.id, order.stripe_session_id,
        charge.payment_intent, Number(order.amount_total), order.currency
      ),
      db.prepare(`
        INSERT OR IGNORE INTO portal_audit_events
          (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
        SELECT ?1, owner_user_id, case_id, 'stripe_payment_refunded', ?2, id, owner_user_id, ?3
        FROM portal_orders
        WHERE id = ?4 AND payment_status = 'refunded'
          AND payment_intent_id = ?5 AND stripe_session_id = ?6
      `).bind(auditId, timestamp, details, order.id, charge.payment_intent, order.stripe_session_id),
      db.prepare(`
        UPDATE portal_stripe_events
        SET processing_status = 'processed', error_code = '', processed_at = ?1, updated_at = ?1
        WHERE event_id = ?2 AND processing_status = 'processing'
          AND EXISTS (
            SELECT 1 FROM portal_orders
            WHERE id = ?3 AND payment_status = 'refunded' AND payment_intent_id = ?4
          )
      `).bind(timestamp, event.id, order.id, charge.payment_intent)
    ]);
  } catch (error) {
    await db.prepare(`
      UPDATE portal_stripe_events
      SET processing_status = 'failed', error_code = ?1, updated_at = ?2
      WHERE event_id = ?3 AND processing_status = 'processing'
    `).bind(String(error?.message || 'refund_processing_failed').slice(0, 180), new Date().toISOString(), event.id).run();
    throw error;
  }
  if (Number(results[0]?.meta?.changes || 0) !== 1 || Number(results[2]?.meta?.changes || 0) !== 1) {
    await db.prepare(`
      UPDATE portal_stripe_events
      SET processing_status = 'failed', error_code = 'refund_transition_failed', updated_at = ?1
      WHERE event_id = ?2 AND processing_status = 'processing'
    `).bind(new Date().toISOString(), event.id).run();
    throw new Error('stripe_refund_transition_failed');
  }
  return { refund: true, charge, order: { ...order, payment_status: 'refunded' }, paymentStatus: 'refunded', processed: true };
}

async function processPortalEvent(env, event) {
  return event.type === 'charge.refunded'
    ? processRefundEvent(env, event)
    : processCheckoutEvent(env, event);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.STRIPE_WEBHOOK_SECRET || !env.ANALYTICS_DB || !/^sk_(?:test|live)_/.test(String(env.STRIPE_SECRET_KEY || ''))) {
    return json({ error: 'webhook_not_configured' }, 503);
  }
  try { portalDb(env); } catch { return json({ error: 'webhook_not_configured' }, 503); }
  const rawBody = await readBoundedText(request);
  if (rawBody === null) return json({ error: 'request_too_large' }, 413);
  const valid = await verifyStripeSignature(rawBody, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return json({ error: 'invalid_signature' }, 400);
  let event;
  try { event = JSON.parse(rawBody); } catch { return json({ error: 'invalid_json' }, 400); }
  if (!RELEVANT_EVENTS.has(event.type)) return json({ received: true });
  if (!eventShapeValid(event)) return json({ error: 'invalid_event' }, 400);

  let result;
  try {
    result = await processPortalEvent(env, event);
  } catch {
    return json({ error: 'portal_workflow_failed' }, 503);
  }
  try {
    if (!result.ignored) {
      if (result.refund) await mirrorRefundAnalytics(env, event, result.order, result.charge);
      else await mirrorAnalytics(env, event, result.session, result.paymentStatus);
    }
  } catch {
    return json({ error: 'analytics_mirror_failed' }, 503);
  }
  if (typeof context.waitUntil === 'function') {
    context.waitUntil(deliverQueuedNotifications(env, { limit: 8 }).catch(() => null));
  }
  return json({
    received: true,
    ...(result.ignored ? { ignored: result.ignored } : {}),
    ...(result.replayed ? { replayed: true } : {}),
    ...(result.legacyUnlinked ? { legacyUnlinked: true } : {})
  });
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
