import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { markAllAsRead } from "../../../features/notifications/slices/notification.slice";
import NotificationDropdown from "../../../features/notifications/components/NotificationDropdown";

const NavbarNotificationDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notification
  );

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

  const notificationItems = notifications.slice(0, 5).map((notif) => ({
    id: String(notif.id),
    title: notif.title,
    message: notif.message,
    time: formatTimeAgo(notif.createdAt),
    read: notif.isRead,
    type: "info" as const,
  }));

  return (
    <NotificationDropdown
      notifications={notificationItems}
      unreadCount={unreadCount}
      onMarkAllRead={() => dispatch(markAllAsRead())}
      title={t("notifications.title")}
      emptyText={t("notifications.noNotifications")}
    />
  );
};

export default NavbarNotificationDropdown;
