# Shadow Sidebar

> Light background with prominent drop shadow, no border.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Shadow Sidebar** block (~line 350). Comment out all other sidebar variable blocks.

```scss
// ── Shadow Sidebar ─────────────────────────────────
// $sidebar-bg: $surface-bg;
// $sidebar-shadow: 4px 0 24px rgba(0,0,0,0.06);
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-shadow`:

```scss
@import "layout/sidebars/sidebar-shadow";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ShadowSidebar from "./sidebars/ShadowSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ShadowSidebar;

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
