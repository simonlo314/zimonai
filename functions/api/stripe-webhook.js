import { json } from '../_lib/stripe.js';

const RELEVANT_EVENTS = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'checkout.session.expired'
]);

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function equalHex(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}

async function verifySignature(rawBody, header, secret) {
  if (!header || !secret) return false;
  const parts = header.split(',').map((part) => part.trim().split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!timestamp || !signatures.length) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
  const expected = bytesToHex(digest);
  return signatures.some((signature) => equalHex(signature, expected));
}

function paymentStatusFor(eventType, session) {
  if (eventType === 'checkout.session.expired') return 'expired';
  if (eventType === 'checkout.session.async_payment_failed') return 'failed';
  return session.payment_status || 'unpaid';
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_WEBHOOK_SECRET || !env.ANALYTICS_DB) return json({ error: 'webhook_not_configured' }, 503);
  if (Number(request.headers.get('Content-Length') || 0) > 1048576) return json({ error: 'request_too_large' }, 413);

  const rawBody = await request.text();
  const valid = await verifySignature(rawBody, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return json({ error: 'invalid_signature' }, 400);

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  if (!RELEVANT_EVENTS.has(event.type)) return json({ received: true });
  const session = event.data?.object;
  if (!session?.id) return json({ error: 'missing_session' }, 400);

  const eventInsert = env.ANALYTICS_DB.prepare(`
    INSERT OR IGNORE INTO stripe_events (event_id, event_type, created_at)
    VALUES (?, ?, datetime('now'))
  `).bind(event.id, event.type);

  const orderUpsert = env.ANALYTICS_DB.prepare(`
    INSERT INTO payment_orders (
      stripe_session_id, payment_intent_id, product_key, amount_total, currency,
      quantity, customer_email, customer_name, service_reference, payment_status,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(stripe_session_id) DO UPDATE SET
      payment_intent_id = excluded.payment_intent_id,
      amount_total = excluded.amount_total,
      currency = excluded.currency,
      customer_email = excluded.customer_email,
      customer_name = excluded.customer_name,
      payment_status = excluded.payment_status,
      updated_at = datetime('now')
  `).bind(
    session.id,
    session.payment_intent || '',
    session.metadata?.product_key || '',
    Number(session.amount_total || 0),
    session.currency || 'usd',
    Number(session.metadata?.quantity || 1),
    session.customer_details?.email || session.customer_email || '',
    session.customer_details?.name || '',
    session.metadata?.reference || session.client_reference_id || '',
    paymentStatusFor(event.type, session)
  );

  await env.ANALYTICS_DB.batch([eventInsert, orderUpsert]);
  return json({ received: true });
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405);
}
