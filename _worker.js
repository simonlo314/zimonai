/**
 * Cloudflare Workers Static Assets entry.
 *
 * Routes API requests to KV-backed analytics handlers, and falls through
 * to env.ASSETS.fetch(request) for the static site files.
 *
 * Required bindings (configured in Cloudflare Dashboard):
 *   - ASSETS    (auto-bound for Workers Static Assets)
 *   - ZA_STATS  (KV namespace, see Pages → Settings → Bindings)
 */

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      ...extraHeaders
    }
  });
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function utcDateStr(d) {
  return d.toISOString().slice(0, 10);
}

function shiftUTC(d, days) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

// ── POST /api/track ─────────────────────────────────────────────────────────
async function handleTrack(request, env) {
  const country = (request.headers.get('cf-ipcountry') || 'XX').toUpperCase();

  if (!env.ZA_STATS) {
    return jsonResponse({
      ok: true,
      tracked: false,
      reason: 'kv_not_bound',
      country
    }, 200, { 'cache-control': 'no-store' });
  }

  const date = todayUTC();
  const key = `cv:${date}`;

  try {
    const raw = await env.ZA_STATS.get(key);
    const data = raw ? JSON.parse(raw) : {};
    data[country] = (data[country] || 0) + 1;

    await env.ZA_STATS.put(key, JSON.stringify(data), {
      expirationTtl: 60 * 60 * 24 * 90
    });

    return jsonResponse({ ok: true, tracked: true, country, date }, 200, {
      'cache-control': 'no-store'
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500, {
      'cache-control': 'no-store'
    });
  }
}

// ── GET /api/leaderboard?days=1|7|30 ────────────────────────────────────────
async function handleLeaderboard(request, env) {
  const url = new URL(request.url);
  const requested = parseInt(url.searchParams.get('days') || '1', 10);
  const days = Math.min(60, Math.max(1, isFinite(requested) ? requested : 1));

  if (!env.ZA_STATS) {
    return jsonResponse({
      ok: false,
      configured: false,
      reason: 'kv_not_bound',
      message:
        'KV namespace ZA_STATS is not bound to this project. ' +
        'Bind it in Cloudflare Dashboard → zimonai-pages → Settings → Bindings.'
    });
  }

  const today = new Date();
  const totals = {};
  const daily = [];

  try {
    for (let i = 0; i < days; i++) {
      const d = shiftUTC(today, -i);
      const date = utcDateStr(d);
      const raw = await env.ZA_STATS.get(`cv:${date}`);
      const dayData = raw ? JSON.parse(raw) : {};
      const dayTotal = Object.values(dayData).reduce((a, b) => a + Number(b || 0), 0);
      daily.push({ date, total: dayTotal, countries: dayData });

      for (const [c, n] of Object.entries(dayData)) {
        totals[c] = (totals[c] || 0) + Number(n || 0);
      }
    }

    const ranking = Object.entries(totals)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);

    const total = ranking.reduce((a, x) => a + x.count, 0);

    return jsonResponse({
      ok: true,
      configured: true,
      days,
      total,
      uniqueCountries: ranking.length,
      ranking,
      daily
    }, 200, { 'cache-control': 'public, max-age=60' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function corsPreflight() {
  return new Response(null, {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400'
    }
  });
}

// ── Worker entry ────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === '/api/track') {
      if (method === 'POST') return handleTrack(request, env);
      if (method === 'OPTIONS') return corsPreflight();
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (path === '/api/leaderboard') {
      if (method === 'GET') return handleLeaderboard(request, env);
      if (method === 'OPTIONS') return corsPreflight();
      return new Response('Method Not Allowed', { status: 405 });
    }

    return env.ASSETS.fetch(request);
  }
};
