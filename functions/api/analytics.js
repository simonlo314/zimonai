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
  'request_draft'
]);

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

export async function onRequestPost({ request, env }) {
  if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return emptyResponse();

  const origin = request.headers.get('Origin');
  if (origin !== 'https://zimonai.com' && origin !== 'https://www.zimonai.com') return emptyResponse(403);
  if (Number(request.headers.get('Content-Length') || 0) > 2048) return emptyResponse(413);
  if (!env.ANALYTICS_DB) return emptyResponse(503);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return emptyResponse(400);
  }

  const eventName = cleanToken(payload.event, 40);
  if (!ALLOWED_EVENTS.has(eventName)) return emptyResponse(400);

  const pagePath = cleanPath(payload.page);
  const target = cleanToken(payload.target, 80);
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
