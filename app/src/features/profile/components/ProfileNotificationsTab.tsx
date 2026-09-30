import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import Loader from "../../../shared/components/feedback/Loader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import {
  useGetAllNotificationsQuery,
  useMarkAsReadMutation,
} from "../../notifications/api/Notifications.api";

const PAGE_SIZE = 10;

const ProfileNotificationsTab = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, isFetching } = useGetAllNotificationsQuery({
    sortBy: "createdAt",
    isAscending: false,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const [markAsRead, { isLoading: isMarking }] = useMarkAsReadMutation();

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const unread = items.filter((n) => !n.isRead);

  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return t("notifications.justNow");
    if (diff < 3600) return t("notifications.minutesAgo", { count: Math.floor(diff / 60) });
    if (diff < 86400) return t("notifications.hoursAgo", { count: Math.floor(diff / 3600) });
    return t("notifications.daysAgo", { count: Math.floor(diff / 86400) });
  };

  const handleMark = async (ids: number[], message: string) => {
    if (!ids.length) return;
    try {
      await markAsRead({ notificationIds: ids }).unwrap();
      showSuccess(message);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  if (isFetching && !items.length) {
    return (
      <div className="flex justify-center py-12">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm ce-muted">{t("notifications.noNotifications")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {unread.length > 0 && (
        <Button
          variant="primary"
          outline
          size="sm"
          loading={isMarking}
          label={t("notifications.markAllAsRead")}
          onClick={() => handleMark(unread.map((n) => n.id), t("notifications.markedAllAsRead"))}
        />
      )}

      <div className="divide-y ce-divider">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={item.isRead}
            onClick={() => handleMark([item.id], t("notifications.markedAsRead"))}
            className={`flex w-full items-start gap-3 px-2 py-3 text-start transition-colors ${
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
        ))}
      </div>

      {totalPages > 1 && (
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
            {page} / {totalPages}
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
      )}
    </div>
  );
};

export default ProfileNotificationsTab;
