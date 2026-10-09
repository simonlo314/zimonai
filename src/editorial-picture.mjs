import { marketingPhotos } from './image-credits.mjs';

// Context photography, not case evidence. Credits live in the page's footer.
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function editorialPicture(copy, key, { className = '', eager = false, sizes = '(max-width: 760px) 100vw, 45vw' } = {}) {
  const asset = marketingPhotos[key];
  if (!asset?.base) throw new Error(`Unknown editorial photograph: ${key}`);
  return `<figure class="editorial-photo ${esc(className)}"><picture><source type="image/webp" srcset="/assets/${asset.base}-640.webp 640w, /assets/${asset.base}-1200.webp 1200w" sizes="${esc(sizes)}"><img src="/assets/${asset.base}.jpg" alt="${esc(copy[asset.alt])}" width="${asset.width}" height="${asset.height}" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} decoding="async"></picture><figcaption><span class="editorial-photo__caption">${esc(copy[asset.caption])}</span></figcaption></figure>`;
}
