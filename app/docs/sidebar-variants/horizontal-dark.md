# Horizontal Layout (Dark)

> No sidebar. Navbar with logo + dark horizontal navigation bar underneath.

## Steps to Activate

### 1. `src/assets/scss/app.scss`

**Navbar** — uncomment `navbar-horizontal-dark`, comment out all others:

```scss
// @import "layout/navbars/navbar-standard";
// @import "layout/navbars/navbar-floating";
// @import "layout/navbars/navbar-bordered";
// @import "layout/navbars/navbar-minimal";
// @import "layout/navbars/navbar-horizontal";
@import "layout/navbars/navbar-horizontal-dark";
```

**Sidebar** — comment out ALL sidebar imports (keep `sidebar-shared` imported):

```scss
@import "layout/sidebars/sidebar-shared";

// ── ALL sidebar variants below should be COMMENTED OUT ──
// @import "layout/sidebars/sidebar-classic";
// @import "layout/sidebars/sidebar-modern";
// ... everything commented
```

### 2. `src/assets/scss/_variables.scss`

No sidebar variable block needed — comment out all sidebar variable blocks.

### 3. `src/core/routes/AllRoutes.tsx`

```tsx
// import AuthLayout from "../layout/AuthLayout.tsx";
// import HorizontalAuthLayout from "../layout/HorizontalAuthLayout.tsx";
import HorizontalDarkAuthLayout from "../layout/HorizontalDarkAuthLayout.tsx";

const Layout = HorizontalDarkAuthLayout;
```

### 4. Files NOT changed

- `src/core/layout/AuthLayout.tsx` — not used in this mode
- `src/core/layout/SidebarWrapper.tsx` — not used in this mode

---

**Navbar:** NavbarHorizontalDark | **Sidebar:** None | **Layout:** Horizontal (Dark)
