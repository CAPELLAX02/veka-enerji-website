// Builds assets/js/projects-data.js from data/projeler.json.
//
// data/projeler.json is the single source of truth for the project list (same
// columns as the reference spreadsheet). Edit it, then run `npm run build`.
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const source = JSON.parse(readFileSync(`${root}data/projeler.json`, 'utf8'));

// Capacity (MW) is published only when it comes from a confirmed source.
// "Olası eşleşme" rows were matched to public data by name and still need
// confirmation — add it here once those values are checked.
const CONFIRMED_SOURCES = new Set(['Enerji Atlası', 'Diğer kaynak', 'Firma bilgisi']);

const TYPE_KEYS = { TM: 'TM', RES: 'RES', GES: 'GES', HES: 'HES', ENH: 'EIH', EIH: 'EIH', 'EİH': 'EIH' };
const STATUS_KEYS = { Tamamlanan: 'tamamlandi', 'Devam Eden': 'devam' };

const num = (n) => n.toLocaleString('tr-TR', { maximumFractionDigits: 1 });
const stripCountry = (s) => s.replace(/\s*\((Irak|Gürcistan)\)\s*/g, '').trim();

function location(p) {
  const il = stripCountry(p.il || '');
  const ilce = (p.ilce || '').trim();
  const parts = [];
  if (ilce && ilce !== 'Merkez' && !il.includes('/')) parts.push(ilce);
  if (il && il !== p.ulke) parts.push(il);
  if (p.ulke !== 'Türkiye') parts.push(p.ulke);
  return parts.join(', ') || 'Türkiye';
}

function capacity(p) {
  if (!CONFIRMED_SOURCES.has(p.eslesme) || p.gucGosterme) return { mw: null, label: null };
  if (p.mwe != null) return { mw: p.mwe, label: `${num(p.mwe)} MW` };
  if (p.mwm != null) {
    const unit = /MWp/.test(p.ekBilgi || '') || /MWp/.test(p.not || '') ? 'MWp' : 'MWm';
    return { mw: p.mwm, label: `${num(p.mwm)} ${unit}` };
  }
  return { mw: null, label: null };
}

function detail(p, confirmed) {
  if (!p.ekBilgi) return null;
  // Extra info from public sources is shown only when the match is confirmed
  if (!confirmed && p.eslesme !== 'Bulunamadı') return null;
  const text = p.ekBilgi.replace(/MWp:\s*[\d.,]+\s*;?\s*/g, '').trim();
  if (/^[\d.,]+\s*ha$/.test(text)) return `Saha alanı: ${text}`;
  return text || null;
}

// Number of substations a row stands for (used for the "trafo merkezi" figure)
function substations(p) {
  const adet = (p.ekBilgi || '').match(/(\d+)\s*adet\s*TM/i);
  if (adet) return Number(adet[1]);
  return /\bTM\b|GIS|trafo merkez/i.test(`${p.baslik} ${p.kapsam}`) ? 1 : 0;
}

const projects = source.map((p) => {
  const type = TYPE_KEYS[p.kategori];
  const plant = TYPE_KEYS[p.santralTuru] || type;
  const status = STATUS_KEYS[p.durum];
  if (!type) throw new Error(`#${p.id}: bilinmeyen kategori "${p.kategori}"`);
  if (!status) throw new Error(`#${p.id}: bilinmeyen durum "${p.durum}"`);

  const cap = capacity(p);
  const tmCount = substations(p);
  return {
    id: p.id,
    name: p.baslik,
    client: p.musteri,
    type,
    // Plant projects that include substation work are listed under TM as well
    types: tmCount && type !== 'TM' ? [type, 'TM'] : [type],
    plant,
    status,
    location: location(p),
    country: p.ulke || 'Türkiye',
    provinces: p.ulke === 'Türkiye' && p.il ? p.il.split('/').map((s) => s.trim()) : [],
    points: p.konum || null,
    voltage: p.gerilimKv ? `${p.gerilimKv.replace(/\s*\/\s*/g, '/')} kV` : null,
    mw: cap.mw,
    capacity: cap.label,
    countMw: cap.mw != null && !p.ayniSantral,
    detail: detail(p, cap.mw != null),
    scope: p.kapsam,
    substations: tmCount,
  };
});

const banner = `/*
 * Bu dosya data/projeler.json dosyasından otomatik üretilir (scripts/build-projects.mjs).
 * Elle düzenlemeyin — data/projeler.json'u güncelleyip \`npm run build\` çalıştırın.
 */
`;
writeFileSync(`${root}assets/js/projects-data.js`, `${banner}window.VEKA_PROJECTS = ${JSON.stringify(projects, null, 1)};\n`);

const total = projects.filter((p) => p.countMw).reduce((s, p) => s + p.mw, 0);
console.log(
  `${projects.length} projects, ${num(total)} MW confirmed, ` +
    `${projects.reduce((s, p) => s + p.substations, 0)} substations, ` +
    `${projects.filter((p) => !p.points).length} without map position`,
);
