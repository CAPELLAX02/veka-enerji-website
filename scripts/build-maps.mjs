// Generates the static SVG maps used on the projects section.
// Projection parameters are written to data-* attributes so the browser can
// place project markers with the same math (see assets/js/map.js).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { geoMercator, geoEquirectangular, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';

const root = new URL('..', import.meta.url).pathname;
const outDir = `${root}assets/maps`;
mkdirSync(outDir, { recursive: true });

const r1 = (n) => Math.round(n * 10) / 10;

// Projects every ring and drops points closer than `minDist` px to keep the
// markup light without visibly changing the outline.
function pathFor(geometry, project, minDist = 0.9) {
  const polys = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  let d = '';
  for (const poly of polys) {
    for (const ring of poly) {
      const pts = [];
      for (const c of ring) {
        const [x, y] = project(c);
        const last = pts[pts.length - 1];
        if (!last || Math.hypot(x - last[0], y - last[1]) >= minDist) pts.push([x, y]);
      }
      if (pts.length < 3) continue;
      d += 'M' + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L') + 'Z';
    }
  }
  return d;
}

// --- Türkiye (provinces, Mercator) -----------------------------------------
{
  const fc = JSON.parse(readFileSync(`${root}data/geo/tr-provinces.json`, 'utf8'));
  const W = 1000;
  const H = 440;
  const proj = geoMercator().fitExtent([[8, 8], [W - 8, H - 8]], fc);
  const [tx, ty] = proj.translate();
  const k = proj.scale();

  const paths = fc.features
    .map((f) => `<path data-il="${f.properties.name === 'Afyon' ? 'Afyonkarahisar' : f.properties.name}" d="${pathFor(f.geometry, proj)}"/>`)
    .join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" data-projection="mercator" data-k="${k.toFixed(4)}" data-tx="${tx.toFixed(4)}" data-ty="${ty.toFixed(4)}" role="img" aria-label="Türkiye haritası">
<g class="map-provinces">
${paths}
</g>
</svg>
`;
  writeFileSync(`${outDir}/turkiye.svg`, svg);
  console.log(`turkiye.svg  ${(svg.length / 1024).toFixed(1)} KB`);
}

// --- Dünya (dotted land, equirectangular) ----------------------------------
{
  const topo = JSON.parse(readFileSync(`${root}node_modules/world-atlas/countries-110m.json`, 'utf8'));
  const countries = feature(topo, topo.objects.countries).features.filter((f) => f.id !== '010');
  const turkey = countries.find((f) => f.id === '792');

  const W = 1000;
  const H = 480;
  const bounds = { type: 'MultiPoint', coordinates: [[-170, -56], [180, 80]] };
  const proj = geoEquirectangular().fitExtent([[0, 0], [W, H]], bounds);
  const [tx, ty] = proj.translate();
  const k = proj.scale();

  const step = 7.5;
  let dLand = '';
  let dTr = '';
  for (let y = step / 2; y < H; y += step) {
    for (let x = step / 2; x < W; x += step) {
      const p = proj.invert([x, y]);
      if (!p || p[0] > 180) continue;
      const hit = countries.some((f) => geoContains(f, p));
      if (!hit) continue;
      const seg = `M${r1(x)} ${r1(y)}h0`;
      if (geoContains(turkey, p)) dTr += seg;
      else dLand += seg;
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" data-projection="equirectangular" data-k="${k.toFixed(4)}" data-tx="${tx.toFixed(4)}" data-ty="${ty.toFixed(4)}" role="img" aria-label="Dünya haritası">
<path class="map-dots" d="${dLand}"/>
<path class="map-dots map-dots--home" d="${dTr}"/>
</svg>
`;
  writeFileSync(`${outDir}/dunya.svg`, svg);
  console.log(`dunya.svg    ${(svg.length / 1024).toFixed(1)} KB`);
}
