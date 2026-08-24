const ALLOWED_KINDS = new Set(['runtime', 'promise', 'resource']);
const ALLOWED_CATEGORIES = new Set([
  'type',
  'reference',
  'syntax',
  'range',
  'security',
  'network',
  'abort',
  'aggregate',
  'load',
  'unknown'
]);
const ALLOWED_RESOURCE_TYPES = new Set([
  'none',
  'script',
  'stylesheet',
  'image',
  'media',
  'iframe',
  'other'
]);
const ALLOWED_BROWSERS = new Set(['edge', 'firefox', 'chrome', 'safari', 'other']);
const PUBLIC_ROUTE_GROUPS = new Set([
  'services',
  'knowledge',
  'methodology',
  'scope-limitations',
  'about',
  'request-verification',
  'payments',
  'payment-success',
  'payment-terms',
  'privacy'
]);
const EXPECTED_FIELDS = new Set(['kind', 'category', 'resourceType', 'browser', 'page']);
const MAX_BODY_BYTES = 1024;
const HOURLY_REPORT_LIMIT = 300;

function emptyResponse(status = 204, extraHeaders = {}) {
  return new Response(null, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
      ...extraHeaders
    }
  });
}

function taipeiDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function utcHour() {
  return `${new Date().toISOString().slice(0, 13)}:00:00Z`;
}

function groupedPagePath(value) {
  const raw = String(value || '').split(/[?#]/, 1)[0];
  if (!raw.startsWith('/') || raw.length > 180 || /[^a-zA-Z0-9_./-]/.test(raw)) return '/other/';
  const segments = raw.split('/').filter(Boolean);
  const locale = ['zh-tw', 'zh-cn'].includes(segments[0]) ? segments.shift() : '';
  const prefix = locale ? `/${locale}` : '';
  const section = segments.shift() || '';
  if (section === 'portal' || section === 'admin') return null;
  if (!section) return `${prefix}/`;
  if (!PUBLIC_ROUTE_GROUPS.has(section)) return `${prefix}/other/`;
  if (section === 'knowledge' && segments.length) return `${prefix}/knowledge/article/`;
  return `${prefix}/${section}/`;
}

function localeFor(path) {
  if (path.startsWith('/zh-tw/')) return 'zh-tw';
  if (path.startsWith('/zh-cn/')) return 'zh-cn';
  return 'en';
}

async function readBoundedJson(request) {
  const mediaType = String(request.headers.get('Content-Type') || '').split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') return { error: emptyResponse(415) };
  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return { error: emptyResponse(413) };
  if (!request.body) return { error: emptyResponse(400) };

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      try {
        await reader.cancel('request_too_large');
      } catch {
        // The body limit has already been enforced; cancellation is best-effort.
      }
      return { error: emptyResponse(413) };
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { data: JSON.parse(new TextDecoder().decode(body)) };
  } catch {
    return { error: emptyResponse(400) };
  }
}

function validatedEvent(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const keys = Object.keys(payload);
  if (keys.length !== EXPECTED_FIELDS.size || keys.some((key) => !EXPECTED_FIELDS.has(key))) return null;
  if (!ALLOWED_KINDS.has(payload.kind)
    || !ALLOWED_CATEGORIES.has(payload.category)
    || !ALLOWED_RESOURCE_TYPES.has(payload.resourceType)
    || !ALLOWED_BROWSERS.has(payload.browser)) return null;

  if (payload.kind === 'resource') {
    if (payload.category !== 'load' || payload.resourceType === 'none') return null;
  } else if (payload.category === 'load' || payload.resourceType !== 'none') {
    return null;
  }

  const pagePath = groupedPagePath(payload.page);
  if (!pagePath) return { excluded: true };
  return {
    pagePath,
    locale: localeFor(pagePath),
    kind: payload.kind,
    category: payload.category,
    resourceType: payload.resourceType,
    browser: payload.browser
  };
}

export async function onRequestPost({ request, env }) {
  if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return emptyResponse();
  const origin = request.headers.get('Origin');
  if (origin !== 'https://zimonai.com' && origin !== 'https://www.zimonai.com') return emptyResponse(403);
  if (!env.ANALYTICS_DB) return emptyResponse(503);

  const parsed = await readBoundedJson(request);
  if (parsed.error) return parsed.error;
  const event = validatedEvent(parsed.data);
  if (!event) return emptyResponse(400);
  if (event.excluded) return emptyResponse();

  try {
    const admitted = await env.ANALYTICS_DB.prepare(`
      INSERT INTO client_error_rate_limits (window_start, count, updated_at)
      VALUES (?1, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(window_start) DO UPDATE SET
        count = client_error_rate_limits.count + 1,
        updated_at = CURRENT_TIMESTAMP
      WHERE client_error_rate_limits.count < ?2
      RETURNING count
    `).bind(utcHour(), HOURLY_REPORT_LIMIT).first();
    if (!admitted) return emptyResponse(429, { 'Retry-After': '3600' });

    await env.ANALYTICS_DB.prepare(`
      INSERT INTO client_error_events
        (event_date, page_path, locale, error_kind, error_category, resource_type, browser_family, count)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 1)
      ON CONFLICT (event_date, page_path, locale, error_kind, error_category, resource_type, browser_family)
      DO UPDATE SET count = client_error_events.count + 1, updated_at = CURRENT_TIMESTAMP
    `).bind(
      taipeiDate(),
      event.pagePath,
      event.locale,
      event.kind,
      event.category,
      event.resourceType,
      event.browser
    ).run();
  } catch {
    return emptyResponse(503);
  }

  return emptyResponse();
}

export function onRequest() {
  return emptyResponse(405, { Allow: 'POST' });
}
