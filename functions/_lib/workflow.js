import {
  cleanExternalUrl,
  cleanPortalLocale,
  cleanText,
  normalizeEmail,
  portalDb,
  randomToken
} from './auth.js';

export const CASE_STATUSES = new Set([
  'submitted', 'reviewing', 'awaiting_client', 'scoped', 'in_progress', 'delivered', 'closed'
]);
export const SERVICE_TIERS = new Set(['unsure', 't1', 't2', 't3', 't4', 't5', 't6']);
export const PAYMENT_STATUSES = new Set(['pending', 'unpaid', 'paid', 'failed', 'expired', 'refunded', 'waived']);
export const FULFILLMENT_STATUSES = new Set([
  'awaiting_payment', 'awaiting_intake', 'reviewing', 'in_progress', 'delivered', 'closed'
]);

const MANUAL_PRODUCT_KEYS = new Set([
  'consultation', 'consultation-extension', 'balance', 't1', 't2', 't3', 't4', 't5', 't6', 'custom'
]);
const CUSTOMER_INVITE_TTL_MS = 14 * 24 * 60 * 60 * 1000;

export function workflowId(prefix, bytes = 18) {
  return `${prefix}_${randomToken(bytes)}`;
}

export function publicReference(prefix, now = new Date()) {
  return `${prefix}-${now.getUTCFullYear()}-${randomToken(6).toUpperCase()}`;
}

