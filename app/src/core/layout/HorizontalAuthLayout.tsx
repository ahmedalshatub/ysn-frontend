import type { ReactNode } from "react";
import { Suspense } from "react";
import Navbar from "./navbars/NavbarHorizontal";
import HorizontalNav from "./HorizontalNav";

// ══════════════════════════════════════════════════════════════════
// HORIZONTAL AUTH LAYOUT (Light)
// Uses NavbarHorizontal + horizontal navigation bar (no sidebar).
// Also uncomment @import "layout/navbars/navbar-horizontal" in app.scss.
// If you want horizontal dark navigation, use HorizontalDarkAuthLayout.
// If you want vertical sidebar layout, use AuthLayout.
// See AllRoutes.tsx to switch between layout files.
// ══════════════════════════════════════════════════════════════════

interface HorizontalAuthLayoutProps {
  children: ReactNode;
}

const loading = () => (
  <div className="flex h-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 auth-spinner" />
  </div>
);

const HorizontalAuthLayout = ({ children }: HorizontalAuthLayoutProps) => {
  return (
    <div className="auth-layout flex min-h-screen flex-col">
      <Navbar />
      <HorizontalNav />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <Suspense fallback={loading()}>{children}</Suspense>
      </main>
    </div>
  );
};

export default HorizontalAuthLayout;
