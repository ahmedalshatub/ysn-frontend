# Floating Colorful (Pink) Sidebar

> Detached pink sidebar with shadow, rounded corners.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Floating Colorful (Pink) Sidebar** block (~line 515). Comment out all other sidebar variable blocks.

```scss
// ── Floating Colorful (Pink) Sidebar ───────────────
// $sidebar-bg: #be185d;
// $sidebar-border: #9d174d;
// $sidebar-floating-bg: #be185d;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-floating`:

```scss
// @import "layout/navbars/navbar-standard";
@import "layout/navbars/navbar-floating";
```

**Sidebar** — uncomment `sidebar-floating-colorful`:

```scss
@import "layout/sidebars/sidebar-floating-colorful";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import FloatingColorfulSidebar from "./sidebars/FloatingColorfulSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingColorfulSidebar;

const USES_DARK_LOGO = true;  // ← colored background needs white logo
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
