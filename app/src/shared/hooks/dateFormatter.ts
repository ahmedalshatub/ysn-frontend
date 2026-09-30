interface DateFormatterOptions {
  locale?: string;
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  includeTime?: boolean;
}

export const formatDate = (
  date: string | Date | number,
  options: DateFormatterOptions = {}
): string => {
  const {
    locale = "ar-SA",
    dateStyle = "medium",
    timeStyle = "short",
    includeTime = false,
  } = options;

  if (!date) return "";

  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) return "";

  const formatOptions: Intl.DateTimeFormatOptions = {
    dateStyle,
    ...(includeTime && { timeStyle }),
  };

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

export const formatDateTime = (date: string | Date | number, locale = "ar-SA"): string => {
  return formatDate(date, { locale, includeTime: true });
};

export const formatDateShort = (date: string | Date | number, locale = "ar-SA"): string => {
  return formatDate(date, { locale, dateStyle: "short" });
};

export const formatDateLong = (date: string | Date | number, locale = "ar-SA"): string => {
  return formatDate(date, { locale, dateStyle: "long" });
};

export const formatDateFull = (date: string | Date | number, locale = "ar-SA"): string => {
  return formatDate(date, { locale, dateStyle: "full" });
};

export const getRelativeTime = (date: string | Date | number, locale = "ar-SA"): string => {
  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffSec < 60) return rtf.format(-diffSec, "second");
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  if (diffHour < 24) return rtf.format(-diffHour, "hour");
  if (diffDay < 30) return rtf.format(-diffDay, "day");

  return formatDate(dateObj, { locale });
};
