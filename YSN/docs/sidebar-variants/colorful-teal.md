# Colorful Teal Sidebar

> Vibrant teal background with white text.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Colorful Teal Sidebar** block (~line 473). Comment out all other sidebar variable blocks.

```scss
// ── Colorful Teal Sidebar ──────────────────────────
// $sidebar-bg: #0d9488;
// $sidebar-border: #0f766e;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-colorful-teal`:

```scss
@import "layout/sidebars/sidebar-colorful-teal";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ColorfulTealSidebar from "./sidebars/ColorfulTealSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ColorfulTealSidebar;

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
