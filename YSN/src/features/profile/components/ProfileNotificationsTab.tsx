import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import Pagination from "../../../shared/components/navigation/Pagination";
import Loader from "../../../shared/components/feedback/Loader";
import { useGetAllNotificationsQuery, useMarkAllAsReadMutation } from "../../notifications/api/Notifications.api";
import useNotificationOpener from "../../notifications/hooks/useNotificationOpener";
import NotificationItem from "../../notifications/components/NotificationItem";

const PAGE_SIZE = 10;

const ProfileNotificationsTab = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { open, modal } = useNotificationOpener();

  const { data, isFetching } = useGetAllNotificationsQuery({
    sortBy: "createdAt",
    isAscending: false,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });
  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;

  if (isFetching && !items.length) {
    return (
      <div className="flex justify-center py-12">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (!items.length) {
    return <p className="py-12 text-center text-sm ce-muted">{t("notifications.noNotifications")}</p>;
  }

  return (
    <div className="space-y-4">
      {items.some((item) => !item.isRead) && (
        <Button variant="primary" outline size="sm" loading={isMarking} label={t("notifications.markAllAsRead")} onClick={() => markAllAsRead()} />
      )}

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <NotificationItem key={item.id} notification={item} onOpen={open} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} size="sm" />
        </div>
      )}
      {modal}
    </div>
  );
};

export default ProfileNotificationsTab;
