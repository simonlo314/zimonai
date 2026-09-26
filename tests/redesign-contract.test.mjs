import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { languages, pages } from '../src/content.mjs';
import { renderPage } from '../src/template.mjs';
import { paymentContent } from '../src/payment-content.mjs';
import { portalContent } from '../src/portal-content.mjs';
import { adminContent } from '../src/admin-content.mjs';
import { SERVICE_FACTS, SERVICE_NAMES, QUOTATION_SHORT_COPY, serviceTiming } from '../shared/service-facts.mjs';
import { STRIPE_PRODUCTS } from '../functions/_lib/stripe.js';
import { stripCjkProtectionMarkup } from '../src/cjk-linebreak.mjs';
import { SqliteD1 } from './helpers/sqlite-d1.mjs';
import { summarizePeriod } from '../scripts/weekly-analytics.mjs';
import { approvedCopy } from '../src/approved-copy.mjs';

test('approved content has complete locale topology and no local price/timing copies', () => {
  const shape = value => Array.isArray(value) ? value.map(shape) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)])) : typeof value;
  for (const locale of ['zh-tw', 'zh-cn']) assert.deepEqual(shape(approvedCopy[locale]), shape(approvedCopy.en));
  assert.doesNotMatch(JSON.stringify(approvedCopy), /USD\s*(149|349)|24[–-]48|3[–-]5/);
});

