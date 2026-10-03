import type { TFunction } from "i18next";

export const timeAgo = (t: TFunction, date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return t("notifications.justNow");
  if (seconds < 3600) return t("notifications.minutesAgo", { count: Math.floor(seconds / 60) });
  if (seconds < 86400) return t("notifications.hoursAgo", { count: Math.floor(seconds / 3600) });
  return t("notifications.daysAgo", { count: Math.floor(seconds / 86400) });
};
