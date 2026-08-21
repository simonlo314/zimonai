import {
  cleanExternalUrl,
  cleanText,
  getPortalSession,
  portalDb,
  portalJson,
  randomToken,
  readPortalJson,
  requireMutation
} from '../../_lib/auth.js';

const TIERS = new Set(['unsure', 't1', 't2', 't3', 't4', 't5', 't6']);
const SUBMISSION_LIMIT = 10;
const SUBMISSION_WINDOW_MS = 24 * 60 * 60 * 1000;
const OPEN_CASE_LIMIT = 25;

async function caseLimitSnapshot(db, userId, now) {
  const cutoff = new Date(now.getTime() - SUBMISSION_WINDOW_MS).toISOString();
  const row = await db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN created_at >= ?2 THEN 1 ELSE 0 END), 0) AS recent_count,
      COALESCE(SUM(CASE WHEN status NOT IN ('delivered', 'closed') THEN 1 ELSE 0 END), 0) AS open_count,
      MIN(CASE WHEN created_at >= ?2 THEN created_at ELSE NULL END) AS oldest_recent_at
    FROM portal_cases
    WHERE owner_user_id = ?1
  `).bind(userId, cutoff).first();
  return {
    recentCount: Number(row?.recent_count || 0),
    openCount: Number(row?.open_count || 0),
    oldestRecentAt: row?.oldest_recent_at || ''
  };
}

function caseLimitResponse(snapshot, now) {
  if (snapshot.openCount >= OPEN_CASE_LIMIT) {
    return portalJson({
      error: 'open_case_limit_reached',
      limit: OPEN_CASE_LIMIT
    }, 429);
  }
  if (snapshot.recentCount >= SUBMISSION_LIMIT) {
    const oldest = Date.parse(snapshot.oldestRecentAt);
    const retryAfterSeconds = Number.isFinite(oldest)
      ? Math.min(Math.ceil(SUBMISSION_WINDOW_MS / 1000), Math.max(1, Math.ceil((oldest + SUBMISSION_WINDOW_MS - now.getTime()) / 1000)))
      : Math.ceil(SUBMISSION_WINDOW_MS / 1000);
    return portalJson({
      error: 'case_submission_rate_limited',
      limit: SUBMISSION_LIMIT,
      windowHours: 24,
      retryAfterSeconds
    }, 429, { 'Retry-After': String(retryAfterSeconds) });
  }
  return null;
}

function publicCase(row) {
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
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function onRequestGet({ request, env }) {
  const session = await getPortalSession(request, env);
  if (!session) return portalJson({ error: 'authentication_required' }, 401);
  const rows = await portalDb(env).prepare(`
    SELECT id, public_reference, service_tier, supplier_name, supplier_url, chinese_legal_name,
           product_category, product_model, decision_context, requested_checks, status, created_at, updated_at
    FROM portal_cases
    WHERE owner_user_id = ?1
    ORDER BY updated_at DESC
    LIMIT 100
  `).bind(session.user_id).all();
  return portalJson({ cases: (rows.results || []).map(publicCase) });
}

export async function onRequestPost({ request, env }) {
  const auth = await requireMutation(request, env);
  if (auth.error) return auth.error;
  const parsed = await readPortalJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data || {};

  const supplierName = cleanText(payload.supplierName, 240, true);
  const supplierUrl = cleanExternalUrl(payload.supplierUrl);
  const chineseLegalName = cleanText(payload.chineseLegalName, 240);
  const productCategory = cleanText(payload.productCategory, 240, true);
  const productModel = cleanText(payload.productModel, 300);
  const decisionContext = cleanText(payload.decisionContext, 2000, true);
  const requestedChecks = cleanText(payload.requestedChecks, 3000);
  const tier = TIERS.has(payload.tier) ? payload.tier : 'unsure';
  const consent = payload.consent === true;
  if ([supplierName, supplierUrl, chineseLegalName, productCategory, productModel, decisionContext, requestedChecks].includes(null) || !consent) {
    return portalJson({ error: 'validation_failed' }, 400);
  }

  const nowDate = new Date();
  const now = nowDate.toISOString();
  const cutoff = new Date(nowDate.getTime() - SUBMISSION_WINDOW_MS).toISOString();
  const db = portalDb(env);
  const initialLimit = caseLimitResponse(await caseLimitSnapshot(db, auth.session.user_id, nowDate), nowDate);
  if (initialLimit) return initialLimit;

  const caseId = `case_${randomToken(18)}`;
  const reference = `ZM-${nowDate.getUTCFullYear()}-${randomToken(6).toUpperCase()}`;
  const auditId = `evt_${randomToken(18)}`;
  await db.batch([
    db.prepare(`
      INSERT INTO portal_cases
        (id, public_reference, owner_user_id, service_tier, supplier_name, supplier_url, chinese_legal_name,
         product_category, product_model, decision_context, requested_checks, status, created_at, updated_at)
      SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, 'submitted', ?12, ?12
      WHERE (SELECT COUNT(*) FROM portal_cases WHERE owner_user_id = ?3 AND created_at >= ?13) < ?14
        AND (SELECT COUNT(*) FROM portal_cases WHERE owner_user_id = ?3 AND status NOT IN ('delivered', 'closed')) < ?15
    `).bind(caseId, reference, auth.session.user_id, tier, supplierName, supplierUrl, chineseLegalName, productCategory, productModel, decisionContext, requestedChecks, now, cutoff, SUBMISSION_LIMIT, OPEN_CASE_LIMIT),
    db.prepare(`
      INSERT INTO portal_audit_events (id, user_id, case_id, event_type, created_at)
      SELECT ?1, ?2, ?3, 'case_submitted', ?4
      WHERE EXISTS (SELECT 1 FROM portal_cases WHERE id = ?3 AND owner_user_id = ?2)
    `)
      .bind(auditId, auth.session.user_id, caseId, now)
  ]);

  const row = await db.prepare(`
    SELECT id, public_reference, service_tier, supplier_name, supplier_url, chinese_legal_name,
           product_category, product_model, decision_context, requested_checks, status, created_at, updated_at
    FROM portal_cases WHERE id = ?1 AND owner_user_id = ?2 LIMIT 1
  `).bind(caseId, auth.session.user_id).first();
  if (!row) {
    const concurrentLimit = caseLimitResponse(await caseLimitSnapshot(db, auth.session.user_id, nowDate), nowDate);
    return concurrentLimit || portalJson({ error: 'case_creation_limited' }, 429);
  }
  return portalJson({ case: publicCase(row) }, 201);
}

export function onRequest() {
  return portalJson({ error: 'method_not_allowed' }, 405);
}
