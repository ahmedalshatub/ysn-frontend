#!/usr/bin/env node
/**
 * Reduces the auth section of the template to exactly what your app needs.
 *
 *   node Scripts/auth-setup/auth-setup.mjs
 *   node Scripts/auth-setup/auth-setup.mjs --dry-run
 *
 * The template ships 4 auth flows x 23 designs = 92 screens. This keeps ONE
 * design, applied to every flow you keep, and deletes everything else: pages,
 * routes, API endpoints, types, translations and unused style rules.
 *
 * One design for all flows is deliberate: a carousel login followed by a
 * minimal reset screen looks like two different products.
 *
 * THIS DELETES FILES. Commit first.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const APP = path.join(REPO_ROOT, 'app');
const SRC = path.join(APP, 'src');
const AUTH = path.join(SRC, 'features', 'auth', 'pages');
const AUTH_COMPONENTS = path.join(SRC, 'features', 'auth', 'components');
const ROUTES = path.join(SRC, 'core', 'routes', 'index.tsx');
const AUTH_API = path.join(SRC, 'features', 'auth', 'api', 'Auth.api.ts');
const APP_SCSS = path.join(SRC, 'assets', 'scss', 'app.scss');
const LOCALES = path.join(SRC, 'core', 'i18n', 'locales');

// The auth CSS here is class-level and shared, not one stylesheet per design,
// so pruning works on individual rule blocks inside these two files.
const AUTH_SCSS_FILES = [
  path.join(SRC, 'assets', 'scss', 'layout', '_auth.scss'),
  path.join(SRC, 'assets', 'scss', 'layout', '_pages.scss'),
];

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const del = (m) => console.log(`  ${c.yellow}rm${c.reset}   ${m}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => console.error(`${c.red}Error:${c.reset} ${m}`);

/** [component prefix, route slug, description] */
const DESIGNS = [
  ['Simple', 'simple', 'centred card on a plain background'],
  ['Minimal', 'minimal', 'bare, no card'],
  ['TwoSide', 'two-side', 'two panes, coloured side'],
  ['CardTwoSide', 'card-two-side', 'two panes, form in a card'],
  ['ImageTwoSide', 'image-two-side', 'two panes, photo side'],
  ['ImageCardTwoSide', 'image-card-two-side', 'two panes, photo side, form in a card'],
  ['FullPage', 'full-page', 'full-bleed background'],
  ['Carousel', 'carousel', 'two panes, SVG carousel'],
  ['CardCarousel', 'card-carousel', 'SVG carousel, form in a card'],
  ['ImageCarousel', 'image-carousel', 'photo carousel'],
  ['ImageCardCarousel', 'image-card-carousel', 'photo carousel, form in a card'],
  ['Modern', 'modern', 'modern styling, blurred blobs'],
  ['ModernSimple', 'modern-simple', 'modern, centred card'],
  ['ModernMinimal', 'modern-minimal', 'modern, bare'],
  ['ModernTwoSide', 'modern-two-side', 'modern, two panes'],
  ['ModernCardTwoSide', 'modern-card-two-side', 'modern, two panes, form in a card'],
  ['ModernImageTwoSide', 'modern-image-two-side', 'modern, two panes, photo side'],
  ['ModernImageCardTwoSide', 'modern-image-card-two-side', 'modern, photo side, form in a card'],
  ['ModernFullPage', 'modern-full-page', 'modern, full-bleed'],
  ['ModernCarousel', 'modern-carousel', 'modern, SVG carousel'],
  ['ModernCardCarousel', 'modern-card-carousel', 'modern, SVG carousel, form in a card'],
  ['ModernImageCarousel', 'modern-image-carousel', 'modern, photo carousel'],
  ['ModernImageCardCarousel', 'modern-image-card-carousel', 'modern, photo carousel, form in a card'],
];

/**
 * Everything that belongs to each flow. Anything NOT listed here is shared and
 * must survive: revokeToken and changePassword (navbar / profile), and
 * features/auth/types/Auth.types.ts, whose LoginResponseDto is returned by OTP login and by
 * registration too.
 */