test('mega menus isolate text roles instead of styling every descendant span', () => {
  const css = readFileSync(new URL('../src/assets/redesign.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /\.mega-panel\s+a\s+span\s*\{/);
  assert.match(css, /\.mega-panel \.cjk-keep\s*\{[^}]*display:\s*inline;/);
  assert.match(css, /max-height:\s*calc\(100dvh - var\(--ad-header-height\) - 12px\)/);
  for (const locale of Object.keys(languages)) {
    const html = renderPage(locale, 'home');
    assert.match(html, /mega-panel--services/);
    assert.match(html, /mega-service__title/);
    assert.match(html, /mega-description/);
    assert.match(html, /mega-footer__links/);
    assert.match(html, /mega-categories/);
    assert.match(html, /brand__tagline/);
    for (const id of ['t1', 't2', 't3', 't4', 't5', 't6', 'advanced']) {
      assert.match(html, new RegExp(`services/#${id}"`));
    }
    if (locale !== 'en') assert.match(html, /mega-link-title[^>]*>[\s\S]*?cjk-keep/);
  }
});

test('service menus place grouped T3–T6 below T2 with custom pricing, not a new purchasable tier', () => {
  for (const locale of Object.keys(languages)) {
    const html = stripCjkProtectionMarkup(renderPage(locale, 'home'));
    const scopes = html.split('<div class="mega-scopes">')[1].split('<div class="mega-advanced">')[0];
    const rows = [...scopes.matchAll(/<a class="mega-service[^\"]*" href="([^\"]+)">([\s\S]*?)<\/a>/g)];
    const prefix = languages[locale].prefix ? `/${languages[locale].prefix}` : '';
    assert.deepEqual(rows.map(row => row[1]), ['t1', 't2', 'advanced'].map(id => `${prefix}/services/#${id}`));
    assert.match(rows[2][2], /<span class="mega-tier">T3–T6<\/span>/);
    assert.ok(rows[2][2].includes(approvedCopy[locale].menuCustomTitle.replace('&', '&amp;')));
    assert.ok(rows[2][2].includes(approvedCopy[locale].menuCustomDescription));
    assert.ok(rows[2][2].includes(QUOTATION_SHORT_COPY[locale]));
    assert.doesNotMatch(rows[2][2], /USD|\$|data-checkout/);
  }
});

test('photographic additions retain sources, disclosures and responsive derivatives in every locale', () => {
  for (const locale of Object.keys(languages)) {
    for (const page of ['home', 'services', 'methodology']) {
      const html = stripCjkProtectionMarkup(renderPage(locale, page));
      assert.match(html, /class="editorial-photo /);
      assert.match(html, /-640\.webp 640w, \/assets\/editorial-[^\s]+-1200\.webp 1200w/);
      assert.ok(html.includes(approvedCopy[locale].photoContext));
      assert.match(html, /https:\/\/www\.pexels\.com\/photo\//);
    }
    const method = renderPage(locale, 'methodology');
    assert.match(method, /id="verification-checks"/);
    assert.match(method, /class="method-intro__copy"/);
  }
  for (const name of ['editorial-power-supply-board', 'editorial-chargers-table']) {
    for (const size of [640, 1200]) {
      const bytes = readFileSync(new URL(`../src/assets/${name}-${size}.webp`, import.meta.url));
      assert.ok(bytes.length < 65000);
    }
  }
});

test('portal brand polish preserves the original shield and changes presentation only', () => {
  const css = readFileSync(new URL('../src/assets/portal.css', import.meta.url), 'utf8');
  const seal = css.match(/\.portal-auth__seal \{([^}]+)\}/)[1];
  assert.match(seal, /border: 0/);
  assert.match(seal, /background: transparent/);
  assert.match(renderPage('en', 'portal'), /src="\/assets\/zimonai-shield-icon-primary.svg"/);
});

test('approved public views do not render discarded fake report or decorative tier systems', () => {
  for (const locale of Object.keys(languages)) {
    for (const page of ['home', 'services', 'methodology', 'about', 'request']) {
      const html = renderPage(locale, page, { protectCjk: false });
      assert.doesNotMatch(html, /service-staircase|evidence-flow|about-block--truth|about-lead|report-dashboard/);
      assert.doesNotMatch(html, /<h[1-6][^>]*>\s*<\/h[1-6]>/, `${locale}/${page}: empty heading`);
      assert.doesNotMatch(html, /(?:href|src)="[^\"]*sample[^\"]*\.pdf/);
    }
  }
});

for (const locale of Object.keys(languages)) {
  test(`${locale}: catalog, payment, Stripe and operations names share fixed facts`, () => {
    for (const id of ['t1','t2']) {
      const catalog = languages[locale].services.catalog.find(s => s.id === id);
      const product = paymentContent[locale].payments.products.find(s => s.key === id);
      assert.equal(catalog.title, SERVICE_NAMES[id][locale]);
      assert.equal(catalog.price, `USD ${SERVICE_FACTS[id].amount / 100}`);
      assert.equal(STRIPE_PRODUCTS[id].amount, SERVICE_FACTS[id].amount);
      assert.ok(STRIPE_PRODUCTS[id].names[locale].includes(catalog.title));
      assert.ok(product.title.includes(catalog.title));
      assert.equal(product.price, catalog.price);
      assert.equal(product.timing, serviceTiming(id, locale));
      assert.deepEqual(product.includes, catalog.fixed.includes);
      assert.equal(product.notIncluded, catalog.notIncluded);
      assert.ok(portalContent[locale].workspace.tierOptions.find(([key]) => key === id)[1].includes(catalog.title));
      assert.ok(adminContent[locale].form.tiers.find(([key]) => key === id)[1].includes(catalog.title));
    }
    for (const id of ['t3','t4','t5','t6']) assert.equal(STRIPE_PRODUCTS[id], undefined);
    assert.deepEqual(languages[locale].services.catalog.map(s=>s.id), ['t1','t2','t3','t4','t5','t6']);
  });

  test(`${locale}: public schema, anchors, two checkouts and unpriced Advanced are consistent`, () => {
    const html = stripCjkProtectionMarkup(renderPage(locale, 'services'));
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const offers = schema['@graph'].find(n=>n['@type']==='OfferCatalog').itemListElement;
    assert.equal(offers.length, 3);
    assert.equal(offers[0].priceSpecification.price, 149);
    assert.equal(offers[1].priceSpecification.price, 349);
    assert.equal(offers[2].name, SERVICE_NAMES.advanced[locale]);
    assert.equal(offers[2].itemListElement.length, 4);
    assert.doesNotMatch(JSON.stringify(offers[2]), /"(?:price|minPrice|maxPrice|priceSpecification)"/);
    const advancedStart = html.indexOf('<section class="advanced-services"');
    const advancedEnd = html.indexOf('<section class="report-editorial ', advancedStart);
    assert.ok(advancedStart > 0 && advancedEnd > advancedStart);
    const advancedHtml = html.slice(advancedStart, advancedEnd);
    assert.doesNotMatch(advancedHtml, /USD|US\$|\$\d/);
    for (const id of ['t1','t2','t3','t4','t5','t6','advanced']) assert.match(html, new RegExp(`id="${id}"`));
    assert.equal((html.match(/data-checkout-form/g)||[]).length, 2);
    assert.match(html, /data-product="t1"/);
    assert.match(html, /data-product="t2"/);
    assert.doesNotMatch(html, /data-product="t[3-6]"/);
    assert.doesNotMatch(html, /undefined|Six levels|service-staircase|minPrice/);
  });

  test(`${locale}: menus and language links use real equivalent routes, not home fallbacks`, () => {
    for (const page of pages) {
      const html = renderPage(locale, page.id, { protectCjk: false });
      const links = [...html.matchAll(/data-equivalent-language href="([^"]+)"/g)].map(m=>m[1]);
      assert.deepEqual(links, Object.values(languages).map(lang=>`/${[lang.prefix,page.slug].filter(Boolean).join('/')}${lang.prefix || page.slug ? '/' : ''}`));
      assert.match(html, /id="mega-services" hidden/);
      assert.match(html, /id="mega-resources" hidden/);
      assert.doesNotMatch(html, /knowledge\/undefined/);
      if (!['portal','admin'].includes(page.id)) assert.equal((html.match(/<h1[ >]/g)||[]).length, 1, page.id);
      else {
        // Authenticated and signed-out workspace headings have separate visibility states.
        assert.match(html, /data-(?:portal-signed-in|admin-workspace)[^>]*hidden/);
        assert.ok((html.match(/<h1[ >]/g)||[]).length >= 1);
      }
    }
  });
}

test('classification migration is additive and preserves existing records and internal tier constraints', async () => {
  const db = new SqliteD1();
  try {
    db.raw.exec('ALTER TABLE public_inquiries DROP COLUMN service_interest; ALTER TABLE public_inquiries DROP COLUMN service_group;');
    db.raw.exec(`INSERT INTO public_inquiries (id,public_reference,locale,contact_name,contact_email,contact_email_normalized,supplier_name,product_category,question,consent_at,status,created_at,updated_at)
      VALUES ('inq_historical','ZMR-historical','en','Historic buyer','old@example.com','old@example.com','Historic supplier','Charger','Original question','2026-01-01','closed','2026-01-01','2026-01-02')`);
    const before = db.raw.prepare('SELECT * FROM public_inquiries').get();
    const caseSchema = db.raw.prepare("SELECT sql FROM sqlite_master WHERE name='portal_cases'").get().sql;
    db.raw.exec(readFileSync(new URL('../migrations-portal/0009_inquiry_service_classification.sql', import.meta.url),'utf8'));
    const { service_group, service_interest, ...after } = db.raw.prepare('SELECT * FROM public_inquiries').get();
    assert.deepEqual({ ...before }, after);
    assert.equal(service_group, 'unsure');
    assert.equal(service_interest, 'unsure');
    assert.equal(db.raw.prepare("SELECT sql FROM sqlite_master WHERE name='portal_cases'").get().sql, caseSchema);
    assert.throws(()=>db.raw.exec("UPDATE public_inquiries SET service_interest='t4'"), /CHECK/);
  } finally { db.close(); }
});

test('locale reporting retains old events and never treats browser events as unique conversion rates', () => {
  const report = summarizePeriod({ start:'2026-09-20', end:'2026-09-26', eventRows:[
    {event_date:'2026-09-25', event_name:'request_submit', locale:'en', target:'accepted', count:2},
    {event_date:'2026-09-25', event_name:'inquiry_classified', locale:'en', target:'advanced:t4', count:2},
    {event_date:'2026-09-25', event_name:'checkout_start', locale:'zh-tw', target:'t1', count:3},
    {event_date:'2026-09-25', event_name:'payment_confirmed', locale:'zh-cn', target:'t2', count:1}
  ]});
  assert.equal(report.requestSubmissions,2);
  assert.equal(report.localeInteractions.en.request_submit,2);
  assert.equal(report.localeInteractions['zh-tw'].checkout_start,3);
  assert.equal(report.localeInteractions['zh-cn'].payment_confirmed,1);
  assert.equal(report.inquiryInterests[0].name,'advanced:t4');
  assert.equal(report.conversionRate, undefined);
});
