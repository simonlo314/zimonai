import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeNavigation } from '../src/assets/navigation.js';

function fixture({ desktop = true } = {}) {
  let root;
  class Element {
    constructor(text = '') {
      this.textContent = text; this.attrs = {}; this.dataset = {};
      this.listeners = {}; this.children = []; this.hidden = false;
      this.classes = new Set();
      this.classList = { toggle: (key, on) => on ? this.classes.add(key) : this.classes.delete(key) };
    }
    setAttribute(key, value) { this.attrs[key] = value; }
    getAttribute(key) { return this.attrs[key] ?? null; }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    fire(type, data = {}) { for (const handler of this.listeners[type] || []) handler({ target: this, preventDefault() {}, ...data }); }
    querySelector(selector) { return this.selectors?.[selector] || null; }
    contains(node) { return node === this || this.children.some(child => child.contains(node)); }
    focus() { root.activeElement = this; }
    closest(selector) { return selector === 'a' && this.isLink ? this : null; }
  }
  root = new Element();
  root.body = { style: { overflow: 'auto' } };
  const nav = new Element(), toggle = new Element('Menu');
  toggle.dataset.closeLabel = 'Close menu';
  toggle.setAttribute('aria-expanded', 'false');
  const makeDisclosure = (label, language = false) => {
    const element = new Element(), button = new Element(label), panel = new Element(), link = new Element(label + ' link');
    link.isLink = true;
    panel.hidden = true; panel.children = [link]; panel.selectors = { a: link };
    button.setAttribute('aria-expanded', 'false');
    element.children = [button, panel];
    element.selectors = language ? { '.lang-switch__menu': panel } : { '[data-mega-toggle]': button, '.mega-panel': panel };
    return { element, button, panel, link };
  };
  const services = makeDisclosure('Services'), resources = makeDisclosure('Resources'), language = makeDisclosure('Language', true);
  nav.children = [services.element, resources.element, language.element];
  root.selectors = { '[data-nav]': nav, '[data-nav-toggle]': toggle, '[data-lang-switch]': language.element, '[data-lang-button]': language.button };
  root.querySelectorAll = () => [services.element, resources.element];
  const desktopMedia = new Element(); desktopMedia.matches = desktop;
  const timers = new Map(); let nextTimer = 0;
  const view = new Element();
  view.matchMedia = query => query.includes('min-width') ? desktopMedia : { matches: true };
  view.setTimeout = handler => { timers.set(++nextTimer, handler); return nextTimer; };
  view.clearTimeout = id => timers.delete(id);
  initializeNavigation(root, view);
  return { root, nav, toggle, services, resources, language, desktopMedia,
    flushTimers() { const pending = [...timers.values()]; timers.clear(); pending.forEach(fn => fn()); } };
}

test('language disclosure updates hidden, aria state and closes the other menu', () => {
  const f = fixture();
  f.services.button.fire('click');
  assert.equal(f.services.panel.hidden, false);
  f.language.button.fire('click');
  assert.equal(f.services.panel.hidden, true);
  assert.equal(f.language.panel.hidden, false);
  assert.equal(f.language.button.getAttribute('aria-expanded'), 'true');
  f.language.button.fire('click');
  assert.equal(f.language.panel.hidden, true);
});

test('ArrowDown enters links and Escape returns focus to the exact trigger', () => {
  const f = fixture();
  f.resources.button.fire('keydown', { key: 'ArrowDown' });
  assert.equal(f.root.activeElement, f.resources.link);
  f.root.fire('keydown', { key: 'Escape' });
  assert.equal(f.resources.panel.hidden, true);
  assert.equal(f.root.activeElement, f.resources.button);
});

test('mobile close restores prior body scroll, resets panels and returns focus', () => {
  const f = fixture({ desktop: false });
  f.toggle.fire('click');
  assert.equal(f.root.body.style.overflow, 'hidden');
  assert.equal(f.toggle.getAttribute('aria-label'), 'Close menu');
  f.services.button.fire('click');
  f.root.fire('keydown', { key: 'Escape' });
  assert.equal(f.toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(f.services.panel.hidden, true);
  f.root.fire('keydown', { key: 'Escape' });
  assert.equal(f.root.body.style.overflow, 'auto');
  assert.equal(f.root.activeElement, f.toggle);
  assert.equal(f.toggle.getAttribute('aria-label'), 'Menu');
});

test('leaving mobile nav with keyboard and changing breakpoint never leaves a scroll lock', () => {
  const f = fixture({ desktop: false });
  f.toggle.fire('click');
  f.nav.fire('focusout', { relatedTarget: null });
  assert.equal(f.root.body.style.overflow, 'auto');
  f.toggle.fire('click');
  f.desktopMedia.matches = true;
  f.desktopMedia.fire('change');
  assert.equal(f.toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(f.root.body.style.overflow, 'auto');
});

test('hover intent is cancelled on leave and never overrides focused menu contents', () => {
  const f = fixture();
  f.services.element.fire('pointerenter');
  assert.equal(f.services.panel.hidden, true);
  f.services.element.fire('pointerleave');
  f.flushTimers();
  assert.equal(f.services.panel.hidden, true);
  f.services.element.fire('pointerenter');
  f.flushTimers();
  assert.equal(f.services.panel.hidden, false);
  f.services.link.focus();
  f.services.element.fire('pointerleave');
  f.flushTimers();
  assert.equal(f.services.panel.hidden, false);
});

test('outside clicks and following real links close disclosures', () => {
  const f = fixture({ desktop: false });
  f.toggle.fire('click');
  f.language.button.fire('click');
  f.nav.fire('click', { target: f.language.link });
  assert.equal(f.language.panel.hidden, true);
  assert.equal(f.root.body.style.overflow, 'auto');
  f.resources.button.fire('click');
  f.root.fire('click');
  assert.equal(f.resources.panel.hidden, true);
});
