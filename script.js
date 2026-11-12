/* HOME PAGE INTERACTIONS — most text/content is edited in site-data.js */
(() => {
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // Apply personal information stored in site-data.js.
  $$('[data-site-name]').forEach(el => el.textContent = data.name || 'Your Name');
  $$('[data-monogram]').forEach(el => el.textContent = data.monogram || 'YN');
  const textBindings = {
    '[data-hero-kicker]': data.heroKicker,
    '[data-role]': data.role,
    '[data-affiliation]': data.affiliation,
    '[data-photo-caption]': data.photoCaption,
    '[data-hero-description]': data.heroDescription,
    '[data-about-lead]': data.aboutLead,
    '[data-about-body]': data.aboutBody
  };
  Object.entries(textBindings).forEach(([selector, value]) => {
    if (value) $$(selector).forEach(el => el.textContent = value);
  });
  if (data.name) {
    const heading = $('[data-hero-heading]');
    if (heading) {
      const parts = data.name.trim().split(/\s+/);
      const last = parts.pop() || '';
      heading.replaceChildren(document.createTextNode(parts.join(' ') + (parts.length ? ' ' : '')));
      const em = document.createElement('em');
      em.textContent = last + '.';
      heading.appendChild(em);
    }
    document.title = `${data.name} | Research & Scientific Writing`;
  }

  // Load your portrait from assets/profile.png. Otherwise retain initials.
  const photo = $('#profile-photo');
  const fallback = $('#portrait-fallback');
  if (photo && fallback) {
    photo.addEventListener('load', () => {
      photo.hidden = false;
      fallback.hidden = true;
    });
    photo.addEventListener('error', () => {
      photo.hidden = true;
      fallback.hidden = false;
    });
    if (photo.complete && photo.naturalWidth > 0) {
      photo.hidden = false;
      fallback.hidden = true;
    }
  }

  // Research interest cards: content comes from site-data.js.
  const interestGrid = $('#interest-grid');
  if (interestGrid && Array.isArray(data.interests) && data.interests.length) {
    interestGrid.innerHTML = data.interests.map((item, index) => `
      <article class="interest-card reveal ${index ? `reveal-delay-${Math.min(index, 3)}` : ''}">
        <span class="interest-number">${escapeHTML(item.number || String(index + 1).padStart(2, '0'))}</span>
        <span class="interest-icon" aria-hidden="true">${escapeHTML(item.icon || '◉')}</span>
        <h3>${escapeHTML(item.title || '')}</h3>
        <p>${escapeHTML(item.description || '')}</p>
      </article>`).join('');
  }

  // Latest publications: only verified records entered in site-data.js are displayed.
  const publicationList = $('#publication-list');
  if (publicationList) {
    if (Array.isArray(data.publications) && data.publications.length) {
      publicationList.innerHTML = data.publications.slice(0, 3).map((pub, index) => `
        <article class="publication-item reveal">
          <div class="publication-year">${escapeHTML(pub.year || '—')}</div>
          <div class="publication-main">
            <p class="publication-journal">${escapeHTML(pub.journal || 'RESEARCH PUBLICATION')}</p>
            <h3>${escapeHTML(pub.title || 'Untitled publication')}</h3>
            ${pub.authors ? `<p class="publication-authors">${escapeHTML(pub.authors)}</p>` : ''}
            ${pub.abstract ? `<p class="publication-abstract">${escapeHTML(pub.abstract)}</p>` : ''}
          </div>
          <a class="doi-link" href="${safeURL(pub.url || (pub.doi ? `https://doi.org/${pub.doi}` : ''))}" target="_blank" rel="noopener noreferrer" aria-label="Open DOI for ${escapeHTML(pub.title || 'publication')}" ${pub.url || pub.doi ? '' : 'aria-disabled="true"'}>
            <span>DOI</span><b>${escapeHTML(pub.doi || 'TO BE ADDED')}</b><i aria-hidden="true">↗</i>
          </a>
        </article>`).join('');
    } else {
      publicationList.innerHTML = `<div class="empty-state reveal"><span class="empty-symbol">⌁</span><div><h3>Your latest research will appear here.</h3><p>Add publication titles, abstracts and DOI links in <code>site-data.js</code> when your verified list is ready.</p></div><span class="empty-label">PUBLICATIONS / INCOMING</span></div>`;
    }
  }

  // Latest blog article cards. Each card opens its complete PDF in a new tab.
  const articleGrid = $('#article-grid');
  if (articleGrid) {
    if (Array.isArray(data.articles) && data.articles.length) {
      articleGrid.innerHTML = data.articles.slice(0, 3).map((article, index) => {
        const articleId = article.id || slugify(article.title || `article-${index + 1}`);
        return `
        <a class="article-card reveal ${index ? `reveal-delay-${index}` : ''}" href="article.html?id=${encodeURIComponent(articleId)}" aria-label="Preview ${escapeHTML(article.title || 'article')}">
          <div class="article-card-top"><span>${escapeHTML(article.category || 'FIELD NOTES')}</span><span>${escapeHTML(article.readTime || 'ARTICLE')}</span></div>
          <div class="article-card-body">
            <p class="article-date">${escapeHTML(article.date || '')}</p>
            <h3>${escapeHTML(article.title || 'Untitled article')}</h3>
            <p>${escapeHTML(article.excerpt || '')}</p>
            <span class="article-read">Preview article <span aria-hidden="true">↗</span></span>
          </div>
        </a>`;
      }).join('');
    } else {
      articleGrid.innerHTML = `<article class="article-card article-placeholder reveal"><div class="article-card-top"><span>WEEKLY NOTEBOOK</span><span>COMING SOON</span></div><div class="article-card-body"><p class="article-date">YOUR NEXT ARTICLE</p><h3>A space for ideas, observations and scientific stories.</h3><p>Your newest article preview will appear here. Add its title, short introduction and PDF path in <code>site-data.js</code>.</p><span class="article-read muted-read">Full article PDF <span aria-hidden="true">↗</span></span></div></article>
      <div class="article-side-note reveal reveal-delay-1"><span class="side-note-icon">✳</span><p>One carefully considered idea can make a complex scientific subject more approachable.</p><span class="side-note-label">NOTES FROM THE FIELD</span></div>`;
    }
  }

  // The home-page Contact call-to-action opens the dedicated contact page.

  // Mobile navigation.
  const menuToggle = $('#menu-toggle');
  const nav = $('#primary-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    $$('.nav-link', nav).forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('menu-open');
    }));
  }

  // Header styling after scroll.
  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Reveal sections as they enter the viewport; reveal immediately if unsupported.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Current year in footer.
  const year = $('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }
  function slugify(value) {
    return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function safeURL(value) {
    try {
      const url = new URL(value, window.location.href);
      return ['http:', 'https:', 'file:'].includes(url.protocol) ? url.href : '#';
    } catch {
      return '#';
    }
  }
})();
