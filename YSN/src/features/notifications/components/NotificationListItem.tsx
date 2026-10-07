import { useTranslation } from "react-i18next";
import BellIcon from "../../../assets/icons/BellIcon";
import useNotificationText from "../hooks/useNotificationText";
import { timeAgo } from "../utils/timeAgo";
import type { NotificationDto } from "../types/Notifications.types";

interface NotificationListItemProps {
  notification: NotificationDto;
  onOpen: (notification: NotificationDto) => void;
}

const NotificationListItem = ({ notification, onOpen }: NotificationListItemProps) => {
  const { t } = useTranslation();
  const textOf = useNotificationText();
  const { title, body } = textOf(notification);

  return (
    <button
      type="button"
      onClick={() => onOpen(notification)}
      className={`notification-item w-full text-start ${notification.isRead ? "" : "notification-item-unread"}`}
    >
      <span className="notification-item-icon">
        <BellIcon />
      </span>
      <div className="notification-item-content">
        <span className="notification-item-title">{title}</span>
        {body && <span className="notification-item-message">{body}</span>}
        <span className="notification-item-time">{timeAgo(t, notification.createdAt)}</span>
      </div>
      {!notification.isRead && <span className="notification-item-unread-dot" />}
    </button>
  );
};

export default NotificationListItem;
