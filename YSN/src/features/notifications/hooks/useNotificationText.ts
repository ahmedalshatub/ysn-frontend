import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getNotificationText } from "../utils/notificationText";
import type { NotificationDto } from "../types/Notifications.types";

const useNotificationText = () => {
  const { t } = useTranslation();
  return useCallback((notification: NotificationDto) => getNotificationText(t, notification), [t]);
};

export default useNotificationText;
