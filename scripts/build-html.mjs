// Keeps the static pages in sync:
//  - injects partials/header.html and partials/footer.html between their markers
//  - marks the current page's nav links with aria-current="page"
//  - builds an inline Lucide sprite containing only the icons referenced as #i-<name>
//  - renders the reference logos from data/referanslar.json
//
// Pages stay plain, deployable HTML; this script only rewrites the marked regions.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), 'utf8');

const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
const header = read('partials/header.html');
const footer = read('partials/footer.html');
const head = read('partials/head.html');

function region(html, name, content) {
  const re = new RegExp(`([ \\t]*)(<!-- @${name} -->)[\\s\\S]*?(<!-- /@${name} -->)`);
  return html.replace(re, (_, indent, open, close) => {
    const body = content.trim().split('\n').map((l) => (l ? indent + l : l)).join('\n');
    return `${indent}${open}\n${body}\n${indent}${close}`;
  });
}

function markActive(html, key) {
  return html.replace(/<(a|button)\b([^>]*?)\sdata-nav="([^"]+)"([^>]*)>/g, (m, tag, pre, keys, post) => {
    const clean = `${pre}${post}`.replace(/\saria-current="page"/g, '');
    const active = keys.split(' ').includes(key);
    return `<${tag}${clean} data-nav="${keys}"${active ? ' aria-current="page"' : ''}>`;
  });
}

// --- references -------------------------------------------------------------
const refs = JSON.parse(read('data/referanslar.json'));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const logoSrc = (file) => `assets/img/references/${file}`;

const firmTile = (r) => `<li class="group flex aspect-[3/2] flex-col items-center justify-center gap-4 rounded-3xl border border-navy-100 bg-white p-6 text-center transition hover:border-navy-200 hover:shadow-xl hover:shadow-navy-900/5" data-reveal>
  ${r.logo
    ? `<img src="${logoSrc(r.logo)}" alt="${esc(r.ad)}" class="${r.boy || 'max-h-10'} max-w-[75%] object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" loading="lazy" />
  <span class="text-xs font-medium text-navy-400 transition group-hover:text-navy-700">${esc(r.ad)}</span>`
    : `<span class="font-display text-lg leading-tight font-bold tracking-[0.14em] text-navy-400 uppercase transition group-hover:text-navy-900">${esc(r.ad)}</span>`}
</li>`;

const marqueeTile = (r) =>
  `<li class="grid h-24 w-48 shrink-0 place-items-center rounded-2xl border border-navy-100 px-8"><img src="${logoSrc(r.logo)}" alt="${esc(r.ad)}" class="${r.boy || 'max-h-10'} max-w-full object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" /></li>`;

const publicTile = (r) => `<li class="card-lift flex flex-col items-center rounded-[2rem] bg-white p-10 text-center ring-1 ring-navy-900/5" data-reveal>
  <div class="grid h-24 place-items-center">${r.logo
    ? `<img src="${logoSrc(r.logo)}" alt="${esc(r.aciklama)}" class="h-20 w-auto max-w-full object-contain" loading="lazy" />`
    : `<span class="font-display text-4xl font-bold tracking-[0.14em] text-navy-800">${esc(r.ad)}</span>`}</div>
  <h3 class="mt-8 text-lg font-semibold">${esc(r.ad)}</h3>
  <p class="mt-1 text-sm text-navy-500">${esc(r.aciklama)}</p>
</li>`;

const refRegions = {
  'refs-firms': refs.firmalar.map(firmTile).join('\n'),
  'refs-public': refs.kurumlar.map(publicTile).join('\n'),
  'refs-marquee': refs.firmalar.filter((r) => r.logo).slice(0, refs.bantAdedi).map(marqueeTile).join('\n'),
};

// --- icon sprite ------------------------------------------------------------
const iconDir = join(root, 'node_modules/lucide-static/icons');
const scanFiles = [
  ...pages,
  'partials/header.html',
  'partials/footer.html',
  'partials/head.html',
  ...readdirSync(join(root, 'assets/js')).map((f) => `assets/js/${f}`),
];
const used = new Set();
for (const f of scanFiles) {
  for (const m of read(f).matchAll(/#i-([a-z0-9-]+)/g)) used.add(m[1]);
}
const symbols = [...used].sort().map((name) => {
  const file = join(iconDir, `${name}.svg`);
  if (!existsSync(file)) throw new Error(`Unknown Lucide icon: ${name}`);
  const inner = readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s*\n\s*/g, '');
  return `<symbol id="i-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
});
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true">${symbols.join('')}</svg>`;

// --- pages ------------------------------------------------------------------
for (const page of pages) {
  const key = basename(page, '.html');
  let html = read(page);
  html = region(html, 'header', markActive(header, key));
  html = region(html, 'footer', footer);
  html = region(html, 'head', head);
  html = region(html, 'sprite', sprite);
  for (const [name, content] of Object.entries(refRegions)) html = region(html, name, content);
  writeFileSync(join(root, page), html);
}

console.log(`${pages.length} pages, ${used.size} icons`);
