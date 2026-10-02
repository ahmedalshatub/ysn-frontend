#!/usr/bin/env node
/**
 * Adds a new language to the app.
 *
 *   node Scripts/add-system-language/add-language.mjs
 *
 * Non-interactive:
 *   node Scripts/add-system-language/add-language.mjs \
 *     --code ku --name Kurdish --native "کوردی" --dir rtl --from ar --yes
 *
 * It copies every translation value from a language you choose, so the new file
 * starts complete and the app never shows a raw key. You then translate the
 * values in place - the keys are already correct and in the right order.
 *
 * Two things change:
 *   app/src/core/i18n/locales/<code>.ts   created, copied from the source language
 *   app/src/core/i18n/languages.ts        one entry appended
 *
 * i18n/index.ts needs no edit: it discovers locale files automatically.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const APP = path.join(REPO_ROOT, 'YSN');
const I18N = path.join(APP, 'src', 'core', 'i18n');
const LOCALES = path.join(I18N, 'locales');
const REGISTRY = path.join(I18N, 'languages.ts');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => console.error(`${c.red}Error:${c.reset} ${m}`);

/** Languages written right-to-left, used to suggest a default direction. */
const RTL_CODES = new Set(['ar', 'he', 'fa', 'ur', 'ku', 'ps', 'sd', 'yi', 'dv']);

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => fs.writeFileSync(p, s, 'utf8');
const exists = (p) => fs.existsSync(p);

const readArg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
};

/** Locale codes already present, taken from the files on disk. */
const existingCodes = () =>
  fs.readdirSync(LOCALES)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.replace(/\.ts$/, ''))
    .sort();

/** Counts translation keys, as a sanity check that the copy is complete. */
const countKeys = (source) => (source.match(/^\s{4,}[A-Za-z0-9_]+:\s/gm) || []).length;

const isValidCode = (code) => /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(code);

async function main() {
  console.log(`\n${c.bold}${c.cyan}Add a language${c.reset}\n`);

  for (const [label, p] of [['app', APP], ['i18n/locales', LOCALES], ['i18n/languages.ts', REGISTRY]]) {
    if (!exists(p)) {
      fail(`could not find ${label} at ${p}`);
      fail('run this from the repository root');
      process.exit(1);
    }
  }

  const present = existingCodes();
  console.log(`  existing languages: ${c.cyan}${present.join(', ')}${c.reset}\n`);

  let code = readArg('--code');
  let name = readArg('--name');
  let native = readArg('--native');
  let dir = readArg('--dir');
  let from = readArg('--from');
  const assumeYes = process.argv.includes('--yes') || process.argv.includes('-y');

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    while (!code || !isValidCode(code) || present.includes(code)) {
      code = (await rl.question('Language code   (e.g. ku, fr, tr): ')).trim().toLowerCase();
      if (!isValidCode(code)) { fail('use an ISO code such as "fr", "ku" or "pt-BR"'); code = null; continue; }
      if (present.includes(code)) { fail(`"${code}" already exists`); code = null; }
    }

    while (!name || !name.trim()) {
      name = (await rl.question('English name    (e.g. Kurdish): ')).trim();
    }

    while (!native || !native.trim()) {
      native = (await rl.question(`Native name     (shown to users) [${name}]: `)).trim() || name;
    }

    if (!dir) {
      const suggested = RTL_CODES.has(code.split('-')[0]) ? 'rtl' : 'ltr';
      const answer = (await rl.question(`Text direction  (ltr/rtl) [${suggested}]: `)).trim().toLowerCase();
      dir = answer || suggested;
    }
    if (dir !== 'ltr' && dir !== 'rtl') {
      fail(`direction must be "ltr" or "rtl", got "${dir}"`);
      process.exit(1);
    }

    while (!from || !present.includes(from)) {
      const def = present.includes('en') ? 'en' : present[0];
      from = (await rl.question(`Copy values from (${present.join('/')}) [${def}]: `)).trim().toLowerCase() || def;
      if (!present.includes(from)) fail(`"${from}" is not an existing language`);
    }

    const sourceFile = path.join(LOCALES, `${from}.ts`);
    const keys = countKeys(read(sourceFile));

    console.log(`\n${c.bold}About to add:${c.reset}`);
    console.log(`  code            : ${c.cyan}${code}${c.reset}`);
    console.log(`  english name    : ${c.cyan}${name}${c.reset}`);
    console.log(`  native name     : ${c.cyan}${native}${c.reset}`);
    console.log(`  direction       : ${c.cyan}${dir}${c.reset}`);
    console.log(`  copied from     : ${c.cyan}${from}${c.reset} (${keys} keys)`);
    console.log(`  new file        : ${c.cyan}app/src/core/i18n/locales/${code}.ts${c.reset}`);

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

  console.log('');

  // ---- 1. the locale file, copied whole so no key can be missing ----
  const sourceFile = path.join(LOCALES, `${from}.ts`);
  const targetFile = path.join(LOCALES, `${code}.ts`);
  const banner =
    `// ${name} (${code}) - copied from "${from}" by Scripts/add-system-language.\n` +
    `// Every value below is still ${from.toUpperCase()}. Translate the values, leave the keys alone:\n` +
    `// a key missing here renders as the raw key for users on this language.\n`;

  write(targetFile, banner + read(sourceFile));
  ok(`created app/src/core/i18n/locales/${code}.ts  (${countKeys(read(targetFile))} keys)`);

  // ---- 2. register it ----
  let registry = read(REGISTRY);
  if (registry.includes(`code: "${code}"`) || registry.includes(`code: '${code}'`)) {
    warn(`languages.ts already lists "${code}" - left as it is`);
  } else {
    const entry =
      `  { code: "${code}", name: "${name}", nativeName: "${native}", ` +
      `dir: "${dir}", label: "${code.split('-')[0].toUpperCase()}" },\n`;

    // Anchored on the closing bracket of the LANGUAGES array.
    const m = registry.match(/(export const LANGUAGES: AppLanguage\[\] = \[[\s\S]*?)(^\];)/m);
    if (!m) {
      fail('could not find the LANGUAGES array in languages.ts - add the entry by hand:');
      console.log(entry);
      process.exit(1);
    }
    registry = registry.replace(m[0], `${m[1]}${entry}${m[2]}`);
    write(REGISTRY, registry);
    ok('registered in app/src/core/i18n/languages.ts');
  }

  console.log(`\n${c.green}${c.bold}Done.${c.reset}`);
  console.log(`\n${c.bold}Next:${c.reset}`);
  console.log(`  1. Translate the values in ${c.cyan}app/src/core/i18n/locales/${code}.ts${c.reset}`);
  console.log(`     (they are still ${from.toUpperCase()} - the keys are already correct)`);
  console.log('  2. Restart the dev server, then use the globe button to switch.');
  if (dir === 'rtl') {
    console.log(`  3. ${c.yellow}Check the layout${c.reset} - this language is right-to-left.`);
  }
  console.log('');
}

main().catch((err) => {
  fail(err?.message ?? String(err));
  process.exit(1);
});
