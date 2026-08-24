import test from 'node:test';
import assert from 'node:assert/strict';
import {
  knowledgeArticleSpecs,
  knowledgeCategoryDefinitions,
  knowledgeContent,
  knowledgePageDefinitions
} from '../src/knowledge-content.mjs';

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

test('knowledge taxonomy keeps five stable category definitions', () => {
  assert.deepEqual(knowledgeCategoryDefinitions.map(({ id }) => id), expectedCategoryIds);
  assert.equal(new Set(knowledgeCategoryDefinitions.map(({ slug }) => slug)).size, expectedCategoryIds.length);

  for (const category of knowledgeCategoryDefinitions) {
    assert.match(category.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
});

test('every knowledge article has valid locale-independent filters and trilingual keywords', () => {
  const validCategories = new Set(knowledgeCategoryDefinitions.map(({ id }) => id));
  const ids = knowledgeArticleSpecs.map(({ id }) => id);
  const keys = knowledgeArticleSpecs.map(({ key }) => key);
  const slugs = knowledgeArticleSpecs.map(({ slug }) => slug);

  assert.equal(new Set(ids).size, ids.length, 'knowledge article IDs must be unique');
  assert.equal(new Set(keys).size, keys.length, 'knowledge article keys must be unique');
  assert.equal(new Set(slugs).size, slugs.length, 'knowledge article slugs must be unique');

  for (const article of knowledgeArticleSpecs) {
    assert.ok(validCategories.has(article.category), `${article.id} has an unknown category`);
    assert.match(article.slug, /^knowledge\/[a-z0-9]+(?:-[a-z0-9]+)*$/, `${article.id} needs a stable knowledge slug`);
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/, `${article.id} needs a publication date`);
    assert.match(article.dateModified, /^\d{4}-\d{2}-\d{2}$/, `${article.id} needs a modified date`);
    assert.ok(article.dateModified >= article.datePublished, `${article.id} cannot be modified before publication`);
    assert.ok(Array.isArray(article.products) && article.products.length > 0, `${article.id} needs products`);
    assert.ok(Array.isArray(article.markets) && article.markets.length > 0, `${article.id} needs markets`);
    assert.deepEqual(Object.keys(article.keywords), locales, `${article.id} needs all keyword locales`);

    for (const locale of locales) {
      const keywords = article.keywords[locale];
      assert.ok(Array.isArray(keywords) && keywords.length > 0, `${article.id} needs ${locale} keywords`);
      assert.ok(keywords.every((keyword) => typeof keyword === 'string' && keyword.trim() === keyword && keyword.length > 0));
      assert.equal(new Set(keywords.map((keyword) => keyword.toLocaleLowerCase(locale))).size, keywords.length, `${article.id} has duplicate ${locale} keywords`);
      assert.ok(knowledgeContent[locale].articles[article.key], `${article.id} needs ${locale} article copy`);
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

test('the six published notes retain their evidence-led classifications', () => {
  const baseline = {
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
  assert.ok(!categoryPages.some(({ categoryId }) => ['factory-onsite', 'commercial-risk'].includes(categoryId)));
});
