import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import ChangePasswordModal from "../../../features/auth/components/ChangePasswordModal";
import { toggleTheme } from "../../slices/theme.slice";
import { toggleSidebarCollapsed, setSidebarMobileOpen } from "../../slices/layout.slice";
import { logout } from "../../../features/auth/slices/Auth.slice";
import { useNavigate } from "react-router-dom";
import PanelDropdown from "../../../shared/components/navigation/PanelDropdown";
import Avatar from "../../../shared/components/media/Avatar";
import MenuIcon from "../../../assets/icons/MenuIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import SunIcon from "../../../assets/icons/SunIcon";
import MoonIcon from "../../../assets/icons/MoonIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import NotificationBell from "../../../features/notifications/components/NotificationBell";
import LanguageSwitcher from "../../../shared/components/navigation/LanguageSwitcher";

// ══════════════════════════════════════════════════════════════════
// NAVBAR: Floating
// Rounded with shadow, ring, glass blur.
// Used with: Floating, FloatingDark, FloatingColorful*,
//   FloatingGlass
// SCSS: layout/navbars/_navbar-floating.scss
// ══════════════════════════════════════════════════════════════════

const NavbarFloating = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { sidebarCollapsed } = useSelector(
    (state: RootState) => state.layout
  );
  const { firstName, lastName, profileImageUrl } = useSelector(
    (state: RootState) => state.auth
  );
  const profileSrc = useFileSrc(profileImageUrl);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
  <>
    <header className="navbar navbar-floating sticky top-3 z-30 mx-3 flex h-14 items-center rounded-2xl px-4 shadow-lg backdrop-blur-md transition-all ring-1">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => dispatch(setSidebarMobileOpen(true))}
          className="navbar-btn rounded-lg p-2 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={() => dispatch(toggleSidebarCollapsed())}
          className="navbar-btn hidden rounded-lg p-2 lg:flex"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeftIcon
            className={`h-5 w-5 transition-transform ${
              sidebarCollapsed
                ? i18n.dir() === "rtl" ? "-rotate-180" : ""
                : i18n.dir() === "rtl" ? "" : "-rotate-180"
            }`}
          />
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="navbar-theme-btn rounded-lg p-2 transition-colors"
          title={t("navbar.toggleTheme")}
        >
          {themeMode === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>

        {/* Language toggle */}
        <LanguageSwitcher buttonClass="navbar-lang-btn rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors" />

        <NotificationBell />

        <PanelDropdown
          trigger={
            <div className="flex items-center gap-3 rounded-xl border ce-divider px-3 py-2 user-dropdown-item transition-colors duration-200">
              <Avatar
                src={profileSrc || undefined}
                name={`${firstName} ${lastName}`}
                alt={`${firstName} ${lastName}`}
                size="sm"
              />
              <div className="text-left">
                <p className="text-sm font-medium ce-heading">{firstName} {lastName}</p>
              </div>
              <ChevronDownIcon className="navbar-chevron hidden h-4 w-4 transition-transform sm:block" />
            </div>
          }
          placement={i18n.dir() === "rtl" ? "bottom-start" : "bottom-end"}
          width="w-72"
          header={
            <div className="flex items-center gap-3">
              <Avatar
                src={profileSrc || undefined}
                name={`${firstName} ${lastName}`}
                alt={`${firstName} ${lastName}`}
                size="lg"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold ce-heading truncate">{firstName} {lastName}</p>
              </div>
            </div>
          }
          footer={
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-3 text-center text-sm font-medium user-dropdown-logout transition-colors duration-200"
            >
              {t("navbar.logout")}
            </button>
          }
        >
          <div className="py-1">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm user-dropdown-item transition-colors duration-100"
            >
              <UserIcon className="w-4 h-4 ce-muted" />
              {t("navbar.profile")}
            </button>
            <button
              type="button"
              onClick={() => setChangePasswordOpen(true)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm user-dropdown-item transition-colors duration-100"
            >
              <LockIcon className="w-4 h-4 ce-muted" />
              {t("navbar.changePassword")}
            </button>
          </div>
        </PanelDropdown>
      </div>
    </header>
    <ChangePasswordModal open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
  </>
  );
};

export default NavbarFloating;
