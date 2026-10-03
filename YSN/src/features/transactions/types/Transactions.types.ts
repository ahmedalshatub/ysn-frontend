import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const TransactionType = {
  Deposit: 1,
  Withdraw: 2,
  AgentDeposit: 3,
  EPayment: 4,
  CardPurchase: 5,
  Reversal: 6,
  Restore: 7,
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
  [TransactionType.AgentDeposit]: "transactionTypes.agentDeposit",
  [TransactionType.EPayment]: "transactionTypes.ePayment",
  [TransactionType.CardPurchase]: "transactionTypes.cardPurchase",
  [TransactionType.Reversal]: "transactionTypes.reversal",
  [TransactionType.Restore]: "transactionTypes.restore",
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

export const reversibleTypes: TransactionTypeValue[] = [
  TransactionType.Deposit,
  TransactionType.Withdraw,
  TransactionType.AgentDeposit,
  TransactionType.EPayment,
];

export interface TransactionFilter {
  type?: number;
  status?: number;
  customerId?: number;
  customerUserType?: number;
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
  customerUserType: number;
  customerPhone: string | null;
  customerCityName: string | null;
  customerBalanceBefore: number | null;
  customerBalanceAfter: number | null;
  sourceCustomerId: number | null;
  sourceCustomerName: string | null;
  sourceBalanceBefore: number | null;
  sourceBalanceAfter: number | null;
  relatedTransactionId: number | null;
  invoiceId: number | null;
  completedAt: string | null;
}

export interface TransactionDto extends TransactionListDto {
  longitude: number | null;
  latitude: number | null;
  paymentTransactionId: number | null;
  maskedPan: string | null;
  gatewayStatus: string | null;
  deletedBy: number | null;
  deletedByName: string | null;
  deleteReason: string | null;
}

export interface TransactionStatsDto {
  transactionsCount: number;
  depositsTotal: number;
  depositsCount: number;
  withdrawsTotal: number;
  withdrawsCount: number;
  agentDepositsTotal: number;
  agentDepositsCount: number;
  ePaymentsTotal: number;
  ePaymentsCount: number;
  cardPurchasesTotal: number;
  cardPurchasesCount: number;
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
