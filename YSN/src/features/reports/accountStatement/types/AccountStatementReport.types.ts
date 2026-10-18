import type { BaseListResponse } from "../../../../shared/types/base";

export const AccountStatementDirection = {
  In: 1,
  Out: 2,
} as const;

export const accountStatementInvoiceType = 0;

export interface AccountStatementReportFilter {
  customerId?: number;
  type?: number;
  direction?: number;
  fromDate?: string;
  toDate?: string;
}

export interface AccountStatementReportRequest extends AccountStatementReportFilter {
  pageNumber: number;
  pageSize: number;
}

export interface AccountStatementReportRowDto {
  id: number;
  date: string;
  type: number | null;
  status: number | null;
  isApplied: boolean;
  description: string;
  invoiceId: number | null;
  otherPartyId: number | null;
  otherPartyName: string | null;
  createdByName: string | null;
  balanceBefore: number | null;
  amount: number;
  balanceAfter: number | null;
}

export interface AccountStatementReportSummaryDto {
  customerId: number;
  customerName: string;
  customerRoleId: number;
  openingBalance: number;
  totalIncrease: number;
  totalDecrease: number;
  closingBalance: number;
  linesCount: number;
  notAppliedCount: number;
  currentBalance: number;
}

export interface AccountStatementReportDto {
  summary: AccountStatementReportSummaryDto;
  rows: BaseListResponse<AccountStatementReportRowDto>;
}
