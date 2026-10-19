// Shared project data transform: data/projeler.json → the shape used on the site.
// Used by scripts/build-projects.mjs (browser data file) and scripts/build-html.mjs
// (static, crawlable project tables and figures).
import { readFileSync } from 'node:fs';

const root = new URL('../..', import.meta.url).pathname;

// Capacity (MW) is published only when it comes from a confirmed source.
// "Olası eşleşme" rows were matched to public data by name and still need
// confirmation — add it here once those values are checked.
const CONFIRMED_SOURCES = new Set(['Enerji Atlası', 'Diğer kaynak', 'Firma bilgisi']);

const TYPE_KEYS = { TM: 'TM', RES: 'RES', GES: 'GES', HES: 'HES', ENH: 'EIH', EIH: 'EIH', 'EİH': 'EIH' };
const STATUS_KEYS = { Tamamlanan: 'tamamlandi', 'Devam Eden': 'devam' };

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

export function loadProjects() {
    const source = JSON.parse(readFileSync(`${root}data/projeler.json`, 'utf8'));
    return source.map((p) => {
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
}

export const num = (n) => n.toLocaleString('tr-TR', { maximumFractionDigits: 1 });

// Site-wide figures (also used in titles and descriptions)
export function projectStats(projects) {
  const counted = projects.filter((p) => p.countMw);
  const mw = (list) => list.reduce((s, p) => s + p.mw, 0);
  const stats = {
    projects: projects.length,
    mw: Math.round(mw(counted)),
    substations: projects.reduce((s, p) => s + p.substations, 0),
    provinces: new Set(projects.flatMap((p) => p.provinces)).size,
    countries: new Set(projects.map((p) => p.country)).size,
    done: projects.filter((p) => p.status === 'tamamlandi').length,
  };
  for (const t of ['TM', 'RES', 'GES', 'HES', 'EIH']) {
    stats[`count${t}`] = projects.filter((p) => p.types.includes(t)).length;
    stats[`mw${t}`] = Math.round(mw(counted.filter((p) => p.plant === t)));
  }
  return stats;
}
