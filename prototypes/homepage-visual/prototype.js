const toggles = [...document.querySelectorAll('[data-disclosure]')];
const nav = document.querySelector('#navigation');
const mobile = document.querySelector('.mobile-toggle');
function closeDisclosures(except) {
  for (const button of toggles) {
    if (button === except) continue;
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
  }
}
function closeMobile() {
  mobile.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  closeDisclosures();
}
for (const button of toggles) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeDisclosures(button);
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  });
}
mobile.addEventListener('click', () => {
  const open = mobile.getAttribute('aria-expanded') !== 'true';
  closeDisclosures();
  mobile.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMobile();
  if (event.target.closest('#navigation a')) closeMobile();
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.header')) closeMobile();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.target.closest('dialog')) return;
  const openButton = toggles.find(button => button.getAttribute('aria-expanded') === 'true');
  if (openButton) { closeDisclosures(); openButton.focus(); }
  else if (mobile.getAttribute('aria-expanded') === 'true') { closeMobile(); mobile.focus(); }
});
const narrow = matchMedia('(max-width: 1000px)');
narrow.addEventListener('change', closeMobile);
const inquiry = document.querySelector('#inquiry-preview');
const names = { unsure: 'Not yet sure — confirm the scope first', t1: 'T1 · Supplier Verification', t2: 'T2 · Enhanced Supplier Due Diligence', advanced: 'Advanced Verification & Enterprise Services' };
for (const button of document.querySelectorAll('[data-inquiry]')) {
  button.addEventListener('click', () => {
    const selection = button.dataset.inquiry;
    document.querySelector('#inquiry-selection').textContent = names[selection];
    document.querySelector('#inquiry-destination').textContent = `https://zimonai.com/request-verification/?service=${selection}`;
    closeMobile();
    inquiry.showModal();
  });
}
document.querySelector('[data-cover]').addEventListener('click', () => document.querySelector('#cover-preview').showModal());
for (const button of document.querySelectorAll('[data-close]')) button.addEventListener('click', () => button.closest('dialog').close());
