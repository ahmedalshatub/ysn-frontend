import type { BaseListResponse } from "../../../../shared/types/base";

export const DiscountSource = {
  Customer: 1,
  CardType: 2,
} as const;

export type DiscountSourceValue = typeof DiscountSource[keyof typeof DiscountSource];

export const discountSourceKeys: Record<DiscountSourceValue, string> = {
  [DiscountSource.Customer]: "reports.discounts.sourceCustomer",
  [DiscountSource.CardType]: "reports.discounts.sourceCardType",
};

export interface DiscountsReportFilter {
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  cardCategoryId?: number;
  cardTypeId?: number;
  discountSource?: number;
  discountType?: number;
  fromDate?: string;
  toDate?: string;
}

export interface DiscountsReportRequest extends DiscountsReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface DiscountsReportRowDto {
  customerId: number;
  customerName: string;
  customerRoleId: number;
  cityName: string | null;
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryName: string | null;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  paidTotal: number;
}

export interface DiscountsReportSummaryDto {
  customersCount: number;
  invoicesCount: number;
  cardsCount: number;
  baseTotal: number;
  discountTotal: number;
  paidTotal: number;
}

export interface DiscountsReportDto {
  summary: DiscountsReportSummaryDto;
  rows: BaseListResponse<DiscountsReportRowDto>;
}
