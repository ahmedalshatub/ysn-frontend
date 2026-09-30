# Classic Dark Sidebar

> Dark version of Classic — dark background, subtle borders.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Classic Dark Sidebar** block (~line 364). Comment out all other sidebar variable blocks.

```scss
// ── Classic Dark Sidebar ───────────────────────────
// $sidebar-bg: #1e293b;
// $sidebar-border: #334155;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-classic-dark`:

```scss
@import "layout/sidebars/sidebar-classic-dark";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ClassicDarkSidebar from "./sidebars/ClassicDarkSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ClassicDarkSidebar;

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
