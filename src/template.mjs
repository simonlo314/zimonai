import { languages, pages } from './content.mjs';
import { brandProfile, hasPublishedOfficeEvidence } from './brand-profile.mjs';
import { layoutMode } from './editorial-policy.mjs';
import { paymentContent } from './payment-content.mjs';
import { legalContent } from './legal-content.mjs';
import { knowledgeArticleSpecs, knowledgeContent, knowledgeSpecById } from './knowledge-content.mjs';
import { portalContent } from './portal-content.mjs';

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
    { label: t.common.line, value: brandProfile.contacts.line }
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
  const tierOptions = p.form.tierOptions.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
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
        <div class="portal-identity"><img src="/assets/zimonai-shield-icon-primary.svg" alt="" width="48" height="48"><span><small>${esc(p.workspace.welcome)}</small><strong data-portal-user-name></strong><em data-portal-user-email></em></span></div>
      </header>
      <div class="portal-workspace__body">
        <div class="portal-tabs" role="tablist" aria-label="${esc(p.workspace.title)}">
          <button id="portal-tab-cases" type="button" role="tab" aria-selected="true" aria-controls="portal-panel-cases" data-portal-view="cases"><span>01</span>${esc(p.workspace.cases)}</button>
          <button id="portal-tab-new" type="button" role="tab" aria-selected="false" aria-controls="portal-panel-new" tabindex="-1" data-portal-view="new"><span>02</span>${esc(p.workspace.newCase)}</button>
          <button id="portal-tab-account" type="button" role="tab" aria-selected="false" aria-controls="portal-panel-account" tabindex="-1" data-portal-view="account"><span>03</span>${esc(p.workspace.account)}</button>
        </div>
        <div class="portal-stage">
          <div class="portal-error" data-portal-error hidden role="alert">${esc(p.workspace.loadError)}</div>
          <section class="portal-view" id="portal-panel-cases" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-cases" data-portal-panel="cases">
            <header class="portal-section-head"><div><p class="portal-kicker">${esc(p.workspace.casesTitle)}</p><h2>${esc(p.workspace.casesTitle)}</h2></div><p>${esc(p.workspace.casesLead)}</p></header>
            <div class="portal-cases-state" data-portal-cases-state hidden role="status"></div>
            <div class="portal-case-list" data-portal-case-list aria-live="polite"></div>
            <div class="portal-empty" data-portal-empty hidden>
              <div class="portal-empty__rail" aria-hidden="true"><span></span><span></span><span></span></div>
              <div><div role="status"><p class="portal-kicker">${esc(p.workspace.emptyLabel)}</p><h3>${esc(p.workspace.emptyTitle)}</h3><p>${esc(p.workspace.emptyText)}</p></div><button class="portal-primary" type="button" data-portal-open-new>${esc(p.workspace.emptyAction)}${arrow()}</button></div>
            </div>
          </section>

          <section class="portal-view" id="portal-panel-new" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-new" data-portal-panel="new" hidden>
            <header class="portal-section-head portal-section-head--form"><div><p class="portal-kicker">${esc(p.form.eyebrow)}</p><h2>${esc(p.form.title)}</h2></div><p>${esc(p.form.lead)}</p></header>
            <form class="portal-form" data-portal-case-form novalidate>
              <div class="portal-form__message" data-portal-form-message hidden tabindex="-1" role="alert"></div>
              <fieldset><legend><span>01</span>${esc(p.form.sections[0])}</legend><div class="portal-fields">
                <div class="portal-field portal-field--wide"><label for="portal-supplier-name">${esc(p.form.supplierName)} <b>${esc(p.form.required)}</b></label><input id="portal-supplier-name" name="supplierName" type="text" maxlength="240" required autocomplete="organization" aria-describedby="portal-hint-supplier-name"><small id="portal-hint-supplier-name">${esc(p.form.supplierNameHint)}</small></div>
                <div class="portal-field"><label for="portal-supplier-url">${esc(p.form.supplierUrl)} <b>${esc(p.form.optional)}</b></label><input id="portal-supplier-url" name="supplierUrl" type="url" maxlength="500" inputmode="url" placeholder="https://"></div>
                <div class="portal-field"><label for="portal-legal-name">${esc(p.form.chineseLegalName)} <b>${esc(p.form.optional)}</b></label><input id="portal-legal-name" name="chineseLegalName" type="text" maxlength="240"></div>
                <div class="portal-field portal-field--wide"><label for="portal-tier">${esc(p.form.tier)}</label><select id="portal-tier" name="tier">${tierOptions}</select></div>
              </div></fieldset>
              <fieldset><legend><span>02</span>${esc(p.form.sections[1])}</legend><div class="portal-fields">
                <div class="portal-field"><label for="portal-product-category">${esc(p.form.productCategory)} <b>${esc(p.form.required)}</b></label><input id="portal-product-category" name="productCategory" type="text" maxlength="240" required aria-describedby="portal-hint-product-category"><small id="portal-hint-product-category">${esc(p.form.productCategoryHint)}</small></div>
                <div class="portal-field"><label for="portal-product-model">${esc(p.form.productModel)} <b>${esc(p.form.optional)}</b></label><input id="portal-product-model" name="productModel" type="text" maxlength="300"></div>
              </div></fieldset>
              <fieldset><legend><span>03</span>${esc(p.form.sections[2])}</legend><div class="portal-fields">
                <div class="portal-field portal-field--wide"><label for="portal-decision-context">${esc(p.form.decisionContext)} <b>${esc(p.form.required)}</b></label><textarea id="portal-decision-context" name="decisionContext" maxlength="2000" rows="5" required aria-describedby="portal-hint-decision-context"></textarea><small id="portal-hint-decision-context">${esc(p.form.decisionContextHint)}</small></div>
                <div class="portal-field portal-field--wide"><label for="portal-requested-checks">${esc(p.form.requestedChecks)} <b>${esc(p.form.optional)}</b></label><textarea id="portal-requested-checks" name="requestedChecks" maxlength="3000" rows="5" aria-describedby="portal-hint-requested-checks"></textarea><small id="portal-hint-requested-checks">${esc(p.form.requestedChecksHint)}</small></div>
                <label class="portal-consent portal-field--wide"><input name="consent" type="checkbox" required aria-describedby="portal-consent-text"><span id="portal-consent-text">${esc(p.form.consent)}</span></label>
              </div></fieldset>
              <div class="portal-form__actions"><button class="portal-secondary" type="button" data-portal-view="cases">${esc(p.form.cancel)}</button><button class="portal-primary" type="submit"><span data-submit-label>${esc(p.form.submit)}</span>${arrow()}</button></div>
            </form>
          </section>

          <section class="portal-view" id="portal-panel-account" role="tabpanel" tabindex="0" aria-labelledby="portal-tab-account" data-portal-panel="account" hidden>
            <header class="portal-section-head"><div><p class="portal-kicker">${esc(p.account.eyebrow)}</p><h2>${esc(p.account.title)}</h2></div><p>${esc(p.account.lead)}</p></header>
            <dl class="portal-account">
              <div><dt>${esc(p.account.email)}</dt><dd data-account-email></dd></div>
              <div><dt>${esc(p.account.locale)}</dt><dd data-account-locale></dd></div>
              <div><dt>${esc(p.account.accountId)}</dt><dd data-account-id></dd></div>
            </dl>
            <div class="portal-account__links"><a href="${pathFor(t.__key, 'privacy')}">${esc(p.account.privacy)}${arrow()}</a><a href="mailto:${esc(brandProfile.email)}?subject=${encodeURIComponent(p.account.supportSubject)}">${esc(p.account.support)}${arrow()}</a></div>
            <div class="portal-account__actions"><button class="portal-secondary portal-account__logout" type="button" data-portal-logout>${esc(p.workspace.logout)}</button></div>
          </section>
        </div>
      </div>
    </section>
    <script type="application/json" id="portal-copy">${jsonForHtml(p)}</script>
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
          <p class="hero__boundary"><span aria-hidden="true">—</span>${esc(t.home.distinction)}</p>
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

