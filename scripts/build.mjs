import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages, pages } from '../src/content.mjs';
import { renderPage } from '../src/template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'src', 'assets'), path.join(dist, 'assets'), { recursive: true });

for (const [langKey, lang] of Object.entries(languages)) {
  for (const page of pages) {
    const segments = [lang.prefix, page.slug].filter(Boolean);
    const pageDir = path.join(dist, ...segments);
    await mkdir(pageDir, { recursive: true });
    await writeFile(path.join(pageDir, 'index.html'), renderPage(langKey, page.id), 'utf8');
  }
}

const urls = [];
for (const lang of Object.values(languages)) {
  for (const page of pages) {
    const segments = [lang.prefix, page.slug].filter(Boolean);
    const pathname = segments.length ? `/${segments.join('/')}/` : '/';
    urls.push(`  <url>\n    <loc>https://zimonai.com${pathname}</loc>\n    <lastmod>2026-08-12</lastmod>\n  </url>`);
  }
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  'utf8'
);

await writeFile(
  path.join(dist, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://zimonai.com/sitemap.xml\n',
  'utf8'
);

await writeFile(
  path.join(dist, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), geolocation=(), microphone=()
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`,
  'utf8'
);

const notFound = await readFile(path.join(root, 'src', '404.html'), 'utf8');
await writeFile(path.join(dist, '404.html'), notFound, 'utf8');

const totalHtml = (await readdir(dist, { recursive: true })).filter((file) => file.endsWith('.html')).length;
console.log(`Built ${totalHtml} HTML pages in ${dist}`);
