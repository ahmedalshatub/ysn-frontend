import type { TFunction } from "i18next";
import i18n from "../../../core/i18n";
import { formatAmount } from "../../../shared/utils/formatCurrency";
import { transactionTypeKeys, type TransactionTypeValue } from "../../transactions/types/Transactions.types";
import { customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { cardKindKeys, type CardKindValue } from "../../cardTypes/types/CardTypes.types";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { translateProviderMessage } from "../../tvs/utils/providerMessage";
import { NotificationType, notificationTypeNames, transactionNotificationTypes } from "../types/NotificationTypes.types";
import type { NotificationDto } from "../types/Notifications.types";

export interface NotificationText {
  title: string;
  body: string;
}

const amountKeys = ["amount", "balance", "total"];

const customerTypeName = (t: TFunction, value: unknown) => {
  const config = customerRoleConfigs[Number(value) as CustomerRoleValue];
  return config ? t(config.labelKey) : "";
};

export const getNotificationText = (t: TFunction, notification: NotificationDto): NotificationText => {
  const name = notificationTypeNames[notification.type];
  if (!name || notification.title || notification.message) {
    return {
      title: notification.title || t("notificationTypes.general.title"),
      body: notification.message || "",
    };
  }

  const parameters = notification.parameters ?? {};
  const values: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(parameters)) {
    values[key] = amountKeys.includes(key) ? formatAmount(Number(value)) : value == null ? "-" : String(value);
  }

  if (parameters.type != null && transactionNotificationTypes.includes(notification.type)) {
    values.typeName = t(transactionTypeKeys[Number(parameters.type) as TransactionTypeValue] ?? "");
  }
  if (parameters.role != null) values.typeName = customerTypeName(t, parameters.role);
  values.oldTypeName = customerTypeName(t, parameters.oldRole);
  values.newTypeName = customerTypeName(t, parameters.newRole);
  if (parameters.kind != null) values.kindName = t(cardKindKeys[Number(parameters.kind) as CardKindValue] ?? "");
  if (parameters.endsAt) values.endsAt = formatDate(String(parameters.endsAt), { locale: i18n.language });
  if (parameters.reason != null) values.reason = translateProviderMessage(i18n, String(parameters.reason));

  const bodyKey = notification.type === NotificationType.CustomerDisabled && parameters.deleted ? "bodyDeleted" : "body";
  return {
    title: t(`notificationTypes.${name}.title`, values),
    body: t(`notificationTypes.${name}.${bodyKey}`, values),
  };
};
