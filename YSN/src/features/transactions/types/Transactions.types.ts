import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const TransactionType = {
  Deposit: 1,
  Withdraw: 2,
  EPayment: 3,
  AgentTransfer: 4,
} as const;

export type TransactionTypeValue = typeof TransactionType[keyof typeof TransactionType];

export const TransactionStatus = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
  Cancelled: 4,
} as const;

export type TransactionStatusValue = typeof TransactionStatus[keyof typeof TransactionStatus];

export const transactionTypeKeys: Record<TransactionTypeValue, string> = {
  [TransactionType.Deposit]: "transactionTypes.deposit",
  [TransactionType.Withdraw]: "transactionTypes.withdraw",
  [TransactionType.EPayment]: "transactionTypes.ePayment",
  [TransactionType.AgentTransfer]: "transactionTypes.agentTransfer",
};

export const transactionStatusKeys: Record<TransactionStatusValue, string> = {
  [TransactionStatus.Pending]: "transactionStatuses.pending",
  [TransactionStatus.Completed]: "transactionStatuses.completed",
  [TransactionStatus.Failed]: "transactionStatuses.failed",
  [TransactionStatus.Cancelled]: "transactionStatuses.cancelled",
};

export const transactionStatusVariants: Record<TransactionStatusValue, "warning" | "success" | "danger" | "secondary"> = {
  [TransactionStatus.Pending]: "warning",
  [TransactionStatus.Completed]: "success",
  [TransactionStatus.Failed]: "danger",
  [TransactionStatus.Cancelled]: "secondary",
};

export const transactionTypeVariants: Record<TransactionTypeValue, "success" | "danger" | "info" | "primary"> = {
  [TransactionType.Deposit]: "success",
  [TransactionType.Withdraw]: "danger",
  [TransactionType.EPayment]: "primary",
  [TransactionType.AgentTransfer]: "info",
};

export interface TransactionFilter {
  type?: number;
  status?: number;
  customerId?: number;
  customerRoleId?: number;
  cityId?: number;
  customerName?: string;
  customerPhone?: string;
  description?: string;
  amountFrom?: number;
  amountTo?: number;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface TransactionRequest extends BaseRequest, TransactionFilter {}

export interface TransactionListDto extends BaseDto {
  type: TransactionTypeValue;
  status: TransactionStatusValue;
  amount: number;
  description: string;
  customerId: number;
  customerName: string | null;
  customerRoleId: number;
  customerPhone: string | null;
  customerCityName: string | null;
  customerBalanceBefore: number | null;
  customerBalanceAfter: number | null;
  sourceCustomerId: number | null;
  sourceCustomerName: string | null;
  sourceBalanceBefore: number | null;
  sourceBalanceAfter: number | null;
  requestId: string | null;
  referenceId: string | null;
  maskedPan: string | null;
  longitude: number | null;
  latitude: number | null;
  completedAt: string | null;
}

export interface TransactionDto extends TransactionListDto {
  deletedBy: number | null;
  deletedByName: string | null;
  deleteReason: string | null;
}

export interface EPaymentCheckResultDto {
  checked: number;
  completed: number;
  failed: number;
  stillPending: number;
  errors: number;
}

export interface TransactionStatsDto {
  transactionsCount: number;
  depositsTotal: number;
  depositsCount: number;
  withdrawsTotal: number;
  withdrawsCount: number;
  ePaymentsTotal: number;
  ePaymentsCount: number;
  agentTransfersTotal: number;
  agentTransfersCount: number;
  pendingEPaymentsCount: number;
  failedEPaymentsCount: number;
  netTotal: number;
  currentBalance: number | null;
}

export interface AddTransactionDto {
  type: TransactionTypeValue;
  customerId: number;
  amount: number;
  description: string;
}

export interface DailyTransactionTotalDto {
  date: string;
  type: number;
  count: number;
  amount: number;
}
