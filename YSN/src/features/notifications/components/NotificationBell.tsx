import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import PanelDropdown from "../../../shared/components/navigation/PanelDropdown";
import BellIcon from "../../../assets/icons/BellIcon";
import { useGetAllNotificationsQuery, useGetUnreadCountQuery, useMarkAllAsReadMutation } from "../api/Notifications.api";
import useNotificationOpener from "../hooks/useNotificationOpener";
import NotificationItem from "./NotificationItem";
import NotificationDrawer from "./NotificationDrawer";

const NotificationBell = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const { open, modal } = useNotificationOpener(closeDrawer);

  const { data } = useGetAllNotificationsQuery({ sortBy: "createdAt", isAscending: false, pageNumber: 1, pageSize: 5 });
  const { data: unreadCount = 0 } = useGetUnreadCountQuery();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const items = data?.items ?? [];

  return (
    <>
      <PanelDropdown
        trigger={
          <div className="relative">
            <button type="button" className="navbar-btn rounded-lg p-2 transition-colors">
              <BellIcon className="h-5 w-5" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 ce-danger-bg text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
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
              <button type="button" onClick={() => markAllAsRead()} className="text-xs font-medium ce-primary-text hover:underline">
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
        {items.length > 0 ? (
          <div className="flex flex-col gap-2 p-3">
            {items.map((item) => (
              <NotificationItem key={item.id} notification={item} onOpen={open} />
            ))}
          </div>
        ) : (
          <p className="px-4 py-8 text-center text-sm ce-muted">{t("notifications.noNotifications")}</p>
        )}
      </PanelDropdown>
      {drawerOpen && <NotificationDrawer open onClose={closeDrawer} onOpenNotification={open} />}
      {modal}
    </>
  );
};

export default NotificationBell;
