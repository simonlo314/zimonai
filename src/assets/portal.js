const root = document.querySelector('[data-portal]');

if (root) {
  const copyNode = document.querySelector('#portal-copy');
  const copy = copyNode ? JSON.parse(copyNode.textContent || '{}') : {};
  const locale = root.dataset.locale || 'en';
  const loading = root.querySelector('[data-portal-loading]');
  const signedOut = root.querySelector('[data-portal-signed-out]');
  const signedIn = root.querySelector('[data-portal-signed-in]');
  const googleLogin = root.querySelector('[data-google-login]');
  const unavailable = root.querySelector('[data-auth-unavailable]');
  const authFeedback = root.querySelector('[data-auth-feedback]');
  const workspaceError = root.querySelector('[data-portal-error]');
  const caseList = root.querySelector('[data-portal-case-list]');
  const casesState = root.querySelector('[data-portal-cases-state]');
  const emptyState = root.querySelector('[data-portal-empty]');
  const caseForm = root.querySelector('[data-portal-case-form]');
  const formMessage = root.querySelector('[data-portal-form-message]');
  let csrfToken = '';
  let startupAuthMessage = '';

  function consumeAuthError() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('auth_error');
    if (!code) return '';
    const messages = {
      cancelled: copy.auth.errorCancelled,
      expired: copy.auth.errorExpired,
      invalid: copy.auth.errorInvalid,
      service: copy.auth.errorService
    };
    url.searchParams.delete('auth_error');
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
    return messages[code] || copy.auth.errorService || '';
  }

  function showSignedOut(authAvailable = true, { message = '', showUnavailable = !authAvailable } = {}) {
    root.dataset.state = 'signed-out';
    loading.hidden = true;
    signedIn.hidden = true;
    signedOut.hidden = false;
    signedOut.toggleAttribute('data-auth-unavailable-state', showUnavailable);
    googleLogin.hidden = !authAvailable;
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

  function accountReference(value) {
    const compact = String(value || '').replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase();
    return compact ? `ZMA-${compact}` : '—';
  }

  function populateUser(user) {
    setText('[data-portal-user-name]', user.name || user.email);
    setText('[data-portal-user-email]', user.email);
    setText('[data-account-email]', user.email);
    setText('[data-account-id]', accountReference(user.id));
    const localeNames = { en: 'English', 'zh-tw': '繁體中文', 'zh-cn': '简体中文' };
    setText('[data-account-locale]', localeNames[user.locale] || localeNames[locale]);
  }

  function setView(view, { focusForm = false } = {}) {
    root.querySelectorAll('[data-portal-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.portalPanel !== view;
    });
    root.querySelectorAll('.portal-tabs [role="tab"]').forEach((button) => {
      const selected = button.dataset.portalView === view;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (view === 'new' && focusForm) window.setTimeout(() => caseForm?.querySelector('input')?.focus(), 0);
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '—';
    return new Intl.DateTimeFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', {
      year: 'numeric', month: 'short', day: 'numeric'
    }).format(date);
  }

  function element(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function detailRow(label, value) {
    const row = document.createElement('div');
    const dt = element('dt', '', label);
    const dd = element('dd', '', value || '—');
    row.append(dt, dd);
    return row;
  }

  function renderCases(cases) {
    caseList.replaceChildren();
    emptyState.hidden = cases.length !== 0;
    if (!cases.length) return;

    for (const item of cases) {
      const article = element('article', 'portal-case');
      const reference = element('div', 'portal-case__ref', item.reference);
      const body = document.createElement('div');
      const status = element('span', 'portal-status', copy.workspace.status[item.status] || item.status);
      const title = element('h3', '', item.supplierName);
      const product = element('p', '', [item.productCategory, item.productModel].filter(Boolean).join(' · '));
      body.append(status, title, product);
      const details = document.createElement('dl');
      details.append(
        detailRow(copy.workspace.tier, Object.fromEntries(copy.form.tierOptions || [])[item.tier || 'unsure'] || String(item.tier || 'unsure').toUpperCase()),
        detailRow(copy.workspace.updated, formatDate(item.updatedAt))
      );
      article.append(reference, body, details);
      caseList.append(article);
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
      if (response.status === 401) {
        showSignedOut(true, { message: copy.auth.sessionEnded, showUnavailable: false });
        return;
      }
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
    } finally {
      caseList.removeAttribute('aria-busy');
    }
  }

  async function loadSession() {
    try {
      const response = await fetch('/api/portal/me', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) {
        showSignedOut(data.authEnabled !== false, { message: startupAuthMessage, showUnavailable: data.authEnabled === false });
        startupAuthMessage = '';
        return;
      }
      if (!response.ok || !data.authenticated) throw new Error('session_unavailable');
      csrfToken = data.csrfToken;
      populateUser(data.user);
      showSignedIn();
      await loadCases();
    } catch {
      showSignedOut(false, { message: copy.auth.sessionUnavailable, showUnavailable: false });
    }
  }

  root.querySelectorAll('[data-portal-view]').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.portalView));
  });
  const tabs = [...root.querySelectorAll('.portal-tabs [role="tab"]')];
  root.querySelector('.portal-tabs')?.addEventListener('keydown', (event) => {
    const activeIndex = tabs.indexOf(document.activeElement);
    if (activeIndex < 0 || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    else nextIndex = (activeIndex + 1) % tabs.length;
    tabs[nextIndex].focus();
    setView(tabs[nextIndex].dataset.portalView);
  });
  root.querySelector('[data-portal-open-new]')?.addEventListener('click', () => setView('new', { focusForm: true }));

  root.querySelector('[data-portal-logout]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = copy.workspace.loggingOut;
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'X-CSRF-Token': csrfToken }
      });
      if (!response.ok) throw new Error('logout_failed');
      csrfToken = '';
      showSignedOut(true, { message: copy.auth.logoutSuccess, showUnavailable: false });
    } catch {
      workspaceError.textContent = copy.workspace.logoutError;
      workspaceError.hidden = false;
      button.disabled = false;
      button.textContent = originalLabel;
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
    const originalLabel = copy.form.submit;
    submit.disabled = true;
    submitLabel.textContent = copy.form.submitting;
    const data = new FormData(caseForm);
    const payload = {
      supplierName: data.get('supplierName'),
      supplierUrl: data.get('supplierUrl'),
      chineseLegalName: data.get('chineseLegalName'),
      tier: data.get('tier'),
      productCategory: data.get('productCategory'),
      productModel: data.get('productModel'),
      decisionContext: data.get('decisionContext'),
      requestedChecks: data.get('requestedChecks'),
      consent: data.get('consent') === 'on'
    };

    try {
      const response = await fetch('/api/portal/cases', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
        body: JSON.stringify(payload)
      });
      if (response.status === 401) {
        showSignedOut(true, { message: copy.auth.sessionEnded, showUnavailable: false });
        return;
      }
      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 429 && responseData.error === 'case_submission_rate_limited') {
          throw new Error('case_submission_rate_limited');
        }
        if (response.status === 429 && responseData.error === 'open_case_limit_reached') {
          throw new Error('open_case_limit_reached');
        }
        throw new Error('case_submit_failed');
      }
      caseForm.reset();
      formMessage.textContent = copy.form.success;
      formMessage.classList.add('is-success');
      formMessage.hidden = false;
      formMessage.focus();
      await loadCases();
    } catch (error) {
      formMessage.textContent = error.message === 'case_submission_rate_limited'
        ? copy.form.rateLimited
        : error.message === 'open_case_limit_reached'
          ? copy.form.openLimit
          : copy.form.error;
      formMessage.hidden = false;
      formMessage.focus();
    } finally {
      submit.disabled = false;
      submitLabel.textContent = originalLabel;
    }
  });

  startupAuthMessage = consumeAuthError();
  loadSession();
}
