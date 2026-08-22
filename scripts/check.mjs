import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../src/content.mjs';
import { paymentContent } from '../src/payment-content.mjs';
import { STRIPE_PRODUCTS } from '../functions/_lib/stripe.js';
import { brandProfile } from '../src/brand-profile.mjs';
import { editorialPolicy, layoutMode } from '../src/editorial-policy.mjs';
import { knowledgeArticleSpecs, knowledgeContent } from '../src/knowledge-content.mjs';
import { portalContent } from '../src/portal-content.mjs';
import { adminContent } from '../src/admin-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const distFiles = await readdir(dist, { recursive: true });
const files = distFiles.filter((file) => file.endsWith('.html'));
const errors = [];

const sourceContent = await readFile(path.join(root, 'src', 'content.mjs'), 'utf8');
const sourceTemplate = await readFile(path.join(root, 'src', 'template.mjs'), 'utf8');
const sourceCss = await readFile(path.join(root, 'src', 'assets', 'site.css'), 'utf8');
const sourcePortalCss = await readFile(path.join(root, 'src', 'assets', 'portal.css'), 'utf8');
const sourcePolicy = await readFile(path.join(root, 'CONTENT_AND_LOCALIZATION.md'), 'utf8');
const sourceJs = await readFile(path.join(root, 'src', 'assets', 'site.js'), 'utf8');
const sourcePortalJs = await readFile(path.join(root, 'src', 'assets', 'portal.js'), 'utf8');
const sourceAdminCss = await readFile(path.join(root, 'src', 'assets', 'admin.css'), 'utf8');
const sourceAdminJs = await readFile(path.join(root, 'src', 'assets', 'admin.js'), 'utf8');
const sourceKnowledge = await readFile(path.join(root, 'src', 'knowledge-content.mjs'), 'utf8');
const analyticsFunction = await readFile(path.join(root, 'functions', 'api', 'analytics.js'), 'utf8');
const checkoutFunction = await readFile(path.join(root, 'functions', 'api', 'create-checkout-session.js'), 'utf8');
const sessionFunction = await readFile(path.join(root, 'functions', 'api', 'checkout-session.js'), 'utf8');
const webhookFunction = await readFile(path.join(root, 'functions', 'api', 'stripe-webhook.js'), 'utf8');
const stripeLibrary = await readFile(path.join(root, 'functions', '_lib', 'stripe.js'), 'utf8');
const paymentMigration = await readFile(path.join(root, 'migrations', '0002_payments.sql'), 'utf8');
const customerDetailsMigration = await readFile(path.join(root, 'migrations', '0003_payment_customer_details.sql'), 'utf8');
const wranglerConfig = await readFile(path.join(root, 'wrangler.jsonc'), 'utf8');
const gitignore = await readFile(path.join(root, '.gitignore'), 'utf8');
const portalMigration = await readFile(path.join(root, 'migrations-portal', '0001_portal.sql'), 'utf8');
const portalRateLimitMigration = await readFile(path.join(root, 'migrations-portal', '0002_portal_oauth_rate_limit.sql'), 'utf8');
const portalIdentityAuthorityMigration = await readFile(path.join(root, 'migrations-portal', '0005_identity_email_authority.sql'), 'utf8');
const authLibrary = await readFile(path.join(root, 'functions', '_lib', 'auth.js'), 'utf8');
const portalCasesFunction = await readFile(path.join(root, 'functions', 'api', 'portal', 'cases.js'), 'utf8');
const portalCaseDetailFunction = await readFile(path.join(root, 'functions', 'api', 'portal', 'cases', '[id].js'), 'utf8');
const headersFile = await readFile(path.join(dist, '_headers'), 'utf8');

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
  if (!portalContent[langKey]?.metaTitle || !portalContent[langKey]?.auth?.google || !portalContent[langKey]?.form?.consent) errors.push(`${langKey}: portal content missing`);
  if (!adminContent[langKey]?.metaTitle || !adminContent[langKey]?.nav?.queue || !adminContent[langKey]?.nav?.notifications || !adminContent[langKey]?.notifications?.retry || !adminContent[langKey]?.form?.customerEmail) errors.push(`${langKey}: admin content missing`);
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
if (/font-size:\s*(?:8|9|10|11)px/.test(`${sourceCss}\n${sourcePortalCss}\n${sourceAdminCss}`)) errors.push('CSS contains public text below the 12px readability floor');
if (!sourcePolicy.includes('Traditional and Simplified Chinese are separate editorial versions')) errors.push('content policy does not preserve independent Chinese writing');
if (brandProfile.office.address !== brandProfile.registration.registeredAddressZhHans) errors.push('approved reception address differs from registered address');
if (brandProfile.office.photos.length < 3) errors.push('approved reception-area photo set is incomplete');
for (const photo of brandProfile.office.photos) {
  if (!distFiles.includes(photo.src.replace(/^\//, ''))) errors.push(`approved reception photo missing: ${photo.src}`);
}
if (brandProfile.registration.creditCode !== '91440300MAK8J4881W') errors.push('owner-approved public registration identifier is missing or incorrect');
if (brandProfile.contacts.linkedin?.href !== 'https://www.linkedin.com/in/zimonai') errors.push('owner-approved LinkedIn profile is missing or incorrect');
if (!distFiles.includes('assets/zimonai-business-license-public.jpg')) errors.push('public business licence excerpt missing');
for (const logo of ['zimonai-logo-primary.svg', 'zimonai-logo-white.svg', 'zimonai-shield-icon-primary.svg', 'zimonai-shield-icon-mono-white.svg', 'zimonai-circular-mark-primary.svg', 'favicon.svg', 'favicon.ico', 'zimonai-shield-favicon.png', 'apple-touch-icon.png']) {
  if (!distFiles.includes(`assets/${logo}`)) errors.push(`approved ZimonAI logo asset missing: ${logo}`);
}
for (const favicon of ['favicon.ico', 'zimonai-favicon.svg', 'zimonai-shield-favicon.png', 'apple-touch-icon.png']) {
  if (!distFiles.includes(favicon)) errors.push(`stable root favicon asset missing: ${favicon}`);
}
const approvedPublicPdfs = ['assets/zimonai-t1-sample-report.pdf'];
const publicPdfs = distFiles.filter((file) => /\.pdf$/i.test(file));
for (const file of publicPdfs) if (!approvedPublicPdfs.includes(file)) errors.push(`unapproved PDF included in the public build: ${file}`);
for (const file of approvedPublicPdfs) if (!publicPdfs.includes(file)) errors.push(`approved sample report missing from the public build: ${file}`);

function localTarget(raw) {
  if (!raw || raw.startsWith('#') || raw.startsWith('/api/') || /^(https?:|mailto:|tel:|data:)/.test(raw)) return null;
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
  'portal/index.html': ['portal-page', 'portal-entry', 'portal-auth', 'portal-workspace', 'portal-empty', 'portal-form', 'portal-account'],
  'admin/index.html': ['admin-page', 'admin-access', 'admin-workspace', 'admin-tabs', 'admin-record-list', 'admin-notification-config', 'admin-case-form'],
  'knowledge/index.html': ['knowledge-hero', 'knowledge-index', 'knowledge-method']
};
for (const [file, sections] of Object.entries(requiredSections)) {
  for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
    const html = await readFile(path.join(dist, prefix, file), 'utf8');
    for (const section of sections) if (!html.includes(section)) errors.push(`dist/${prefix}${file}: missing required content section ${section}`);
  }
}

for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
  const portalHtml = await readFile(path.join(dist, prefix, 'portal', 'index.html'), 'utf8');
  if (!portalHtml.includes('<meta name="robots" content="noindex, nofollow">')) errors.push(`dist/${prefix}portal/index.html: portal must be noindex`);
  if (!portalHtml.includes('/assets/portal.css') || !portalHtml.includes('/assets/portal.js')) errors.push(`dist/${prefix}portal/index.html: portal assets missing`);
  if (/<(?:section|article)[^>]+(?:fictional|demo-case|sample-customer)/i.test(portalHtml)) errors.push(`dist/${prefix}portal/index.html: fictional portal data found`);
  const adminHtml = await readFile(path.join(dist, prefix, 'admin', 'index.html'), 'utf8');
  if (!adminHtml.includes('<meta name="robots" content="noindex, nofollow">')) errors.push(`dist/${prefix}admin/index.html: admin must be noindex`);
  if (!adminHtml.includes('/assets/admin.css') || !adminHtml.includes('/assets/admin.js')) errors.push(`dist/${prefix}admin/index.html: admin assets missing`);
  if (/<(?:section|article)[^>]+(?:fictional|demo-case|sample-customer|sample-kpi)/i.test(adminHtml)) errors.push(`dist/${prefix}admin/index.html: fictional admin data found`);
}
const portalSitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
if (/\/portal\//.test(portalSitemap)) errors.push('sitemap must not include private portal routes');
if (/\/admin\//.test(portalSitemap)) errors.push('sitemap must not include private admin routes');
for (const privateRoute of ['/portal/*', '/zh-tw/portal/*', '/zh-cn/portal/*', '/admin/*', '/zh-tw/admin/*', '/zh-cn/admin/*']) {
  if (!headersFile.includes(privateRoute)) errors.push(`private route headers missing ${privateRoute}`);
}
for (const directive of ["Cache-Control: private, no-store", 'X-Robots-Tag: noindex, nofollow', "default-src 'self'", "object-src 'none'"]) {
  if (!headersFile.includes(directive)) errors.push(`portal security headers missing ${directive}`);
}
for (const table of ['portal_users', 'portal_identities', 'portal_oauth_attempts', 'portal_sessions', 'portal_cases', 'portal_audit_events']) {
  if (!portalMigration.includes(`CREATE TABLE IF NOT EXISTS ${table}`)) errors.push(`portal migration missing ${table}`);
}
if (!portalRateLimitMigration.includes('request_fingerprint_hash')) errors.push('portal OAuth rate-limit migration missing fingerprint column');
if (!portalIdentityAuthorityMigration.includes('email_authoritative')
  || !portalIdentityAuthorityMigration.includes('portal_identity_quarantine')) {
  errors.push('portal identity-authority migration or historical isolation is incomplete');
}
if (!wranglerConfig.includes('"binding": "PORTAL_DB"')) errors.push('wrangler config missing dedicated PORTAL_DB binding');
if (!wranglerConfig.includes('"migrations_dir": "migrations-portal"')) errors.push('PORTAL_DB does not use the isolated portal migration directory');
if (!/\.dev\.vars/.test(gitignore)) errors.push('.dev.vars is not ignored');
if (!authLibrary.includes('HttpOnly') || !authLibrary.includes('SameSite=Lax') || !authLibrary.includes('Secure')) errors.push('portal session cookie safeguards are incomplete');
if (!authLibrary.includes('env.PORTAL_DB') || !authLibrary.includes("env.ALLOW_LOCAL_PORTAL === 'true'")) errors.push('production portal database is not isolated from analytics');
if (!authLibrary.includes('isolateUnsafeVerifiedEmail')
  || !authLibrary.includes("i.email_authoritative = 0")
  || !authLibrary.includes("hostedDomain === emailDomain")) {
  errors.push('non-authoritative Google identity isolation is incomplete');
}
if (!portalCasesFunction.includes('WHERE owner_user_id = ?1')) errors.push('portal case list is not owner-scoped');
if (!portalCaseDetailFunction.includes("existing.status !== 'awaiting_client'")
  || !portalCaseDetailFunction.includes("AND status = 'awaiting_client'")) {
  errors.push('customer case intake is not locked after awaiting-client state');
}
if (/GOOGLE_CLIENT_SECRET\s*=\s*[^\n]*[A-Za-z0-9_-]{12}/.test([sourceTemplate, sourceJs, authLibrary, wranglerConfig].join('\n'))) errors.push('hard-coded Google secret found');
for (const endpoint of ['/api/auth/email/request', '/api/auth/email/verify', '/api/portal/orders']) {
  if (!sourcePortalJs.includes(endpoint)) errors.push(`portal client is missing ${endpoint}`);
}
if (!sourcePortalJs.includes('authCapabilities') || /\{\s*google:\s*true,\s*email:\s*true\s*\}/.test(sourcePortalJs)) errors.push('portal authentication methods must come from server capabilities');
for (const safeField of ['product', 'locale', 'quantity', 'reference']) {
  if (!sourceJs.includes(safeField) || !sourcePortalJs.includes(safeField)) errors.push(`purchase intent is missing safe field ${safeField}`);
}
if (!sourceJs.includes("sessionResponse.status === 401") || !sourceJs.includes('zimonai_purchase_intent_v1') || !sourcePortalJs.includes('resumePurchaseIfNeeded')) errors.push('checkout login gate or deliberate resume flow is incomplete');
const checkoutHandlerStart = sourceJs.indexOf('checkoutForms.forEach');
const checkoutHandlerEnd = sourceJs.indexOf('const paymentResult', checkoutHandlerStart);
const checkoutHandler = sourceJs.slice(checkoutHandlerStart, checkoutHandlerEnd);
if (checkoutHandler.indexOf("fetch('/api/portal/me'") < 0 || checkoutHandler.indexOf('form.checkValidity()') < checkoutHandler.indexOf("fetch('/api/portal/me'")) {
  errors.push('checkout must require sign-in before validating final payment consent');
}
if (!sourceJs.includes("fetch('/api/portal/me'") || !sourceJs.includes("'X-CSRF-Token': session.csrfToken") || !sourceJs.includes("credentials: 'same-origin'")) errors.push('authenticated checkout is missing its same-origin session or CSRF token');
if (!sourceAdminJs.includes("api('/api/admin/notifications'") || !sourceAdminJs.includes('emailConfigured') || !sourceAdminJs.includes('notificationId: item.id')) errors.push('admin notification status or safe retry control is incomplete');
if (!sourceJs.includes('data-checkout-resume') || !sourceTemplate.includes('data-checkout-resume')) errors.push('checkout resume confirmation is missing');
for (const endpoint of ['/api/admin/cases', '/api/admin/orders', '/api/admin/customers']) {
  if (!sourceAdminJs.includes(endpoint)) errors.push(`admin client is missing ${endpoint}`);
}
for (const operation of ['expectedDeliveryAt', 'clientStatusNote', 'internalNote', "payload.paymentStatus = data.get('paymentStatus')", 'fulfillmentStatus']) {
  if (!sourceAdminJs.includes(operation)) errors.push(`admin client is missing operation ${operation}`);
}
if (!sourceAdminJs.includes("api('/api/admin/orders'") || !sourceAdminJs.includes('copy.actions.createUnpaid')) errors.push('admin client is missing separate unpaid-order creation');
if (!sourceAdminJs.includes("item.source !== 'stripe'") || !sourceAdminJs.includes("copy.paymentStatus[item.paymentStatus]")) errors.push('admin client does not preserve server-controlled Stripe status');
if (!sourceAdminJs.includes("method: 'PATCH'") || !sourceAdminJs.includes("method: 'POST'")) errors.push('admin client mutation methods are incomplete');
if (!sourceAdminJs.includes("caches.cases = null") || !sourceAdminJs.includes("caches.orders = null")) errors.push('admin client does not invalidate updated ledgers');

for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
  const privacyHtml = await readFile(path.join(dist, prefix, 'privacy', 'index.html'), 'utf8');
  const termsHtml = await readFile(path.join(dist, prefix, 'payment-terms', 'index.html'), 'utf8');
  const privacyArticles = (privacyHtml.match(/class="legal-row reveal"/g) || []).length;
  const termsArticles = (termsHtml.match(/class="legal-row reveal"/g) || []).length;
  if (privacyArticles !== 13) errors.push(`dist/${prefix}privacy/index.html: expected 13 privacy articles, found ${privacyArticles}`);
  if (termsArticles !== 14) errors.push(`dist/${prefix}payment-terms/index.html: expected 14 payment articles, found ${termsArticles}`);
  for (const href of ['https://stripe.com/privacy', 'https://www.cloudflare.com/privacypolicy/', 'https://policies.google.com/privacy']) {
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
  if (!html.includes('href="/zimonai-shield-favicon.png"')) errors.push(`${label}: current root favicon link missing`);
  if (html.includes('href="/zimonai-favicon.svg"')) errors.push(`${label}: previous favicon URL remains linked`);
  if (file !== '404.html' && !html.includes('https://www.linkedin.com/in/zimonai')) errors.push(`${label}: LinkedIn contact is missing`);
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
        if (/(?:^|\/)services\/index\.html$/.test(file)) {
          const service = graph.find((node) => node['@type'] === 'Service');
          const offerCatalog = graph.find((node) => node['@type'] === 'OfferCatalog');
          if (!service?.hasOfferCatalog?.['@id']) errors.push(`${label}: Service schema is not linked to an OfferCatalog`);
          if (offerCatalog?.itemListElement?.length !== 6) errors.push(`${label}: OfferCatalog does not contain all six service tiers`);
          if (offerCatalog?.itemListElement?.[0]?.priceSpecification?.price !== 149) errors.push(`${label}: T1 structured price is incorrect`);
          if (offerCatalog?.itemListElement?.[5]?.priceSpecification?.minPrice !== 5000) errors.push(`${label}: T6 structured starting price is incorrect`);
        }
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
if (!sourceTemplate.includes("['methodology', t.nav.methodology], ['scope', t.nav.scope], ['about', t.nav.about]")) errors.push('navigation order must place scope before about');
for (const contact of ['+86 19575746458', '+886 988307998', 'simon3141229', 'lo17v1']) {
  if (!joined.includes(contact)) errors.push(`approved contact missing: ${contact}`);
}
if (!joined.includes('https://wa.me/886988307998')) errors.push('approved WhatsApp link missing');
for (const href of ['mailto:simonlo@zimonai.com', 'tel:+8619575746458', 'tel:+886988307998']) {
  if (!joined.includes(`href="${href}"`)) errors.push(`approved actionable contact link missing: ${href}`);
}
for (const dialogAttribute of ['role="dialog"', 'aria-modal="true"', 'aria-labelledby="support-title"', 'data-copy-error-label=']) {
  if (!sourceTemplate.includes(dialogAttribute)) errors.push(`support dialog accessibility hook missing: ${dialogAttribute}`);
}
if (!sourceTemplate.includes('class="support-launch" type="button" aria-label="${esc(copy.open)}"')) errors.push('support launcher is missing its explicit localized accessible name');
for (const behavior of ['supportPanel.inert = !open', "event.key !== 'Tab'", "document.execCommand('copy')", "classList.toggle('is-copied'"]) {
  if (!sourceJs.includes(behavior)) errors.push(`support dialog behavior missing: ${behavior}`);
}
if (!sourcePortalJs.includes("signedOut.toggleAttribute('data-auth-unavailable-state', showUnavailable)") || !sourcePortalCss.includes('.portal-entry[data-auth-unavailable-state] .portal-auth')) errors.push('disabled Portal sign-in status is not promoted into the first mobile viewport');
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
if (!sessionFunction.includes('displayEmail')
  || !sessionFunction.includes('paymentStatus: order.payment_status')
  || !sessionFunction.includes('o.owner_user_id = ?2')
  || !sessionFunction.includes('JOIN portal_users')
  || sessionFunction.includes('stripeRequest')) {
  errors.push('payment confirmation endpoint is incomplete');
}
if (!webhookFunction.includes("request.headers.get('Stripe-Signature')")
  || !webhookFunction.includes('Math.abs(nowSeconds - Number(timestamp)) > 300')
  || !webhookFunction.includes('verifyStripeSignature(rawBody')) {
  errors.push('Stripe webhook signature verification is incomplete');
}
if (!webhookFunction.includes('STRIPE_EVENT_PROCESSING_LEASE_MS')
  || !webhookFunction.includes('atomic_payment_transition')
  || !webhookFunction.includes('last_stripe_event_created')
  || !webhookFunction.includes('admin_legacy_payment_detected')
  || !webhookFunction.includes('legacyCatalogueIntegrity')) {
  errors.push('Stripe webhook lease, atomic transition or legacy cutover safeguards are incomplete');
}
if (!webhookFunction.includes("'charge.refunded'")
  || !webhookFunction.includes('stripe_partial_refund_not_supported')
  || !webhookFunction.includes('mirrorRefundAnalytics')) {
  errors.push('Stripe full-refund handling or partial-refund fail-closed safeguards are incomplete');
}
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
