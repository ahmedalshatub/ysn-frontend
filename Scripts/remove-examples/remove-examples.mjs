#!/usr/bin/env node
/**
 * Removes the example pages you do not need, and everything that hangs off them.
 *
 *   node Scripts/remove-examples/remove-examples.mjs
 *   node Scripts/remove-examples/remove-examples.mjs --dry-run
 *
 * The template ships a dozen example features. Deleting one by hand means
 * touching six places and getting every one right:
 *
 *   1. the feature folder under src/features - which, since the move to a
 *      feature-based src, carries its own api/ and types/ with it, so the RTK
 *      Query slice and the DTOs go with the pages instead of being hunted down
 *   2. the lazy import and route objects in core/routes/index.tsx
 *   3. the sidebar entry in core/config/Menu.tsx
 *   4. the now-unused icon imports in both of those files
 *   5. the translation blocks and scattered sidebar/breadcrumb keys, in EVERY locale
 *   6. the stylesheet and its @import in app.scss
 *
 * Miss one and you get a build error, a dead sidebar link, or a raw translation
 * key on screen. This does all six, and only for what you pick.
 *
 * `sharedFiles` below is now empty for every example, because nothing an
 * example owns lives outside its own folder any more. The machinery stays:
 * wire a demo API into a page of your own and it is the right guard again.
 *
 * Run it as often as you like: it lists what is still installed, so you can
 * remove two examples today and the rest next week.
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
const APP = path.join(REPO_ROOT, 'YSN');
const SRC = path.join(APP, 'src');
const ROUTES = path.join(SRC, 'core', 'routes', 'index.tsx');
const SIDEBAR = path.join(SRC, 'core', 'config', 'Menu.tsx');
const APP_SCSS = path.join(SRC, 'assets', 'scss', 'app.scss');
const LOCALES = path.join(SRC, 'core', 'i18n', 'locales');
const HOME = path.join(SRC, 'features', 'authGallery', 'pages', 'HomePage.tsx');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m', cyan: '\x1b[36m',
};
const ok = (m) => console.log(`  ${c.green}OK${c.reset}   ${m}`);
const del = (m) => console.log(`  ${c.yellow}rm${c.reset}   ${m}`);
const warn = (m) => console.log(`  ${c.yellow}!${c.reset}    ${m}`);
const fail = (m) => console.error(`${c.red}Error:${c.reset} ${m}`);

let DRY = false;

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { if (!DRY) fs.writeFileSync(p, s, 'utf8'); };
const exists = (p) => fs.existsSync(p);
const rel = (p) => path.relative(APP, p).replace(/\\/g, '/');

const rmPath = (p) => {
  if (!exists(p)) return false;
  if (!DRY) fs.rmSync(p, { recursive: true, force: true });
  return true;
};

// ------------------------------------------------------------------ registry ---

/**
 * One entry per removable example.
 *
 * `pages` doubles as the "is it still installed" probe and as the source for
 * discovering which lazy imports and route objects belong to it - so a route
 * this list never mentions still gets cleaned up, as long as it points at one
 * of these folders.
 *
 * `sharedFiles` are deleted only once nothing else imports them. In this
 * template each API slice happens to have a single example behind it, but the
 * check is done for real on every run, so it still holds if you wire one of
 * these into a page of your own.
 */
