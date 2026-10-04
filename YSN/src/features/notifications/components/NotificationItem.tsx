import { useTranslation } from "react-i18next";
import BellIcon from "../../../assets/icons/BellIcon";
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
      className={`notification-card ${notification.isRead ? "" : "notification-card-unread"} ${clickable ? "notification-card-clickable" : ""}`}
    >
      <span className="notification-card-icon">
        <BellIcon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1 text-start">
        <p className={`text-sm ce-heading ${notification.isRead ? "font-medium" : "font-semibold"}`}>{title}</p>
        {body && <p className="mt-0.5 text-sm ce-muted">{body}</p>}
        <p className="mt-1 text-xs ce-muted">{timeAgo(t, notification.createdAt)}</p>
      </div>
      {!notification.isRead && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ce-dot-primary" />}
    </button>
  );
};

export default NotificationItem;
