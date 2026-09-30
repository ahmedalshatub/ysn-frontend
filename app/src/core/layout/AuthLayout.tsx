import type { ReactNode } from "react";
import { Suspense } from "react";
import SidebarWrapper from "./SidebarWrapper";

// ══════════════════════════════════════════════════════════════════
// VERTICAL AUTH LAYOUT
// Uses a sidebar + navbar combination.
// Uncomment ONE navbar import below that matches your sidebar choice.
// See app.scss sidebar section for which navbar each sidebar needs.
//
// If you want horizontal layout instead, use HorizontalAuthLayout.
// See AllRoutes.tsx to switch between layout files.
// ══════════════════════════════════════════════════════════════════

// ── Navbar Component ───────────────────────────────
// import Navbar from "./navbars/NavbarStandard";
import Navbar from "./navbars/NavbarFloating";
// import Navbar from "./navbars/NavbarBordered";
// import Navbar from "./navbars/NavbarMinimal";

interface AuthLayoutProps {
  children: ReactNode;
}

const loading = () => (
  <div className="flex h-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 auth-spinner" />
  </div>
);

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout flex h-screen overflow-hidden">
      <SidebarWrapper />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <Suspense fallback={loading()}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
