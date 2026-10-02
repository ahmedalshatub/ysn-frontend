#!/usr/bin/env node
/**
 * Rebrands this template for a new project: sets the application name and swaps
 * in new logos and favicons.
 *
 *   node Scripts/change-name-script/rename.mjs
 *
 * Non-interactive:
 *   node Scripts/change-name-script/rename.mjs --name "Acme Portal" --yes
 *   node Scripts/change-name-script/rename.mjs --name "Acme Portal" --name-ar "بوابة أكمي" --yes
 *
 * Drop the replacement images into Scripts/change-name-script/assets/ first.
 * Any you leave out are simply kept as they are.
 *
 * Safe to run more than once: every edit is anchored on the config KEY, never on
 * the previous value, so renaming twice works and never corrupts a file.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const APP = path.join(REPO_ROOT, 'YSN');
const ASSETS = path.join(SCRIPT_DIR, 'assets');
const LOCALES = path.join(APP, 'src', 'core', 'i18n', 'locales');
const LANGUAGES_TS = path.join(APP, 'src', 'core', 'i18n', 'languages.ts');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const skip = (m) => console.log(`  ${c.dim}skip ${m}${c.reset}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => console.error(`${c.red}Error:${c.reset} ${m}`);

/**
 * Where each replacement image belongs, relative to app/.
 *
 * The favicons and the manifest icons are served from the web root, so they
 * live in public/ rather than being imported through the bundler. Only the four
 * logos go through src/, because Logo.tsx resolves them with import.meta.url.
 */
const ASSET_MAP = {
  'logo-light-landscape.png': 'src/assets/images/logo-light-landscape.png',
  'logo-dark-landscape.png': 'src/assets/images/logo-dark-landscape.png',
  'logo-light-portrait.png': 'src/assets/images/logo-light-portrait.png',
  'logo-dark-portrait.png': 'src/assets/images/logo-dark-portrait.png',
  'favicon.ico': 'public/favicon.ico',
  'favicon-16x16.png': 'public/favicon-16x16.png',
  'favicon-32x32.png': 'public/favicon-32x32.png',
  'apple-touch-icon.png': 'public/apple-touch-icon.png',
  'logo192.png': 'public/logo192.png',
  'logo512.png': 'public/logo512.png',
  'logo.png': 'public/logo.png',
};

// ---------------------------------------------------------------- helpers ---

const readArg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
};

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => fs.writeFileSync(p, s, 'utf8');
const exists = (p) => fs.existsSync(p);

/** npm package names must be lowercase, no spaces. */
const slugify = (name) =>
  name.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'app';

/** Short name for the web manifest - first word, capped. */
const shortName = (name) => {
  const first = name.trim().split(/\s+/)[0] ?? name;
  return first.length > 12 ? first.slice(0, 12) : first;
};

const jsonStr = (v) => JSON.stringify(String(v));

/** Escapes text for HTML, so a name containing & or < cannot break the markup. */
const htmlEscape = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Escapes a value for a double-quoted TypeScript string literal. */
const tsStr = (v) => JSON.stringify(String(v));

/** Locale codes the app ships, taken from the files on disk. */
const localeCodes = () =>
  exists(LOCALES)
    ? fs.readdirSync(LOCALES).filter((f) => f.endsWith('.ts')).map((f) => f.replace(/\.ts$/, '')).sort()
    : [];

/** The default language, so the browser title and manifest use that name. */
const defaultLanguage = () => {
  if (!exists(LANGUAGES_TS)) return null;
  const m = read(LANGUAGES_TS).match(/export const DEFAULT_LANGUAGE = ["']([^"']+)["']/);
  return m ? m[1] : null;
};

// ------------------------------------------------------------- edit steps ---

/**
 * The application name users actually see.
 *
 * It is a translation key, not an environment variable: common.appName is read
 * in 60+ places (footers, navbars, auth screens), and it is per-language, so a
 * name can differ between English and Arabic.
 */
function updateLocaleNames(namesByCode) {
  for (const [code, name] of Object.entries(namesByCode)) {
    const p = path.join(LOCALES, `${code}.ts`);
    if (!exists(p)) { skip(`locales/${code}.ts (not found)`); continue; }

    const s = read(p);
    if (!/^ {6}appName: ".*",$/m.test(s)) {
      warn(`locales/${code}.ts has no common.appName - left alone`);
      continue;
    }

    write(p, s.replace(/^ {6}appName: ".*",$/m, `      appName: ${tsStr(name)},`));
    ok(`src/core/i18n/locales/${code}.ts  appName -> ${name}`);
  }
}

function updateEnvFiles(appName) {
  for (const file of ['.env', '.env.development', '.env.production']) {
    const p = path.join(APP, file);
    if (!exists(p)) { skip(`${file} (not found)`); continue; }

    let s = read(p);
    s = /^VITE_APP_NAME=.*$/m.test(s)
      ? s.replace(/^VITE_APP_NAME=.*$/m, `VITE_APP_NAME=${appName}`)
      : `VITE_APP_NAME=${appName}\n${s}`;

    write(p, s);
    ok(`app/${file}`);
  }
}

function updateIndexHtml(appName) {
  const p = path.join(APP, 'index.html');
  if (!exists(p)) return warn('app/index.html not found');

  const s = read(p);
  if (!/<title>[\s\S]*?<\/title>/.test(s)) return warn('app/index.html has no <title>');

  write(p, s.replace(/<title>[\s\S]*?<\/title>/, `<title>${htmlEscape(appName)}</title>`));
  ok('app/index.html  <title>');
}

