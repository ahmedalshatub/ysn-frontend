# Sidebar & Layout Variant Guides

Each `.md` file in this folder contains **exact step-by-step instructions** for activating a specific sidebar or layout variant.

## Quick Reference

| # | Variant | Navbar | Dark Logo? | Guide |
|---|---------|--------|------------|-------|
| 1 | Classic | Standard | No | [classic.md](./classic.md) |
| 2 | Modern | Standard | Yes | [modern.md](./modern.md) |
| 3 | Compact | Standard | No | [compact.md](./compact.md) |
| 4 | Floating | Floating | No | [floating.md](./floating.md) |
| 5 | Bordered | Bordered | No | [bordered.md](./bordered.md) |
| 6 | Gradient | Standard | Yes | [gradient.md](./gradient.md) |
| 7 | Minimal | Minimal | No | [minimal.md](./minimal.md) |
| 8 | Dual | Standard | No | [dual.md](./dual.md) |
| 9 | Shadow | Standard | No | [shadow.md](./shadow.md) |
| 10 | Classic Dark | Standard | Yes | [classic-dark.md](./classic-dark.md) |
| 11 | Floating Dark | Floating | Yes | [floating-dark.md](./floating-dark.md) |
| 12 | Compact Dark | Standard | Yes | [compact-dark.md](./compact-dark.md) |
| 13 | Dual Dark | Standard | Yes | [dual-dark.md](./dual-dark.md) |
| 14 | Colorful (Pink) | Standard | Yes | [colorful-pink.md](./colorful-pink.md) |
| 15 | Colorful Teal | Standard | Yes | [colorful-teal.md](./colorful-teal.md) |
| 16 | Colorful Orange | Standard | Yes | [colorful-orange.md](./colorful-orange.md) |
| 17 | Colorful Ocean | Standard | Yes | [colorful-ocean.md](./colorful-ocean.md) |
| 18 | Floating Colorful (Pink) | Floating | Yes | [floating-colorful-pink.md](./floating-colorful-pink.md) |
| 19 | Floating Colorful Teal | Floating | Yes | [floating-colorful-teal.md](./floating-colorful-teal.md) |
| 20 | Glass Dark | Standard | Yes | [glass-dark.md](./glass-dark.md) |
| 21 | Floating Glass | Floating | Yes | [floating-glass.md](./floating-glass.md) |
| 22 | Horizontal (Light) | Horizontal | — | [horizontal-light.md](./horizontal-light.md) |
| 23 | Horizontal (Dark) | Horizontal Dark | — | [horizontal-dark.md](./horizontal-dark.md) |

## How It Works

Every variant requires changes in **exactly 4 files** (vertical layouts) or **3 files** (horizontal layouts):

### Vertical Layouts (sidebar + navbar)

1. **`src/assets/scss/_variables.scss`** — Uncomment the sidebar variable block
2. **`src/assets/scss/app.scss`** — Uncomment the sidebar SCSS import + navbar SCSS import
3. **`src/core/layout/SidebarWrapper.tsx`** — Uncomment the sidebar component import + set `SelectedSidebar` + set `USES_DARK_LOGO`
4. **`src/core/layout/AuthLayout.tsx`** — Uncomment the matching navbar component import

### Horizontal Layouts (navbar + horizontal nav bar)

1. **`src/assets/scss/app.scss`** — Uncomment the horizontal navbar SCSS import, comment out all sidebar imports
2. **`src/core/routes/AllRoutes.tsx`** — Switch from `AuthLayout` to `HorizontalAuthLayout` or `HorizontalDarkAuthLayout`
3. **`src/core/layout/AuthLayout.tsx`** — No changes needed (not used)

> **Rule:** Only ONE sidebar variable block, ONE sidebar SCSS import, ONE navbar SCSS import, and ONE navbar TSX import should be uncommented at a time. Comment out all others.
