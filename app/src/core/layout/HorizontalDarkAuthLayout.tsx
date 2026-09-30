import type { ReactNode } from "react";
import { Suspense } from "react";
import Navbar from "./navbars/NavbarHorizontalDark";
import HorizontalNavDark from "./HorizontalNavDark";

// ══════════════════════════════════════════════════════════════════
// HORIZONTAL DARK AUTH LAYOUT
// Uses NavbarHorizontalDark + dark horizontal navigation bar (no sidebar).
// Also uncomment @import "layout/navbars/navbar-horizontal-dark" in app.scss.
// If you want horizontal light navigation, use HorizontalAuthLayout.
// If you want vertical sidebar layout, use AuthLayout.
// See AllRoutes.tsx to switch between layout files.
// ══════════════════════════════════════════════════════════════════

interface HorizontalDarkAuthLayoutProps {
  children: ReactNode;
}

const loading = () => (
  <div className="flex h-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 auth-spinner" />
  </div>
);

const HorizontalDarkAuthLayout = ({ children }: HorizontalDarkAuthLayoutProps) => {
  return (
    <div className="auth-layout flex min-h-screen flex-col">
      <Navbar />
      <HorizontalNavDark />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <Suspense fallback={loading()}>{children}</Suspense>
      </main>
    </div>
  );
};

export default HorizontalDarkAuthLayout;
