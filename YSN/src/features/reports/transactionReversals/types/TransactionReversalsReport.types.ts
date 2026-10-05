import type { BaseListResponse } from "../../../../shared/types/base";
import type { TransactionStatusValue, TransactionTypeValue } from "../../../transactions/types/Transactions.types";

export interface TransactionReversalsReportFilter {
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  type?: number;
  status?: number;
  createdBy?: number;
  deletedBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface TransactionReversalsReportRequest extends TransactionReversalsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface TransactionReversalsReportRowDto {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  type: TransactionTypeValue;
  status: TransactionStatusValue;
  customerId: number;
  customerName: string;
  customerRoleId: number;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  amount: number;
  description: string | null;
  sourceCustomerId: number | null;
  sourceCustomerName: string | null;
  createdBy: number | null;
  createdByName: string | null;
  deletedBy: number | null;
  deletedByName: string | null;
  deleteReason: string | null;
}

export interface TransactionReversalsReportSummaryDto {
  deletedCount: number;
  deletedTotal: number;
  reversedCount: number;
  reversedTotal: number;
}

export interface TransactionReversalsReportDto {
  summary: TransactionReversalsReportSummaryDto;
  rows: BaseListResponse<TransactionReversalsReportRowDto>;
}
