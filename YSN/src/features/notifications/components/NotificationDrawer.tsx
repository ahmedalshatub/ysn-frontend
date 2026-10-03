import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../app/store";
import Drawer from "../../../shared/components/navigation/Drawer";
import Tabs from "../../../shared/components/navigation/Tabs";
import Button from "../../../shared/components/buttons/Button";
import Select from "../../../shared/components/inputs/Select";
import Loader from "../../../shared/components/feedback/Loader";
import { showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useGetAllNotificationsQuery, useMarkAllAsReadMutation } from "../api/Notifications.api";
import { NotificationType, internalNotificationTypes, notificationTypeNames } from "../types/NotificationTypes.types";
import NotificationItem from "./NotificationItem";
import NotificationSettings from "./NotificationSettings";
import type { NotificationDto } from "../types/Notifications.types";

type DrawerTab = "all" | "unread" | "settings";

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpenNotification: (notification: NotificationDto) => void;
}

const PAGE_SIZE = 20;
const filterTypes = [NotificationType.General, ...internalNotificationTypes];

const NotificationDrawer = ({ open, onClose, onOpenNotification }: NotificationDrawerProps) => {
  const { t } = useTranslation();
  const isEmployee = useSelector((state: RootState) => state.auth.roleId != null);
  const [activeTab, setActiveTab] = useState<DrawerTab>("all");
  const [type, setType] = useState<number | undefined>();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetAllNotificationsQuery(
    {
      sortBy: "createdAt",
      isAscending: false,
      pageNumber: page,
      pageSize: PAGE_SIZE,
      type,
      isRead: activeTab === "unread" ? false : undefined,
    },
    { skip: !open || activeTab === "settings" }
  );
  const [markAllAsRead, { isLoading: isMarking }] = useMarkAllAsReadMutation();

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const typeOptions = filterTypes.map((value) => ({ value, name: t(`notificationTypes.${notificationTypeNames[value]}.setting`) }));

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
      <div className="divide-y ce-divider">
        {items.map((item) => (
          <NotificationItem key={item.id} notification={item} onOpen={onOpenNotification} />
        ))}
      </div>
    );
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="right"
      size="md"
      title={t("notifications.title")}
      footer={
        activeTab === "settings" ? undefined : (
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              outline
              size="sm"
              label={t("common.previous")}
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
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
              onClick={() => setPage((previous) => previous + 1)}
            />
          </div>
        )
      }
    >
      <div className="flex flex-col gap-3">
        <Tabs
          tabs={[
            { id: "all", label: t("notifications.all") },
            { id: "unread", label: t("notifications.unread") },
            ...(isEmployee ? [{ id: "settings", label: t("notifications.settings") }] : []),
          ]}
          activeTab={activeTab}
          onChange={(id) => changeTab(id as DrawerTab)}
          fullWidth
          size="sm"
        />

        {activeTab === "settings" ? (
          <NotificationSettings />
        ) : (
          <>
            <div className="flex items-end gap-2 px-4">
              <Select
                name="type"
                options={typeOptions}
                value={type ?? ""}
                onChange={(value) => {
                  setType(value === "" ? undefined : Number(value));
                  setPage(1);
                }}
                valueKey="value"
                labelKey="name"
                placeholder={t("notifications.allTypes")}
                containerClass="flex-1"
                size="sm"
              />
              <Button
                variant="primary"
                outline
                size="sm"
                loading={isMarking}
                label={t("notifications.markAllAsRead")}
                onClick={handleMarkAll}
              />
            </div>
            {renderList()}
          </>
        )}
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
