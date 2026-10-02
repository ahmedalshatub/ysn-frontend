# Floating Glass Sidebar

> Detached translucent glass with blur, shadow, rounded corners.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Floating Glass Sidebar** block (~line 564). Comment out all other sidebar variable blocks.

```scss
// ── Floating Glass Sidebar ─────────────────────────
// $sidebar-bg: rgba(15, 23, 42, 0.75);
// $sidebar-border: rgba(51, 65, 85, 0.4);
// $sidebar-floating-bg: rgba(15, 23, 42, 0.75);
// $sidebar-blur: 20px;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-floating`:

```scss
// @import "layout/navbars/navbar-standard";
@import "layout/navbars/navbar-floating";
```

**Sidebar** — uncomment `sidebar-floating-glass`:

```scss
@import "layout/sidebars/sidebar-floating-glass";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import FloatingGlassSidebar from "./sidebars/FloatingGlassSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingGlassSidebar;

const USES_DARK_LOGO = true;  // ← dark glass background needs white logo
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
