import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderPrototype } from './page.mjs';
import { serviceName, servicePrice, serviceTiming } from '../../shared/service-facts.mjs';
import { localizedServices } from '../../src/service-copy.mjs';

const html = renderPrototype();
const root = 'http://127.0.0.1:4174';
test('English-only preview has one primary heading and no production scripts/forms', () => {
  assert.match(html, /<html lang="en">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /name="robots" content="noindex,nofollow,noarchive"/);
  assert.doesNotMatch(html, /<form\b|stripe\.com|cloudflareinsights|\/api\/|site\.js|redesign\.css/);
});
test('commercial facts and limitations come from current shared sources', () => {
  for (const id of ['t1', 't2']) {
    assert.ok(html.includes(serviceName(id)));
    assert.ok(html.includes(servicePrice(id)));
    assert.ok(html.includes(serviceTiming(id)));
    assert.ok(html.includes(localizedServices('en').find(s => s.id === id).notIncluded));
  }
  const advanced = html.match(/<article class="advanced"[\s\S]*?<\/article>/)[0];
  assert.ok(advanced.includes(servicePrice('advanced')));
  assert.doesNotMatch(advanced, /USD\s*\d/);
});
test('all local anchors and disclosure controls target existing IDs', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), id);
  for (const [,id] of html.matchAll(/aria-controls="([^"]+)"/g)) assert.ok(ids.has(id), id);
});
test('three homepage language equivalents; no automatic language redirect', async () => {
  assert.match(html, /href="#main" lang="en" hreflang="en"/);
  assert.match(html, /href="https:\/\/zimonai.com\/zh-tw\/" lang="zh-TW"/);
  assert.match(html, /href="https:\/\/zimonai.com\/zh-cn\/" lang="zh-CN"/);
  const script = await readFile(new URL('./prototype.js', import.meta.url), 'utf8');
  assert.doesNotMatch(script, /navigator\.language|location\.replace|fetch\(|sendBeacon|XMLHttpRequest/);
});
test('real image provenance and report-material gap remain explicit', () => {
  assert.ok(html.includes('CC BY 2.0'));
  assert.ok(html.includes('Nenad Stojković'));
  assert.ok(html.includes('not a ZimonAI assignment'));
  assert.ok(html.includes('anonymized report interior is still needed'));
  assert.doesNotMatch(html, /2025010914746623|Shenzhen XX|HW90|HCW-90|CE certified for EU market/);
});
test('server is noindex, prevents connections/forms, and serves all referenced assets', async () => {
  const response = await fetch(root);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  assert.match(response.headers.get('content-security-policy'), /connect-src 'none'/);
  assert.match(response.headers.get('content-security-policy'), /form-action 'none'/);
  const assets = new Set([...html.matchAll(/(?:src|srcset|href)="(\/(?:assets\/|prototype\.)[^" ]+)"/g)].map(m => m[1]));
  for (const asset of assets) assert.equal((await fetch(`${root}${asset}`)).status, 200, asset);
});
test('non-home routes and all write methods are blocked', async () => {
  for (const path of ['/services/', '/methodology/', '/api/inquiries', '/.env']) assert.equal((await fetch(`${root}${path}`)).status, 404);
  for (const method of ['POST', 'PUT', 'DELETE']) assert.equal((await fetch(root, {method})).status, 405);
});
