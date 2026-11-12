/* ARTICLE READER — each blog card opens this page using its unique ?id=. */
(() => {
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const articles = Array.isArray(data.articles) ? data.articles : [];
  $$('[data-site-name]').forEach(el => el.textContent = data.name || 'Your Name');
  $('#current-year').textContent = new Date().getFullYear();
  const clean = value => String(value ?? '').trim();
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slugify = value => clean(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const idOf = (article, index) => clean(article.id) || slugify(article.title) || `article-${index + 1}`;
  function safePdf(value) {
    const raw = clean(value);
    if (!raw) return '';
    try { const url = new URL(raw, window.location.href); return ['http:', 'https:', 'file:'].includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  }
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id') || '';
  const foundIndex = articles.findIndex((a,i) => idOf(a,i) === requestedId);
  const host = $('#article-detail');
  if (foundIndex < 0) {
    document.title = `Article not found | ${data.name || 'Academic profile'}`;
    host.innerHTML = `<div class="blog-empty-state"><span class="empty-state-mark">⌁</span><div><h2>Article not found.</h2><p>This article may have been moved or its link may be incomplete. Return to the blog archive to browse available articles.</p><a class="text-link dark-link" href="blog.html">Browse all articles ↗</a></div></div>`;
  } else {
    const article = articles[foundIndex], pdf = safePdf(article.pdf);
    document.title = `${clean(article.title) || 'Article'} | ${data.name || 'Academic profile'}`;
    const download = pdf ? `<a class="button button-primary article-download" href="${esc(pdf)}" download target="_blank" rel="noopener noreferrer">Download PDF <span aria-hidden="true">↓</span></a>` : '';
    const reader = pdf ? `<div class="pdf-reader-wrap"><div class="pdf-reader-heading"><span>FULL ARTICLE · PDF READER</span><a href="${esc(pdf)}" target="_blank" rel="noopener noreferrer">Open PDF in new tab ↗</a></div><iframe class="pdf-reader" src="${esc(pdf)}#toolbar=1&navpanes=0&view=FitH" title="PDF: ${esc(article.title)}"></iframe><p class="pdf-reader-fallback">If the PDF does not appear in your browser, <a href="${esc(pdf)}" target="_blank" rel="noopener noreferrer">open it in a new tab</a> or use the download button.</p></div>` : `<div class="pdf-missing"><strong>PDF not uploaded yet.</strong><p>Add the PDF file to <code>assets/pdfs/</code> and enter its relative path in this article's <code>pdf</code> field in <code>site-data.js</code>.</p></div>`;
    host.innerHTML = `<header class="article-heading-block"><p class="eyebrow"><span class="eyebrow-line"></span> ${esc(article.category || 'FIELD NOTES')}</p><p class="article-detail-date">${esc(article.date || '')}${article.readTime ? ` · ${esc(article.readTime)}` : ''}</p><h1>${esc(article.title || 'Untitled article')}</h1><p class="article-detail-excerpt">${esc(article.excerpt || '')}</p><div class="article-detail-actions">${download}<a class="text-link dark-link" href="blog.html">All articles <span aria-hidden="true">↗</span></a></div></header>${reader}`;
  }
  const menu = $('#menu-toggle'), nav = $('#primary-nav');
  if (menu && nav) { menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu'); nav.classList.toggle('is-open', !open); document.body.classList.toggle('menu-open', !open); }); $$('.nav-link',nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); })); }
  const header = $('.site-header'); const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24); updateHeader(); window.addEventListener('scroll', updateHeader, {passive:true});
})();
