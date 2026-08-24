import {
  cleanExternalUrl,
  cleanText,
  normalizeEmail,
  randomToken
} from './auth.js';

const encoder = new TextEncoder();

export const INQUIRY_STATUSES = new Set(['new', 'contacted', 'qualified', 'closed', 'spam']);
export const INQUIRY_ALLOWED_FIELDS = new Set([
  'locale',
  'name',
  'email',
  'company',
  'supplier',
  'url',
  'chinese',
  'product',
  'question',
  'consent',
  'website'
]);

export const INQUIRY_IP_WINDOW_MS = 30 * 60 * 1000;
export const INQUIRY_IP_WINDOW_LIMIT = 8;
export const INQUIRY_EMAIL_WINDOW_MS = 60 * 60 * 1000;
export const INQUIRY_EMAIL_WINDOW_LIMIT = 4;

function plainObject(value) {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

export function parseInquiryPayload(payload) {
  if (!plainObject(payload)) return { error: 'validation_failed' };
  if (Object.keys(payload).some((key) => !INQUIRY_ALLOWED_FIELDS.has(key))) {
    return { error: 'validation_failed' };
  }
  for (const field of ['locale', 'name', 'email', 'company', 'supplier', 'url', 'chinese', 'product', 'question', 'website']) {
    if (payload[field] !== undefined && typeof payload[field] !== 'string') {
      return { error: 'validation_failed' };
    }
  }

  const honeypot = cleanText(payload.website, 200);
  if (honeypot === null) return { error: 'validation_failed' };
  if (honeypot) return { honeypot: true };

  const locale = String(payload.locale || '');
  const email = normalizeEmail(payload.email);
  const name = cleanText(payload.name, 120, true);
  const company = cleanText(payload.company, 180);
  const supplier = cleanText(payload.supplier, 240, true);
  const supplierUrl = cleanExternalUrl(payload.url);
  const chineseLegalName = cleanText(payload.chinese, 240);
  const product = cleanText(payload.product, 240, true);
  const question = cleanText(payload.question, 4000, true);
  if (!['en', 'zh-tw', 'zh-cn'].includes(locale)
    || !email || !name || company === null || !supplier || supplierUrl === null
    || chineseLegalName === null || !product || !question || payload.consent !== true) {
    return { error: 'validation_failed' };
  }
  return {
    data: {
      locale,
      name,
      emailDisplay: email.display,
      emailNormalized: email.normalized,
      company,
      supplier,
      supplierUrl,
      chineseLegalName,
      product,
      question
    }
  };
}

export function inquiryReference(now = new Date()) {
  const year = now.getUTCFullYear();
  return `ZMR-${year}-${randomToken(6).toUpperCase()}`;
}

export function inquiryId() {
  return `inq_${randomToken(18)}`;
}

function hashSecret(env) {
  return String(
    env.INQUIRY_RATE_LIMIT_SECRET
    || env.PORTAL_SESSION_SECRET
    || env.AUTH_SESSION_SECRET
    || ''
  );
}

export async function inquiryPrivacyHash(value, env) {
  const secret = hashSecret(env);
  if (encoder.encode(secret).byteLength < 32) throw new Error('inquiry_hash_secret_not_configured');
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(String(value))));
  let binary = '';
  for (const byte of signature) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function windowValues(now, durationMs) {
  const startMs = Math.floor(now.getTime() / durationMs) * durationMs;
  return {
    start: new Date(startMs).toISOString(),
    expires: new Date(startMs + durationMs).toISOString(),
    retryAfter: Math.max(1, Math.ceil((startMs + durationMs - now.getTime()) / 1000))
  };
}

function rateLimitStatement(db, { scope, keyHash, window, limit, timestamp }) {
  return db.prepare(`
    INSERT INTO public_inquiry_rate_limits
      (scope, key_hash, window_start, request_count, expires_at, updated_at)
    VALUES (?1, ?2, ?3, 1, ?4, ?5)
    ON CONFLICT(scope, key_hash, window_start) DO UPDATE SET
      request_count = public_inquiry_rate_limits.request_count + 1,
      updated_at = excluded.updated_at
    WHERE public_inquiry_rate_limits.request_count < ?6
  `).bind(scope, keyHash, window.start, window.expires, timestamp, limit);
}

export async function admitInquiry(db, request, emailNormalized, env, now = new Date()) {
  const rawIp = String(request.headers.get('CF-Connecting-IP') || 'unavailable').slice(0, 128);
  const [ipHash, emailHash] = await Promise.all([
    inquiryPrivacyHash(`public-inquiry-ip:${rawIp}`, env),
    inquiryPrivacyHash(`public-inquiry-email:${emailNormalized}`, env)
  ]);
  const ipWindow = windowValues(now, INQUIRY_IP_WINDOW_MS);
  const emailWindow = windowValues(now, INQUIRY_EMAIL_WINDOW_MS);
  const timestamp = now.toISOString();
  // Each quota increment is one conditional UPSERT and D1 executes the batch
  // transactionally. Concurrent requests therefore cannot all pass a separate
  // read-before-write count check.
  const results = await db.batch([
    rateLimitStatement(db, {
      scope: 'ip', keyHash: ipHash, window: ipWindow,
      limit: INQUIRY_IP_WINDOW_LIMIT, timestamp
    }),
    rateLimitStatement(db, {
      scope: 'email', keyHash: emailHash, window: emailWindow,
      limit: INQUIRY_EMAIL_WINDOW_LIMIT, timestamp
    })
  ]);
  const admitted = results.every((result) => Number(result?.meta?.changes || 0) === 1);
  return {
    admitted,
    retryAfter: Math.max(ipWindow.retryAfter, emailWindow.retryAfter)
  };
}

export function pruneInquiryRateLimits(db, now = new Date()) {
  return db.prepare(`
    DELETE FROM public_inquiry_rate_limits
    WHERE rowid IN (
      SELECT rowid FROM public_inquiry_rate_limits
      WHERE expires_at < ?1
      ORDER BY expires_at ASC
      LIMIT 100
    )
  `).bind(now.toISOString()).run();
}

export function publicInquiry(row) {
  return {
    id: row.id,
    reference: row.public_reference,
    locale: row.locale,
    name: row.contact_name,
    email: row.contact_email,
    company: row.company_name || '',
    supplier: row.supplier_name,
    url: row.supplier_url || '',
    chinese: row.chinese_legal_name || '',
    product: row.product_category,
    question: row.question,
    consentAt: row.consent_at,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
