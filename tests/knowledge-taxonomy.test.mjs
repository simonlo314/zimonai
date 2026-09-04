import test from 'node:test';
import assert from 'node:assert/strict';
import {
  knowledgeArticleSpecs,
  knowledgeCategoryDefinitions,
  knowledgeContent,
  knowledgePageDefinitions
} from '../src/knowledge-content.mjs';
import { knowledgeSummaryIssues } from '../src/knowledge-summary-policy.mjs';
import { renderPage } from '../src/template.mjs';

const locales = ['en', 'zh-tw', 'zh-cn'];
const expectedCategoryIds = [
  'supplier-identity',
  'certification-market-access',
  'product-transport-documents',
  'factory-onsite',
  'commercial-risk'
];

function keyTopology(value, prefix = '') {
  if (Array.isArray(value) || value === null || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, nested]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return [path, ...keyTopology(nested, path)];
  });
}

function isValidIsoDate(value) {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

test('knowledge taxonomy keeps five stable category definitions', () => {
  assert.deepEqual(knowledgeCategoryDefinitions.map(({ id }) => id), expectedCategoryIds);
  assert.equal(new Set(knowledgeCategoryDefinitions.map(({ slug }) => slug)).size, expectedCategoryIds.length);

  for (const category of knowledgeCategoryDefinitions) {
    assert.match(category.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test('Chinese article-summary labels stay natural and format-specific', () => {
  assert.equal(knowledgeContent.en.ui.quickAnswer, 'Executive summary');
  assert.equal(knowledgeContent['zh-tw'].ui.quickAnswer, '懶人包');
  assert.equal(knowledgeContent['zh-cn'].ui.quickAnswer, '总结');
  assert.equal(knowledgeContent['zh-tw'].articles.ankerMagGo2Pro.labels.summary, '新聞摘要');
  assert.equal(knowledgeContent['zh-cn'].articles.ankerMagGo2Pro.labels.summary, '新闻摘要');
});

test('visible knowledge metadata exposes the same last-updated date as Article schema', () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (const spec of knowledgeArticleSpecs) {
    const [year, month, day] = spec.dateModified.split('-').map(Number);
    for (const locale of locales) {
      const visibleDate = locale === 'en' ? `${day} ${months[month - 1]} ${year}` : `${year} 年 ${month} 月 ${day} 日`;
      const html = renderPage(locale, spec.id, { protectCjk: false });
      assert.ok(
        html.includes(`<dt>${knowledgeContent[locale].ui.updated}</dt><dd><time datetime="${spec.dateModified}">${visibleDate}</time></dd>`),
        `${locale}/${spec.id} must show its dateModified value`
      );
    }
  }
});

test('article summaries provide a complete reader overview instead of a binary verdict', () => {
  for (const spec of knowledgeArticleSpecs) {
    for (const locale of locales) {
      const issues = knowledgeSummaryIssues(locale, spec.contentType, knowledgeContent[locale].articles[spec.key].answer);
      assert.deepEqual(issues, [], `${locale}/${spec.key}: ${issues.join('; ')}`);
    }
  }
});

test('summary policy rejects binary-verdict sentence openings in every locale', () => {
  const valid = Object.fromEntries(locales.map((locale) => [
    locale,
    knowledgeContent[locale].articles.reachSvhcDeclaration.answer
  ]));
  const samples = {
    en: `No. ${valid.en}`,
    'zh-tw': `不能。${valid['zh-tw']}`,
    'zh-cn': `不一定。${valid['zh-cn']}`
  };

  for (const locale of locales) {
    assert.deepEqual(
      knowledgeSummaryIssues(locale, 'industry-knowledge', samples[locale]),
      ['summary opens a sentence with a binary verdict'],
      `${locale} should reject only the binary-verdict sentence opening in an otherwise valid summary`
    );
  }
});

test('summary policy rejects disguised verdict framing in every locale', () => {
  const samples = {
    en: `The short answer is no: ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`,
    'zh-tw': `簡單說，不能把它當成最終結論。${knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer}`,
    'zh-cn': `简单来说，不能把它当成最终结论。${knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer}`
  };

  for (const locale of locales) {
    assert.deepEqual(
      knowledgeSummaryIssues(locale, 'industry-knowledge', samples[locale]),
      ['summary opens a sentence with a binary verdict'],
      `${locale} should reject disguised binary framing`
    );
  }
});

test('summary policy rejects quoted and synonymous verdict shortcuts', () => {
  const valid = {
    en: knowledgeContent.en.articles.reachSvhcDeclaration.answer,
    'zh-tw': knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer,
    'zh-cn': knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer
  };
  const samples = [
    ['en', `“No.” ${valid.en}`],
    ['en', `(No.) ${valid.en}`],
    ['en', `The answer is no. ${valid.en}`],
    ['en', `The answer: no. ${valid.en}`],
    ['en', `Not on its own. ${valid.en}`],
    ['zh-tw', `「不能。」${valid['zh-tw']}`],
    ['zh-tw', `（不能。）${valid['zh-tw']}`],
    ['zh-tw', `是的。${valid['zh-tw']}`],
    ['zh-tw', `視情況而定。${valid['zh-tw']}`],
    ['zh-cn', `「不能。」${valid['zh-cn']}`],
    ['zh-cn', `（不能。）${valid['zh-cn']}`],
    ['zh-cn', `是的。${valid['zh-cn']}`],
    ['zh-cn', `视情况而定。${valid['zh-cn']}`]
  ];

  for (const [locale, summary] of samples) {
    assert.ok(
      knowledgeSummaryIssues(locale, 'industry-knowledge', summary).includes('summary opens a sentence with a binary verdict'),
      `${locale} should reject ${summary.slice(0, 24)}`
    );
  }
});

test('summary policy rejects verdict shortcuts after closing quotes', () => {
  const samples = [
    ['en', `A supplier asks “Is this enough?” No. ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`],
    ['zh-tw', `供應商問「這樣夠嗎？」不能。${knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer}`],
    ['zh-cn', `供应商问“这样够吗？”不能。${knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer}`]
  ];

  for (const [locale, summary] of samples) {
    assert.ok(
      knowledgeSummaryIssues(locale, 'industry-knowledge', summary).includes('summary opens a sentence with a binary verdict'),
      `${locale} should reject a binary verdict after a closing quote`
    );
  }
});

test('summary policy rejects natural-language equivalents of binary verdicts', () => {
  const samples = [
    ['en', `Absolutely not. ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`],
    ['en', `Not really. ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`],
    ['en', `Maybe. ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`],
    ['zh-tw', `當然不行。${knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer}`],
    ['zh-tw', `當然可以。${knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer}`],
    ['zh-tw', `要看情況。${knowledgeContent['zh-tw'].articles.reachSvhcDeclaration.answer}`],
    ['zh-cn', `当然不行。${knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer}`],
    ['zh-cn', `当然可以。${knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer}`],
    ['zh-cn', `要看情况。${knowledgeContent['zh-cn'].articles.reachSvhcDeclaration.answer}`]
  ];

  for (const [locale, summary] of samples) {
    assert.ok(
      knowledgeSummaryIssues(locale, 'industry-knowledge', summary).includes('summary opens a sentence with a binary verdict'),
      `${locale} should reject ${summary.slice(0, 18)}`
    );
  }
});

test('a factual English sentence beginning with No is not mistaken for a standalone verdict', () => {
  const summary = `No central EU authority issues this supplier declaration. ${knowledgeContent.en.articles.reachSvhcDeclaration.answer}`;
  assert.ok(!knowledgeSummaryIssues('en', 'industry-knowledge', summary).includes('summary opens a sentence with a binary verdict'));
});

test('editorial insight can use natural non-template phrasing in every locale', () => {
  const replacements = {
    en: ['ZIMONAI’s editorial view is', 'From ZIMONAI’s perspective,'],
    'zh-tw': ['ZIMONAI 的判讀是', '依 ZIMONAI 的實務經驗，'],
    'zh-cn': ['ZIMONAI 的编辑判断是', '从 ZIMONAI 的实务角度看，']
  };
  for (const locale of locales) {
    const [original, replacement] = replacements[locale];
    const summary = knowledgeContent[locale].articles.reachSvhcDeclaration.answer.replace(original, replacement);
    assert.ok(!knowledgeSummaryIssues(locale, 'industry-knowledge', summary).includes('summary lacks a clear editorial insight'));
  }
});

test('natural current-affairs significance wording and plural buyers are accepted', () => {
  const summary = 'Anker unveiled a magnetic power bank with a 10,000 mAh battery, up to 25 W wireless charging, active cooling, a status display and an adjustable stand, while also announcing a launch window and public price. The confirmed feature set places thermal control and visible charging data alongside speed and capacity in the product proposition. This matters because overseas buyers now have a concrete signal that the category is shifting toward more integrated thermal and user-interface design.';

  assert.deepEqual(knowledgeSummaryIssues('en', 'current-affairs', summary), []);
});

test('current-affairs significance accepts natural non-template reporting in every locale', () => {
  const samples = {
    en: 'Anker unveiled the MagGo Power Bank 2 Pro at IFA 2026, combining a 10,000 mAh battery with Qi2.2 magnetic charging at up to 25 W, active cooling, a smart display and an adjustable stand. Anker says the product will launch in the United States on 17 September for US$109.99 in three colours. The launch places thermal management and visible charging data alongside speed and capacity as defining category priorities for manufacturers and buyers comparing the next generation of magnetic power banks.',
    'zh-tw': 'Anker 在 IFA 2026 發表 MagGo Power Bank 2 Pro，把 10,000mAh 電量、最高 25W 的 Qi2.2 磁吸無線充電、主動風冷、智慧顯示器與可調支架整合在同一機身。Anker 表示，美國將於 9 月 17 日上市，定價 109.99 美元，共有三種顏色。這次發表把散熱管理與充電狀態可視化推到高功率磁吸行動電源的品類競爭核心。',
    'zh-cn': 'Anker 在 IFA 2026 发布 MagGo Power Bank 2 Pro，将 10,000mAh 容量、最高 25W 的 Qi2.2 磁吸无线充电、主动风冷、智能显示屏和可调支架整合在同一机身中。Anker 表示，这款产品将于 9 月 17 日在美国上市，定价 109.99 美元，提供三种颜色。这次发布把散热管理与充电状态可视化推到高功率磁吸移动电源的品类竞争核心。'
  };

  for (const locale of locales) {
    assert.deepEqual(knowledgeSummaryIssues(locale, 'current-affairs', samples[locale]), [], `${locale} should accept natural news significance wording`);
  }
});

test('current-affairs impact accepts natural English plural nouns', () => {
  for (const impact of ['markets', 'categories', 'supply chains', 'components', 'costs', 'manufacturers']) {
    const summary = `The company announced a new device with a named release window, public price, several confirmed hardware features and a defined sales region, giving readers a concrete account of what changed in the product line. The release also set out capacity, power, thermal design, display functions and physical adjustments while leaving longer-term performance and wider availability unconfirmed. This matters because ${impact} will need to respond to a more integrated combination of charging speed, temperature control and visible operating data.`;
    assert.ok(
      !knowledgeSummaryIssues('en', 'current-affairs', summary).includes('news summary lacks a buyer or industry impact'),
      `news impact should accept ${impact}`
    );
  }
});

test('buyer wording cannot substitute for a ZIMONAI editorial insight', () => {
  const summary = 'The report identifies one named sample, its stated method and the result recorded by the laboratory for that test. For buyers, the document should be compared with the quotation, product label, model number, ratings, bill of materials and current supplier records. The report does not establish later production consistency, the identity of every component, factory ownership, shipment quality or compliance with unrelated requirements.';

  assert.deepEqual(
    knowledgeSummaryIssues('en', 'industry-knowledge', summary),
    ['summary lacks a clear editorial insight']
  );
});

test('sentence counting treats U.S. as an abbreviation, not a complete sentence', () => {
  const summary = 'The U.S. filing identifies the named radio-frequency device, applicant, equipment class, authorization record and public exhibits, while the quotation identifies the product configuration offered for sale in the current transaction. For buyers, those records still need to be matched to each other and to the product label, and ZIMONAI’s editorial view is that the comparison must begin with the actual radio functions before any database result can support a procurement decision.';

  assert.deepEqual(
    knowledgeSummaryIssues('en', 'industry-knowledge', summary),
    ['summary needs at least three complete sentences']
  );
});

test('an English question beginning with Can is not mistaken for a binary verdict', () => {
  const summary = `Can a buyer connect that record to the quoted configuration? ${knowledgeContent.en.articles.euEconomicOperator.answer}`;

  assert.ok(!knowledgeSummaryIssues('en', 'industry-knowledge', summary).includes('summary opens a sentence with a binary verdict'));
});

test('a product display signal is not mistaken for current-affairs significance', () => {
  const summary = 'Anker unveiled the MagGo Power Bank 2 Pro at IFA 2026 with a 10,000 mAh battery, Qi2.2 magnetic charging at up to 25 W, active cooling, a smart display and an adjustable stand. Anker says the product will launch in the United States on 17 September for US$109.99 in three colours. The screen signals charging status, and the announced specifications place the product in direct competition within the high-power magnetic power-bank category.';

  assert.deepEqual(
    knowledgeSummaryIssues('en', 'current-affairs', summary),
    ['news summary lacks a clear significance statement']
  );
});

test('summary policy fails closed on unsupported inputs', () => {
  assert.deepEqual(knowledgeSummaryIssues('fr', 'industry-knowledge', 'texte'), ['unsupported summary locale: fr']);
  assert.deepEqual(knowledgeSummaryIssues('en', 'industry-knowledge', ''), ['summary is empty']);
  assert.deepEqual(
    knowledgeSummaryIssues('en', 'other', knowledgeContent.en.articles.iso9001Factory.answer),
    ['unsupported summary content type: other']
  );
});

test('every knowledge article has valid locale-independent filters and trilingual keywords', () => {
  const validCategories = new Set(knowledgeCategoryDefinitions.map(({ id }) => id));
  const validContentTypes = new Set(['industry-knowledge', 'current-affairs']);
  const ids = knowledgeArticleSpecs.map(({ id }) => id);
  const keys = knowledgeArticleSpecs.map(({ key }) => key);
  const slugs = knowledgeArticleSpecs.map(({ slug }) => slug);

  assert.equal(new Set(ids).size, ids.length, 'knowledge article IDs must be unique');
  assert.equal(new Set(keys).size, keys.length, 'knowledge article keys must be unique');
  assert.equal(new Set(slugs).size, slugs.length, 'knowledge article slugs must be unique');

  for (const article of knowledgeArticleSpecs) {
    assert.ok(validCategories.has(article.category), `${article.id} has an unknown category`);
    assert.ok(validContentTypes.has(article.contentType), `${article.id} has an unknown content type`);
    assert.match(article.slug, /^knowledge\/[a-z0-9]+(?:-[a-z0-9]+)*$/, `${article.id} needs a stable knowledge slug`);
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/, `${article.id} needs a publication date`);
    assert.match(article.dateModified, /^\d{4}-\d{2}-\d{2}$/, `${article.id} needs a modified date`);
    assert.ok(isValidIsoDate(article.datePublished), `${article.id} publication date must be a real calendar date`);
    assert.ok(isValidIsoDate(article.dateModified), `${article.id} modified date must be a real calendar date`);
    assert.ok(article.dateModified >= article.datePublished, `${article.id} cannot be modified before publication`);
    assert.ok(Array.isArray(article.products) && article.products.length > 0, `${article.id} needs products`);
    assert.ok(Array.isArray(article.markets) && article.markets.length > 0, `${article.id} needs markets`);
    assert.deepEqual(Object.keys(article.keywords), locales, `${article.id} needs all keyword locales`);
    assert.deepEqual(Object.keys(article.imageCrop), ['card', 'article', 'mobile'], `${article.id} needs card, article and mobile image crops`);
    for (const [context, position] of Object.entries(article.imageCrop)) {
      assert.match(position, /^(?:100|\d{1,2})% (?:100|\d{1,2})%$/, `${article.id} has an invalid ${context} crop`);
    }

    for (const locale of locales) {
      const keywords = article.keywords[locale];
      assert.ok(Array.isArray(keywords) && keywords.length > 0, `${article.id} needs ${locale} keywords`);
      assert.ok(keywords.every((keyword) => typeof keyword === 'string' && keyword.trim() === keyword && keyword.length > 0));
      assert.equal(new Set(keywords.map((keyword) => keyword.toLocaleLowerCase(locale))).size, keywords.length, `${article.id} has duplicate ${locale} keywords`);
      assert.ok(knowledgeContent[locale].articles[article.key], `${article.id} needs ${locale} article copy`);
      assert.ok(knowledgeContent[locale].ui.editorialCredit, `${locale} needs an editorial credit`);
      if (article.contentType === 'current-affairs') {
        assert.deepEqual(Object.keys(knowledgeContent[locale].articles[article.key].labels || {}), ['summary', 'checklist', 'limits'], `${article.id} needs current-affairs labels in ${locale}`);
      }
    }

    for (const product of article.products) {
      for (const locale of locales) {
        assert.ok(knowledgeContent[locale].taxonomy.products[product], `${product} needs a ${locale} label`);
      }
    }

    for (const market of article.markets) {
      for (const locale of locales) {
        assert.ok(knowledgeContent[locale].taxonomy.markets[market], `${market} needs a ${locale} label`);
      }
    }
  }
});

test('exactly one published article is the explicit Start here selection', () => {
  const featuredArticles = knowledgeArticleSpecs.filter(({ featured }) => featured);

  assert.equal(featuredArticles.length, 1);
});

test('the seven published notes retain their evidence-led classifications', () => {
  const baseline = {
    'knowledge-usb-if-certification': {
      category: 'certification-market-access',
      products: ['gan-charger', 'charger'],
      markets: ['global']
    },
    'knowledge-eu-economic-operator': {
      category: 'certification-market-access',
      products: ['charger'],
      markets: ['european-union']
    },
    'knowledge-legal-entity': {
      category: 'supplier-identity',
      products: ['general'],
      markets: ['china']
    },
    'knowledge-fcc-id': {
      category: 'certification-market-access',
      products: ['charger'],
      markets: ['united-states']
    },
    'knowledge-ul-file': {
      category: 'certification-market-access',
      products: ['charger'],
      markets: ['united-states']
    },
    'knowledge-ce-marking': {
      category: 'certification-market-access',
      products: ['power-adapter'],
      markets: ['european-union']
    },
    'knowledge-un38-3': {
      category: 'product-transport-documents',
      products: ['power-bank'],
      markets: ['international']
    }
  };

  for (const [id, expected] of Object.entries(baseline)) {
    const article = knowledgeArticleSpecs.find((candidate) => candidate.id === id);
    assert.ok(article, `${id} must remain published`);
    assert.deepEqual({
      category: article.category,
      products: article.products,
      markets: article.markets
    }, expected);
  }
});

test('taxonomy copy has the same complete topology in all three locales', () => {
  const englishTopology = keyTopology(knowledgeContent.en.taxonomy);

  assert.deepEqual(keyTopology(knowledgeContent['zh-tw'].taxonomy), englishTopology);
  assert.deepEqual(keyTopology(knowledgeContent['zh-cn'].taxonomy), englishTopology);

  for (const locale of locales) {
    const taxonomy = knowledgeContent[locale].taxonomy;
    assert.deepEqual(Object.keys(taxonomy.categories), expectedCategoryIds);

    for (const category of Object.values(taxonomy.categories)) {
      assert.ok(category.name.trim());
      assert.ok(category.description.trim());
    }
  }
});

test('static category pages are generated only for categories with articles', () => {
  const activeCategoryIds = knowledgeCategoryDefinitions
    .map(({ id }) => id)
    .filter((id) => knowledgeArticleSpecs.some((article) => article.category === id));
  const categoryPages = knowledgePageDefinitions.filter(({ kind }) => kind === 'knowledge-category');

  assert.deepEqual(categoryPages, activeCategoryIds.map((categoryId) => ({
    id: `knowledge-category-${categoryId}`,
    slug: `knowledge/${knowledgeCategoryDefinitions.find(({ id }) => id === categoryId).slug}`,
    kind: 'knowledge-category',
    categoryId
  })));
  assert.ok(categoryPages.some(({ categoryId }) => categoryId === 'factory-onsite'));
  assert.ok(!categoryPages.some(({ categoryId }) => categoryId === 'commercial-risk'));
});