const FLOWS = {
  login: {
    dir: 'login', suffix: 'Login', component: 'Login', route: '/login', label: 'Login',
    typeFile: null, i18nKey: 'login', steps: [],
    endpoints: ['login'], hooks: ['useLoginMutation'],
  },
  otpLogin: {
    dir: 'otp-login', suffix: 'OtpLogin', component: 'OtpLogin', route: '/otp-login', label: 'OTP Login',
    typeFile: 'OtpLogin.types.ts', i18nKey: 'otpLogin', steps: [],
    endpoints: ['otpLoginRequest', 'verifyOtpLogin'],
    hooks: ['useOtpLoginRequestMutation', 'useVerifyOtpLoginMutation'],
  },
  forgotPassword: {
    dir: 'forgot-password', suffix: 'ForgotPassword', component: 'ForgotPassword',
    route: '/forgot-password', label: 'Forgot Password',
    typeFile: 'PasswordReset.types.ts', i18nKey: 'forgotPassword',
    steps: ['ForgotPasswordStep1.tsx', 'ForgotPasswordStep2.tsx', 'ForgotPasswordStep3.tsx'],
    endpoints: ['forgetPassword', 'verifyOtp', 'resetPassword'],
    hooks: ['useForgetPasswordMutation', 'useVerifyOtpMutation', 'useResetPasswordMutation'],
  },
  register: {
    dir: 'register', suffix: 'Register', component: 'Register', route: '/register', label: 'Register',
    typeFile: 'Registration.types.ts', i18nKey: 'register',
    steps: ['RegisterStep1.tsx', 'RegisterStep2.tsx', 'RegisterStep3.tsx'],
    endpoints: ['registerRequest', 'verifyRegistrationOtp', 'completeRegistration'],
    hooks: ['useRegisterRequestMutation', 'useVerifyRegistrationOtpMutation', 'useCompleteRegistrationMutation'],
  },
};

let DRY = false;

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { if (!DRY) fs.writeFileSync(p, s, 'utf8'); };
const exists = (p) => fs.existsSync(p);
const rmFile = (p) => { if (!DRY && exists(p)) fs.unlinkSync(p); };
const rmDir = (p) => { if (!DRY && exists(p)) fs.rmSync(p, { recursive: true, force: true }); };
const rel = (p) => path.relative(APP, p).replace(/\\/g, '/');

const readArg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
};

/** Removes whole `{ ... },` route objects whose path satisfies the predicate. */
function removeRouteObjects(source, matchPath) {
  const re = /\r?\n {2}\{\r?\n {4}path: "([^"]+)",[\s\S]*?\r?\n {2}\},/g;
  return source.replace(re, (whole, routePath) => (matchPath(routePath) ? '' : whole));
}

/** Removes a `name: builder.mutation<...>({ ... }),` block from authApi.ts. */
function removeEndpoint(source, name) {
  const re = new RegExp(`\\r?\\n {4}${name}: builder\\.mutation<[\\s\\S]*?\\r?\\n {4}\\}\\),`, 'm');
  return source.replace(re, '');
}

/** Removes a top-level translation namespace from a locale file. */
function removeNamespace(source, key) {
  const re = new RegExp(`^ {4}${key}: \\{[\\s\\S]*?^ {4}\\},\\r?\\n`, 'm');
  return source.replace(re, '');
}

/**
 * Drops named imports the file no longer uses.
 *
 * Deleting a link block can orphan its import - `Link` from react-router-dom is
 * the usual one - and the build runs with noUnusedLocals, so an orphan is a
 * hard error rather than a warning. Only the braced form is touched, and a name
 * is kept if it appears anywhere outside the import lines.
 */
function pruneUnusedImports(source) {
  const braced = /^import \{([^}]*)\} from "([^"]+)";\r?\n/gm;
  const body = source.replace(/^import [^\n]*\r?\n/gm, '');

  return source.replace(braced, (whole, names, from) => {
    const keptNames = names
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
      .filter((n) => new RegExp(`\\b${n.split(' as ').pop().trim()}\\b`).test(body));
    if (keptNames.length === names.split(',').map((n) => n.trim()).filter(Boolean).length) return whole;
    return keptNames.length ? `import { ${keptNames.join(', ')} } from "${from}";\n` : '';
  });
}

