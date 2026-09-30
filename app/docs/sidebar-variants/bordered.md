# Bordered Sidebar

> Strong left/right border emphasis, clean look.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Bordered Sidebar** block (~line 286). Comment out all other sidebar variable blocks.

```scss
// ── Bordered Sidebar ───────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-border: $border-color;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-bordered`:

```scss
// @import "layout/navbars/navbar-standard";
// @import "layout/navbars/navbar-floating";
@import "layout/navbars/navbar-bordered";
// @import "layout/navbars/navbar-minimal";
```

**Sidebar** — uncomment `sidebar-bordered`:

```scss
// @import "layout/sidebars/sidebar-classic";
@import "layout/sidebars/sidebar-bordered";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import BorderedSidebar from "./sidebars/BorderedSidebar";

const SelectedSidebar: React.FC<SidebarProps> = BorderedSidebar;

const USES_DARK_LOGO = false;
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
// import Navbar from "./navbars/NavbarStandard";
// import Navbar from "./navbars/NavbarFloating";
import Navbar from "./navbars/NavbarBordered";
// import Navbar from "./navbars/NavbarMinimal";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Bordered | **Dark logo:** No | **Layout:** Vertical
