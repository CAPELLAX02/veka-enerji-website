// Project stats, interactive map, filters and cards — all driven by window.VEKA_PROJECTS.
(() => {
  const projects = window.VEKA_PROJECTS || [];
  if (!projects.length) return;

  const TYPES = {
    GES: { label: 'GES', long: 'Güneş Enerji Santrali', short: 'Güneş', icon: 'sun', color: 'var(--color-ges)' },
    RES: { label: 'RES', long: 'Rüzgar Enerji Santrali', short: 'Rüzgar', icon: 'wind', color: 'var(--color-res)' },
    HES: { label: 'HES', long: 'Hidroelektrik Santral', short: 'Hidro', icon: 'droplets', color: 'var(--color-hes)' },
    TM: { label: 'TM', long: 'Trafo Merkezi', short: 'Trafo Merkezi', icon: 'zap', color: 'var(--color-tm)' },
    ENH: { label: 'ENH', long: 'Enerji Nakil Hattı', short: 'Nakil Hattı', icon: 'utility-pole', color: 'var(--color-enh)' },
  };
  const STATUS = {
    tamamlandi: { label: 'Tamamlandı', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
    devam: { label: 'Devam Ediyor', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  };
  const HOME = 'Türkiye';
  const countryOf = (p) => p.country || HOME;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const icon = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const fmt = (n, d = 0) => n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const locationOf = (p) => (countryOf(p) === HOME ? p.il : p.country);

  // --- Stats ------------------------------------------------------------------
  const sumMw = (list) => list.reduce((s, p) => s + (p.mw || 0), 0);
  const stats = {
    'mw-total': sumMw(projects),
    count: projects.length,
    'count-done': projects.filter((p) => p.status === 'tamamlandi').length,
    'count-ongoing': projects.filter((p) => p.status === 'devam').length,
    provinces: new Set(projects.filter((p) => countryOf(p) === HOME).map((p) => p.il)).size,
    countries: new Set(projects.map(countryOf)).size,
  };
  Object.keys(TYPES).forEach((t) => {
    const list = projects.filter((p) => p.type === t);
    stats[`mw-${t}`] = sumMw(list);
    stats[`count-${t}`] = list.length;
  });
  document.querySelectorAll('[data-project-stat]').forEach((el) => {
    const value = stats[el.dataset.projectStat] ?? 0;
    el.dataset.count = String(Math.round(value));
    el.textContent = '0';
  });

  // Stacked MW bar by generation type
  document.querySelectorAll('[data-project-breakdown]').forEach((el) => {
    const gen = ['GES', 'RES', 'HES'].filter((t) => stats[`mw-${t}`] > 0);
    const total = gen.reduce((s, t) => s + stats[`mw-${t}`], 0);
    const dark = el.dataset.theme === 'dark';
    el.innerHTML = `
      <div class="flex h-3 overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-navy-100'}">
        ${gen.map((t) => `<span class="h-full origin-left transition-transform duration-[1.6s] ease-out-expo" style="width:${(stats[`mw-${t}`] / total) * 100}%;background:${TYPES[t].color}" data-bar></span>`).join('')}
      </div>
      <dl class="mt-5 grid grid-cols-3 gap-4">
        ${gen.map((t) => `
          <div>
            <dt class="flex items-center gap-2 text-xs font-medium ${dark ? 'text-navy-300' : 'text-navy-500'}"><span class="size-2 rounded-full" style="background:${TYPES[t].color}"></span>${TYPES[t].label} · ${TYPES[t].short}</dt>
            <dd class="mt-1 font-display text-2xl font-semibold ${dark ? 'text-white' : 'text-navy-900'}"><span data-count="${Math.round(stats[`mw-${t}`])}">0</span> <span class="text-sm font-medium ${dark ? 'text-navy-400' : 'text-navy-500'}">MW</span></dd>
          </div>`).join('')}
      </dl>`;
    const bars = el.querySelectorAll('[data-bar]');
    bars.forEach((b) => (b.style.transform = 'scaleX(0)'));
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      bars.forEach((b) => (b.style.transform = 'scaleX(1)'));
      obs.disconnect();
    }, { threshold: 0.4 }).observe(el);
  });
  window.VEKA?.observeCounters();

  // --- Shared filter state ---------------------------------------------------------
  // Initial filter can come from the URL, e.g. projeler.html?tur=GES&durum=devam
  const params = new URLSearchParams(location.search);
  const state = {
    type: TYPES[params.get('tur')?.toUpperCase()] ? params.get('tur').toUpperCase() : 'all',
    status: STATUS[params.get('durum')] ? params.get('durum') : 'all',
  };
  const listeners = [];
  const matches = (p) => (state.type === 'all' || p.type === state.type) && (state.status === 'all' || p.status === state.status);
  const emit = () => listeners.forEach((fn) => fn(projects.filter(matches)));

  document.querySelectorAll('[data-project-filters]').forEach((bar) => {
    bar.querySelectorAll('[data-filter-type] [data-count-type]').forEach((el) => {
      const t = el.dataset.countType;
      el.textContent = t === 'all' ? projects.length : stats[`count-${t}`];
    });
    bar.querySelectorAll('[data-filter-type], [data-filter-status]').forEach((group) => {
      const value = 'filterType' in group.dataset ? state.type : state.status;
      group.querySelectorAll('[data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
    });
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-value]');
      if (!btn) return;
      const group = btn.closest('[data-filter-type], [data-filter-status]');
      const key = 'filterType' in group.dataset ? 'type' : 'status';
      state[key] = btn.dataset.value;
      group.querySelectorAll('[data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      emit();
    });
  });

  // --- Cards -----------------------------------------------------------------------
  const card = (p) => {
    const t = TYPES[p.type];
    const s = STATUS[p.status];
    return `
    <article class="group card-lift flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/8" data-reveal>
      <div class="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" class="size-full object-cover transition duration-700 ease-out-expo group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
        <span class="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy-900 shadow-sm backdrop-blur">
          <span class="size-2 rounded-full" style="background:${t.color}"></span>${t.label}
        </span>
        <span class="absolute right-4 bottom-4 font-mono text-xs text-white/85">${p.year}</span>
      </div>
      <div class="flex flex-1 flex-col p-6">
        <div class="flex items-center justify-between gap-3">
          <p class="flex items-center gap-1.5 text-sm text-navy-500">${icon('map-pin', 'icon size-4')}${esc(locationOf(p))}</p>
          <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${s.cls}">${s.label}</span>
        </div>
        <h3 class="mt-3 text-xl font-semibold">${esc(p.name)}</h3>
        <p class="mt-1 text-sm text-navy-500">${t.long}</p>
        <div class="mt-5 flex items-end justify-between border-t border-navy-100 pt-5">
          <div>
            <p class="font-mono text-[11px] tracking-widest text-navy-400 uppercase">Kapasite</p>
            <p class="mt-1 font-display text-2xl font-semibold text-navy-900">${esc(p.capacity)}</p>
          </div>
          ${p.voltage ? `<p class="rounded-lg bg-navy-50 px-2.5 py-1 font-mono text-xs text-navy-600">${esc(p.voltage)}</p>` : ''}
        </div>
        <ul class="mt-5 flex flex-wrap gap-1.5">
          ${p.scope.map((x) => `<li class="rounded-md bg-navy-50 px-2 py-1 text-xs text-navy-600">${esc(x)}</li>`).join('')}
        </ul>
      </div>
    </article>`;
  };

  document.querySelectorAll('[data-project-list]').forEach((el) => {
    const limit = Number(el.dataset.limit) || Infinity;
    const empty = document.querySelector(el.dataset.empty || null);
    const counter = document.querySelector(el.dataset.counter || null);
    const render = (list) => {
      const sorted = [...list].sort((a, b) => (a.status === b.status ? b.year - a.year : a.status === 'devam' ? -1 : 1));
      el.innerHTML = sorted.slice(0, limit).map(card).join('');
      if (empty) empty.hidden = list.length > 0;
      if (counter) counter.textContent = list.length;
      window.VEKA?.observeReveals(el);
    };
    listeners.push(render);
    render(projects.filter(matches));
  });

  // --- Map -------------------------------------------------------------------------
  const svgCache = {};
  const loadSvg = (url) => (svgCache[url] ??= fetch(url).then((r) => r.text()));

  const projector = (svg) => {
    const k = Number(svg.dataset.k);
    const tx = Number(svg.dataset.tx);
    const ty = Number(svg.dataset.ty);
    const { width, height } = svg.viewBox.baseVal;
    const rad = Math.PI / 180;
    const mercator = svg.dataset.projection === 'mercator';
    return {
      width,
      height,
      xy: (lat, lon) => [
        k * lon * rad + tx,
        mercator ? ty - k * Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2)) : ty - k * lat * rad,
      ],
    };
  };

  const tooltipHtml = (p) => {
    const t = TYPES[p.type];
    return `
      <div class="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-navy-500 uppercase">
        <span class="size-2 rounded-full" style="background:${t.color}"></span>${t.long}
      </div>
      <p class="mt-1.5 font-display text-base leading-snug font-semibold text-navy-900">${esc(p.name)}</p>
      <div class="mt-2 flex items-center justify-between gap-4 text-sm">
        <span class="text-navy-500">${esc(locationOf(p))} · ${p.year}</span>
        <span class="font-mono font-medium text-navy-900">${esc(p.capacity)}</span>
      </div>
      <p class="mt-2 text-xs font-medium ${p.status === 'devam' ? 'text-amber-600' : 'text-emerald-600'}">${STATUS[p.status].label}</p>`;
  };

  document.querySelectorAll('[data-project-map]').forEach(async (root) => {
    const stage = root.querySelector('[data-map-stage]');
    const tooltip = root.querySelector('[data-map-tooltip]');
    const viewButtons = root.querySelectorAll('[data-map-view]');
    const views = {
      tr: { url: 'assets/maps/turkiye.svg' },
      world: { url: 'assets/maps/dunya.svg' },
    };
    let view = root.dataset.view || 'tr';
    let current = projects.filter(matches);

    const hideTooltip = () => tooltip && (tooltip.dataset.open = 'false');
    const showTooltip = (marker, html) => {
      if (!tooltip) return;
      tooltip.innerHTML = html;
      tooltip.dataset.open = 'true';
      const s = root.getBoundingClientRect();
      const m = marker.getBoundingClientRect();
      const w = tooltip.offsetWidth;
      const h = tooltip.offsetHeight;
      let left = m.left - s.left + m.width / 2 - w / 2;
      left = Math.max(8, Math.min(left, s.width - w - 8));
      let top = m.top - s.top - h - 12;
      if (top < 8) top = m.bottom - s.top + 12;
      tooltip.style.transform = `translate(${left}px, ${top}px)`;
    };

    const draw = async () => {
      const markup = await loadSvg(views[view].url);
      stage.innerHTML = markup;
      const svg = stage.querySelector('svg');
      svg.classList.add('block', 'h-auto', 'w-full');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      const P = projector(svg);
      const pct = (x, y) => `left:${(x / P.width) * 100}%;top:${(y / P.height) * 100}%`;
      const NS = 'http://www.w3.org/2000/svg';

      const layer = document.createElement('div');
      layer.className = 'absolute inset-0';
      stage.appendChild(layer);

      const markerHtml = (p, x, y) => `
        <button type="button" class="map-marker group/m absolute -translate-x-1/2 -translate-y-1/2 p-1 focus:outline-none sm:p-1.5" style="${pct(x, y)}" data-id="${p.id}" aria-label="${esc(p.name)} — ${esc(p.capacity)}">
          ${p.status === 'devam' ? `<span class="absolute inset-1 rounded-full animate-ping-slow sm:inset-1.5" style="background:${TYPES[p.type].color}"></span>` : ''}
          <span class="relative block size-2.5 rounded-full ring-2 ring-white shadow-md sm:size-3.5 sm:ring-[2.5px] transition-transform duration-300 group-hover/m:scale-150 group-focus-visible/m:scale-150" style="background:${TYPES[p.type].color}"></span>
        </button>`;

      if (view === 'tr') {
        const local = current.filter((p) => countryOf(p) === HOME);
        const provinces = new Set(local.map((p) => p.il));
        svg.querySelectorAll('[data-il]').forEach((path) => path.classList.toggle('is-active', provinces.has(path.dataset.il)));

        local.filter((p) => p.route).forEach((p) => {
          const line = document.createElementNS(NS, 'polyline');
          line.setAttribute('points', p.route.map(([la, lo]) => P.xy(la, lo).join(',')).join(' '));
          line.setAttribute('fill', 'none');
          line.style.stroke = TYPES.ENH.color;
          line.setAttribute('stroke-width', '3.5');
          line.setAttribute('stroke-linecap', 'round');
          line.setAttribute('stroke-dasharray', '2 7');
          line.classList.add('map-route');
          svg.appendChild(line);
        });

        layer.innerHTML = local.map((p) => markerHtml(p, ...P.xy(p.lat, p.lon))).join('');
      } else {
        const abroad = current.filter((p) => countryOf(p) !== HOME);
        const home = current.filter((p) => countryOf(p) === HOME);
        const [hx, hy] = P.xy(39, 35);
        layer.innerHTML =
          abroad.map((p) => markerHtml(p, ...P.xy(p.lat, p.lon))).join('') +
          (home.length
            ? `<button type="button" class="absolute -translate-x-1/2 -translate-y-1/2" style="${pct(hx, hy)}" data-home aria-label="Türkiye — ${home.length} proje, haritayı yakınlaştır">
                 <span class="absolute inset-2 rounded-full bg-brand-400 animate-ping-slow"></span>
                 <span class="relative grid size-11 place-items-center rounded-full bg-brand-500 font-display text-sm font-bold text-white shadow-lg ring-4 ring-white/80">${home.length}</span>
               </button>`
            : '');
      }

      const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
      layer.querySelectorAll('.map-marker').forEach((m) => {
        const p = byId[m.dataset.id];
        const open = () => showTooltip(m, tooltipHtml(p));
        m.addEventListener('mouseenter', open);
        m.addEventListener('focus', open);
        m.addEventListener('click', open);
        m.addEventListener('mouseleave', hideTooltip);
        m.addEventListener('blur', hideTooltip);
      });
      layer.querySelector('[data-home]')?.addEventListener('click', () => setView('tr'));
    };

    const setView = (v) => {
      view = v;
      viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mapView === v)));
      hideTooltip();
      draw();
    };
    viewButtons.forEach((b) => b.addEventListener('click', () => setView(b.dataset.mapView)));
    stage.addEventListener('mouseleave', hideTooltip);

    listeners.push((list) => {
      current = list;
      hideTooltip();
      draw();
    });

    setView(view);
  });
})();
