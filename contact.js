/* CONTACT PAGE — edit public contact details in site-data.js. */
(() => {
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const email = String(data.email || '').trim();
  const address = String(data.postalAddress || '').trim();
  const researchGate = String(data.researchGateUrl || '').trim();

  $$('[data-site-name]').forEach(el => { el.textContent = data.name || 'Your Name'; });
  const year = $('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  if (email) {
    $$('[data-contact-email]').forEach(el => { el.textContent = email; });
    $$('[data-email-link]').forEach(el => { el.href = `mailto:${email}`; });
  }
  if (address) {
    const addressNode = $('[data-contact-address]');
    if (addressNode) addressNode.textContent = address;
  }
  if (researchGate) {
    const profileLink = $('[data-researchgate-link]');
    if (profileLink) profileLink.href = researchGate;
  }

  const status = $('#contact-copy-status');
  async function copyText(value, label) {
    if (!value) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Copy command unavailable');
      }
      if (status) status.textContent = `${label} copied to clipboard.`;
    } catch (error) {
      if (status) status.textContent = `Could not copy automatically. Please select and copy the ${label.toLowerCase()} manually.`;
    }
  }
  $$('[data-copy]').forEach(button => {
    button.addEventListener('click', () => {
      const kind = button.dataset.copy;
      if (kind === 'email') copyText(email, 'Email address');
      if (kind === 'address') copyText(address, 'Postal address');
    });
  });

  // Responsive navigation.
  const menu = $('#menu-toggle'), nav = $('#primary-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      menu.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    $$('.nav-link', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
    }));
  }
  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();
