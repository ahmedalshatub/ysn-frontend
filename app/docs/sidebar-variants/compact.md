# Compact Sidebar

> Narrower sidebar, light background, space-efficient.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Compact Sidebar** block (~line 258). Comment out all other sidebar variable blocks.

```scss
// ── Compact Sidebar ────────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-border: $border-color;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-compact`:

```scss
// @import "layout/sidebars/sidebar-classic";
@import "layout/sidebars/sidebar-compact";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import CompactSidebar from "./sidebars/CompactSidebar";

const SelectedSidebar: React.FC<SidebarProps> = CompactSidebar;

const USES_DARK_LOGO = false;
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
import Navbar from "./navbars/NavbarStandard";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Standard | **Dark logo:** No | **Layout:** Vertical
