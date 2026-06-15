(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: shadow on scroll + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Reveal on scroll ---------- */
  function observeReveals() {
    const items = document.querySelectorAll('.reveal:not(.in)');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    items.forEach((el) => io.observe(el));
  }
  observeReveals();

  /* ---------- Spine scroll-spy + click nav ---------- */
  const spineItems = Array.from(document.querySelectorAll('.spine li'));
  if (spineItems.length) {
    spineItems.forEach((li) => {
      li.addEventListener('click', () => {
        const el = document.getElementById(li.dataset.target);
        if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
    const sections = spineItems
      .map((li) => document.getElementById(li.dataset.target))
      .filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            spineItems.forEach((li) =>
              li.classList.toggle('active', li.dataset.target === id)
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Dynamic content from the API ---------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    return res.json();
  }

  function renderPublications(pubs) {
    const list = document.getElementById('pubList');
    if (!pubs.length) { list.innerHTML = '<li class="pub-loading">No publications yet.</li>'; return; }
    list.innerHTML = pubs
      .map((p) => {
        const statusClass = (p.status || '').toLowerCase().replace(/\s+/g, '-');
        const venueYear = [p.venue, p.year].filter(Boolean).join(', ');
        const doi = p.doi
          ? `<a class="pub-doi" href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI ${esc(p.doi)}</a>`
          : '';
        return `<li class="pub-item reveal">
          <div class="pub-top">
            <span class="pub-title">${esc(p.title)}</span>
            ${p.status ? `<span class="pub-status ${statusClass}">${esc(p.status)}</span>` : ''}
          </div>
          <div class="pub-meta">
            <span class="pub-venue">${esc(venueYear)}</span>
            ${doi}
          </div>
        </li>`;
      })
      .join('');
    observeReveals();
  }

  function renderProjects(projects) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = projects
      .map(
        (p) => `<article class="project-card reveal">
          <span class="project-role">${esc(p.role)}</span>
          <h3 class="project-title">${esc(p.title)}</h3>
          <p class="project-summary">${esc(p.summary)}</p>
          ${p.highlight ? `<span class="project-highlight">${esc(p.highlight)}</span>` : ''}
        </article>`
      )
      .join('');
    observeReveals();
  }

  function renderNews(items) {
    const list = document.getElementById('newsList');
    list.innerHTML = items
      .map(
        (n) => `<li class="reveal">
          <span class="news-date">${esc(n.date)}</span>
          <span class="news-text">${esc(n.text)}</span>
        </li>`
      )
      .join('');
    observeReveals();
  }

  getJSON('/api/publications').then(renderPublications).catch(() => {
    document.getElementById('pubList').innerHTML =
      '<li class="pub-loading">Could not load publications right now.</li>';
  });
  getJSON('/api/projects').then(renderProjects).catch(() => {
    document.getElementById('projectGrid').innerHTML =
      '<p class="pub-loading">Could not load projects right now.</p>';
  });
  getJSON('/api/news').then(renderNews).catch(() => {
    document.getElementById('newsList').innerHTML =
      '<li class="pub-loading">Could not load updates right now.</li>';
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('cf-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.message.length < 10) {
      status.className = 'form-status err';
      status.textContent = 'Please fill in your name, a valid email, and a longer message.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        status.className = 'form-status ok';
        status.textContent = data.message || 'Thanks. Your message was sent.';
        form.reset();
      } else {
        status.className = 'form-status err';
        status.textContent = data.error || 'Something went wrong. Please try again.';
      }
    } catch (err) {
      status.className = 'form-status err';
      status.textContent = 'Network error. Please email khaled@cse.mist.ac.bd instead.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  /* ---------- Footer year (kept current) ---------- */
})();
