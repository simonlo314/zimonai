const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const analyticsEnabled = (location.hostname === 'zimonai.com' || location.hostname === 'www.zimonai.com')
  && document.documentElement.dataset.page !== 'portal'
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
  trackAnalytics('request_draft', 'email_draft');
  window.location.href = `mailto:simonlo@zimonai.com?subject=${encodeURIComponent(mailForm.dataset.mailSubject)}&body=${encodeURIComponent(body)}`;
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

checkoutForms.forEach((form) => form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('[data-checkout-button]');
  const error = form.querySelector('[data-checkout-error]');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (error) error.textContent = '';
  button.disabled = true;
  button.textContent = button.dataset.processingLabel;
  const data = new FormData(form);
  const product = form.dataset.product;
  trackAnalytics('checkout_start', product);
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product,
        locale: currentLocale(),
        quantity: Number(data.get('quantity') || 1),
        reference: data.get('reference') || ''
      })
    });
    const result = await response.json();
    if (!response.ok || !result.url) throw new Error(result.error || 'checkout_failed');
    window.location.assign(result.url);
  } catch {
    trackAnalytics('checkout_error', product);
    if (error) error.textContent = document.documentElement.lang === 'en' ? 'Checkout could not be opened. No payment was taken. Please contact ZimonAI.' : document.documentElement.lang === 'zh-Hant' ? '目前無法開啟付款頁，這次沒有扣款。請聯絡 ZimonAI。' : '目前无法打开付款页面，本次没有扣款。请联系 ZimonAI。';
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
    const response = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`, { headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error('invalid_session');
    confirmedPayment = result;
    const paid = result.paymentStatus === 'paid' || result.paymentStatus === 'no_payment_required';
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
