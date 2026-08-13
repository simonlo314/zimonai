const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8%', threshold: .08 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
  document.body.style.overflow = !open ? 'hidden' : '';
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
  document.body.style.overflow = '';
}));

const langSwitch = document.querySelector('[data-lang-switch]');
const langButton = document.querySelector('[data-lang-button]');
langButton?.addEventListener('click', () => {
  const open = langButton.getAttribute('aria-expanded') === 'true';
  langButton.setAttribute('aria-expanded', String(!open));
  langSwitch?.classList.toggle('is-open', !open);
});
document.addEventListener('click', (event) => {
  if (!langSwitch || langSwitch.contains(event.target)) return;
  langSwitch.classList.remove('is-open');
  langButton?.setAttribute('aria-expanded', 'false');
});

const dossier = document.querySelector('[data-hero-dossier]');
const runButton = document.querySelector('[data-run-demo]');
const runLabel = document.querySelector('[data-run-label]');
const checkRows = [...document.querySelectorAll('[data-check-row]')];
const demoProgress = document.querySelector('[data-demo-progress]');
const demoAnnouncement = document.querySelector('[data-demo-announcement]');
let demoHasRun = false;
let demoRunning = false;

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

async function runDossier() {
  if (!dossier || !runButton || demoRunning) return;
  demoRunning = true;
  dossier.classList.add('is-running');
  runButton.disabled = true;
  runLabel.textContent = runButton.dataset.running;
  checkRows.forEach((row) => {
    row.removeAttribute('data-state');
    row.classList.remove('is-checking');
    row.querySelector('.check-row__value').textContent = row.querySelector('.check-row__value').dataset.pending;
  });
  if (demoProgress) demoProgress.style.width = '0%';
  const delay = reducedMotion ? 1 : 560;
  for (const [index, row] of checkRows.entries()) {
    row.classList.add('is-checking');
    if (demoProgress) demoProgress.style.width = `${Math.round(((index + .45) / checkRows.length) * 100)}%`;
    await wait(delay);
    row.classList.remove('is-checking');
    row.dataset.state = row.dataset.finalState;
    row.querySelector('.check-row__value').textContent = row.querySelector('.check-row__value').dataset.final;
    if (demoProgress) demoProgress.style.width = `${Math.round(((index + 1) / checkRows.length) * 100)}%`;
  }
  dossier.classList.remove('is-running');
  demoAnnouncement.textContent = document.documentElement.lang === 'en'
    ? 'Demonstration complete.'
    : document.documentElement.lang === 'zh-Hant' ? '示範核查完成。' : '演示核查完成。';
  demoAnnouncement.style.opacity = '1';
  runLabel.textContent = runButton.dataset.reset;
  runButton.disabled = false;
  demoHasRun = true;
  demoRunning = false;
}
runButton?.addEventListener('click', runDossier);

if (dossier && !reducedMotion && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting || demoHasRun) return;
    window.setTimeout(runDossier, 550);
    observer.disconnect();
  }, { threshold: .55 });
  heroObserver.observe(dossier);
}

const stageFile = document.querySelector('[data-stage-file]');
const stageTitle = document.querySelector('[data-stage-title]');
const stageTag = document.querySelector('[data-stage-tag]');
const stageCounter = document.querySelector('[data-stage-counter]');
const storySteps = [...document.querySelectorAll('[data-story-step]')];
const stageNames = {
  en: { claim: 'SUPPLIER CLAIM', source: 'SOURCE RECORD', compare: 'CROSS-CHECK', result: 'EVIDENCE RESULT' },
  'zh-Hant': { claim: '供應商宣稱', source: '來源紀錄', compare: '交叉核對', result: '證據結果' },
  'zh-Hans': { claim: '供应商说法', source: '来源记录', compare: '交叉核对', result: '证据结果' }
};
function setStoryStep(step) {
  if (!stageFile || !step) return;
  storySteps.forEach((item) => item.classList.toggle('is-active', item === step));
  stageFile.dataset.stage = step.dataset.stage;
  stageTitle.textContent = step.querySelector('h3')?.textContent || '';
  stageTag.textContent = stageNames[document.documentElement.lang]?.[step.dataset.stage] || step.dataset.stage;
  stageCounter.textContent = `0${Number(step.dataset.index) + 1} / 04`;
}
if (storySteps.length && 'IntersectionObserver' in window) {
  const storyObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setStoryStep(visible.target);
  }, { rootMargin: '-32% 0px -42%', threshold: [0, .25, .5, .75] });
  storySteps.forEach((step) => storyObserver.observe(step));
}

