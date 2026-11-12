/* BLOG ARCHIVE — add and edit articles in site-data.js. */
(() => {
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const articles = Array.isArray(data.articles) ? data.articles : [];
  $$('[data-site-name]').forEach(el => el.textContent = data.name || 'Your Name');
  $('#current-year').textContent = new Date().getFullYear();
  const search = $('#blog-search'), category = $('#blog-category'), grid = $('#blog-grid');
  const results = $('#blog-results'), total = $('#blog-total');
  function clean(value) { return String(value ?? '').trim(); }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function slugify(value) { return clean(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function articleId(article, index) { return clean(article.id) || slugify(article.title) || `article-${index + 1}`; }
  function articleDate(article) { const t = Date.parse(clean(article.date)); return Number.isNaN(t) ? 0 : t; }
  const categories = [...new Set(articles.map(a => clean(a.category)).filter(Boolean))].sort((a,b) => a.localeCompare(b));
  categories.forEach(name => { const opt = document.createElement('option'); opt.value = name; opt.textContent = name; category.appendChild(opt); });
  function card(article, index) {
    const id = articleId(article, index);
    return `<a class="blog-card" href="article.html?id=${encodeURIComponent(id)}" aria-label="Preview ${esc(article.title || 'article')}">
      <div class="blog-card-top"><span>${esc(article.category || 'FIELD NOTES')}</span><span>${esc(article.readTime || 'ARTICLE')}</span></div>
      <div class="blog-card-body"><p class="blog-card-date">${esc(article.date || '')}</p><h2>${esc(article.title || 'Untitled article')}</h2><p class="blog-card-excerpt">${esc(article.excerpt || '')}</p><span class="blog-card-link">Preview article <b aria-hidden="true">↗</b></span></div>
    </a>`;
  }
  function render() {
    const q = clean(search.value).toLowerCase(), cat = category.value;
    const filtered = articles.map((a,i) => ({...a, _index:i})).filter(a => {
      const text = [a.title,a.excerpt,a.category,a.date].map(clean).join(' ').toLowerCase();
      return (!q || text.includes(q)) && (cat === 'all' || clean(a.category) === cat);
    }).sort((a,b) => articleDate(b) - articleDate(a) || clean(b.date).localeCompare(clean(a.date)));
    total.textContent = `${articles.length} ${articles.length === 1 ? 'article' : 'articles'} in the notebook`;
    results.textContent = `${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'} shown`;
    if (!articles.length) {
      grid.innerHTML = `<div class="blog-empty-state"><span class="empty-state-mark" aria-hidden="true">⌁</span><div><h2>Your first article is waiting.</h2><p>No articles have been added yet. Add the article title, preview and PDF path in the <code>articles</code> array in <code>site-data.js</code>. Your articles will appear here and on the homepage.</p><span class="empty-state-hint">CONTENT PLACEHOLDER · NO SAMPLE ARTICLES HAVE BEEN INVENTED</span></div></div>`;
      results.textContent = '0 articles added'; return;
    }
    if (!filtered.length) { grid.innerHTML = `<div class="blog-no-results"><span aria-hidden="true">⌕</span><h2>No matching articles.</h2><p>Try another search term or clear the topic filter.</p></div>`; return; }
    grid.innerHTML = filtered.map((a,i) => card(a, a._index)).join('');
  }
  search.addEventListener('input', render); category.addEventListener('change', render);
  $('#blog-clear').addEventListener('click', () => { search.value=''; category.value='all'; render(); search.focus(); });
  const menu = $('#menu-toggle'), nav = $('#primary-nav');
  if (menu && nav) { menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu'); nav.classList.toggle('is-open', !open); document.body.classList.toggle('menu-open', !open); }); $$('.nav-link',nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); })); }
  const header = $('.site-header'); const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24); updateHeader(); window.addEventListener('scroll', updateHeader, {passive:true});
  render();
})();
