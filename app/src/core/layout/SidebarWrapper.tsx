import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { setSidebarMobileOpen } from "../slices/layout.slice";
import Menu from "../config/Menu";
import Logo from "../../shared/components/display/Logo";
import type { SidebarProps } from "./sidebars/types";
import XIcon from "../../assets/icons/XIcon";

// ══════════════════════════════════════════════════════════════════
// SIDEBAR COMPONENT — Uncomment ONE import + set SelectedSidebar.
// Delete unused sidebar files from src/layout/sidebars/ when done.
// ══════════════════════════════════════════════════════════════════
// import ClassicSidebar from "./sidebars/ClassicSidebar";
// import ModernSidebar from "./sidebars/ModernSidebar";
// import CompactSidebar from "./sidebars/CompactSidebar";
import FloatingSidebar from "./sidebars/FloatingSidebar";
// import BorderedSidebar from "./sidebars/BorderedSidebar";
// import GradientSidebar from "./sidebars/GradientSidebar";
// import MinimalSidebar from "./sidebars/MinimalSidebar";
// import DualSidebar from "./sidebars/DualSidebar";
// import ShadowSidebar from "./sidebars/ShadowSidebar";
// import ClassicDarkSidebar from "./sidebars/ClassicDarkSidebar";
// import FloatingDarkSidebar from "./sidebars/FloatingDarkSidebar";
// import CompactDarkSidebar from "./sidebars/CompactDarkSidebar";
// import DualDarkSidebar from "./sidebars/DualDarkSidebar";
// import ColorfulSidebar from "./sidebars/ColorfulSidebar";
// import ColorfulTealSidebar from "./sidebars/ColorfulTealSidebar";
// import ColorfulOrangeSidebar from "./sidebars/ColorfulOrangeSidebar";
// import ColorfulOceanSidebar from "./sidebars/ColorfulOceanSidebar";
// import FloatingColorfulSidebar from "./sidebars/FloatingColorfulSidebar";
// import FloatingColorfulTealSidebar from "./sidebars/FloatingColorfulTealSidebar";
// import GlassDarkSidebar from "./sidebars/GlassDarkSidebar";
// import FloatingGlassSidebar from "./sidebars/FloatingGlassSidebar";

const SelectedSidebar: React.FC<SidebarProps> = FloatingSidebar;

// ── DARK LOGO ──────────────────────────────────────────────────
// Set to true if your sidebar has a dark background so the logo
// always uses the white/dark variant regardless of theme toggle.
// Dark-bg sidebars: Modern, Gradient, ClassicDark, FloatingDark,
//   CompactDark, DualDark, Colorful*, Glass*, FloatingColorful*, FloatingGlass
const USES_DARK_LOGO = false;

const SidebarWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const isDark = themeMode === "dark";
  const roleID = useSelector((state: RootState) => state.auth.roleID);
  const { sidebarCollapsed, sidebarMobileOpen } = useSelector(
    (state: RootState) => state.layout
  );

  const filteredMenu = Menu.filter((item) =>
    item.allowedRoles.includes(roleID)
  );

  const logoElement = (
    <Logo
      orientation="landscape"
      theme={USES_DARK_LOGO ? "dark" : isDark ? "dark" : "light"}
      width={200}
    />
  );

  const collapsedLogoElement = (
    <Logo
      orientation="portrait"
      theme={USES_DARK_LOGO ? "dark" : isDark ? "dark" : "light"}
      height={46}
    />
  );

  const sidebarProps: SidebarProps = {
    menu: filteredMenu,
    collapsed: sidebarCollapsed,
    isDark,
    roleID,
    logoElement,
    collapsedLogoElement,
  };

  return (
    <>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <SelectedSidebar {...sidebarProps} />
      </div>

      {sidebarMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => dispatch(setSidebarMobileOpen(false))}
          />
          <div className="fixed inset-y-0 z-50 lg:hidden ltr:left-0 rtl:right-0">
            <div className="relative h-full">
              <SelectedSidebar {...sidebarProps} collapsed={false} />
              <button
                type="button"
                onClick={() => dispatch(setSidebarMobileOpen(false))}
                className="sidebar-close-btn absolute top-4 ltr:right-3 rtl:left-3 rounded-lg p-1.5"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SidebarWrapper;
