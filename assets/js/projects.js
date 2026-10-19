// Project stats, interactive map, filters and cards — all driven by window.VEKA_PROJECTS
// (generated from data/projeler.json by scripts/build-projects.mjs).
(() => {
  const projects = window.VEKA_PROJECTS || [];
  if (!projects.length) return;

  // Display order across the site: TM → RES → GES → HES → EİH
  const TYPES = {
    TM: { label: 'TM', long: 'Trafo Merkezi', short: 'Trafo Merkezi', icon: 'zap', color: 'var(--color-tm)' },
    RES: { label: 'RES', long: 'Rüzgar Enerji Santrali', short: 'Rüzgar', icon: 'wind', color: 'var(--color-res)' },
    GES: { label: 'GES', long: 'Güneş Enerji Santrali', short: 'Güneş', icon: 'sun', color: 'var(--color-ges)' },
    HES: { label: 'HES', long: 'Hidroelektrik Santral', short: 'Hidro', icon: 'droplets', color: 'var(--color-hes)' },
    EIH: { label: 'EİH', long: 'Enerji İletim Hattı', short: 'İletim Hattı', icon: 'utility-pole', color: 'var(--color-eih)' },
  };
  const ORDER = Object.keys(TYPES);
  const STATUS = {
    tamamlandi: { label: 'Tamamlandı', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
    devam: { label: 'Devam Ediyor', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  };
  const HOME = 'Türkiye';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const icon = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const lower = (s) => s.toLocaleLowerCase('tr-TR');
  const maxKv = (p) => Math.max(0, ...(p.voltage || '').match(/[\d.]+/g)?.map(Number) || [0]);

  // Default ordering: type order, ongoing first, then size (MW, then voltage)
  const byDefault = (a, b) =>
    ORDER.indexOf(a.type) - ORDER.indexOf(b.type) ||
    (a.status === b.status ? 0 : a.status === 'devam' ? -1 : 1) ||
    (b.mw || 0) - (a.mw || 0) ||
    maxKv(b) - maxKv(a) ||
    a.name.localeCompare(b.name, 'tr');
  const bySize = (a, b) => (b.mw || 0) - (a.mw || 0) || maxKv(b) - maxKv(a);

  // --- Stats ------------------------------------------------------------------
  const counted = projects.filter((p) => p.countMw);
  const sumMw = (list) => list.reduce((s, p) => s + p.mw, 0);
  const stats = {
    'mw-total': sumMw(counted),
    count: projects.length,
    'count-done': projects.filter((p) => p.status === 'tamamlandi').length,
    'count-ongoing': projects.filter((p) => p.status === 'devam').length,
    substations: projects.reduce((s, p) => s + p.substations, 0),
    provinces: new Set(projects.flatMap((p) => p.provinces)).size,
    countries: new Set(projects.map((p) => p.country)).size,
  };
  ORDER.forEach((t) => {
    stats[`mw-${t}`] = sumMw(counted.filter((p) => p.plant === t));
    stats[`count-${t}`] = projects.filter((p) => p.types.includes(t)).length;
  });
  document.querySelectorAll('[data-project-stat]').forEach((el) => {
    el.dataset.count = String(Math.round(stats[el.dataset.projectStat] ?? 0));
    el.textContent = '0';
  });

  // Stacked MW bar by generation type
  document.querySelectorAll('[data-project-breakdown]').forEach((el) => {
    const gen = ['RES', 'GES', 'HES'].filter((t) => stats[`mw-${t}`] > 0);
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
  const typeParam = params.get('tur')?.toLocaleUpperCase('tr-TR').replace('İ', 'I');
  const state = {
    type: TYPES[typeParam] ? typeParam : 'all',
    status: STATUS[params.get('durum')] ? params.get('durum') : 'all',
    query: '',
  };
  const listeners = [];
  const haystack = new Map(projects.map((p) => [p, lower(`${p.name} ${p.client} ${p.location} ${p.scope} ${p.voltage || ''}`)]));
  const matches = (p) =>
    (state.type === 'all' || p.types.includes(state.type)) &&
    (state.status === 'all' || p.status === state.status) &&
    (!state.query || state.query.split(/\s+/).every((w) => haystack.get(p).includes(w)));
  const emit = () => listeners.forEach((fn) => fn(projects.filter(matches)));

  document.querySelectorAll('[data-project-filters]').forEach((bar) => {
    bar.querySelectorAll('[data-filter-type] [data-value]').forEach((btn) => {
      const t = btn.dataset.value;
      if (t !== 'all' && !stats[`count-${t}`]) btn.hidden = true; // no projects of this type yet
      const counter = btn.querySelector('[data-count-type]');
      if (counter) counter.textContent = t === 'all' ? projects.length : stats[`count-${t}`];
    });
    bar.querySelectorAll('[data-filter-type], [data-filter-status]').forEach((group) => {
      const value = 'filterType' in group.dataset ? state.type : state.status;
      group.querySelectorAll('[data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
    });
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-value]');
      if (!btn) return;
      const group = btn.closest('[data-filter-type], [data-filter-status]');
      state['filterType' in group.dataset ? 'type' : 'status'] = btn.dataset.value;
      group.querySelectorAll('[data-value]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      emit();
    });
  });

  document.querySelectorAll('[data-project-search]').forEach((input) => {
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.query = lower(input.value.trim());
        emit();
      }, 120);
    });
  });

  // --- Cards -----------------------------------------------------------------------
  const card = (p) => {
    const t = TYPES[p.type];
    const s = STATUS[p.status];
    const plant = p.plant !== p.type ? TYPES[p.plant] : null;
    const extra = p.types.filter((x) => x !== p.type).map((x) => TYPES[x]);
    const specs = [
      p.voltage && ['Gerilim', p.voltage],
      p.capacity && [p.type === 'TM' || plant ? 'Santral gücü' : 'Kurulu güç', p.capacity],
    ].filter(Boolean);
    return `
    <article class="group card-lift relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-navy-900/8 sm:p-7" data-reveal>
      <span class="absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ease-out-expo scale-x-[0.18] group-hover:scale-x-100" style="background:${t.color}"></span>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="flex flex-wrap items-center gap-1.5">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-navy-50 py-1 pr-3 pl-1 text-xs font-semibold text-navy-800">
            <span class="grid size-5 place-items-center rounded-full text-white" style="background:${t.color}">${icon(t.icon, 'icon size-3')}</span>${t.label}
          </span>
          ${extra.map((x) => `
          <span class="inline-flex items-center gap-1.5 rounded-full bg-navy-50 py-1 pr-3 pl-1 text-xs font-semibold text-navy-800">
            <span class="grid size-5 place-items-center rounded-full text-white" style="background:${x.color}">${icon(x.icon, 'icon size-3')}</span>${x.label}
          </span>`).join('')}
          ${plant ? `<span class="rounded-full px-2.5 py-1 text-[11px] font-medium text-navy-500 ring-1 ring-navy-100">${plant.label} santrali</span>` : ''}
        </span>
        <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${s.cls}">${s.label}</span>
      </div>
      <h3 class="mt-5 text-lg leading-snug font-semibold">${esc(p.name)}</h3>
      <div class="mt-3 space-y-1.5 text-sm text-navy-500">
        <p class="flex items-start gap-2">${icon('building-2', 'icon mt-0.5 size-4 text-navy-400')}<span><span class="sr-only">Müşteri: </span>${esc(p.client)}</span></p>
        <p class="flex items-start gap-2">${icon('map-pin', 'icon mt-0.5 size-4 text-navy-400')}<span><span class="sr-only">Konum: </span>${esc(p.location)}</span></p>
      </div>
      ${specs.length ? `
      <dl class="mt-5 grid grid-cols-2 gap-4 border-t border-navy-100 pt-5">
        ${specs.map(([k, v]) => `<div><dt class="font-mono text-[10px] tracking-widest text-navy-400 uppercase">${k}</dt><dd class="mt-1 font-display text-xl font-semibold text-navy-900">${esc(v)}</dd></div>`).join('')}
      </dl>` : ''}
      <p class="mt-5 border-t border-navy-100 pt-5 text-sm leading-relaxed text-navy-600">${esc(p.scope)}</p>
      ${p.detail ? `<p class="mt-2 text-xs text-navy-400">${esc(p.detail)}</p>` : ''}
    </article>`;
  };

  document.querySelectorAll('[data-project-list]').forEach((el) => {
    const pageSize = Number(el.dataset.pageSize) || Infinity;
    const limit = Number(el.dataset.limit) || Infinity;
    const sort = el.dataset.sort === 'size' ? bySize : byDefault;
    const empty = document.querySelector(el.dataset.empty || null);
    const counter = document.querySelector(el.dataset.counter || null);
    const more = document.querySelector(el.dataset.more || null);
    let list = [];
    let shown = 0;

    const renderMore = () => {
      const next = list.slice(shown, Math.min(shown + pageSize, limit));
      el.insertAdjacentHTML('beforeend', next.map(card).join(''));
      shown += next.length;
      if (more) more.hidden = shown >= Math.min(list.length, limit);
      window.VEKA?.observeReveals(el);
    };
    const render = (filtered) => {
      list = [...filtered].sort(sort);
      shown = 0;
      el.innerHTML = '';
      renderMore();
      if (empty) empty.hidden = list.length > 0;
      if (counter) counter.textContent = list.length;
    };
    more?.addEventListener('click', renderMore);
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

  // Projects sharing a location (same il) are fanned out on a small ring so every marker stays clickable
  const spread = (items, radius) => {
    const groups = new Map();
    items.forEach((it) => {
      const key = `${Math.round(it.x / radius)}:${Math.round(it.y / radius)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(it);
    });
    groups.forEach((g) => {
      if (g.length < 2) return;
      const cx = g.reduce((s, it) => s + it.x, 0) / g.length;
      const cy = g.reduce((s, it) => s + it.y, 0) / g.length;
      const r = radius * (0.7 + g.length * 0.12);
      g.forEach((it, i) => {
        const a = (i / g.length) * Math.PI * 2 - Math.PI / 2;
        it.x = cx + Math.cos(a) * r;
        it.y = cy + Math.sin(a) * r;
      });
    });
    return items;
  };

  const tooltipHtml = (p) => {
    const t = TYPES[p.type];
    const spec = [p.voltage, p.capacity].filter(Boolean).join(' · ');
    return `
      <div class="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-navy-500 uppercase">
        <span class="size-2 rounded-full" style="background:${t.color}"></span>${t.long}
      </div>
      <p class="mt-1.5 font-display text-base leading-snug font-semibold text-navy-900">${esc(p.name)}</p>
      <p class="mt-1 text-sm text-navy-600">${esc(p.client)}</p>
      <div class="mt-2 flex items-center justify-between gap-4 text-sm">
        <span class="text-navy-500">${esc(p.location)}</span>
        ${spec ? `<span class="shrink-0 font-mono text-xs font-medium text-navy-900">${esc(spec)}</span>` : ''}
      </div>
      <p class="mt-2 text-xs font-medium ${p.status === 'devam' ? 'text-amber-600' : 'text-emerald-600'}">${STATUS[p.status].label}</p>`;
  };

  // Pan & zoom for the map stage: drag / two-finger pinch / Ctrl+wheel / double-click / buttons.
  // The canvas is transformed with CSS; markers counter-scale via --k so they keep their size.
  const COUNTRY_IDS = { Türkiye: '792', Irak: '368', Gürcistan: '268' };
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  const createZoom = (stage, onChange) => {
    let canvas = null;
    let cw = 1;
    let ch = 1;
    let focus = null;
    let k = 1;
    let x = 0;
    let y = 0;
    const size = () => [stage.clientWidth, stage.clientHeight];
    const minK = () => { const [w, h] = size(); return Math.min(w / cw, h / ch); };
    const maxK = () => Math.max(minK(), 1) * 8;

    const apply = () => {
      if (!canvas) return;
      const [w, h] = size();
      k = Math.min(Math.max(k, minK()), maxK());
      const sw = cw * k;
      const sh = ch * k;
      x = sw <= w ? (w - sw) / 2 : Math.min(0, Math.max(w - sw, x));
      y = sh <= h ? (h - sh) / 2 : Math.min(0, Math.max(h - sh, y));
      canvas.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
      canvas.style.setProperty('--k', k);
      onChange?.();
    };
    const fit = () => {
      const [w, h] = size();
      if (focus) {
        const [fx, fy, fw, fh] = focus;
        k = Math.min(w / fw, h / fh);
        x = w / 2 - (fx + fw / 2) * k;
        y = h / 2 - (fy + fh / 2) * k;
      } else {
        k = minK();
      }
      apply();
    };
    const zoomAt = (px, py, factor) => {
      const nk = Math.min(Math.max(k * factor, minK()), maxK());
      x = px - (px - x) * (nk / k);
      y = py - (py - y) * (nk / k);
      k = nk;
      apply();
    };
    const local = (e) => { const r = stage.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

    // Pointer gestures
    const pts = new Map();
    let pinch = null;
    let moved = false;
    let travel = 0;
    let swallowClickUntil = 0;
    stage.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('[data-zoom-ui]')) return;
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pts.size === 1) { moved = false; travel = 0; }
    });
    stage.addEventListener('pointermove', (e) => {
      const prev = pts.get(e.pointerId);
      if (!prev) return;
      const cur = [e.clientX, e.clientY];
      pts.set(e.pointerId, cur);
      if (pts.size === 1) {
        const dx = cur[0] - prev[0];
        const dy = cur[1] - prev[1];
        travel += Math.abs(dx) + Math.abs(dy);
        if (!moved && travel > 6) {
          moved = true;
          stage.dataset.dragging = 'true';
          try { stage.setPointerCapture(e.pointerId); } catch { /* pointer already released */ }
        }
        if (moved) { x += dx; y += dy; apply(); }
      } else if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        const r = stage.getBoundingClientRect();
        const mid = [(a[0] + b[0]) / 2 - r.left, (a[1] + b[1]) / 2 - r.top];
        const dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pinch) {
          x += mid[0] - pinch.mid[0];
          y += mid[1] - pinch.mid[1];
          zoomAt(mid[0], mid[1], dist / pinch.dist);
        }
        pinch = { mid, dist };
        moved = true;
        stage.dataset.zoomed = 'true';
      }
    });
    const end = (e) => {
      if (!pts.delete(e.pointerId)) return;
      if (pts.size < 2) pinch = null;
      if (!pts.size) {
        delete stage.dataset.dragging;
        // The click the browser fires right after a drag must not open a marker
        if (moved) swallowClickUntil = performance.now() + 350;
        moved = false;
      }
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('click', (e) => {
      if (performance.now() < swallowClickUntil && !e.target.closest('[data-zoom-ui]')) {
        e.stopPropagation();
        e.preventDefault();
      }
      swallowClickUntil = 0;
    }, true);

    stage.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey) return; // plain wheel keeps scrolling the page
      e.preventDefault();
      const [px, py] = local(e);
      zoomAt(px, py, Math.exp(-e.deltaY * 0.004));
      stage.dataset.zoomed = 'true';
    }, { passive: false });
    stage.addEventListener('dblclick', (e) => {
      if (e.target.closest('[data-zoom-ui]')) return;
      const [px, py] = local(e);
      zoomAt(px, py, 2);
      stage.dataset.zoomed = 'true';
    });

    return {
      mount(c, w, h, f) { canvas = c; cw = w; ch = h; focus = f; fit(); },
      zoomBy(f) { const [w, h] = size(); zoomAt(w / 2, h / 2, f); stage.dataset.zoomed = 'true'; },
      fit,
    };
  };

  const zoomUi = (dark) => {
    const btn = `grid size-8 place-items-center transition sm:size-9 ${dark ? 'text-white hover:bg-white/10' : 'text-navy-700 hover:bg-navy-50'}`;
    return `
      <div data-zoom-ui class="absolute right-2 bottom-2 z-[5] flex overflow-hidden rounded-xl shadow-lg ring-1 backdrop-blur sm:right-3 sm:bottom-3 ${dark ? 'bg-navy-900/80 ring-white/10' : 'bg-white/95 ring-navy-900/10'}">
        <button type="button" class="${btn}" data-zoom="out" aria-label="Uzaklaştır">${icon('minus', 'icon size-4')}</button>
        <button type="button" class="${btn} border-x ${dark ? 'border-white/10' : 'border-navy-100'}" data-zoom="in" aria-label="Yakınlaştır">${icon('plus', 'icon size-4')}</button>
        <button type="button" class="${btn}" data-zoom="reset" aria-label="Görünümü sıfırla">${icon('scan', 'icon size-4')}</button>
      </div>
      <p data-zoom-ui class="pointer-events-none absolute top-2 left-2 z-[5] rounded-full px-3 py-1 text-[11px] font-medium transition-opacity duration-500 sm:top-3 sm:left-3 ${dark ? 'bg-navy-900/70 text-navy-200' : 'bg-white/90 text-navy-500'}" data-zoom-hint>
        ${coarse ? 'İki parmakla yakınlaştırın' : 'Ctrl + tekerlek ile yakınlaştırın, sürükleyerek gezinin'}
      </p>`;
  };

  document.querySelectorAll('[data-project-map]').forEach((root) => {
    const stage = root.querySelector('[data-map-stage]');
    const tooltip = root.querySelector('[data-map-tooltip]');
    const viewButtons = root.querySelectorAll('[data-map-view]');
    const dark = root.classList.contains('map-dark');
    const views = { tr: 'assets/maps/turkiye.svg', world: 'assets/maps/dunya.svg' };
    let view = root.dataset.view || 'tr';
    let current = projects.filter(matches);
    let token = 0;

    stage.classList.add('overflow-hidden', 'touch-pan-y', 'select-none', 'rounded-2xl', 'cursor-grab', 'data-[dragging=true]:cursor-grabbing');

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
    const zoom = createZoom(stage, hideTooltip);

    const place = (x, y, P) => `left:${(x / P.width) * 100}%;top:${(y / P.height) * 100}%;scale:calc(1 / var(--k, 1))`;
    const markerHtml = (p, x, y, P) => `
      <button type="button" class="map-marker group/m absolute -translate-x-1/2 -translate-y-1/2 p-1 focus:outline-none sm:p-1.5" style="${place(x, y, P)}" data-id="${p.id}" aria-label="${esc(p.name)} — ${esc(p.client)}">
        ${p.status === 'devam' ? `<span class="absolute inset-1 rounded-full animate-ping-slow sm:inset-1.5" style="background:${TYPES[p.type].color}"></span>` : ''}
        <span class="relative block size-2.5 rounded-full ring-2 ring-white shadow-md transition-transform duration-300 group-hover/m:scale-150 group-focus-visible/m:scale-150 sm:size-3.5 sm:ring-[2.5px]" style="background:${TYPES[p.type].color}"></span>
      </button>`;

    let lastWidth = 0;
    const draw = async () => {
      const mine = ++token;
      const markup = await loadSvg(views[view]);
      if (mine !== token) return;

      const wide = window.matchMedia('(min-width: 640px)').matches;
      stage.style.aspectRatio = view === 'tr' ? (wide ? '1000 / 440' : '16 / 10') : wide ? '16 / 9' : '1 / 1';
      stage.innerHTML = `<div class="map-canvas absolute top-0 left-0 origin-top-left">${markup}</div>${zoomUi(dark)}`;
      const canvas = stage.firstElementChild;
      const svg = canvas.querySelector('svg');
      svg.classList.add('block', 'h-auto', 'w-full');
      const P = projector(svg);
      const layer = document.createElement('div');
      layer.className = 'absolute inset-0';
      canvas.appendChild(layer);

      const located = current.filter((p) => p.points);
      if (view === 'tr') {
        const local = located.filter((p) => p.country === HOME);
        const provinces = new Set(current.flatMap((p) => p.provinces));
        svg.querySelectorAll('[data-il]').forEach((path) => path.classList.toggle('is-active', provinces.has(path.dataset.il)));
        const items = local.flatMap((p) => p.points.map(([la, lo]) => { const [x, y] = P.xy(la, lo); return { p, x, y }; }));
        layer.innerHTML = spread(items, 9).map(({ p, x, y }) => markerHtml(p, x, y, P)).join('');
      } else {
        const abroad = located.filter((p) => p.country !== HOME);
        const home = current.filter((p) => p.country === HOME);
        const active = new Set(current.map((p) => COUNTRY_IDS[p.country]));
        svg.querySelectorAll('[data-country]').forEach((path) => path.classList.toggle('is-active', active.has(path.dataset.country)));
        const items = abroad.flatMap((p) => p.points.map(([la, lo]) => { const [x, y] = P.xy(la, lo); return { p, x, y }; }));
        const [hx, hy] = P.xy(39, 35);
        layer.innerHTML =
          spread(items, 6).map(({ p, x, y }) => markerHtml(p, x, y, P)).join('') +
          (home.length
            ? `<button type="button" class="absolute -translate-x-1/2 -translate-y-1/2" style="${place(hx, hy, P)}" data-home aria-label="Türkiye — ${home.length} proje, Türkiye haritasını aç">
                 <span class="absolute inset-2 rounded-full bg-brand-400 animate-ping-slow"></span>
                 <span class="relative grid size-11 place-items-center rounded-full bg-brand-500 font-display text-sm font-bold text-white shadow-lg ring-4 ring-white/80">${home.length}</span>
               </button>`
            : '');
      }

      const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
      layer.querySelectorAll('.map-marker').forEach((m) => {
        const open = () => showTooltip(m, tooltipHtml(byId[m.dataset.id]));
        m.addEventListener('mouseenter', open);
        m.addEventListener('focus', open);
        m.addEventListener('click', open);
        m.addEventListener('mouseleave', hideTooltip);
        m.addEventListener('blur', hideTooltip);
      });
      layer.querySelector('[data-home]')?.addEventListener('click', () => setView('tr'));

      stage.querySelectorAll('[data-zoom]').forEach((b) =>
        b.addEventListener('click', () => {
          if (b.dataset.zoom === 'reset') zoom.fit();
          else zoom.zoomBy(b.dataset.zoom === 'in' ? 1.6 : 1 / 1.6);
        }),
      );

      const width = stage.clientWidth;
      lastWidth = width;
      canvas.style.width = `${width}px`;
      const focusAttr = svg.dataset.focus?.split(' ').map(Number);
      const scale = width / P.width;
      zoom.mount(canvas, width, width * (P.height / P.width), focusAttr ? focusAttr.map((v) => v * scale) : null);
    };

    // Re-fit when the stage width changes (rotation, window resize)
    new ResizeObserver(() => {
      if (stage.clientWidth && Math.abs(stage.clientWidth - lastWidth) > 1) draw();
    }).observe(stage);

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
