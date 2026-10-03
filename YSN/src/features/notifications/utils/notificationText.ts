import type { TFunction } from "i18next";
import { formatAmount } from "../../../shared/utils/formatCurrency";
import { transactionTypeKeys, type TransactionTypeValue } from "../../transactions/types/Transactions.types";
import { customerTypeConfigs, type CustomerTypeValue } from "../../customers/types/Customers.types";
import { NotificationType, notificationTypeNames, transactionNotificationTypes } from "../types/NotificationTypes.types";
import type { NotificationDto } from "../types/Notifications.types";

export interface NotificationText {
  title: string;
  body: string;
}

const amountKeys = ["amount", "balance", "total"];

const customerTypeName = (t: TFunction, value: unknown) => {
  const config = customerTypeConfigs[Number(value) as CustomerTypeValue];
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

  if (parameters.type != null) {
    values.typeName = transactionNotificationTypes.includes(notification.type)
      ? t(transactionTypeKeys[Number(parameters.type) as TransactionTypeValue] ?? "")
      : customerTypeName(t, parameters.type);
  }
  values.oldTypeName = customerTypeName(t, parameters.oldType);
  values.newTypeName = customerTypeName(t, parameters.newType);

  const bodyKey = notification.type === NotificationType.CustomerDisabled && parameters.deleted ? "bodyDeleted" : "body";
  return {
    title: t(`notificationTypes.${name}.title`, values),
    body: t(`notificationTypes.${name}.${bodyKey}`, values),
  };
};
