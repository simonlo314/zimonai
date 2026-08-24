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
  const archivedCasesToggle = root.querySelector('[data-admin-toggle-archived-cases]');
  const archivedOrdersToggle = root.querySelector('[data-admin-toggle-archived]');
  const caches = { cases: null, orders: null, customers: null, notifications: null, inquiries: null };
  const tierLabels = Object.fromEntries(copy.form?.tiers || []);
  const productLabels = Object.fromEntries(copy.actions?.productOptions || []);
  let csrfToken = '';
  let emailConfigured = false;
  let archivedCasesVisible = false;
  let archivedOrdersVisible = false;

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

  function linkedField(label, value, href, { external = false } = {}) {
    const row = element('div', 'admin-record__field');
    const description = element('dd');
    if (value && href) {
      const link = element('a', '', value);
      link.href = href;
      if (external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      description.append(link);
    } else {
      description.textContent = '—';
    }
    row.append(element('dt', '', label), description);
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
    const productChoices = copy.actions.productOptions || [];
    const productField = selectField(copy.actions.orderProduct, 'product', productChoices, item.tier === 'unsure' ? 'custom' : item.tier);
    const description = inputField(copy.actions.orderDescription, 'description', [tierLabels[item.tier], item.supplierName].filter(Boolean).join(' · '));
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
    head.append(
      element('span', 'admin-record__reference', item.reference),
      element('span', 'admin-record__status', item.archivedAt ? copy.actions.archivedCase : copy.status[item.status] || item.status)
    );
    const title = element('h3', '', item.supplierName || item.chineseLegalName || item.ownerEmail || '—');
    const details = element('dl', 'admin-record__details');
    details.append(
      field(copy.fields.customer, item.ownerEmail), field(copy.fields.product, [item.productCategory, item.productModel].filter(Boolean).join(' · ')),
      field(copy.fields.service, tierLabels[item.tier || 'unsure'] || '—'), field(copy.fields.updated, formatDate(item.updatedAt))
    );
    if (queue) details.append(field(copy.fields.nextAction, copy.status[item.status] || item.status));
    const actions = element('div', 'admin-record__actions');
    if (!item.archivedAt) actions.append(caseUpdate(item), manualOrder(item));
    if (!queue && !item.pendingInvitation && (item.status === 'closed' || item.archivedAt)) actions.append(caseLifecycle(item));
    card.append(head, title, details, actions);
    return card;
  }

  function caseLifecycle(item) {
    const panel = element('div', 'admin-order-lifecycle admin-case-lifecycle');
    const feedback = feedbackNode();
    const actions = element('div', 'admin-order-lifecycle__buttons');
    const action = item.archivedAt ? 'unarchive' : 'archive';
    const button = element('button', 'admin-order-lifecycle__button', item.archivedAt ? copy.actions.unarchiveCase : copy.actions.archiveCase);
    button.type = 'button';
    button.addEventListener('click', async () => {
      button.disabled = true;
      setFeedback(feedback, copy.actions.caseArchiveWorking);
      try {
        await api(`/api/admin/cases/${encodeURIComponent(item.id)}`, {
          method: 'PATCH', body: JSON.stringify({ action })
        });
        caches.cases = null;
        await loadView('cases', { force: true });
        const state = root.querySelector('[data-admin-state="cases"]');
        state.textContent = action === 'archive' ? copy.actions.caseArchived : copy.actions.caseUnarchived;
        state.classList.remove('is-error');
        state.setAttribute('role', 'status');
        state.hidden = false;
      } catch {
        setFeedback(feedback, copy.actions.actionError, true);
        button.disabled = false;
      }
    });
    actions.append(button);
    panel.append(actions, feedback);
    return panel;
  }

  function orderLifecycle(item) {
    const panel = element('div', 'admin-order-lifecycle');
    const feedback = feedbackNode();
    const actions = element('div', 'admin-order-lifecycle__buttons');
    const lifecycleButton = (label, action, modifier = '') => {
      const button = element('button', `admin-order-lifecycle__button${modifier ? ` ${modifier}` : ''}`, label);
      button.type = 'button';
      button.addEventListener('click', async () => {
        if (action === 'cancel' && !window.confirm(copy.actions.cancelOrderConfirm)) return;
        const buttons = [...panel.querySelectorAll('button')];
        buttons.forEach((candidate) => { candidate.disabled = true; });
        setFeedback(feedback, copy.actions.orderActionWorking);
        try {
          await api(`/api/admin/orders/${encodeURIComponent(item.id)}`, { method: 'PATCH', body: JSON.stringify({ action }) });
          caches.orders = null;
          await loadView('orders', { force: true });
          const state = root.querySelector('[data-admin-state="orders"]');
          state.textContent = action === 'archive' ? copy.actions.orderArchived : action === 'unarchive' ? copy.actions.orderUnarchived : copy.actions.orderCancelled;
          state.classList.remove('is-error');
          state.setAttribute('role', 'status');
          state.hidden = false;
        } catch {
          setFeedback(feedback, copy.actions.actionError, true);
          buttons.forEach((candidate) => { candidate.disabled = false; });
        }
      });
      return button;
    };
    actions.append(item.archivedAt ? lifecycleButton(copy.actions.unarchiveOrder, 'unarchive') : lifecycleButton(copy.actions.archiveOrder, 'archive'));
    if (!item.cancelledAt && ['pending', 'unpaid'].includes(item.paymentStatus)) actions.append(lifecycleButton(copy.actions.cancelOrder, 'cancel', 'admin-order-lifecycle__button--danger'));
    panel.append(actions, feedback);
    return panel;
  }

  function orderCard(item) {
    const card = element('article', 'admin-record');
    const head = element('header', 'admin-record__head');
    head.append(element('span', 'admin-record__reference', item.reference), element('span', 'admin-record__status', copy.paymentStatus[item.paymentStatus] || item.paymentStatus));
    const details = element('dl', 'admin-record__details');
    const productName = item.description || productLabels[item.product] || item.product;
    details.append(
      field(copy.fields.customer, item.ownerEmail), field(copy.fields.product, productName),
      field(copy.fields.amount, formatAmount(item.amountTotal, item.currency)), field(copy.fields.updated, formatDate(item.updatedAt))
    );
    const actions = element('div', 'admin-record__actions admin-record__actions--order');
    actions.append(orderUpdate(item), orderLifecycle(item));
    card.append(head, element('h3', '', productName || '—'), details, actions);
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

  function inquiryCard(item) {
    const card = element('article', 'admin-record admin-record--inquiry');
    const head = element('header', 'admin-record__head');
    const status = element('span', 'admin-record__status', copy.inquiryStatus[item.status] || item.status);
    head.append(element('span', 'admin-record__reference', item.reference), status);
    const title = element('h3', '', item.supplier || item.company || item.name || '—');
    const details = element('dl', 'admin-record__details admin-record__details--inquiry');
    let supplierHref = '';
    try {
      const parsed = new URL(item.url || '');
      if (['http:', 'https:'].includes(parsed.protocol)) supplierHref = parsed.href;
    } catch {
      supplierHref = '';
    }
    details.append(
      field(copy.fields.name, item.name),
      linkedField(copy.fields.email, item.email, item.email ? `mailto:${item.email}` : ''),
      field(copy.fields.company, item.company),
      field(copy.fields.supplier, item.supplier),
      field(copy.fields.chineseLegalName, item.chinese),
      field(copy.fields.product, item.product),
      linkedField(copy.fields.supplierLink, item.url, supplierHref, { external: true }),
      field(copy.fields.created, formatDateTime(item.createdAt)),
      field(copy.fields.question, item.question)
    );
    const actions = element('div', 'admin-record__actions');
    const update = actionDetails(copy.inquiries.update);
    const form = element('form', 'admin-action-form');
    const fields = element('div', 'admin-action-fields');
    fields.append(selectField(copy.fields.status, 'status', Object.entries(copy.inquiryStatus || {}), item.status));
    const feedback = feedbackNode();
    const button = element('button', 'admin-action-submit', copy.inquiries.save);
    button.type = 'submit';
    form.append(fields, feedback, button);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nextStatus = new FormData(form).get('status');
      button.disabled = true;
      button.textContent = copy.inquiries.saving;
      try {
        const result = await api('/api/admin/inquiries', {
          method: 'PATCH', body: JSON.stringify({ id: item.id, status: nextStatus })
        });
        item.status = result.inquiry?.status || nextStatus;
        status.textContent = copy.inquiryStatus[item.status] || item.status;
        caches.inquiries = null;
        setFeedback(feedback, copy.inquiries.saved);
      } catch {
        setFeedback(feedback, copy.inquiries.error, true);
      } finally {
        button.disabled = false;
        button.textContent = copy.inquiries.save;
      }
    });
    update.append(form);
    actions.append(update);
    card.append(head, title, details, actions);
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
    caches.cases = (await api(`/api/admin/cases${archivedCasesVisible ? '?includeArchived=1' : ''}`)).cases || [];
    return caches.cases;
  }

  async function fetchOrders(force = false) {
    if (caches.orders && !force) return caches.orders;
    caches.orders = (await api(`/api/admin/orders${archivedOrdersVisible ? '?includeArchived=1' : ''}`)).orders || [];
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

  async function fetchInquiries(force = false) {
    if (caches.inquiries && !force) return caches.inquiries;
    caches.inquiries = (await api('/api/admin/inquiries')).inquiries || [];
    return caches.inquiries;
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
      else if (view === 'inquiries') records = await fetchInquiries(force);
      else if (view === 'orders') records = await fetchOrders(force);
      else if (view === 'customers') records = await fetchCustomers(force);
      else records = await fetchNotifications(force);
      if (!records.length) {
        state.textContent = copy.views[view].empty;
        return;
      }
      state.hidden = true;
      for (const item of records) list.append(view === 'orders' ? orderCard(item) : view === 'customers' ? customerCard(item) : view === 'notifications' ? notificationCard(item) : view === 'inquiries' ? inquiryCard(item) : caseCard(item, view === 'queue'));
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
  archivedCasesToggle?.addEventListener('click', async () => {
    archivedCasesVisible = !archivedCasesVisible;
    archivedCasesToggle.setAttribute('aria-pressed', String(archivedCasesVisible));
    archivedCasesToggle.textContent = archivedCasesVisible ? copy.actions.hideArchivedCases : copy.actions.showArchivedCases;
    caches.cases = null;
    await loadView('cases', { force: true });
  });
  archivedOrdersToggle?.addEventListener('click', async () => {
    archivedOrdersVisible = !archivedOrdersVisible;
    archivedOrdersToggle.setAttribute('aria-pressed', String(archivedOrdersVisible));
    archivedOrdersToggle.textContent = archivedOrdersVisible ? copy.actions.hideArchivedOrders : copy.actions.showArchivedOrders;
    caches.orders = null;
    await loadView('orders', { force: true });
  });
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
      const name = String(data.user.name || '').trim();
      const email = String(data.user.email || '').trim();
      const distinctName = name && name.toLowerCase() !== email.toLowerCase();
      root.querySelector('[data-admin-user-name]').textContent = distinctName ? name : email || '—';
      const secondaryEmail = root.querySelector('[data-admin-user-email]');
      secondaryEmail.textContent = email;
      secondaryEmail.hidden = !distinctName;
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
