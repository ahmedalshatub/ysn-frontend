import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { allAdminRoutes, allBlankRoutes } from "./index.tsx";
import RequireUser from "../layout/RequireUser.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";

// ══════════════════════════════════════════════════════════════════
// LAYOUT SELECTION
// Uncomment ONE layout component that matches your chosen setup:
//   - AuthLayout               → Vertical layout (sidebar + navbar)
//   - HorizontalAuthLayout     → Horizontal layout (navbar + horizontal nav)
//   - HorizontalDarkAuthLayout → Horizontal dark layout (navbar + dark horizontal nav)
// Delete the unused layout files when done.
// ══════════════════════════════════════════════════════════════════
import AuthLayout from "../layout/AuthLayout.tsx";
// import HorizontalAuthLayout from "../layout/HorizontalAuthLayout.tsx";
// import HorizontalDarkAuthLayout from "../layout/HorizontalDarkAuthLayout.tsx";

// Set this to your chosen layout component (must match the import above)
const Layout = AuthLayout;

const AllRoutes = () => {
  const roleID = useSelector((state: RootState) => state.auth.roleID);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  return (
    <Router>
      <Routes>
        {/* Public (blank) routes */}
        <Route>
          {allBlankRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>

        {/* Protected admin routes */}
        <Route>
          {allAdminRoutes.map((route, idx) => {
            const hasAccess = roleID && route.allowedRoles?.includes(roleID);
            
            if (!isLoggedIn) {
              return (
                <Route 
                  key={idx} 
                  path={route.path} 
                  element={<Navigate to={`/?next=${route.path}`} replace />} 
                />
              );
            }
            
            return hasAccess ? (
              <Route key={idx} element={<RequireUser />}>
                <Route
                  path={route.path}
                  element={<Layout>{route.element}</Layout>}
                />
              </Route>
            ) : null;
          })}
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
