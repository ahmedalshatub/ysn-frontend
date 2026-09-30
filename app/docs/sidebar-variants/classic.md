# Classic Sidebar

> Light background, clean borders, traditional layout.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Classic Sidebar** block (~line 226). Comment out all other sidebar variable blocks.

```scss
// ── Classic Sidebar ────────────────────────────────
$sidebar-bg: $surface-bg;
$sidebar-border: $border-color;
$sidebar-item-active-bg: rgba($color-primary, 0.08);
// ... rest of the Classic variables
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`, comment out all others:

```scss
@import "layout/navbars/navbar-standard";
// @import "layout/navbars/navbar-floating";
// @import "layout/navbars/navbar-bordered";
// @import "layout/navbars/navbar-minimal";
```

**Sidebar** — uncomment `sidebar-classic`, comment out all others:

```scss
@import "layout/sidebars/sidebar-classic";
// @import "layout/sidebars/sidebar-compact";
// ... all others commented
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ClassicSidebar from "./sidebars/ClassicSidebar";
// all other sidebar imports commented out

const SelectedSidebar: React.FC<SidebarProps> = ClassicSidebar;

const USES_DARK_LOGO = false;
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
// import HorizontalAuthLayout from "../layout/HorizontalAuthLayout.tsx";
// import HorizontalDarkAuthLayout from "../layout/HorizontalDarkAuthLayout.tsx";

const Layout = AuthLayout;
```

---

**Navbar:** Standard | **Dark logo:** No | **Layout:** Vertical
