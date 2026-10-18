/* Progressive enhancement: links, images, and navigation work without JS. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (toggle && nav) {
    document.documentElement.classList.add('nav-enhanced');
    toggle.hidden = false;
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
  }

  const dialog = document.querySelector('.lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    let opener;
    document.querySelectorAll('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        opener = link;
        const image = dialog.querySelector('img');
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        dialog.querySelector('figcaption').textContent = image.alt;
        dialog.showModal();
      });
    });
    dialog.addEventListener('close', () => opener?.focus());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  }

  const form = document.querySelector('.search-form');
  if (!form) return;
  const input = form.querySelector('input');
  const status = document.querySelector('#search-status');
  const results = document.querySelector('#search-results');
  let indexPromise;
  let request = 0;
  const normalize = (text) => text.normalize('NFKC').toLocaleLowerCase();
  async function search() {
    const current = ++request;
    const query = input.value.trim().slice(0, 200);
    const url = new URL(location.href);
    query ? url.searchParams.set('q', query) : url.searchParams.delete('q');
    history.replaceState(null, '', url);
    results.replaceChildren();
    if (!query) { status.textContent = ''; return; }
    status.textContent = 'Searching…';
    try {
      indexPromise ||= fetch(form.dataset.index).then((response) => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }).catch((error) => { indexPromise = undefined; throw error; });
      const pages = await indexPromise;
      if (current !== request) return;
      const terms = normalize(query).split(/\s+/).filter(Boolean);
      const matches = pages.filter((page) => terms.every((term) => normalize(`${page.title} ${page.text}`).includes(term)))
        .sort((a, b) => Number(normalize(b.title).includes(normalize(query))) - Number(normalize(a.title).includes(normalize(query))));
      status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for “${query}”.` : `No results for “${query}”. Try a broader term.`;
      for (const page of matches) {
        const item = document.createElement('li');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        link.href = page.url;
        link.textContent = page.title;
        heading.append(link);
        const summary = document.createElement('p');
        const position = Math.max(0, normalize(page.text).indexOf(terms[0]) - 60);
        summary.textContent = `${position ? '…' : ''}${page.text.slice(position, position + 230)}${page.text.length > position + 230 ? '…' : ''}`;
        item.append(heading, summary);
        results.append(item);
      }
    } catch {
      if (current === request) status.textContent = 'Search could not load. Please try again, or browse using the navigation above.';
    }
  }
  form.addEventListener('submit', (event) => { event.preventDefault(); search(); });
  let timer;
  input.addEventListener('input', () => { ++request; clearTimeout(timer); timer = setTimeout(search, 180); });
  input.value = new URLSearchParams(location.search).get('q')?.slice(0, 200) || '';
  if (input.value) search();
})();
