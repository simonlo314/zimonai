import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { knowledgeArticleSpecs, knowledgeContent } from '../src/knowledge-content.mjs';
import { renderPage } from '../src/template.mjs';

const siteJs = await readFile(new URL('../src/assets/site.js', import.meta.url), 'utf8');
const siteCss = await readFile(new URL('../src/assets/site.css', import.meta.url), 'utf8');
const searchHelpers = siteJs.slice(
  siteJs.indexOf('function normalizeKnowledgeSearchText'),
  siteJs.indexOf('async function initializeKnowledgeIndex')
);

function searchableStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(searchableStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(searchableStrings);
  return [];
}

function searchApi(htmlLang) {
  const context = { document: { documentElement: { lang: htmlLang } } };
  vm.runInNewContext(`${searchHelpers}\nthis.api = { normalizeKnowledgeSearchText, knowledgeQueryGroups, knowledgeRecordHaystack };`, context);
  return context.api;
}

function matchingIds(locale, htmlLang, query, product = '', market = '') {
  const api = searchApi(htmlLang);
  const groups = api.knowledgeQueryGroups(query);
  return knowledgeArticleSpecs.filter((spec) => {
    const article = knowledgeContent[locale].articles[spec.key];
    const searchText = api.normalizeKnowledgeSearchText(searchableStrings({
      article,
      sources: spec.sources,
      keywords: spec.keywords[locale]
    }).join(' '));
    const haystack = api.knowledgeRecordHaystack({
      searchText,
      title: article.title,
      topic: article.topic,
      description: article.description,
      keywords: spec.keywords[locale]
    });
    return groups.every((group) => group.some((token) => haystack.includes(token)))
      && (!product || spec.products.includes(product))
      && (!market || spec.markets.includes(market));
  }).map((spec) => spec.id);
}

test('knowledge hub and category pages expose progressive, crawlable collection UI', () => {
  const hub = renderPage('zh-tw', 'knowledge');
  assert.match(hub, /data-knowledge-index-url="\/assets\/knowledge-index-zh-tw\.json"/);
  assert.match(hub, /<h2 class="sr-only" id="knowledge-index-title">搜尋查核文章<\/h2>/);
  assert.match(hub, /href="\/zh-tw\/knowledge\/supplier-identity\/"/);
  assert.doesNotMatch(hub, /\/knowledge\/factory-onsite\//);
  assert.doesNotMatch(hub, /document\.documentElement\.classList\.add\('js'\)/);

  const category = renderPage('en', 'knowledge-category-supplier-identity');
  assert.match(category, /<link rel="canonical" href="https:\/\/zimonai\.com\/knowledge\/supplier-identity\/">/);
  assert.match(category, /<body class="page-public page-public--knowledge page-public--knowledge-category">/);
  const schema = JSON.parse(category.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const page = schema['@graph'].find((entry) => entry['@type'] === 'CollectionPage');
  const list = schema['@graph'].find((entry) => entry['@type'] === 'ItemList');
  assert.equal(page.url, 'https://zimonai.com/knowledge/supplier-identity/');
  assert.equal(list.numberOfItems, 1);
  assert.equal(list.itemListElement[0].url, 'https://zimonai.com/knowledge/chinese-supplier-legal-entity/');
});

test('knowledge search normalizes codes, full-width forms and power-bank aliases', () => {
  for (const query of ['USBIF', 'USB-IF', 'ＵＳＢ－ＩＦ']) {
    assert.ok(matchingIds('zh-tw', 'zh-Hant', query).includes('knowledge-usb-if-certification'), query);
  }
  assert.ok(matchingIds('zh-tw', 'zh-Hant', 'GaN 充電器').includes('knowledge-usb-if-certification'));
  assert.ok(matchingIds('zh-cn', 'zh-Hans', 'USB PD 充电器').includes('knowledge-usb-if-certification'));
  for (const query of ['FCCID', 'FCC-ID', 'ＦＣＣ　ＩＤ']) {
    assert.ok(matchingIds('zh-tw', 'zh-Hant', query).includes('knowledge-fcc-id'), query);
  }
  for (const query of ['UN 38.3', 'UN38．3', 'UN383']) {
    assert.ok(matchingIds('zh-tw', 'zh-Hant', query).includes('knowledge-un38-3'), query);
  }
  for (const query of ['充電寶', '行動電源']) {
    assert.ok(matchingIds('zh-tw', 'zh-Hant', query).includes('knowledge-un38-3'), query);
  }
  for (const query of ['充电宝', '移动电源']) {
    assert.ok(matchingIds('zh-cn', 'zh-Hans', query).includes('knowledge-un38-3'), query);
  }
  assert.deepEqual(matchingIds('zh-tw', 'zh-Hant', 'FCC ID', 'charger', 'united-states'), ['knowledge-fcc-id']);
  assert.deepEqual(matchingIds('zh-tw', 'zh-Hant', '完全不存在的詞'), []);
});

test('knowledge enhancement fails open and analytics never sends query-bearing referrers', () => {
  assert.match(siteCss, /\.knowledge-search \{ display: none;/);
  assert.match(siteCss, /\.knowledge-index\.is-search-ready \.knowledge-search \{ display: grid;/);
  assert.doesNotMatch(siteCss, /\.reveal[^\{]*\{[^}]*opacity:\s*0/);
  assert.match(siteJs, /referrer: analyticsReferrer\(\)/);
  assert.match(siteJs, /return `\$\{url\.origin\}\$\{url\.pathname\}`/);
  assert.match(siteJs, /searchParams\.delete\('q'\)/);
  assert.doesNotMatch(siteJs, /searchParams\.set\('q'/);
});

test('knowledge images expose art-directed crop positions for cards and article viewports', () => {
  const hub = renderPage('zh-tw', 'knowledge');
  const article = renderPage('zh-tw', 'knowledge-iecee-cb-certificate');

  assert.match(hub, /--knowledge-card-image-position:53% 36%;--knowledge-card-image-position-mobile:52% 38%/);
  assert.match(article, /--field-note-image-position:56% 50%;--field-note-image-position-mobile:58% 52%/);
  assert.match(siteCss, /object-position: var\(--knowledge-card-image-position,50% 50%\)/);
  assert.match(siteCss, /\.field-note__image img \{[^}]*height: auto;[^}]*aspect-ratio: 16 \/ 10;/);
  assert.match(siteCss, /object-position: var\(--field-note-image-position-mobile,var\(--field-note-image-position,50% 50%\)\)/);
});