function services(t) {
  const consultationProduct = paymentProduct(t, 'consultation');
  const balanceProduct = paymentProduct(t, 'balance');
  const panels = t.services.catalog.map((service, index) => `<article class="service-tier-panel${index === 0 ? ' is-active' : ''}" id="${service.id}" data-service-panel="${service.id}" role="tabpanel" aria-labelledby="select-${service.id}" ${index === 0 ? '' : 'hidden'}>
    <header class="service-tier-panel__header">
      <div><p class="kicker">${esc(service.label)} · ${esc(service.englishTitle)}</p><h2>${esc(service.title)}</h2><p>${esc(service.summary)}</p></div>
      <aside class="service-tier-panel__commercial"><dl><div><dt>${esc(t.services.labels.price)}</dt><dd>${esc(service.price)}</dd></div><div><dt>${esc(t.services.labels.timing)}</dt><dd>${esc(service.timing)}</dd></div><div><dt>${esc(t.services.labels.mode)}</dt><dd>${esc(service.mode)}</dd></div></dl>${service.purchasable ? `${serviceCheckoutProtocol(t)}${checkoutForm(t, paymentProduct(t, service.id), 'checkout-form--inline')}` : ''}</aside>
    </header>
    ${service.id === 't1' ? sampleReport(t) : ''}
    ${service.upgrade ? `<p class="service-tier-panel__upgrade"><span>+</span>${esc(service.upgrade)}</p>` : ''}
    <div class="service-tier-panel__work">${service.groups.map((group) => `<section><h3>${esc(group.title)}</h3><ul>${group.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section>`).join('')}</div>
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

function about(t) {
  const registration = brandProfile.registration;
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
      <p class="registration-evidence__disclosure"><span aria-hidden="true">!</span>${esc(t.about.registration.disclosure)}</p>
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
    <p class="office-evidence__disclosure reveal"><span aria-hidden="true">—</span>${esc(t.about.office.disclosure)}</p>
  </section>` : '';
  return `<main id="main">${pageHeader(t.about.kicker, t.about.title, t.about.lead, true)}
    <section class="about-grid shell">
      <article class="about-lead reveal"><span class="file-label">01 · ${esc(t.ui.origin)}</span><h2>${esc(t.about.originTitle)}</h2><p>${esc(t.about.originText)}</p></article>
      <article class="about-block reveal"><span class="file-label">02 · ${esc(t.ui.model)}</span><h2>${esc(t.about.modelTitle)}</h2><p>${esc(t.about.modelText)}</p></article>
      <article class="about-block reveal"><span class="file-label">03 · ${esc(t.ui.footprint)}</span><h2>${esc(t.about.footprintTitle)}</h2><p>${esc(t.about.footprintText)}</p></article>
      <article class="about-block about-block--truth reveal"><span class="file-label">04 · ${esc(t.ui.scale)}</span><h2>${esc(t.about.scaleTitle)}</h2><p>${esc(t.about.scaleText)}</p></article>
    </section>
    <section class="business-record shell reveal"><div><p class="kicker">${esc(t.ui.operatingRecord)}</p><h2>${esc(t.about.record.title)}</h2></div><dl>${t.about.record.items.map(([term, description]) => `<div><dt>${esc(term)}</dt><dd>${esc(description)}</dd></div>`).join('')}</dl></section>
    ${registrationEvidence}
    ${officeEvidence}
    <section class="principles shell">${t.about.principles.map(([title, text], index) => `<article class="principle reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</section>
    ${cta(t, t.about.ctaTitle, t.about.ctaText)}</main>`;
}

function request(t) {
  const f = t.request.fields;
  const p = t.request.placeholders;
  const field = (id, label, placeholder, type = 'text', required = false) => `<label class="form-field"><span>${esc(label)}${required ? ` <small>${esc(f.required)}</small>` : ''}</span><input id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''}></label>`;
  return `<main id="main">${pageHeader(t.request.kicker, t.request.title, t.request.lead, { media: { id: 'power-bank', src: '/assets/editorial-power-bank.jpg', alt: t.request.visualAlt } })}
    <section class="request-layout shell">
      <form class="request-form reveal" data-mail-form data-mail-subject="${esc(t.__key === 'en' ? 'Supplier verification request' : t.__key === 'zh-tw' ? '供應商查核需求' : '供应商核查需求')}" novalidate>
        <div class="form-honesty"><span aria-hidden="true">↗</span><p>${esc(t.request.honest)}</p></div>
        <div class="form-grid">${field('name', f.name, p.name, 'text', true)}${field('email', f.email, p.email, 'email', true)}${field('company', f.company, p.company)}${field('supplier', f.supplier, p.supplier, 'text', true)}${field('url', f.url, p.url, 'url')}${field('chinese', f.chinese, p.chinese)}${field('product', f.product, p.product, 'text', true)}<label class="form-field form-field--wide"><span>${esc(f.question)} <small>${esc(f.required)}</small></span><textarea id="question" name="question" placeholder="${esc(p.question)}" rows="6" required></textarea></label></div>
        <label class="consent"><input type="checkbox" name="consent" required><span>${esc(f.consent)}</span></label>
        <button class="button button--ink magnetic" type="submit">${esc(f.send)}${arrow()}</button>
        <p class="form-note">${esc(t.request.after)}</p><p class="form-error" data-form-error role="alert"></p>
      </form>
      <aside class="request-aside reveal">
        <div><p class="kicker">${esc(t.request.directTitle)}</p><h2>${esc(t.request.directTitle)}</h2><p>${esc(t.request.directText)}</p>${requestContactList(t)}</div>
        <div><p class="kicker">${esc(t.request.responseTitle)}</p><ol>${t.request.responseSteps.map((item, index) => `<li><span>0${index + 1}</span>${esc(item)}</li>`).join('')}</ol></div>
      </aside>
    </section>
  </main>`;
}

function checkoutForm(t, product, modifier = '') {
  const labels = t.payment.payments.labels;
  const termsHref = pathFor(t.__key, 'paymentTerms');
  const quantity = product.quantity ? `<label class="checkout-field"><span>${esc(labels.quantity)} <small>${esc(labels.required)}</small></span><input type="number" name="quantity" min="1" max="100" step="1" value="1" inputmode="numeric" required></label>` : '';
  const reference = product.reference ? `<label class="checkout-field"><span>${esc(labels.reference)} <small>${esc(labels.required)}</small></span><input type="text" name="reference" maxlength="120" autocomplete="off" required></label>` : '';
  return `<form class="checkout-form${modifier ? ` ${modifier}` : ''}" data-checkout-form data-product="${esc(product.key)}" novalidate>
    ${quantity}${reference}
    <label class="consent checkout-consent"><input type="checkbox" name="terms" required><span>${esc(labels.terms)} <a href="${termsHref}" target="_blank" rel="noopener">${esc(labels.termsLink)}</a></span></label>
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
        <nav class="legal-toc" aria-label="${esc(ui.contents)}"><strong>${esc(ui.contents)}</strong><ol>${copy.sections.map((section, index) => `<li><a href="#${esc(idPrefix)}-${String(index + 1).padStart(2, '0')}"><span>${String(index + 1).padStart(2, '0')}</span>${esc(section.title)}</a></li>`).join('')}</ol></nav>
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

function knowledgeCard(t, spec, article, featured = false) {
  return `<article class="knowledge-card${featured ? ' knowledge-card--featured' : ''} reveal">
    <a class="knowledge-card__media" href="${pathFor(t.__key, spec.id)}" aria-label="${esc(article.title)}">
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

function knowledge(t) {
  const copy = t.knowledge;
  const records = knowledgeArticleSpecs.map((spec) => ({ spec, article: copy.articles[spec.key] }));
  const [featured, ...rest] = records;
  return `<main id="main">
    <section class="knowledge-hero" aria-labelledby="knowledge-title">
      <div class="shell knowledge-hero__grid">
        <div class="knowledge-hero__copy">
          <p class="kicker">${esc(copy.hub.kicker)}</p>
          <h1 id="knowledge-title">${esc(copy.hub.title)}</h1>
          <p>${esc(copy.hub.lead)}</p>
        </div>
        <div class="knowledge-hero__folio" aria-hidden="true"><span>FIELD NOTES</span><strong>01—05</strong><img src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="512" height="512"></div>
      </div>
    </section>
    <section class="knowledge-index shell" aria-labelledby="knowledge-featured-title">
      <header class="knowledge-index__heading reveal"><p class="kicker">${esc(copy.hub.featured)}</p><h2 id="knowledge-featured-title">${esc(featured.article.topic)}</h2></header>
      ${knowledgeCard(t, featured.spec, featured.article, true)}
      <header class="knowledge-index__heading knowledge-index__heading--latest reveal"><p class="kicker">${esc(copy.hub.latest)}</p><span>02—05</span></header>
      <div class="knowledge-grid">${rest.map(({ spec, article }) => knowledgeCard(t, spec, article)).join('')}</div>
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
  const related = knowledgeArticleSpecs.filter((item) => item.id !== spec.id).slice(0, 3);
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
          <figure class="field-note__image">
            <img src="${esc(spec.image)}" alt="${esc(article.imageAlt)}" width="${spec.imageWidth}" height="${spec.imageHeight}" loading="eager" fetchpriority="high">
            <figcaption><span>${esc(article.imageCaption)}</span><a href="${esc(spec.photo.page)}" target="_blank" rel="noopener noreferrer">${esc(copy.ui.photo)} · ${esc(spec.photo.photographer)}</a></figcaption>
          </figure>
        </div>
      </header>
      <div class="shell field-note__layout">
        <aside class="field-note__rail">
          <p class="kicker">${esc(copy.ui.quickAnswer)}</p>
          <ol>${article.sections.map((section, index) => `<li><a href="#section-${index + 1}"><span>0${index + 1}</span>${esc(section.title)}</a></li>`).join('')}</ol>
        </aside>
        <div class="field-note__body">
          <section class="answer-first reveal" aria-labelledby="answer-title"><p class="kicker" id="answer-title">${esc(copy.ui.quickAnswer)}</p><p>${esc(article.answer)}</p></section>
          <ul class="field-note__takeaways">${article.takeaways.map((item, index) => `<li class="reveal"><span>${String(index + 1).padStart(2, '0')}</span><p>${esc(item)}</p></li>`).join('')}</ul>
          ${article.sections.map((section, index) => `<section class="field-note__section reveal" id="section-${index + 1}"><span class="field-note__section-no">${String(index + 1).padStart(2, '0')}</span><h2>${esc(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}${section.items ? `<ul>${section.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
          <section class="buyer-checklist reveal"><p class="kicker">${esc(copy.ui.buyerChecklist)}</p><h2>${esc(copy.ui.buyerChecklist)}</h2><ul>${article.checklist.map((item) => `<li><span aria-hidden="true">✓</span>${esc(item)}</li>`).join('')}</ul></section>
          <aside class="evidence-limit reveal"><span>!</span><div><p class="kicker">${esc(copy.ui.limits)}</p><h2>${esc(copy.ui.limits)}</h2><p>${esc(article.limitsText)}</p></div></aside>
        </div>
      </div>
      <section class="field-note__sources">
        <div class="shell field-note__sources-grid">
          <header><p class="kicker">${esc(copy.ui.sources)}</p><h2>${esc(copy.ui.sources)}</h2><p>${esc(copy.ui.sourcesLead)}</p></header>
          <ol>${spec.sources.map((source, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${esc(source.publisher)}</strong><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}${arrow()}</a></div></li>`).join('')}</ol>
        </div>
      </section>
      <section class="field-note__related shell"><header><p class="kicker">${esc(copy.ui.related)}</p><h2>${esc(copy.ui.related)}</h2></header><div>${related.map((relatedSpec) => { const relatedArticle = copy.articles[relatedSpec.key]; return `<a href="${pathFor(t.__key, relatedSpec.id)}"><span>${esc(relatedArticle.topic)}</span><strong>${esc(relatedArticle.title)}</strong>${arrow()}</a>`; }).join('')}</div></section>
    </article>
    ${cta(t, t.home.finalTitle, t.home.finalText)}
  </main>`;
}

const renderers = { home, services, methodology, scope, about, portal, request, payments, paymentSuccess, paymentTerms, privacy, knowledge };

function header(t, pageId) {
  const nav = [['services', t.nav.servicesBooking], ['knowledge', t.nav.knowledge], ['methodology', t.nav.methodology], ['scope', t.nav.scope], ['about', t.nav.about]];
  const isHome = pageId === 'home';
  return `<a class="skip-link" href="#main">${esc(t.common.skip)}</a><header class="site-header${isHome ? ' site-header--home' : ''}" data-header>
    <div class="site-header__inner">
      <a class="brand" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo" src="${isHome ? '/assets/zimonai-logo-white.svg' : '/assets/zimonai-logo-primary.svg'}" alt="ZimonAI" width="1600" height="360"><em class="brand__descriptor">${esc(t.common.brandDescriptor)}</em></a>
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
  return `<footer class="site-footer"><div class="shell site-footer__top"><div><a class="brand brand--footer" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo brand__logo--inverse" src="/assets/zimonai-logo-white.svg" alt="ZimonAI" width="1600" height="360"></a><p>${esc(t.common.footerLine)}</p><div class="footer-identity"><strong>深圳智蒙湾科技有限公司 · ZimonAI Technology Co., Ltd.</strong><span>${esc(t.common.footerCategory)}</span><span>${esc(t.common.creditCodeLabel)} ${esc(brandProfile.registration.creditCode)}</span><address class="footer-addresses"><span><b>${esc(t.common.chineseAddressLabel)}</b><i lang="zh-Hans">${esc(brandProfile.registration.registeredAddressZhHans)}</i></span><span><b>${esc(t.common.englishAddressLabel)}</b><i lang="en">${esc(brandProfile.registration.registeredAddressEn)}</i></span></address></div></div>${footerContactList(t)}</div><div class="shell site-footer__bottom"><p>© 2026 ZimonAI 智蒙灣</p><p>${esc(t.common.footerScope)}</p><div class="footer-legal"><a href="${pathFor(t.__key, 'services')}">${esc(t.nav.servicesBooking)}</a><a href="${pathFor(t.__key, 'knowledge')}">${esc(t.nav.knowledge)}</a><a href="${pathFor(t.__key, 'paymentTerms')}">${esc(t.payment.payments.labels.termsLink)}</a><a href="${pathFor(t.__key, 'privacy')}">${esc(t.common.privacy)}</a></div></div></footer><div class="cursor-label" data-cursor-label aria-hidden="true"></div>`;
}

function supportPanel(t) {
  const copy = t.payment.support;
  return `<button class="support-launch" type="button" aria-expanded="false" aria-controls="support-panel" data-support-open><span aria-hidden="true">?</span><strong>${esc(copy.open)}</strong></button><div class="support-backdrop" data-support-backdrop hidden></div><aside class="support-panel" id="support-panel" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="support-title" tabindex="-1" inert data-support-panel><header><div><p class="kicker">ZimonAI</p><h2 id="support-title">${esc(copy.title)}</h2></div><button type="button" aria-label="${esc(copy.close)}" data-support-close>×</button></header><p>${esc(copy.intro)}</p><div class="support-contacts">${approvedContacts(t).map((item) => `<div><span>${esc(item.label)}</span>${item.href ? `<a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(item.value)}${arrow()}</a>` : `<strong>${esc(item.value)}</strong><button type="button" aria-live="polite" data-copy-contact="${esc(item.value)}" data-copy-label="${esc(copy.copy)}" data-copied-label="${esc(copy.copied)}" data-copy-error-label="${esc(copy.copyFailed)}">${esc(copy.copy)}</button>`}</div>`).join('')}</div><a class="button button--ink" href="mailto:${esc(brandProfile.email)}?subject=${encodeURIComponent(t.__key === 'en' ? 'ZimonAI service or payment support' : t.__key === 'zh-tw' ? 'ZimonAI 服務或付款協助' : 'ZimonAI 服务或付款协助')}">${esc(copy.emailAction)}${arrow()}</a><p class="support-panel__note">${esc(copy.paymentHelp)}</p></aside>`;
}

export function renderPage(langKey, pageId) {
  const original = languages[langKey];
  const page = pageMap[pageId];
  const knowledgeCopy = knowledgeContent[langKey];
  const t = { ...original, payment: paymentContent[langKey], knowledge: knowledgeCopy, portal: portalContent[langKey], __key: langKey };
  const articleSpec = page.kind === 'article' ? knowledgeSpecById(pageId) : null;
  const articleCopy = articleSpec ? knowledgeCopy.articles[articleSpec.key] : null;
  const baseMeta = original.meta.titles[pageId] ? original.meta : paymentContent[langKey].meta;
  const metaTitle = pageId === 'portal' ? t.portal.metaTitle : pageId === 'knowledge' ? knowledgeCopy.hub.metaTitle : articleCopy ? `${articleCopy.title} | ZimonAI` : baseMeta.titles[pageId];
  const metaDescription = pageId === 'portal' ? t.portal.metaDescription : pageId === 'knowledge' ? knowledgeCopy.hub.metaDescription : articleCopy ? articleCopy.description : baseMeta.descriptions[pageId];
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
      url: 'https://zimonai.com/apple-touch-icon.png',
      width: 180,
      height: 180
    },
    email: brandProfile.email,
    telephone: brandProfile.contacts.chinaPhone.display,
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
  if (pageId === 'knowledge') webpage['@type'] = 'CollectionPage';
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
  } else if (pageId === 'knowledge') {
    const itemListId = `${canonical}#articles`;
    webpage.mainEntity = { '@id': itemListId };
    graph.push({
      '@type': 'ItemList',
      '@id': itemListId,
      numberOfItems: knowledgeArticleSpecs.length,
      itemListElement: knowledgeArticleSpecs.map((spec, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://zimonai.com${pathFor(langKey, spec.id)}`,
        name: knowledgeCopy.articles[spec.key].title
      }))
    });
  } else if (articleSpec) {
    const articleId = `${canonical}#article`;
    webpage.mainEntity = { '@id': articleId };
    graph.push({
      '@type': 'Article',
      '@id': articleId,
      headline: articleCopy.title,
      description: articleCopy.description,
      image: `https://zimonai.com${articleSpec.image}`,
      datePublished: articleSpec.datePublished,
      dateModified: articleSpec.dateModified,
      articleSection: articleCopy.topic,
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
  return `<!doctype html>
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
  <link rel="icon" href="/zimonai-favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="stylesheet" href="/assets/site.css">
  ${pageId === 'portal' ? '<link rel="stylesheet" href="/assets/portal.css">' : ''}
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
  <script type="module" src="/assets/site.js"></script>
  ${pageId === 'portal' ? '<script type="module" src="/assets/portal.js"></script>' : ''}
</head>
<body${pageId === 'portal' ? ' class="page-portal"' : ''}>
  ${header(t, pageId)}
  ${page.kind === 'article' ? knowledgeArticle(t, page) : renderers[pageId](t)}
  ${footer(t)}
  ${supportPanel(t)}
</body>
</html>`;
}
