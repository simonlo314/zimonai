// Marketing photographs share one source registry and one page-local disclosure.
// Article evidence and article-image credits remain beside their own content.
export const marketingPhotos = Object.freeze({
  manufacturing: {
    author: 'Nenad Stojković / Shixart1985',
    title: 'Machine places components on a circuit board during manufacturing in a factory environment',
    source: 'https://commons.wikimedia.org/wiki/File:Machine_places_components_on_a_circuit_board_during_manufacturing_in_a_factory_environment.jpg',
    license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    alt: 'photoAlt', disclosure: 'photoCaption'
  },
  board: {
    base: 'editorial-power-supply-board', width: 1600, height: 954,
    author: 'Abolfazl Pahlavan', source: 'https://www.pexels.com/photo/electronic-circuit-board-with-various-components-33813265/',
    license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/',
    alt: 'boardAlt', caption: 'boardCaption'
  },
  chargers: {
    base: 'editorial-chargers-table', width: 1600, height: 1000,
    author: 'I’m Zion', source: 'https://www.pexels.com/photo/chargers-on-table-5948288/',
    license: 'Pexels License', licenseUrl: 'https://www.pexels.com/license/',
    alt: 'chargersAlt', caption: 'chargersCaption'
  }
});

const pagePhotos = Object.freeze({
  home: ['manufacturing', 'chargers'],
  services: ['chargers', 'manufacturing'],
  methodology: ['board']
});
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function footerImageCredits(copy, pageId) {
  const keys = pagePhotos[pageId];
  if (!keys) return '';
  const credits = keys.map(key => {
    const asset = marketingPhotos[key];
    return `<div><dt>${esc(copy[asset.alt])}</dt><dd><a href="${esc(asset.source)}">${esc(asset.author)}</a>${asset.title ? ` — <cite>${esc(asset.title)}</cite>` : ''}. <a href="${esc(asset.licenseUrl)}">${esc(asset.license)}</a>.${asset.disclosure ? `<p>${esc(copy[asset.disclosure])}</p>` : ''}</dd></div>`;
  }).join('');
  return `<div class="shell footer-image-credits"><details id="image-credit"><summary>${esc(copy.photoCredit)}</summary><div class="footer-image-credits__content"><p>${esc(copy.photoContext)}</p><dl>${credits}</dl><p>${esc(copy.photoChanges)}</p></div></details></div>`;
}
