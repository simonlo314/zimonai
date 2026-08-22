const root = document.querySelector('[data-admin]');

if (root) {
  const copy = JSON.parse(document.querySelector('#admin-copy')?.textContent || '{}');
  const locale = root.dataset.locale || 'en';
  const loading = root.querySelector('[data-admin-loading]');
  const access = root.querySelector('[data-admin-access]');
  const workspace = root.querySelector('[data-admin-workspace]');
  const globalError = root.querySelector('[data-admin-error]');
  const createForm = root.querySelector('[data-admin-case-form]');
  const createMessage = root.querySelector('[data-admin-form-message]');
  const caches = { cases: null, orders: null, customers: null, notifications: null };
  let csrfToken = '';
  let emailConfigured = false;

  const api = async (path, options = {}) => {
    const response = await fetch(path, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.method && options.method !== 'GET' ? { 'X-CSRF-Token': csrfToken } : {}), ...(options.headers || {}) },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'request_failed');
      error.status = response.status;
      throw error;
    }
    return data;
  };

  function element(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '—';
    return new Intl.DateTimeFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }

  function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '—';
    return new Intl.DateTimeFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  }

  function dateTimeValue(value) {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return '';
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  function formatAmount(value, currency) {
    try {
      return new Intl.NumberFormat(locale === 'en' ? 'en' : locale === 'zh-cn' ? 'zh-CN' : 'zh-TW', { style: 'currency', currency: String(currency || 'usd').toUpperCase() }).format(Number(value || 0) / 100);
    } catch { return `${String(currency || 'USD').toUpperCase()} ${(Number(value || 0) / 100).toFixed(2)}`; }
  }

  function field(label, value) {
    const row = element('div', 'admin-record__field');
    row.append(element('dt', '', label), element('dd', '', value || '—'));
    return row;
  }

  function feedbackNode() {
    const feedback = element('div', 'admin-action-feedback');
    feedback.hidden = true;
    feedback.setAttribute('role', 'status');
    return feedback;
  }

  function setFeedback(node, message, error = false) {
    node.textContent = message;
    node.classList.toggle('is-error', error);
    node.setAttribute('role', error ? 'alert' : 'status');
    node.hidden = false;
  }

  function selectField(label, name, choices, current) {
    const wrapper = element('label', 'admin-action-field');
    wrapper.append(element('span', '', label));
    const select = document.createElement('select');
    select.name = name;
    for (const [value, text] of choices) {
      const option = element('option', '', text);
      option.value = value;
      option.selected = value === current;
      select.append(option);
    }
    wrapper.append(select);
    return wrapper;
  }

  function inputField(label, name, value = '', type = 'text') {
    const wrapper = element('label', 'admin-action-field');
    wrapper.append(element('span', '', label));
    const input = document.createElement('input');
    input.name = name;
    input.type = type;
    input.value = value || '';
    wrapper.append(input);
    return wrapper;
  }

  function textareaField(label, name, value = '') {
    const wrapper = element('label', 'admin-action-field admin-action-field--wide');
    wrapper.append(element('span', '', label));
    const textarea = document.createElement('textarea');
    textarea.name = name;
    textarea.rows = 3;
    textarea.value = value || '';
    wrapper.append(textarea);
    return wrapper;
  }

  function actionDetails(title) {
    const details = element('details', 'admin-action');
    details.append(element('summary', '', title));
    return details;
  }

  function caseUpdate(item) {
    const details = actionDetails(copy.actions.caseDetails);
    const form = element('form', 'admin-action-form');
    const feedback = feedbackNode();
    const statusChoices = Object.entries(copy.status || {});
    const fields = element('div', 'admin-action-fields');
    fields.append(
      selectField(copy.fields.status, 'status', statusChoices, item.status),
      inputField(copy.actions.expectedDelivery, 'expectedDeliveryAt', dateTimeValue(item.expectedDeliveryAt), 'datetime-local'),
      textareaField(copy.actions.clientNote, 'clientStatusNote', item.clientStatusNote),
      textareaField(copy.actions.internalNote, 'internalNote', item.internalNote)
    );
    const button = element('button', 'admin-action-submit', copy.actions.saveCase);
    button.type = 'submit';
    form.append(fields, feedback, button);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = copy.actions.saving;
      const data = new FormData(form);
      try {
        await api(`/api/admin/cases/${encodeURIComponent(item.id)}`, {
          method: 'PATCH', body: JSON.stringify({
            status: data.get('status'), expectedDeliveryAt: data.get('expectedDeliveryAt') || null,
            clientStatusNote: data.get('clientStatusNote'), internalNote: data.get('internalNote')
          })
        });
        item.status = String(data.get('status') || item.status);
        item.expectedDeliveryAt = data.get('expectedDeliveryAt') || null;
        item.clientStatusNote = String(data.get('clientStatusNote') || '');
        item.internalNote = String(data.get('internalNote') || '');
        const status = details.closest('.admin-record')?.querySelector('.admin-record__status');
        if (status) status.textContent = copy.status[item.status] || item.status;
        setFeedback(feedback, copy.actions.caseSaved);
        caches.cases = null;
      } catch { setFeedback(feedback, copy.actions.actionError, true); }
      finally { button.disabled = false; button.textContent = copy.actions.saveCase; }
    });
    details.append(form);
    return details;
  }

  function manualOrder(item) {
    const details = actionDetails(copy.actions.createOrder);
    const help = element('p', 'admin-action-help', copy.actions.orderHelp);
    const form = element('form', 'admin-action-form');
    const fields = element('div', 'admin-action-fields');
    const productChoices = ['consultation', 'consultation-extension', 'balance', 't1', 't2', 't3', 't4', 't5', 't6', 'custom'].map((value) => [value, value.toUpperCase()]);
    const productField = selectField(copy.actions.orderProduct, 'product', productChoices, item.tier === 'unsure' ? 'custom' : item.tier);
    const description = inputField(copy.actions.orderDescription, 'description', [item.tier?.toUpperCase(), item.supplierName].filter(Boolean).join(' · '));
    description.querySelector('input').required = true;
    const amount = inputField(copy.actions.orderAmount, 'amount', '', 'number');
    amount.querySelector('input').min = '0';
    amount.querySelector('input').step = '0.01';
    amount.querySelector('input').required = true;
    const currency = inputField(copy.actions.orderCurrency, 'currency', 'USD');
    currency.querySelector('input').maxLength = 3;
    const quantity = inputField(copy.actions.orderQuantity, 'quantity', '1', 'number');
    quantity.querySelector('input').min = '1';
    quantity.querySelector('input').max = '100';
    const reference = inputField(copy.actions.serviceReference, 'serviceReference', item.reference || '');
    const note = textareaField(copy.actions.paymentMethodNote, 'paymentMethodNote', '');
    fields.append(productField, description, amount, currency, quantity, reference, note);
    const feedback = feedbackNode();
    const button = element('button', 'admin-action-submit', copy.actions.createUnpaid);
    button.type = 'submit';
    form.append(fields, feedback, button);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const amountTotal = Math.round(Number(data.get('amount')) * 100);
      button.disabled = true;
      button.textContent = copy.actions.saving;
      try {
        await api('/api/admin/orders', { method: 'POST', body: JSON.stringify({
          caseId: item.id, product: data.get('product'), description: data.get('description'), amountTotal,
          currency: String(data.get('currency') || 'USD').toLowerCase(), quantity: Number(data.get('quantity') || 1),
          serviceReference: data.get('serviceReference'), paymentMethodNote: data.get('paymentMethodNote')
        }) });
        form.reset();
        setFeedback(feedback, copy.actions.orderCreated);
        caches.orders = null;
      } catch { setFeedback(feedback, copy.actions.actionError, true); }
      finally { button.disabled = false; button.textContent = copy.actions.createUnpaid; }
    });
    details.append(help, form);
    return details;
  }

  function orderUpdate(item) {
    const details = actionDetails(copy.actions.paymentDetails);
    const form = element('form', 'admin-action-form');
    const fields = element('div', 'admin-action-fields');
    const payment = selectField(copy.fields.status, 'paymentStatus', Object.entries(copy.paymentStatus || {}), item.paymentStatus);
    if (item.source === 'stripe') payment.querySelector('select').disabled = true;
    fields.append(
      payment,
      selectField(copy.actions.fulfillment, 'fulfillmentStatus', Object.entries(copy.fulfillmentStatus || {}), item.fulfillmentStatus),
      textareaField(copy.actions.paymentMethodNote, 'paymentMethodNote', item.paymentMethodNote)
    );
    const feedback = feedbackNode();
    const button = element('button', 'admin-action-submit', copy.actions.saveOrder);
    button.type = 'submit';
    form.append(fields, feedback, button);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = { fulfillmentStatus: data.get('fulfillmentStatus'), paymentMethodNote: data.get('paymentMethodNote') };
      if (item.source !== 'stripe') payload.paymentStatus = data.get('paymentStatus');
      button.disabled = true;
      button.textContent = copy.actions.saving;
      try {
        await api(`/api/admin/orders/${encodeURIComponent(item.id)}`, { method: 'PATCH', body: JSON.stringify(payload) });
        if (payload.paymentStatus) item.paymentStatus = payload.paymentStatus;
        item.fulfillmentStatus = payload.fulfillmentStatus;
        item.paymentMethodNote = payload.paymentMethodNote;
        const status = details.closest('.admin-record')?.querySelector('.admin-record__status');
        if (status) status.textContent = copy.paymentStatus[item.paymentStatus] || item.paymentStatus;
        setFeedback(feedback, copy.actions.orderSaved);
        caches.orders = null;
      } catch { setFeedback(feedback, copy.actions.actionError, true); }
      finally { button.disabled = false; button.textContent = copy.actions.saveOrder; }
    });
    details.append(form);
    return details;
  }

  function caseCard(item, queue = false) {
    const card = element('article', 'admin-record');
    const head = element('header', 'admin-record__head');
    head.append(element('span', 'admin-record__reference', item.reference), element('span', 'admin-record__status', copy.status[item.status] || item.status));
    const title = element('h3', '', item.supplierName || item.chineseLegalName || item.ownerEmail || '—');
    const details = element('dl', 'admin-record__details');
    details.append(
      field(copy.fields.customer, item.ownerEmail), field(copy.fields.product, [item.productCategory, item.productModel].filter(Boolean).join(' · ')),
      field(copy.fields.service, String(item.tier || 'unsure').toUpperCase()), field(copy.fields.updated, formatDate(item.updatedAt))
    );
    if (queue) details.append(field(copy.fields.nextAction, copy.status[item.status] || item.status));
    const actions = element('div', 'admin-record__actions');
    actions.append(caseUpdate(item), manualOrder(item));
    card.append(head, title, details, actions);
    return card;
  }

  function orderCard(item) {
    const card = element('article', 'admin-record');
    const head = element('header', 'admin-record__head');
    head.append(element('span', 'admin-record__reference', item.reference), element('span', 'admin-record__status', copy.paymentStatus[item.paymentStatus] || item.paymentStatus));
    const details = element('dl', 'admin-record__details');
    details.append(
      field(copy.fields.customer, item.ownerEmail), field(copy.fields.product, item.description || item.product),
      field(copy.fields.amount, formatAmount(item.amountTotal, item.currency)), field(copy.fields.updated, formatDate(item.updatedAt))
    );
    card.append(head, element('h3', '', item.description || item.product || '—'), details, orderUpdate(item));
    return card;
  }

  function customerCard(item) {
    const card = element('article', 'admin-record admin-record--customer');
    const head = element('header', 'admin-record__head');
    head.append(element('span', 'admin-record__reference', item.id), element('span', 'admin-record__status', item.pendingInvitation ? copy.actions.invitation : copy.actions.verified));
    const details = element('dl', 'admin-record__details');
    details.append(field(copy.fields.email, item.email), field(copy.fields.cases, String(item.caseCount || 0)), field(copy.fields.orders, String(item.orderCount || 0)), field(copy.fields.created, formatDate(item.createdAt)));
    card.append(head, element('h3', '', item.name || item.email || '—'), details);
    return card;
  }

  function updateEmailConfiguration(configured) {
    emailConfigured = configured === true;
    const banner = root.querySelector('[data-admin-email-config]');
    if (!banner) return;
    banner.textContent = emailConfigured ? copy.notifications.configured : copy.notifications.unconfigured;
    banner.classList.toggle('is-unconfigured', !emailConfigured);
    banner.hidden = false;
    root.querySelectorAll('.admin-notification-retry').forEach((button) => { button.disabled = !emailConfigured; });
  }

  function notificationCard(item) {
    const card = element('article', 'admin-record admin-record--notification');
    const head = element('header', 'admin-record__head');
    const status = element('span', 'admin-record__status', copy.notificationStatus[item.status] || item.status);
    head.append(element('span', 'admin-record__reference', item.id), status);
    const details = element('dl', 'admin-record__details admin-record__details--notification');
    details.append(
      field(copy.fields.recipient, item.recipientEmail),
      field(copy.fields.notificationType, copy.notificationType[item.type] || item.type),
      field(copy.fields.attempts, String(item.attempts || 0)),
      field(copy.fields.created, formatDateTime(item.createdAt)),
      field(copy.fields.lastAttempt, formatDateTime(item.lastAttemptAt)),
      field(copy.fields.sentAt, formatDateTime(item.sentAt)),
      field(copy.fields.deliveryError, item.lastError || '—')
    );
    card.append(head, element('h3', '', item.recipientEmail || '—'), details);
    if (item.status === 'failed') {
      const actions = element('div', 'admin-notification-action');
      const feedback = feedbackNode();
      const button = element('button', 'admin-action-submit admin-notification-retry', copy.notifications.retry);
      button.type = 'button';
      button.disabled = !emailConfigured;
      button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = copy.notifications.retrying;
        try {
          const result = await api('/api/admin/notifications', {
            method: 'POST', body: JSON.stringify({ notificationId: item.id })
          });
          if (result.delivery?.configured !== true) {
            updateEmailConfiguration(false);
            setFeedback(feedback, copy.notifications.retryUnavailable, true);
            return;
          }
          if (Number(result.delivery.sent || 0) > 0) {
            item.status = 'sent';
            item.sentAt = new Date().toISOString();
            status.textContent = copy.notificationStatus.sent;
            button.hidden = true;
            setFeedback(feedback, copy.notifications.retried);
          } else {
            item.status = 'failed';
            status.textContent = copy.notificationStatus.failed;
            setFeedback(feedback, copy.notifications.retryFailed, true);
          }
          caches.notifications = null;
        } catch {
          setFeedback(feedback, copy.notifications.retryFailed, true);
        } finally {
          if (!button.hidden && emailConfigured) button.disabled = false;
          button.textContent = copy.notifications.retry;
        }
      });
      actions.append(feedback, button);
      card.append(actions);
    }
    return card;
  }

  async function fetchCases(force = false) {
    if (caches.cases && !force) return caches.cases;
    caches.cases = (await api('/api/admin/cases')).cases || [];
    return caches.cases;
  }

  async function fetchOrders(force = false) {
    if (caches.orders && !force) return caches.orders;
    caches.orders = (await api('/api/admin/orders')).orders || [];
    return caches.orders;
  }

  async function fetchCustomers(force = false) {
    if (caches.customers && !force) return caches.customers;
    const data = await api('/api/admin/customers');
    caches.customers = [
      ...(data.customers || []).map((item) => ({ ...item, pendingInvitation: false })),
      ...(data.invitations || []).map((item) => ({ ...item, pendingInvitation: true, orderCount: 0 }))
    ];
    return caches.customers;
  }

  async function fetchNotifications(force = false) {
    if (caches.notifications && !force) return caches.notifications;
    const data = await api('/api/admin/notifications');
    updateEmailConfiguration(data.emailConfigured === true);
    caches.notifications = data.notifications || [];
    return caches.notifications;
  }

  async function loadView(view, { force = false } = {}) {
    if (view === 'create') return;
    const state = root.querySelector(`[data-admin-state="${view}"]`);
    const list = root.querySelector(`[data-admin-list="${view}"]`);
    state.hidden = false;
    state.classList.remove('is-error');
    state.setAttribute('role', 'status');
    state.textContent = copy.views[view].loading;
    list.replaceChildren();
    list.setAttribute('aria-busy', 'true');
    try {
      let records;
      if (view === 'cases') records = await fetchCases(force);
      else if (view === 'queue') records = (await fetchCases(force)).filter((item) => !['delivered', 'closed'].includes(item.status));
      else if (view === 'orders') records = await fetchOrders(force);
      else if (view === 'customers') records = await fetchCustomers(force);
      else records = await fetchNotifications(force);
      if (!records.length) {
        state.textContent = copy.views[view].empty;
        return;
      }
      state.hidden = true;
      for (const item of records) list.append(view === 'orders' ? orderCard(item) : view === 'customers' ? customerCard(item) : view === 'notifications' ? notificationCard(item) : caseCard(item, view === 'queue'));
    } catch (error) {
      if (error.status === 401 || error.status === 403) return showAccess(error.status === 403);
      state.textContent = copy.views[view].error;
      state.classList.add('is-error');
      state.setAttribute('role', 'alert');
    } finally { list.removeAttribute('aria-busy'); }
  }

  function showAccess(denied = false) {
    root.dataset.state = 'access';
    loading.hidden = true;
    workspace.hidden = true;
    access.hidden = false;
    root.querySelector('[data-admin-access-title]').textContent = denied ? copy.accessDeniedTitle : copy.signedOutTitle;
    root.querySelector('[data-admin-access-text]').textContent = denied ? copy.accessDeniedText : copy.signedOutText;
  }

  function setView(view) {
    root.querySelectorAll('[data-admin-panel]').forEach((panel) => { panel.hidden = panel.dataset.adminPanel !== view; });
    root.querySelectorAll('.admin-tabs [role="tab"]').forEach((button) => {
      const selected = button.dataset.adminView === view;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    loadView(view);
  }

  root.querySelectorAll('[data-admin-view]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.adminView)));
  const tabs = [...root.querySelectorAll('.admin-tabs [role="tab"]')];
  root.querySelector('.admin-tabs')?.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : event.key === 'ArrowLeft' ? (current - 1 + tabs.length) % tabs.length : (current + 1) % tabs.length;
    tabs[next].focus();
    setView(tabs[next].dataset.adminView);
  });

  createForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    createMessage.hidden = true;
    if (!createForm.reportValidity()) return;
    const button = createForm.querySelector('[type="submit"]');
    const label = createForm.querySelector('[data-admin-submit-label]');
    const data = new FormData(createForm);
    button.disabled = true;
    label.textContent = copy.form.submitting;
    try {
      await api('/api/admin/cases', { method: 'POST', body: JSON.stringify({
        customerEmail: data.get('customerEmail'), locale, tier: data.get('tier'), supplierName: data.get('supplierName'),
        supplierUrl: data.get('supplierUrl'), chineseLegalName: data.get('chineseLegalName'), productCategory: data.get('productCategory'),
        productModel: data.get('productModel'), decisionContext: data.get('decisionContext'), requestedChecks: data.get('requestedChecks')
      }) });
      createForm.reset();
      createMessage.textContent = copy.form.success;
      createMessage.classList.remove('is-error');
      createMessage.hidden = false;
      caches.cases = null;
      caches.customers = null;
    } catch {
      createMessage.textContent = copy.form.error;
      createMessage.classList.add('is-error');
      createMessage.hidden = false;
    } finally { button.disabled = false; label.textContent = copy.form.submit; }
  });

  (async () => {
    try {
      const data = await api('/api/portal/me');
      if (!data.authenticated || data.user?.isAdmin !== true) return showAccess(Boolean(data.authenticated));
      csrfToken = data.csrfToken || '';
      root.querySelector('[data-admin-user-name]').textContent = data.user.name || data.user.email || '—';
      root.querySelector('[data-admin-user-email]').textContent = data.user.email || '—';
      root.dataset.state = 'workspace';
      loading.hidden = true;
      access.hidden = true;
      workspace.hidden = false;
      await loadView('queue');
    } catch (error) {
      if (error.status === 401 || error.status === 403) return showAccess(error.status === 403);
      loading.hidden = true;
      globalError.hidden = false;
      workspace.hidden = false;
    }
  })();
}
