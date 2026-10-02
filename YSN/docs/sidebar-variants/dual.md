# Dual Sidebar

> Two-panel sidebar with icon strip + expanded panel, light theme.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Dual Sidebar** block (~line 327). Comment out all other sidebar variable blocks.

```scss
// ── Dual Sidebar ───────────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-border: $border-color;
// $sidebar-dual-strip-bg: ...
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-dual`:

```scss
@import "layout/sidebars/sidebar-dual";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import DualSidebar from "./sidebars/DualSidebar";

const SelectedSidebar: React.FC<SidebarProps> = DualSidebar;

const USES_DARK_LOGO = false;
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

**Navbar:** Standard | **Dark logo:** No | **Layout:** Vertical
