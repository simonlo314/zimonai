import { languages, pages } from './content.mjs';
import { brandProfile, hasPublishedOfficeEvidence } from './brand-profile.mjs';
import { layoutMode } from './editorial-policy.mjs';

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

function statusLabel(t, status) {
  return status === 'verified' ? t.common.verified : status === 'unresolved' ? t.common.unresolved : t.common.discrepancy;
}

function statusMark(t, status, extra = '') {
  return `<span class="status status--${status} ${extra}" data-status="${status}"><span class="status__dot" aria-hidden="true"></span>${esc(statusLabel(t, status))}</span>`;
}

function arrow() {
  return '<svg class="icon-arrow" aria-hidden="true" viewBox="0 0 20 20"><path d="M3 10h13M11 5l5 5-5 5"/></svg>';
}

function approvedContacts(t) {
  return [
    { label: t.common.email, value: brandProfile.email, href: `mailto:${brandProfile.email}` },
    { label: t.common.chinaPhone, value: brandProfile.contacts.chinaPhone.display, href: `tel:${brandProfile.contacts.chinaPhone.href}` },
    { label: t.common.taiwanPhone, value: brandProfile.contacts.taiwanPhone.display, href: `tel:${brandProfile.contacts.taiwanPhone.href}` },
    { label: t.common.wechat, value: brandProfile.contacts.wechat },
    { label: t.common.line, value: brandProfile.contacts.line }
  ];
}

function requestContactList(t) {
  return `<div class="contact-list">${approvedContacts(t).map((item) => `<div class="contact-line"><span>${esc(item.label)}</span>${item.href ? `<a href="${esc(item.href)}"><strong>${esc(item.value)}</strong>${arrow()}</a>` : `<strong>${esc(item.value)}</strong>`}</div>`).join('')}</div>`;
}

function footerContactList(t) {
  return `<dl class="footer-contact">${approvedContacts(t).map((item) => `<div><dt>${esc(item.label)}</dt><dd>${item.href ? `<a href="${esc(item.href)}">${esc(item.value)}</a>` : esc(item.value)}</dd></div>`).join('')}</dl>`;
}

function pageHeader(kicker, title, lead, brandMark = false) {
  return `<header class="page-hero shell${brandMark ? ' page-hero--brand' : ''}">
    <div class="page-hero__copy">
      <p class="kicker reveal">${esc(kicker)}</p>
      <h1 class="page-title reveal">${esc(title)}</h1>
      <p class="page-lead reveal">${esc(lead)}</p>
    </div>
    ${brandMark ? '<div class="page-hero__brand-mark" aria-hidden="true"><img src="/assets/zimonai-circular-mark-primary.svg" alt="" width="800" height="800"></div>' : ''}
  </header>`;
}

function cta(t, title, text) {
  return `<section class="closing shell reveal">
    <div class="closing__index" aria-hidden="true">→</div>
    <div><p class="kicker">${esc(t.common.eyebrow)}</p><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <a class="button button--ink magnetic" data-cursor="${esc(t.common.contact)}" href="${pathFor(t.__key, 'request')}">${esc(t.common.contact)}${arrow()}</a>
  </section>`;
}