const EXAMPLES = [
  {
    id: 'categories',
    label: 'Categories examples',
    detail: '3 list variants - modal, drawer, form page - on the Categories API',
    pages: ['features/categoriesExample'],
    routePaths: [],
    sidebarItems: ['Categories'],
    i18nBlocks: ['categories', 'categoriesExample1', 'categoriesExample2', 'categoriesExample3'],
    i18nKeys: [
      'sidebar.category', 'sidebar.categories',
      'sidebar.categoriesExample1', 'sidebar.categoriesExample2', 'sidebar.categoriesExample3',
      'sidebar.categoriesTable', 'sidebar.categoriesCards',
      'breadcrumb.categories', 'breadcrumb.categoriesCards',
    ],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'test-tr',
    label: 'TestTr examples',
    detail: '3 list variants on the TestTrs API, with translation tables',
    pages: ['features/testTrExample'],
    routePaths: [],
    sidebarItems: ['TestTR'],
    i18nBlocks: ['testTrs', 'testTrExample1', 'testTrExample2', 'testTrExample3'],
    i18nKeys: [
      'sidebar.testTr', 'sidebar.testTrs',
      'sidebar.testTrExample1', 'sidebar.testTrExample2', 'sidebar.testTrExample3',
      'breadcrumb.testTrs',
    ],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'sub-test-tr',
    label: 'Sub-TestTr examples',
    detail: 'the TestSubTrs list, with its own API slice and translation tables',
    pages: ['features/testSubTrExample'],
    routePaths: [],
    sidebarItems: ['TestSubTR'],
    i18nBlocks: ['testSubTrs'],
    i18nKeys: [
      'sidebar.testSubTrs', 'sidebar.testSubTrExample1',
      'breadcrumb.testSubTrs',
    ],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'accounts',
    label: 'Chart of accounts',
    detail: 'tree table seeded from JSON, with filters and add/edit/delete',
    pages: ['features/accountsExample'],
    routePaths: [],
    sidebarItems: ['AccountsExample'],
    i18nBlocks: ['accountsExample'],
    i18nKeys: ['sidebar.accountsExample'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'product-details',
    label: 'Product details',
    detail: 'icon / title / value sections plus a collapse of extra data',
    pages: ['features/productDetails'],
    routePaths: [],
    sidebarItems: ['ProductDetails'],
    i18nBlocks: ['productDetails', 'productExtras'],
    i18nKeys: ['sidebar.productDetails'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'stepper',
    label: 'Customer stepper',
    detail: 'multi-step form with per-step validation and a review step',
    pages: ['features/stepperExample'],
    routePaths: [],
    sidebarItems: ['StepperExample'],
    i18nBlocks: ['stepperExample'],
    i18nKeys: ['sidebar.stepperExample', 'breadcrumb.stepperExample'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'profile-example',
    label: 'Customer profile',
    detail: 'tabbed profile with charts, gallery, carousel, attachments and invoices',
    pages: ['features/profileExample'],
    routePaths: [],
    sidebarItems: ['ProfileExample'],
    i18nBlocks: ['profileExample'],
    i18nKeys: ['sidebar.profileExample', 'breadcrumb.profileExample'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'invoice',
    label: 'Invoice',
    detail: 'invoice builder with hot items, barcode entry and totals',
    pages: ['features/invoiceExample'],
    routePaths: [],
    sidebarItems: ['InvoiceExample'],
    i18nBlocks: ['invoiceExample'],
    i18nKeys: ['sidebar.invoiceExample', 'breadcrumb.invoiceExample'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'ticket',
    label: 'Support tickets',
    detail: 'ticket list and detail view with comments, attachments and history',
    pages: ['features/ticketExample'],
    routePaths: [],
    sidebarItems: ['TicketExample'],
    i18nBlocks: ['ticketExample'],
    i18nKeys: ['sidebar.ticketExample', 'breadcrumb.ticketExample'],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'public-card',
    label: 'Public card',
    detail: 'a public, unauthenticated employee card at /card/:id',
    pages: ['features/publicCard'],
    routePaths: [],
    sidebarItems: [],
    i18nBlocks: ['publicCard'],
    i18nKeys: [],
    scss: [],
    sharedFiles: [],
  },
  {
    id: 'components',
    label: 'Component galleries',
    detail: 'ComponentExamples and the tabbed ComponentShowcase - every component on one page',
    pages: ['features/showcase'],
    routePaths: [],
    sidebarItems: [],
    i18nBlocks: [],
    i18nKeys: ['sidebar.componentsExample'],
    scss: ['pages/_component-examples.scss', 'pages/_component-showcase.scss'],
    sharedFiles: [],
  },
  {
    id: 'auth-gallery',
    label: 'Auth design gallery',
    detail: 'the /home page that lists all 92 auth screens so you can browse them',
    pages: ['features/authGallery'],
    routePaths: [],
    sidebarItems: [],
    i18nBlocks: [],
    i18nKeys: [],
    scss: ['pages/_home.scss'],
    sharedFiles: [],
  },
];

// ------------------------------------------------------------------- parsing ---

/** Blanks out string and JSX-ish literals so brace counting cannot be fooled. */
const maskLiterals = (line) =>
  line.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, '""');

const uncomment = (line) => line.replace(/^(\s*)\/\/ ?/, '$1');

/**
 * Walks a file's object literals - live or commented out - and drops the ones
 * `shouldRemove` recognises.
 *
 * Route and menu entries are multi-line objects with nested arrays and JSX, so
 * a regex cannot be trusted to find their real end. This counts braces instead,
 * ignoring any inside strings.
 */
function removeObjectBlocks(source, shouldRemove) {
  const lines = source.split('\n');
  const out = [];
  let removed = 0;
  let i = 0;

  while (i < lines.length) {
    const bare = uncomment(lines[i]);

    // An entry opens with `{` alone on a line, indented inside the array.
    if (/^\s+\{\s*\r?$/.test(bare)) {
      let depth = 0;
      let end = -1;

      for (let j = i; j < lines.length; j++) {
        for (const ch of maskLiterals(uncomment(lines[j]))) {
          if (ch === '{') depth++;
          else if (ch === '}') depth--;
        }
        if (depth === 0) { end = j; break; }
      }

      if (end !== -1) {
        const block = lines.slice(i, end + 1);
        if (shouldRemove(block.join('\n'))) {
          removed++;
          i = end + 1;
          continue;
        }
        out.push(...block);
        i = end + 1;
        continue;
      }
    }

    out.push(lines[i]);
    i++;
  }

  return { source: out.join('\n'), removed };
}

/** Index just past the string literal starting at `i`. */
function endOfString(source, i) {
  const quote = source[i];
  let j = i + 1;
  while (j < source.length) {
    if (source[j] === '\\') { j += 2; continue; }
    if (source[j] === quote) return j + 1;
    j++;
  }
  return source.length;
}

/**
 * Locates `name: { ... }` sitting directly inside `parent`, and returns the
 * character range covering the key, the braces and any trailing comma.
 *
 * This counts braces rather than matching line shapes because the shipped
 * ar.ts puts two blocks on one line - `    },    roles: {` - which no
 * line-anchored pattern can read correctly.
 */
function findBlock(source, name, parent) {
  const stack = [];
  let i = 0;

  while (i < source.length) {
    const ch = source[i];

    if (ch === '"' || ch === "'" || ch === '`') { i = endOfString(source, i); continue; }
    if (ch === '/' && source[i + 1] === '/') {
      const nl = source.indexOf('\n', i);
      i = nl === -1 ? source.length : nl;
      continue;
    }
    if (ch === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i);
      i = end === -1 ? source.length : end + 2;
      continue;
    }

    if (ch === '{') {
      const lookback = source.slice(Math.max(0, i - 200), i);
      const m = /([A-Za-z_$][\w$]*)\s*:\s*$/.exec(lookback);
      stack.push({
        key: m ? m[1] : null,
        keyStart: m ? i - (lookback.length - m.index) : i,
        parent: stack.length ? stack[stack.length - 1].key : null,
      });
      i++;
      continue;
    }

    if (ch === '}') {
      const top = stack.pop();
      if (top && top.key === name && top.parent === parent) {
        let end = i + 1;
        if (source[end] === ',') end++;
        return { start: top.keyStart, end };
      }
      i++;
      continue;
    }

    i++;
  }
  return null;
}

/** Removes a whole translation block, e.g. `stepperExample: { ... }`. */
function removeTsBlock(source, name, parent = 'translation') {
  const found = findBlock(source, name, parent);
  if (!found) return { source, removed: false };

  let { start, end } = found;

  // Take the indent with it.
  while (start > 0 && (source[start - 1] === ' ' || source[start - 1] === '\t')) start--;

  // If the block had the line to itself, take the line - and any comment lines
  // written directly above it, which describe the block being removed.
  if (start === 0 || source[start - 1] === '\n') {
    while (source[end] === ' ' || source[end] === '\t') end++;
    if (source[end] === '\r') end++;
    if (source[end] === '\n') end++;

    const before = source.slice(0, start).split('\n');
    while (before.length > 1 && /^\s*\/\//.test(before[before.length - 2])) {
      before.splice(before.length - 2, 1);
    }
    return { source: before.join('\n') + source.slice(end), removed: true };
  }

  return { source: source.slice(0, start) + source.slice(end), removed: true };
}

/** Removes one `key: "value",` entry from inside a named block. */
function removeTsKey(source, blockName, key) {
  const block = findBlock(source, blockName, 'translation');
  if (!block) return { source, removed: false };

  const inner = source.slice(block.start, block.end);
  const entry = new RegExp(
    `\\n[ \\t]*${key}:[ \\t]*(?:"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|[^,\\n]*),?`
  );
  if (!entry.test(inner)) return { source, removed: false };

  const next = inner.replace(entry, '');
  return {
    source: source.slice(0, block.start) + next + source.slice(block.end),
    removed: true,
  };
}

/**
 * Drops imported names the file no longer mentions.
 *
 * Removing a sidebar entry orphans its icon import, and the build runs with
 * noUnusedLocals - so skipping this turns a clean removal into a broken build.
 */
function pruneUnusedImports(source) {
  // A statement that loses every name is marked, then swept, so the replace
  // pass never has to reason about the surrounding newlines.
  const DROP = '\u0000drop-import\u0000';

  const namedRe = /^import\s+(?:type\s+)?(?:(\w+)\s*,\s*)?\{([\s\S]*?)\}\s+from\s+(['"][^'"]+['"]);?[ \t]*\r?$/gm;
  const defaultRe = /^import\s+(type\s+)?(\w+)\s+from\s+(['"][^'"]+['"]);?[ \t]*\r?$/gm;

  // "used" means: named anywhere in the file other than this statement itself.
  const usedOutside = (text, name, statement) =>
    new RegExp(`\\b${name}\\b`).test(text.split(statement).join('\n'));

  let next = source.replace(namedRe, (statement, defaultName, names, from) => {
    const entries = names.split(',').map((n) => n.trim()).filter(Boolean);
    const kept = entries.filter((n) =>
      usedOutside(source, n.split(/\s+as\s+/).pop().trim(), statement));
    const keepDefault = defaultName ? usedOutside(source, defaultName, statement) : false;

    if (!kept.length && !keepDefault) return DROP;
    // Nothing to change - hand back the original so formatting is preserved.
    if (kept.length === entries.length && keepDefault === Boolean(defaultName)) return statement;

    const prefix = statement.startsWith('import type') ? 'import type ' : 'import ';
    const lead = keepDefault ? `${defaultName}${kept.length ? ', ' : ' '}` : '';
    const multiline = statement.includes('\n');
    const braces = kept.length
      ? (multiline ? `{\n  ${kept.join(',\n  ')},\n} ` : `{ ${kept.join(', ')} } `)
      : '';
    return `${prefix}${lead}${braces}from ${from};`;
  });

  next = next.replace(defaultRe, (statement, typeWord, name, from) =>
    usedOutside(next, name, statement)
      ? statement
      : DROP);

  return next.split('\n').filter((line) => !line.includes(DROP)).join('\n');
}

// --------------------------------------------------------------------- steps ---

const installed = (ex) => ex.pages.some((p) => exists(path.join(SRC, p)));

/** Component names the route file binds to any of these page paths. */
function lazyComponentsFor(source, pages) {
  const names = [];
  // core/routes/index.tsx sits two levels below src, so its specifiers
  // start "../../" - one level deeper than before the feature-based move.
  const re = /^const (\w+) = lazy\(\(\) => import\("\.\.\/\.\.\/([^"]+)"\)\);/gm;
  for (const m of source.matchAll(re)) {
    const target = m[2];
    if (pages.some((p) => target === p.replace(/\.tsx$/, '') || target.startsWith(`${p}/`))) {
      names.push(m[1]);
    }
  }
  return names;
}

function removePageFiles(chosen) {
  for (const ex of chosen) {
    for (const p of ex.pages) {
      const full = path.join(SRC, p);
      if (rmPath(full)) del(rel(full));
    }
  }
}

function updateRoutes(chosen) {
  if (!exists(ROUTES)) { warn('core/routes/index.tsx not found - skipped'); return; }
  let s = read(ROUTES);

  const components = new Set();
  const paths = new Set();
  for (const ex of chosen) {
    for (const name of lazyComponentsFor(s, ex.pages)) components.add(name);
    for (const p of ex.routePaths) paths.add(p);
  }

  // 1. the lazy imports
  let importsRemoved = 0;
  s = s.split('\n').filter((line) => {
    const m = uncomment(line).match(/^const (\w+) = lazy\(/);
    if (m && components.has(m[1])) { importsRemoved++; return false; }
    return true;
  }).join('\n');

  // 2. every route object that rendered one of them, plus the paths named above
  const { source, removed } = removeObjectBlocks(s, (block) => {
    for (const name of components) {
      if (new RegExp(`<${name}\\s*/>`).test(block)) return true;
    }
    for (const p of paths) {
      if (block.includes(`path: "${p}"`)) return true;
    }
    return false;
  });
  s = source;

  s = pruneUnusedImports(s);
  write(ROUTES, s);
  ok(`${rel(ROUTES)}  ${c.dim}(${importsRemoved} imports, ${removed} routes)${c.reset}`);
}

function updateSidebar(chosen) {
  if (!exists(SIDEBAR)) { warn('config/Menu.tsx not found - skipped'); return; }
  let s = read(SIDEBAR);

  const names = new Set(chosen.flatMap((ex) => ex.sidebarItems));
  if (!names.size) return;

  const { source, removed } = removeObjectBlocks(s, (block) => {
    const m = block.match(/^\s+name: "([^"]+)",/m);
    return m ? names.has(m[1]) : false;
  });
  s = pruneUnusedImports(source);

  write(SIDEBAR, s);
  ok(`${rel(SIDEBAR)}  ${c.dim}(${removed} menu ${removed === 1 ? 'entry' : 'entries'})${c.reset}`);
}

function updateLocales(chosen) {
  if (!exists(LOCALES)) { warn('i18n/locales not found - skipped'); return; }

  const files = fs.readdirSync(LOCALES).filter((f) => f.endsWith('.ts'));
  for (const file of files) {
    const full = path.join(LOCALES, file);
    let s = read(full);
    let blocks = 0;
    let keys = 0;

    for (const ex of chosen) {
      for (const name of ex.i18nBlocks) {
        const r = removeTsBlock(s, name);
        s = r.source;
        if (r.removed) blocks++;
      }
      for (const dotted of ex.i18nKeys) {
        const [blockName, key] = dotted.split('.');
        const r = removeTsKey(s, blockName, key);
        s = r.source;
        if (r.removed) keys++;
      }
    }

    write(full, s);
    ok(`${rel(full)}  ${c.dim}(${blocks} blocks, ${keys} keys)${c.reset}`);
  }
}

function updateStyles(chosen) {
  const scssRoot = path.join(SRC, 'assets', 'scss');
  let s = exists(APP_SCSS) ? read(APP_SCSS) : null;
  let files = 0;
  let imports = 0;

  for (const ex of chosen) {
    for (const entry of ex.scss) {
      const full = path.join(scssRoot, entry);
      if (rmPath(full)) { del(rel(full)); files++; }

      if (s === null) continue;
      // app.scss spells it without the leading underscore: pages/foo
      const name = entry.replace(/^(.*\/)_/, '$1').replace(/\.scss$/, '');
      const before = s;
      // app.scss in this template quotes its imports with double quotes.
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      s = s.replace(new RegExp(`^@import ["']${escaped}["'];\\r?\\n`, 'm'), '');
      if (s !== before) imports++;
    }
  }

  if (s !== null) {
    write(APP_SCSS, s);
    ok(`${rel(APP_SCSS)}  ${c.dim}(${imports} @import removed)${c.reset}`);
  }
  if (!files) warn('no stylesheets matched - they may already be gone');
}

/** The landing page lists every demo route; drop the ones that no longer exist. */
function updateHome(chosen) {
  // The gallery may itself be one of the things this run deletes.
  if (!exists(HOME)) return;
  if (chosen.some((ex) => ex.pages.includes('features/authGallery'))) return;

  const gone = new Set();
  for (const ex of chosen) {
    if (ex.id !== 'components') continue;
    gone.add('/components');
    gone.add('/showcase');
  }
  if (!gone.size) return;

  let s = read(HOME);
  const before = s.split('\n').length;
  s = s.split('\n')
    .filter((line) => ![...gone].some((p) => line.includes(`navigate("${p}")`)))
    .join('\n');
  const cut = before - s.split('\n').length;

  if (!cut) return;
  s = pruneUnusedImports(s);
  write(HOME, s);
  ok(`${rel(HOME)}  ${c.dim}(${cut} quick ${cut === 1 ? 'link' : 'links'})${c.reset}`);
}

/**
 * Deletes an API slice or type module once nothing imports it any more.
 *
 * Two things make this more than a delete: the sub-test-tr examples import
 * testTrApi, so removing the TestTr examples alone must leave it in place - and
 * the run that removes the LAST user of a file is usually a later run, so files
 * an earlier run had to keep are re-checked here every time.
 */
function updateSharedFiles(chosen) {
  const alreadyGone = EXAMPLES.filter((ex) => !installed(ex) && !chosen.includes(ex));
  const candidates = [...new Set([...chosen, ...alreadyGone].flatMap((ex) => ex.sharedFiles))];
  if (!candidates.length) return;

  const live = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.resolve(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(entry.name)) live.add(full);
    }
  };
  walk(SRC);

  // In a dry run the page folders are still on disk, so anything inside a
  // folder this run would have deleted must not count as a user.
  const doomed = chosen.flatMap((ex) => ex.pages.map((p) => path.resolve(SRC, p)));
  const isDoomed = (file) =>
    doomed.some((dir) => file === dir || file.startsWith(dir + path.sep));

  let removed = 0;
  for (const entry of candidates) {
    const full = path.resolve(SRC, entry);
    if (!exists(full)) continue;

    const moduleName = path.basename(entry).replace(/\.tsx?$/, '');
    const importRe = new RegExp(`from\\s+['"][^'"]*/${moduleName}['"]`);
    const referenced = [...live].some((file) =>
      file !== full && !isDoomed(file) && importRe.test(read(file)));

    if (referenced) {
      warn(`${rel(full)}  ${c.dim}kept - still imported elsewhere${c.reset}`);
      continue;
    }
    rmPath(full);
    live.delete(full);
    del(rel(full));
    removed++;
  }

  if (!removed) warn(`${c.dim}nothing to remove - every shared module is still in use${c.reset}`);
}

/** Last pass: anything still naming a folder we deleted is a broken import. */
function reportDangling(chosen) {
  const needles = chosen.flatMap((ex) => ex.pages.map((p) => p.replace(/\.tsx$/, '')));
  const hits = [];

  const walk = (dir) => {
    if (!exists(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!/\.(ts|tsx|scss)$/.test(entry.name)) continue;
      const body = read(full);
      for (const needle of needles) {
        if (new RegExp(`${needle}\\b`).test(body)) hits.push(`${rel(full)} -> ${needle}`);
      }
    }
  };
  walk(SRC);

  if (!hits.length) { ok('no dangling references'); return; }
  for (const hit of hits) warn(hit);
}

// ----------------------------------------------------------------- selection ---

/** Accepts "1", "1,3", "2-4", "all", or any mix of those. */
function parseSelection(raw, available) {
  const text = raw.trim().toLowerCase();
  if (!text) return [];
  if (text === 'all' || text === '*') return [...available];

  const picked = new Set();
  for (const part of text.split(',').map((p) => p.trim()).filter(Boolean)) {
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const [from, to] = [Number(range[1]), Number(range[2])].sort((a, b) => a - b);
      for (let n = from; n <= to; n++) {
        if (available[n - 1]) picked.add(available[n - 1]);
      }
      continue;
    }
    if (/^\d+$/.test(part)) {
      const hit = available[Number(part) - 1];
      if (!hit) return null;
      picked.add(hit);
      continue;
    }
    const byId = available.find((ex) => ex.id === part);
    if (!byId) return null;
    picked.add(byId);
  }
  return [...picked];
}

const readArg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
};

