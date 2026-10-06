import type { i18n as I18n } from "i18next";

const ERROR_KEY_PATTERN = /^[A-Za-z]+\.[A-Za-z]+$/;

export const translateProviderMessage = (i18n: I18n, message?: string | null): string => {
  if (!message) return "-";
  const [key, ...details] = message.split("|");
  if (!ERROR_KEY_PATTERN.test(key) || !i18n.exists(`errors.${key}`)) return message;
  const detail = details.join("|").trim();
  const text = i18n.t(`errors.${key}`);
  return detail ? `${text}: ${detail}` : text;
};