const comparisonRange = document.querySelector('[data-comparison-range]');
const comparisonRecord = document.querySelector('[data-comparison-record]');
const comparisonSeam = document.querySelector('[data-comparison-seam]');
function updateComparison() {
  const value = Number(comparisonRange?.value || 50);
  if (comparisonRecord) comparisonRecord.style.clipPath = `inset(0 0 0 ${value}%)`;
  if (comparisonSeam) comparisonSeam.style.left = `${value}%`;
}
comparisonRange?.addEventListener('input', updateComparison);
updateComparison();

const demoTabs = [...document.querySelectorAll('[data-demo-tab]')];
const demoPanels = [...document.querySelectorAll('[data-demo-panel]')];
demoTabs.forEach((tab) => tab.addEventListener('click', () => {
  demoTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  demoPanels.forEach((panel) => {
    const active = panel.dataset.demoPanel === tab.dataset.demoTab;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
}));

const serviceSelectors = [...document.querySelectorAll('[data-service-select]')];
const servicePanels = [...document.querySelectorAll('[data-service-panel]')];
function selectServiceTier(id, updateUrl = false) {
  if (!serviceSelectors.some((item) => item.dataset.serviceSelect === id)) return;
  serviceSelectors.forEach((item) => {
    const active = item.dataset.serviceSelect === id;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  servicePanels.forEach((panel) => {
    const active = panel.dataset.servicePanel === id;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
  if (updateUrl) history.replaceState(null, '', `#${id}`);
}
serviceSelectors.forEach((selector) => selector.addEventListener('click', () => selectServiceTier(selector.dataset.serviceSelect, true)));
if (serviceSelectors.length) {
  const requestedTier = location.hash.slice(1);
  selectServiceTier(serviceSelectors.some((item) => item.dataset.serviceSelect === requestedTier) ? requestedTier : serviceSelectors[0].dataset.serviceSelect);
  window.addEventListener('hashchange', () => selectServiceTier(location.hash.slice(1)));
}

const methodNodes = [...document.querySelectorAll('[data-method-node]')];
const methodFields = {
  check: document.querySelector('[data-method-check]'),
  why: document.querySelector('[data-method-why]'),
  source: document.querySelector('[data-method-source]'),
  results: document.querySelector('[data-method-results]')
};
methodNodes.forEach((node) => node.addEventListener('click', () => {
  methodNodes.forEach((item) => {
    const active = item === node;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  Object.entries(methodFields).forEach(([key, field]) => {
    if (!field) return;
    field.animate?.([{ opacity: .1, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: reducedMotion ? 1 : 260, easing: 'ease-out' });
    field.textContent = node.dataset[key] || '';
  });
}));

const cursorLabel = document.querySelector('[data-cursor-label]');
if (cursorLabel && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('pointermove', (event) => {
    cursorLabel.style.left = `${event.clientX}px`;
    cursorLabel.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.querySelectorAll('[data-cursor]').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      cursorLabel.textContent = element.dataset.cursor;
      cursorLabel.classList.add('is-visible');
    });
    element.addEventListener('pointerleave', () => cursorLabel.classList.remove('is-visible'));
  });
}

if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .08;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}

const mailForm = document.querySelector('[data-mail-form]');
mailForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const error = mailForm.querySelector('[data-form-error]');
  if (!mailForm.checkValidity()) {
    mailForm.reportValidity();
    if (error) error.textContent = document.documentElement.lang === 'en' ? 'Complete the required fields and acknowledgement.' : document.documentElement.lang === 'zh-Hant' ? '請完成必填欄位並勾選確認。' : '请完成必填字段并勾选确认。';
    return;
  }
  if (error) error.textContent = '';
  const data = new FormData(mailForm);
  const lines = [
    ['Name', data.get('name')], ['Email', data.get('email')], ['Company', data.get('company')],
    ['Supplier', data.get('supplier')], ['Supplier URL', data.get('url')],
    ['Chinese company name', data.get('chinese')], ['Product', data.get('product')],
    ['', ''], ['Verification question', data.get('question')]
  ];
  const body = lines.map(([label, value]) => label ? `${label}: ${value || '—'}` : '').join('\n');
  window.location.href = `mailto:simonlo@zimonai.com?subject=${encodeURIComponent(mailForm.dataset.mailSubject)}&body=${encodeURIComponent(body)}`;
});

const transition = document.createElement('div');
transition.className = 'page-transition';
transition.setAttribute('aria-hidden', 'true');
document.body.append(transition);
requestAnimationFrame(() => transition.classList.add('is-ready'));
document.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', (event) => {
  const url = new URL(link.href, window.location.href);
  const samePageHash = url.pathname === location.pathname && url.hash;
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || url.origin !== location.origin || url.protocol === 'mailto:' || url.protocol === 'tel:' || samePageHash || reducedMotion) return;
  event.preventDefault();
  transition.classList.add('is-leaving');
  window.setTimeout(() => { window.location.href = url.href; }, 180);
}));