function updatePackageJson(appName) {
  const p = path.join(APP, 'package.json');
  if (!exists(p)) return warn('app/package.json not found');

  const slug = slugify(appName);
  // Edited as text, not JSON.parse + stringify, so formatting and key order survive.
  const s = read(p);
  if (!/"name"\s*:\s*"[^"]*"/.test(s)) return warn('app/package.json has no "name"');

  write(p, s.replace(/"name"\s*:\s*"[^"]*"/, `"name": ${jsonStr(slug)}`));
  ok(`app/package.json  name -> ${slug}`);
}

function updateManifest(appName) {
  const p = path.join(APP, 'public', 'manifest.json');
  if (!exists(p)) return skip('public/manifest.json (not found)');

  let s = read(p);
  const short = shortName(appName);

  if (/"name"\s*:\s*"[^"]*"/.test(s)) s = s.replace(/"name"\s*:\s*"[^"]*"/, `"name": ${jsonStr(appName)}`);
  if (/"short_name"\s*:\s*"[^"]*"/.test(s)) s = s.replace(/"short_name"\s*:\s*"[^"]*"/, `"short_name": ${jsonStr(short)}`);
  if (/"description"\s*:\s*"[^"]*"/.test(s)) s = s.replace(/"description"\s*:\s*"[^"]*"/, `"description": ${jsonStr(appName)}`);

  write(p, s);
  ok(`app/public/manifest.json  name + short_name + description`);
}

function copyAssets() {
  if (!exists(ASSETS)) {
    warn(`no assets folder at ${path.relative(REPO_ROOT, ASSETS)} - images left unchanged`);
    return { copied: 0, missing: Object.keys(ASSET_MAP) };
  }

  let copied = 0;
  const missing = [];

  for (const [file, dest] of Object.entries(ASSET_MAP)) {
    const src = path.join(ASSETS, file);
    if (!exists(src)) { missing.push(file); continue; }

    const target = path.join(APP, dest);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(src, target);
    ok(`image  ${file} -> app/${dest}`);
    copied++;
  }

  return { copied, missing };
}

// -------------------------------------------------------------------- run ---

async function main() {
  console.log(`\n${c.bold}${c.cyan}Rename this template${c.reset}\n`);

  if (!exists(APP)) {
    fail(`could not find the app folder at ${APP}`);
    fail('run this from the repository root: node Scripts/change-name-script/rename.mjs');
    process.exit(1);
  }

  const codes = localeCodes();
  if (!codes.length) {
    fail(`no locale files found in ${path.relative(REPO_ROOT, LOCALES)}`);
    process.exit(1);
  }

  const primary = defaultLanguage() && codes.includes(defaultLanguage())
    ? defaultLanguage()
    : (codes.includes('en') ? 'en' : codes[0]);

  let appName = readArg('--name');
  const assumeYes = process.argv.includes('--yes') || process.argv.includes('-y');
  const namesByCode = {};
  for (const code of codes) {
    const supplied = readArg(`--name-${code}`);
    if (supplied) namesByCode[code] = supplied;
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    while (!appName || !appName.trim()) {
      appName = (await rl.question('Application name  (e.g. Acme Portal): ')).trim();
      if (!appName) fail('the application name cannot be empty');
    }

    // The name is a translation, so it can differ per language. Asking beats
    // writing a Latin name into the Arabic locale and calling it done.
    for (const code of codes) {
      if (namesByCode[code]) continue;
      if (assumeYes) { namesByCode[code] = appName; continue; }
      const answer = (await rl.question(`  name in "${code}" [${appName}]: `)).trim();
      namesByCode[code] = answer || appName;
    }

    console.log(`\n${c.bold}About to apply:${c.reset}`);
    for (const code of codes) {
      const mark = code === primary ? ` ${c.dim}(default language)${c.reset}` : '';
      console.log(`  name (${code.padEnd(5)})     : ${c.cyan}${namesByCode[code]}${c.reset}${mark}`);
    }
    console.log(`  browser title    : ${c.cyan}${namesByCode[primary]}${c.reset}`);
    console.log(`  package name     : ${c.cyan}${slugify(appName)}${c.reset}`);
    console.log(`  manifest short   : ${c.cyan}${shortName(namesByCode[primary])}${c.reset}`);

    const present = Object.keys(ASSET_MAP).filter((f) => exists(path.join(ASSETS, f)));
    console.log(`  images supplied  : ${c.cyan}${present.length}/${Object.keys(ASSET_MAP).length}${c.reset}`);

    if (!assumeYes) {
      const answer = (await rl.question('\nProceed? (y/N): ')).trim().toLowerCase();
      if (answer !== 'y' && answer !== 'yes') {
        console.log('\nCancelled. Nothing was changed.\n');
        process.exit(0);
      }
    }
  } finally {
    rl.close();
  }

  const titleName = namesByCode[primary];

  console.log(`\n${c.bold}Names${c.reset}`);
  updateLocaleNames(namesByCode);
  updateEnvFiles(appName);
  updateIndexHtml(titleName);
  updatePackageJson(appName);
  updateManifest(titleName);

  console.log(`\n${c.bold}Images${c.reset}`);
  const { copied, missing } = copyAssets();
  if (missing.length) {
    warn(`${missing.length} image(s) not supplied, left unchanged:`);
    missing.forEach((m) => console.log(`       ${c.dim}${m}${c.reset}`));
  }

  console.log(`\n${c.green}${c.bold}Done.${c.reset} ${copied} image(s) replaced.`);
  console.log(`${c.dim}Restart the dev server - Vite reads .env and public/ only at startup.${c.reset}\n`);
}

main().catch((err) => {
  fail(err?.message ?? String(err));
  process.exit(1);
});
