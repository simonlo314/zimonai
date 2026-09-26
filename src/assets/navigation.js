// Navigation disclosures keep native links, rather than ARIA menu-item semantics.
export function initializeNavigation(root = document, view = window) {
  const nav = root.querySelector('[data-nav]');
  const toggle = root.querySelector('[data-nav-toggle]');
  if (!nav || !toggle) return;
  const desktop = view.matchMedia('(min-width: 1051px)');
  const hover = view.matchMedia('(hover: hover) and (pointer: fine)');
  const language = root.querySelector('[data-lang-switch]');
  const languageButton = root.querySelector('[data-lang-button]');
  const disclosures = [...root.querySelectorAll('[data-mega]')].map(element => ({
    element, button: element.querySelector('[data-mega-toggle]'), panel: element.querySelector('.mega-panel'), timer: null
  }));
  if (language && languageButton) disclosures.push({
    element: language, button: languageButton, panel: language.querySelector('.lang-switch__menu'), timer: null
  });
  const openLabel = toggle.textContent.trim();
  const closeLabel = toggle.dataset.closeLabel || openLabel;
  let previousOverflow = null;

  function setDisclosure(item, open) {
    view.clearTimeout(item.timer);
    item.button.setAttribute('aria-expanded', String(open));
    item.panel.hidden = !open;
    item.element.classList.toggle('is-open', open);
  }
  function closeAll(except = null) {
    disclosures.forEach(item => { if (item !== except) setDisclosure(item, false); });
  }
  function openDisclosure(item, focus = false) {
    closeAll(item);
    setDisclosure(item, true);
    if (focus) item.panel.querySelector('a')?.focus();
  }
  function setMobile(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
    nav.classList.toggle('is-open', open);
    if (open) {
      if (previousOverflow === null) previousOverflow = root.body.style.overflow;
      root.body.style.overflow = 'hidden';
    } else {
      if (previousOverflow !== null) root.body.style.overflow = previousOverflow;
      previousOverflow = null;
      closeAll();
      if (restoreFocus) toggle.focus();
    }
  }
  toggle.addEventListener('click', () => setMobile(toggle.getAttribute('aria-expanded') !== 'true'));
  disclosures.forEach(item => {
    item.button.addEventListener('click', () => {
      const open = item.button.getAttribute('aria-expanded') === 'true';
      if (open) setDisclosure(item, false);
      else openDisclosure(item);
    });
    item.button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      openDisclosure(item, true);
    });
    item.element.addEventListener('focusout', event => {
      if (!item.element.contains(event.relatedTarget)) setDisclosure(item, false);
    });
    item.element.addEventListener('pointerenter', () => {
      if (!desktop.matches || !hover.matches || item.element === language) return;
      view.clearTimeout(item.timer);
      item.timer = view.setTimeout(() => openDisclosure(item), 220);
    });
    item.element.addEventListener('pointerleave', () => {
      if (!desktop.matches || !hover.matches) return;
      view.clearTimeout(item.timer);
      if (item.element.contains(root.activeElement)) return;
      item.timer = view.setTimeout(() => setDisclosure(item, false), 280);
    });
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMobile(false);
  });
  nav.addEventListener('focusout', event => {
    if (!desktop.matches && !nav.contains(event.relatedTarget) && event.relatedTarget !== toggle) setMobile(false);
  });
  root.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setMobile(false);
    else if (!disclosures.some(item => item.element.contains(event.target))) closeAll();
  });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const item = disclosures.find(entry => entry.button.getAttribute('aria-expanded') === 'true');
    if (item) {
      event.preventDefault();
      setDisclosure(item, false);
      item.button.focus();
    } else if (toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setMobile(false, true);
    }
  });
  desktop.addEventListener('change', () => setMobile(false));
  view.addEventListener('pagehide', () => setMobile(false));
}
