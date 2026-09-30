# Layout setup

Picks the dashboard layout — orientation and sidebar variant — and deletes the
ones you did not choose.

> **This deletes files. Commit first.**

## Run it

```bash
node Scripts/layout-setup/layout-setup.mjs
```

or, from `app/`:

```bash
npm run layout-setup
```

Preview without changing anything:

```bash
node Scripts/layout-setup/layout-setup.mjs --dry-run
```

Non-interactive:

```bash
node Scripts/layout-setup/layout-setup.mjs --orientation vertical --variant classic-dark --yes
node Scripts/layout-setup/layout-setup.mjs --orientation horizontal --yes
```

## What it asks

**1. Orientation**

| | |
|---|---|
| `vertical` | sidebar down the side, using one of the sidebar variants |
| `horizontal` | no sidebar — a light menu bar under the navbar |
| `horizontal-dark` | no sidebar — a dark menu bar under the navbar |

**2. Sidebar variant** — vertical only, 21 of them. The list is read from
`app.scss`, so it is always accurate:

`bordered` `classic` `classic-dark` `colorful` `colorful-ocean`
`colorful-orange` `colorful-teal` `compact` `compact-dark` `dual` `dual-dark`
`floating` `floating-colorful` `floating-colorful-teal` `floating-dark`
`floating-glass` `glass-dark` `gradient` `minimal` `modern` `shadow`

**There is no navbar question.** Each sidebar requires a particular navbar, and
`app.scss` already records which — the script reads that and writes it for you.

## The problem it solves

Switching layout by hand means editing **five** places and keeping them in
agreement:

1. the `Layout` constant and its import in `routes/AllRoutes.tsx`
2. the sidebar import and `SelectedSidebar` in `layout/SidebarWrapper.tsx`
3. the navbar import in `layout/AuthLayout.tsx`
4. the sidebar and navbar `@import` lines in `assets/scss/app.scss`
5. the matching variable block in `assets/scss/_variables.scss`

Plus `USES_DARK_LOGO`, which has to match whether the sidebar has a dark
background — get that wrong and the logo disappears into it.

Number 5 is the one that bites: `_variables.scss` carries one block per variant
with exactly one uncommented, and four of the dark sidebars read
`$sidebar-alt-bg`, which only their own block defines. Pick `classic-dark`
without uncommenting its block and sass stops with `Undefined variable`. Miss
any of the others and the layout breaks quietly instead.

## What it does

- **rewrites `routes/AllRoutes.tsx`** to import and use the chosen wrapper
- **vertical** — rewrites `SidebarWrapper.tsx` (one import, `SelectedSidebar`,
  `USES_DARK_LOGO`) and `AuthLayout.tsx` (the navbar its sidebar requires),
  keeps that one sidebar component and deletes the other 20
- **horizontal / horizontal-dark** — deletes all 21 sidebars plus
  `SidebarWrapper.tsx`, `SidebarItem.tsx` and `sidebars/types.ts`, which nothing
  can reach without a sidebar
- **deletes the two layout wrappers you did not choose**, and the horizontal nav
  belonging to the one that went
- **deletes every navbar but the one in use** — `NavbarNotificationDropdown` and
  `NavbarProfileDropdown` are shared and always survive
- **deletes the unused stylesheets** and collapses both "uncomment one" blocks in
  `app.scss` to the single live `@import` each
- **deletes the unused variable blocks** in `_variables.scss` and uncomments the
  one the chosen stylesheet needs

## Notes

- **Not re-runnable.** Once the other variants are deleted there is nothing left
  to choose from. Run it once, early — same as `auth-setup`.
- The variant list, and which navbar each sidebar needs, are **discovered, not
  hardcoded**: both come from the table of commented `@import` lines that
  `app.scss` already carries. A component on disk that the table does not list
  is reported rather than silently hidden from the menu.
- The variable blocks are matched by their headings (`// ── Classic Dark Sidebar
  ──`), so that mapping is derived too.
- `--dry-run` previews everything, since each step is decided from your choices
  rather than from what survived.

## After running it

```bash
cd app
npx tsc -b
npm run dev
```
