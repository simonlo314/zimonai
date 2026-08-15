import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages } from '../src/content.mjs';
import { brandProfile } from '../src/brand-profile.mjs';
import { editorialPolicy, layoutMode } from '../src/editorial-policy.mjs';

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
const analyticsFunction = await readFile(path.join(root, 'functions', 'api', 'analytics.js'), 'utf8');
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
}

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
for (const favicon of ['favicon.png', 'favicon.svg', 'apple-touch-icon.png']) {
  if (!distFiles.includes(favicon)) errors.push(`stable root favicon asset missing: ${favicon}`);
}
if (distFiles.some((file) => /\.pdf$/i.test(file))) errors.push('raw PDF must not be included in the public build');

function localTarget(raw) {
  if (!raw || raw.startsWith('#') || /^(https?:|mailto:|tel:|data:)/.test(raw)) return null;
  const pathname = raw.split(/[?#]/)[0];
  if (!pathname.startsWith('/')) return null;
  if (path.extname(pathname)) return path.join(dist, pathname);
  return path.join(dist, pathname, 'index.html');
}

const requiredSections = {
  'index.html': ['hero-cinema', 'hero-cinema__scene', 'decision-ledger', 'operating-record', 'source-index'],
  'services/index.html': ['service-staircase', 'service-tier-select', 'service-tier-panel', 'report-promises'],
  'methodology/index.html': ['source-registry', 'report-anatomy'],
  'scope-limitations/index.html': ['decision-guide', 'accreditation'],
  'about/index.html': ['page-hero__brand-mark', 'business-record', 'registration-evidence', 'office-evidence']
};
for (const [file, sections] of Object.entries(requiredSections)) {
  for (const prefix of ['', 'zh-tw/', 'zh-cn/']) {
    const html = await readFile(path.join(dist, prefix, file), 'utf8');
    for (const section of sections) if (!html.includes(section)) errors.push(`dist/${prefix}${file}: missing required content section ${section}`);
  }
}

for (const [prefix, htmlLang, addressLabel, openEvidence] of [
  ['zh-tw', 'zh-Hant', '註冊暨實際接待地址', '打開證據'],
  ['zh-cn', 'zh-Hans', '注册及实际接待地址', '查看证据']
]) {
  const homeHtml = await readFile(path.join(dist, prefix, 'index.html'), 'utf8');
  const aboutHtml = await readFile(path.join(dist, prefix, 'about', 'index.html'), 'utf8');
  if (!homeHtml.includes(`<html lang="${htmlLang}" data-page="home" data-layout="cjk">`)) errors.push(`${prefix}: missing CJK page mode`);
  if (!homeHtml.includes(`data-cursor="${openEvidence}"`)) errors.push(`${prefix}: evidence interface is not localized`);
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
  if (!html.includes('href="/favicon.png"') || !html.includes('href="/favicon.svg"')) errors.push(`${label}: stable root favicon links missing`);
  if (/href="\/assets\/favicon\.(?:svg|png)(?:\?|\")/.test(html)) errors.push(`${label}: favicon URL must remain stable for search crawlers`);
  if (file !== '404.html' && (html.match(/hreflang=/g) || []).length !== 4) errors.push(`${label}: expected 4 hreflang links`);
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
  ['withdrawn quality exclusion', /不是產品品質檢驗|不是产品质量检验|not a product quality inspection/i]
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
for (const phrase of ['One category only', '我們專精充電器與電源電子供應鏈', '我们专注充电器与电源电子供应链', 'Full Managed Sourcing Verification']) {
  if (!joined.includes(phrase)) errors.push(`site output missing approved category or service content: ${phrase}`);
}
for (const event of ['page_view', 'session_start', 'contact_click', 'tier_select', 'request_draft']) {
  if (!sourceJs.includes(`'${event}'`) || !analyticsFunction.includes(`'${event}'`)) errors.push(`analytics event is not wired end to end: ${event}`);
}
if (!sourceJs.includes("navigator.doNotTrack !== '1'") || !analyticsFunction.includes("request.headers.get('DNT') === '1'")) errors.push('analytics privacy opt-out is incomplete');
if (!wranglerConfig.includes('"binding": "ANALYTICS_DB"')) errors.push('Cloudflare analytics database binding is missing');

if (errors.length) {
  console.error(`Checks failed (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Checks passed: ${files.length} HTML pages, trilingual content structure, CJK layout policy, public registration evidence, internal references and launch safeguards.`);
