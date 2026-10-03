import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { initializeQaMode } from '../src/assets/qa-mode.js';
import { isQaRequest } from '../functions/_lib/qa-mode.js';
import { onRequestPost as analytics } from '../functions/api/analytics.js';
import { onRequestPost as clientErrors } from '../functions/api/client-errors.js';
import { onRequestPost as inquiries } from '../functions/api/inquiries.js';

function browserState() {
  const data = new Map();
  let cookie = '';
  return {
    storage: { getItem: (key) => data.get(key) || null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) },
    document: { get cookie() { return cookie; }, set cookie(value) { cookie = value.includes('Max-Age=0') ? '' : value.split(';')[0]; } }
  };
}
function locationFor(query = '') {
  return new URL(`https://zimonai.com/zh-tw/request-verification/${query}`);
}

test('QA persists across pages and tabs with no identifier, and explicit exit restores normal mode', () => {
  const state = browserState();
  assert.equal(initializeQaMode(locationFor('?zimonai_qa=1'), state.document, () => state.storage), true);
  assert.equal(state.document.cookie, 'zimonai_qa=1');
  assert.equal(initializeQaMode(locationFor(), state.document, () => state.storage), true);
  assert.equal(initializeQaMode(locationFor(), state.document, () => browserState().storage), true);
  state.storage.setItem('zimonai_analytics_session', '1');
  assert.equal(initializeQaMode(locationFor('?zimonai_qa=0'), state.document, () => state.storage), false);
  assert.equal(state.storage.getItem('zimonai_analytics_session'), null);
  assert.equal(initializeQaMode(locationFor(), state.document, () => state.storage), false);
});

test('QA URL excludes this page even when cookie and tab storage are blocked', () => {
  const document = { get cookie() { throw Error('blocked'); }, set cookie(value) { throw Error('blocked'); } };
  assert.equal(initializeQaMode(locationFor('?zimonai_qa=1'), document, () => { throw Error('blocked'); }), true);
});

test('server QA excludes both telemetry endpoints and prevents public inquiry writes for every supported marker', async () => {
  for (const marker of [
    { headers: { Cookie: 'other=1; zimonai_qa=1' } },
    { headers: { 'X-Zimonai-QA': '1' } },
    { query: '?zimonai_qa=1' }
  ]) {
    for (const [path, handler] of [['analytics', analytics], ['client-errors', clientErrors], ['inquiries', inquiries]]) {
      let writes = 0;
      const request = new Request(`https://zimonai.com/api/${path}${marker.query || ''}`, {
        method: 'POST', headers: { Origin: 'https://zimonai.com', ...marker.headers }, body: '{}'
      });
      assert.equal(isQaRequest(request), true);
      const env = { ANALYTICS_DB: { prepare() { writes++; throw Error('unexpected write'); } }, PORTAL_DB: { prepare() { writes++; throw Error('unexpected write'); } } };
      const response = await handler({ request, env });
      assert.equal(response.status, path === 'inquiries' ? 409 : 204);
      if (path === 'inquiries') assert.equal((await response.json()).error, 'qa_submission_disabled');
      else assert.equal(response.headers.get('X-Zimonai-Telemetry'), 'excluded-qa');
      assert.equal(writes, 0);
    }
  }
  for (const cookie of ['zimonai_qa=10', 'other_zimonai_qa=1', 'zimonai_qa=0']) {
    assert.equal(isQaRequest(new Request('https://zimonai.com/api/analytics', { headers: { Cookie: cookie } })), false);
  }
});

test('actual client telemetry gates suppress page, session, CTA and error reporting in QA and DNT/GPC', () => {
  const source = readFileSync(new URL('../src/assets/site.js', import.meta.url), 'utf8');
  const telemetry = source.slice(source.indexOf('const reducedMotion'), source.indexOf('function navigationPerformanceBucket'));
  for (const mode of ['normal', 'qa', 'dnt', 'gpc']) {
    const sent = [];
    const state = browserState();
    const url = locationFor(mode === 'qa' ? '?zimonai_qa=1' : '');
    state.document.documentElement = { dataset: { page: 'request' } };
    state.document.referrer = '';
    const context = {
      initializeQaMode, observeDynamicCjkText() {}, location: url, document: state.document,
      window: { matchMedia: () => ({ matches: false }), addEventListener() {} },
      navigator: { doNotTrack: mode === 'dnt' ? '1' : '0', globalPrivacyControl: mode === 'gpc', sendBeacon: (url) => { sent.push(url); return true; } },
      sessionStorage: state.storage, URL, Blob,
      fetch() { throw Error('unexpected fallback'); }
    };
    vm.runInNewContext(`${telemetry}\ntrackAnalytics('cta_click', 'discuss_requirement'); reportClientError({kind: 'runtime'});`, context);
    assert.deepEqual(sent, mode === 'normal' ? ['/api/analytics', '/api/analytics', '/api/analytics', '/api/client-errors'] : []);
  }
});
