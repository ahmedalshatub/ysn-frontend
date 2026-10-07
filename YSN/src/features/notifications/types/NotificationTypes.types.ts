export const NotificationType = {
  General: 1,
  Message: 2,
  DepositReceived: 3,
  WithdrawMade: 4,
  TransactionReversed: 5,
  AgentDepositSent: 6,
  AgentDepositReceived: 7,
  EPaymentCompleted: 8,
  EPaymentFailed: 9,
  CustomerTypeChanged: 11,
  EPaymentNeedsReview: 13,
  TvActivated: 14,
  TvActivationFailed: 15,
  TvAddedByCompany: 16,
  TvRemovedByCompany: 17,
  TvActivationNeedsChecking: 18,
  TvSubscriptionEndingSoon: 19,
  TransactionRestored: 20,
  SubAgentDisabledAgentChanged: 21,
  CustomerRegistered: 30,
  EPaymentReceived: 31,
  EPaymentFailedInternal: 32,
  AgentDepositMade: 33,
  InvoiceCreated: 34,
  TvAddedByCustomer: 35,
  TvActivatedInternal: 36,
  TvActivationFailedInternal: 37,
  DepositMade: 38,
  WithdrawMadeInternal: 39,
  TransactionDeleted: 40,
  TransactionRestoredInternal: 41,
  InvoiceDeleted: 42,
  CustomerTypeChangedInternal: 43,
  SubAgentsDisabled: 44,
  CustomerDisabled: 45,
  CardsAdded: 46,
} as const;

export type NotificationTypeValue = (typeof NotificationType)[keyof typeof NotificationType];

export const notificationTypeNames: Record<number, string> = Object.fromEntries(
  Object.entries(NotificationType).map(([name, value]) => [value, name.charAt(0).toLowerCase() + name.slice(1)])
);

export const internalNotificationTypes: NotificationTypeValue[] = [
  NotificationType.EPaymentNeedsReview,
  NotificationType.CustomerRegistered,
  NotificationType.EPaymentReceived,
  NotificationType.EPaymentFailedInternal,
  NotificationType.AgentDepositMade,
  NotificationType.InvoiceCreated,
  NotificationType.DepositMade,
  NotificationType.WithdrawMadeInternal,
  NotificationType.TransactionDeleted,
  NotificationType.TransactionRestoredInternal,
  NotificationType.InvoiceDeleted,
  NotificationType.CustomerTypeChangedInternal,
  NotificationType.SubAgentsDisabled,
  NotificationType.CustomerDisabled,
  NotificationType.CardsAdded,
  NotificationType.TvActivationNeedsChecking,
  NotificationType.TvAddedByCustomer,
  NotificationType.TvActivatedInternal,
  NotificationType.TvActivationFailedInternal,
];

export const notificationSettingGroups: { key: string; types: number[] }[] = [
  {
    key: "customers",
    types: [
      NotificationType.CustomerRegistered,
      NotificationType.CustomerTypeChangedInternal,
      NotificationType.CustomerDisabled,
      NotificationType.SubAgentsDisabled,
    ],
  },
  {
    key: "money",
    types: [
      NotificationType.DepositMade,
      NotificationType.WithdrawMadeInternal,
      NotificationType.AgentDepositMade,
      NotificationType.EPaymentReceived,
      NotificationType.EPaymentFailedInternal,
      NotificationType.EPaymentNeedsReview,
      NotificationType.TransactionDeleted,
      NotificationType.TransactionRestoredInternal,
    ],
  },
  {
    key: "invoicesCards",
    types: [NotificationType.InvoiceCreated, NotificationType.InvoiceDeleted, NotificationType.CardsAdded],
  },
  {
    key: "tvs",
    types: [
      NotificationType.TvAddedByCustomer,
      NotificationType.TvActivatedInternal,
      NotificationType.TvActivationFailedInternal,
      NotificationType.TvActivationNeedsChecking,
    ],
  },
];

export const tvNotificationTypes: number[] = [
  NotificationType.TvAddedByCompany,
  NotificationType.TvRemovedByCompany,
  NotificationType.TvSubscriptionEndingSoon,
  NotificationType.TvAddedByCustomer,
];

export const tvActivationNotificationTypes: number[] = [
  NotificationType.TvActivated,
  NotificationType.TvActivationFailed,
  NotificationType.TvActivationNeedsChecking,
  NotificationType.TvActivatedInternal,
  NotificationType.TvActivationFailedInternal,
];

export const transactionNotificationTypes: number[] = [
  NotificationType.DepositReceived,
  NotificationType.WithdrawMade,
  NotificationType.TransactionReversed,
  NotificationType.AgentDepositSent,
  NotificationType.AgentDepositReceived,
  NotificationType.EPaymentCompleted,
  NotificationType.EPaymentFailed,
  NotificationType.EPaymentNeedsReview,
  NotificationType.TransactionRestored,
  NotificationType.EPaymentReceived,
  NotificationType.EPaymentFailedInternal,
  NotificationType.AgentDepositMade,
  NotificationType.DepositMade,
  NotificationType.WithdrawMadeInternal,
  NotificationType.TransactionDeleted,
  NotificationType.TransactionRestoredInternal,
];
