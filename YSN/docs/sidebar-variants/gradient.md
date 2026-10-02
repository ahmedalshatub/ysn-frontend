# Gradient Sidebar

> Dark background with a gradient overlay and bright accents.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Gradient Sidebar** block (~line 300). Comment out all other sidebar variable blocks.

```scss
// ── Gradient Sidebar ───────────────────────────────
// $sidebar-bg: #0f172a;
// $sidebar-border: #1e293b;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-gradient`:

```scss
@import "layout/sidebars/sidebar-gradient";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import GradientSidebar from "./sidebars/GradientSidebar";

const SelectedSidebar: React.FC<SidebarProps> = GradientSidebar;

const USES_DARK_LOGO = true;  // ← dark background needs white logo
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
