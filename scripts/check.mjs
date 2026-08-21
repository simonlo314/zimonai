import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../src/content.mjs';
import { paymentContent } from '../src/payment-content.mjs';
import { STRIPE_PRODUCTS } from '../functions/_lib/stripe.js';
import { brandProfile } from '../src/brand-profile.mjs';
import { editorialPolicy, layoutMode } from '../src/editorial-policy.mjs';
import { knowledgeArticleSpecs, knowledgeContent } from '../src/knowledge-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const distFiles = await readdir(dist, { recursive: true });
const files = distFiles.filter((file) => file.endsWith('.html'));
const errors = [];

const sourceContent = await readFile(path.join(root, 'src', 'content.mjs'), 'utf8');
const sourceTemplate = await readFile(path.join(root, 'src', 'template.mjs'), 'utf8');
const sourceCss = await readFile(path.join(root, 'src', 'assets', 'site.css'), 'utf8');
const sourcePolicy = await readFile(path.join(root, 'CONTENT_AND_LOCALIZATION.md'), 'utf8');
const sourceJs = await readFile(path.join(root, 'src', 'assets', 'site.js'), 'utf8');
const sourceKnowledge = await readFile(path.join(root, 'src', 'knowledge-content.mjs'), 'utf8');
const analyticsFunction = await readFile(path.join(root, 'functions', 'api', 'analytics.js'), 'utf8');
const checkoutFunction = await readFile(path.join(root, 'functions', 'api', 'create-checkout-session.js'), 'utf8');
const sessionFunction = await readFile(path.join(root, 'functions', 'api', 'checkout-session.js'), 'utf8');
const webhookFunction = await readFile(path.join(root, 'functions', 'api', 'stripe-webhook.js'), 'utf8');
const stripeLibrary = await readFile(path.join(root, 'functions', '_lib', 'stripe.js'), 'utf8');
const paymentMigration = await readFile(path.join(root, 'migrations', '0002_payments.sql'), 'utf8');
const customerDetailsMigration = await readFile(path.join(root, 'migrations', '0003_payment_customer_details.sql'), 'utf8');
const wranglerConfig = await readFile(path.join(root, 'wrangler.jsonc'), 'utf8');

