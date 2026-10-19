// Builds assets/js/projects-data.js from data/projeler.json.
//
// data/projeler.json is the single source of truth for the project list (same
// columns as the reference spreadsheet). Edit it, then run `npm run build`.
import { writeFileSync } from 'node:fs';
import { loadProjects, projectStats, num } from './lib/projects.mjs';

const root = new URL('..', import.meta.url).pathname;
const projects = loadProjects();

const banner = `/*
 * Bu dosya data/projeler.json dosyasından otomatik üretilir (scripts/build-projects.mjs).
 * Elle düzenlemeyin — data/projeler.json'u güncelleyip \`npm run build\` çalıştırın.
 */
`;
writeFileSync(`${root}assets/js/projects-data.js`, `${banner}window.VEKA_PROJECTS = ${JSON.stringify(projects, null, 1)};\n`);

const s = projectStats(projects);
console.log(
  `${s.projects} projects, ${num(s.mw)} MW confirmed, ${s.substations} substations, ` +
    `${projects.filter((p) => !p.points).length} without map position`,
);
