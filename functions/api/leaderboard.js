/**
 * GET /api/leaderboard?days=1|7|30
 *
 * Returns daily country pageview ranking, aggregated across the
 * requested window. Reads aggregated buckets created by /api/track.
 *
 * KV binding required: ZA_STATS
 */
function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'access-control-allow-origin': '*',
      ...extraHeaders
    }
  });
}

function utcDateStr(d) {
  return d.toISOString().slice(0, 10);
}

function shiftUTC(d, days) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const requestedDays = parseInt(url.searchParams.get('days') || '1', 10);
  const days = Math.min(60, Math.max(1, isFinite(requestedDays) ? requestedDays : 1));

  if (!env.ZA_STATS) {
    return jsonResponse({
      ok: false,
      configured: false,
      reason: 'kv_not_bound',
      message:
        'KV namespace ZA_STATS is not bound to this Pages project. ' +
        'Create one in Cloudflare Dashboard and bind it under Pages → Settings → Functions.'
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
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}
