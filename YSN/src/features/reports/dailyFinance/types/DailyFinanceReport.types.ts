import type { BaseListResponse } from "../../../../shared/types/base";

export interface DailyFinanceReportFilter {
  customerId?: number;
  customerRoleId?: number;
  cityId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface DailyFinanceReportRequest extends DailyFinanceReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface DailyFinanceReportRowDto {
  day: string;
  transactionsCount: number;
  invoicesCount: number;
  depositsTotal: number;
  withdrawsTotal: number;
  ePaymentsTotal: number;
  agentTransfersTotal: number;
  salesTotal: number;
  netTotal: number;
}

export interface DailyFinanceReportSummaryDto {
  daysCount: number;
  transactionsCount: number;
  invoicesCount: number;
  depositsTotal: number;
  withdrawsTotal: number;
  ePaymentsTotal: number;
  agentTransfersTotal: number;
  salesTotal: number;
  netTotal: number;
}

export interface DailyFinanceReportDto {
  summary: DailyFinanceReportSummaryDto;
  rows: BaseListResponse<DailyFinanceReportRowDto>;
}
