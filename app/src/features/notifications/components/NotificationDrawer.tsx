import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../../shared/components/navigation/Drawer";
import Tabs from "../../../shared/components/navigation/Tabs";
import Button from "../../../shared/components/buttons/Button";
import Loader from "../../../shared/components/feedback/Loader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import {
  useGetAllNotificationsQuery,
  useMarkAsReadMutation,
} from "../api/Notifications.api";
import type { NotificationDto } from "../types/Notifications.types";

type FilterType = "all" | "unread" | "read";

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const PAGE_SIZE = 20;

const NotificationDrawer = ({ open, onClose }: NotificationDrawerProps) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<FilterType>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) {
      setActiveTab("all");
      setPage(1);
    }
  }, [open]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const { data, isFetching, error } = useGetAllNotificationsQuery(
    {
      sortBy: "createdAt",
      isAscending: false,
      pageNumber: page,
      pageSize: PAGE_SIZE,
      ...(activeTab === "unread" && { isRead: false }),
      ...(activeTab === "read" && { isRead: true }),
    },
    { skip: !open }
  );

  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();

  const items = useMemo(() => data?.items ?? [], [data]);
  const totalPages = data?.totalPages ?? 0;
  const unreadOnPage = items.filter((n) => !n.isRead);

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return t("notifications.justNow");
    if (diff < 3600) return t("notifications.minutesAgo", { count: Math.floor(diff / 60) });
    if (diff < 86400) return t("notifications.hoursAgo", { count: Math.floor(diff / 3600) });
    return t("notifications.daysAgo", { count: Math.floor(diff / 86400) });
  };

  const handleMarkAsRead = async (ids: number[], message: string) => {
    if (!ids.length) return;
    try {
      await markAsRead({ notificationIds: ids }).unwrap();
      showSuccess(message);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const renderItem = (item: NotificationDto) => (
    <button
      key={item.id}
      type="button"
      disabled={item.isRead}
      onClick={() => handleMarkAsRead([item.id], t("notifications.markedAsRead"))}
      className={`flex w-full items-start gap-3 px-4 py-3 text-start transition-colors ${
        item.isRead ? "cursor-default" : "user-dropdown-item"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm ce-heading">
          <span className="font-semibold">{item.title}</span>{" "}
          <span className="ce-muted">{item.message}</span>
        </p>
        <p className="mt-0.5 text-xs ce-muted">{formatTimeAgo(item.createdAt)}</p>
      </div>
      {!item.isRead && (
        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full ce-dot-primary" />
      )}
    </button>
  );

  const renderBody = () => {
    if (isFetching && !items.length) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader variant="spinner" size="lg" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="px-4 py-12 text-center">
          <p className="text-sm ce-muted">{getErrorMessage(error)}</p>
        </div>
      );
    }

    if (!items.length) {
      return (
        <div className="px-4 py-12 text-center">
          <p className="text-sm ce-muted">
            {activeTab === "unread"
              ? t("notifications.noUnreadNotifications")
              : t("notifications.noNotifications")}
          </p>
        </div>
      );
    }

    return <div className="divide-y ce-divider">{items.map(renderItem)}</div>;
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="right"
      size="md"
      title={t("notifications.title")}
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            outline
            size="sm"
            label={t("common.previous")}
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          />
          <span className="text-xs ce-muted">
            {page} / {Math.max(totalPages, 1)}
          </span>
          <Button
            variant="secondary"
            outline
            size="sm"
            label={t("common.next")}
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Tabs
          tabs={[
            { id: "all", label: t("notifications.all") },
            { id: "unread", label: t("notifications.unread") },
            { id: "read", label: t("notifications.read") },
          ]}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as FilterType)}
          fullWidth
          size="sm"
        />

        {unreadOnPage.length > 0 && (
          <div className="px-4">
            <Button
              variant="primary"
              outline
              size="sm"
              block
              loading={isMarking}
              label={t("notifications.markAllAsRead")}
              onClick={() =>
                handleMarkAsRead(
                  unreadOnPage.map((n) => n.id),
                  t("notifications.markedAllAsRead")
                )
              }
            />
          </div>
        )}

        {renderBody()}
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
