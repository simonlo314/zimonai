import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages, pages } from '../src/content.mjs';
import { knowledgeArticleSpecs, knowledgeContent } from '../src/knowledge-content.mjs';
import { renderPage } from '../src/template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sourceAssets = path.join(root, 'src', 'assets');

async function collectFiles(directory, relative = '') {
  const entries = (await readdir(path.join(directory, relative), { withFileTypes: true }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = [];
  for (const entry of entries) {
    const child = path.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(directory, child));
    else if (entry.isFile()) files.push(child);
  }
  return files;
}

const assetHash = createHash('sha256');
for (const file of await collectFiles(sourceAssets)) {
  assetHash.update(file);
  assetHash.update(await readFile(path.join(sourceAssets, file)));
}
const assetVersion = assetHash.digest('hex').slice(0, 12);
const knowledgeIndexVersion = createHash('sha256')
  .update(await readFile(path.join(root, 'src', 'knowledge-content.mjs')))
  .digest('hex')
  .slice(0, 12);

function versionAssetUrls(html) {
  return html.replace(
    /((?:https:\/\/zimonai\.com)?\/assets\/[^"'?\s<>]+)(?:\?[^"'\s<>]*)?/g,
    (_match, assetUrl) => `${assetUrl}?v=${assetUrl.includes('/assets/knowledge-index-') ? knowledgeIndexVersion : assetVersion}`
  );
}

function inlineScriptHashes(html) {
  return [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => `'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`);
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });
await cp(sourceAssets, path.join(dist, 'assets'), { recursive: true });
await cp(path.join(sourceAssets, 'zimonai-shield-icon-mono-white.svg'), path.join(dist, 'zimonai-favicon.svg'));
await cp(path.join(sourceAssets, 'zimonai-shield-favicon.png'), path.join(dist, 'zimonai-shield-favicon.png'));
await cp(path.join(sourceAssets, 'favicon.ico'), path.join(dist, 'favicon.ico'));
await cp(path.join(sourceAssets, 'apple-touch-icon.png'), path.join(dist, 'apple-touch-icon.png'));

function searchableStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(searchableStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(searchableStrings);
  return [];
}

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function knowledgeArticlePath(langKey, spec) {
  const prefix = languages[langKey].prefix;
  return `/${[prefix, spec.slug].filter(Boolean).join('/')}/`;
}

for (const langKey of Object.keys(languages)) {
  const records = knowledgeArticleSpecs.map((spec) => {
    const article = knowledgeContent[langKey].articles[spec.key];
    const keywords = spec.keywords?.[langKey] || [];
    return {
      id: spec.id,
      url: knowledgeArticlePath(langKey, spec),
      title: article.title,
      topic: article.topic,
      description: article.description,
      category: spec.category,
      products: spec.products,
      markets: spec.markets,
      keywords,
      datePublished: spec.datePublished,
      readTime: article.readTime,
      searchText: normalizeSearchText(searchableStrings({ article, sources: spec.sources, keywords }).join(' '))
    };
  });
  await writeFile(
    path.join(dist, 'assets', `knowledge-index-${langKey}.json`),
    JSON.stringify({ locale: langKey, generatedFrom: knowledgeIndexVersion, records }),
    'utf8'
  );
}

for (const [langKey, lang] of Object.entries(languages)) {
  for (const page of pages) {
    const segments = [lang.prefix, page.slug].filter(Boolean);
    const pageDir = path.join(dist, ...segments);
    await mkdir(pageDir, { recursive: true });
    await writeFile(path.join(pageDir, 'index.html'), versionAssetUrls(renderPage(langKey, page.id)), 'utf8');
  }
}

const urls = [];
for (const lang of Object.values(languages)) {
  for (const page of pages.filter((item) => item.sitemap !== false)) {
    const segments = [lang.prefix, page.slug].filter(Boolean);
    const pathname = segments.length ? `/${segments.join('/')}/` : '/';
    const alternateLinks = Object.entries(languages).map(([langKey, alternate]) => (
      `    <xhtml:link rel="alternate" hreflang="${alternate.htmlLang}" href="https://zimonai.com${pathForSitemap(langKey, page)}" />`
    ));
    alternateLinks.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="https://zimonai.com${pathForSitemap('en', page)}" />`);
    urls.push(`  <url>\n    <loc>https://zimonai.com${pathname}</loc>\n${alternateLinks.join('\n')}\n  </url>`);
  }
}

function pathForSitemap(langKey, page) {
  const language = languages[langKey];
  const segments = [language.prefix, page.slug].filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  'utf8'
);

await writeFile(
  path.join(dist, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://zimonai.com/sitemap.xml\n',
  'utf8'
);

const securityText = [
  'Contact: mailto:simonlo@zimonai.com',
  'Expires: 2027-08-26T00:00:00.000Z',
  'Preferred-Languages: zh-TW, en, zh-CN',
  'Canonical: https://zimonai.com/.well-known/security.txt',
  'Policy: https://zimonai.com/privacy/',
  ''
].join('\n');
await mkdir(path.join(dist, '.well-known'), { recursive: true });
await writeFile(path.join(dist, '.well-known', 'security.txt'), securityText, 'utf8');
await writeFile(path.join(dist, 'security.txt'), securityText, 'utf8');

const privateScriptHashes = new Set();
for (const lang of Object.values(languages)) {
  for (const privatePage of ['portal', 'admin']) {
    const privateFile = path.join(dist, ...[lang.prefix, privatePage].filter(Boolean), 'index.html');
    for (const hash of inlineScriptHashes(await readFile(privateFile, 'utf8'))) privateScriptHashes.add(hash);
  }
}
const privateCsp = [
  "default-src 'self'",
  `script-src 'self' ${[...privateScriptHashes].join(' ')}`,
  "style-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "font-src 'self'",
  "base-uri 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'"
].join('; ');

await writeFile(
  path.join(dist, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=()
  X-Frame-Options: SAMEORIGIN

/portal/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/zh-tw/portal/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/zh-cn/portal/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/admin/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/zh-tw/admin/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/zh-cn/admin/*
  Cache-Control: private, no-store
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: ${privateCsp}

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`,
  'utf8'
);

const notFound = await readFile(path.join(root, 'src', '404.html'), 'utf8');
await writeFile(path.join(dist, '404.html'), versionAssetUrls(notFound), 'utf8');

const totalHtml = (await readdir(dist, { recursive: true })).filter((file) => file.endsWith('.html')).length;
console.log(`Built ${totalHtml} HTML pages in ${dist} (assets ${assetVersion})`);
