# Floating Sidebar

> Detached from edges with shadow and rounded corners, light background.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Floating Sidebar** block (~line 271). Comment out all other sidebar variable blocks.

```scss
// ── Floating Sidebar ───────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-border: $border-color;
// $sidebar-floating-bg: $surface-bg;
// $sidebar-shadow: 0 8px 32px rgba(0,0,0,0.08);
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-floating`:

```scss
// @import "layout/navbars/navbar-standard";
@import "layout/navbars/navbar-floating";
// @import "layout/navbars/navbar-bordered";
// @import "layout/navbars/navbar-minimal";
```

**Sidebar** — uncomment `sidebar-floating`:

```scss
// @import "layout/sidebars/sidebar-classic";
@import "layout/sidebars/sidebar-floating";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import FloatingSidebar from "./sidebars/FloatingSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingSidebar;

const USES_DARK_LOGO = false;
```

### 4. `src/core/layout/AuthLayout.tsx`

```tsx
// import Navbar from "./navbars/NavbarStandard";
import Navbar from "./navbars/NavbarFloating";
// import Navbar from "./navbars/NavbarBordered";
// import Navbar from "./navbars/NavbarMinimal";
```

### 5. `src/core/routes/AllRoutes.tsx`

```tsx
import AuthLayout from "../layout/AuthLayout.tsx";
const Layout = AuthLayout;
```

---

**Navbar:** Floating | **Dark logo:** No | **Layout:** Vertical
