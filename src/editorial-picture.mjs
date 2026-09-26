// Existing real photographs only. Source and disclosure travel with every use.
// A photograph illustrates the product category; it is never case evidence.
const assets = {
  board: {
    base: 'editorial-power-supply-board', width: 1600, height: 954,
    author: 'Abolfazl Pahlavan', source: 'https://www.pexels.com/photo/electronic-circuit-board-with-various-components-33813265/',
    alt: 'boardAlt', caption: 'boardCaption'
  },
  chargers: {
    base: 'editorial-chargers-table', width: 1600, height: 1000,
    author: "I’m Zion", source: 'https://www.pexels.com/photo/chargers-on-table-5948288/',
    alt: 'chargersAlt', caption: 'chargersCaption'
  }
};
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function editorialPicture(copy, key, { className = '', eager = false, sizes = '(max-width: 760px) 100vw, 45vw' } = {}) {
  const asset = assets[key];
  if (!asset) throw new Error(`Unknown editorial photograph: ${key}`);
  return `<figure class="editorial-photo ${esc(className)}"><picture><source type="image/webp" srcset="/assets/${asset.base}-640.webp 640w, /assets/${asset.base}-1200.webp 1200w" sizes="${esc(sizes)}"><img src="/assets/${asset.base}.jpg" alt="${esc(copy[asset.alt])}" width="${asset.width}" height="${asset.height}" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} decoding="async"></picture><figcaption><span class="editorial-photo__caption">${esc(copy[asset.caption])}</span><small>${esc(copy.photoContext)} <a href="${asset.source}">${esc(asset.author)} / Pexels</a></small></figcaption></figure>`;
}
