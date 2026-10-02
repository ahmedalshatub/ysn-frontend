# Colorful Ocean Sidebar

> Deep blue/ocean background with white text.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Colorful Ocean Sidebar** block (~line 501). Comment out all other sidebar variable blocks.

```scss
// ── Colorful Ocean Sidebar ─────────────────────────
// $sidebar-bg: #1d4ed8;
// $sidebar-border: #1e40af;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-colorful-ocean`:

```scss
@import "layout/sidebars/sidebar-colorful-ocean";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ColorfulOceanSidebar from "./sidebars/ColorfulOceanSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ColorfulOceanSidebar;

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