// ---------------------------------------------------------------- prompting ---

/**
 * Line-queued prompt.
 *
 * readline throws away input that arrives while no question is pending, which
 * breaks piped answers - the confirmation would vanish and the run would stop
 * at the prompt. Queuing every line makes the script work both ways.
 */
function createPrompt() {
  const rl = readline.createInterface({ input: stdin, output: stdout, terminal: stdin.isTTY });
  const queued = [];
  const waiting = [];
  let closed = false;

  // Piped answers are not echoed by a terminal, so echo them here - a
  // transcript showing the prompts but none of the answers is hard to read.
  const echo = (line) => { if (!stdin.isTTY) stdout.write(line + '\n'); };

  rl.on('line', (line) => {
    const next = waiting.shift();
    if (next) { echo(line); next(line); }
    else queued.push(line);
  });
  rl.on('close', () => {
    closed = true;
    while (waiting.length) waiting.shift()('');
  });

  return {
    ask(question) {
      stdout.write(question);
      if (queued.length) {
        const line = queued.shift();
        echo(line);
        return Promise.resolve(line);
      }
      if (closed) return Promise.resolve('');
      return new Promise((resolve) => waiting.push(resolve));
    },
    close: () => rl.close(),
  };
}

// ----------------------------------------------------------------------- run ---

