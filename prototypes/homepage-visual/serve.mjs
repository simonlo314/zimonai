import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { renderPrototype } from './page.mjs';

const files = new Map([
  ['/prototype.css', ['./prototype.css', 'text/css; charset=utf-8']],
  ['/prototype.js', ['./prototype.js', 'text/javascript; charset=utf-8']],
  ['/assets/manufacturing-700.webp', ['./assets/manufacturing-700.webp', 'image/webp']],
  ['/assets/manufacturing-1500.webp', ['./assets/manufacturing-1500.webp', 'image/webp']],
  ...['zimonai-logo-primary.svg', 'favicon.svg', 'zimonai-t1-sample-report-cover.png'].map(name => [`/assets/${name}`, [`../../src/assets/${name}`, name.endsWith('.svg') ? 'image/svg+xml' : 'image/png']])
]);
const security = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'none'; font-src 'self'; frame-ancestors 'none'; form-action 'none'; base-uri 'none'"
};
const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { ...security, Allow: 'GET, HEAD' }); res.end(); return; }
  const url = new URL(req.url, 'http://127.0.0.1:4174');
  try {
    const file = files.get(url.pathname);
    if (url.pathname !== '/' && !file) { res.writeHead(404, security); res.end('This route is outside the homepage prototype.'); return; }
    const type = file?.[1] || 'text/html; charset=utf-8';
    const data = file ? await readFile(fileURLToPath(new URL(file[0], import.meta.url))) : renderPrototype();
    res.writeHead(200, { ...security, 'Content-Type': type });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) { console.error(error.message); res.writeHead(500, security); res.end('Prototype asset unavailable.'); }
});
server.listen(4174, '127.0.0.1', () => console.log('Homepage visual prototype: http://127.0.0.1:4174/ (local only)'));
