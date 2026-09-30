import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import ChangePasswordModal from "../../../features/auth/components/ChangePasswordModal";
import { toggleTheme } from "../../slices/theme.slice";
import { toggleSidebarCollapsed, setSidebarMobileOpen } from "../../slices/layout.slice";
import { logout } from "../../../features/auth/slices/Auth.slice";
import { markAllAsRead } from "../../../features/notifications/slices/notification.slice";
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
import NotificationDrawer from "../../../features/notifications/components/NotificationDrawer";
import { useGetAllNotificationsQuery, useGetUnreadCountQuery } from "../../../features/notifications/api/Notifications.api";
import LanguageSwitcher from "../../../shared/components/navigation/LanguageSwitcher";

// ══════════════════════════════════════════════════════════════════
// NAVBAR: Minimal
// Ultra-light border, no backdrop blur.
// Used with: Minimal sidebar
// SCSS: layout/navbars/_navbar-minimal.scss
// ══════════════════════════════════════════════════════════════════

const NavbarMinimal = () => {
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const { data: notificationsData } = useGetAllNotificationsQuery({
    sortBy: "createdAt",
    isAscending: false,
    pageNumber: 1,
    pageSize: 5,
  });

  const { data: unreadCountData } = useGetUnreadCountQuery();
  
  const notifications = notificationsData?.items || [];
  const unreadCount = unreadCountData?.count || 0;


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return t("notifications.justNow");
    if (diff < 3600)
      return t("notifications.minutesAgo", { count: Math.floor(diff / 60) });
    if (diff < 86400)
      return t("notifications.hoursAgo", { count: Math.floor(diff / 3600) });
    return t("notifications.daysAgo", { count: Math.floor(diff / 86400) });
  };

  const notificationItems = notifications.map((notif) => ({
    id: String(notif.id),
    title: notif.title,
    message: notif.message,
    time: formatTimeAgo(notif.createdAt),
    read: notif.isRead,
  }));

  return (
  <>
    <header className="navbar navbar-minimal sticky top-0 z-30 flex h-16 items-center border-b px-4 transition-all">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(setSidebarMobileOpen(true))}
          className="navbar-btn rounded-lg p-2 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

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

        <LanguageSwitcher buttonClass="navbar-lang-btn rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors" />

        <PanelDropdown
          trigger={
            <div className="relative">
              <button className="navbar-btn rounded-lg p-2 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 ce-danger-bg text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </div>
          }
          placement="bottom-end"
          width="w-80"
          header={
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold ce-heading">{t("notifications.title")}</h3>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => dispatch(markAllAsRead())}
                  className="text-xs font-medium ce-primary-text hover:underline"
                >
                  {t("notifications.markAllAsRead")}
                </button>
              )}
            </div>
          }
          footer={
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="w-full px-4 py-3 text-center text-sm font-medium auth-link transition-colors duration-200"
            >
              {t("notifications.viewAll")}
            </button>
          }
        >
          <div>
            {notificationItems.length > 0 ? (
              notificationItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-start gap-3 w-full px-4 py-3 user-dropdown-item transition-colors duration-100 text-left ${!item.read ? "ce-icon-primary-bg/50" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm ce-heading">
                      <span className="font-semibold">{item.title}</span>{" "}
                      <span className="ce-muted">{item.message}</span>
                    </p>
                    <p className="text-xs ce-muted mt-0.5">{item.time}</p>
                  </div>
                  {!item.read && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full ce-dot-primary mt-2" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm ce-muted">{t("notifications.noNotifications")}</p>
              </div>
            )}
          </div>
        </PanelDropdown>

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
    {drawerOpen && <NotificationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
    <ChangePasswordModal open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
  </>
  );
};

export default NavbarMinimal;
