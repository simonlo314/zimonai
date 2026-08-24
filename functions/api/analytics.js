const ALLOWED_EVENTS = new Set([
  'page_view',
  'session_start',
  'cta_click',
  'tier_select',
  'contact_click',
  'language_select',
  'nav_click',
  'demo_run',
  'evidence_tab',
  'request_draft',
  'request_submit',
  'support_open',
  'checkout_start',
  'checkout_error',
  'payment_confirmed',
  'post_payment_intake',
  'navigation_performance'
]);

const NAVIGATION_PERFORMANCE_TARGETS = new Set([
  'ttfb:0000-0199',
  'ttfb:0200-0499',
  'ttfb:0500-0999',
  'ttfb:1000-1999',
  'ttfb:2000-4999',
  'ttfb:5000-14999',
  'ttfb:15000-plus',
  'duration:0000-0199',
  'duration:0200-0499',
  'duration:0500-0999',
  'duration:1000-1999',
  'duration:2000-4999',
  'duration:5000-14999',
  'duration:15000-plus'
]);
const ANALYTICS_FIELDS = new Set(['event', 'target', 'page', 'referrer', 'device']);
const MAX_BODY_BYTES = 2048;

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

function cleanToken(value, max = 80) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9_./:+-]/g, '')
    .slice(0, max);
}

function cleanPath(value) {
  const path = String(value || '/').split(/[?#]/)[0];
  if (!path.startsWith('/') || path.length > 180) return '/';
  return path.replace(/[^a-zA-Z0-9_./-]/g, '') || '/';
}

function localeFor(path) {
  if (path.startsWith('/zh-tw/')) return 'zh-tw';
  if (path.startsWith('/zh-cn/')) return 'zh-cn';
  return 'en';
}

function referrerGroup(raw) {
  if (!raw) return 'direct';
  try {
    const host = new URL(raw).hostname.toLowerCase();
    if (host === 'zimonai.com' || host === 'www.zimonai.com') return 'internal';
    return cleanToken(host, 100) || 'other';
  } catch {
    return 'other';
  }
}

function emptyResponse(status = 204) {
  return new Response(null, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex'
    }
  });
}

async function readBoundedJson(request) {
  const mediaType = String(request.headers.get('Content-Type') || '')
    .split(';', 1)[0]
    .trim()
    .toLowerCase();
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
        // The byte limit has already been enforced; cancellation is best-effort.
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

function validAnalyticsPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  const keys = Object.keys(payload);
  return keys.length === ANALYTICS_FIELDS.size
    && keys.every((key) => ANALYTICS_FIELDS.has(key))
    && keys.every((key) => typeof payload[key] === 'string');
}

export async function onRequestPost({ request, env }) {
  if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return emptyResponse();

  const origin = request.headers.get('Origin');
  if (origin !== 'https://zimonai.com' && origin !== 'https://www.zimonai.com') return emptyResponse(403);
  if (!env.ANALYTICS_DB) return emptyResponse(503);

  const parsed = await readBoundedJson(request);
  if (parsed.error) return parsed.error;
  const payload = parsed.data;
  if (!validAnalyticsPayload(payload)) return emptyResponse(400);

  const eventName = cleanToken(payload.event, 40);
  if (!ALLOWED_EVENTS.has(eventName)) return emptyResponse(400);

  const pagePath = cleanPath(payload.page);
  const target = cleanToken(payload.target, 80);
  if (eventName === 'navigation_performance' && !NAVIGATION_PERFORMANCE_TARGETS.has(target)) {
    return emptyResponse(400);
  }
  const device = ['mobile', 'tablet', 'desktop'].includes(payload.device) ? payload.device : 'desktop';
  const referrer = referrerGroup(payload.referrer);

  await env.ANALYTICS_DB.prepare(`
    INSERT INTO daily_events
      (event_date, event_name, page_path, locale, target, referrer, device, count)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT (event_date, event_name, page_path, locale, target, referrer, device)
    DO UPDATE SET count = count + 1, updated_at = CURRENT_TIMESTAMP
  `).bind(
    taipeiDate(), eventName, pagePath, localeFor(pagePath), target, referrer, device
  ).run();

  return emptyResponse();
}

export function onRequest() {
  return emptyResponse(405);
}
