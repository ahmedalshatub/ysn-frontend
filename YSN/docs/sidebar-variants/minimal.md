# Minimal Sidebar

> Ultra-clean, barely-there border, maximum content focus.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Minimal Sidebar** block (~line 313). Comment out all other sidebar variable blocks.

```scss
// ── Minimal Sidebar ────────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-border: $border-color-light;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-minimal`:

```scss
// @import "layout/navbars/navbar-standard";
// @import "layout/navbars/navbar-floating";
// @import "layout/navbars/navbar-bordered";
@import "layout/navbars/navbar-minimal";
```

**Sidebar** — uncomment `sidebar-minimal`:

```scss
@import "layout/sidebars/sidebar-minimal";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import MinimalSidebar from "./sidebars/MinimalSidebar";

const SelectedSidebar: React.FC<SidebarProps> = MinimalSidebar;

const USES_DARK_LOGO = false;
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
// import Navbar from "./navbars/NavbarStandard";
// import Navbar from "./navbars/NavbarFloating";
// import Navbar from "./navbars/NavbarBordered";
import Navbar from "./navbars/NavbarMinimal";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Minimal | **Dark logo:** No | **Layout:** Vertical
