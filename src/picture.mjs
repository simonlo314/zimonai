const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
// Derivatives are only of owner-approved assets, never generated replacement scenes.
export function approvedPicture({ src, width, height, alt, sizes = '(max-width: 760px) 100vw, 36vw' }) {
  const base = src.replace(/\.png$/, '');
  const cover = base.endsWith('zimonai-t1-sample-report-cover');
  const sourceSet = cover ? `${base}-320.webp 320w` : `${base}-320.webp 320w, ${base}-640.webp ${width}w`;
  return `<picture><source type="image/webp" srcset="${sourceSet}" sizes="${esc(sizes)}"><img src="${esc(src)}" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async"></picture>`;
}
