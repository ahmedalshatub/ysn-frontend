# Compact Dark Sidebar

> Narrower dark sidebar, space-efficient, dark background.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Compact Dark Sidebar** block (~line 409). Comment out all other sidebar variable blocks.

```scss
// ── Compact Dark Sidebar ───────────────────────────
// $sidebar-bg: #1e293b;
// $sidebar-border: #334155;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-compact-dark`:

```scss
@import "layout/sidebars/sidebar-compact-dark";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import CompactDarkSidebar from "./sidebars/CompactDarkSidebar";

const SelectedSidebar: React.FC<SidebarProps> = CompactDarkSidebar;

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
