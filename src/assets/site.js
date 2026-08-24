const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clientErrorEnabled = (location.hostname === 'zimonai.com' || location.hostname === 'www.zimonai.com')
  && !['portal', 'admin'].includes(document.documentElement.dataset.page)
  && navigator.doNotTrack !== '1'
  && navigator.globalPrivacyControl !== true;
const reportedClientErrors = new Set();
let clientErrorReportCount = 0;

function browserFamily() {
  const userAgent = navigator.userAgent || '';
  if (/Edg\//.test(userAgent)) return 'edge';
  if (/Firefox\//.test(userAgent)) return 'firefox';
  if (/(?:Chrome|CriOS)\//.test(userAgent)) return 'chrome';
  if (/Safari\//.test(userAgent)) return 'safari';
  return 'other';
}

function clientErrorCategory(value) {
  const categories = {
    TypeError: 'type',
    ReferenceError: 'reference',
    SyntaxError: 'syntax',
    RangeError: 'range',
    SecurityError: 'security',
    NetworkError: 'network',
    AbortError: 'abort',
    AggregateError: 'aggregate'
  };
  return categories[value?.name] || 'unknown';
}

function failedResourceType(target) {
  const tagName = String(target?.tagName || '').toLowerCase();
  if (tagName === 'script') return 'script';
  if (tagName === 'link' && String(target?.rel || '').toLowerCase() === 'stylesheet') return 'stylesheet';
  if (tagName === 'img' || tagName === 'picture' || tagName === 'source') return 'image';
  if (tagName === 'audio' || tagName === 'video' || tagName === 'track') return 'media';
  if (tagName === 'iframe') return 'iframe';
  return 'other';
}

function reportClientError({ kind, category = 'unknown', resourceType = 'none' }) {
  if (!clientErrorEnabled || clientErrorReportCount >= 5) return;
  const signature = `${kind}:${category}:${resourceType}`;
  if (reportedClientErrors.has(signature)) return;
  reportedClientErrors.add(signature);
  clientErrorReportCount += 1;

  const payload = JSON.stringify({
    kind,
    category,
    resourceType,
    browser: browserFamily(),
    page: location.pathname
  });
  const body = new Blob([payload], { type: 'application/json' });
  let queued = false;
  try {
    queued = typeof navigator.sendBeacon === 'function'
      && navigator.sendBeacon('/api/client-errors', body);
  } catch {
    queued = false;
  }
  if (!queued) {
    void fetch('/api/client-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      credentials: 'omit',
      keepalive: true
    }).catch(() => {});
  }
}

window.addEventListener('error', (event) => {
  const target = event.target;
  if (target && target !== window && target.tagName) {
    reportClientError({ kind: 'resource', category: 'load', resourceType: failedResourceType(target) });
    return;
  }
  reportClientError({ kind: 'runtime', category: clientErrorCategory(event.error) });
}, true);

window.addEventListener('unhandledrejection', (event) => {
  reportClientError({ kind: 'promise', category: clientErrorCategory(event.reason) });
});

const analyticsEnabled = (location.hostname === 'zimonai.com' || location.hostname === 'www.zimonai.com')
  && !['portal', 'admin'].includes(document.documentElement.dataset.page)
  && navigator.doNotTrack !== '1'
  && navigator.globalPrivacyControl !== true;

function analyticsDevice() {
  if (window.matchMedia('(max-width: 640px)').matches) return 'mobile';
  if (window.matchMedia('(max-width: 1024px)').matches) return 'tablet';
  return 'desktop';
}

function trackAnalytics(event, target = '') {
  if (!analyticsEnabled || !navigator.sendBeacon) return;
  const payload = JSON.stringify({
    event,
    target,
    page: location.pathname,
    referrer: document.referrer,
    device: analyticsDevice()
  });
  navigator.sendBeacon('/api/analytics', new Blob([payload], { type: 'application/json' }));
}

if (analyticsEnabled) {
  trackAnalytics('page_view');
  try {
    if (!sessionStorage.getItem('zimonai_analytics_session')) {
      sessionStorage.setItem('zimonai_analytics_session', '1');
      trackAnalytics('session_start');
    }
  } catch {
    // Analytics never blocks the website when storage is unavailable.
  }
}

function navigationPerformanceBucket(milliseconds) {
  if (milliseconds < 200) return '0000-0199';
  if (milliseconds < 500) return '0200-0499';
  if (milliseconds < 1000) return '0500-0999';
  if (milliseconds < 2000) return '1000-1999';
  if (milliseconds < 5000) return '2000-4999';
  if (milliseconds < 15000) return '5000-14999';
  return '15000-plus';
}

function navigationPerformanceSampled() {
  try {
    if (sessionStorage.getItem('zimonai_navigation_performance_reported') === '1') return false;
    let sampled = sessionStorage.getItem('zimonai_navigation_performance_sample');
    if (sampled === null) {
      const value = new Uint8Array(1);
      crypto.getRandomValues(value);
      sampled = value[0] < 38 ? '1' : '0';
      sessionStorage.setItem('zimonai_navigation_performance_sample', sampled);
    }
    if (sampled !== '1') return false;
    sessionStorage.setItem('zimonai_navigation_performance_reported', '1');
    return true;
  } catch {
    return false;
  }
}

function reportNavigationPerformance() {
  if (!analyticsEnabled || !navigationPerformanceSampled()) return;
  const navigation = performance.getEntriesByType?.('navigation')?.[0];
  if (!navigation) return;
  const ttfb = Math.max(0, navigation.responseStart - navigation.startTime);
  const duration = Math.max(0, navigation.duration);
  if (!Number.isFinite(ttfb) || !Number.isFinite(duration)) return;
  trackAnalytics('navigation_performance', `ttfb:${navigationPerformanceBucket(ttfb)}`);
  trackAnalytics('navigation_performance', `duration:${navigationPerformanceBucket(duration)}`);
}

if (document.readyState === 'complete') {
  queueMicrotask(reportNavigationPerformance);
} else {
  window.addEventListener('load', reportNavigationPerformance, { once: true });
}

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
const navFrame = nav?.querySelector('[data-nav-frame]');
const navLinks = [...(nav?.querySelectorAll(':scope > .nav-link') || [])];
const desktopNav = window.matchMedia('(min-width: 1051px)');

function positionNavFrame(target) {
  if (!nav || !navFrame || !target || !desktopNav.matches) return;
  const navRect = nav.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  navFrame.style.width = `${targetRect.width}px`;
  navFrame.style.height = `${targetRect.height}px`;
  navFrame.style.transform = `translate3d(${targetRect.left - navRect.left}px, ${targetRect.top - navRect.top}px, 0)`;
  navFrame.classList.add('is-visible');
}

function restoreNavFrame() {
  const currentLink = navLinks.find((link) => link.getAttribute('aria-current') === 'page');
  if (currentLink) positionNavFrame(currentLink);
  else navFrame?.classList.remove('is-visible');
}

navLinks.forEach((link) => {
  link.addEventListener('pointerenter', () => positionNavFrame(link));
  link.addEventListener('focus', () => positionNavFrame(link));
});
nav?.addEventListener('pointerleave', restoreNavFrame);
nav?.addEventListener('focusout', (event) => {
  if (!nav.contains(event.relatedTarget)) restoreNavFrame();
});
window.addEventListener('resize', restoreNavFrame, { passive: true });
desktopNav.addEventListener('change', (event) => {
  if (event.matches) {
    navToggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  restoreNavFrame();
});
requestAnimationFrame(restoreNavFrame);

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
serviceSelectors.forEach((selector) => selector.addEventListener('click', () => {
  trackAnalytics('tier_select', selector.dataset.serviceSelect || 'unknown');
  selectServiceTier(selector.dataset.serviceSelect, true);
}));
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

const inquiryForm = document.querySelector('[data-inquiry-form]');
inquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const error = inquiryForm.querySelector('[data-form-error]');
  const status = inquiryForm.querySelector('[data-inquiry-status]');
  const statusTitle = inquiryForm.querySelector('[data-inquiry-status-title]');
  const statusMessage = inquiryForm.querySelector('[data-inquiry-status-message]');
  const submit = inquiryForm.querySelector('[data-inquiry-submit]');
  const submitLabel = inquiryForm.querySelector('[data-inquiry-submit-label]');
  const defaultLabel = submitLabel?.textContent || '';
  if (error) error.textContent = '';
  if (status) status.hidden = true;
  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    if (error) error.textContent = inquiryForm.dataset.validationMessage || '';
    return;
  }
  const formData = new FormData(inquiryForm);
  const value = (name) => String(formData.get(name) || '').trim();
  const payload = {
    locale: inquiryForm.dataset.inquiryLocale || 'en',
    name: value('name'),
    email: value('email'),
    company: value('company'),
    supplier: value('supplier'),
    url: value('url'),
    chinese: value('chinese'),
    product: value('product'),
    question: value('question'),
    consent: formData.get('consent') === 'on',
    website: value('website')
  };
  inquiryForm.setAttribute('aria-busy', 'true');
  if (submit) submit.disabled = true;
  if (submitLabel) submitLabel.textContent = inquiryForm.dataset.submittingMessage || defaultLabel;
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.accepted !== true || !result.reference) {
      if (error) error.textContent = response.status === 429
        ? inquiryForm.dataset.rateLimitMessage || inquiryForm.dataset.errorMessage || ''
        : inquiryForm.dataset.errorMessage || '';
      return;
    }
    inquiryForm.reset();
    if (statusTitle) statusTitle.textContent = inquiryForm.dataset.successTitle || '';
    if (statusMessage) statusMessage.textContent = `${inquiryForm.dataset.successBody || ''} ${result.reference}`.trim();
    if (status) {
      status.hidden = false;
      status.focus();
    }
    trackAnalytics('request_submit', 'accepted');
  } catch {
    if (error) error.textContent = inquiryForm.dataset.errorMessage || '';
  } finally {
    inquiryForm.removeAttribute('aria-busy');
    if (submit) submit.disabled = false;
    if (submitLabel) submitLabel.textContent = defaultLabel;
  }
});

