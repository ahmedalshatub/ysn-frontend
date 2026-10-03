import { useTranslation } from "react-i18next";
import useNotificationText from "../hooks/useNotificationText";
import { getNotificationTarget } from "../types/notificationRoutes.types";
import { timeAgo } from "../utils/timeAgo";
import type { NotificationDto } from "../types/Notifications.types";

interface NotificationItemProps {
  notification: NotificationDto;
  onOpen: (notification: NotificationDto) => void;
}

const NotificationItem = ({ notification, onOpen }: NotificationItemProps) => {
  const { t } = useTranslation();
  const textOf = useNotificationText();
  const { title, body } = textOf(notification);
  const clickable = !notification.isRead || !!getNotificationTarget(notification);

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => onOpen(notification)}
      className={`flex w-full items-start gap-3 px-4 py-3 text-start transition-colors ${clickable ? "user-dropdown-item" : "cursor-default"}`}
    >
      <div className="min-w-0 flex-1">
        <p className={`text-sm ce-heading ${notification.isRead ? "font-medium" : "font-semibold"}`}>{title}</p>
        {body && <p className="mt-0.5 text-sm ce-muted">{body}</p>}
        <p className="mt-0.5 text-xs ce-muted">{timeAgo(t, notification.createdAt)}</p>
      </div>
      {!notification.isRead && <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full ce-dot-primary" />}
    </button>
  );
};

export default NotificationItem;
