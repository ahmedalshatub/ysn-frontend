# Modern Sidebar

> Dark slate background with vibrant primary accents.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Modern Sidebar** block (~line 240). Comment out all other sidebar variable blocks.

```scss
// ── Modern Sidebar ─────────────────────────────────
// $sidebar-bg: #1e293b;
// $sidebar-border: #334155;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
// @import "layout/navbars/navbar-floating";
// @import "layout/navbars/navbar-bordered";
// @import "layout/navbars/navbar-minimal";
```

**Sidebar** — uncomment `sidebar-modern`:

```scss
// @import "layout/sidebars/sidebar-classic";
@import "layout/sidebars/sidebar-modern";
// ... all others commented
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
// import ClassicSidebar from "./sidebars/ClassicSidebar";
import ModernSidebar from "./sidebars/ModernSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ModernSidebar;

const USES_DARK_LOGO = true;  // ← dark background needs white logo
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
import Navbar from "./navbars/NavbarStandard";
// import Navbar from "./navbars/NavbarFloating";
// import Navbar from "./navbars/NavbarBordered";
// import Navbar from "./navbars/NavbarMinimal";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Standard | **Dark logo:** Yes | **Layout:** Vertical
