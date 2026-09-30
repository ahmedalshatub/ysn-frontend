# Floating Dark Sidebar

> Dark floating sidebar — detached with shadow, dark background.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Floating Dark Sidebar** block (~line 382). Comment out all other sidebar variable blocks.

```scss
// ── Floating Dark Sidebar ──────────────────────────
// $sidebar-bg: #1e293b;
// $sidebar-border: #334155;
// $sidebar-floating-bg: #1e293b;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-floating`:

```scss
// @import "layout/navbars/navbar-standard";
@import "layout/navbars/navbar-floating";
```

**Sidebar** — uncomment `sidebar-floating-dark`:

```scss
@import "layout/sidebars/sidebar-floating-dark";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import FloatingDarkSidebar from "./sidebars/FloatingDarkSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingDarkSidebar;

const USES_DARK_LOGO = true;  // ← dark background needs white logo
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
// import Navbar from "./navbars/NavbarStandard";
import Navbar from "./navbars/NavbarFloating";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Floating | **Dark logo:** Yes | **Layout:** Vertical
