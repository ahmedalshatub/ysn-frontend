import type { BaseListResponse } from "../../../../shared/types/base";
import type { CustomerRoleValue } from "../../../customers/types/Customers.types";

export interface InactiveCustomersReportFilter {
  customerName?: string;
  customerRoleId?: number;
  cityId?: number;
  parentAgentId?: number;
  noPurchaseSince?: string;
  noSignInSince?: string;
  hasBalance?: boolean;
  isActive?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface InactiveCustomersReportRequest extends InactiveCustomersReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface InactiveCustomersReportRowDto {
  customerId: number;
  customerName: string;
  customerRoleId: CustomerRoleValue;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  parentAgentName: string | null;
  isActive: boolean;
  balance: number;
  lastPurchaseAt: string | null;
  lastSignInAt: string | null;
  createdAt: string;
}

export interface InactiveCustomersReportSummaryDto {
  customersCount: number;
  totalBalance: number;
  neverPurchasedCount: number;
  neverSignedInCount: number;
}

export interface InactiveCustomersReportDto {
  summary: InactiveCustomersReportSummaryDto;
  rows: BaseListResponse<InactiveCustomersReportRowDto>;
}
