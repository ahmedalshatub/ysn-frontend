import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export const PaymentStatus = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
  Cancelled: 4,
} as const;

export type PaymentStatusType = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export interface PaymentTransactionFilter {
  provider?: string;
  referenceId?: string;
  paymentStatusId?: PaymentStatusType;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  isDeleted?: boolean;
  createdBy?: number;
  unhandledOnly?: boolean;
}

export interface PaymentTransactionRequest extends BaseRequest, PaymentTransactionFilter {}

export interface PaymentTransaction extends BaseDto {
  provider: string;
  requestId: string;
  referenceId?: string;
  amount: number;
  currency: string;
  paymentStatusId: PaymentStatusType;
  maskedPan?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  handledAt?: string;
  completedAt?: string;
  gatewayStatus?: string;
}

export interface CreatePaymentDto {
  amount: number;
  longitude?: number;
  latitude?: number;
  description?: string;
}

export interface CreatePaymentResponseDto {
  transactionId: number;
  requestId: string;
  paymentId: string;
  referenceId: string;
  formUrl: string;
}