for (const [label, pattern] of [
  ['locale inheritance', /\.\.\.\s*languages\s*\[/],
  ['mechanical locale conversion', /\.replaceAll\s*\(/],
  ['browser translation dependency', /translate\.google|googleTranslateElementInit/i]
]) {
  if (pattern.test(sourceContent)) errors.push(`content source uses forbidden ${label}`);
}

for (const langKey of ['en', 'zh-tw', 'zh-cn']) {
  const lang = languages[langKey];
  if (!lang?.ui?.openEvidence || !lang?.common?.skip) errors.push(`${langKey}: incomplete localized interface labels`);
  if (!lang?.about?.registration?.fields?.registeredAddress) errors.push(`${langKey}: registration copy is incomplete`);
  if (!editorialPolicy[langKey]?.writingMode) errors.push(`${langKey}: editorial policy missing`);
  if (!paymentContent[langKey]?.payments?.products?.length) errors.push(`${langKey}: payment content missing`);
  if (!knowledgeContent[langKey]?.hub?.metaTitle) errors.push(`${langKey}: knowledge hub metadata missing`);
  for (const spec of knowledgeArticleSpecs) {
    const article = knowledgeContent[langKey]?.articles?.[spec.key];
    if (!article?.title || !article?.answer || article.sections?.length !== 3 || !article.checklist?.length) errors.push(`${langKey}: incomplete knowledge article ${spec.key}`);
  }
}
if (/\.replaceAll\s*\(/.test(sourceKnowledge)) errors.push('knowledge source uses mechanical locale conversion');

for (const [key, amount] of Object.entries({ consultation: 9900, t1: 14900, t2: 34900, balance: 1000, 'consultation-extension': 4900 })) {
  if (STRIPE_PRODUCTS[key]?.amount !== amount) errors.push(`Stripe catalogue amount is incorrect for ${key}`);
}
if (STRIPE_PRODUCTS.balance?.max !== 100 || !STRIPE_PRODUCTS.balance?.referenceRequired) errors.push('service balance payment safeguards are incomplete');
if (!STRIPE_PRODUCTS['consultation-extension']?.referenceRequired) errors.push('consultation extension must require an existing booking reference');

if (layoutMode('zh-tw') !== 'cjk' || layoutMode('zh-cn') !== 'cjk' || layoutMode('en') !== 'latin') errors.push('language layout modes are incorrect');
for (const hook of ['html[lang="zh-Hant"]', 'html[lang="zh-Hans"]', 'html[data-layout="cjk"]']) {
  if (!sourceCss.includes(hook)) errors.push(`CSS missing language layout hook ${hook}`);
}
if (/font-size:\s*(?:8|9|10|11)px/.test(sourceCss)) errors.push('CSS contains public text below the 12px readability floor');
if (!sourcePolicy.includes('Traditional and Simplified Chinese are separate editorial versions')) errors.push('content policy does not preserve independent Chinese writing');
if (brandProfile.office.address !== brandProfile.registration.registeredAddressZhHans) errors.push('approved reception address differs from registered address');
if (brandProfile.office.photos.length < 3) errors.push('approved reception-area photo set is incomplete');
for (const photo of brandProfile.office.photos) {
  if (!distFiles.includes(photo.src.replace(/^\//, ''))) errors.push(`approved reception photo missing: ${photo.src}`);
}
if (brandProfile.registration.creditCode !== '91440300MAK8J4881W') errors.push('owner-approved public registration identifier is missing or incorrect');
if (!distFiles.includes('assets/zimonai-business-license-public.jpg')) errors.push('public business licence excerpt missing');
for (const logo of ['zimonai-logo-primary.svg', 'zimonai-logo-white.svg', 'zimonai-shield-icon-primary.svg', 'zimonai-shield-icon-mono-white.svg', 'zimonai-circular-mark-primary.svg', 'favicon.svg', 'apple-touch-icon.png']) {
  if (!distFiles.includes(`assets/${logo}`)) errors.push(`approved ZimonAI logo asset missing: ${logo}`);
}
for (const favicon of ['zimonai-favicon.svg', 'apple-touch-icon.png']) {
  if (!distFiles.includes(favicon)) errors.push(`stable root favicon asset missing: ${favicon}`);
}
const approvedPublicPdfs = ['assets/zimonai-t1-sample-report.pdf'];
const publicPdfs = distFiles.filter((file) => /\.pdf$/i.test(file));
for (const file of publicPdfs) if (!approvedPublicPdfs.includes(file)) errors.push(`unapproved PDF included in the public build: ${file}`);
for (const file of approvedPublicPdfs) if (!publicPdfs.includes(file)) errors.push(`approved sample report missing from the public build: ${file}`);

function localTarget(raw) {
  if (!raw || raw.startsWith('#') || /^(https?:|mailto:|tel:|data:)/.test(raw)) return null;
  const pathname = raw.split(/[?#]/)[0];
  if (!pathname.startsWith('/')) return null;
  if (path.extname(pathname)) return path.join(dist, pathname);
  return path.join(dist, pathname, 'index.html');
}

const requiredSections = {
  'index.html': ['hero-cinema', 'hero-cinema__scene', 'hero-proof', 'decision-ledger', 'verification-flow', 'operating-record', 'services-preview__actions', 'consultation-quick-link', 'source-index'],
  'services/index.html': ['service-staircase', 'consultation-inline-entry', 'service-tier-select', 'service-balance-entry', 'service-tier-panel', 'service-checkout-protocol', 'checkout-form--inline', 'sample-report', 'report-promises'],
  'methodology/index.html': ['source-registry', 'report-anatomy'],
  'scope-limitations/index.html': ['decision-guide', 'accreditation'],
  'about/index.html': ['page-hero__brand-mark', 'business-record', 'registration-evidence', 'office-evidence'],
  'payments/index.html': ['payment-desk', 'payment-grid', 'payment-private', 'payment-process', 'checkout-form'],
  'payment-success/index.html': ['payment-result', 'payment-receipt', 'payment-intake', 'payment-balance-done'],
  'payment-terms/index.html': ['legal-page', 'legal-document__rail', 'legal-toc', 'legal-row', 'legal-contact', 'support-panel'],
  'privacy/index.html': ['legal-page', 'legal-document__rail', 'legal-toc', 'legal-row', 'legal-references', 'legal-contact', 'support-panel'],
  'knowledge/index.html': ['knowledge-hero', 'knowledge-index', 'knowledge-method']
};
for (const [file, sections] of Object.entries(requiredSections)) {
  for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
    const html = await readFile(path.join(dist, prefix, file), 'utf8');
    for (const section of sections) if (!html.includes(section)) errors.push(`dist/${prefix}${file}: missing required content section ${section}`);
  }
}

for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
  const privacyHtml = await readFile(path.join(dist, prefix, 'privacy', 'index.html'), 'utf8');
  const termsHtml = await readFile(path.join(dist, prefix, 'payment-terms', 'index.html'), 'utf8');
  const privacyArticles = (privacyHtml.match(/class="legal-row reveal"/g) || []).length;
  const termsArticles = (termsHtml.match(/class="legal-row reveal"/g) || []).length;
  if (privacyArticles !== 13) errors.push(`dist/${prefix}privacy/index.html: expected 13 privacy articles, found ${privacyArticles}`);
  if (termsArticles !== 14) errors.push(`dist/${prefix}payment-terms/index.html: expected 14 payment articles, found ${termsArticles}`);
  for (const href of ['https://stripe.com/privacy', 'https://www.cloudflare.com/privacypolicy/']) {
    if (!privacyHtml.includes(href)) errors.push(`dist/${prefix}privacy/index.html: missing provider notice ${href}`);
  }
}

for (const spec of knowledgeArticleSpecs) {
  for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
    const articleFile = path.join(dist, prefix, spec.slug, 'index.html');
    const html = await readFile(articleFile, 'utf8');
    for (const section of ['field-note__hero', 'answer-first', 'buyer-checklist', 'field-note__sources']) {
      if (!html.includes(section)) errors.push(`${articleFile}: missing article section ${section}`);
    }
    if (!html.includes(`https://zimonai.com${spec.image}`)) errors.push(`${articleFile}: article social image missing`);
  }
}

for (const [prefix, htmlLang, addressLabel, proofLabel] of [
  ['zh-tw', 'zh-Hant', '註冊暨實際接待地址', '我們實際核對什麼'],
  ['zh-cn', 'zh-Hans', '注册及实际接待地址', '我们实际核对什么']
]) {
  const homeHtml = await readFile(path.join(dist, prefix, 'index.html'), 'utf8');
  const aboutHtml = await readFile(path.join(dist, prefix, 'about', 'index.html'), 'utf8');
  if (!homeHtml.includes(`<html lang="${htmlLang}" data-page="home" data-layout="cjk">`)) errors.push(`${prefix}: missing CJK page mode`);
  if (!homeHtml.includes(proofLabel)) errors.push(`${prefix}: truthful hero scope is not localized`);
  if (!aboutHtml.includes(addressLabel)) errors.push(`${prefix}: approved reception-address label missing`);
  if (!aboutHtml.includes(brandProfile.registration.legalNameZhHans)) errors.push(`${prefix}: registered legal name missing`);
  if (!aboutHtml.includes(brandProfile.registration.registeredAddressZhHans)) errors.push(`${prefix}: registered reception address missing`);
  if (!aboutHtml.includes(prefix === 'zh-tw' ? '公共接待區' : '公共接待区')) errors.push(`${prefix}: public reception-area disclosure missing`);
  for (const englishLabel of ['WHAT WE CHECK', 'WHY IT MATTERS', 'SOURCE TYPE', 'POSSIBLE RESULT', 'PUBLIC EXCERPT']) {
    if (aboutHtml.includes(englishLabel) || homeHtml.includes(englishLabel)) errors.push(`${prefix}: untranslated interface label ${englishLabel}`);
  }
}

for (const file of files) {
  const filename = path.join(dist, file);
  const html = await readFile(filename, 'utf8');
  const label = `dist/${file}`;
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${label}: missing title`);
  if (!/<meta name="description" content="[^"]+">/.test(html) && file !== '404.html') errors.push(`${label}: missing description`);
  if (!/<link rel="canonical" href="https:\/\/zimonai\.com\//.test(html) && file !== '404.html') errors.push(`${label}: missing canonical`);
  if (/<meta name="keywords"/i.test(html)) errors.push(`${label}: obsolete meta keywords tag remains`);
  if (!html.includes('href="/zimonai-favicon.svg"')) errors.push(`${label}: stable root favicon link missing`);
  if (/rel="icon"[^>]+href="\/(?:assets\/)?favicon\.(?:svg|png)(?:\?|\")/.test(html)) errors.push(`${label}: retired favicon remains linked`);
  if (file !== '404.html' && (html.match(/hreflang=/g) || []).length !== 4) errors.push(`${label}: expected 4 hreflang links`);
  if (file !== '404.html' && !html.includes('max-image-preview:large') && !html.includes('noindex, nofollow')) errors.push(`${label}: missing explicit index preview directive`);
  if (file !== '404.html') {
    const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    if (!jsonLd) {
      errors.push(`${label}: missing JSON-LD`);
    } else {
      try {
        const parsed = JSON.parse(jsonLd);
        const graph = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [];
        for (const type of ['Organization', 'WebSite']) {
          if (!graph.some((node) => node['@type'] === type)) errors.push(`${label}: JSON-LD missing ${type}`);
        }
        if (!graph.some((node) => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'].includes(node['@type']))) errors.push(`${label}: JSON-LD missing page entity`);
        const isKnowledgeArticle = /(?:^|\/)knowledge\/[^/]+\/index\.html$/.test(file);
        if (isKnowledgeArticle && !graph.some((node) => node['@type'] === 'Article')) errors.push(`${label}: JSON-LD missing Article entity`);
      } catch {
        errors.push(`${label}: invalid JSON-LD`);
      }
    }
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) errors.push(`${label}: duplicate IDs ${[...new Set(duplicateIds)].join(', ')}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/\/assets\//.test(match[1]) && !/\?v=[a-f0-9]{12}$/.test(match[1])) errors.push(`${label}: asset URL is not versioned ${match[1]}`);
    const target = localTarget(match[1]);
    if (!target) continue;
    try { await access(target); } catch { errors.push(`${label}: broken local reference ${match[1]}`); }
  }
}

const allText = await Promise.all(distFiles.filter((file) => /\.(html|js|css|xml|txt)$/.test(file)).map((file) => readFile(path.join(dist, file), 'utf8')));
const joined = allText.join('\n');
const forbidden = [
  ['old Gmail', /slab\.stores@gmail\.com/i],
  ['payment placeholder', /PADDLE_CHECKOUT_LINK/i],
  ['local host', /(?:localhost|127\.0\.0\.1)/i],
  ['temporary Cloudflare host', /(?:pages\.dev|workers\.dev)/i],
  ['fake testimonial section', /testimonial|what users say|trusted by pro/i],
  ['old business positioning', /AI Hardware Safety Diagnostics|Diagnostic Accuracy|Devices Audited|Certified Profiles/i],
  ['withdrawn sourcing exclusion', /不幫你找廠|不帮你找厂|do not source for you/i],
  ['withdrawn regional restriction', /現場查核限華南|现场核查限华南|Shenzhen, Dongguan, Huizhou, Guangzhou or/i],
  ['withdrawn quality exclusion', /不是產品品質檢驗|不是产品质量检验|not a product quality inspection/i],
  ['retired T1 price range', /(?:USD|US\$)\s*99\s*[–-]\s*149/i],
  ['retired T2 price range', /(?:USD|US\$)\s*249\s*[–-]\s*349/i],
  ['fictional supplier presentation', /Lumen Harbor|ZM-DEMO|fictional supplier|虛構供應商|虚构供应商/i]
];
for (const [name, pattern] of forbidden) if (pattern.test(joined)) errors.push(`site output contains ${name}`);
for (const phrase of ['shared office', '共享辦公', '共享办公']) if (joined.toLowerCase().includes(phrase)) errors.push(`site output contains unapproved public wording: ${phrase}`);
if (!joined.includes('simonlo@zimonai.com')) errors.push('formal email missing');
if (!joined.includes('19575746458')) errors.push('formal phone missing');
if (!sourceTemplate.includes('/assets/zimonai-logo-primary.svg') || !sourceTemplate.includes('/assets/zimonai-logo-white.svg')) errors.push('new ZimonAI logo system is not wired into the site chrome');
if (sourceTemplate.includes('<svg viewBox="0 0 42 42"')) errors.push('retired ZimonAI header mark remains in the template');
for (const contact of ['+86 19575746458', '+886 988307998', 'simon3141229', 'lo17v1']) {
  if (!joined.includes(contact)) errors.push(`approved contact missing: ${contact}`);
}
if (!joined.includes('https://wa.me/886988307998')) errors.push('approved WhatsApp link missing');
for (const address of [brandProfile.registration.registeredAddressZhHans, brandProfile.registration.registeredAddressEn]) {
  if (!joined.includes(address)) errors.push(`approved bilingual footer address missing: ${address}`);
}
for (const phrase of ['One category only', '我們專精充電器與電源電子供應鏈', '我们专注充电器与电源电子供应链', 'Full Managed Sourcing Verification']) {
  if (!joined.includes(phrase)) errors.push(`site output missing approved category or service content: ${phrase}`);
}
for (const event of ['page_view', 'session_start', 'contact_click', 'tier_select', 'request_draft', 'support_open', 'checkout_start', 'checkout_error', 'payment_confirmed', 'post_payment_intake']) {
  if (!sourceJs.includes(`'${event}'`) || !analyticsFunction.includes(`'${event}'`)) errors.push(`analytics event is not wired end to end: ${event}`);
}
if (!sourceJs.includes("navigator.doNotTrack !== '1'") || !analyticsFunction.includes("request.headers.get('DNT') === '1'")) errors.push('analytics privacy opt-out is incomplete');
if (!wranglerConfig.includes('"binding": "ANALYTICS_DB"')) errors.push('Cloudflare analytics database binding is missing');
if (!checkoutFunction.includes('STRIPE_PRODUCTS') || checkoutFunction.includes('payload.amount')) errors.push('checkout amount is not exclusively controlled by the server catalogue');
if (!checkoutFunction.includes('allowedRequestOrigin') || !checkoutFunction.includes('reference_required')) errors.push('checkout origin or reference safeguards are incomplete');
for (const field of ['name_collection[individual]', 'name_collection[business]', 'phone_number_collection', 'tax_id_collection']) {
  if (!checkoutFunction.includes(field)) errors.push(`checkout customer collection is missing ${field}`);
}
if (!sessionFunction.includes('stripeRequest') || !sessionFunction.includes('displayEmail') || !sessionFunction.includes("paymentStatus: session.payment_status")) errors.push('payment confirmation endpoint is incomplete');
if (!webhookFunction.includes("request.headers.get('Stripe-Signature')") || !webhookFunction.includes("Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > 300")) errors.push('Stripe webhook signature verification is incomplete');
for (const table of ['stripe_events', 'payment_orders']) if (!paymentMigration.includes(`CREATE TABLE IF NOT EXISTS ${table}`)) errors.push(`payment database migration missing ${table}`);
if (!webhookFunction.includes('INSERT OR IGNORE INTO stripe_events') || !webhookFunction.includes('ON CONFLICT(stripe_session_id) DO UPDATE')) errors.push('Stripe webhook idempotency is incomplete');
for (const field of ['customer_business_name', 'customer_phone', 'customer_tax_ids']) {
  if (!customerDetailsMigration.includes(field) || !webhookFunction.includes(field)) errors.push(`payment customer detail is not persisted: ${field}`);
}
if (!stripeLibrary.includes('STRIPE_SECRET_KEY') || !webhookFunction.includes('STRIPE_WEBHOOK_SECRET')) errors.push('Stripe secret names are not wired correctly');

const sourceBundle = [sourceContent, sourceTemplate, sourceCss, sourceJs, analyticsFunction, checkoutFunction, sessionFunction, webhookFunction, stripeLibrary].join('\n');
if (/(?:=|:)\s*['"`](?:sk_(?:test|live)_[A-Za-z0-9]{12,}|whsec_[A-Za-z0-9]{12,})['"`]/.test(sourceBundle)) errors.push('a Stripe secret appears to be hard-coded in source');

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
if (sitemap.includes('/payment-success/')) errors.push('payment success page must not appear in the sitemap');
for (const spec of knowledgeArticleSpecs) if (!sitemap.includes(`/${spec.slug}/`)) errors.push(`sitemap missing knowledge article ${spec.slug}`);
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) errors.push('sitemap is missing the XHTML namespace for language alternates');
const sitemapUrlCount = (sitemap.match(/<url>/g) || []).length;
const sitemapAlternateCount = (sitemap.match(/<xhtml:link /g) || []).length;
if (sitemapAlternateCount !== sitemapUrlCount * 4) errors.push('sitemap language alternates are incomplete');
if (sitemap.includes('<lastmod>2026-08-13</lastmod>')) errors.push('sitemap contains the retired hard-coded lastmod date');
for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
  const successHtml = await readFile(path.join(dist, prefix, 'payment-success', 'index.html'), 'utf8');
  if (!successHtml.includes('<meta name="robots" content="noindex, nofollow">')) errors.push(`dist/${prefix}payment-success/index.html: payment success page must be noindex`);
}

if (errors.length) {
  console.error(`Checks failed (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Checks passed: ${files.length} HTML pages, trilingual payment content, server-owned Stripe pricing, webhook safeguards, CJK layout policy, public registration evidence and internal references.`);