const supportOpen = document.querySelector('[data-support-open]');
const supportClose = document.querySelector('[data-support-close]');
const supportPanel = document.querySelector('[data-support-panel]');
const supportBackdrop = document.querySelector('[data-support-backdrop]');
const supportFocusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let supportReturnFocus = null;

function supportFocusableItems() {
  if (!supportPanel) return [];
  return [...supportPanel.querySelectorAll(supportFocusableSelector)].filter((item) => !item.hidden && item.getClientRects().length);
}

function setSupportOpen(open) {
  if (!supportPanel || !supportOpen || !supportBackdrop) return;
  const wasOpen = supportPanel.classList.contains('is-open');
  if (open === wasOpen) return;
  if (open) supportReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : supportOpen;
  supportPanel.classList.toggle('is-open', open);
  supportPanel.setAttribute('aria-hidden', String(!open));
  supportPanel.inert = !open;
  supportOpen.setAttribute('aria-expanded', String(open));
  supportBackdrop.hidden = !open;
  document.body.classList.toggle('support-dialog-open', open);
  if (open) {
    trackAnalytics('support_open', location.pathname.includes('payment') ? 'payment' : 'site');
    requestAnimationFrame(() => (supportFocusableItems()[0] || supportPanel).focus());
  } else {
    const returnTarget = supportReturnFocus?.isConnected ? supportReturnFocus : supportOpen;
    supportReturnFocus = null;
    returnTarget.focus();
  }
}
supportOpen?.addEventListener('click', () => setSupportOpen(supportOpen.getAttribute('aria-expanded') !== 'true'));
supportClose?.addEventListener('click', () => setSupportOpen(false));
supportBackdrop?.addEventListener('click', () => setSupportOpen(false));
document.addEventListener('keydown', (event) => {
  if (!supportPanel?.classList.contains('is-open')) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    setSupportOpen(false);
    return;
  }
  if (event.key !== 'Tab') return;
  const items = supportFocusableItems();
  if (!items.length) {
    event.preventDefault();
    supportPanel.focus();
    return;
  }
  const first = items[0];
  const last = items.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

async function copyContactValue(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Continue to the browser-compatible fallback below.
    }
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, field.value.length);
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { copied = false; }
  field.remove();
  return copied;
}

