(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Header ---------------------------------------------------------------
  const header = document.getElementById('site-header');
  if (header) {
    const solid = document.body.dataset.header === 'solid';
    const update = () => {
      header.dataset.state = solid || window.scrollY > 24 ? 'scrolled' : 'top';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // --- Mobile menu ------------------------------------------------------------
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('menu-close');
  if (menu && toggle) {
    const setOpen = (open) => {
      menu.dataset.open = String(open);
      menu.inert = !open;
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('overflow-hidden', open);
      if (open) close?.focus();
      else toggle.focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => setOpen(true));
    close?.addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.dataset.open === 'true') setOpen(false);
    });
  }

  // --- Scroll reveal ------------------------------------------------------------
  document.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 90;
    [...group.querySelectorAll(':scope > [data-reveal]')].forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * step}ms`);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  const observeReveals = (root = document) => {
    root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => revealObserver.observe(el));
  };
  observeReveals();
  window.VEKA = { observeReveals };

  // --- Counters -----------------------------------------------------------------
  const formatNumber = (n, decimals = 0) =>
    n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const runCounter = (el) => {
    el.dataset.counted = 'true';
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    if (reduceMotion || !Number.isFinite(target)) {
      el.textContent = formatNumber(target, decimals);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = formatNumber(target * eased, decimals);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );
  const observeCounters = (root = document) => {
    root.querySelectorAll('[data-count]:not([data-counted])').forEach((el) => counterObserver.observe(el));
  };
  observeCounters();
  window.VEKA.observeCounters = observeCounters;
  window.VEKA.formatNumber = formatNumber;

  // --- Hero slider --------------------------------------------------------------
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const slides = [...hero.querySelectorAll('[data-slide]')];
    const tabs = [...hero.querySelectorAll('[data-slide-to]')];
    const duration = 7000;
    hero.style.setProperty('--slide-duration', `${duration}ms`);
    let current = 0;
    let timer;

    // Only the first slide ships with a src; the rest load just before they are needed
    const ensureLoaded = (i) => {
      const img = slides[i % slides.length]?.querySelector('img[data-src]');
      if (img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    };

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      ensureLoaded(current);
      setTimeout(() => ensureLoaded(current + 1), 1500);
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.dataset.active = String(active);
        slide.setAttribute('aria-hidden', String(!active));
        // Restart the Ken Burns animation on the incoming image
        const img = slide.querySelector('img');
        if (active && img) {
          img.classList.remove('animate-kenburns');
          void img.offsetWidth;
          img.classList.add('animate-kenburns');
        }
      });
      tabs.forEach((tab, i) => {
        const active = i === current;
        tab.setAttribute('aria-selected', String(active));
        const bar = tab.querySelector('[data-progress]');
        if (bar) {
          bar.classList.remove('animate-progress');
          if (active && !reduceMotion) {
            void bar.offsetWidth;
            bar.classList.add('animate-progress');
          }
        }
      });
      clearTimeout(timer);
      if (!reduceMotion) timer = setTimeout(() => show(current + 1), duration);
    };

    tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(timer);
      else show(current);
    });
    show(0);
  }

  // --- Scrollspy for in-page section navs -----------------------------------------
  document.querySelectorAll('[data-scrollspy]').forEach((nav) => {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setCurrent = (id) => {
      links.forEach((a) => {
        const active = a.getAttribute('href') === `#${id}`;
        a.setAttribute('aria-current', String(active));
        const track = a.closest('ul');
        if (active && track.scrollWidth > track.clientWidth) {
          track.scrollTo({ left: a.parentElement.offsetLeft - 16, behavior: 'smooth' });
        }
      });
    };
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => spy.observe(s));
  });

  // --- Marquee: duplicate the track so the loop is seamless ----------------------
  document.querySelectorAll('[data-marquee-clone]').forEach((clone) => {
    clone.innerHTML = clone.previousElementSibling.innerHTML;
    clone.querySelectorAll('img').forEach((img) => (img.alt = ''));
  });

  // --- Deep links: re-apply #hash once late content (maps, cards, fonts) has settled ---
  if (location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      window.addEventListener('load', () => {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
      });
    }
  }

  // --- Misc ---------------------------------------------------------------------
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-scroll-top]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }),
  );
})();
