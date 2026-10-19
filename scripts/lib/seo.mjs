// SEO output for the static pages, driven by data/seo.json and the project data:
// <head> meta (title, description, canonical, Open Graph, X), JSON-LD graph,
// visible FAQ blocks, crawlable project tables and pre-filled figures.
import { readFileSync } from 'node:fs';
import { loadProjects, projectStats, num } from './projects.mjs';

const root = new URL('../..', import.meta.url).pathname;
const seo = JSON.parse(readFileSync(`${root}data/seo.json`, 'utf8'));
const projects = loadProjects();
const stats = projectStats(projects);
const { site } = seo;

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (t) => t.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in stats ? num(stats[k]) : m));
const abs = (path) => `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
export const pageUrl = (key) => (key === 'index' ? `${site.url}/` : `${site.url}/${key}.html`);
export const pages = seo.sayfalar;

// --- JSON-LD -----------------------------------------------------------------
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

function organization() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.alternateName,
    url: `${site.url}/`,
    logo: { '@type': 'ImageObject', url: abs(site.logo), width: 512, height: 512 },
    image: abs(site.image),
    description: site.description,
    slogan: site.slogan,
    email: site.email,
    address: { '@type': 'PostalAddress', ...site.address },
    geo: { '@type': 'GeoCoordinates', ...site.geo },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Country', name })),
    knowsAbout: site.knowsAbout,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hizmetlerimiz',
      itemListElement: seo.hizmetler.map((h) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: h.ad,
          url: h.bolum ? `${pageUrl(h.sayfa)}#${h.bolum}` : pageUrl(h.sayfa),
        },
      })),
    },
  };
}

function graph(key) {
  const p = pages[key];
  const url = pageUrl(key);
  const nodes = [
    organization(),
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: `${site.url}/`,
      name: site.name,
      alternateName: site.alternateName,
      inLanguage: 'tr-TR',
      publisher: { '@id': ORG_ID },
    },
  ];

  const webpage = {
    '@type': p.type || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: fill(p.title),
    description: fill(p.description),
    inLanguage: 'tr-TR',
    isPartOf: { '@id': SITE_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(p.image || site.image) },
  };
  if (p.home) webpage.about = { '@id': ORG_ID };
  nodes.push(webpage);

  if (p.breadcrumb) {
    const items = [['Ana Sayfa', 'index'], ...p.breadcrumb.filter(([, k]) => k)];
    webpage.breadcrumb = { '@id': `${url}#breadcrumb` };
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: items.map(([name, k], i) => ({ '@type': 'ListItem', position: i + 1, name, item: pageUrl(k) })),
    });
  }

  if (p.service) {
    const s = p.service;
    nodes.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      url,
      provider: { '@id': ORG_ID },
      areaServed: site.areaServed.map((name) => ({ '@type': 'Country', name })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: s.name,
        itemListElement: s.kapsam.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
      },
    });
    webpage.mainEntity = { '@id': `${url}#service` };
  }

  if (p.faq) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      inLanguage: 'tr-TR',
      isPartOf: { '@id': SITE_ID },
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
  }

  if (p.job) {
    nodes.push({
      '@type': 'JobPosting',
      '@id': `${url}#job`,
      title: p.job.title,
      description: p.job.description,
      datePosted: p.job.datePosted,
      url,
      hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: `${site.url}/`, logo: abs(site.logo) },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', ...site.address } },
      industry: 'Enerji mühendisliği',
      occupationalCategory: 'Elektrik Mühendisi',
    });
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function headFor(key) {
  const p = pages[key];
  if (!p) throw new Error(`data/seo.json: "${key}" sayfası tanımlı değil`);
  const url = pageUrl(key);
  const title = fill(p.title);
  const description = fill(p.description);
  const image = abs(p.image || site.image);
  const imageAlt = p.image ? title : site.imageAlt;
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`,
  ];
  if (!p.noindex) {
    lines.push(
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" hreflang="tr" href="${url}" />`,
      `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    );
  }
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  );
  if (!p.noindex) {
    const json = JSON.stringify(graph(key), null, 2).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">\n${json}\n</script>`);
  }
  return lines.join('\n');
}

// --- Visible FAQ -------------------------------------------------------------
export function faqFor(key) {
  const faq = pages[key]?.faq;
  if (!faq) return '';
  return faq
    .map(
      ([q, a]) => `<details class="group rounded-2xl bg-white ring-1 ring-navy-900/5 transition open:shadow-xl open:shadow-navy-900/5" data-reveal>
  <summary class="flex cursor-pointer list-none items-start justify-between gap-6 p-6 [&::-webkit-details-marker]:hidden">
    <h3 class="text-lg leading-snug font-semibold">${esc(q)}</h3>
    <span class="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 transition group-open:rotate-45 group-open:bg-brand-500 group-open:text-white"><svg class="icon size-4"><use href="#i-plus" /></svg></span>
  </summary>
  <div class="px-6 pb-6 text-[15px] leading-relaxed text-navy-600"><p>${esc(a)}</p></div>
</details>`,
    )
    .join('\n');
}

