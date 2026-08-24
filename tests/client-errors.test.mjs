import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { onRequest as rejectClientErrorMethod, onRequestPost as recordClientError } from '../functions/api/client-errors.js';
import { onRequestPost as recordAnalytics } from '../functions/api/analytics.js';

class Statement {
  constructor(statement) {
    this.statement = statement;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    return this.statement.get(...this.values) || null;
  }

  async run() {
    const result = this.statement.run(...this.values);
    return { meta: { changes: Number(result.changes || 0) } };
  }
}

class AnalyticsD1 {
  constructor() {
    this.raw = new DatabaseSync(':memory:');
    this.raw.exec(readFileSync(new URL('../migrations/0001_analytics.sql', import.meta.url), 'utf8'));
    this.raw.exec(readFileSync(new URL('../migrations/0004_client_errors.sql', import.meta.url), 'utf8'));
  }

  prepare(sql) {
    return new Statement(this.raw.prepare(sql));
  }

  close() {
    this.raw.close();
  }
}

const validPayload = {
  kind: 'runtime',
  category: 'type',
  resourceType: 'none',
  browser: 'safari',
  page: '/zh-tw/knowledge/fcc-id-verification/'
};

function clientErrorRequest(payload = validPayload, {
  origin = 'https://zimonai.com',
  contentType = 'application/json',
  extraHeaders = {}
} = {}) {
  return new Request('https://zimonai.com/api/client-errors', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': contentType, ...extraHeaders },
    body: JSON.stringify(payload)
  });
}

function analyticsRequest(payload, { contentType = 'application/json', body } = {}) {
  return new Request('https://zimonai.com/api/analytics', {
    method: 'POST',
    headers: { Origin: 'https://zimonai.com', 'Content-Type': contentType },
    body: body ?? JSON.stringify(payload)
  });
}

test('client errors are stored only as low-cardinality aggregate dimensions', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const env = { ANALYTICS_DB: db };

  assert.equal((await recordClientError({ request: clientErrorRequest(), env })).status, 204);
  assert.equal((await recordClientError({ request: clientErrorRequest(), env })).status, 204);

  const row = db.raw.prepare('SELECT * FROM client_error_events').get();
  assert.equal(row.page_path, '/zh-tw/knowledge/article/');
  assert.equal(row.locale, 'zh-tw');
  assert.equal(row.error_kind, 'runtime');
  assert.equal(row.error_category, 'type');
  assert.equal(row.resource_type, 'none');
  assert.equal(row.browser_family, 'safari');
  assert.equal(row.count, 2);
  assert.deepEqual(
    db.raw.prepare('PRAGMA table_info(client_error_events)').all().map((column) => column.name),
    ['event_date', 'page_path', 'locale', 'error_kind', 'error_category', 'resource_type', 'browser_family', 'count', 'updated_at']
  );
});

test('client error endpoint enforces exact origin, JSON, field allowlist and cross-field rules', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const env = { ANALYTICS_DB: db };

  assert.equal((await recordClientError({
    request: clientErrorRequest(validPayload, { origin: 'https://zimonai.com.evil.example' }), env
  })).status, 403);
  assert.equal((await recordClientError({
    request: clientErrorRequest(validPayload, { contentType: 'text/plain' }), env
  })).status, 415);
  assert.equal((await recordClientError({
    request: clientErrorRequest({ ...validPayload, message: 'must never be collected' }), env
  })).status, 400);
  assert.equal((await recordClientError({
    request: clientErrorRequest({ ...validPayload, kind: 'resource', resourceType: 'script' }), env
  })).status, 400);
  assert.equal((await recordClientError({
    request: clientErrorRequest({ ...validPayload, page: '/portal/' }), env
  })).status, 204);
  assert.equal((await recordClientError({
    request: clientErrorRequest(validPayload, { extraHeaders: { DNT: '1' } }), env
  })).status, 204);
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM client_error_events').get().count, 0);

  const method = rejectClientErrorMethod();
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('Allow'), 'POST');
});

