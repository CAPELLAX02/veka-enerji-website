// Appends a content hash to local CSS/JS references (styles.css?v=1a2b3c4d) so
// long browser caching (.htaccess) never serves a stale file after a deploy.
// Runs last in `npm run build`, after the CSS is compiled.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const hashes = new Map();
const hashOf = (path) => {
  if (!hashes.has(path)) hashes.set(path, createHash('sha1').update(readFileSync(join(root, path))).digest('hex').slice(0, 8));
  return hashes.get(path);
};

const pages = readdirSync(root).filter((f) => f.endsWith('.html'));
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  const out = html.replace(/((?:href|src)=")(assets\/(?:css|js)\/[\w.-]+\.(?:css|js))(?:\?v=[\da-f]+)?"/g, (m, attr, path) => `${attr}${path}?v=${hashOf(path)}"`);
  if (out !== html) writeFileSync(join(root, page), out);
}
console.log(`stamped ${hashes.size} assets in ${pages.length} pages`);
