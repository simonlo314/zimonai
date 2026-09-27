import assert from 'node:assert/strict';
import test from 'node:test';
import { languages } from '../src/content.mjs';
import { paymentContent } from '../src/payment-content.mjs';
import { portalContent } from '../src/portal-content.mjs';
import { adminContent } from '../src/admin-content.mjs';
import { marketingCopy } from '../src/marketing-copy.mjs';
import { renderPage } from '../src/template.mjs';
import { stripCjkProtectionMarkup } from '../src/cjk-linebreak.mjs';
import { SERVICE_FACTS, serviceTiming } from '../shared/service-facts.mjs';

const prices = { t1: 149, t2: 349 };
const currentAdvanced = {
  en: ['Structured Supplier Interview', 'On-the-ground Evidence Collection', 'Ongoing Supplier Review', 'Advanced Enterprise Engagement'],
  'zh-tw': ['結構化供應商訪談', '現場事實取證', '持續供應商查核', '企業級查核專案'],
  'zh-cn': ['结构化供应商访谈', '现场事实取证', '持续供应商核查', '企业级核查项目']
};

for (const locale of Object.keys(languages)) {
  test(`${locale}: fixed prices, agreed inputs, advanced boundaries and historical labels remain coherent`, () => {
    const catalog = languages[locale].services.catalog;
    assert.deepEqual(catalog.map(tier => tier.id), ['t1', 't2', 't3', 't4', 't5', 't6']);
    for (const tier of catalog.slice(0, 2)) {
      const payment = paymentContent[locale].payments.products.find(product => product.key === tier.id);
      assert.equal(tier.price, `USD ${prices[tier.id]}`);
      assert.equal(SERVICE_FACTS[tier.id].amount, prices[tier.id] * 100);
      assert.equal(payment.price, tier.price);
      assert.equal(payment.button, tier.fixed.button);
      assert.deepEqual(payment.includes, tier.fixed.includes);
      assert.equal(payment.notIncluded, tier.notIncluded);
      assert.equal(tier.fixed.includes.length, 5);
    }
    assert.match(catalog[0].groups.map(group => group.items.join(' ')).join(' '), locale === 'en' ? /bank-account ownership/ : locale === 'zh-tw' ? /銀行已確認帳戶持有人/ : /银行已确认账户实际持有人/);
    assert.doesNotMatch(catalog[0].delivery, /risk rating|風險評級|风险评级/i);
    assert.match(catalog[1].fixed.includes.join(' '), locale === 'en' ? /directly related entities/ : locale === 'zh-tw' ? /直接相關主體/ : /直接相关主体/);
    assert.deepEqual(catalog.slice(2).map(tier => tier.title), currentAdvanced[locale]);
    for (const tier of catalog.slice(2)) {
      assert.equal(serviceTiming(tier.id, locale), '');
      assert.ok(tier.timing);
    }
    assert.match(catalog[3].notIncluded, /AQL/);
    assert.match(catalog[5].notIncluded, /RFQ/);
    assert.equal(marketingCopy[locale].questions.length, 10);
    assert.ok(portalContent[locale].workspace.legacyTierOptions.length === 4);
    assert.ok(adminContent[locale].form.legacyTierOptions.length === 4);
    assert.ok(adminContent[locale].form.tiers.at(-1)[1].includes(currentAdvanced[locale][3]));
  });

  test(`${locale}: rendered public pages and schema express the same current service`, () => {
    const page = id => stripCjkProtectionMarkup(renderPage(locale, id));
    const services = page('services');
    const home = page('home');
    const scope = page('scope');
    const about = page('about');
    const method = page('methodology');
    const request = page('request');
    const schema = JSON.parse(services.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const catalog = schema['@graph'].find(node => node['@type'] === 'OfferCatalog').itemListElement;
    const faq = schema['@graph'].find(node => node['@type'] === 'FAQPage');
    assert.equal(catalog[0].priceSpecification.price, 149);
    assert.equal(catalog[1].priceSpecification.price, 349);
    assert.equal(catalog[2].itemListElement.length, 4);
    assert.ok(catalog[2].itemListElement.every((node, index) => node.name === currentAdvanced[locale][index]));
    assert.equal(faq.mainEntity.length, marketingCopy[locale].questions.length);
    assert.deepEqual(faq.mainEntity.map(node => [node.name, node.acceptedAnswer.text]), marketingCopy[locale].questions);
    assert.ok(services.includes(marketingCopy[locale].questions[1][0]));
    assert.ok(home.includes(languages[locale].common.footerScope));
    assert.ok(scope.includes(languages[locale].scope.dontItems[2]));
    assert.ok(about.includes(languages[locale].about.modelText));
    assert.ok(method.includes(languages[locale].methodology.reportAnatomy.items.at(-1)[0]));
    assert.ok(request.includes(languages[locale].request.fields.product));
    assert.ok(services.includes('id="t1"') && services.includes('id="t2"') && services.includes('id="advanced"'));
    assert.doesNotMatch(services + scope + about, /Fully Managed Sourcing Verification|全託管採購把關|全托管采购把关|spot-check sample output|現場抽測樣品|现场抽测样品/i);
  });
}
