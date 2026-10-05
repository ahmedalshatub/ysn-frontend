import type { BaseListResponse } from "../../../../shared/types/base";

export interface EPaymentsReportFilter {
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  status?: number;
  amountFrom?: number;
  amountTo?: number;
  requestId?: string;
  referenceId?: string;
  maskedPan?: string;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface EPaymentsReportRequest extends EPaymentsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface EPaymentsReportRowDto {
  id: number;
  createdAt: string;
  customerId: number;
  customerName: string;
  customerRoleId: number;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  amount: number;
  status: number;
  isDeleted: boolean;
  maskedPan: string | null;
  requestId: string | null;
  referenceId: string | null;
  completedAt: string | null;
  longitude: number | null;
  latitude: number | null;
}

export interface EPaymentsReportSummaryDto {
  paymentsCount: number;
  paymentsTotal: number;
  completedCount: number;
  completedTotal: number;
  pendingCount: number;
  pendingTotal: number;
  failedCount: number;
  failedTotal: number;
  cancelledCount: number;
  cancelledTotal: number;
  deletedCount: number;
  deletedTotal: number;
}

export interface EPaymentsReportDto {
  summary: EPaymentsReportSummaryDto;
  rows: BaseListResponse<EPaymentsReportRowDto>;
}
