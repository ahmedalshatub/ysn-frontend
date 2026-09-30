import { useMemo } from "react";

interface UseDateFormatterOptions {
  locale?: string;
  dateStyle?: "full" | "long" | "medium" | "short";
  timeStyle?: "full" | "long" | "medium" | "short";
  includeTime?: boolean;
}

const useDateFormatter = (
  date: string | Date | number,
  options: UseDateFormatterOptions = {}
) => {
  const {
    locale = "en",
    dateStyle = "medium",
    timeStyle = "short",
    includeTime = false,
  } = options;

  const formattedDate = useMemo(() => {
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
  }, [date, locale, dateStyle, timeStyle, includeTime]);

  return formattedDate;
};

export default useDateFormatter;
