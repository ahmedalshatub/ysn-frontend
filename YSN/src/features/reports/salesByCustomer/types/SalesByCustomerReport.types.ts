import type { BaseListResponse } from "../../../../shared/types/base";

export interface SalesByCustomerReportFilter {
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  parentAgentId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  totalFrom?: number;
  totalTo?: number;
  fromDate?: string;
  toDate?: string;
}

export interface SalesByCustomerReportRequest extends SalesByCustomerReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface SalesByCustomerReportRowDto {
  customerId: number;
  customerName: string;
  customerRoleId: number;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  parentAgentName: string | null;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
  lastPurchaseAt: string;
}

export interface SalesByCustomerReportSummaryDto {
  customersCount: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
}

export interface SalesByCustomerReportDto {
  summary: SalesByCustomerReportSummaryDto;
  rows: BaseListResponse<SalesByCustomerReportRowDto>;
}
