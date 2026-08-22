import {
  cleanText,
  portalDb,
  portalJson,
  readPortalJson,
  requireAdmin
} from '../../_lib/auth.js';
import {
  auditStatement,
  publicOrder,
  publicReference,
  resolveVerifiedCustomer,
  validateManualOrder,
  workflowId
} from '../../_lib/workflow.js';

function adminOrder(row) {
  return {
    ...publicOrder(row),
    ownerUserId: row.owner_user_id || null,
    ownerEmail: row.owner_email || '',
    stripeSessionId: row.stripe_session_id || null,
    paymentIntentId: row.payment_intent_id || '',
    paymentMethodNote: row.payment_method_note || '',
    archivedAt: row.archived_at || '',
    pendingInvitation: row.pending_invitation === 1
  };
}

export async function onRequestGet({ request, env }) {
  const authorization = await requireAdmin(request, env, { mutation: false });
  if (authorization.error) return authorization.error;
  const includeArchived = new URL(request.url).searchParams.get('includeArchived') === '1';
  const db = portalDb(env);
  const current = await db.prepare(`
    SELECT o.*, u.primary_email AS owner_email, 0 AS pending_invitation
    FROM portal_orders o
    JOIN portal_users u ON u.id = o.owner_user_id
    WHERE (?1 = 1 OR o.archived_at = '')
    ORDER BY o.updated_at DESC
    LIMIT 150
  `).bind(includeArchived ? 1 : 0).all();
  const invited = await db.prepare(`
    SELECT d.order_id AS id, d.order_public_reference AS public_reference, NULL AS owner_user_id,
           d.case_id, 'manual' AS source, d.order_product_key AS product_key,
           d.order_product_description AS product_description, d.order_amount_total AS amount_total,
           d.order_currency AS currency, d.order_quantity AS quantity, NULL AS stripe_session_id,
           '' AS payment_intent_id, d.order_payment_method_note AS payment_method_note,
           d.order_service_reference AS service_reference, d.order_payment_status AS payment_status,
           d.order_fulfillment_status AS fulfillment_status, NULL AS created_by_user_id,
           d.paid_at, d.order_cancelled_at AS cancelled_at, '' AS customer_hidden_at,
           d.order_archived_at AS archived_at, d.created_at, d.updated_at,
           i.email_display AS owner_email, 1 AS pending_invitation
    FROM portal_invited_cases d
    JOIN portal_customer_invites i ON i.id = d.invite_id
    WHERE d.status = 'pending' AND d.order_id <> ''
      AND (?1 = 1 OR d.order_archived_at = '')
    ORDER BY d.updated_at DESC
    LIMIT 150
  `).bind(includeArchived ? 1 : 0).all();
  return portalJson({
    orders: [...(current.results || []), ...(invited.results || [])]
      .sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)))
      .slice(0, 150)
      .map(adminOrder)
  });
}

