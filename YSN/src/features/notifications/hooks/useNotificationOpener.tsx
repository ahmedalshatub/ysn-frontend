import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMarkAsReadMutation } from "../api/Notifications.api";
import { getNotificationTarget } from "../types/notificationRoutes.types";
import NotificationTargetModal from "../components/NotificationTargetModal";
import type { NotificationDto, NotificationTarget } from "../types/Notifications.types";

const useNotificationOpener = (onNavigate?: () => void) => {
  const navigate = useNavigate();
  const [markAsRead] = useMarkAsReadMutation();
  const [target, setTarget] = useState<NotificationTarget | null>(null);

  const open = useCallback(
    (notification: NotificationDto) => {
      if (!notification.isRead) markAsRead({ notificationIds: [notification.id] });

      const next = getNotificationTarget(notification);
      if (!next) return;
      if (next.kind === "path") {
        onNavigate?.();
        navigate(next.path);
      } else {
        setTarget(next);
      }
    },
    [markAsRead, navigate, onNavigate]
  );

  const modal = <NotificationTargetModal target={target} onClose={() => setTarget(null)} />;

  return { open, modal };
};

export default useNotificationOpener;
