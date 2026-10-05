import type { BaseListResponse } from "../../../../shared/types/base";

export interface SalesByCardTypeReportFilter {
  cardCategoryId?: number;
  cardTypeId?: number;
  kind?: number;
  cityId?: number;
  customerRoleId?: number;
  customerId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface SalesByCardTypeReportRequest extends SalesByCardTypeReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface SalesByCardTypeReportRowDto {
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryId: number;
  cardCategoryName: string | null;
  cityName: string | null;
  kind: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
}

export interface SalesByCardTypeReportSummaryDto {
  cardTypesCount: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  salesTotal: number;
}

export interface SalesByCardTypeReportDto {
  summary: SalesByCardTypeReportSummaryDto;
  rows: BaseListResponse<SalesByCardTypeReportRowDto>;
}
