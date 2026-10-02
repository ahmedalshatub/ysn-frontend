# Colorful (Pink) Sidebar

> Vibrant pink/fuchsia background with white text.

## Steps to Activate

### 1. `src/assets/scss/_variables.scss`

Uncomment the **Colorful (Pink) Sidebar** block (~line 459). Comment out all other sidebar variable blocks.

```scss
// ── Colorful (Pink) Sidebar ────────────────────────
// $sidebar-bg: #be185d;
// $sidebar-border: #9d174d;
// ... uncomment this entire block
```

### 2. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-standard`:

```scss
@import "layout/navbars/navbar-standard";
```

**Sidebar** — uncomment `sidebar-colorful`:

```scss
@import "layout/sidebars/sidebar-colorful";
```

### 3. `src/core/layout/SidebarWrapper.tsx`

```tsx
import ColorfulSidebar from "./sidebars/ColorfulSidebar";

const SelectedSidebar: React.FC<SidebarProps> = ColorfulSidebar;

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