export async function onRequestPost({ request, env }) {
  const authorization = await requireAdmin(request, env);
  if (authorization.error) return authorization.error;
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};
  const orderInput = validateManualOrder(payload);
  if (!orderInput) return portalJson({ error: 'validation_failed' }, 400);
  const caseId = cleanText(payload.caseId, 120) || '';
  const db = portalDb(env);
  let currentCase = null;
  let invitedCase = null;
  if (caseId) {
    currentCase = await db.prepare(`
      SELECT c.id, c.owner_user_id, u.primary_email AS owner_email
      FROM portal_cases c JOIN portal_users u ON u.id = c.owner_user_id
      WHERE c.id = ?1 LIMIT 1
    `).bind(caseId).first();
    if (!currentCase) {
      invitedCase = await db.prepare(`
        SELECT d.id, d.case_id, d.order_id, i.email_display AS owner_email
        FROM portal_invited_cases d JOIN portal_customer_invites i ON i.id = d.invite_id
        WHERE d.case_id = ?1 AND d.status = 'pending' AND i.status = 'pending'
        LIMIT 1
      `).bind(caseId).first();
    }
    if (!currentCase && !invitedCase) return portalJson({ error: 'case_not_found' }, 404);
  }
  if (['t1', 't2'].includes(orderInput.productKey) && !caseId) {
    return portalJson({ error: 'case_required_for_manual_verification_order' }, 400);
  }
  const requestedCustomer = await resolveVerifiedCustomer(db, {
    userId: cleanText(payload.customerUserId, 120) || '',
    email: cleanText(payload.customerEmail, 254) || ''
  });
  if (currentCase && requestedCustomer && currentCase.owner_user_id !== requestedCustomer.id) {
    return portalJson({ error: 'customer_case_mismatch' }, 409);
  }
  const customer = currentCase
    ? { id: currentCase.owner_user_id, primary_email: currentCase.owner_email }
    : requestedCustomer;
  if (!customer && !invitedCase) return portalJson({ error: 'verified_customer_or_invited_case_required' }, 400);
  if (invitedCase?.order_id) return portalJson({ error: 'case_already_has_manual_order' }, 409);
  const now = new Date();
  const timestamp = now.toISOString();
  const orderId = workflowId('ord');
  const reference = publicReference('ORD', now);
  if (invitedCase) {
    await db.batch([
      db.prepare(`
        UPDATE portal_invited_cases
        SET order_id = ?1, order_public_reference = ?2, order_product_key = ?3,
            order_product_description = ?4, order_amount_total = ?5, order_currency = ?6,
            order_quantity = ?7, order_payment_method_note = ?8, order_service_reference = ?9,
            order_payment_status = 'unpaid', order_fulfillment_status = 'awaiting_payment', updated_at = ?10
        WHERE id = ?11 AND status = 'pending' AND order_id = ''
      `).bind(orderId, reference, orderInput.productKey, orderInput.description, orderInput.amountTotal,
        orderInput.currency, orderInput.quantity, orderInput.paymentMethodNote,
        orderInput.serviceReference, timestamp, invitedCase.id),
      auditStatement(db, {
        actorUserId: authorization.session.user_id,
        eventType: 'admin_manual_order_created_for_invite',
        details: { orderId, pendingCaseId: invitedCase.case_id, paymentStatus: 'unpaid' },
        now
      })
    ]);
    return portalJson({ order: { id: orderId, reference, pendingInvitation: true, paymentStatus: 'unpaid' } }, 201);
  }
  await db.batch([
    db.prepare(`
      INSERT INTO portal_orders
        (id, public_reference, owner_user_id, case_id, source, product_key, product_description,
         amount_total, currency, quantity, stripe_session_id, payment_intent_id, payment_method_note,
         service_reference, payment_status, fulfillment_status, created_by_user_id, paid_at, created_at, updated_at,
         last_stripe_event_created, last_stripe_event_id, checkout_error)
      VALUES (?1, ?2, ?3, ?4, 'manual', ?5, ?6, ?7, ?8, ?9, NULL, '', ?10, ?11,
              'unpaid', 'awaiting_payment', ?12, '', ?13, ?13, 0, '', '')
    `).bind(orderId, reference, customer.id, caseId || null, orderInput.productKey,
      orderInput.description, orderInput.amountTotal, orderInput.currency, orderInput.quantity,
      orderInput.paymentMethodNote, orderInput.serviceReference, authorization.session.user_id, timestamp),
    db.prepare(`
      UPDATE portal_cases SET payment_order_id = COALESCE(payment_order_id, ?1), updated_at = ?2
      WHERE id = ?3 AND owner_user_id = ?4
    `).bind(orderId, timestamp, caseId || '', customer.id),
    auditStatement(db, {
      actorUserId: authorization.session.user_id,
      targetUserId: customer.id,
      caseId: caseId || null,
      orderId,
      eventType: 'admin_manual_order_created',
      details: { paymentStatus: 'unpaid', product: orderInput.productKey, amountTotal: orderInput.amountTotal },
      now
    })
  ]);
  const row = await db.prepare(`
    SELECT o.*, u.primary_email AS owner_email, 0 AS pending_invitation
    FROM portal_orders o JOIN portal_users u ON u.id = o.owner_user_id
    WHERE o.id = ?1 LIMIT 1
  `).bind(orderId).first();
  return portalJson({ order: adminOrder(row) }, 201);
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