export function publicCase(row) {
  const publishedReport = row.report_published_at && row.report_url ? row.report_url : '';
  return {
    id: row.id,
    reference: row.public_reference,
    tier: row.service_tier,
    supplierName: row.supplier_name,
    supplierUrl: row.supplier_url,
    chineseLegalName: row.chinese_legal_name,
    productCategory: row.product_category,
    productModel: row.product_model,
    decisionContext: row.decision_context,
    requestedChecks: row.requested_checks,
    status: row.status,
    expectedDeliveryAt: row.expected_delivery_at || '',
    clientStatusNote: row.client_status_note || '',
    reportUrl: publishedReport,
    reportPublishedAt: publishedReport ? row.report_published_at : '',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function publicOrder(row) {
  return {
    id: row.id,
    reference: row.public_reference,
    caseId: row.case_id || null,
    source: row.source,
    product: row.product_key,
    description: row.product_description,
    amountTotal: Number(row.amount_total || 0),
    currency: row.currency,
    quantity: Number(row.quantity || 1),
    serviceReference: row.service_reference || '',
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    paidAt: row.paid_at || '',
    cancelledAt: row.cancelled_at || '',
    customerHiddenAt: row.customer_hidden_at || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function adminCase(row) {
  return {
    ...publicCase(row),
    ownerUserId: row.owner_user_id || null,
    ownerEmail: row.owner_email || row.email_display || '',
    source: row.case_source || 'admin',
    pendingInvitation: row.pending_invitation === 1 || row.status_source === 'invited',
    internalNote: row.internal_note || '',
    archivedAt: row.archived_at || ''
  };
}

function auditDetails(details) {
  const json = JSON.stringify(details || {});
  return json.length <= 4000 ? json : JSON.stringify({ truncated: true });
}

export function auditStatement(db, {
  actorUserId,
  eventType,
  caseId = null,
  orderId = null,
  targetUserId = null,
  details = {},
  now = new Date()
}) {
  return db.prepare(`
    INSERT INTO portal_audit_events
      (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
  `).bind(
    workflowId('evt'), actorUserId, caseId, eventType, now.toISOString(), orderId, targetUserId,
    auditDetails(details)
  );
}

export async function recordAudit(envOrDb, options) {
  const db = typeof envOrDb.prepare === 'function' ? envOrDb : portalDb(envOrDb);
  await auditStatement(db, options).run();
}

export async function resolveVerifiedCustomer(db, { userId = '', email = '' } = {}) {
  if (userId) {
    return db.prepare(`
      SELECT u.id, u.primary_email, u.email_normalized, u.display_name, u.locale, u.role, u.status
      FROM portal_users u
      WHERE u.id = ?1 AND u.status = 'active'
        AND EXISTS (
          SELECT 1 FROM portal_verified_emails e
          WHERE e.user_id = u.id
            AND EXISTS (
              SELECT 1 FROM portal_identities i
              WHERE i.user_id = e.user_id AND i.email_authoritative = 1
                AND lower(trim(i.provider_email)) = e.email_normalized
            )
        )
      LIMIT 1
    `).bind(String(userId).slice(0, 120)).first();
  }
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  return db.prepare(`
    SELECT u.id, u.primary_email, u.email_normalized, u.display_name, u.locale, u.role, u.status
    FROM portal_verified_emails e
    JOIN portal_users u ON u.id = e.user_id
    WHERE e.email_normalized = ?1 AND u.status = 'active'
      AND EXISTS (
        SELECT 1 FROM portal_identities i
        WHERE i.user_id = e.user_id AND i.email_authoritative = 1
          AND lower(trim(i.provider_email)) = e.email_normalized
      )
    LIMIT 1
  `).bind(normalized.normalized).first();
}

export async function resolveOwnedServiceReference(db, userId, productKey, reference) {
  const value = String(reference || '').trim();
  if (!value) return null;
  if (productKey === 'consultation-extension') {
    const order = await db.prepare(`
      SELECT id, case_id, public_reference, product_key, payment_status
      FROM portal_orders
      WHERE owner_user_id = ?1 AND lower(public_reference) = lower(?2)
        AND product_key = 'consultation' AND payment_status = 'paid'
      LIMIT 1
    `).bind(userId, value).first();
    return order ? { kind: 'order', orderId: order.id, caseId: order.case_id || null, reference: order.public_reference } : null;
  }
  if (productKey !== 'balance') return { kind: 'none', orderId: null, caseId: null, reference: value };
  const order = await db.prepare(`
    SELECT id, case_id, public_reference
    FROM portal_orders
    WHERE owner_user_id = ?1 AND lower(public_reference) = lower(?2)
      AND payment_status IN ('paid', 'waived')
    LIMIT 1
  `).bind(userId, value).first();
  if (order) return { kind: 'order', orderId: order.id, caseId: order.case_id || null, reference: order.public_reference };
  const ownedCase = await db.prepare(`
    SELECT id, public_reference
    FROM portal_cases
    WHERE owner_user_id = ?1 AND lower(public_reference) = lower(?2) AND status <> 'closed'
    LIMIT 1
  `).bind(userId, value).first();
  if (ownedCase) {
    return { kind: 'case', orderId: null, caseId: ownedCase.id, reference: ownedCase.public_reference };
  }

  // A balance can also be matched to an agreed quote number or a short payment
  // reason that has not yet become a Portal case/order. Never downgrade a
  // ZimonAI-looking reference to a free-form memo: that could attach a payment
  // to another customer's internal reference without proving ownership.
  if (/^(?:ORD|ZM)-\d{4}-[A-Z0-9_-]+$/i.test(value)) return null;
  return { kind: 'memo', orderId: null, caseId: null, reference: value };
}

function cleanedCaseInput(payload, existing = {}) {
  const field = (key, cleaner, fallback) => Object.hasOwn(payload, key) ? cleaner(payload[key]) : fallback;
  return {
    tier: field('tier', (value) => SERVICE_TIERS.has(value) ? value : null, existing.service_tier || 'unsure'),
    supplierName: field('supplierName', (value) => cleanText(value, 240), existing.supplier_name || ''),
    supplierUrl: field('supplierUrl', cleanExternalUrl, existing.supplier_url || ''),
    chineseLegalName: field('chineseLegalName', (value) => cleanText(value, 240), existing.chinese_legal_name || ''),
    productCategory: field('productCategory', (value) => cleanText(value, 240), existing.product_category || ''),
    productModel: field('productModel', (value) => cleanText(value, 300), existing.product_model || ''),
    decisionContext: field('decisionContext', (value) => cleanText(value, 2000), existing.decision_context || ''),
    requestedChecks: field('requestedChecks', (value) => cleanText(value, 3000), existing.requested_checks || '')
  };
}

export function validateCaseInput(payload, existing = {}) {
  const cleaned = cleanedCaseInput(payload || {}, existing);
  if (Object.values(cleaned).includes(null)) return null;
  return cleaned;
}

export function intakeReady(input) {
  return Boolean(input.supplierName && input.productCategory && input.decisionContext);
}

export async function createAdminCase(env, actor, payload, now = new Date()) {
  const db = portalDb(env);
  const input = validateCaseInput(payload);
  if (!input) throw new Error('validation_failed');
  const locale = cleanPortalLocale(payload.locale);
  const normalized = normalizeEmail(payload.customerEmail);
  let customer = await resolveVerifiedCustomer(db, {
    userId: cleanText(payload.customerUserId, 120) || '',
    email: normalized?.normalized || ''
  });
  if (!customer && !normalized) throw new Error('customer_required');
  const timestamp = now.toISOString();
  const caseId = workflowId('case');
  const reference = publicReference('ZM', now);
  const status = intakeReady(input) ? 'submitted' : 'awaiting_client';
  const clientNote = status === 'awaiting_client'
    ? ({ en: 'Please complete the supplier and product intake.', 'zh-tw': '請補充供應商與產品資料。', 'zh-cn': '请补充供应商与产品资料。' }[locale])
    : '';

  if (customer) {
    await db.batch([
      db.prepare(`
        INSERT INTO portal_cases
          (id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url, chinese_legal_name,
           product_category, product_model, decision_context, requested_checks, status, created_at, updated_at,
           case_source, expected_delivery_at, client_status_note, status_updated_at)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?13,
                'admin', '', ?14, ?13)
      `).bind(caseId, reference, customer.id, input.tier, input.supplierName, input.supplierUrl,
        input.chineseLegalName, input.productCategory, input.productModel, input.decisionContext,
        input.requestedChecks, status, timestamp, clientNote),
      db.prepare(`
        INSERT INTO portal_audit_events
          (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
        VALUES (?1, ?2, ?3, 'admin_case_created', ?4, NULL, ?5, ?6)
      `).bind(workflowId('evt'), actor.user_id, caseId, timestamp, customer.id,
        auditDetails({ status, customerEmail: customer.email_normalized }))
    ]);
    return { pendingInvitation: false, caseId, reference, ownerUserId: customer.id };
  }

  const inviteId = workflowId('inv');
  const expiresAt = new Date(now.getTime() + CUSTOMER_INVITE_TTL_MS).toISOString();
  await db.batch([
    db.prepare(`
      UPDATE portal_invited_cases
      SET status = 'revoked', updated_at = ?1
      WHERE status = 'pending'
        AND invite_id IN (
          SELECT id FROM portal_customer_invites
          WHERE email_normalized = ?2 AND status = 'pending' AND expires_at <= ?1
        )
    `).bind(timestamp, normalized.normalized),
    db.prepare(`
      UPDATE portal_customer_invites
      SET status = 'revoked', updated_at = ?1
      WHERE email_normalized = ?2 AND status = 'pending' AND expires_at <= ?1
    `).bind(timestamp, normalized.normalized),
    db.prepare(`
      INSERT OR IGNORE INTO portal_customer_invites
        (id, email_normalized, email_display, locale, status, created_by_user_id, expires_at, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, 'pending', ?5, ?6, ?7, ?7)
    `).bind(inviteId, normalized.normalized, normalized.display, locale, actor.user_id, expiresAt, timestamp),
    db.prepare(`
      UPDATE portal_customer_invites
      SET email_display = ?1, locale = ?2, expires_at = ?3, updated_at = ?4
      WHERE email_normalized = ?5 AND status = 'pending'
    `).bind(normalized.display, locale, expiresAt, timestamp, normalized.normalized)
  ]);
  const invite = await db.prepare(`
    SELECT id FROM portal_customer_invites
    WHERE email_normalized = ?1 AND status = 'pending' AND expires_at > ?2
    LIMIT 1
  `).bind(normalized.normalized, timestamp).first();
  if (!invite?.id) throw new Error('invite_creation_failed');
  await db.batch([
    db.prepare(`
      INSERT INTO portal_invited_cases
        (id, invite_id, case_id, case_public_reference, service_tier, supplier_name, supplier_url,
         chinese_legal_name, product_category, product_model, decision_context, requested_checks,
         case_status, expected_delivery_at, client_status_note, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, '', ?14, ?15, ?15)
    `).bind(workflowId('pending'), invite.id, caseId, reference, input.tier, input.supplierName,
      input.supplierUrl, input.chineseLegalName, input.productCategory, input.productModel,
      input.decisionContext, input.requestedChecks, status, clientNote, timestamp),
    db.prepare(`
      INSERT INTO portal_audit_events
        (id, user_id, case_id, event_type, created_at, order_id, target_user_id, detail_json)
      VALUES (?1, ?2, NULL, 'admin_invited_case_created', ?3, NULL, NULL, ?4)
    `).bind(workflowId('evt'), actor.user_id, timestamp,
      auditDetails({ pendingCaseId: caseId, customerEmail: normalized.normalized, status }))
  ]);
  return { pendingInvitation: true, caseId, reference, ownerEmail: normalized.display };
}

export function validateManualOrder(payload) {
  const productKey = cleanText(payload.product, 80, true);
  const description = cleanText(payload.description, 300, true);
  const amountTotal = Number(payload.amountTotal);
  const quantity = Number(payload.quantity ?? 1);
  const currency = String(payload.currency || 'usd').trim().toLowerCase();
  const serviceReference = cleanText(payload.serviceReference, 120) ?? '';
  const paymentMethodNote = cleanText(payload.paymentMethodNote, 500) ?? '';
  if (!productKey || !MANUAL_PRODUCT_KEYS.has(productKey) || !description
    || !Number.isSafeInteger(amountTotal) || amountTotal < 0 || amountTotal > 100_000_000
    || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100
    || !/^[a-z]{3}$/.test(currency) || serviceReference === null || paymentMethodNote === null) return null;
  return { productKey, description, amountTotal, quantity, currency, serviceReference, paymentMethodNote };
}

export { cleanExternalUrl, cleanText };
