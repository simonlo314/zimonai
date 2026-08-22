const root = document.querySelector('[data-portal]');

if (root) {
  const copy = JSON.parse(document.querySelector('#portal-copy')?.textContent || '{}');
  const locale = root.dataset.locale || 'en';
  const loading = root.querySelector('[data-portal-loading]');
  const signedOut = root.querySelector('[data-portal-signed-out]');
  const signedIn = root.querySelector('[data-portal-signed-in]');
  const googleLogin = root.querySelector('[data-google-login]');
  const emailAuth = root.querySelector('[data-email-auth]');
  const emailRequestForm = root.querySelector('[data-email-request-form]');
  const emailVerifyForm = root.querySelector('[data-email-verify-form]');
  const emailFeedback = root.querySelector('[data-email-feedback]');
  const unavailable = root.querySelector('[data-auth-unavailable]');
  const authFeedback = root.querySelector('[data-auth-feedback]');
  const workspaceError = root.querySelector('[data-portal-error]');
  const caseList = root.querySelector('[data-portal-case-list]');
  const casesState = root.querySelector('[data-portal-cases-state]');
  const emptyState = root.querySelector('[data-portal-empty]');
  const orderList = root.querySelector('[data-portal-order-list]');
  const ordersState = root.querySelector('[data-portal-orders-state]');
  const ordersEmpty = root.querySelector('[data-portal-orders-empty]');
  const caseForm = root.querySelector('[data-portal-case-form]');
  const formMessage = root.querySelector('[data-portal-form-message]');
  const adminLink = root.querySelector('[data-portal-admin-link]');
  const purchaseIntentKey = 'zimonai_purchase_intent_v1';
  let csrfToken = '';
  let pendingEmail = '';
  let startupAuthMessage = '';
  let ordersLoaded = false;
  let availableMethods = { google: false, email: false };

  const portalPath = () => locale === 'en' ? '/portal/' : `/${locale}/portal/`;

  function safePurchaseIntent() {
    let value;
    try { value = JSON.parse(sessionStorage.getItem(purchaseIntentKey) || 'null'); } catch { return null; }
    if (!value || typeof value !== 'object') return null;
    const products = new Set(['t1', 't2', 'consultation', 'consultation-extension', 'balance']);
    const quantity = Number(value.quantity || 1);
    if (!products.has(value.product) || !['en', 'zh-tw', 'zh-cn'].includes(value.locale)
      || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
    return { product: value.product, locale: value.locale, quantity, reference: String(value.reference || '').slice(0, 120) };
  }

  function resumePurchaseIfNeeded() {
    const intent = safePurchaseIntent();
    if (!intent) return false;
    const prefix = intent.locale === 'en' ? '' : `/${intent.locale}`;
    const onServices = ['t1', 't2'].includes(intent.product);
    const url = new URL(`${prefix}/${onServices ? 'services' : 'payments'}/`, location.origin);
    url.searchParams.set('resume_purchase', intent.product);
    url.hash = onServices ? intent.product : `pay-${intent.product}`;
    location.replace(`${url.pathname}${url.search}${url.hash}`);
    return true;
  }

  function consumeAuthError() {
    const url = new URL(location.href);
    const code = url.searchParams.get('auth_error');
    if (!code) return '';
    const messages = {
      cancelled: copy.auth.errorCancelled,
      expired: copy.auth.errorExpired,
      invalid: copy.auth.errorInvalid,
      service: copy.auth.errorService,
      email_link_required: copy.auth.errorEmailLinkRequired
    };
    url.searchParams.delete('auth_error');
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    return messages[code] || copy.auth.errorService || '';
  }

  function authCapabilities(data = {}) {
    const methods = data.authCapabilities || data.authMethods || {};
    if (typeof methods.google === 'boolean' || typeof methods.email === 'boolean') {
      return { google: methods.google === true, email: methods.email === true };
    }
    return { google: data.googleAuthEnabled === true, email: data.emailAuthEnabled === true };
  }

  function showSignedOut(methods = { google: false, email: false }, { message = '', showUnavailable = false } = {}) {
    root.dataset.state = 'signed-out';
    loading.hidden = true;
    signedIn.hidden = true;
    signedOut.hidden = false;
    signedOut.toggleAttribute('data-auth-unavailable-state', showUnavailable);
    googleLogin.hidden = !methods.google;
    emailAuth.hidden = !methods.email;
    unavailable.hidden = !showUnavailable;
    authFeedback.textContent = message;
    authFeedback.hidden = !message;
  }

  function showSignedIn() {
    root.dataset.state = 'signed-in';
    loading.hidden = true;
    signedOut.hidden = true;
    signedIn.hidden = false;
  }

  function setText(selector, value) {
    const node = root.querySelector(selector);
    if (node) node.textContent = value || '—';
  }

  function populateUser(user = {}) {
    setText('[data-portal-user-name]', user.name || user.email);
    setText('[data-portal-user-email]', user.email);
    setText('[data-account-email]', user.email);
    const compact = String(user.id || '').replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase();
    setText('[data-account-id]', compact ? `ZMA-${compact}` : '—');
    const localeNames = { en: 'English', 'zh-tw': '繁體中文', 'zh-cn': '简体中文' };
    setText('[data-account-locale]', localeNames[user.locale] || localeNames[locale]);
    adminLink.hidden = !(user.isAdmin === true || user.role === 'admin');
  }

  function setView(view, { focusForm = false } = {}) {
    root.querySelectorAll('[data-portal-panel]').forEach((panel) => { panel.hidden = panel.dataset.portalPanel !== view; });
    root.querySelectorAll('.portal-tabs [role="tab"]').forEach((button) => {
      const selected = button.dataset.portalView === view;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (view === 'orders' && !ordersLoaded) loadOrders();
    if (view === 'new' && focusForm) setTimeout(() => caseForm?.querySelector('input')?.focus(), 0);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '—';
    return new Intl.DateTimeFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }

  function formatAmount(amount, currency) {
    try {
      return new Intl.NumberFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', {
        style: 'currency', currency: String(currency || 'usd').toUpperCase()
      }).format(Number(amount || 0) / 100);
    } catch { return `${String(currency || 'USD').toUpperCase()} ${(Number(amount || 0) / 100).toFixed(2)}`; }
  }

  function element(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function detailRow(label, value) {
    const row = document.createElement('div');
    row.append(element('dt', '', label), element('dd', '', value || '—'));
    return row;
  }

  function renderCases(cases) {
    caseList.replaceChildren();
    emptyState.hidden = cases.length !== 0;
    const tiers = Object.fromEntries(copy.form.tierOptions || []);
    for (const item of cases) {
      const article = element('article', 'portal-case');
      const body = document.createElement('div');
      body.append(
        element('span', 'portal-status', copy.workspace.status[item.status] || item.status),
        element('h3', '', item.supplierName || item.chineseLegalName || '—'),
        element('p', '', [item.productCategory, item.productModel].filter(Boolean).join(' · ') || '—')
      );
      const details = document.createElement('dl');
      details.append(
        detailRow(copy.workspace.tier, tiers[item.tier || 'unsure'] || String(item.tier || 'unsure').toUpperCase()),
        detailRow(copy.workspace.updated, formatDate(item.updatedAt))
      );
      article.append(element('div', 'portal-case__ref', item.reference), body, details);
      caseList.append(article);
    }
  }

  function renderOrders(orders) {
    orderList.replaceChildren();
    ordersEmpty.hidden = orders.length !== 0;
    for (const item of orders) {
      const article = element('article', 'portal-order');
      const head = element('div', 'portal-order__head');
      head.append(element('span', 'portal-order__ref', item.reference), element('span', 'portal-status', copy.workspace.orderStatus[item.paymentStatus] || item.paymentStatus));
      const body = element('div', 'portal-order__body');
      body.append(element('h3', '', item.description || item.product || '—'));
      const details = document.createElement('dl');
      details.append(
        detailRow(copy.workspace.amount, formatAmount(item.amountTotal, item.currency)),
        detailRow(copy.workspace.ordered, formatDate(item.createdAt)),
        detailRow(copy.workspace.paymentStatus, copy.workspace.orderStatus[item.paymentStatus] || item.paymentStatus)
      );
      article.append(head, body, details);
      orderList.append(article);
    }
  }

  async function loadCases() {
    caseList.setAttribute('aria-busy', 'true');
    casesState.classList.remove('is-error');
    casesState.setAttribute('role', 'status');
    casesState.textContent = copy.workspace.casesLoading;
    casesState.hidden = false;
    emptyState.hidden = true;
    try {
      const response = await fetch('/api/portal/cases', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
      if (response.status === 401) { startupAuthMessage = copy.auth.sessionEnded; return loadSession(); }
      if (!response.ok) throw new Error('cases_unavailable');
      const data = await response.json();
      casesState.hidden = true;
      renderCases(Array.isArray(data.cases) ? data.cases : []);
    } catch {
      caseList.replaceChildren();
      casesState.textContent = copy.workspace.casesError;
      casesState.classList.add('is-error');
      casesState.setAttribute('role', 'alert');
      casesState.hidden = false;
    } finally { caseList.removeAttribute('aria-busy'); }
  }

  async function loadOrders() {
    orderList.setAttribute('aria-busy', 'true');
    ordersState.classList.remove('is-error');
    ordersState.setAttribute('role', 'status');
    ordersState.textContent = copy.workspace.ordersLoading;
    ordersState.hidden = false;
    ordersEmpty.hidden = true;
    try {
      const response = await fetch('/api/portal/orders', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
      if (response.status === 401) { startupAuthMessage = copy.auth.sessionEnded; return loadSession(); }
      if (!response.ok) throw new Error('orders_unavailable');
      const data = await response.json();
      ordersLoaded = true;
      ordersState.hidden = true;
      renderOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch {
      orderList.replaceChildren();
      ordersState.textContent = copy.workspace.ordersError;
      ordersState.classList.add('is-error');
      ordersState.setAttribute('role', 'alert');
      ordersState.hidden = false;
    } finally { orderList.removeAttribute('aria-busy'); }
  }

  async function loadSession() {
    try {
      const response = await fetch('/api/portal/me', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
      const data = await response.json().catch(() => ({}));
      availableMethods = authCapabilities(data);
      if (response.status === 401) {
        const noneAvailable = data.authEnabled === false || (!availableMethods.google && !availableMethods.email);
        showSignedOut(availableMethods, { message: startupAuthMessage, showUnavailable: noneAvailable });
        startupAuthMessage = '';
        return;
      }
      if (!response.ok || !data.authenticated) throw new Error('session_unavailable');
      csrfToken = data.csrfToken || '';
      populateUser(data.user || {});
      showSignedIn();
      if (resumePurchaseIfNeeded()) return;
      await loadCases();
    } catch { showSignedOut(availableMethods, { message: copy.auth.sessionUnavailable, showUnavailable: !availableMethods.google && !availableMethods.email }); }
  }

  emailRequestForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    emailFeedback.hidden = true;
    if (!emailRequestForm.reportValidity()) return;
    const button = emailRequestForm.querySelector('[data-email-request-button]');
    const email = String(new FormData(emailRequestForm).get('email') || '').trim();
    button.disabled = true;
    button.textContent = copy.auth.emailSending;
    try {
      const response = await fetch('/api/auth/email/request', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, locale, returnTo: portalPath() })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'email_request_failed');
      pendingEmail = email;
      emailRequestForm.hidden = true;
      emailVerifyForm.hidden = false;
      emailFeedback.textContent = copy.auth.emailSent;
      emailFeedback.classList.remove('is-error');
      emailFeedback.hidden = false;
      emailVerifyForm.querySelector('input[name="code"]')?.focus();
    } catch (error) {
      emailFeedback.textContent = error.message === 'email_code_rate_limited' ? copy.auth.emailRateLimited : copy.auth.emailRequestError;
      emailFeedback.classList.add('is-error');
      emailFeedback.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = copy.auth.emailSend;
    }
  });

  emailVerifyForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    emailFeedback.hidden = true;
    if (!emailVerifyForm.reportValidity() || !pendingEmail) return;
    const button = emailVerifyForm.querySelector('[data-email-verify-button]');
    const code = String(new FormData(emailVerifyForm).get('code') || '').trim();
    button.disabled = true;
    button.textContent = copy.auth.codeVerifying;
    try {
      const response = await fetch('/api/auth/email/verify', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: pendingEmail, code })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.authenticated) throw new Error(data.error || 'email_verify_failed');
      await loadSession();
    } catch (error) {
      emailFeedback.textContent = error.message === 'email_code_invalid_or_expired' ? copy.auth.emailExpired : copy.auth.emailVerifyError;
      emailFeedback.classList.add('is-error');
      emailFeedback.hidden = false;
      emailVerifyForm.querySelector('input[name="code"]')?.select();
    } finally {
      button.disabled = false;
      button.textContent = copy.auth.codeVerify;
    }
  });

  root.querySelector('[data-email-reset]')?.addEventListener('click', () => {
    pendingEmail = '';
    emailRequestForm.hidden = false;
    emailVerifyForm.hidden = true;
    emailRequestForm.reset();
    emailVerifyForm.reset();
    emailFeedback.hidden = true;
  });

  root.querySelectorAll('[data-portal-view]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.portalView)));
  const tabs = [...root.querySelectorAll('.portal-tabs [role="tab"]')];
  root.querySelector('.portal-tabs')?.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0 || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (current - 1 + tabs.length) % tabs.length : (current + 1) % tabs.length;
    tabs[next].focus();
    setView(tabs[next].dataset.portalView);
  });
  root.querySelector('[data-portal-open-new]')?.addEventListener('click', () => setView('new', { focusForm: true }));

  root.querySelector('[data-portal-logout]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const original = button.textContent;
    button.disabled = true;
    button.textContent = copy.workspace.loggingOut;
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin', headers: { 'X-CSRF-Token': csrfToken } });
      if (!response.ok) throw new Error('logout_failed');
      csrfToken = '';
      ordersLoaded = false;
      showSignedOut(availableMethods, { message: copy.auth.logoutSuccess, showUnavailable: !availableMethods.google && !availableMethods.email });
    } catch {
      workspaceError.textContent = copy.workspace.logoutError;
      workspaceError.hidden = false;
      button.disabled = false;
      button.textContent = original;
    }
  });

  caseForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessage.hidden = true;
    formMessage.classList.remove('is-success');
    caseForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
    if (!caseForm.reportValidity()) {
      const invalidFields = [...caseForm.querySelectorAll(':invalid')];
      invalidFields.forEach((field) => field.setAttribute('aria-invalid', 'true'));
      invalidFields[0]?.focus();
      return;
    }
    const submit = caseForm.querySelector('[type="submit"]');
    const submitLabel = caseForm.querySelector('[data-submit-label]');
    submit.disabled = true;
    submitLabel.textContent = copy.form.submitting;
    const data = new FormData(caseForm);
    const payload = {
      supplierName: data.get('supplierName'), supplierUrl: data.get('supplierUrl'), chineseLegalName: data.get('chineseLegalName'),
      tier: data.get('tier'), productCategory: data.get('productCategory'), productModel: data.get('productModel'),
      decisionContext: data.get('decisionContext'), requestedChecks: data.get('requestedChecks'), consent: data.get('consent') === 'on'
    };
    try {
      const response = await fetch('/api/portal/cases', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken }, body: JSON.stringify(payload)
      });
      if (response.status === 401) { startupAuthMessage = copy.auth.sessionEnded; return loadSession(); }
      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(responseData.error || 'case_submit_failed');
      caseForm.reset();
      formMessage.textContent = copy.form.success;
      formMessage.classList.add('is-success');
      formMessage.hidden = false;
      formMessage.focus();
      await loadCases();
    } catch (error) {
      formMessage.textContent = error.message === 'case_submission_rate_limited' ? copy.form.rateLimited
        : error.message === 'open_case_limit_reached' ? copy.form.openLimit : copy.form.error;
      formMessage.hidden = false;
      formMessage.focus();
    } finally {
      submit.disabled = false;
      submitLabel.textContent = copy.form.submit;
    }
  });

  googleLogin.href = `/api/auth/google/start?locale=${encodeURIComponent(locale)}&returnTo=${encodeURIComponent(portalPath())}`;
  startupAuthMessage = consumeAuthError();
  loadSession();
}
