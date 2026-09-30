#!/usr/bin/env node
/**
 * Picks the dashboard layout and deletes everything else.
 *
 *   node Scripts/layout-setup/layout-setup.mjs
 *   node Scripts/layout-setup/layout-setup.mjs --dry-run
 *
 * The template ships 21 sidebar variants, 6 navbars and 3 layout wrappers.
 * Choosing between them by hand means editing four places and keeping them in
 * agreement:
 *
 *   1. the Layout constant and its import in routes/AllRoutes.tsx
 *   2. the sidebar import and SelectedSidebar in layout/SidebarWrapper.tsx
 *   3. the navbar import in layout/AuthLayout.tsx
 *   4. the sidebar and navbar @import lines in assets/scss/app.scss
 *   5. the matching variable block in assets/scss/_variables.scss
 *
 * Plus USES_DARK_LOGO, which has to match whether the sidebar has a dark
 * background - get that wrong and the logo disappears into it.
 *
 * Miss (5) and sass stops with "Undefined variable": four of the dark sidebars
 * read $sidebar-alt-bg, which only their own block defines. Miss any of the
 * others and the layout breaks quietly. This writes them all together.
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
const LAYOUT_DIR = path.join(SRC, 'core', 'layout');
const SIDEBARS = path.join(LAYOUT_DIR, 'sidebars');
const NAVBARS = path.join(LAYOUT_DIR, 'navbars');
const SIDEBAR_SCSS = path.join(SRC, 'assets', 'scss', 'layout', 'sidebars');
const NAVBAR_SCSS = path.join(SRC, 'assets', 'scss', 'layout', 'navbars');
const APP_SCSS = path.join(SRC, 'assets', 'scss', 'app.scss');
const VARIABLES = path.join(SRC, 'assets', 'scss', '_variables.scss');
const ALL_ROUTES = path.join(SRC, 'core', 'routes', 'AllRoutes.tsx');
const SIDEBAR_WRAPPER = path.join(LAYOUT_DIR, 'SidebarWrapper.tsx');
const AUTH_LAYOUT = path.join(LAYOUT_DIR, 'AuthLayout.tsx');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const del = (m) => console.log(`  ${c.yellow}rm${c.reset}   ${m}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => console.error(`${c.red}Error:${c.reset} ${m}`);

const ORIENTATIONS = [
  ['vertical', 'sidebar down the side, using one of the sidebar variants'],
  ['horizontal', 'no sidebar - a light menu bar under the navbar'],
  ['horizontal-dark', 'no sidebar - a dark menu bar under the navbar'],
];

/** The wrapper, nav component and navbar each horizontal orientation needs. */
const HORIZONTAL = {
  horizontal: { layout: 'HorizontalAuthLayout', nav: 'HorizontalNav', navbar: 'NavbarHorizontal', scss: 'navbar-horizontal' },
  'horizontal-dark': { layout: 'HorizontalDarkAuthLayout', nav: 'HorizontalNavDark', navbar: 'NavbarHorizontalDark', scss: 'navbar-horizontal-dark' },
};

let DRY = false;

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { if (!DRY) fs.writeFileSync(p, s, 'utf8'); };
const exists = (p) => fs.existsSync(p);
const rmFile = (p) => { if (!DRY && exists(p)) fs.unlinkSync(p); };
const rel = (p) => path.relative(APP, p).replace(/\\/g, '/');

const readArg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
};

/**
 * Builds the variant list from the table app.scss already carries:
 *
 *   // @import "layout/sidebars/sidebar-classic";   // ClassicSidebar → Navbar: Standard
 *
 * Slug, component and required navbar all come from there, so the list and the
 * sidebar/navbar pairing cannot drift out of date with the stylesheets.
 */
