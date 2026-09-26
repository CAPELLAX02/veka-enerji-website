// Keeps the static pages in sync:
//  - injects partials/header.html and partials/footer.html between their markers
//  - marks the current page's nav links with aria-current="page"
//  - builds an inline Lucide sprite containing only the icons referenced as #i-<name>
//
// Pages stay plain, deployable HTML; this script only rewrites the marked regions.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), 'utf8');

const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
const header = read('partials/header.html');
const footer = read('partials/footer.html');

function region(html, name, content) {
  const re = new RegExp(`(<!-- @${name} -->)[\\s\\S]*?(<!-- /@${name} -->)`);
  if (!re.test(html)) return html;
  return html.replace(re, `$1\n${content.trim()}\n$2`);
}

function markActive(html, key) {
  return html.replace(/<(a|button)\b([^>]*?)\sdata-nav="([^"]+)"([^>]*)>/g, (m, tag, pre, keys, post) => {
    const clean = `${pre}${post}`.replace(/\saria-current="page"/g, '');
    const active = keys.split(' ').includes(key);
    return `<${tag}${clean} data-nav="${keys}"${active ? ' aria-current="page"' : ''}>`;
  });
}

// --- icon sprite ------------------------------------------------------------
const iconDir = join(root, 'node_modules/lucide-static/icons');
const scanFiles = [
  ...pages,
  'partials/header.html',
  'partials/footer.html',
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
  html = region(html, 'sprite', sprite);
  writeFileSync(join(root, page), html);
}

console.log(`${pages.length} pages, ${used.size} icons`);
