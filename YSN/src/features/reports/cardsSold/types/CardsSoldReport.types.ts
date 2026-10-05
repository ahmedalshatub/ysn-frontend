import type { BaseListResponse } from "../../../../shared/types/base";
import type { CustomerRoleValue } from "../../../customers/types/Customers.types";
import type { CardKindValue } from "../../../cardTypes/types/CardTypes.types";

export interface CardsSoldReportFilter {
  cardCategoryId?: number;
  cardTypeId?: number;
  kind?: number;
  cityId?: number;
  customerId?: number;
  customerName?: string;
  customerRoleId?: number;
  invoiceId?: number;
  serialNumber?: string;
  fromDate?: string;
  toDate?: string;
}

export interface CardsSoldReportRequest extends CardsSoldReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface CardsSoldReportRowDto {
  id: number;
  createdAt: string;
  invoiceId: number;
  customerId: number;
  customerName: string;
  customerRoleId: CustomerRoleValue;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  cardId: number;
  serialNumber: string;
  cardTypeId: number;
  cardTypeName: string | null;
  cardCategoryName: string | null;
  kind: CardKindValue;
  unitPrice: number;
}

export interface CardsSoldReportSummaryDto {
  cardsCount: number;
  invoicesCount: number;
  customersCount: number;
  total: number;
}

export interface CardsSoldReportDto {
  summary: CardsSoldReportSummaryDto;
  rows: BaseListResponse<CardsSoldReportRowDto>;
}
