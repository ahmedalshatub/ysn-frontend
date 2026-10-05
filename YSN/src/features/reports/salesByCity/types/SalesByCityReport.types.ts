import type { BaseListResponse } from "../../../../shared/types/base";

export interface SalesByCityReportFilter {
  cityId?: number;
  customerRoleId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface SalesByCityReportRequest extends SalesByCityReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface SalesByCityReportRowDto {
  cityId: number;
  cityName: string | null;
  customerRoleId: number;
  customersCount: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
}

export interface SalesByCityReportSummaryDto {
  citiesCount: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
}

export interface SalesByCityReportDto {
  summary: SalesByCityReportSummaryDto;
  rows: BaseListResponse<SalesByCityReportRowDto>;
}
