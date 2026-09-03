import { languages, pages } from './content.mjs';
import { brandProfile, hasPublishedOfficeEvidence } from './brand-profile.mjs';
import { layoutMode } from './editorial-policy.mjs';
import { paymentContent } from './payment-content.mjs';
import { legalContent } from './legal-content.mjs';
import { knowledgeArticleSpecs, knowledgeCategoryDefinitions, knowledgeContent, knowledgeSpecById } from './knowledge-content.mjs';
import { portalContent } from './portal-content.mjs';
import { adminContent } from './admin-content.mjs';
import { protectCjkHtml } from './cjk-linebreak.mjs';

const pageMap = Object.fromEntries(pages.map((page) => [page.id, page]));

function pathFor(langKey, pageId) {
  const lang = languages[langKey];
  const page = pageMap[pageId];
  return `/${[lang.prefix, page.slug].filter(Boolean).join('/')}${lang.prefix || page.slug ? '/' : ''}`;
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function jsonForHtml(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function statusLabel(t, status) {
  return status === 'verified' ? t.common.verified : status === 'unresolved' ? t.common.unresolved : t.common.discrepancy;
}

function statusMark(t, status, extra = '') {
  return `<span class="status status--${status} ${extra}" data-status="${status}"><span class="status__dot" aria-hidden="true"></span>${esc(statusLabel(t, status))}</span>`;
}

function arrow() {
  return '<svg class="icon-arrow" aria-hidden="true" viewBox="0 0 20 20"><path d="M3 10h13M11 5l5 5-5 5"/></svg>';
}

function paymentProduct(t, key) {
  return t.payment.payments.products.find((product) => product.key === key);
}

const structuredTierPricing = Object.freeze({
  t1: { price: 149 },
  t2: { price: 349 },
  t3: { minPrice: 449, maxPrice: 599 },
  t4: { minPrice: 899, maxPrice: 1299 },
  t5: { minPrice: 1500, maxPrice: 2500, unitText: 'month' },
  t6: { minPrice: 5000 }
});

function structuredTierOffer(tier, canonical, organizationId) {
  const pricing = structuredTierPricing[tier.id];
  const priceSpecification = {
    '@type': 'UnitPriceSpecification',
    priceCurrency: 'USD',
    ...pricing
  };
  return {
    '@type': 'Offer',
    url: `${canonical}#${tier.id}`,
    priceCurrency: 'USD',
    priceSpecification,
    itemOffered: {
      '@type': 'Service',
      name: `${tier.label} · ${tier.title}`,
      description: tier.summary,
      serviceType: tier.englishTitle,
      provider: { '@id': organizationId }
    }
  };
}

function approvedContacts(t) {
  return [
    { label: t.common.email, value: brandProfile.email, href: `mailto:${brandProfile.email}` },
    { label: t.common.chinaPhone, value: brandProfile.contacts.chinaPhone.display, href: `tel:${brandProfile.contacts.chinaPhone.href}` },
    { label: t.common.taiwanPhone, value: brandProfile.contacts.taiwanPhone.display, href: `tel:${brandProfile.contacts.taiwanPhone.href}` },
    { label: t.common.whatsapp, value: brandProfile.contacts.whatsapp.display, href: brandProfile.contacts.whatsapp.href, external: true },
    { label: t.common.wechat, value: brandProfile.contacts.wechat },
    { label: t.common.line, value: brandProfile.contacts.line },
    { label: t.common.linkedin, value: brandProfile.contacts.linkedin.display, href: brandProfile.contacts.linkedin.href, external: true }
  ];
}

function requestContactList(t) {
  return `<div class="contact-list">${approvedContacts(t).map((item) => `<div class="contact-line"><span>${esc(item.label)}</span>${item.href ? `<a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}><strong>${esc(item.value)}</strong>${arrow()}</a>` : `<strong>${esc(item.value)}</strong>`}</div>`).join('')}</div>`;
}

function footerContactList(t) {
  return `<dl class="footer-contact">${approvedContacts(t).map((item) => `<div><dt>${esc(item.label)}</dt><dd>${item.href ? `<a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(item.value)}</a>` : esc(item.value)}</dd></div>`).join('')}</dl>`;
}

function pageHeader(kicker, title, lead, options = false) {
  const config = typeof options === 'object' ? options : { brandMark: options };
  const brandMark = Boolean(config.brandMark);
  const media = config.media;
  return `<header class="page-hero shell${brandMark ? ' page-hero--brand' : ''}${media ? ' page-hero--media' : ''}${config.legal ? ' page-hero--legal' : ''}">
    <div class="page-hero__copy">
      <p class="kicker reveal">${esc(kicker)}</p>
      <h1 class="page-title reveal">${esc(title)}</h1>
      <p class="page-lead reveal">${esc(lead)}</p>
    </div>
    ${brandMark ? '<div class="page-hero__brand-mark" aria-hidden="true"><img src="/assets/zimonai-circular-mark-primary.svg" alt="" width="800" height="800"></div>' : ''}
    ${media ? `<figure class="page-hero__media page-hero__media--${esc(media.id)} reveal"><img src="${esc(media.src)}" alt="${esc(media.alt)}" width="1600" height="1067" loading="eager" fetchpriority="high"></figure>` : ''}
  </header>`;
}

function cta(t, title, text, options = {}) {
  const href = options.href || pathFor(t.__key, 'request');
  const label = options.label || t.common.contact;
  return `<section class="closing shell reveal">
    <div class="closing__index" aria-hidden="true">→</div>
    <div><p class="kicker">${esc(t.common.eyebrow)}</p><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <a class="button button--ink magnetic" data-cursor="${esc(label)}" href="${esc(href)}">${esc(label)}${arrow()}</a>
  </section>`;
}

function googleMark() {
  return `<svg class="portal-google-mark" aria-hidden="true" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.878 2.684-6.614Z"/><path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.181l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"/><path fill="#FBBC05" d="M3.963 10.706A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332Z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.464.892 11.427 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z"/></svg>`;
}

function portal(t) {
  const p = t.portal;
  const loginHref = `/api/auth/google/start?locale=${encodeURIComponent(t.__key)}&returnTo=${encodeURIComponent(pathFor(t.__key, 'portal'))}`;
  return `<main id="main" class="portal-page" data-portal data-locale="${esc(t.__key)}" data-state="loading">
    <section class="portal-loading shell" data-portal-loading aria-live="polite">
      <span class="portal-loading__mark" aria-hidden="true"></span><p>${esc(p.workspace.loading)}</p>
    </section>

    <section class="portal-entry shell" data-portal-signed-out hidden>
      <div class="portal-entry__intro">
        <p class="portal-kicker">${esc(p.eyebrow)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="portal-entry__lead">${esc(p.lead)}</p>
        <ol class="portal-principles">
          ${p.assurances.map(([title, text], index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></li>`).join('')}
        </ol>
      </div>
      <aside class="portal-auth" aria-labelledby="portal-auth-title">
        <div class="portal-auth__seal" aria-hidden="true"><img src="/assets/zimonai-shield-icon-primary.svg" alt="" width="1600" height="1600"></div>
        <p class="portal-kicker">${esc(p.auth.label)}</p>
        <h2 id="portal-auth-title">${esc(p.auth.title)}</h2>
        <a class="portal-google" href="${esc(loginHref)}" data-google-login>${googleMark()}<span>${esc(p.auth.google)}</span></a>
        <div class="portal-auth__divider" data-email-auth-divider><span>${esc(p.auth.divider)}</span></div>
        <div class="portal-email-auth" data-email-auth>
          <form class="portal-email-form" data-email-request-form novalidate>
            <label for="portal-login-email">${esc(p.auth.emailLabel)}</label>
            <div class="portal-email-form__row"><input id="portal-login-email" name="email" type="email" autocomplete="email" maxlength="320" placeholder="${esc(p.auth.emailPlaceholder)}" required><button type="submit" data-email-request-button>${esc(p.auth.emailSend)}</button></div>
            <p>${esc(p.auth.emailHelp)}</p>
          </form>
          <form class="portal-code-form" data-email-verify-form novalidate hidden>
            <div><strong>${esc(p.auth.codeTitle)}</strong><p>${esc(p.auth.codeHint)}</p></div>
            <label for="portal-login-code">${esc(p.auth.codeLabel)}</label>
            <input id="portal-login-code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" minlength="6" maxlength="6" required>
            <button type="submit" data-email-verify-button>${esc(p.auth.codeVerify)}</button>
            <button class="portal-code-form__back" type="button" data-email-reset>${esc(p.auth.codeResend)}</button>
          </form>
          <div class="portal-email-auth__feedback" data-email-feedback hidden role="status" aria-live="polite"></div>
        </div>
        <div class="portal-auth__feedback" data-auth-feedback hidden role="alert"></div>
        <div class="portal-auth__notice" data-auth-unavailable hidden role="status">
          <strong>${esc(p.auth.unavailable)}</strong><p>${esc(p.auth.unavailableDetail)}</p>
        </div>
        <div class="portal-auth__links"><a href="${pathFor(t.__key, 'privacy')}">${esc(p.auth.privacy)}</a><a href="${pathFor(t.__key, 'paymentTerms')}">${esc(p.auth.terms)}</a></div>
      </aside>
    </section>

    <section class="portal-workspace shell" data-portal-signed-in hidden>
      <header class="portal-workspace__header">
        <div><p class="portal-kicker">${esc(p.workspace.eyebrow)}</p><h1>${esc(p.workspace.title)}</h1></div>
        <div class="portal-identity"><img src="/assets/zimonai-shield-icon-mono-white-transparent.svg" alt="" width="48" height="48" aria-hidden="true"><span><small>${esc(p.workspace.welcome)}</small><strong data-portal-user-name></strong><em data-portal-user-email></em></span></div>
      </header>
      <div class="portal-workspace__body">
        <div class="portal-tabs" role="tablist" aria-label="${esc(p.workspace.title)}">
          <button id="portal-tab-cases" type="button" role="tab" aria-selected="true" aria-controls="portal-panel-cases" data-portal-view="cases">${esc(p.workspace.cases)}</button>
          <button id="portal-tab-orders" type="button" role="tab" aria-selected="false" aria-controls="portal-panel-orders" tabindex="-1" data-portal-view="orders">${esc(p.workspace.orders)}</button>
          <button id="portal-tab-account" type="button" role="tab" aria-selected="false" aria-controls="portal-panel-account" tabindex="-1" data-portal-view="account">${esc(p.workspace.account)}</button>
        </div>
        <div class="portal-stage">
          <div class="portal-error" data-portal-error hidden role="alert">${esc(p.workspace.loadError)}</div>
          <section class="portal-view" id="portal-panel-cases" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-cases" data-portal-panel="cases">
            <header class="portal-section-head"><div><p class="portal-kicker">${esc(p.workspace.casesEyebrow)}</p><h2>${esc(p.workspace.casesTitle)}</h2></div><p>${esc(p.workspace.casesLead)}</p></header>
            <div class="portal-cases-state" data-portal-cases-state hidden role="status"></div>
            <div class="portal-case-list" data-portal-case-list aria-live="polite"></div>
            <div class="portal-empty" data-portal-empty hidden>
              <div class="portal-empty__rail" aria-hidden="true"><span></span><span></span><span></span></div>
              <div><div role="status"><p class="portal-kicker">${esc(p.workspace.emptyLabel)}</p><h3>${esc(p.workspace.emptyTitle)}</h3><p>${esc(p.workspace.emptyText)}</p></div><div class="portal-empty__actions"><a class="portal-primary" href="${pathFor(t.__key, 'services')}">${esc(p.workspace.emptyAction)}${arrow()}</a><a class="portal-secondary" href="mailto:${esc(brandProfile.email)}?subject=${encodeURIComponent(p.workspace.supportSubject)}">${esc(p.workspace.supportAction)}${arrow()}</a></div></div>
            </div>
          </section>

          <section class="portal-view" id="portal-panel-orders" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-orders" data-portal-panel="orders" hidden>
            <header class="portal-section-head"><div><p class="portal-kicker">${esc(p.workspace.ordersEyebrow)}</p><h2>${esc(p.workspace.ordersTitle)}</h2></div><div class="portal-section-head__aside"><p>${esc(p.workspace.ordersLead)}</p><button class="portal-list-toggle" type="button" data-portal-toggle-hidden aria-pressed="false">${esc(p.workspace.showHiddenOrders)}</button></div></header>
            <div class="portal-cases-state" data-portal-orders-state hidden role="status"></div>
            <div class="portal-order-list" data-portal-order-list aria-live="polite"></div>
            <div class="portal-empty portal-empty--orders" data-portal-orders-empty hidden>
              <div class="portal-empty__rail" aria-hidden="true"><span></span><span></span><span></span></div>
              <div role="status"><p class="portal-kicker">${esc(p.workspace.ordersEmptyLabel)}</p><h3>${esc(p.workspace.ordersEmptyTitle)}</h3><p>${esc(p.workspace.ordersEmptyText)}</p></div>
            </div>
          </section>

          <section class="portal-view" id="portal-panel-account" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-account" data-portal-panel="account" hidden>
            <header class="portal-section-head"><div><p class="portal-kicker">${esc(p.account.eyebrow)}</p><h2>${esc(p.account.title)}</h2></div><p>${esc(p.account.lead)}</p></header>
            <dl class="portal-account">
              <div><dt>${esc(p.account.email)}</dt><dd data-account-email></dd></div>
              <div><dt>${esc(p.account.locale)}</dt><dd data-account-locale></dd></div>
              <div><dt>${esc(p.account.accountId)}</dt><dd data-account-id></dd></div>
            </dl>
            <div class="portal-account__links"><a href="${pathFor(t.__key, 'privacy')}">${esc(p.account.privacy)}${arrow()}</a><a href="mailto:${esc(brandProfile.email)}?subject=${encodeURIComponent(p.account.supportSubject)}">${esc(p.account.support)}${arrow()}</a></div>
            <a class="portal-admin-entry" href="${pathFor(t.__key, 'admin')}" data-portal-admin-link hidden><span><strong>${esc(p.account.admin)}</strong><small>${esc(p.account.adminLead)}</small></span>${arrow()}</a>
            <div class="portal-account__actions"><button class="portal-secondary portal-account__logout" type="button" data-portal-logout>${esc(p.workspace.logout)}</button></div>
          </section>
        </div>
      </div>
    </section>
    <script type="application/json" id="portal-copy">${jsonForHtml(p)}</script>
  </main>`;
}

function admin(t) {
  const a = t.admin;
  const options = (items) => items.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
  const viewAside = (key) => `<div class="admin-section-head__aside"><p>${esc(a.views[key].lead)}</p>${key === 'cases' ? `<button class="admin-list-toggle" type="button" data-admin-toggle-archived-cases aria-pressed="false">${esc(a.actions.showArchivedCases)}</button>` : key === 'orders' ? `<button class="admin-list-toggle" type="button" data-admin-toggle-archived aria-pressed="false">${esc(a.actions.showArchivedOrders)}</button>` : ''}</div>`;
  const dataView = (key) => `<section class="admin-view" id="admin-panel-${key}" role="tabpanel" tabindex="0" aria-labelledby="admin-tab-${key}" data-admin-panel="${key}"${key === 'queue' ? '' : ' hidden'}>
    <header class="admin-section-head"><div><p class="portal-kicker">${esc(a.nav[key])}</p><h2>${esc(a.views[key].title)}</h2></div>${viewAside(key)}</header>
    ${key === 'notifications' ? '<div class="admin-notification-config" data-admin-email-config hidden role="status"></div>' : ''}
    <div class="admin-data-state" data-admin-state="${key}" role="status">${esc(a.views[key].loading)}</div>
    <div class="admin-record-list" data-admin-list="${key}" aria-live="polite"></div>
  </section>`;
  return `<main id="main" class="admin-page" data-admin data-locale="${esc(t.__key)}" data-state="loading">
    <section class="admin-loading shell" data-admin-loading aria-live="polite"><span class="portal-loading__mark" aria-hidden="true"></span><p>${esc(a.loading)}</p></section>
    <section class="admin-access shell" data-admin-access hidden>
      <img src="/assets/zimonai-shield-icon-primary.svg" alt="" width="88" height="88" aria-hidden="true">
      <p class="portal-kicker">ZimonAI</p><h1 data-admin-access-title>${esc(a.signedOutTitle)}</h1><p data-admin-access-text>${esc(a.signedOutText)}</p>
      <a class="portal-primary" href="${pathFor(t.__key, 'portal')}">${esc(a.portalAction)}${arrow()}</a>
    </section>
    <section class="admin-workspace shell" data-admin-workspace hidden>
      <header class="admin-workspace__header">
        <div><p class="portal-kicker">${esc(a.eyebrow)}</p><h1>${esc(a.title)}</h1><p>${esc(a.lead)}</p></div>
        <div class="admin-workspace__side"><div class="admin-identity"><small>${esc(a.signedInAs)}</small><strong data-admin-user-name></strong><span data-admin-user-email></span></div><nav class="admin-workspace__links" aria-label="${esc(a.eyebrow)}"><a href="${pathFor(t.__key, 'portal')}">${esc(a.portalAction)}${arrow()}</a><a href="${pathFor(t.__key, 'home')}">${esc(a.siteAction)}${arrow()}</a></nav></div>
      </header>
      <div class="admin-shell">
        <nav class="admin-tabs" role="tablist" aria-label="${esc(a.eyebrow)}">
          ${Object.entries(a.nav).map(([key, label], index) => `<button id="admin-tab-${key}" type="button" role="tab" aria-selected="${index === 0 ? 'true' : 'false'}" aria-controls="admin-panel-${key}" ${index === 0 ? '' : 'tabindex="-1"'} data-admin-view="${key}">${esc(label)}</button>`).join('')}
        </nav>
        <div class="admin-stage">
          <div class="admin-global-error" data-admin-error hidden role="alert">${esc(a.loadError)}</div>
          ${dataView('queue')}${dataView('inquiries')}${dataView('cases')}${dataView('orders')}${dataView('customers')}${dataView('notifications')}
          <section class="admin-view admin-view--form" id="admin-panel-create" role="tabpanel" tabindex="0" aria-labelledby="admin-tab-create" data-admin-panel="create" hidden>
            <header class="admin-section-head"><div><p class="portal-kicker">${esc(a.form.eyebrow)}</p><h2>${esc(a.form.title)}</h2></div><p>${esc(a.form.lead)}</p></header>
            <form class="admin-case-form" data-admin-case-form novalidate>
              <div class="admin-form-message" data-admin-form-message hidden tabindex="-1" role="alert"></div>
              <div class="admin-fields">
                <label><span>${esc(a.form.customerEmail)} <b>${esc(a.form.required)}</b></span><input name="customerEmail" type="email" maxlength="320" autocomplete="email" required></label>
                <label><span>${esc(a.form.tier)} <b>${esc(a.form.optional)}</b></span><select name="tier">${options(a.form.tiers)}</select></label>
                <label><span>${esc(a.form.supplierName)} <b>${esc(a.form.optional)}</b></span><input name="supplierName" type="text" maxlength="240"></label>
                <label><span>${esc(a.form.supplierUrl)} <b>${esc(a.form.optional)}</b></span><input name="supplierUrl" type="url" maxlength="500" inputmode="url" placeholder="https://"></label>
                <label><span>${esc(a.form.chineseLegalName)} <b>${esc(a.form.optional)}</b></span><input name="chineseLegalName" type="text" maxlength="240"></label>
                <label><span>${esc(a.form.productCategory)} <b>${esc(a.form.optional)}</b></span><input name="productCategory" type="text" maxlength="240"></label>
                <label><span>${esc(a.form.productModel)} <b>${esc(a.form.optional)}</b></span><input name="productModel" type="text" maxlength="300"></label>
                <label class="admin-field--wide"><span>${esc(a.form.decisionContext)} <b>${esc(a.form.optional)}</b></span><textarea name="decisionContext" rows="4" maxlength="2000"></textarea></label>
                <label class="admin-field--wide"><span>${esc(a.form.requestedChecks)} <b>${esc(a.form.optional)}</b></span><textarea name="requestedChecks" rows="4" maxlength="3000"></textarea></label>
              </div>
              <p class="admin-field-hint">${esc(a.form.fieldHint)}</p>
              <p class="admin-payment-note">${esc(a.form.paymentNote)}</p>
              <div class="admin-form-actions"><button class="portal-primary" type="submit"><span data-admin-submit-label>${esc(a.form.submit)}</span>${arrow()}</button></div>
            </form>
          </section>
        </div>
      </div>
    </section>
    <script type="application/json" id="admin-copy">${jsonForHtml(a)}</script>
  </main>`;
}

function home(t) {
  const consultationProduct = paymentProduct(t, 'consultation');
  return `<main id="main">
    <section class="hero-cinema" aria-labelledby="hero-title" data-hero-cinema>
      <div class="hero-cinema__scene" aria-hidden="true">
        <div class="hero-cinema__grid"></div>
        <div class="hero-cinema__beam"></div>
        <div class="hero-cinema__glow hero-cinema__glow--one"></div>
        <div class="hero-cinema__glow hero-cinema__glow--two"></div>
        <img class="hero-cinema__shield" src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="512" height="512">
      </div>
      <div class="hero shell">
        <div class="hero__copy">
          <p class="kicker">${esc(t.home.kicker)}</p>
          <h1 id="hero-title">${esc(t.home.title)}</h1>
          <p class="hero__category-line">${esc(t.home.categoryLine)}</p>
          <p class="hero__lead">${esc(t.home.lead)}</p>
          <div class="hero__actions">
            <a class="button button--ink magnetic" href="${pathFor(t.__key, 'request')}">${esc(t.home.primary)}${arrow()}</a>
            <a class="text-link" href="${pathFor(t.__key, 'methodology')}">${esc(t.home.secondary)}${arrow()}</a>
          </div>
          <p class="hero__boundary"><span aria-hidden="true">—</span><span class="hero__boundary-text">${esc(t.home.distinction)}</span></p>
        </div>
        <aside class="hero-proof" aria-label="${esc(t.home.proof.label)}">
          <header><span>${esc(t.home.proof.label)}</span><img src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="512" height="512" aria-hidden="true"></header>
          <div class="hero-proof__items">${t.home.proof.items.map(([title, text], index) => `<article><span>0${index + 1}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></article>`).join('')}</div>
          <p class="hero-proof__foot">${esc(t.home.proof.foot)}</p>
        </aside>
      </div>
    </section>

    <section class="category-focus" aria-labelledby="category-focus-title">
      <div class="shell category-focus__inner reveal">
        <div class="category-focus__heading"><p class="kicker">${esc(t.home.category.label)}</p><h2 id="category-focus-title">${esc(t.home.category.title)}</h2></div>
        <div class="category-focus__body">
          <ul class="category-focus__products">${t.home.category.products.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
          <p class="category-focus__statement">${esc(t.home.category.statement)}</p>
        </div>
      </div>
    </section>

    <section class="decision-ledger shell" aria-labelledby="decision-title">
      <div class="section-heading section-heading--dense reveal"><p class="kicker">${esc(t.home.decision.label)}</p><h2 id="decision-title">${esc(t.home.decision.title)}</h2><p>${esc(t.home.decision.lead)}</p></div>
      <div class="decision-ledger__rows">
        ${t.home.decision.items.map(([moment, question, check], index) => `<article class="decision-row reveal"><span class="decision-row__no">0${index + 1}</span><h3>${esc(moment)}</h3><p>${esc(question)}</p><strong>${esc(check)}</strong></article>`).join('')}
      </div>
    </section>

    <section class="verification-flow" aria-labelledby="verification-flow-title">
      <div class="shell verification-flow__inner">
        <header class="verification-flow__intro reveal"><p class="kicker">${esc(t.home.story.label)}</p><h2 id="verification-flow-title">${esc(t.home.story.title)}</h2><p>${esc(t.home.story.intro)}</p></header>
        <ol class="verification-flow__steps">${t.home.story.steps.map((step) => `<li class="reveal"><span>${esc(step.no)}</span><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p></li>`).join('')}</ol>
      </div>
    </section>

    <section class="why shell reveal">
      <div><p class="kicker">${esc(t.home.why.label)}</p><h2>${esc(t.home.why.title)}</h2></div>
      <p>${esc(t.home.why.text)}</p>
    </section>

    <section class="operating-record shell" aria-labelledby="operating-title">
      <header class="operating-record__intro reveal"><p class="kicker">${esc(t.home.operating.label)}</p><h2 id="operating-title">${esc(t.home.operating.title)}</h2><p>${esc(t.home.operating.lead)}</p></header>
      <div class="operating-record__facts">${t.home.operating.facts.map(([label, text], index) => `<article class="operating-fact reveal"><span>0${index + 1}</span><h3>${esc(label)}</h3><p>${esc(text)}</p></article>`).join('')}</div>
    </section>

    <section class="services-preview shell" aria-labelledby="services-title">
      <div class="section-heading reveal"><p class="kicker">${esc(t.nav.services)}</p><h2 id="services-title">${esc(t.services.title)}</h2></div>
      <div class="service-rungs">${t.services.catalog.map((service, index) => `<a class="service-rung reveal" href="${pathFor(t.__key, 'services')}#${service.id}">
        <span class="service-rung__level">${esc(service.label)}</span><span class="service-rung__step">0${index + 1}</span>
        <h3>${esc(service.title)}</h3><p>${esc(service.summary)}</p><strong>${esc(service.price)}</strong>
      </a>`).join('')}</div>
      <div class="services-preview__actions reveal">
        <a class="text-link" href="${pathFor(t.__key, 'services')}">${esc(t.nav.services)}${arrow()}</a>
        <a class="consultation-quick-link" href="${pathFor(t.__key, 'payments')}#pay-consultation">
          <span>${esc(consultationProduct.title)}</span>
          <strong>${esc(consultationProduct.price)} · ${esc(consultationProduct.unit)}</strong>
          ${arrow()}
        </a>
      </div>
    </section>

    <section class="source-index shell" aria-labelledby="source-index-title">
      <div class="section-heading section-heading--dense reveal"><p class="kicker">${esc(t.home.sources.label)}</p><h2 id="source-index-title">${esc(t.home.sources.title)}</h2><p>${esc(t.home.sources.lead)}</p></div>
      <div class="source-index__rows">${t.home.sources.items.map(([title, text], index) => `<article class="source-row reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>
    </section>

    <section class="limits-band">
      <div class="shell limits-band__inner reveal"><div class="limits-band__mark">?</div><div><h2>${esc(t.home.limitsTitle)}</h2><p>${esc(t.home.limitsText)}</p><a class="text-link" href="${pathFor(t.__key, 'scope')}">${esc(t.nav.scope)}${arrow()}</a></div></div>
    </section>
    ${cta(t, t.home.finalTitle, t.home.finalText)}
  </main>`;
}

function serviceMarketReference(reference) {
  if (!reference) return '';
  return `<aside class="service-market-reference" aria-label="${esc(reference.label)}">
    <div class="service-market-reference__heading"><p class="file-label">${esc(reference.label)}</p><h3>${esc(reference.title)}</h3></div>
    <div class="service-market-reference__body"><p>${esc(reference.text)}</p><p class="service-market-reference__limits">${esc(reference.limits)}</p><div class="service-market-reference__sources">${reference.sources.map((source) => `<a href="${esc(source.href)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}${arrow()}</a>`).join('')}</div></div>
  </aside>`;
}

function services(t) {
  const consultationProduct = paymentProduct(t, 'consultation');
  const balanceProduct = paymentProduct(t, 'balance');
  const panels = t.services.catalog.map((service, index) => `<article class="service-tier-panel${index === 0 ? ' is-active' : ''}" id="${service.id}" data-service-panel="${service.id}" role="tabpanel" aria-labelledby="select-${service.id}" ${index === 0 ? '' : 'hidden'}>
    <header class="service-tier-panel__header">
      <div><p class="kicker">${esc(service.label)} · ${esc(service.englishTitle)}</p><h2>${esc(service.title)}</h2><p>${esc(service.summary)}</p></div>
      <aside class="service-tier-panel__commercial"><dl><div><dt>${esc(t.services.labels.price)}</dt><dd>${esc(service.price)}</dd></div><div><dt>${esc(t.services.labels.timing)}</dt><dd>${esc(service.timing)}</dd></div><div><dt>${esc(t.services.labels.mode)}</dt><dd>${esc(service.mode)}</dd></div></dl>${service.purchasable ? `${serviceCheckoutProtocol(t)}${checkoutForm(t, paymentProduct(t, service.id), 'checkout-form--inline')}` : ''}</aside>
    </header>
    ${service.id === 't1' ? sampleReport(t) : ''}
    ${service.upgrade ? `<p class="service-tier-panel__upgrade"><span aria-hidden="true">+</span><span class="service-tier-panel__upgrade-copy">${esc(service.upgrade)}</span></p>` : ''}
    <div class="service-tier-panel__work">${service.groups.map((group) => `<section><h3>${esc(group.title)}</h3><ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>`).join('')}</div>
    ${serviceMarketReference(service.marketReference)}
    ${service.note ? `<aside class="service-tier-panel__note"><strong>${esc(t.services.labels.important)}</strong><p>${esc(service.note)}</p></aside>` : ''}
    <div class="service-tier-panel__boundary">
      <div><span class="file-label">${esc(t.services.labels.notIncluded)}</span><p>${esc(service.notIncluded)}</p></div>
      <div><span class="file-label">${esc(t.services.labels.consent)}</span><strong>${esc(service.consent)}</strong></div>
    </div>
    <footer><span class="file-label">${esc(t.services.labels.fit)}</span><p>${esc(service.fit)}</p>${service.delivery ? `<div><span class="file-label">${esc(t.ui.deliverable)}</span><p>${esc(service.delivery)}</p></div>` : ''}</footer>
  </article>`).join('');
  return `<main id="main">${pageHeader(t.services.kicker, t.services.title, t.services.lead)}
    <section class="service-staircase shell" data-service-staircase>
      <div class="service-staircase__intro reveal">
        <p class="kicker">${esc(t.services.staircase.label)}</p>
        <h2>${esc(t.services.staircase.title)}</h2>
        <p class="service-staircase__lead">${esc(t.services.staircase.lead)}</p>
        <a class="consultation-inline-entry" href="${pathFor(t.__key, 'payments')}#pay-consultation">
          <span>${esc(consultationProduct.title)}</span>
          <strong>${esc(consultationProduct.price)} · ${esc(consultationProduct.unit)}</strong>
          ${arrow()}
        </a>
      </div>
      <div class="service-staircase__selectors" role="tablist" aria-label="${esc(t.services.staircase.title)}">${t.services.catalog.map((service, index) => `<button id="select-${service.id}" type="button" role="tab" aria-controls="${service.id}" aria-selected="${index === 0}" class="service-tier-select${index === 0 ? ' is-active' : ''}" data-service-select="${service.id}"><span>${esc(service.label)}</span><strong>${esc(service.title)}</strong><small>${esc(service.price)}</small></button>`).join('')}</div>
      <a class="service-balance-entry reveal" href="${pathFor(t.__key, 'payments')}#pay-balance"><span>${esc(balanceProduct.title)}</span><strong>${esc(balanceProduct.price)}</strong>${arrow()}</a>
      <div class="service-staircase__panels">${panels}</div>
    </section>
    <section class="report-promises" aria-labelledby="report-promises-title"><div class="shell"><header class="report-promises__header reveal"><p class="kicker">${esc(t.services.promises.label)}</p><h2 id="report-promises-title">${esc(t.services.promises.title)}</h2><p>${esc(t.services.promises.lead)}</p></header><div class="report-promises__grid">${t.services.promises.items.map(([title, text], index) => `<article class="report-promise reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section>
    ${cta(t, t.services.ctaTitle, t.services.ctaText, { href: `${pathFor(t.__key, 'payments')}#pay-consultation`, label: consultationProduct.button })}</main>`;
}

function methodology(t) {
  const detail = t.methodology.nodes[0];
  return `<main id="main">${pageHeader(t.methodology.kicker, t.methodology.title, t.methodology.lead, { media: { id: 'board', src: '/assets/editorial-power-supply-board.jpg', alt: t.methodology.visualAlt } })}
    <section class="method-map shell" data-method-map>
      <div class="section-heading reveal"><p class="kicker">${esc(t.methodology.mapTitle)}</p><h2>${esc(t.methodology.mapTitle)}</h2><p>${esc(t.methodology.mapLead)}</p></div>
      <div class="method-map__system reveal">
        <div class="method-map__nodes" role="tablist" aria-label="${esc(t.methodology.mapTitle)}">
          ${t.methodology.nodes.map((node, index) => `<button class="method-node${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-method-node data-id="${node.id}" data-index="${index}" data-check="${esc(node.check)}" data-why="${esc(node.why)}" data-source="${esc(node.source)}" data-results="${esc(node.results)}"><span>0${index + 1}</span>${esc(node.label)}</button>`).join('<span class="method-link" aria-hidden="true"></span>')}
        </div>
        <article class="method-detail" aria-live="polite">
          <div><span class="file-label">${esc(t.ui.whatWeCheck)}</span><p data-method-check>${esc(detail.check)}</p></div>
          <div><span class="file-label">${esc(t.ui.whyItMatters)}</span><p data-method-why>${esc(detail.why)}</p></div>
          <div><span class="file-label">${esc(t.ui.sourceType)}</span><p data-method-source>${esc(detail.source)}</p></div>
          <div><span class="file-label">${esc(t.ui.possibleResult)}</span><p data-method-results>${esc(detail.results)}</p></div>
        </article>
      </div>
    </section>
    <section class="source-registry shell" aria-labelledby="source-registry-title"><div class="section-heading section-heading--dense reveal"><p class="kicker">${esc(t.methodology.sourceRegistry.label)}</p><h2 id="source-registry-title">${esc(t.methodology.sourceRegistry.title)}</h2></div><div class="source-registry__table">${t.methodology.sourceRegistry.items.map(([claim, source, limit]) => `<article class="source-registry__row reveal"><strong>${esc(claim)}</strong><p>${esc(source)}</p><p>${esc(limit)}</p></article>`).join('')}</div></section>
    <section class="method-notes shell">
      <article class="editorial-note reveal"><span>01</span><div><h2>${esc(t.methodology.sourcesTitle)}</h2><p>${esc(t.methodology.sourcesText)}</p></div></article>
      <article class="editorial-note reveal"><span>02</span><div><h2>${esc(t.methodology.statusesTitle)}</h2><ul>${t.methodology.statusText.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div></article>
      <article class="editorial-note reveal"><span>03</span><div><h2>${esc(t.methodology.handlingTitle)}</h2><p>${esc(t.methodology.handlingText)}</p></div></article>
    </section>
    <section class="report-anatomy shell reveal"><div><p class="kicker">${esc(t.methodology.reportAnatomy.label)}</p><h2>${esc(t.methodology.reportAnatomy.title)}</h2></div><ol>${t.methodology.reportAnatomy.items.map(([title, text], index) => `<li><span>0${index + 1}</span><div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></li>`).join('')}</ol></section>
    ${cta(t, t.home.finalTitle, t.home.finalText)}</main>`;
}

function scope(t) {
  return `<main id="main">${pageHeader(t.scope.kicker, t.scope.title, t.scope.lead, { media: { id: 'adapter', src: '/assets/editorial-multiport-adapter.jpg', alt: t.scope.visualAlt } })}
    <section class="scope-split shell reveal"><article><span class="scope-split__symbol">+</span><h2>${esc(t.scope.doTitle)}</h2><ul>${t.scope.doItems.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article><article><span class="scope-split__symbol">−</span><h2>${esc(t.scope.dontTitle)}</h2><ul>${t.scope.dontItems.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article></section>
    <section class="limit-ledger shell"><div class="section-heading reveal"><p class="kicker">${esc(t.scope.limitsTitle)}</p><h2>${esc(t.scope.limitsTitle)}</h2></div>${t.scope.limits.map(([title, text], index) => `<article class="limit-row reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</section>
    <section class="decision-guide shell" aria-labelledby="decision-guide-title"><div class="section-heading section-heading--dense reveal"><p class="kicker">${esc(t.scope.decisionGuide.label)}</p><h2 id="decision-guide-title">${esc(t.scope.decisionGuide.title)}</h2></div><div class="decision-guide__rows">${t.scope.decisionGuide.items.map(([question, provider]) => `<article class="decision-guide__row reveal"><h3>${esc(question)}</h3><strong>${esc(provider)}</strong></article>`).join('')}</div></section>
    <section class="accreditation shell reveal"><div class="accreditation__mark">${esc(t.scope.accreditationMark)}</div><div><p class="kicker">${esc(t.scope.accreditationTitle)}</p><h2>${esc(t.scope.accreditationTitle)}</h2><p>${esc(t.scope.accreditationText)}</p></div></section>
    ${cta(t, t.scope.ctaTitle, t.scope.ctaText)}</main>`;
}

function localizedOfficeLocations(t) {
  const isEnglish = t.__key === 'en';
  const isTraditional = t.__key === 'zh-tw';
  return [
    {
      label: t.common.shenzhenOffice,
      role: t.common.shenzhenOfficeRole,
      address: isEnglish ? brandProfile.registration.registeredAddressEn : brandProfile.registration.registeredAddressZhHans,
      lang: isEnglish ? 'en' : 'zh-Hans'
    },
    {
      label: t.common.taiwanOffice,
      role: t.common.taiwanOfficeRole,
      address: isEnglish
        ? brandProfile.taiwanOffice.addressEn
        : isTraditional
          ? brandProfile.taiwanOffice.addressZhHant
          : brandProfile.taiwanOffice.addressZhHans,
      lang: isEnglish ? 'en' : isTraditional ? 'zh-Hant' : 'zh-Hans',
      note: t.common.appointmentOnly
    }
  ];
}

function about(t) {
  const registration = brandProfile.registration;
  const officeLocations = localizedOfficeLocations(t);
  const legalRepresentative = t.__key === 'zh-cn' ? registration.legalRepresentativeZhHans : registration.legalRepresentativeZhHant;
  const registrationFields = [
    [t.about.registration.fields.legalName, registration.legalNameZhHans, 'zh-Hans'],
    [t.about.registration.fields.legalRepresentative, legalRepresentative, t.__key === 'zh-cn' ? 'zh-Hans' : 'zh-Hant'],
    [t.about.registration.fields.entityType, t.about.registration.entityType, null],
    [t.about.registration.fields.established, t.about.registration.established, null],
    [t.about.registration.fields.registeredAddress, registration.registeredAddressZhHans, 'zh-Hans']
  ];
  const registrationEvidence = `<section class="registration-evidence shell" id="registration-evidence" aria-labelledby="registration-title" data-registration-stamp="${esc(t.about.registration.stamp)}">
    <div class="registration-evidence__copy reveal">
      <p class="kicker">${esc(t.about.registration.label)}</p>
      <h2 id="registration-title">${esc(t.about.registration.title)}</h2>
      <p class="registration-evidence__lead">${esc(t.about.registration.lead)}</p>
      <dl>${registrationFields.map(([term, description, lang]) => `<div><dt>${esc(term)}</dt><dd${lang ? ` lang="${lang}"` : ''}>${esc(description)}</dd></div>`).join('')}</dl>
      <p class="registration-evidence__disclosure"><span class="registration-evidence__disclosure-mark" aria-hidden="true">!</span><span class="registration-evidence__disclosure-copy">${esc(t.about.registration.disclosure)}</span></p>
    </div>
    <figure class="registration-evidence__document reveal">
      <div class="registration-evidence__frame" data-public-excerpt="${esc(t.about.registration.publicExcerpt)}"><img src="${esc(registration.publicAsset)}" alt="${esc(t.about.registration.imageAlt)}" width="1800" height="1273" loading="lazy"></div>
      <figcaption>${esc(t.about.registration.caption)}</figcaption>
    </figure>
  </section>`;
  const officeEvidence = hasPublishedOfficeEvidence() ? `<section class="office-evidence shell" id="office-evidence" aria-labelledby="office-evidence-title">
    <header class="office-evidence__header reveal"><div><p class="kicker">${esc(t.about.office.label)}</p><h2 id="office-evidence-title">${esc(t.about.office.title)}</h2></div><p>${esc(t.about.office.lead)}</p></header>
    <address class="office-evidence__address reveal"><span>${esc(t.about.office.addressLabel)}</span><strong lang="zh-Hans">${esc(brandProfile.office.address)}</strong></address>
    <div class="office-evidence__gallery">${brandProfile.office.photos.map((photo, index) => { const copy = t.about.office.photos[photo.id]; return `<figure class="reveal"><div class="office-evidence__image"><img src="${esc(photo.src)}" alt="${esc(copy.alt)}" width="${photo.width}" height="${photo.height}" loading="lazy"><span>0${index + 1}</span></div><figcaption>${esc(copy.caption)}</figcaption></figure>`; }).join('')}</div>
    <p class="office-evidence__disclosure reveal"><span class="office-evidence__disclosure-mark" aria-hidden="true">—</span><span class="office-evidence__disclosure-copy">${esc(t.about.office.disclosure)}</span></p>
  </section>` : '';
  return `<main id="main">${pageHeader(t.about.kicker, t.about.title, t.about.lead, true)}
    <section class="about-grid shell">
      <article class="about-lead reveal"><span class="file-label">01 · ${esc(t.ui.origin)}</span><h2>${esc(t.about.originTitle)}</h2><p>${esc(t.about.originText)}</p></article>
      <article class="about-block reveal"><span class="file-label">02 · ${esc(t.ui.model)}</span><h2>${esc(t.about.modelTitle)}</h2><p>${esc(t.about.modelText)}</p></article>
      <article class="about-block reveal"><span class="file-label">03 · ${esc(t.ui.footprint)}</span><h2>${esc(t.about.footprintTitle)}</h2><p>${esc(t.about.footprintText)}</p></article>
      <article class="about-block about-block--truth reveal"><span class="file-label">04 · ${esc(t.ui.scale)}</span><h2>${esc(t.about.scaleTitle)}</h2><p>${esc(t.about.scaleText)}</p></article>
    </section>
    <section class="business-record shell reveal"><div><p class="kicker">${esc(t.ui.operatingRecord)}</p><h2>${esc(t.about.record.title)}</h2></div><dl>${t.about.record.items.map(([term, description]) => `<div><dt>${esc(term)}</dt><dd>${esc(description)}</dd></div>`).join('')}</dl></section>
    <section class="operating-locations shell" aria-labelledby="operating-locations-title">
      <header class="operating-locations__header reveal"><div><p class="kicker">${esc(t.common.officesLabel)}</p><h2 id="operating-locations-title">${esc(t.about.locationsTitle)}</h2></div><p>${esc(t.about.locationsLead)}</p></header>
      <div class="operating-locations__list">${officeLocations.map((office) => `<address class="operating-location reveal"><div><strong>${esc(office.label)}</strong><span>${esc(office.role)}</span>${office.note ? `<small>${esc(office.note)}</small>` : ''}</div><p lang="${office.lang}">${esc(office.address)}</p></address>`).join('')}</div>
    </section>
    ${registrationEvidence}
    ${officeEvidence}
    <section class="principles shell">${t.about.principles.map(([title, text], index) => `<article class="principle reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</section>
    ${cta(t, t.about.ctaTitle, t.about.ctaText)}</main>`;
}

function request(t) {
  const f = t.request.fields;
  const p = t.request.placeholders;
  const field = (id, label, placeholder, type = 'text', required = false, maxLength = 240, autocomplete = '') => `<label class="form-field"><span>${esc(label)}${required ? ` <small>${esc(f.required)}</small>` : ''}</span><input id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}" maxlength="${maxLength}"${autocomplete ? ` autocomplete="${autocomplete}"` : ''} ${required ? 'required' : ''}></label>`;
  const status = t.request.status;
  return `<main id="main">${pageHeader(t.request.kicker, t.request.title, t.request.lead, { media: { id: 'power-bank', src: '/assets/editorial-power-bank.jpg', alt: t.request.visualAlt } })}
    <section class="request-layout shell">
      <form class="request-form reveal" data-inquiry-form data-inquiry-locale="${esc(t.__key)}" data-validation-message="${esc(status.validation)}" data-submitting-message="${esc(status.submitting)}" data-success-title="${esc(status.successTitle)}" data-success-body="${esc(status.successBody)}" data-error-message="${esc(status.error)}" data-rate-limit-message="${esc(status.rateLimit)}" novalidate>
        <div class="form-honesty"><span aria-hidden="true">↗</span><p>${esc(t.request.honest)}</p></div>
        <div class="form-grid">${field('name', f.name, p.name, 'text', true, 120, 'name')}${field('email', f.email, p.email, 'email', true, 254, 'email')}${field('company', f.company, p.company, 'text', false, 180, 'organization')}${field('supplier', f.supplier, p.supplier, 'text', true, 240)}${field('url', f.url, p.url, 'url', false, 500, 'url')}${field('chinese', f.chinese, p.chinese, 'text', false, 240)}${field('product', f.product, p.product, 'text', true, 240)}<label class="form-field form-field--wide"><span>${esc(f.question)} <small>${esc(f.required)}</small></span><textarea id="question" name="question" placeholder="${esc(p.question)}" rows="6" maxlength="4000" required></textarea></label></div>
        <label class="form-trap" aria-hidden="true" inert>Website<input name="website" type="text" tabindex="-1" autocomplete="off" maxlength="200"></label>
        <label class="consent"><input type="checkbox" name="consent" required><span>${esc(f.consent)}</span></label>
        <button class="button button--ink magnetic" type="submit" data-inquiry-submit><span data-inquiry-submit-label>${esc(f.send)}</span>${arrow()}</button>
        <p class="form-note">${esc(t.request.after)}</p><p class="form-error" data-form-error role="alert"></p>
        <div class="inquiry-status" data-inquiry-status role="status" aria-live="polite" tabindex="-1" hidden><strong data-inquiry-status-title></strong><p data-inquiry-status-message></p></div>
      </form>
      <aside class="request-aside reveal">
        <div><p class="kicker">${esc(t.request.directTitle)}</p><h2>${esc(t.request.directTitle)}</h2><p>${esc(t.request.directText)}</p>${requestContactList(t)}</div>
        <div><p class="kicker">${esc(t.request.responseTitle)}</p><ol>${t.request.responseSteps.map((item, index) => `<li><span>0${index + 1}</span><p>${esc(item)}</p></li>`).join('')}</ol></div>
      </aside>
    </section>
  </main>`;
}

function checkoutForm(t, product, modifier = '') {
  const labels = t.payment.payments.labels;
  const termsHref = pathFor(t.__key, 'paymentTerms');
  const quantity = product.quantity ? `<label class="checkout-field"><span>${esc(labels.quantity)} <small>${esc(labels.required)}</small></span><input type="number" name="quantity" min="1" max="100" step="1" value="1" inputmode="numeric" required></label>` : '';
  const reference = product.reference ? `<label class="checkout-field"><span>${esc(labels.reference)} <small>${esc(labels.required)}</small></span><input type="text" name="reference" maxlength="120" autocomplete="off" required></label>` : '';
  const referenceError = product.key === 'consultation-extension' ? labels.extensionReferenceError : labels.balanceReferenceError;
  return `<form class="checkout-form${modifier ? ` ${modifier}` : ''}" data-checkout-form data-product="${esc(product.key)}" data-login-label="${esc(t.payment.authGate.redirecting)}" data-validation-error="${esc(t.payment.authGate.validationError)}" data-checkout-error="${esc(labels.error)}" data-reference-error="${esc(referenceError)}" novalidate>
    <div class="checkout-resume-notice" data-checkout-resume hidden tabindex="-1"><strong>${esc(t.payment.authGate.resumeTitle)}</strong><p>${esc(t.payment.authGate.resumeText)}</p></div>
    ${quantity}${reference}
    <label class="consent checkout-consent"><input type="checkbox" name="terms" required><span>${esc(labels.terms)} <a href="${termsHref}" target="_blank" rel="noopener">${esc(labels.termsLink)}</a></span></label>
    <p class="checkout-login-note"><span aria-hidden="true">→</span><span>${esc(t.payment.authGate.purchaseNote)}</span></p>
    <button class="button button--ink" type="submit" data-checkout-button data-default-label="${esc(product.button)}" data-processing-label="${esc(labels.processing)}">${esc(product.button)}${arrow()}</button>
    <p class="form-error" data-checkout-error role="alert"></p>
  </form>`;
}

function serviceCheckoutProtocol(t) {
  return `<div class="service-checkout-protocol">
    <a class="service-checkout-protocol__mark" href="https://stripe.com/payments/checkout" target="_blank" rel="noopener" aria-label="Stripe Checkout"><img src="/assets/stripe-wordmark-slate.svg" alt="Stripe" width="360" height="151"></a>
    <div><strong>Stripe Checkout</strong><p>${esc(t.payment.payments.stripeNote)}</p></div>
  </div>`;
}

function sampleReport(t) {
  const report = t.services.sampleReport;
  const href = '/assets/zimonai-t1-sample-report.pdf';
  return `<section class="sample-report" aria-labelledby="sample-report-title">
    <div class="sample-report__copy"><p class="kicker">${esc(report.label)}</p><h3 id="sample-report-title">${esc(report.title)}</h3><p>${esc(report.lead)}</p><ul>${report.facts.map((fact) => `<li>${esc(fact)}</li>`).join('')}</ul><div class="sample-report__actions"><a class="button sample-report__open" href="${href}" target="_blank" rel="noopener">${esc(report.open)}${arrow()}</a><a class="sample-report__download" href="${href}" download="ZimonAI-T1-Sample-Report.pdf">${esc(report.download)}</a></div></div>
    <a class="sample-report__preview" href="${href}" target="_blank" rel="noopener" aria-label="${esc(report.open)}"><img src="/assets/zimonai-t1-sample-report-cover.png" alt="${esc(report.label)}" width="951" height="1345"><span>PDF · 8</span></a>
  </section>`;
}

function paymentCard(t, product) {
  const labels = t.payment.payments.labels;
  return `<article class="payment-card reveal" id="pay-${esc(product.key)}" data-payment-card="${esc(product.key)}">
    <header><span>${esc(product.index)}</span><p class="kicker">${esc(product.label)}</p><h2>${esc(product.title)}</h2><div class="payment-card__price"><strong>${esc(product.price)}</strong><small>${esc(product.unit)}</small></div><p>${esc(product.summary)}</p></header>
    <div class="payment-card__scope"><section><h3>${esc(labels.includes)}</h3><ul>${product.includes.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section><h3>${esc(labels.notIncluded)}</h3><p>${esc(product.notIncluded)}</p></section></div>
    <div class="payment-card__timing"><span>${esc(labels.timing)}</span><strong>${esc(product.timing)}</strong></div>
    ${checkoutForm(t, product)}
  </article>`;
}

function payments(t) {
  const copy = t.payment.payments;
  const extensionProduct = { key: 'consultation-extension', index: '05', label: copy.extension.title, title: copy.extension.title, price: copy.extension.price, unit: copy.extension.unit, timing: copy.extension.timing, summary: copy.extension.summary, includes: [copy.extension.summary], notIncluded: paymentProduct(t, 'consultation').notIncluded, button: copy.extension.button, reference: true };
  return `<main id="main"><section class="payment-hero shell">
      <div class="payment-hero__copy reveal"><p class="kicker">${esc(copy.kicker)}</p><h1>${esc(copy.title)}</h1><p class="payment-hero__lead">${esc(copy.lead)}</p><div class="payment-hero__protocol"><a class="payment-hero__stripe-mark" href="https://stripe.com/payments/checkout" target="_blank" rel="noopener" aria-label="Stripe Checkout"><img src="/assets/stripe-wordmark-slate.svg" alt="Stripe" width="360" height="151"></a><div><strong>Stripe Checkout</strong><p>${esc(copy.stripeNote)}</p></div></div></div>
      <aside class="payment-hero__index reveal"><img src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="1600" height="1600" aria-hidden="true"><div class="payment-hero__index-copy"><p class="kicker">${esc(copy.catalog.label)}</p><h2>${esc(copy.catalog.title)}</h2><p>${esc(copy.catalog.lead)}</p></div><nav aria-label="${esc(copy.catalog.label)}">${copy.products.map((product) => `<a href="#pay-${esc(product.key)}"><span>${esc(product.label)}</span><strong>${esc(product.price)}</strong>${arrow()}</a>`).join('')}</nav></aside>
    </section>
    <section class="payment-desk shell" aria-label="${esc(copy.kicker)}">
      <div class="payment-grid">${copy.products.map((product) => paymentCard(t, product)).join('')}</div>
      <div class="payment-private" data-private-payment hidden>${paymentCard(t, extensionProduct)}</div>
    </section>
    <section class="payment-process shell"><header class="section-heading reveal"><p class="kicker">${esc(copy.process.label)}</p><h2>${esc(copy.process.title)}</h2></header><ol>${copy.process.steps.map(([title, text], index) => `<li class="reveal"><span>0${index + 1}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`).join('')}</ol></section>
    <section class="payment-boundaries shell"><article class="reveal"><span>!</span><h2>${esc(copy.wrongFit.title)}</h2><p>${esc(copy.wrongFit.text)}</p></article><article class="reveal"><span>→</span><h2>${esc(copy.quoted.title)}</h2><p>${esc(copy.quoted.text)}</p><a class="text-link" href="${pathFor(t.__key, 'request')}">${esc(t.nav.request)}${arrow()}</a></article></section>
  </main>`;
}

function intakeField(id, label, type = 'text', wide = false) {
  return `<label class="form-field${wide ? ' form-field--wide' : ''}"><span>${esc(label)}</span>${type === 'textarea' ? `<textarea name="${id}" rows="5"></textarea>` : `<input name="${id}" type="${type}">`}</label>`;
}

function paymentSuccess(t) {
  const copy = t.payment.success;
  const f = copy.fields;
  return `<main id="main">${pageHeader(copy.kicker, copy.title, copy.lead)}
    <section class="payment-result shell" data-payment-result data-locale="${esc(t.__key)}" data-loading="${esc(copy.loading)}" data-verified="${esc(copy.verified)}" data-pending="${esc(copy.pending)}" data-invalid="${esc(copy.invalid)}">
      <article class="payment-receipt reveal" aria-live="polite"><div class="payment-receipt__status"><span data-payment-status-mark></span><strong data-payment-status>${esc(copy.loading)}</strong></div><dl><div><dt>${esc(copy.labels.item)}</dt><dd data-payment-item>—</dd></div><div><dt>${esc(copy.labels.amount)}</dt><dd data-payment-amount>—</dd></div><div><dt>${esc(copy.labels.email)}</dt><dd data-payment-email>—</dd></div><div><dt>${esc(copy.labels.reference)}</dt><dd data-payment-reference>—</dd></div><div><dt>${esc(copy.labels.session)}</dt><dd data-payment-session>—</dd></div></dl></article>
      <section class="payment-intake reveal" data-payment-intake hidden><header><p class="kicker">${esc(copy.nextTitle)}</p><h2>${esc(copy.nextTitle)}</h2><p>${esc(copy.nextLead)}</p></header>
        <form class="request-form" data-payment-intake-form novalidate>
          <div class="form-grid" data-consultation-fields hidden>${intakeField('timezone', f.timezone)}${intakeField('times', f.times, 'textarea', true)}<label class="form-field form-field--wide"><span>${esc(f.format)}</span><select name="format">${copy.formats.map((item) => `<option>${esc(item)}</option>`).join('')}</select></label>${intakeField('question', f.question, 'textarea', true)}</div>
          <div class="form-grid" data-verification-fields hidden>${intakeField('supplier', f.supplier)}${intakeField('url', f.url, 'url')}${intakeField('chinese', f.chinese)}${intakeField('product', f.product)}${intakeField('certificates', f.certificates, 'textarea', true)}${intakeField('decision', f.decision, 'textarea', true)}</div>
          <button class="button button--ink" type="submit">${esc(f.send)}${arrow()}</button><p class="form-note">${esc(copy.emailNote)}</p><p class="form-error" data-intake-error role="alert"></p>
        </form>
      </section>
      <aside class="payment-balance-done reveal" data-balance-done hidden><h2>${esc(copy.verified)}</h2><p>${esc(copy.balanceDone)}</p></aside>
      <p class="payment-support-note">${esc(copy.support)}</p>
    </section>
  </main>`;
}

function legalSection(section, index, ui, idPrefix) {
  const number = String(index + 1).padStart(2, '0');
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join('');
  const items = section.items?.length ? `<ul>${section.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : '';
  const note = section.note ? `<aside class="legal-row__note">${esc(section.note)}</aside>` : '';
  return `<article class="legal-row reveal" id="${esc(idPrefix)}-${number}">
    <span class="legal-row__index">${esc(ui.article)} ${number}</span>
    <div class="legal-row__content"><h2>${esc(section.title)}</h2>${paragraphs}${items}${note}</div>
  </article>`;
}

function legalDocument(t, copy, idPrefix) {
  const ui = legalContent[t.__key].ui;
  const effective = copy.lead.match(/(?:Effective |生效日期：)([^。.]+(?:\.|。)?)/)?.[1] || '21 August 2026';
  const references = copy.references?.length ? `<section class="legal-references reveal">
    <header><p class="kicker">${esc(ui.references)}</p><h2>${esc(ui.references)}</h2><p>${esc(ui.referencesLead)}</p></header>
    <div>${copy.references.map((item) => `<a href="${esc(item.href)}" target="_blank" rel="noopener noreferrer"><span><strong>${esc(item.label)}</strong><small>${esc(item.note)}</small></span>${arrow()}</a>`).join('')}</div>
  </section>` : '';
  return `<main id="main" class="legal-page">${pageHeader(copy.kicker, copy.title, copy.lead, { legal: true })}
    <section class="legal-document shell">
      <aside class="legal-document__rail reveal">
        <p class="kicker">${esc(ui.document)}</p>
        <h2>${esc(copy.summaryTitle)}</h2><p>${esc(copy.summary)}</p>
        <dl class="legal-document__meta">
          <div><dt>${esc(ui.effective)}</dt><dd>${esc(effective)}</dd></div>
          <div><dt>${esc(ui.operator)}</dt><dd lang="zh-Hans">${esc(brandProfile.registration.legalNameZhHans)}</dd></div>
          <div><dt>${esc(ui.contact)}</dt><dd><a href="mailto:${esc(brandProfile.email)}">${esc(brandProfile.email)}</a></dd></div>
        </dl>
        <nav class="legal-toc" aria-label="${esc(ui.contents)}"><strong>${esc(ui.contents)}</strong><ol>${copy.sections.map((section, index) => `<li><a href="#${esc(idPrefix)}-${String(index + 1).padStart(2, '0')}"><span class="legal-toc__no">${String(index + 1).padStart(2, '0')}</span><span class="legal-toc__title">${esc(section.title)}</span></a></li>`).join('')}</ol></nav>
      </aside>
      <div class="legal">${copy.sections.map((section, index) => legalSection(section, index, ui, idPrefix)).join('')}${references}
        <section class="legal-contact reveal"><div><p class="kicker">${esc(ui.contactTitle)}</p><h2>${esc(ui.contactTitle)}</h2><p>${esc(ui.contactLead)}</p></div><a class="button button--ink" href="mailto:${esc(brandProfile.email)}">${esc(brandProfile.email)}${arrow()}</a></section>
      </div>
    </section>
  </main>`;
}

function paymentTerms(t) {
  return legalDocument(t, legalContent[t.__key].paymentTerms, 'terms');
}

function privacy(t) {
  return legalDocument(t, legalContent[t.__key].privacy, 'privacy');
}

function knowledgeRecordAttributes(spec) {
  return `data-knowledge-record="${esc(spec.id)}" data-knowledge-category="${esc(spec.category)}" data-knowledge-products="${esc((spec.products || []).join(' '))}" data-knowledge-markets="${esc((spec.markets || []).join(' '))}"`;
}

function knowledgeCategoryPath(langKey, categoryId) {
  const definition = knowledgeCategoryDefinitions.find((item) => item.id === categoryId);
  return definition ? pathFor(langKey, `knowledge-category-${definition.id}`) : pathFor(langKey, 'knowledge');
}

function knowledgeCard(t, spec, article, featured = false) {
  const crop = spec.imageCrop || {};
  const cropStyle = `--knowledge-card-image-position:${esc(crop.card || '50% 50%')};--knowledge-card-image-position-mobile:${esc(crop.mobile || crop.card || '50% 50%')}`;
  return `<article class="knowledge-card${featured ? ' knowledge-card--featured' : ''}" ${knowledgeRecordAttributes(spec)}>
    <a class="knowledge-card__media" href="${pathFor(t.__key, spec.id)}" aria-label="${esc(article.title)}" style="${cropStyle}">
      <img src="${esc(spec.image)}" alt="${esc(article.imageAlt)}" width="${spec.imageWidth}" height="${spec.imageHeight}" loading="${featured ? 'eager' : 'lazy'}">
      <span>${String(knowledgeArticleSpecs.indexOf(spec) + 1).padStart(2, '0')}</span>
    </a>
    <div class="knowledge-card__copy">
      <p class="kicker">${esc(article.topic)}</p>
      <h2><a href="${pathFor(t.__key, spec.id)}">${esc(article.title)}</a></h2>
      <p>${esc(article.description)}</p>
      <div class="knowledge-card__meta"><time datetime="${esc(spec.datePublished)}">${esc(article.published)}</time><span>${esc(article.readTime)}</span></div>
      <a class="text-link" href="${pathFor(t.__key, spec.id)}">${esc(t.knowledge.ui.read)}${arrow()}</a>
    </div>
  </article>`;
}

function knowledgeIndexRow(t, spec, article) {
  const taxonomy = t.knowledge.taxonomy;
  const category = taxonomy.categories[spec.category];
  const tags = [
    ...(spec.products || []).slice(0, 2).map((id) => taxonomy.products[id]),
    ...(spec.markets || []).slice(0, 1).map((id) => taxonomy.markets[id])
  ].filter(Boolean);
  return `<article class="knowledge-row" ${knowledgeRecordAttributes(spec)}>
    <span class="knowledge-row__no" aria-hidden="true">${String(knowledgeArticleSpecs.indexOf(spec) + 1).padStart(2, '0')}</span>
    <div class="knowledge-row__main">
      <a class="knowledge-row__category" href="${knowledgeCategoryPath(t.__key, spec.category)}">${esc(category?.name || article.topic)}</a>
      <h3><a href="${pathFor(t.__key, spec.id)}">${esc(article.title)}</a></h3>
      <p>${esc(article.description)}</p>
      ${tags.length ? `<ul class="knowledge-row__tags" aria-label="${esc(taxonomy.filtersLabel)}">${tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>` : ''}
    </div>
    <div class="knowledge-row__meta"><time datetime="${esc(spec.datePublished)}">${esc(article.published)}</time><span>${esc(article.readTime)}</span></div>
    <a class="knowledge-row__open" href="${pathFor(t.__key, spec.id)}" aria-label="${esc(`${t.knowledge.ui.read}: ${article.title}`)}">${arrow()}</a>
  </article>`;
}

function knowledgeResultCount(taxonomy, count) {
  const unit = count === 1 ? taxonomy.resultSingular : taxonomy.resultPlural;
  return `${taxonomy.resultsLabel} ${count} ${unit}`;
}

function knowledgeRuntimeCopy(langKey) {
  if (langKey === 'zh-tw') return {
    indexError: '搜尋索引暫時無法載入。下方文章仍可閱讀，也可以使用主題分類瀏覽。',
    noScript: '目前顯示完整文章索引。若要使用全文搜尋與產品、市場篩選，請開啟 JavaScript。',
    allNotes: '全部查核筆記'
  };
  if (langKey === 'zh-cn') return {
    indexError: '搜索索引暂时无法加载。下方文章仍可阅读，也可以使用主题分类浏览。',
    noScript: '当前显示完整文章索引。如需使用全文搜索与产品、市场筛选，请启用 JavaScript。',
    allNotes: '全部核查笔记'
  };
  return {
    indexError: 'The search index is temporarily unavailable. The articles below remain readable, and you can still browse by topic.',
    noScript: 'The complete article index is shown below. Enable JavaScript to use full-text search and product or market filters.',
    allNotes: 'All field notes'
  };
}

function knowledge(t, page = pageMap.knowledge) {
  const copy = t.knowledge;
  const taxonomy = copy.taxonomy;
  const fixedCategory = page.kind === 'knowledge-category' ? page.categoryId : '';
  const categoryCopy = fixedCategory ? taxonomy.categories[fixedCategory] : null;
  const records = knowledgeArticleSpecs
    .filter((spec) => !fixedCategory || spec.category === fixedCategory)
    .map((spec) => ({ spec, article: copy.articles[spec.key] }))
    .sort((left, right) => right.spec.datePublished.localeCompare(left.spec.datePublished) || left.spec.id.localeCompare(right.spec.id));
  const featured = records.find(({ spec }) => spec.featured);
  const rest = featured ? records.filter(({ spec }) => spec.id !== featured.spec.id) : [];
  if (!featured) rest.push(...records);
  const runtimeCopy = knowledgeRuntimeCopy(t.__key);
  const heroTitle = categoryCopy?.name || copy.hub.title;
  const heroLead = categoryCopy?.description || copy.hub.lead;
  const heroKicker = categoryCopy ? taxonomy.categoryKicker : copy.hub.kicker;
  const categoryLinks = [
    `<a class="knowledge-chip" href="${pathFor(t.__key, 'knowledge')}" data-knowledge-category-filter=""${fixedCategory ? '' : ' aria-current="page"'}>${esc(taxonomy.allCategories)}</a>`,
    ...knowledgeCategoryDefinitions.filter((definition) => knowledgeArticleSpecs.some((spec) => spec.category === definition.id)).map((definition) => {
      const category = taxonomy.categories[definition.id];
      return `<a class="knowledge-chip" href="${pathFor(t.__key, `knowledge-category-${definition.id}`)}" data-knowledge-category-filter="${esc(definition.id)}"${fixedCategory === definition.id ? ' aria-current="page"' : ''}>${esc(category.name)}</a>`;
    })
  ].join('');
  const productOptions = Object.entries(taxonomy.products).map(([id, label]) => `<option value="${esc(id)}">${esc(label)}</option>`).join('');
  const marketOptions = Object.entries(taxonomy.markets).map(([id, label]) => `<option value="${esc(id)}">${esc(label)}</option>`).join('');
  const indexUrl = `/assets/knowledge-index-${t.__key}.json`;
  return `<main id="main">
    <section class="knowledge-hero" aria-labelledby="knowledge-title">
      <div class="shell knowledge-hero__grid">
        <div class="knowledge-hero__copy">
          <p class="kicker">${esc(heroKicker)}</p>
          <h1 id="knowledge-title">${esc(heroTitle)}</h1>
          <p>${esc(heroLead)}</p>
        </div>
        <div class="knowledge-hero__folio" aria-hidden="true"><span>${esc(categoryCopy ? taxonomy.categoryKicker : copy.hub.kicker)}</span><strong>01—${String(records.length).padStart(2, '0')}</strong><img src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="512" height="512"></div>
      </div>
    </section>
    <section class="knowledge-index shell" aria-labelledby="knowledge-index-title" data-knowledge-index data-knowledge-index-url="${esc(indexUrl)}" data-knowledge-fixed-category="${esc(fixedCategory)}" data-knowledge-index-error="${esc(runtimeCopy.indexError)}">
      <h2 class="sr-only" id="knowledge-index-title">${esc(taxonomy.searchLabel)}</h2>
      <div class="knowledge-console">
        <form class="knowledge-search" role="search" action="${pathFor(t.__key, page.id)}" method="get" data-knowledge-search-form>
          <label for="knowledge-search-input">${esc(taxonomy.searchLabel)}</label>
          <div class="knowledge-search__field"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input id="knowledge-search-input" name="q" type="search" inputmode="search" autocomplete="off" spellcheck="false" placeholder="${esc(taxonomy.searchPlaceholder)}" aria-describedby="knowledge-search-hint" data-knowledge-search></div>
          <p id="knowledge-search-hint">${esc(taxonomy.searchHint)}</p>
        </form>
        <div class="knowledge-filters" aria-labelledby="knowledge-filter-label">
          <strong id="knowledge-filter-label">${esc(taxonomy.filtersLabel)}</strong>
          <nav class="knowledge-chips" aria-label="${esc(taxonomy.filtersLabel)}">${categoryLinks}</nav>
          <div class="knowledge-selects">
            <label><span>${esc(taxonomy.productsLabel)}</span><select name="product" data-knowledge-product><option value="">${esc(taxonomy.allProducts)}</option>${productOptions}</select></label>
            <label><span>${esc(taxonomy.marketsLabel)}</span><select name="market" data-knowledge-market><option value="">${esc(taxonomy.allMarkets)}</option>${marketOptions}</select></label>
            <button type="button" data-knowledge-clear disabled>${esc(taxonomy.clearSearch)}</button>
          </div>
        </div>
        <div class="knowledge-console__status">
          <p id="knowledge-results-status" role="status" aria-live="polite" aria-atomic="true" data-knowledge-count data-results-label="${esc(taxonomy.resultsLabel)}" data-result-singular="${esc(taxonomy.resultSingular)}" data-result-plural="${esc(taxonomy.resultPlural)}">${esc(knowledgeResultCount(taxonomy, records.length))}</p>
          <p class="knowledge-index__error" role="status" data-knowledge-index-error-message hidden>${esc(runtimeCopy.indexError)}</p>
        </div>
      </div>
      <noscript><p class="knowledge-noscript">${esc(runtimeCopy.noScript)}</p></noscript>
      ${featured ? `<div class="knowledge-featured" data-knowledge-featured-region>
        <header class="knowledge-index__heading"><p class="kicker">${esc(copy.hub.featured)}</p><h2 id="knowledge-featured-title">${esc(featured.article.topic)}</h2></header>
        ${knowledgeCard(t, featured.spec, featured.article, true)}
      </div>` : ''}
      <div class="knowledge-catalog" data-knowledge-catalog-region${rest.length ? '' : ' hidden'}>
        <header class="knowledge-index__heading knowledge-index__heading--latest"><p class="kicker">${esc(runtimeCopy.allNotes)}</p><span>${featured ? '02' : '01'}—${String(records.length).padStart(2, '0')}</span></header>
        <div class="knowledge-list">${rest.map(({ spec, article }) => knowledgeIndexRow(t, spec, article)).join('')}</div>
      </div>
      <section class="knowledge-empty" data-knowledge-empty hidden aria-labelledby="knowledge-empty-title">
        <span aria-hidden="true">?</span><div><h2 id="knowledge-empty-title">${esc(taxonomy.noResultsTitle)}</h2><p>${esc(taxonomy.noResultsText)}</p><button type="button" data-knowledge-clear>${esc(taxonomy.clearSearch)}</button></div>
      </section>
    </section>
    <section class="knowledge-method">
      <div class="shell knowledge-method__inner">
        <header class="reveal"><p class="kicker">${esc(copy.hub.methodLabel)}</p><h2>${esc(copy.hub.methodTitle)}</h2></header>
        <div class="knowledge-method__items">${copy.hub.methodItems.map(([title, text], index) => `<article class="reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>
      </div>
    </section>
    <section class="knowledge-next shell reveal"><div><p class="kicker">${esc(copy.hub.nextLabel)}</p><h2>${esc(copy.hub.nextTitle)}</h2></div><p>${esc(copy.hub.nextText)}</p></section>
    ${cta(t, t.home.finalTitle, t.home.finalText)}
  </main>`;
}

function knowledgeArticle(t, page) {
  const copy = t.knowledge;
  const spec = knowledgeSpecById(page.id);
  const article = copy.articles[spec.key];
  const summaryLabel = article.labels?.summary || copy.ui.quickAnswer;
  const checklistLabel = article.labels?.checklist || copy.ui.buyerChecklist;
  const limitsLabel = article.labels?.limits || copy.ui.limits;
  const imageCrop = spec.imageCrop || {};
  const imageCropStyle = `--field-note-image-position:${esc(imageCrop.article || '50% 50%')};--field-note-image-position-mobile:${esc(imageCrop.mobile || imageCrop.article || '50% 50%')}`;
  const sharedCount = (left = [], right = []) => left.filter((item) => right.includes(item)).length;
  const related = knowledgeArticleSpecs
    .map((item, index) => ({
      item,
      index,
      score: (item.category === spec.category ? 12 : 0)
        + sharedCount(item.products, spec.products) * 4
        + sharedCount(item.markets, spec.markets) * 2
    }))
    .filter(({ item }) => item.id !== spec.id)
    .sort((left, right) => right.score - left.score
      || right.item.datePublished.localeCompare(left.item.datePublished)
      || left.item.id.localeCompare(right.item.id))
    .slice(0, 3)
    .map(({ item }) => item);
  return `<main id="main">
    <article class="field-note">
      <header class="field-note__hero">
        <div class="shell field-note__hero-grid">
          <div class="field-note__headline">
            <a class="field-note__back" href="${pathFor(t.__key, 'knowledge')}">← ${esc(copy.ui.back)}</a>
            <p class="kicker">${esc(article.topic)} · ${String(knowledgeArticleSpecs.indexOf(spec) + 1).padStart(2, '0')}</p>
            <h1>${esc(article.title)}</h1>
            <p class="field-note__dek">${esc(article.description)}</p>
            <dl class="field-note__meta">
              <div><dt>${esc(copy.ui.published)}</dt><dd><time datetime="${esc(spec.datePublished)}">${esc(article.published)}</time></dd></div>
              <div><dt>${esc(copy.ui.readTime)}</dt><dd>${esc(article.readTime)}</dd></div>
              <div><dt>${esc(copy.ui.reviewed)}</dt><dd>${esc(article.published)}</dd></div>
            </dl>
          </div>
          <figure class="field-note__image" style="${imageCropStyle}">
            <img src="${esc(spec.image)}" alt="${esc(article.imageAlt)}" width="${spec.imageWidth}" height="${spec.imageHeight}" loading="eager" fetchpriority="high">
            <figcaption><span>${esc(article.imageCaption)}</span><a href="${esc(spec.photo.page)}" target="_blank" rel="noopener noreferrer">${esc(copy.ui.photo)} · ${esc(spec.photo.photographer)}</a></figcaption>
          </figure>
        </div>
      </header>
      <div class="shell field-note__layout">
        <aside class="field-note__rail">
          <p class="kicker">${esc(summaryLabel)}</p>
          <ol>${article.sections.map((section, index) => `<li><a href="#section-${index + 1}"><span class="field-note__rail-no">0${index + 1}</span><span class="field-note__rail-title">${esc(section.title)}</span></a></li>`).join('')}</ol>
        </aside>
        <div class="field-note__body">
          <section class="answer-first reveal" aria-labelledby="answer-title"><p class="kicker" id="answer-title">${esc(summaryLabel)}</p><p>${esc(article.answer)}</p></section>
          <ul class="field-note__takeaways">${article.takeaways.map((item, index) => `<li class="reveal"><span>${String(index + 1).padStart(2, '0')}</span><p>${esc(item)}</p></li>`).join('')}</ul>
          ${article.sections.map((section, index) => `<section class="field-note__section reveal" id="section-${index + 1}"><span class="field-note__section-no">${String(index + 1).padStart(2, '0')}</span><h2>${esc(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}${section.items ? `<ul>${section.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
          <section class="buyer-checklist reveal"><p class="kicker">${esc(checklistLabel)}</p><h2>${esc(checklistLabel)}</h2><ul>${article.checklist.map((item) => `<li><span class="buyer-checklist__mark" aria-hidden="true">✓</span><span class="buyer-checklist__text">${esc(item)}</span></li>`).join('')}</ul></section>
          <aside class="evidence-limit reveal"><span>!</span><div><p class="kicker">${esc(limitsLabel)}</p><h2>${esc(limitsLabel)}</h2><p>${esc(article.limitsText)}</p></div></aside>
        </div>
      </div>
      <section class="field-note__sources">
        <div class="shell field-note__sources-grid">
          <header><p class="kicker">${esc(copy.ui.sources)}</p><h2>${esc(copy.ui.sources)}</h2><p>${esc(copy.ui.sourcesLead)}</p></header>
          <ol>${spec.sources.map((source, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${esc(source.publisher)}</strong><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer"><span class="field-note__source-title">${esc(source.title)}</span>${arrow()}</a></div></li>`).join('')}</ol>
        </div>
      </section>
      <section class="field-note__related shell"><header><p class="kicker">${esc(copy.ui.related)}</p><h2>${esc(copy.ui.related)}</h2></header><div>${related.map((relatedSpec) => { const relatedArticle = copy.articles[relatedSpec.key]; return `<a href="${pathFor(t.__key, relatedSpec.id)}"><span>${esc(relatedArticle.topic)}</span><strong>${esc(relatedArticle.title)}</strong>${arrow()}</a>`; }).join('')}</div></section>
      <footer class="field-note__credit shell"><p>${esc(copy.ui.editorialCredit)}</p></footer>
    </article>
    ${cta(t, t.home.finalTitle, t.home.finalText)}
  </main>`;
}

const renderers = { home, services, methodology, scope, about, portal, admin, request, payments, paymentSuccess, paymentTerms, privacy, knowledge };

function header(t, pageId) {
  const nav = [['services', t.nav.servicesBooking], ['knowledge', t.nav.knowledge], ['methodology', t.nav.methodology], ['scope', t.nav.scope], ['about', t.nav.about]];
  const isHome = pageId === 'home';
  const usesNightHeader = isHome;
  return `<a class="skip-link" href="#main">${esc(t.common.skip)}</a><header class="site-header${isHome ? ' site-header--home' : ''}${usesNightHeader ? ' site-header--night' : ''}" data-header>
    <div class="site-header__inner">
      <a class="brand" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo" src="${usesNightHeader ? '/assets/zimonai-logo-white.svg' : '/assets/zimonai-logo-primary.svg'}" alt="ZimonAI" width="1600" height="360"><em class="brand__descriptor">${esc(t.common.brandDescriptor)}</em></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-nav-toggle><span>${esc(t.nav.menu)}</span><i></i><i></i></button>
      <nav class="site-nav" id="main-nav" data-nav>
        <span class="nav-hover-frame" aria-hidden="true" data-nav-frame></span>
        ${nav.map(([id, label]) => `<a class="nav-link" href="${pathFor(t.__key, id)}" ${(pageId === id || (id === 'services' && pageId === 'payments') || (id === 'knowledge' && pageId.startsWith('knowledge-'))) ? `aria-current="page"` : ''}>${esc(label)}</a>`).join('')}
        <div class="lang-switch" data-lang-switch><button type="button" aria-expanded="false" data-lang-button>${esc(t.short)}<span aria-hidden="true">⌄</span></button><div class="lang-switch__menu">${Object.entries(languages).map(([key, lang]) => `<a lang="${lang.htmlLang}" href="${pathFor(key, pageId)}" ${key === t.__key ? 'aria-current="true"' : ''}>${esc(lang.name)}</a>`).join('')}</div></div>
        <a class="nav-portal" href="${pathFor(t.__key, 'portal')}" ${pageId === 'portal' ? 'aria-current="page"' : ''}>${esc(t.portal.navLabel)}</a>
        <a class="nav-cta" href="${pathFor(t.__key, 'request')}">${esc(t.nav.request)}${arrow()}</a>
      </nav>
    </div>
  </header>`;
}

function footer(t) {
  const officeLocations = localizedOfficeLocations(t);
  return `<footer class="site-footer"><div class="shell site-footer__top"><div><a class="brand brand--footer" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo brand__logo--inverse" src="/assets/zimonai-logo-white.svg" alt="ZimonAI" width="1600" height="360"></a><p>${esc(t.common.footerLine)}</p><div class="footer-identity"><strong><span lang="zh-Hans">深圳智蒙湾科技有限公司</span> · ZimonAI Technology Co., Ltd.</strong><span>${esc(t.common.footerCategory)}</span><span>${esc(t.common.creditCodeLabel)} ${esc(brandProfile.registration.creditCode)}</span><address class="footer-addresses" aria-label="${esc(t.common.officesLabel)}">${officeLocations.map((office) => `<span class="footer-office"><b>${esc(office.label)}</b><i><em>${esc(office.role)}</em><span lang="${office.lang}">${esc(office.address)}</span>${office.note ? `<small>${esc(office.note)}</small>` : ''}</i></span>`).join('')}</address></div></div>${footerContactList(t)}</div><div class="shell site-footer__bottom"><p>© 2026 ZimonAI 智蒙灣</p><p>${esc(t.common.footerScope)}</p><div class="footer-legal"><a href="${pathFor(t.__key, 'services')}">${esc(t.nav.servicesBooking)}</a><a href="${pathFor(t.__key, 'knowledge')}">${esc(t.nav.knowledge)}</a><a href="${pathFor(t.__key, 'paymentTerms')}">${esc(t.payment.payments.labels.termsLink)}</a><a href="${pathFor(t.__key, 'privacy')}">${esc(t.common.privacy)}</a></div></div></footer><div class="cursor-label" data-cursor-label aria-hidden="true"></div>`;
}

function supportPanel(t) {
  const copy = t.payment.support;
  return `<button class="support-launch" type="button" aria-label="${esc(copy.open)}" aria-expanded="false" aria-controls="support-panel" data-support-open><span aria-hidden="true">?</span><strong>${esc(copy.open)}</strong></button><div class="support-backdrop" data-support-backdrop hidden></div><aside class="support-panel" id="support-panel" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="support-title" tabindex="-1" inert data-support-panel><header><div><p class="kicker">ZimonAI</p><h2 id="support-title">${esc(copy.title)}</h2></div><button type="button" aria-label="${esc(copy.close)}" data-support-close>×</button></header><p>${esc(copy.intro)}</p><div class="support-contacts">${approvedContacts(t).map((item) => `<div><span>${esc(item.label)}</span>${item.href ? `<a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(item.value)}${arrow()}</a>` : `<strong>${esc(item.value)}</strong><button type="button" aria-live="polite" data-copy-contact="${esc(item.value)}" data-copy-label="${esc(copy.copy)}" data-copied-label="${esc(copy.copied)}" data-copy-error-label="${esc(copy.copyFailed)}">${esc(copy.copy)}</button>`}</div>`).join('')}</div><a class="button button--ink" href="mailto:${esc(brandProfile.email)}?subject=${encodeURIComponent(t.__key === 'en' ? 'ZimonAI service or payment support' : t.__key === 'zh-tw' ? 'ZimonAI 服務或付款協助' : 'ZimonAI 服务或付款协助')}">${esc(copy.emailAction)}${arrow()}</a><p class="support-panel__note">${esc(copy.paymentHelp)}</p></aside>`;
}

export function renderPage(langKey, pageId, { protectCjk = true } = {}) {
  const original = languages[langKey];
  const page = pageMap[pageId];
  const knowledgeCopy = knowledgeContent[langKey];
  const t = { ...original, payment: paymentContent[langKey], knowledge: knowledgeCopy, portal: portalContent[langKey], admin: adminContent[langKey], __key: langKey };
  const articleSpec = page.kind === 'article' ? knowledgeSpecById(pageId) : null;
  const articleCopy = articleSpec ? knowledgeCopy.articles[articleSpec.key] : null;
  const categoryCopy = page.kind === 'knowledge-category' ? knowledgeCopy.taxonomy.categories[page.categoryId] : null;
  const isKnowledgeCollection = page.kind === 'knowledge' || page.kind === 'knowledge-category';
  const unsortedCollectionSpecs = page.kind === 'knowledge-category'
    ? knowledgeArticleSpecs.filter((spec) => spec.category === page.categoryId)
    : knowledgeArticleSpecs;
  const sortedCollectionSpecs = [...unsortedCollectionSpecs]
    .sort((left, right) => right.datePublished.localeCompare(left.datePublished) || left.id.localeCompare(right.id));
  const collectionFeatured = sortedCollectionSpecs.find((spec) => spec.featured);
  const collectionSpecs = collectionFeatured
    ? [collectionFeatured, ...sortedCollectionSpecs.filter((spec) => spec.id !== collectionFeatured.id)]
    : sortedCollectionSpecs;
  const baseMeta = original.meta.titles[pageId] ? original.meta : paymentContent[langKey].meta;
  const metaTitle = pageId === 'portal' ? t.portal.metaTitle : pageId === 'admin' ? t.admin.metaTitle : pageId === 'knowledge' ? knowledgeCopy.hub.metaTitle : categoryCopy ? `${categoryCopy.name} | ZimonAI` : articleCopy ? `${articleCopy.title} | ZimonAI` : baseMeta.titles[pageId];
  const metaDescription = pageId === 'portal' ? t.portal.metaDescription : pageId === 'admin' ? t.admin.metaDescription : pageId === 'knowledge' ? knowledgeCopy.hub.metaDescription : categoryCopy ? categoryCopy.description : articleCopy ? articleCopy.description : baseMeta.descriptions[pageId];
  const canonical = `https://zimonai.com${pathFor(langKey, pageId)}`;
  const alternates = Object.entries(languages).map(([key, lang]) => `<link rel="alternate" hreflang="${lang.htmlLang}" href="https://zimonai.com${pathFor(key, pageId)}">`).join('\n');
  const organizationId = 'https://zimonai.com/#organization';
  const websiteId = 'https://zimonai.com/#website';
  const webpageId = `${canonical}#webpage`;
  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'ZimonAI',
    alternateName: ['ZimonAI 智蒙灣', '智蒙灣'],
    legalName: brandProfile.registration.legalNameZhHans,
    url: brandProfile.domain,
    logo: {
      '@type': 'ImageObject',
      url: 'https://zimonai.com/zimonai-shield-favicon.png',
      width: 192,
      height: 192
    },
    email: brandProfile.email,
    telephone: brandProfile.contacts.chinaPhone.display,
    sameAs: [brandProfile.contacts.linkedin.href],
    foundingDate: brandProfile.registration.established,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Unified Social Credit Code',
      value: brandProfile.registration.creditCode
    },
    contactPoint: [brandProfile.contacts.chinaPhone, brandProfile.contacts.taiwanPhone].map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.display,
      contactType: 'customer service'
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: brandProfile.registration.registeredAddressZhHans,
      addressLocality: '深圳市',
      addressCountry: 'CN'
    }
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: brandProfile.domain,
    name: 'ZimonAI',
    alternateName: '智蒙灣',
    publisher: { '@id': organizationId },
    inLanguage: Object.values(languages).map((language) => language.htmlLang)
  };
  const webpage = {
    '@type': pageId === 'about' ? 'AboutPage' : pageId === 'request' ? 'ContactPage' : 'WebPage',
    '@id': webpageId,
    url: canonical,
    name: metaTitle,
    description: metaDescription,
    inLanguage: original.htmlLang,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    publisher: { '@id': organizationId }
  };
  if (isKnowledgeCollection) webpage['@type'] = 'CollectionPage';
  const graph = [organization, website, webpage];
  if (pageId === 'services') {
    const serviceId = `${canonical}#service`;
    const offerCatalogId = `${canonical}#offer-catalog`;
    webpage.mainEntity = { '@id': serviceId };
    graph.push({
      '@type': 'Service',
      '@id': serviceId,
      name: t.common.footerCategory,
      serviceType: t.common.footerCategory,
      url: canonical,
      provider: { '@id': organizationId },
      hasOfferCatalog: { '@id': offerCatalogId }
    }, {
      '@type': 'OfferCatalog',
      '@id': offerCatalogId,
      name: t.services.staircase.title,
      url: canonical,
      itemListElement: t.services.catalog.map((tier) => structuredTierOffer(tier, canonical, organizationId))
    });
  } else if (pageId === 'home') {
    webpage.mainEntity = { '@id': organizationId };
  } else if (isKnowledgeCollection) {
    const itemListId = `${canonical}#articles`;
    webpage.mainEntity = { '@id': itemListId };
    graph.push({
      '@type': 'ItemList',
      '@id': itemListId,
      numberOfItems: collectionSpecs.length,
      itemListElement: collectionSpecs.map((spec, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://zimonai.com${pathFor(langKey, spec.id)}`,
        name: knowledgeCopy.articles[spec.key].title
      }))
    });
    if (categoryCopy) {
      const breadcrumbId = `${canonical}#breadcrumb`;
      webpage.breadcrumb = { '@id': breadcrumbId };
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: knowledgeCopy.hub.title, item: `https://zimonai.com${pathFor(langKey, 'knowledge')}` },
          { '@type': 'ListItem', position: 2, name: categoryCopy.name, item: canonical }
        ]
      });
    }
  } else if (articleSpec) {
    const articleId = `${canonical}#article`;
    const breadcrumbId = `${canonical}#breadcrumb`;
    webpage.mainEntity = { '@id': articleId };
    webpage.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: knowledgeCopy.hub.title, item: `https://zimonai.com${pathFor(langKey, 'knowledge')}` },
        { '@type': 'ListItem', position: 2, name: articleCopy.title, item: canonical }
      ]
    }, {
      '@type': 'Article',
      '@id': articleId,
      headline: articleCopy.title,
      description: articleCopy.description,
      image: `https://zimonai.com${articleSpec.image}`,
      datePublished: articleSpec.datePublished,
      dateModified: articleSpec.dateModified,
      articleSection: knowledgeCopy.taxonomy.categories[articleSpec.category]?.name || articleCopy.topic,
      inLanguage: original.htmlLang,
      mainEntityOfPage: { '@id': webpageId },
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      citation: articleSpec.sources.map((source) => source.url)
    });
  }
  const schema = { '@context': 'https://schema.org', '@graph': graph };
  const defaultOgImageAlt = langKey === 'en'
    ? 'ZimonAI charger and power electronics supplier verification'
    : langKey === 'zh-tw'
      ? 'ZimonAI 充電器與電源電子供應商查核'
      : 'ZimonAI 充电器与电源电子供应商核查';
  const ogImageAlt = articleCopy ? articleCopy.imageAlt : defaultOgImageAlt;
  const socialImage = articleSpec ? `https://zimonai.com${articleSpec.image}` : 'https://zimonai.com/assets/og-image.png';
  const alternateLocales = Object.values(languages)
    .filter((language) => language.locale !== original.locale)
    .map((language) => `<meta property="og:locale:alternate" content="${language.locale}">`)
    .join('\n  ');
  const document = `<!doctype html>
<html lang="${original.htmlLang}" data-page="${pageId}" data-layout="${layoutMode(langKey)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(metaTitle)}</title>
  <meta name="description" content="${esc(metaDescription)}">
  ${page.noindex ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="https://zimonai.com${pathFor('en', pageId)}">
  <meta property="og:type" content="${articleSpec ? 'article' : 'website'}">
  <meta property="og:site_name" content="ZimonAI 智蒙灣">
  <meta property="og:title" content="${esc(metaTitle)}">
  <meta property="og:description" content="${esc(metaDescription)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${original.locale}">
  ${alternateLocales}
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="${articleSpec ? articleSpec.imageWidth : 1200}"><meta property="og:image:height" content="${articleSpec ? articleSpec.imageHeight : 630}">
  <meta property="og:image:alt" content="${esc(ogImageAlt)}">
  ${articleSpec ? `<meta property="article:published_time" content="${articleSpec.datePublished}"><meta property="article:modified_time" content="${articleSpec.dateModified}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(metaTitle)}">
  <meta name="twitter:description" content="${esc(metaDescription)}">
  <meta name="twitter:image" content="${socialImage}">
  <meta name="twitter:image:alt" content="${esc(ogImageAlt)}">
  <meta name="theme-color" content="#101D33">
  <link rel="icon" href="/zimonai-shield-favicon.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="stylesheet" href="/assets/site.css">
  ${pageId === 'portal' || pageId === 'admin' ? '<link rel="stylesheet" href="/assets/portal.css">' : ''}
  ${pageId === 'admin' ? '<link rel="stylesheet" href="/assets/admin.css">' : ''}
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
  <script type="module" src="/assets/site.js"></script>
  ${pageId === 'portal' ? '<script type="module" src="/assets/portal.js"></script>' : ''}
  ${pageId === 'admin' ? '<script type="module" src="/assets/admin.js"></script>' : ''}
</head>
<body class="${pageId === 'portal' ? 'page-portal' : pageId === 'admin' ? 'page-portal page-admin' : page.kind === 'knowledge-category' ? 'page-public page-public--knowledge page-public--knowledge-category' : `page-public page-public--${pageId}`}">
  ${header(t, pageId)}
  ${page.kind === 'article' ? knowledgeArticle(t, page) : page.kind === 'knowledge-category' ? knowledge(t, page) : renderers[pageId](t, page)}
  ${footer(t)}
  ${supportPanel(t)}
</body>
</html>`;
  return protectCjk ? protectCjkHtml(document, langKey) : document;
}