// ------------------------------------------------------------------- steps ---

function keepOneVariant(flow, design) {
  const dir = path.join(AUTH, flow.dir);
  const chosen = path.join(dir, `${design}${flow.suffix}.tsx`);

  if (!exists(chosen)) {
    fail(`${rel(chosen)} does not exist`);
    process.exit(1);
  }

  // Rename the component identifier too, not just the file.
  let source = read(chosen).replace(
    new RegExp(`\\b${design}${flow.suffix}\\b`, 'g'),
    flow.component,
  );

  const target = path.join(dir, `${flow.component}.tsx`);

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.tsx')) continue;
    const full = path.join(dir, file);
    if (full === chosen) continue;
    rmFile(full);
  }
  del(`${rel(dir)}/  ${c.dim}(${DESIGNS.length - 1} other designs)${c.reset}`);

  rmFile(chosen);
  write(target, source);
  ok(`${rel(target)}  ${c.dim}(was ${design}${flow.suffix}.tsx)${c.reset}`);
}

function removeFlowFolder(flow) {
  const dir = path.join(AUTH, flow.dir);
  if (exists(dir)) {
    const count = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx')).length;
    rmDir(dir);
    del(`${rel(dir)}/  ${c.dim}(${count} files)${c.reset}`);
  }
  for (const step of flow.steps) {
    const p = path.join(AUTH_COMPONENTS, step);
    if (exists(p)) { rmFile(p); del(rel(p)); }
  }
}

function rewriteRoutes(kept, primary) {
  let s = read(ROUTES);

  // 1. drop every auth variant lazy import, plus Home and the Login wrapper
  const designAlts = DESIGNS.map(([d]) => d).join('|');
  const flowAlts = Object.values(FLOWS).map((f) => f.suffix).join('|');
  s = s.replace(
    new RegExp(`^const (?:${designAlts})(?:${flowAlts}) = lazy\\([^\\r\\n]*\\);\\r?\\n`, 'gm'),
    '',
  );
  s = s.replace(/^const Home = lazy\([^\r\n]*\);\r?\n/m, '');
  s = s.replace(/^const Login = lazy\([^\r\n]*\);\r?\n/m, '');

  // 2. one import per kept flow
  const imports = kept
    .map((f) => `const ${f.component} = lazy(() => import("../../features/auth/pages/${f.dir}/${f.component}"));`)
    .join('\n');
  const anchor = s.match(/^const \w+ = lazy\([^\n]*\);$/m);
  if (!anchor) { fail('could not find a lazy import to anchor to'); process.exit(1); }
  s = s.replace(anchor[0], `${anchor[0]}\n${imports}`);

  // 3. drop every old auth route object, plus "/" and "/home"
  const authPathRe = /^\/(login|otp-login|forgot-password|register)(\/|$)/;
  s = removeRouteObjects(s, (p) => authPathRe.test(p) || p === '/' || p === '/home');

  // 4. insert the collapsed auth routes, "/" pointing at the sign-in page
  const entries = [
    `  {\n    path: "/",\n    name: "${primary.label}",\n    element: <${primary.component} />,\n  },`,
    ...kept.map(
      (f) => `  {\n    path: "${f.route}",\n    name: "${f.label}",\n    element: <${f.component} />,\n  },`,
    ),
  ].join('\n');

  const m = s.match(/^const authRoutes: any = \[\r?\n/m);
  if (!m) { fail('could not find authRoutes'); process.exit(1); }
  s = s.slice(0, m.index + m[0].length) + entries + '\n' + s.slice(m.index + m[0].length);

  write(ROUTES, s);
  ok(`${rel(ROUTES)}  ${c.dim}(94 auth routes -> ${kept.length + 1})${c.reset}`);
}

function pruneAuthApi(removed) {
  if (!removed.length) return;
  let s = read(AUTH_API);

  for (const flow of removed) {
    for (const name of flow.endpoints) s = removeEndpoint(s, name);
    for (const hook of flow.hooks) s = s.replace(new RegExp(`\\r?\\n {2}${hook},?`), '');
  }

  s = s.replace(/,(\s*\r?\n\} = authApi;)/, '$1');

  // Prune type imports whose only users were the removed endpoints. Driven by
  // real usage, so a type shared with a surviving endpoint (LoginResponseDto is
  // returned by OTP login and registration too) is never dropped by mistake.
  const importLine = /^import type \{([\s\S]*?)\} from "([^"]+)";\r?\n/gm;
  const withoutImports = s.replace(importLine, '');
  s = s.replace(importLine, (whole, names, from) => {
    const keptNames = names
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
      .filter((n) => new RegExp(`\\b${n}\\b`).test(withoutImports));
    return keptNames.length ? `import type { ${keptNames.join(', ')} } from "${from}";\n` : '';
  });

  write(AUTH_API, s);
  ok(`${rel(AUTH_API)}  ${c.dim}(removed ${removed.flatMap((f) => f.endpoints).length} endpoints)${c.reset}`);
}

