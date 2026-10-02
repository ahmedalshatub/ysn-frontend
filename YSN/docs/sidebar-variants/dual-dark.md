# Dual Dark Sidebar

> Two-panel sidebar with icon strip + expanded panel, dark theme.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Dual Dark Sidebar** block (~line 427). Comment out all other sidebar variable blocks.

```scss
// ── Dual Dark Sidebar ──────────────────────────────
// $sidebar-bg: #1e293b;
// $sidebar-border: #334155;
// $sidebar-dual-strip-bg: #0f172a;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-dual-dark`:

```scss
@import "layout/sidebars/sidebar-dual-dark";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import DualDarkSidebar from "./sidebars/DualDarkSidebar";

const SelectedSidebar: React.FC<SidebarProps> = DualDarkSidebar;

const USES_DARK_LOGO = true;  // ← dark background needs white logo
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

**Navbar:** Standard | **Dark logo:** Yes | **Layout:** Vertical
