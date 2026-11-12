/* PUBLICATIONS PAGE — publication records are edited in site-data.js. */
(() => {
  const data = window.SITE_DATA || {};
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const records = Array.isArray(data.publications) ? data.publications : [];

  // Apply the site owner's name to the page header and footer.
  $$('[data-site-name]').forEach(el => el.textContent = data.name || 'Your Name');
  const yearFooter = $('#current-year');
  if (yearFooter) yearFooter.textContent = new Date().getFullYear();

  const searchInput = $('#publication-search');
  const typeSelect = $('#publication-type');
  const yearSelect = $('#publication-year');
  const archive = $('#publication-archive');
  const resultLabel = $('#publication-results');
  const totalLabel = $('#publication-total');
  const clearButton = $('#clear-filters');

  const typeLabels = {
    'journal-article': 'Journal article',
    'conference-proceeding': 'Conference proceeding',
    'review-article': 'Review article',
    other: 'Other contribution'
  };

  function clean(value) {
    return String(value ?? '').trim();
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function yearValue(record) {
    const match = clean(record.year).match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  }

  function publicationType(record) {
    const value = clean(record.type || record.kind).toLowerCase().replace(/[_\s]+/g, '-');
    return Object.prototype.hasOwnProperty.call(typeLabels, value) ? value : 'other';
  }

  function doiURL(record) {
    const doi = clean(record.doi);
    const raw = clean(record.url) || (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//i, '')}` : '');
    if (!raw) return '';
    try {
      const parsed = new URL(raw, window.location.href);
      return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
    } catch {
      return '';
    }
  }

  function populateYears() {
    const years = [...new Set(records.map(yearValue).filter(Boolean))].sort((a, b) => b - a);
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = String(year);
      option.textContent = String(year);
      yearSelect.appendChild(option);
    });
  }

  function normalisedText(record) {
    return [record.title, record.authors, record.journal, record.publisher, record.abstract,
      record.doi, record.year, typeLabels[publicationType(record)]]
      .map(clean).join(' ').toLowerCase();
  }

  function renderRecord(record) {
    const type = publicationType(record);
    const doi = clean(record.doi);
    const doiHref = doiURL(record);
    const title = clean(record.title) || 'Untitled publication';
    const details = [clean(record.journal), clean(record.publisher), clean(record.volume), clean(record.pages)]
      .filter(Boolean).join(' · ');
    return `
      <article class="archive-publication">
        <div class="archive-publication-year">${escapeHTML(record.year || 'Year not specified')}</div>
        <div class="archive-publication-body">
          <div class="archive-publication-meta"><span>${escapeHTML(typeLabels[type])}</span>${details ? `<span class="archive-publication-source">${escapeHTML(details)}</span>` : ''}</div>
          <div class="archive-title-row">
            <h3>${escapeHTML(title)}</h3>
            ${doiHref ? `<a class="archive-doi" href="${escapeHTML(doiHref)}" target="_blank" rel="noopener noreferrer" aria-label="Open DOI for ${escapeHTML(title)}"><span>DOI</span><b>${escapeHTML(doi || doiHref.replace(/^https?:\/\/doi\.org\//i, ''))}</b><i aria-hidden="true">↗</i></a>` : `<span class="archive-doi doi-unavailable"><span>DOI</span><b>Not assigned / unavailable</b></span>`}
          </div>
          ${record.authors ? `<p class="archive-authors">${escapeHTML(record.authors)}</p>` : ''}
          ${record.abstract ? `<p class="archive-abstract">${escapeHTML(record.abstract)}</p>` : ''}
          ${record.notes ? `<p class="archive-note">${escapeHTML(record.notes)}</p>` : ''}
        </div>
      </article>`;
  }

  function render() {
    const query = clean(searchInput.value).toLowerCase();
    const selectedType = typeSelect.value;
    const selectedYear = yearSelect.value;

    const filtered = records.filter(record => {
      const matchesQuery = !query || normalisedText(record).includes(query);
      const matchesType = selectedType === 'all' || publicationType(record) === selectedType;
      const matchesYear = selectedYear === 'all' || String(yearValue(record)) === selectedYear;
      return matchesQuery && matchesType && matchesYear;
    }).sort((a, b) => yearValue(b) - yearValue(a) || clean(a.title).localeCompare(clean(b.title)));

    const count = filtered.length;
    // These summary labels are optional so a simplified page layout can omit them.
    if (resultLabel) {
      resultLabel.textContent = `${count} ${count === 1 ? 'record' : 'records'}${records.length ? ` shown · ${records.length} total` : ''}`;
    }
    if (totalLabel) {
      totalLabel.textContent = records.length
        ? `${records.length} ${records.length === 1 ? 'scholarly record' : 'scholarly records'} in the archive`
        : 'Publication records will appear here';
    }

    if (!records.length) {
      archive.innerHTML = `
        <div class="publication-empty-state">
          <div class="empty-state-mark" aria-hidden="true">⌁</div>
          <div><h2>Your scholarly record will appear here.</h2><p>No publication entries have been added yet. Send your publication list or academic CV, and the records can be entered here in chronological order. Please include DOI links where available.</p><span class="empty-state-hint">CONTENT PLACEHOLDER · NO PUBLICATIONS HAVE BEEN INVENTED</span></div>
        </div>`;
      if (resultLabel) resultLabel.textContent = '0 publication records added';
      return;
    }

    if (!count) {
      archive.innerHTML = `<div class="publication-no-results"><span aria-hidden="true">⌕</span><h2>No matching publications.</h2><p>Try a different search term or clear one of the filters.</p></div>`;
      return;
    }

    const groups = new Map();
    filtered.forEach(record => {
      const year = clean(record.year) || 'Year not specified';
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(record);
    });

    archive.innerHTML = [...groups.entries()].map(([year, entries]) => `
      <section class="publication-year-group" aria-label="Publications from ${escapeHTML(year)}">
        <div class="publication-year-heading"><h2>${escapeHTML(year)}</h2><span>${entries.length} ${entries.length === 1 ? 'PUBLICATION' : 'PUBLICATIONS'}</span></div>
        <div class="publication-year-list">${entries.map(renderRecord).join('')}</div>
      </section>`).join('');
  }

  searchInput?.addEventListener('input', render);
  typeSelect?.addEventListener('change', render);
  yearSelect?.addEventListener('change', render);
  clearButton?.addEventListener('click', () => {
    searchInput.value = '';
    typeSelect.value = 'all';
    yearSelect.value = 'all';
    render();
    searchInput.focus();
  });

  // Mobile navigation follows the same interaction pattern as the home page.
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

  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  populateYears();
  render();
})();