function discoverVariants(appScss) {
  const re = /^(?:\/\/ )?@import "layout\/sidebars\/(sidebar-[a-z0-9-]+)";\s*\/\/\s*(\w+Sidebar)[^\n]*?Navbar:\s*(\w+)/gm;
  const out = [];
  for (const m of appScss.matchAll(re)) {
    out.push({ slug: m[1], component: m[2], navbar: m[3] });
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Whether a sidebar sits on a dark background, so the logo must use its dark
 * variant whatever the theme. Mirrors the list SidebarWrapper documents; any
 * component this cannot classify is reported rather than guessed at.
 */
const isDarkSidebar = (component) =>
  /Dark|Colorful|Glass/.test(component) || /^(Modern|Gradient)Sidebar$/.test(component);

// ---------------------------------------------------------------- templates ---

const sidebarWrapperSource = (original, variant) => {
  let s = original;

  // Replace the whole commented import block with the single chosen import.
  const importBlock = /(?:^(?:\/\/ )?import \w+Sidebar from "\.\/sidebars\/\w+";\r?\n)+/m;
  if (!importBlock.test(s)) return null;
  s = s.replace(importBlock, `import ${variant.component} from "./sidebars/${variant.component}";\n`);

  s = s.replace(
    /^const SelectedSidebar: React\.FC<SidebarProps> = \w+;$/m,
    `const SelectedSidebar: React.FC<SidebarProps> = ${variant.component};`,
  );

  s = s.replace(
    /^const USES_DARK_LOGO = (?:true|false);$/m,
    `const USES_DARK_LOGO = ${isDarkSidebar(variant.component)};`,
  );

  // The "uncomment one" instructions no longer apply once there is one.
  s = s.replace(
    /^\/\/ ═{10,}\r?\n\/\/ SIDEBAR COMPONENT[\s\S]*?^\/\/ ═{10,}\r?\n/m,
    `// Generated by Scripts/layout-setup: ${variant.slug}.\n`,
  );

  return s;
};

const authLayoutSource = (original, navbarComponent) => {
  let s = original;

  const importBlock = /(?:^(?:\/\/ )?import Navbar from "\.\/navbars\/\w+";\r?\n)+/m;
  if (!importBlock.test(s)) return null;
  s = s.replace(importBlock, `import Navbar from "./navbars/${navbarComponent}";\n`);

  s = s.replace(
    /^\/\/ ═{10,}\r?\n\/\/ VERTICAL AUTH LAYOUT[\s\S]*?^\/\/ ═{10,}\r?\n/m,
    `// Generated by Scripts/layout-setup: vertical, ${navbarComponent}.\n`,
  );
  s = s.replace(/^\/\/ ── Navbar Component ─+\r?\n/m, '');

  return s;
};

const allRoutesSource = (original, layoutComponent) => {
  let s = original;

  // The specifier stays "../layout/" after the move to a feature-based src:
  // AllRoutes.tsx lives in core/routes/ and the layouts in core/layout/, so
  // they are still siblings. Do not "fix" this to ../core/layout/.
  //
  // Anchored to the three wrappers by name: RequireUser is imported from
  // ../layout/ too, and sits above this block, so a looser pattern eats it.
  const importBlock =
    /(?:^(?:\/\/ )?import (?:AuthLayout|HorizontalAuthLayout|HorizontalDarkAuthLayout) from "\.\.\/layout\/\w+\.tsx";\r?\n)+/m;
  if (!importBlock.test(s)) return null;
  s = s.replace(importBlock, `import ${layoutComponent} from "../layout/${layoutComponent}.tsx";\n`);

  s = s.replace(
    /^\/\/ ═{10,}\r?\n\/\/ LAYOUT SELECTION[\s\S]*?^\/\/ ═{10,}\r?\n/m,
    `// Generated by Scripts/layout-setup.\n`,
  );
  s = s.replace(
    /^\/\/ Set this to your chosen layout component \(must match the import above\)\r?\n/m,
    '',
  );
  s = s.replace(/^const Layout = \w+;$/m, `const Layout = ${layoutComponent};`);

  return s;
};

// -------------------------------------------------------------------- steps ---

function writeVertical(variant) {
  const wrapper = sidebarWrapperSource(read(SIDEBAR_WRAPPER), variant);
  if (!wrapper) { fail('could not find the sidebar import block in SidebarWrapper.tsx'); process.exit(1); }
  write(SIDEBAR_WRAPPER, wrapper);
  ok(`${rel(SIDEBAR_WRAPPER)}  ${c.dim}(${variant.component}, dark logo ${isDarkSidebar(variant.component)})${c.reset}`);

  const layout = authLayoutSource(read(AUTH_LAYOUT), `Navbar${variant.navbar}`);
  if (!layout) { fail('could not find the navbar import block in AuthLayout.tsx'); process.exit(1); }
  write(AUTH_LAYOUT, layout);
  ok(`${rel(AUTH_LAYOUT)}  ${c.dim}(Navbar${variant.navbar})${c.reset}`);
}

function writeRoutes(layoutComponent) {
  const s = allRoutesSource(read(ALL_ROUTES), layoutComponent);
  if (!s) { fail('could not find the layout import block in AllRoutes.tsx'); process.exit(1); }
  write(ALL_ROUTES, s);
  ok(`${rel(ALL_ROUTES)}  ${c.dim}(Layout = ${layoutComponent})${c.reset}`);
}

function pruneLayoutWrappers(keep) {
  const all = ['AuthLayout', 'HorizontalAuthLayout', 'HorizontalDarkAuthLayout'];
  for (const name of all) {
    if (name === keep) continue;
    const p = path.join(LAYOUT_DIR, `${name}.tsx`);
    if (exists(p)) { rmFile(p); del(rel(p)); }
  }

  // The horizontal nav bars belong to their wrapper.
  const keepNav = Object.values(HORIZONTAL).find((h) => h.layout === keep)?.nav ?? null;
  for (const nav of ['HorizontalNav', 'HorizontalNavDark']) {
    if (nav === keepNav) continue;
    const p = path.join(LAYOUT_DIR, `${nav}.tsx`);
    if (exists(p)) { rmFile(p); del(rel(p)); }
  }
}

function pruneSidebars(variant) {
  let removed = 0;
  for (const file of fs.readdirSync(SIDEBARS)) {
    if (!/^[A-Z].*\.tsx$/.test(file)) continue;
    if (variant && file === `${variant.component}.tsx`) continue;
    rmFile(path.join(SIDEBARS, file));
    removed++;
  }

  if (variant) {
    ok(`${rel(path.join(SIDEBARS, `${variant.component}.tsx`))}  ${c.dim}kept${c.reset}`);
    del(`${rel(SIDEBARS)}/  ${c.dim}(${removed} other variants)${c.reset}`);
    return;
  }

  del(`${rel(SIDEBARS)}/  ${c.dim}(all ${removed} variants - no sidebar in this layout)${c.reset}`);
  // types.ts only described the sidebar props; the wrapper and the row
  // component are equally unreachable without a sidebar.
  for (const p of [
    path.join(SIDEBARS, 'types.ts'),
    path.join(LAYOUT_DIR, 'SidebarWrapper.tsx'),
    path.join(LAYOUT_DIR, 'SidebarItem.tsx'),
  ]) {
    if (exists(p)) { rmFile(p); del(rel(p)); }
  }
  if (!DRY && exists(SIDEBARS) && !fs.readdirSync(SIDEBARS).length) fs.rmdirSync(SIDEBARS);
}

function pruneNavbars(keepNavbar) {
  // These two are shared by every navbar.
  const shared = new Set(['NavbarNotificationDropdown.tsx', 'NavbarProfileDropdown.tsx']);
  let removed = 0;

  for (const file of fs.readdirSync(NAVBARS)) {
    if (!file.endsWith('.tsx') || shared.has(file)) continue;
    if (file === `${keepNavbar}.tsx`) continue;
    rmFile(path.join(NAVBARS, file));
    removed++;
  }
  ok(`${rel(path.join(NAVBARS, `${keepNavbar}.tsx`))}  ${c.dim}kept${c.reset}`);
  del(`${rel(NAVBARS)}/  ${c.dim}(${removed} other navbars)${c.reset}`);
}

/**
 * Deletes the stylesheets nothing uses any more and rewrites the two
 * "uncomment one" blocks in app.scss down to the single live import each.
 */
function pruneStyles(variant, navbarScss) {
  let removedFiles = 0;

  for (const [dir, keep] of [
    [SIDEBAR_SCSS, variant ? variant.slug : null],
    [NAVBAR_SCSS, navbarScss],
  ]) {
    if (!exists(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.scss')) continue;
      const slug = file.replace(/^_|\.scss$/g, '');
      // The shared sheet survives unless the whole family is going.
      if (slug.endsWith('-shared')) {
        if (dir === SIDEBAR_SCSS && !variant) { rmFile(path.join(dir, file)); removedFiles++; }
        continue;
      }
      if (keep && slug === keep) continue;
      rmFile(path.join(dir, file));
      removedFiles++;
    }
  }
  del(`stylesheets  ${c.dim}(${removedFiles} removed)${c.reset}`);

  // Collapse each "uncomment one" block down to the single live import. Done
  // line by line: the blocks are long, interleaved with comments, and the
  // sidebar one has to disappear completely when there is no sidebar.
  const isImport = (line, family) =>
    new RegExp(`^(?:// )?@import "layout/${family}/[a-z0-9-]+";`).test(line);
  const isShared = (line) => /-shared";/.test(line);

  const collapse = (source, family, keepSlug) => {
    const out = [];
    let placed = false;
    let seen = 0;

    for (const line of source.split('\n')) {
      if (!isImport(line, family) || isShared(line)) { out.push(line); continue; }
      seen++;
      if (placed || !keepSlug) continue;
      out.push(`@import "layout/${family}/${keepSlug}";`);
      placed = true;
    }
    return { source: out.join('\n'), seen };
  };

  let s = read(APP_SCSS);

  const nav = collapse(s, 'navbars', navbarScss);
  if (!nav.seen) warn('could not find the navbar @import block in app.scss - check it by hand');
  s = nav.source;

  const side = collapse(s, 'sidebars', variant ? variant.slug : null);
  if (!side.seen) warn('could not find the sidebar @import block in app.scss - check it by hand');
  s = side.source;

  if (!variant) {
    s = s.split('\n')
      .filter((line) => !/^@import "layout\/sidebars\/sidebar-shared";/.test(line))
      .filter((line) => !/^\/\/ ── Sidebar: Shared styles/.test(line))
      .join('\n');
  }

  // The category headings grouped the 21 choices. With one left they are empty,
  // and the survivor would sit under whichever heading came first - which is
  // actively misleading when a dark sidebar lands under "Light Sidebars".
  s = s.split('\n')
    .filter((line) => !/^\/\/ ── (Light|Dark|Colorful|Glass) Sidebars/.test(line))
    .filter((line) => !/^\/\/ (NOTE: )?Horizontal nav SCSS is now in the navbar/.test(line))
    .filter((line) => !/^\/\/ Use navbar-horizontal or navbar-horizontal-dark instead\./.test(line))
    .join('\n');

  // The selection banners describe a choice that has now been made.
  const dropBanner = (text, title) => {
    const lines = text.split('\n');
    const start = lines.findIndex((l) => l.includes(title));
    if (start === -1) return text;
    let top = start;
    while (top > 0 && /^\/\/ ═{10,}/.test(lines[top - 1])) top--;
    let end = start;
    while (end < lines.length && !/^\/\/ ═{10,}/.test(lines[end])) end++;
    lines.splice(top, end - top + 1);
    return lines.join('\n');
  };
  s = dropBanner(s, 'NAVBAR VARIANT SELECTION');
  s = dropBanner(s, 'SIDEBAR VARIANT SELECTION');

  // Leftover runs of blank lines where the blocks used to be.
  s = s.replace(/\n{3,}/g, '\n\n');

  write(APP_SCSS, s);
  ok(`${rel(APP_SCSS)}  ${c.dim}(${nav.seen} navbar -> 1, ${side.seen} sidebar -> ${variant ? 1 : 0})${c.reset}`);
}


/**
 * Keeps only the chosen sidebar's variable block in _variables.scss.
 *
 * This is the step that actually breaks the build if you switch by hand: the
 * file carries one block per variant with exactly one uncommented, and four of
 * the dark sidebars reference $sidebar-alt-bg, which only their own block
 * defines. Pick ClassicDark without uncommenting its block and sass stops with
 * "Undefined variable".
 *
 * The heading of each block names the variant, so the mapping to a stylesheet
 * slug is derived rather than listed:
 *   "// ── Floating Colorful (Pink) Sidebar ──"  ->  sidebar-floating-colorful
 */
function pruneVariables(variant) {
  if (!exists(VARIABLES)) { warn('assets/scss/_variables.scss not found - skipped'); return; }

  // _variables.scss is CRLF while app.scss is LF, so the trailing \r has to be
  // tolerated or none of the headings match.
  const lines = read(VARIABLES).split('\n');
  const headingRe = /^\/\/ ── (.+?) Sidebar ─+\r?$/;

  const slugOf = (title) =>
    'sidebar-' + title
      .replace(/\([^)]*\)/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

  // A block is its heading plus the run of variable lines under it, stopping at
  // the first blank line. Scanning to the next heading instead would make the
  // last block swallow everything after it - the auth variables live down there.
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const m = headingRe.exec(lines[i]);
    if (!m) continue;
    let end = i + 1;
    while (end < lines.length && lines[end].trim()) end++;
    blocks.push({ slug: slugOf(m[1]), start: i, end });
  }

  if (!blocks.length) { warn('no sidebar variable blocks found in _variables.scss'); return; }

  const keep = variant ? blocks.find((b) => b.slug === variant.slug) : null;
  if (variant && !keep) {
    warn(`no variable block matches ${variant.slug} - _variables.scss left alone`);
    return;
  }

  const out = [];
  let removed = 0;
  let cursor = 0;

  for (const block of blocks) {
    out.push(...lines.slice(cursor, block.start));
    if (block === keep) {
      // Uncomment it: this is the one the chosen stylesheet reads.
      out.push(lines[block.start]);
      for (const line of lines.slice(block.start + 1, block.end)) {
        out.push(line.replace(/^\/\/ (?=\$)/, ''));
      }
    } else {
      removed++;
    }
    cursor = block.end;
    // Skip the blank separator left behind by a removed block.
    if (block !== keep) {
      while (cursor < lines.length && !lines[cursor].trim()) cursor++;
    }
  }
  out.push(...lines.slice(cursor));

  write(VARIABLES, out.join('\n').replace(/(?:\r?\n){3,}/g, '\r\n\r\n'));
  ok(`${rel(VARIABLES)}  ${c.dim}(${removed} unused variant blocks removed${keep ? `, ${keep.slug} enabled` : ''})${c.reset}`);
}

// ---------------------------------------------------------------------- run ---

async function main() {
  DRY = process.argv.includes('--dry-run');

  console.log(`\n${c.bold}${c.cyan}Layout setup${c.reset}`);
  if (DRY) console.log(`${c.yellow}dry run - nothing will be written${c.reset}`);
  console.log('');

  for (const [label, p] of [['app', APP], ['sidebars', SIDEBARS], ['app.scss', APP_SCSS]]) {
    if (!exists(p)) { fail(`could not find ${label} at ${p}`); process.exit(1); }
  }

  const appScss = read(APP_SCSS);
  const variants = discoverVariants(appScss);
  if (!variants.length) { fail('no sidebar variants found in app.scss'); process.exit(1); }

  // Every component on disk must appear in the table, or the menu would hide one.
  const onDisk = fs.readdirSync(SIDEBARS).filter((f) => /^[A-Z].*\.tsx$/.test(f))
    .map((f) => f.replace(/\.tsx$/, ''));
  const missing = onDisk.filter((comp) => !variants.some((v) => v.component === comp));
  if (missing.length) warn(`not listed in app.scss, so not offered: ${missing.join(', ')}`);

  let orientation = readArg('--orientation');
  let variantSlug = readArg('--variant');
  const assumeYes = process.argv.includes('--yes') || process.argv.includes('-y');

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    if (!orientation) {
      console.log(`${c.bold}Layout orientation${c.reset}`);
      ORIENTATIONS.forEach(([name, desc], i) =>
        console.log(`  ${i + 1}. ${name.padEnd(18)} ${c.dim}${desc}${c.reset}`));
      while (!orientation) {
        const raw = (await rl.question('\nNumber or name: ')).trim();
        orientation = ORIENTATIONS[Number(raw) - 1]?.[0]
          ?? ORIENTATIONS.find(([n]) => n === raw.toLowerCase())?.[0]
          ?? null;
        if (!orientation) fail('pick a number from the list, or type the name');
      }
    }
    if (!ORIENTATIONS.some(([n]) => n === orientation)) {
      fail(`unknown orientation "${orientation}"`);
      process.exit(1);
    }

    let variant = null;
    if (orientation === 'vertical') {
      if (!variantSlug) {
        console.log(`\n${c.bold}Sidebar variant${c.reset}  ${c.dim}(${variants.length} available)${c.reset}`);
        variants.forEach((v, i) =>
          console.log(`  ${String(i + 1).padStart(2)}. ${v.slug.replace(/^sidebar-/, '').padEnd(24)} ${c.dim}${v.component} - navbar ${v.navbar}${c.reset}`));
        while (!variantSlug) {
          const raw = (await rl.question('\nNumber or name: ')).trim().toLowerCase();
          variantSlug = variants[Number(raw) - 1]?.slug
            ?? variants.find((v) => v.slug === raw || v.slug === `sidebar-${raw}`)?.slug
            ?? null;
          if (!variantSlug) fail('pick a number from the list, or type the name');
        }
      }
      variant = variants.find((v) => v.slug === variantSlug || v.slug === `sidebar-${variantSlug}`);
      if (!variant) { fail(`unknown variant "${variantSlug}"`); process.exit(1); }
    }

    const layoutComponent = orientation === 'vertical'
      ? 'AuthLayout'
      : HORIZONTAL[orientation].layout;
    const navbarComponent = orientation === 'vertical'
      ? `Navbar${variant.navbar}`
      : HORIZONTAL[orientation].navbar;
    const navbarScss = orientation === 'vertical'
      ? `navbar-${variant.navbar.toLowerCase()}`
      : HORIZONTAL[orientation].scss;

    console.log(`\n${c.bold}Plan${c.reset}`);
    console.log(`  orientation : ${c.cyan}${orientation}${c.reset}`);
    console.log(`  layout      : ${c.cyan}${layoutComponent}.tsx${c.reset}`);
    if (variant) {
      console.log(`  sidebar     : ${c.cyan}${variant.component}${c.reset} ${c.dim}(${variant.slug})${c.reset}`);
      console.log(`  dark logo   : ${c.cyan}${isDarkSidebar(variant.component)}${c.reset} ${c.dim}(from the sidebar's background)${c.reset}`);
    }
    console.log(`  navbar      : ${c.cyan}${navbarComponent}${c.reset} ${c.dim}(required by this ${variant ? 'sidebar' : 'layout'})${c.reset}`);
    console.log(`  removing    : ${c.yellow}${variant ? variants.length - 1 : variants.length} sidebars, 5 navbars, 2 layout wrappers${c.reset}`);
    console.log(`\n  ${c.yellow}This deletes files. Commit first if you have not.${c.reset}`);

    if (!assumeYes && !DRY) {
      const a = (await rl.question('\nProceed? (y/N): ')).trim().toLowerCase();
      if (a !== 'y' && a !== 'yes') { console.log('\nCancelled.\n'); process.exit(0); }
    }

    rl.close();

    console.log(`\n${c.bold}Layout${c.reset}`);
    if (orientation === 'vertical') writeVertical(variant);
    writeRoutes(layoutComponent);
    pruneLayoutWrappers(layoutComponent);

    console.log(`\n${c.bold}Sidebars${c.reset}`);
    pruneSidebars(variant);

    console.log(`\n${c.bold}Navbars${c.reset}`);
    pruneNavbars(navbarComponent);

    console.log(`\n${c.bold}Styles${c.reset}`);
    pruneStyles(variant, navbarScss);
    pruneVariables(variant);

    console.log(`\n${c.green}${c.bold}Done.${c.reset}`);
    if (DRY) console.log(`${c.yellow}(dry run - nothing was actually written)${c.reset}`);
    console.log(`\n${c.bold}Next:${c.reset} cd app && npx tsc -b && npm run dev\n`);
  } finally {
    rl.close();
  }
}

main().catch((err) => { fail(err?.stack ?? String(err)); process.exit(1); });