function removeTypes(removed) {
  for (const flow of removed) {
    if (!flow.typeFile) continue;
    const p = path.join(SRC, 'features', 'auth', 'types', flow.typeFile);
    if (!exists(p)) continue;
    rmFile(p);
    del(rel(p));
  }
}

/**
 * Removes a flow's translation namespace, but only when nothing that survived
 * still reads from it.
 *
 * The namespaces are not private to their flow: the OTP-login and
 * forgot-password screens both reuse `login.email`, `login.password` and
 * friends, so dropping `login` just because the Login flow went would leave
 * those screens rendering raw keys. Usage is measured against the files that
 * actually survived, so this cannot go stale.
 */
function pruneTranslations(removed) {
  if (!removed.length) return;

  const usedNamespaces = new Set();
  const walk = (dir) => {
    if (!exists(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.tsx?$/.test(entry.name)) {
        for (const m of read(full).matchAll(/\bt\(\s*["'`]([A-Za-z0-9_]+)\./g)) {
          usedNamespaces.add(m[1]);
        }
      }
    }
  };
  walk(SRC);

  const drop = removed.filter((f) => !usedNamespaces.has(f.i18nKey));
  const keep = removed.filter((f) => usedNamespaces.has(f.i18nKey));

  if (drop.length) {
    for (const file of fs.readdirSync(LOCALES).filter((f) => f.endsWith('.ts'))) {
      const p = path.join(LOCALES, file);
      let s = read(p);
      for (const flow of drop) s = removeNamespace(s, flow.i18nKey);
      write(p, s);
    }
    ok(`locales  ${c.dim}(removed ${drop.map((f) => f.i18nKey).join(', ')})${c.reset}`);
  }

  for (const flow of keep) {
    warn(`kept the "${flow.i18nKey}" namespace - a surviving screen still uses it`);
  }
}

/** The design gallery is pointless once there is one design. */
function removeHome() {
  const home = path.join(SRC, 'features', 'authGallery', 'pages', 'HomePage.tsx');
  if (exists(home)) { rmFile(home); del(rel(home)); }

  const scss = path.join(SRC, 'assets', 'scss', 'pages', '_home.scss');
  if (exists(scss)) { rmFile(scss); del(rel(scss)); }

  let s = read(APP_SCSS);
  const next = s.replace(/^@import "pages\/home";\r?\n/m, '');
  if (next !== s) { write(APP_SCSS, next); ok(`${rel(APP_SCSS)}  ${c.dim}(dropped the home @import)${c.reset}`); }
}

/** The thin wrapper that made "/" render one chosen login design. */
function removeLoginWrapper() {
  const p = path.join(AUTH, 'Login.tsx');
  if (exists(p)) { rmFile(p); del(rel(p)); }
}

/**
 * Deletes auth style rules no surviving screen uses.
 *
 * Computed rather than hardcoded: scan every surviving .tsx for auth-* and
 * page-* class names, then drop the rule blocks nothing references. The whole
 * of src is scanned, not just features/auth/pages, because the layout wrapper and the
 * navbars use some of these classes too.
 */
function pruneAuthScss() {
  const used = new Set();
  const walk = (dir) => {
    if (!exists(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.tsx?$/.test(entry.name)) {
        for (const m of read(full).matchAll(/\b(auth|page)-[a-z0-9-]+/g)) used.add(m[0]);
      }
    }
  };
  walk(SRC);

  let dropped = 0;
  for (const file of AUTH_SCSS_FILES) {
    if (!exists(file)) continue;
    let s = read(file);

    // Top-level `.auth-x { ... }` / `.page-x { ... }` blocks only. Nested
    // overrides inside [data-theme="dark"] and [dir="rtl"] are left alone:
    // they are indented, so this anchored pattern cannot reach them, and a
    // dangling override is harmless.
    const block = /^\.((?:auth|page)-[a-z0-9-]+) \{\r?\n[\s\S]*?^\}\r?\n\r?\n?/gm;
    const next = s.replace(block, (whole, cls) => {
      if (used.has(cls)) return whole;
      dropped++;
      return '';
    });

    if (next !== s) write(file, next);
  }

  if (dropped) ok(`dropped ${dropped} unused style rule(s)`);
  else ok('no unused style rules');
}

/**
 * Rewrites cross-flow links on the surviving screens.
 *
 * Every design links to a design-specific route (`/register/modern-simple`),
 * which no longer exists once the routes collapse; and a link to a flow that
 * was removed has to go entirely.
 */
function fixLinks(kept, removedKeys) {
  const survivors = [];
  for (const flow of kept) {
    const p = path.join(AUTH, flow.dir, `${flow.component}.tsx`);
    if (exists(p)) survivors.push(p);
  }

  let touched = 0;
  for (const p of survivors) {
    let s = read(p);
    const before = s;

    // Collapse design-specific targets onto the single route per flow.
    s = s.replace(/to="\/register\/[a-z-]+"/g, 'to="/register"');
    s = s.replace(/navigate\("\/login\/[a-z-]+"\)/g, 'navigate("/login")');
    s = s.replace(/to="\/login\/[a-z-]+"/g, 'to="/login"');
    s = s.replace(/to="\/otp-login\/[a-z-]+"/g, 'to="/otp-login"');
    s = s.replace(/to="\/forgot-password\/[a-z-]+"/g, 'to="/forgot-password"');

    // A link to a removed flow would be a dead route.
    if (removedKeys.has('forgotPassword')) {
      s = s.replace(
        /\n\s*<div className="flex items-center justify-end">\s*\n?\s*<Link\s+to="\/forgot-password"[\s\S]*?<\/Link>\s*\n?\s*<\/div>/g,
        '',
      );
    }
    if (removedKeys.has('register')) {
      s = s.replace(
        /\n\s*<p className="text-center text-sm auth-subtext">\s*\n?\s*\{t\("register\.noAccount"\)\}[\s\S]*?<\/p>/g,
        '',
      );
    }

    if (s !== before) {
      s = pruneUnusedImports(s);
      write(p, s);
      touched++;
    }
  }

  ok(`${touched} surviving screen(s) had links rewritten`);
}

// --------------------------------------------------------------------- run ---

async function main() {
  DRY = process.argv.includes('--dry-run');

  console.log(`\n${c.bold}${c.cyan}Auth setup${c.reset}`);
  if (DRY) console.log(`${c.yellow}dry run - nothing will be written${c.reset}`);
  console.log('');

  if (!exists(AUTH) || !exists(ROUTES)) {
    fail('could not find the app - run this from the repository root');
    process.exit(1);
  }

  let design = readArg('--design');
  const answers = {};
  for (const key of Object.keys(FLOWS)) {
    const flag = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    if (process.argv.includes(`${flag}=yes`)) answers[key] = true;
    if (process.argv.includes(`${flag}=no`)) answers[key] = false;
  }
  const assumeYes = process.argv.includes('--yes') || process.argv.includes('-y');

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    if (!design) {
      console.log(`${c.bold}Which design should every auth screen use?${c.reset}`);
      DESIGNS.forEach(([name, , desc], i) =>
        console.log(`  ${String(i + 1).padStart(2)}. ${name.padEnd(24)} ${c.dim}${desc}${c.reset}`),
      );
      while (!design) {
        const raw = (await rl.question('\nNumber or name: ')).trim();
        const byIndex = DESIGNS[Number(raw) - 1];
        const byName = DESIGNS.find(([n]) => n.toLowerCase() === raw.toLowerCase());
        design = byIndex?.[0] ?? byName?.[0] ?? null;
        if (!design) fail('pick a number from the list, or type the name');
      }
    }
    if (!DESIGNS.some(([n]) => n === design)) {
      fail(`unknown design "${design}"`);
      process.exit(1);
    }

    console.log('');
    for (const [key, flow] of Object.entries(FLOWS)) {
      if (typeof answers[key] === 'boolean') continue;
      const raw = (await rl.question(`Keep ${flow.label}? (Y/n): `)).trim().toLowerCase();
      answers[key] = raw !== 'n' && raw !== 'no';
    }

    if (!answers.login && !answers.otpLogin) {
      fail('keep at least one of Login or OTP Login, or nobody can sign in');
      process.exit(1);
    }

    const kept = Object.entries(FLOWS).filter(([k]) => answers[k]).map(([, f]) => f);
    const removed = Object.entries(FLOWS).filter(([k]) => !answers[k]).map(([, f]) => f);

    console.log(`\n${c.bold}Plan${c.reset}`);
    console.log(`  design : ${c.cyan}${design}${c.reset}`);
    console.log(`  keep   : ${c.green}${kept.map((f) => f.label).join(', ') || 'none'}${c.reset}`);
    console.log(`  remove : ${c.yellow}${removed.map((f) => f.label).join(', ') || 'none'}${c.reset}`);
    console.log(`  "/"    : ${c.cyan}${(answers.login ? FLOWS.login : FLOWS.otpLogin).label}${c.reset}`);
    console.log(`\n  ${c.yellow}This deletes files. Commit first if you have not.${c.reset}`);

    if (!assumeYes && !DRY) {
      const a = (await rl.question('\nProceed? (y/N): ')).trim().toLowerCase();
      if (a !== 'y' && a !== 'yes') { console.log('\nCancelled.\n'); process.exit(0); }
    }

    rl.close();

    const signIn = answers.login ? FLOWS.login : FLOWS.otpLogin;
    const removedKeys = new Set(Object.keys(FLOWS).filter((k) => !answers[k]));

    console.log(`\n${c.bold}Pages${c.reset}`);
    for (const flow of kept) keepOneVariant(flow, design);
    for (const flow of removed) removeFlowFolder(flow);
    removeLoginWrapper();
    removeHome();

    console.log(`\n${c.bold}Routes${c.reset}`);
    rewriteRoutes(kept, signIn);

    console.log(`\n${c.bold}API and types${c.reset}`);
    pruneAuthApi(removed);
    removeTypes(removed);

    console.log(`\n${c.bold}Translations${c.reset}`);
    if (DRY) warn('skipped - which namespaces are still in use depends on what was deleted');
    else pruneTranslations(removed);

    console.log(`\n${c.bold}Links${c.reset}`);
    if (DRY) warn('skipped - it works from the files that survived, and nothing was deleted');
    else fixLinks(kept, removedKeys);

    console.log(`\n${c.bold}Styles${c.reset}`);
    if (DRY) warn('skipped - it works from the files that survived, and nothing was deleted');
    else pruneAuthScss();

    console.log(`\n${c.green}${c.bold}Done.${c.reset}`);
    if (DRY) console.log(`${c.yellow}(dry run - nothing was actually written)${c.reset}`);
    console.log(`\n${c.bold}Next:${c.reset} cd app && npx tsc -b && npm run dev\n`);
  } finally {
    rl.close();
  }
}

main().catch((err) => { fail(err?.stack ?? String(err)); process.exit(1); });