// --- Crawlable project tables -------------------------------------------------
const TYPE_ORDER = ['TM', 'RES', 'GES', 'HES', 'EIH'];
const TYPE_NAMES = { TM: 'Trafo Merkezleri (TM)', RES: 'Rüzgar Enerji Santralleri (RES)', GES: 'Güneş Enerji Santralleri (GES)', HES: 'Hidroelektrik Santraller (HES)', EIH: 'Enerji İletim Hatları (EİH)' };
const STATUS = {
  tamamlandi: ['Tamamlandı', 'bg-emerald-50 text-emerald-700 ring-emerald-600/15'],
  devam: ['Devam Ediyor', 'bg-amber-50 text-amber-700 ring-amber-600/20'],
};
const maxKv = (p) => Math.max(0, ...((p.voltage || '').match(/[\d.]+/g) || ['0']).map(Number));
const bySize = (a, b) => (b.mw || 0) - (a.mw || 0) || maxKv(b) - maxKv(a) || a.name.localeCompare(b.name, 'tr');

function table(list, caption) {
  const rows = [...list].sort(bySize).map((p) => {
    const [label, cls] = STATUS[p.status];
    const spec = [p.voltage, p.capacity].filter(Boolean).join(' · ') || '—';
    return `<tr>
  <th scope="row" class="px-5 py-4 font-normal"><span class="block font-semibold text-navy-900">${esc(p.name)}</span><span class="mt-0.5 block text-xs text-navy-500">${esc(p.scope)}</span></th>
  <td class="px-5 py-4 text-navy-700">${esc(p.client)}</td>
  <td class="px-5 py-4 text-navy-600">${esc(p.location)}</td>
  <td class="px-5 py-4 font-mono text-xs whitespace-nowrap text-navy-800">${esc(spec)}</td>
  <td class="px-5 py-4"><span class="rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ring-1 ${cls}">${label}</span></td>
</tr>`;
  });
  return `<div class="overflow-x-auto rounded-2xl bg-white ring-1 ring-navy-900/8">
<table class="w-full min-w-[720px] text-left text-sm">
<caption class="sr-only">${esc(caption)}</caption>
<thead class="bg-navy-50 font-mono text-[11px] tracking-widest text-navy-500 uppercase">
<tr><th scope="col" class="px-5 py-3 font-medium">Proje</th><th scope="col" class="px-5 py-3 font-medium">Müşteri</th><th scope="col" class="px-5 py-3 font-medium">Konum</th><th scope="col" class="px-5 py-3 font-medium">Gerilim / Güç</th><th scope="col" class="px-5 py-3 font-medium">Durum</th></tr>
</thead>
<tbody class="divide-y divide-navy-100">
${rows.join('\n')}
</tbody>
</table>
</div>`;
}

export function projectTable(type) {
  if (type === 'all') {
    return TYPE_ORDER.map((t, i) => {
      const list = projects.filter((p) => p.type === t);
      if (!list.length) return '';
      return `<details class="group"${i === 0 ? ' open' : ''}>
<summary class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 ring-1 ring-navy-900/8 transition hover:ring-navy-900/15 [&::-webkit-details-marker]:hidden">
  <h3 class="text-lg font-semibold">${TYPE_NAMES[t]} <span class="ml-2 font-mono text-sm font-normal text-navy-400">${list.length} proje</span></h3>
  <svg class="icon size-5 text-navy-400 transition group-open:rotate-180"><use href="#i-chevron-down" /></svg>
</summary>
<div class="mt-3">
${table(list, `${TYPE_NAMES[t]} referans projeleri`)}
</div>
</details>`;
    })
      .filter(Boolean)
      .join('\n');
  }
  const list = projects.filter((p) => p.types.includes(type));
  return list.length ? table(list, `${TYPE_NAMES[type]} referans projeleri`) : '';
}

// --- Figures written straight into the HTML (JS animates them afterwards) -------
const STAT_KEYS = {
  'mw-total': 'mw', count: 'projects', 'count-done': 'done', substations: 'substations', provinces: 'provinces', countries: 'countries',
  'mw-GES': 'mwGES', 'mw-RES': 'mwRES', 'mw-HES': 'mwHES', 'count-TM': 'countTM', 'count-RES': 'countRES', 'count-GES': 'countGES', 'count-HES': 'countHES',
};
export function fillStats(html) {
  return html.replace(/(<[a-z]+\b[^>]*\sdata-project-stat="([\w-]+)"[^>]*>)[^<]*(<\/)/g, (m, open, key, close) => {
    if (key === 'count-ongoing') return `${open}${num(stats.projects - stats.done)}${close}`;
    const k = STAT_KEYS[key];
    return k ? `${open}${num(stats[k])}${close}` : m;
  });
}

export { stats };