test('client error endpoint measures chunked bodies instead of trusting Content-Length', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"kind":"runtime","padding":"'));
      controller.enqueue(new Uint8Array(1200));
      controller.enqueue(new TextEncoder().encode('"}'));
      controller.close();
    }
  });
  const request = new Request('https://zimonai.com/api/client-errors', {
    method: 'POST',
    headers: { Origin: 'https://zimonai.com', 'Content-Type': 'application/json' },
    body: stream,
    duplex: 'half'
  });
  assert.equal((await recordClientError({ request, env: { ANALYTICS_DB: db } })).status, 413);
});

test('client error endpoint applies an anonymous site-wide hourly admission limit', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const hour = `${new Date().toISOString().slice(0, 13)}:00:00Z`;
  db.raw.prepare('INSERT INTO client_error_rate_limits (window_start, count) VALUES (?, ?)').run(hour, 300);

  const response = await recordClientError({
    request: clientErrorRequest(),
    env: { ANALYTICS_DB: db }
  });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '3600');
  assert.equal(db.raw.prepare('SELECT COUNT(*) AS count FROM client_error_events').get().count, 0);
});

test('navigation performance accepts only fixed buckets and does not alter weekly event categories', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const env = { ANALYTICS_DB: db };
  const base = {
    event: 'navigation_performance',
    page: '/services/',
    referrer: '',
    device: 'desktop'
  };

  assert.equal((await recordAnalytics({
    request: analyticsRequest({ ...base, target: 'ttfb:0500-0999' }), env
  })).status, 204);
  assert.equal((await recordAnalytics({
    request: analyticsRequest({ ...base, target: 'ttfb:837' }), env
  })).status, 400);
  const rows = db.raw.prepare("SELECT event_name, target, count FROM daily_events WHERE event_name = 'navigation_performance'").all();
  assert.deepEqual(rows.map((row) => ({ ...row })), [
    { event_name: 'navigation_performance', target: 'ttfb:0500-0999', count: 1 }
  ]);
});

test('analytics endpoint enforces JSON, its field allowlist and the actual streamed body limit', async (t) => {
  const db = new AnalyticsD1();
  t.after(() => db.close());
  const env = { ANALYTICS_DB: db };
  const valid = {
    event: 'page_view',
    target: '',
    page: '/zh-tw/services/',
    referrer: '',
    device: 'mobile'
  };

  assert.equal((await recordAnalytics({
    request: analyticsRequest(valid), env
  })).status, 204);
  assert.equal(db.raw.prepare("SELECT count FROM daily_events WHERE event_name = 'page_view'").get().count, 1);

  assert.equal((await recordAnalytics({
    request: analyticsRequest(valid, { contentType: 'text/plain' }), env
  })).status, 415);
  assert.equal((await recordAnalytics({
    request: analyticsRequest({ ...valid, padding: 'must not be accepted' }), env
  })).status, 400);

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"event":"page_view","target":"","page":"/","referrer":"","device":"desktop","padding":"'));
      controller.enqueue(new Uint8Array(3000));
      controller.enqueue(new TextEncoder().encode('"}'));
      controller.close();
    }
  });
  const chunked = new Request('https://zimonai.com/api/analytics', {
    method: 'POST',
    headers: { Origin: 'https://zimonai.com', 'Content-Type': 'application/json' },
    body: stream,
    duplex: 'half'
  });
  assert.equal((await recordAnalytics({ request: chunked, env })).status, 413);
  assert.equal(db.raw.prepare("SELECT count FROM daily_events WHERE event_name = 'page_view'").get().count, 1);
});

test('public client code has no delayed link interception and caps de-identified reporting', () => {
  const source = readFileSync(new URL('../src/assets/site.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /transition\.className\s*=\s*['"]page-transition/);
  assert.doesNotMatch(source, /is-leaving/);
  assert.doesNotMatch(source, /setTimeout\([^)]*180/);
  assert.match(source, /clientErrorReportCount >= 5/);
  assert.match(source, /reportedClientErrors\.has\(signature\)/);
  assert.match(source, /navigator\.sendBeacon\('\/api\/client-errors'/);
  assert.match(source, /keepalive:\s*true/);
  assert.match(source, /zimonai_navigation_performance_reported/);
  assert.doesNotMatch(source.slice(0, source.indexOf('const analyticsEnabled')), /stack|email|stripe|searchParams/i);
});
