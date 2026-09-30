# Glass Dark Sidebar

> Dark translucent glass with blur effect.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Glass Dark Sidebar** block (~line 545). Comment out all other sidebar variable blocks.

```scss
// ── Glass Dark Sidebar ─────────────────────────────
// $sidebar-bg: rgba(15, 23, 42, 0.85);
// $sidebar-border: rgba(51, 65, 85, 0.5);
// $sidebar-blur: 16px;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-glass-dark`:

```scss
@import "layout/sidebars/sidebar-glass-dark";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import GlassDarkSidebar from "./sidebars/GlassDarkSidebar";

const SelectedSidebar: React.FC<SidebarProps> = GlassDarkSidebar;

const USES_DARK_LOGO = true;  // ← dark glass background needs white logo
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
