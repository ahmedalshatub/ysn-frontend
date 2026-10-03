import { NotificationType, transactionNotificationTypes } from "./NotificationTypes.types";
import type { NotificationDto, NotificationTarget } from "./Notifications.types";

type TargetBuilder = (notification: NotificationDto & { referenceId: number }) => NotificationTarget | null;

const customerPage: TargetBuilder = ({ referenceId }) => ({ kind: "path", path: `/customers/${referenceId}` });
const invoice: TargetBuilder = ({ referenceId }) => ({ kind: "invoice", id: referenceId });

const notificationRoutes: Record<number, TargetBuilder> = {
  ...Object.fromEntries(
    transactionNotificationTypes.map((type) => [type, ({ referenceId }: { referenceId: number }) => ({ kind: "transaction", id: referenceId })])
  ),
  [NotificationType.InvoiceCreated]: invoice,
  [NotificationType.InvoiceDeleted]: invoice,
  [NotificationType.CustomerRegistered]: customerPage,
  [NotificationType.CustomerTypeChangedInternal]: customerPage,
  [NotificationType.CustomerDisabled]: customerPage,
  [NotificationType.SubAgentsDisabled]: customerPage,
  [NotificationType.CardsAdded]: ({ referenceId, parameters }) => ({
    kind: "path",
    path: parameters?.importBatchId ? `/cards?importBatchId=${parameters.importBatchId}` : `/cards?cardTypeId=${referenceId}`,
  }),
};

export const getNotificationTarget = (notification: NotificationDto): NotificationTarget | null => {
  const build = notificationRoutes[notification.type];
  if (!build || notification.referenceId == null) return null;
  return build({ ...notification, referenceId: notification.referenceId });
};
