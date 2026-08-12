import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const files = (await readdir(dist, { recursive: true })).filter((file) => file.endsWith('.html'));
const errors = [];

function localTarget(raw) {
  if (!raw || raw.startsWith('#') || /^(https?:|mailto:|tel:|data:)/.test(raw)) return null;
  const pathname = raw.split(/[?#]/)[0];
  if (!pathname.startsWith('/')) return null;
  if (path.extname(pathname)) return path.join(dist, pathname);
  return path.join(dist, pathname, 'index.html');
}

for (const file of files) {
  const filename = path.join(dist, file);
  const html = await readFile(filename, 'utf8');
  const label = `dist/${file}`;
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${label}: missing title`);
  if (!/<meta name="description" content="[^"]+">/.test(html) && file !== '404.html') errors.push(`${label}: missing description`);
  if (!/<link rel="canonical" href="https:\/\/zimonai\.com\//.test(html) && file !== '404.html') errors.push(`${label}: missing canonical`);
  if (file !== '404.html' && (html.match(/hreflang=/g) || []).length !== 4) errors.push(`${label}: expected 4 hreflang links`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) errors.push(`${label}: duplicate IDs ${[...new Set(duplicateIds)].join(', ')}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    try { await access(target); } catch { errors.push(`${label}: broken local reference ${match[1]}`); }
  }
}

const allText = await Promise.all((await readdir(dist, { recursive: true })).filter((file) => /\.(html|js|css|xml|txt)$/.test(file)).map((file) => readFile(path.join(dist, file), 'utf8')));
const joined = allText.join('\n');
const forbidden = [
  ['old Gmail', /slab\.stores@gmail\.com/i],
  ['payment placeholder', /PADDLE_CHECKOUT_LINK/i],
  ['local host', /(?:localhost|127\.0\.0\.1)/i],
  ['temporary Cloudflare host', /(?:pages\.dev|workers\.dev)/i],
  ['fake testimonial section', /testimonial|what users say|trusted by pro/i],
  ['old business positioning', /AI Hardware Safety Diagnostics|Diagnostic Accuracy|Devices Audited|Certified Profiles/i]
];
for (const [name, pattern] of forbidden) if (pattern.test(joined)) errors.push(`site output contains ${name}`);
if (!joined.includes('simonlo@zimonai.com')) errors.push('formal email missing');
if (!joined.includes('19575746458')) errors.push('formal phone missing');

if (errors.length) {
  console.error(`Checks failed (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Checks passed: ${files.length} HTML pages, internal references, metadata, contact details and launch placeholders.`);