async function main() {
  DRY = process.argv.includes('--dry-run');
  const assumeYes = process.argv.includes('--yes') || process.argv.includes('-y');

  console.log(`\n${c.bold}${c.cyan}Remove examples${c.reset}`);
  if (DRY) console.log(`${c.yellow}dry run - nothing will be written${c.reset}`);
  console.log('');

  if (!exists(SRC)) { fail(`could not find the app at ${SRC}`); process.exit(1); }

  const available = EXAMPLES.filter(installed);
  const already = EXAMPLES.length - available.length;

  if (!available.length) {
    console.log(`${c.green}Every example has already been removed. Nothing to do.${c.reset}\n`);
    process.exit(0);
  }

  let chosen = null;
  const fromFlag = readArg('--examples');
  if (fromFlag) {
    chosen = parseSelection(fromFlag, available);
    if (!chosen?.length) { fail(`could not read --examples "${fromFlag}"`); process.exit(1); }
  }

  const prompt = createPrompt();
  try {
    if (!chosen) {
      console.log(`${c.bold}Still installed${c.reset}${already ? `  ${c.dim}(${already} already removed)${c.reset}` : ''}`);
      available.forEach((ex, i) => {
        console.log(`  ${String(i + 1).padStart(2)}. ${c.bold}${ex.label}${c.reset}  ${c.dim}${ex.id}${c.reset}`);
        console.log(`      ${c.dim}${ex.detail}${c.reset}`);
      });
      console.log(`\n  ${c.dim}Pick numbers (1,3), a range (2-4), an id, or "all".${c.reset}`);
      console.log(`  ${c.dim}Run it again later to remove more - it only lists what is left.${c.reset}`);

      while (!chosen?.length) {
        const raw = await prompt.ask('\nRemove which? (blank to cancel): ');
        if (!raw.trim()) { console.log('\nCancelled.\n'); prompt.close(); process.exit(0); }
        chosen = parseSelection(raw, available);
        if (!chosen) { fail('pick numbers from the list, a range, an id, or "all"'); chosen = null; }
        else if (!chosen.length) fail('nothing matched');
      }
    }

    console.log(`\n${c.bold}Plan${c.reset}`);
    for (const ex of chosen) {
      console.log(`  ${c.cyan}${ex.label}${c.reset}`);
      console.log(`      pages   ${c.dim}${ex.pages.join(', ')}${c.reset}`);
      if (ex.sidebarItems.length) console.log(`      sidebar ${c.dim}${ex.sidebarItems.join(', ')}${c.reset}`);
      if (ex.i18nBlocks.length) console.log(`      i18n    ${c.dim}${ex.i18nBlocks.join(', ')} (+${ex.i18nKeys.length} keys)${c.reset}`);
      if (ex.scss.length) console.log(`      styles  ${c.dim}${ex.scss.length} stylesheet(s)${c.reset}`);
      if (ex.sharedFiles.length) console.log(`      redux   ${c.dim}${ex.sharedFiles.join(', ')} (if unused)${c.reset}`);
    }

    const keeping = available.filter((ex) => !chosen.includes(ex));
    console.log(`\n  keeping : ${c.green}${keeping.length ? keeping.map((e) => e.id).join(', ') : 'nothing - every example goes'}${c.reset}`);
    console.log(`\n  ${c.yellow}This deletes files. Commit first if you have not.${c.reset}`);

    if (!assumeYes && !DRY) {
      const a = (await prompt.ask('\nProceed? (y/N): ')).trim().toLowerCase();
      if (a !== 'y' && a !== 'yes') { console.log('\nCancelled.\n'); prompt.close(); process.exit(0); }
    }

    prompt.close();

    console.log(`\n${c.bold}Pages${c.reset}`);
    removePageFiles(chosen);

    console.log(`\n${c.bold}Routes${c.reset}`);
    updateRoutes(chosen);

    console.log(`\n${c.bold}Sidebar${c.reset}`);
    updateSidebar(chosen);

    console.log(`\n${c.bold}Translations${c.reset}`);
    updateLocales(chosen);

    console.log(`\n${c.bold}Styles${c.reset}`);
    updateStyles(chosen);

    console.log(`\n${c.bold}Landing page${c.reset}`);
    updateHome(chosen);

    console.log(`\n${c.bold}Redux${c.reset}`);
    updateSharedFiles(chosen);

    if (!DRY) {
      console.log(`\n${c.bold}Check${c.reset}`);
      reportDangling(chosen);
    }

    const left = EXAMPLES.filter(installed).filter((ex) => !chosen.includes(ex));
    console.log(`\n${c.green}${c.bold}Done.${c.reset}`);
    if (DRY) console.log(`${c.yellow}(dry run - nothing was actually written)${c.reset}`);
    if (left.length && !DRY) {
      console.log(`\n${c.dim}Still installed: ${left.map((e) => e.id).join(', ')} - run this again to remove more.${c.reset}`);
    }
    console.log(`\n${c.bold}Next:${c.reset} cd app && npx tsc -b && npm run build\n`);
  } finally {
    prompt.close();
  }
}

main().catch((err) => { fail(err?.stack ?? String(err)); process.exit(1); });
