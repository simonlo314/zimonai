/**
 * POST /api/track
 *
 * Lightweight pageview tracker.
 * Records ONE counter per (date, country) into Cloudflare KV.
 * No IP, no user agent, no fingerprint — just a country code from
 * Cloudflare's CF-IPCountry header. Privacy-friendly by design.
 *
 * KV binding required: ZA_STATS
 *   (Cloudflare Dashboard → Pages → zimonai-pages → Settings →
 *    Functions → KV namespace bindings)
 *
 * Schema:
 *   key:   cv:YYYY-MM-DD      (UTC date)
 *   value: { "US": 12, "TW": 31, ... }
 *   ttl:   90 days (auto-expire historical buckets)
 */
function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*'
    }
  });
}

export async function onRequestPost({ request, env }) {
  // Country comes from Cloudflare edge — no client input trusted.
  const country = (request.headers.get('cf-ipcountry') || 'XX').toUpperCase();

  if (!env.ZA_STATS) {
    return jsonResponse({
      ok: true,
      tracked: false,
      reason: 'kv_not_bound',
      country
    });
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

    return jsonResponse({ ok: true, tracked: true, country, date });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type'
    }
  });
}