document.querySelectorAll('[data-copy-contact]').forEach((button) => button.addEventListener('click', async () => {
  const copied = await copyContactValue(button.dataset.copyContact || '');
  button.classList.toggle('is-copied', copied);
  button.classList.toggle('is-copy-error', !copied);
  button.textContent = copied ? button.dataset.copiedLabel : button.dataset.copyErrorLabel;
  window.setTimeout(() => {
    button.classList.remove('is-copied', 'is-copy-error');
    button.textContent = button.dataset.copyLabel;
  }, 1800);
}));

function currentLocale() {
  if (document.documentElement.lang === 'zh-Hant') return 'zh-tw';
  if (document.documentElement.lang === 'zh-Hans') return 'zh-cn';
  return 'en';
}

const checkoutForms = [...document.querySelectorAll('[data-checkout-form]')];
const paymentParams = new URLSearchParams(location.search);
const requestedPaymentItem = paymentParams.get('item');
const resumedPaymentItem = paymentParams.get('resume_purchase');
const purchaseIntentKey = 'zimonai_purchase_intent_v1';
const privatePayment = document.querySelector('[data-private-payment]');
if (requestedPaymentItem === 'consultation-extension' && privatePayment) privatePayment.hidden = false;
if (paymentParams.get('cancelled') === '1') {
  const cancelledForm = document.querySelector(`[data-checkout-form][data-product="${CSS.escape(requestedPaymentItem || '')}"]`) || checkoutForms[0];
  const error = cancelledForm?.querySelector('[data-checkout-error]');
  if (error) error.textContent = document.documentElement.lang === 'en' ? 'Checkout was cancelled. No payment was taken.' : document.documentElement.lang === 'zh-Hant' ? '付款已取消，這次沒有扣款。' : '付款已取消，本次没有扣款。';
}
if (requestedPaymentItem) {
  window.setTimeout(() => document.querySelector(`[data-payment-card="${CSS.escape(requestedPaymentItem)}"]`)?.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' }), 250);
}

function portalPathForLocale(locale) {
  return locale === 'en' ? '/portal/' : `/${locale}/portal/`;
}

function safeCheckoutIntent(value) {
  if (!value || typeof value !== 'object') return null;
  const products = new Set(['t1', 't2', 'consultation', 'consultation-extension', 'balance']);
  const quantity = Number(value.quantity || 1);
  if (!products.has(value.product) || !['en', 'zh-tw', 'zh-cn'].includes(value.locale)
    || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
  return { product: value.product, locale: value.locale, quantity, reference: String(value.reference || '').slice(0, 120) };
}

function readCheckoutIntent() {
  try { return safeCheckoutIntent(JSON.parse(sessionStorage.getItem(purchaseIntentKey) || 'null')); }
  catch { return null; }
}

function saveCheckoutIntent(intent) {
  try { sessionStorage.setItem(purchaseIntentKey, JSON.stringify(safeCheckoutIntent(intent))); }
  catch { /* Sign-in can still continue when browser storage is unavailable. */ }
}

if (resumedPaymentItem) {
  const intent = readCheckoutIntent();
  if (intent?.product === resumedPaymentItem && intent.locale === currentLocale()) {
    const form = document.querySelector(`[data-checkout-form][data-product="${CSS.escape(intent.product)}"]`);
    if (form) {
      if (['t1', 't2'].includes(intent.product)) selectServiceTier(intent.product, true);
      const quantity = form.querySelector('[name="quantity"]');
      const reference = form.querySelector('[name="reference"]');
      if (quantity) quantity.value = String(intent.quantity);
      if (reference) reference.value = intent.reference;
      const notice = form.querySelector('[data-checkout-resume]');
      if (notice) {
        notice.hidden = false;
        window.setTimeout(() => {
          notice.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
          notice.focus({ preventScroll: true });
        }, 120);
      }
      sessionStorage.removeItem(purchaseIntentKey);
    }
  }
}

checkoutForms.forEach((form) => form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('[data-checkout-button]');
  const error = form.querySelector('[data-checkout-error]');
  if (error) error.textContent = '';
  const data = new FormData(form);
  const product = form.dataset.product;
  const intent = safeCheckoutIntent({
    product,
    locale: currentLocale(),
    quantity: Number(data.get('quantity') || 1),
    reference: data.get('reference') || ''
  });
  if (!intent) {
    if (error) error.textContent = document.documentElement.lang === 'en' ? 'The purchase details are invalid. No payment was taken.' : document.documentElement.lang === 'zh-Hant' ? '購買資料無效，這次沒有扣款。' : '购买资料无效，本次没有扣款。';
    button.disabled = false;
    button.innerHTML = `${button.dataset.defaultLabel}<svg class="icon-arrow" aria-hidden="true" viewBox="0 0 20 20"><path d="M3 10h13M11 5l5 5-5 5"/></svg>`;
    return;
  }
  try {
    const sessionResponse = await fetch('/api/portal/me', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    });
    const session = await sessionResponse.json().catch(() => ({}));
    if (sessionResponse.status === 401 || session.error === 'authentication_required') {
      saveCheckoutIntent(intent);
      button.disabled = true;
      button.textContent = form.dataset.loginLabel;
      window.location.assign(portalPathForLocale(intent.locale));
      return;
    }
    if (!sessionResponse.ok || !session.csrfToken) throw new Error(session.error || 'checkout_session_unavailable');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    button.disabled = true;
    button.textContent = button.dataset.processingLabel;
    trackAnalytics('checkout_start', product);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': session.csrfToken },
      body: JSON.stringify({
        product: intent.product,
        locale: intent.locale,
        quantity: intent.quantity,
        reference: intent.reference
      })
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 401 || result.error === 'authentication_required') {
      saveCheckoutIntent(intent);
      button.textContent = form.dataset.loginLabel;
      window.location.assign(portalPathForLocale(intent.locale));
      return;
    }
    if (!response.ok || !result.url) throw new Error(result.error || 'checkout_failed');
    window.location.assign(result.url);
  } catch (failure) {
    trackAnalytics('checkout_error', product);
    if (error) {
      error.textContent = failure?.message === 'owned_service_reference_required'
        ? form.dataset.referenceError
        : form.dataset.checkoutError;
    }
    button.disabled = false;
    button.innerHTML = `${button.dataset.defaultLabel}<svg class="icon-arrow" aria-hidden="true" viewBox="0 0 20 20"><path d="M3 10h13M11 5l5 5-5 5"/></svg>`;
  }
}));

