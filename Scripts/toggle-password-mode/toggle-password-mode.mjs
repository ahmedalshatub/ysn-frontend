#!/usr/bin/env node
/**
 * Switches the frontend between password fields the user fills in themselves
 * (the default) and hiding them because the API is generating and e-mailing
 * passwords instead - mirrors the API's own Password:AutoGenerate toggle
 * (Scripts/toggle-password-mode/toggle-password-mode.mjs in the backend repo).
 *
 *   node Scripts/toggle-password-mode/toggle-password-mode.mjs on
 *   node Scripts/toggle-password-mode/toggle-password-mode.mjs off
 *   node Scripts/toggle-password-mode/toggle-password-mode.mjs            (prints current state)
 *
 * This is a config flip, not a code change. Every code path for both modes
 * already exists in the app - each place a password field would appear reads
 * VITE_PASSWORD_AUTO_GENERATE at render time (see src/utils/passwordPolicy.ts)
 * and branches there, the same way the app already does for
 * VITE_ENABLE_SIGNALR. So this script only ever edits one env value, in every
 * app/.env* file that has it.
 *
 * On: the admin "add user" form, the final step of self-registration, the
 * final step of "forgot password", and the admin "reset password" dialog all
 * hide their password/confirm-password fields and show an "a password will
 * be e-mailed" notice instead. Off restores the password fields, as
 * originally shipped.
 *
 * Remember this only changes what the FRONTEND asks for - the backend must
 * have its own Password:AutoGenerate turned on too, or the forms here will
 * stop asking for a password while the API still requires one.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const APP_DIR = path.join(REPO_ROOT, 'YSN');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => { console.error(`${c.red}Error:${c.reset} ${m}`); process.exit(1); };

const rel = (p) => path.relative(REPO_ROOT, p).replace(/\\/g, '/');

const ENV_FILES = ['.env', '.env.development', '.env.production']
  .map((f) => path.join(APP_DIR, f))
  .filter((p) => fs.existsSync(p));

if (ENV_FILES.length === 0) {
  fail('No .env file found under app/ - run this from the repo root.');
}

const KEY = 'VITE_PASSWORD_AUTO_GENERATE';
const pattern = new RegExp(`^${KEY}=(.*)$`, 'm');

function readValue(text) {
  const m = text.match(pattern);
  return m ? m[1].trim() === 'true' : null;
}

function setValue(text, enabled) {
  return text.replace(pattern, `${KEY}=${enabled}`);
}

function printStatus() {
  console.log(`${c.bold}Current state${c.reset}`);
  for (const file of ENV_FILES) {
    const text = fs.readFileSync(file, 'utf8');
    const enabled = readValue(text);
    if (enabled === null) {
      warn(`${rel(file)}: no ${KEY} found - treated as off (manual passwords)`);
      continue;
    }
    console.log(`  ${enabled ? c.green + 'ON ' : c.dim + 'off'}${c.reset}  ${rel(file)}`);
  }
}

const args = process.argv.slice(2);
const mode = args[0];

if (!mode) {
  printStatus();
  console.log(`\n${c.dim}Usage: node ${rel(path.join(SCRIPT_DIR, path.basename(import.meta.url)))} on|off${c.reset}`);
  process.exit(0);
}

if (mode !== 'on' && mode !== 'off') {
  fail(`Unknown argument "${mode}" - expected "on" or "off".`);
}

const enabled = mode === 'on';

console.log(`${c.bold}Turning password auto-generate UI ${enabled ? 'ON' : 'OFF'}${c.reset}\n`);

for (const file of ENV_FILES) {
  let text = fs.readFileSync(file, 'utf8');

  if (readValue(text) === null) {
    warn(`${rel(file)}: no ${KEY} found - add "${KEY}=false" to it before running this script`);
    continue;
  }

  text = setValue(text, enabled);
  fs.writeFileSync(file, text, 'utf8');
  ok(`${rel(file)}: ${KEY} -> ${enabled}`);
}

console.log();
if (enabled) {
  console.log(`${c.cyan}Password auto-generate UI is now on.${c.reset} From the next dev-server restart:`);
  console.log('  - the admin "add user" form, the final step of self-registration, the final step of');
  console.log('    "forgot password", and the admin "reset password" dialog all hide their password');
  console.log('    fields and show an "a password will be e-mailed" notice');
  console.log('  - after login, an account with a pending generated password is locked to a forced');
  console.log('    "set your password" dialog until it changes its own password');
  console.log(`  - make sure the ${c.bold}backend's${c.reset} Password:AutoGenerate is also on - this flag only`);
  console.log('    changes what the frontend asks for, not what the API accepts');
} else {
  console.log(`${c.cyan}Password auto-generate UI is now off.${c.reset} Password fields work exactly as`);
  console.log('  originally shipped: filled in by whoever submits the form.');
}
console.log(`\n${c.dim}Vite only reads .env files at startup - restart "npm run dev" for this to take effect.${c.reset}`);