function home(t) {
  const demoPanels = t.home.demoTabs.map((item, index) => `<article class="demo-panel${index === 0 ? ' is-active' : ''}" id="demo-${item.id}" data-demo-panel="${item.id}" ${index === 0 ? '' : 'hidden'}>
    <div class="evidence-grid">
      <div><span>${esc(t.common.source)}</span><strong>${esc(item.source)}</strong></div>
      <div><span>${esc(t.common.claim)}</span><strong>${esc(item.claim)}</strong></div>
      <div><span>${esc(t.common.record)}</span><strong>${esc(item.record)}</strong></div>
      <div><span>${esc(t.common.result)}</span>${statusMark(t, item.result)}</div>
    </div>
    <p class="demo-panel__note">${esc(item.note)}</p>
  </article>`).join('');

  return `<main id="main">
    <section class="hero-cinema" aria-labelledby="hero-title" data-hero-cinema>
      <div class="hero-cinema__scene" aria-hidden="true">
        <div class="hero-cinema__grid"></div>
        <div class="hero-cinema__beam"></div>
        <div class="hero-cinema__glow hero-cinema__glow--one"></div>
        <div class="hero-cinema__glow hero-cinema__glow--two"></div>
        <img class="hero-cinema__shield" src="/assets/zimonai-shield-icon-mono-white.svg" alt="" width="512" height="512">
        <div class="hero-cinema__sheet hero-cinema__sheet--registry"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="hero-cinema__sheet hero-cinema__sheet--certificate"><i></i><i></i><i></i><i></i></div>
        <svg class="hero-cinema__trace" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <path d="M-80 735 C300 610 420 760 680 555 S1110 210 1680 290"></path>
          <path d="M110 120 C370 260 560 125 800 305 S1220 680 1640 600"></path>
          <circle cx="680" cy="555" r="6"></circle>
          <circle cx="800" cy="305" r="5"></circle>
        </svg>
        <div class="hero-cinema__scan"></div>
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
      <div class="dossier" data-hero-dossier>
        <div class="dossier__top">
          <span class="demo-label">${esc(t.common.demo)}</span>
          <span class="dossier__reference"><img src="/assets/zimonai-shield-icon-primary.svg" alt="" width="512" height="512" aria-hidden="true"><span class="mono">REF · ZM-DEMO-001</span></span>
        </div>
        <div class="dossier__identity">
          <span>${esc(t.ui.supplierProfile)}</span>
          <strong>${esc(t.home.dossier.company)}</strong>
        </div>
        <dl class="dossier__claims">
          <div><dt>${esc(t.ui.claimedSince)}</dt><dd>${esc(t.home.dossier.since)}</dd></div>
          <div><dt>${esc(t.ui.certification)}</dt><dd>${esc(t.home.dossier.certificate)}</dd></div>
          <div><dt>${esc(t.ui.factory)}</dt><dd>${esc(t.home.dossier.factory)}</dd></div>
        </dl>
        <div class="dossier__checks" aria-live="polite">
          ${t.home.checks.map(([label, value, state], index) => `<div class="check-row" data-check-row data-final-state="${state}">
            <span class="check-row__step">0${index + 1}</span>
            <span class="check-row__label">${esc(label)}</span>
            <span class="check-row__value" data-pending="${esc(t.common.pending)}" data-final="${esc(value)}">${esc(t.common.pending)}</span>
            <span class="check-row__mark" aria-hidden="true"></span>
          </div>`).join('')}
        </div>
        <div class="dossier__progress"><span data-demo-progress></span></div>
        <button class="scan-button" type="button" data-run-demo data-run="${esc(t.home.dossier.run)}" data-running="${esc(t.home.dossier.running)}" data-reset="${esc(t.home.dossier.reset)}">
          <span class="scan-button__beam" aria-hidden="true"></span><span data-run-label>${esc(t.home.dossier.run)}</span>
        </button>
        <p class="dossier__announcement" data-demo-announcement>${esc(t.home.dossier.running)}</p>
      </div>
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

    <section class="investigation" data-investigation>
      <div class="shell investigation__intro reveal">
        <p class="kicker">${esc(t.home.story.label)}</p>
        <h2>${esc(t.home.story.title)}</h2>
        <p>${esc(t.home.story.intro)}</p>
      </div>
      <div class="shell investigation__layout">
        <div class="investigation__stage" aria-live="polite">
          <div class="stage-file" data-stage-file>
            <div class="stage-file__head"><span>${esc(t.ui.evidencePath)}</span><span data-stage-counter>01 / 04</span></div>
            <div class="stage-file__body">
              <span class="stage-file__tag" data-stage-tag>${esc(t.common.claim)}</span>
              <h3 data-stage-title>${esc(t.home.story.steps[0].title)}</h3>
              <div class="stage-file__record">
                <span class="mono">LUMEN HARBOR · DEMO</span>
                <div class="stage-file__line"></div><div class="stage-file__line stage-file__line--short"></div>
              </div>
              <div class="stage-file__results">
                ${statusMark(t, 'verified')} ${statusMark(t, 'unresolved')} ${statusMark(t, 'discrepancy')}
              </div>
            </div>
          </div>
        </div>
        <ol class="investigation__steps">
          ${t.home.story.steps.map((step, index) => `<li class="story-step${index === 0 ? ' is-active' : ''}" data-story-step data-stage="${step.stage}" data-index="${index}">
            <span class="story-step__no">${step.no}</span><div><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p></div>
          </li>`).join('')}
        </ol>
      </div>
    </section>

    <section class="comparison shell reveal" aria-labelledby="compare-title">
      <div class="section-heading">
        <p class="kicker">${esc(t.home.compare.label)}</p><h2 id="compare-title">${esc(t.home.compare.title)}</h2><p>${esc(t.home.compare.hint)}</p>
      </div>
      <div class="comparison__frame" data-comparison>
        <div class="comparison__claim">
          <span class="file-label">${esc(t.home.compare.leftTitle)}</span>
          <strong>LUMEN HARBOR DEVICES</strong>
          <ul>${t.home.compare.left.map((row) => `<li>${esc(row)}</li>`).join('')}</ul>
        </div>
        <div class="comparison__record" data-comparison-record>
          <span class="file-label">${esc(t.home.compare.rightTitle)}</span>
          <strong>${esc(t.ui.registryRecord)}</strong>
          <ul>${t.home.compare.right.map((row) => `<li>${esc(row)}</li>`).join('')}</ul>
        </div>
        <div class="comparison__seam" data-comparison-seam aria-hidden="true"><span>${esc(t.ui.compare)}</span></div>
        <input class="comparison__range" type="range" min="8" max="92" value="50" aria-label="${esc(t.home.compare.hint)}" data-comparison-range>
      </div>
      <div class="comparison__result">${statusMark(t, 'discrepancy')}<p>${esc(t.home.compare.conclusion)}</p></div>
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
      <a class="text-link reveal" href="${pathFor(t.__key, 'services')}">${esc(t.nav.services)}${arrow()}</a>
    </section>

    <section class="source-index shell" aria-labelledby="source-index-title">
      <div class="section-heading section-heading--dense reveal"><p class="kicker">${esc(t.home.sources.label)}</p><h2 id="source-index-title">${esc(t.home.sources.title)}</h2><p>${esc(t.home.sources.lead)}</p></div>
      <div class="source-index__rows">${t.home.sources.items.map(([title, text], index) => `<article class="source-row reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div>
    </section>

    <section class="interactive-demo shell" aria-labelledby="demo-title">
      <div class="interactive-demo__intro reveal"><span class="demo-label">${esc(t.common.demo)}</span><h2 id="demo-title">${esc(t.home.demoTitle)}</h2><p>${esc(t.home.demoLead)}</p></div>
      <div class="interactive-demo__tabs reveal" role="tablist" aria-label="${esc(t.home.demoTitle)}">
        ${t.home.demoTabs.map((item, index) => `<button role="tab" aria-selected="${index === 0}" aria-controls="demo-${item.id}" id="tab-${item.id}" class="evidence-tab${index === 0 ? ' is-active' : ''}" data-demo-tab="${item.id}" data-cursor="${esc(t.ui.openEvidence)}">${esc(item.label)}<span>0${index + 1}</span></button>`).join('')}
      </div>
      <div class="interactive-demo__panels reveal">${demoPanels}</div>
    </section>

    <section class="limits-band">
      <div class="shell limits-band__inner reveal"><div class="limits-band__mark">?</div><div><h2>${esc(t.home.limitsTitle)}</h2><p>${esc(t.home.limitsText)}</p><a class="text-link" href="${pathFor(t.__key, 'scope')}">${esc(t.nav.scope)}${arrow()}</a></div></div>
    </section>
    ${cta(t, t.home.finalTitle, t.home.finalText)}
  </main>`;
}

function services(t) {
  const panels = t.services.catalog.map((service, index) => `<article class="service-tier-panel${index === 0 ? ' is-active' : ''}" id="${service.id}" data-service-panel="${service.id}" role="tabpanel" aria-labelledby="select-${service.id}" ${index === 0 ? '' : 'hidden'}>
    <header class="service-tier-panel__header">
      <div><p class="kicker">${esc(service.label)} · ${esc(service.englishTitle)}</p><h2>${esc(service.title)}</h2><p>${esc(service.summary)}</p></div>
      <dl><div><dt>${esc(t.services.labels.price)}</dt><dd>${esc(service.price)}</dd></div><div><dt>${esc(t.services.labels.timing)}</dt><dd>${esc(service.timing)}</dd></div><div><dt>${esc(t.services.labels.mode)}</dt><dd>${esc(service.mode)}</dd></div></dl>
    </header>
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
      <div class="service-staircase__intro reveal"><p class="kicker">${esc(t.services.staircase.label)}</p><h2>${esc(t.services.staircase.title)}</h2><p>${esc(t.services.staircase.lead)}</p></div>
      <div class="service-staircase__selectors" role="tablist" aria-label="${esc(t.services.staircase.title)}">${t.services.catalog.map((service, index) => `<button id="select-${service.id}" type="button" role="tab" aria-controls="${service.id}" aria-selected="${index === 0}" class="service-tier-select${index === 0 ? ' is-active' : ''}" data-service-select="${service.id}"><span>${esc(service.label)}</span><strong>${esc(service.title)}</strong><small>${esc(service.price)}</small></button>`).join('')}</div>
      <div class="service-staircase__panels">${panels}</div>
    </section>
    <section class="report-promises" aria-labelledby="report-promises-title"><div class="shell"><header class="report-promises__header reveal"><p class="kicker">${esc(t.services.promises.label)}</p><h2 id="report-promises-title">${esc(t.services.promises.title)}</h2><p>${esc(t.services.promises.lead)}</p></header><div class="report-promises__grid">${t.services.promises.items.map(([title, text], index) => `<article class="report-promise reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section>
    ${cta(t, t.services.ctaTitle, t.services.ctaText)}</main>`;
}

function methodology(t) {
  const detail = t.methodology.nodes[0];
  return `<main id="main">${pageHeader(t.methodology.kicker, t.methodology.title, t.methodology.lead)}
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
  return `<main id="main">${pageHeader(t.scope.kicker, t.scope.title, t.scope.lead)}
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
  return `<main id="main">${pageHeader(t.request.kicker, t.request.title, t.request.lead)}
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

function privacy(t) {
  return `<main id="main">${pageHeader(t.privacy.kicker, t.privacy.title, t.privacy.lead)}<section class="legal shell">${t.privacy.sections.map(([title, text], index) => `<article class="legal-row reveal"><span>0${index + 1}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></article>`).join('')}</section></main>`;
}

const renderers = { home, services, methodology, scope, about, request, privacy };

function header(t, pageId) {
  const nav = [['services', t.nav.services], ['methodology', t.nav.methodology], ['scope', t.nav.scope], ['about', t.nav.about]];
  const isHome = pageId === 'home';
  return `<a class="skip-link" href="#main">${esc(t.common.skip)}</a><header class="site-header${isHome ? ' site-header--home' : ''}" data-header>
    <div class="site-header__inner">
      <a class="brand" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo" src="${isHome ? '/assets/zimonai-logo-white.svg' : '/assets/zimonai-logo-primary.svg'}" alt="ZimonAI" width="1600" height="360"><em class="brand__descriptor">${esc(t.common.brandDescriptor)}</em></a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-nav-toggle><span>${esc(t.nav.menu)}</span><i></i><i></i></button>
      <nav class="site-nav" id="main-nav" data-nav>
        ${nav.map(([id, label]) => `<a href="${pathFor(t.__key, id)}" ${pageId === id ? `aria-current="page"` : ''}>${esc(label)}</a>`).join('')}
        <div class="lang-switch" data-lang-switch><button type="button" aria-expanded="false" data-lang-button>${esc(t.short)}<span aria-hidden="true">⌄</span></button><div class="lang-switch__menu">${Object.entries(languages).map(([key, lang]) => `<a lang="${lang.htmlLang}" href="${pathFor(key, pageId)}" ${key === t.__key ? 'aria-current="true"' : ''}>${esc(lang.name)}</a>`).join('')}</div></div>
        <a class="nav-cta" href="${pathFor(t.__key, 'request')}">${esc(t.nav.request)}${arrow()}</a>
      </nav>
    </div>
  </header>`;
}

function footer(t) {
  return `<footer class="site-footer"><div class="shell site-footer__top"><div><a class="brand brand--footer" href="${pathFor(t.__key, 'home')}" aria-label="ZimonAI"><img class="brand__logo brand__logo--inverse" src="/assets/zimonai-logo-white.svg" alt="ZimonAI" width="1600" height="360"></a><p>${esc(t.common.footerLine)}</p><div class="footer-identity"><strong>深圳智蒙湾科技有限公司 · ZimonAI Technology Co., Ltd.</strong><span>${esc(t.common.footerCategory)}</span><span>${esc(t.common.creditCodeLabel)} ${esc(brandProfile.registration.creditCode)}</span></div></div>${footerContactList(t)}</div><div class="shell site-footer__bottom"><p>© 2026 ZimonAI 智蒙灣</p><p>${esc(t.common.footerScope)}</p><a href="${pathFor(t.__key, 'privacy')}">${esc(t.common.privacy)}</a></div></footer><div class="cursor-label" data-cursor-label aria-hidden="true"></div>`;
}

export function renderPage(langKey, pageId) {
  const original = languages[langKey];
  const t = { ...original, __key: langKey };
  const canonical = `https://zimonai.com${pathFor(langKey, pageId)}`;
  const alternates = Object.entries(languages).map(([key, lang]) => `<link rel="alternate" hreflang="${lang.htmlLang}" href="https://zimonai.com${pathFor(key, pageId)}">`).join('\n');
  const schema = {
    '@context': 'https://schema.org',
    '@type': pageId === 'home' ? 'ProfessionalService' : 'WebPage',
    name: pageId === 'home' ? 'ZimonAI 智蒙灣' : t.meta.titles[pageId],
    url: canonical,
    email: pageId === 'home' ? brandProfile.email : undefined,
    telephone: pageId === 'home' ? brandProfile.contacts.chinaPhone.display : undefined,
    contactPoint: pageId === 'home' ? [brandProfile.contacts.chinaPhone, brandProfile.contacts.taiwanPhone].map((phone) => ({ '@type': 'ContactPoint', telephone: phone.display, contactType: 'customer service' })) : undefined,
    description: t.meta.descriptions[pageId],
    areaServed: pageId === 'home' ? brandProfile.operatingBases : undefined
  };
  Object.keys(schema).forEach((key) => schema[key] === undefined && delete schema[key]);
  return `<!doctype html>
<html lang="${original.htmlLang}" data-page="${pageId}" data-layout="${layoutMode(langKey)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.meta.titles[pageId])}</title>
  <meta name="description" content="${esc(t.meta.descriptions[pageId])}">
  <meta name="keywords" content="charger supplier verification, power bank factory audit, GaN charger sourcing, FCC ID verification, UL certificate check, Shenzhen charger manufacturer, power adapter supplier due diligence">
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="https://zimonai.com${pathFor('en', pageId)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ZimonAI 智蒙灣">
  <meta property="og:title" content="${esc(t.meta.titles[pageId])}">
  <meta property="og:description" content="${esc(t.meta.descriptions[pageId])}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${original.locale}">
  <meta property="og:image" content="https://zimonai.com/assets/og-image.png">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t.meta.titles[pageId])}">
  <meta name="twitter:description" content="${esc(t.meta.descriptions[pageId])}">
  <meta name="twitter:image" content="https://zimonai.com/assets/og-image.png">
  <meta name="theme-color" content="#101D33">
  <link rel="icon" href="/favicon.png" type="image/png" sizes="180x180">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
  <script type="module" src="/assets/site.js"></script>
</head>
<body>
  ${header(t, pageId)}
  ${renderers[pageId](t)}
  ${footer(t)}
</body>
</html>`;
}