const paymentResult = document.querySelector('[data-payment-result]');
const receipt = document.querySelector('.payment-receipt');
const intakeSection = document.querySelector('[data-payment-intake]');
const intakeForm = document.querySelector('[data-payment-intake-form]');
const consultationFields = document.querySelector('[data-consultation-fields]');
const verificationFields = document.querySelector('[data-verification-fields]');
const balanceDone = document.querySelector('[data-balance-done]');
let confirmedPayment = null;

function fillPaymentField(selector, value) {
  const field = document.querySelector(selector);
  if (field) field.textContent = value || '—';
}

function setGroupRequired(group, names) {
  group?.querySelectorAll('input, textarea, select').forEach((field) => { field.required = names.includes(field.name); });
}

async function loadPaymentResult() {
  if (!paymentResult) return;
  const sessionId = new URLSearchParams(location.search).get('session_id') || '';
  if (!sessionId) {
    receipt.dataset.state = 'invalid';
    fillPaymentField('[data-payment-status]', paymentResult.dataset.invalid);
    return;
  }
  try {
    const response = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}&locale=${encodeURIComponent(currentLocale())}`, { headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error('invalid_session');
    confirmedPayment = result;
    const paid = result.paymentStatus === 'paid' || result.paymentStatus === 'waived';
    receipt.dataset.state = paid ? 'paid' : 'pending';
    fillPaymentField('[data-payment-status]', paid ? paymentResult.dataset.verified : paymentResult.dataset.pending);
    fillPaymentField('[data-payment-item]', result.productName);
    fillPaymentField('[data-payment-amount]', new Intl.NumberFormat(document.documentElement.lang, { style: 'currency', currency: String(result.currency || 'usd').toUpperCase() }).format(Number(result.amountTotal || 0) / 100));
    fillPaymentField('[data-payment-email]', result.receiptEmail);
    fillPaymentField('[data-payment-reference]', result.reference);
    fillPaymentField('[data-payment-session]', result.id);
    if (!paid) return;
    trackAnalytics('payment_confirmed', result.product);
    if (result.product === 'balance') {
      balanceDone.hidden = false;
      return;
    }
    intakeSection.hidden = false;
    intakeForm.dataset.product = result.product;
    const consultation = result.product === 'consultation' || result.product === 'consultation-extension';
    consultationFields.hidden = !consultation;
    verificationFields.hidden = consultation;
    setGroupRequired(consultationFields, consultation ? ['timezone', 'times', 'format', 'question'] : []);
    setGroupRequired(verificationFields, consultation ? [] : ['supplier', 'product', 'decision']);
  } catch {
    receipt.dataset.state = 'invalid';
    fillPaymentField('[data-payment-status]', paymentResult.dataset.invalid);
    fillPaymentField('[data-payment-session]', sessionId);
  }
}
loadPaymentResult();

intakeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!intakeForm.checkValidity()) {
    intakeForm.reportValidity();
    return;
  }
  const data = new FormData(intakeForm);
  const product = intakeForm.dataset.product;
  const consultation = product === 'consultation' || product === 'consultation-extension';
  const lines = consultation ? [
    ['Stripe session', confirmedPayment?.id], ['Service', confirmedPayment?.productName], ['Time zone', data.get('timezone')],
    ['Preferred times', data.get('times')], ['Format', data.get('format')], ['', ''], ['Questions / documents', data.get('question')]
  ] : [
    ['Stripe session', confirmedPayment?.id], ['Service', confirmedPayment?.productName], ['Supplier', data.get('supplier')],
    ['Supplier URL', data.get('url')], ['Chinese legal name', data.get('chinese')], ['Product and model', data.get('product')],
    ['Certificate numbers', data.get('certificates')], ['', ''], ['Decision this work should support', data.get('decision')]
  ];
  const body = lines.map(([label, value]) => label ? `${label}: ${value || '—'}` : '').join('\n');
  const subject = `ZimonAI post-payment intake · ${confirmedPayment?.id || product}`;
  trackAnalytics('post_payment_intake', product);
  window.location.href = `mailto:simonlo@zimonai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  const rawHref = link.getAttribute('href') || '';

  if (link.closest('.lang-switch__menu')) {
    const target = link.getAttribute('lang') || rawHref.split('/').filter(Boolean)[0] || 'en';
    trackAnalytics('language_select', target);
    return;
  }
  if (rawHref.startsWith('mailto:')) {
    trackAnalytics('contact_click', 'email');
    return;
  }
  if (rawHref.startsWith('tel:+8619575746458')) {
    trackAnalytics('contact_click', 'china_phone');
    return;
  }
  if (rawHref.startsWith('tel:+886988307998')) {
    trackAnalytics('contact_click', 'taiwan_phone');
    return;
  }
  if (rawHref.startsWith('https://wa.me/886988307998')) {
    trackAnalytics('contact_click', 'whatsapp');
    return;
  }

  let url;
  try { url = new URL(link.href, location.href); } catch { return; }
  const tier = url.hash.match(/^#(t[1-6])$/)?.[1];
  if (tier && /\/services\/$/.test(url.pathname)) {
    trackAnalytics('tier_select', tier);
    return;
  }
  if (/\/request-verification\/$/.test(url.pathname)) {
    trackAnalytics('cta_click', 'discuss_requirement');
    return;
  }
  if (link.closest('[data-nav]')) {
    const section = url.pathname.split('/').filter(Boolean).pop() || 'home';
    trackAnalytics('nav_click', section);
  }
});
