# Floating Colorful Teal Sidebar

> Detached teal sidebar with shadow, rounded corners.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Floating Colorful Teal Sidebar** block (~line 530). Comment out all other sidebar variable blocks.

```scss
// ── Floating Colorful Teal Sidebar ─────────────────
// $sidebar-bg: #0d9488;
// $sidebar-border: #0f766e;
// $sidebar-floating-bg: #0d9488;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-floating`:

```scss
// @import "layout/navbars/navbar-standard";
@import "layout/navbars/navbar-floating";
```

**Sidebar** — uncomment `sidebar-floating-colorful-teal`:

```scss
@import "layout/sidebars/sidebar-floating-colorful-teal";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import FloatingColorfulTealSidebar from "./sidebars/FloatingColorfulTealSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingColorfulTealSidebar;

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
