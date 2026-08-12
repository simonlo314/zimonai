import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let file = path.join(root, decodeURIComponent(url.pathname));
    if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    const data = await readFile(path.join(root, '404.html'));
    response.writeHead(404, { 'content-type': types['.html'] });
    response.end(data);
  }
}).listen(port, '127.0.0.1', () => console.log(`ZimonAI preview: http://127.0.0.1:${port}`));
