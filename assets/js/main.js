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
      menu.setAttribute('aria-hidden', String(!open));
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
    root.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));
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

    const show = (index) => {
      current = (index + slides.length) % slides.length;
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

  // --- Marquee: duplicate the track so the loop is seamless ----------------------
  document.querySelectorAll('[data-marquee-clone]').forEach((clone) => {
    clone.innerHTML = clone.previousElementSibling.innerHTML;
    clone.querySelectorAll('img').forEach((img) => (img.alt = ''));
  });

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
