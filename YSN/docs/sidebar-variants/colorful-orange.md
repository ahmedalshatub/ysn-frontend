# Colorful Orange Sidebar

> Vibrant orange background with white text.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Colorful Orange Sidebar** block (~line 487). Comment out all other sidebar variable blocks.

```scss
// ── Colorful Orange Sidebar ────────────────────────
// $sidebar-bg: #ea580c;
// $sidebar-border: #c2410c;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-colorful-orange`:

```scss
@import "layout/sidebars/sidebar-colorful-orange";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ColorfulOrangeSidebar from "./sidebars/ColorfulOrangeSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ColorfulOrangeSidebar;

const USES_DARK_LOGO = true;  // ← colored background needs white logo
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
