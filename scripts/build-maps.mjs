// Generates the static SVG maps used on the projects section.
// Projection parameters are written to data-* attributes so the browser can
// place project markers with the same math (see assets/js/projects.js).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { geoMercator } from 'd3-geo';
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

// --- Bölge (countries, Mercator) --------------------------------------------
// Europe, the Middle East and Central Asia — where the projects are. The browser
// opens it zoomed on Eastern Europe / Türkiye / the Caucasus / the Middle East
// (data-focus) and lets the visitor zoom and pan from there.
{
  const topo = JSON.parse(readFileSync(`${root}node_modules/world-atlas/countries-50m.json`, 'utf8'));
  const countries = feature(topo, topo.objects.countries).features;

  const W = 1600;
  const extent = { west: -12, east: 82, south: 8, north: 66 };
  const focus = { west: 17, east: 58, south: 27, north: 52 };
  const corners = { type: 'MultiPoint', coordinates: [[extent.west, extent.south], [extent.east, extent.north]] };
  const fit = geoMercator().fitWidth(W, corners);
  const [, yTop] = fit([extent.west, extent.north]);
  const [, yBottom] = fit([extent.west, extent.south]);
  const H = Math.round(yBottom - yTop);
  const proj = geoMercator().scale(fit.scale()).translate([fit.translate()[0], fit.translate()[1] - yTop]).clipExtent([[0, 0], [W, H]]);
  const [tx, ty] = proj.translate();
  const k = proj.scale();

  // Stream the clipped geometry and decimate points closer than 0.6 units
  const pathOf = (f) => {
    let d = '';
    let ring = [];
    const flush = () => {
      // Skip islets smaller than ~3 units; they add weight but are invisible at this scale
      const xs = ring.map((p) => p[0]);
      const ys = ring.map((p) => p[1]);
      const big = Math.max(...xs) - Math.min(...xs) > 3 || Math.max(...ys) - Math.min(...ys) > 3;
      if (ring.length >= 3 && big) d += 'M' + ring.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L') + 'Z';
      ring = [];
    };
    const stream = proj.stream({
      point(x, y) {
        const last = ring[ring.length - 1];
        if (!last || Math.hypot(x - last[0], y - last[1]) >= 1.4) ring.push([x, y]);
      },
      lineStart() { ring = []; },
      lineEnd: flush,
      polygonStart() {},
      polygonEnd() {},
      sphere() {},
    });
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) {
      stream.polygonStart();
      for (const r of poly) {
        stream.lineStart();
        for (const c of r.slice(0, -1)) stream.point(c[0], c[1]);
        stream.lineEnd();
      }
      stream.polygonEnd();
    }
    return d;
  };

  const [fx0, fy0] = proj([focus.west, focus.north]);
  const [fx1, fy1] = proj([focus.east, focus.south]);
  const paths = countries
    .map((f) => [f, pathOf(f)])
    .filter(([, d]) => d)
    .map(([f, d]) => `<path data-country="${f.id}" d="${d}"/>`)
    .join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" data-projection="mercator" data-k="${k.toFixed(4)}" data-tx="${tx.toFixed(4)}" data-ty="${ty.toFixed(4)}" data-focus="${r1(fx0)} ${r1(fy0)} ${r1(fx1 - fx0)} ${r1(fy1 - fy0)}" role="img" aria-label="Avrupa, Orta Doğu ve Asya haritası">
<g class="map-provinces">
${paths}
</g>
</svg>
`;
  writeFileSync(`${outDir}/dunya.svg`, svg);
  console.log(`dunya.svg    ${(svg.length / 1024).toFixed(1)} KB`);
}
