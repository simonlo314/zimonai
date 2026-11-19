import assert from 'node:assert/strict';
import test from 'node:test';
import { serviceNotes } from '../src/knowledge-service-notes.mjs';
import { renderPage } from '../src/template.mjs';

const selected = {
  indiaBisCrsAdapterRegistration: 'knowledge-india-bis-crs-adapter-registration',
  euCommonChargerRules: 'knowledge-eu-common-charger-rules',
  ieceeCbCertificate: 'knowledge-iecee-cb-certificate'
};

test('only the selected document guides and languages get in-body service links', () => {
  assert.deepEqual(Object.keys(serviceNotes).sort(), Object.keys(selected).sort());
  for (const [key, id] of Object.entries(selected)) {
    assert.deepEqual(Object.keys(serviceNotes[key]).sort(), ['en', 'zh-tw']);
    for (const locale of ['en', 'zh-tw']) {
      const html = renderPage(locale, id);
      const prefix = locale === 'en' ? '' : '/zh-tw';
      const [note] = html.match(/<aside id="document-review"[\s\S]*?<\/aside>/g) ?? [];
      assert.ok(note);
      assert.equal(html.split('id="document-review"').length, 2);
      assert.ok(html.indexOf('id="section-1"') < html.indexOf(note));
      assert.ok(html.indexOf(note) < html.indexOf('id="section-2"'));
      assert.ok(html.indexOf('href="#document-review"') < html.indexOf('id="section-1"'));
      assert.ok(note.includes(`href="${prefix}/services/#t1"`));
      assert.ok(note.includes(`href="${prefix}/request-verification/?service=t1"`));
    }
    assert.doesNotMatch(renderPage('zh-cn', id), /id="document-review"|href="#document-review"/);
  }
  assert.doesNotMatch(renderPage('en', 'knowledge-anker-maggo-2-pro-qi2'), /id="document-review"|href="#document-review"/);
});
