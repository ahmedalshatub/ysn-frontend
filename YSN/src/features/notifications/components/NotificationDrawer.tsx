import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../../shared/components/navigation/Drawer";
import Tabs from "../../../shared/components/navigation/Tabs";
import Button from "../../../shared/components/buttons/Button";
import Loader from "../../../shared/components/feedback/Loader";
import { showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useGetNotificationsFeedQuery, useMarkAllAsReadMutation } from "../api/Notifications.api";
import NotificationItem from "./NotificationItem";
import type { NotificationDto } from "../types/Notifications.types";

type DrawerTab = "all" | "unread";

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpenNotification: (notification: NotificationDto) => void;
}

const PAGE_SIZE = 20;

const NotificationDrawer = ({ open, onClose, onOpenNotification }: NotificationDrawerProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<DrawerTab>("all");
  const [page, setPage] = useState(1);
  const sentinel = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, error } = useGetNotificationsFeedQuery(
    {
      sortBy: "createdAt",
      isAscending: false,
      pageNumber: page,
      pageSize: PAGE_SIZE,
      isRead: activeTab === "unread" ? false : undefined,
    },
    { skip: !open }
  );
  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

  const items = data?.items ?? [];
  const hasMore = page < (data?.totalPages ?? 0);

  useEffect(() => {
    const target = sentinel.current;
    if (!target || !hasMore || isFetching) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setPage((previous) => previous + 1);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isFetching, items.length]);

  const changeTab = (tab: DrawerTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch (markError) {
      showError(getErrorMessage(markError));
    }
  };

  const renderList = () => {
    if (isFetching && !items.length) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader variant="spinner" size="lg" />
        </div>
      );
    }
    if (error) {
      return <p className="px-4 py-12 text-center text-sm ce-muted">{getErrorMessage(error)}</p>;
    }
    if (!items.length) {
      return (
        <p className="px-4 py-12 text-center text-sm ce-muted">
          {activeTab === "unread" ? t("notifications.noUnreadNotifications") : t("notifications.noNotifications")}
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-2 px-4 pb-4">
        {items.map((item) => (
          <NotificationItem key={item.id} notification={item} onOpen={onOpenNotification} />
        ))}
        <div ref={sentinel} className="h-1" />
        {isFetching && (
          <div className="flex justify-center py-3">
            <Loader variant="spinner" size="sm" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Drawer open={open} onClose={onClose} position="right" size="md" title={t("notifications.title")}>
      <div className="flex flex-col gap-3">
        <Tabs
          tabs={[
            { id: "all", label: t("notifications.all") },
            { id: "unread", label: t("notifications.unread") },
          ]}
          activeTab={activeTab}
          onChange={(id) => changeTab(id as DrawerTab)}
          fullWidth
          size="sm"
        />

        <div className="px-4">
          <Button variant="primary" outline size="sm" block loading={isMarking} label={t("notifications.markAllAsRead")} onClick={handleMarkAll} />
        </div>
        {renderList()}
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
