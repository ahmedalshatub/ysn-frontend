import type { BaseListResponse } from "../../../../shared/types/base";

export interface CustomerBalancesReportFilter {
  customerName?: string;
  customerPhone?: string;
  customerRoleId?: number;
  cityId?: number;
  parentAgentId?: number;
  balanceFrom?: number;
  balanceTo?: number;
  hasBalance?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface CustomerBalancesReportRequest extends CustomerBalancesReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface CustomerBalancesReportRowDto {
  customerId: number;
  customerName: string;
  customerRoleId: number;
  customerPhone: string | null;
  cityId: number;
  cityName: string | null;
  parentAgentId: number | null;
  parentAgentName: string | null;
  isActive: boolean;
  isDeleted: boolean;
  balance: number;
  periodCredit: number;
  periodDebit: number;
  lastMovementAt: string | null;
}

export interface CustomerBalancesReportSummaryDto {
  customersCount: number;
  withBalanceCount: number;
  totalBalance: number;
  agentsBalance: number;
  subAgentsBalance: number;
  clientsBalance: number;
  periodCredit: number;
  periodDebit: number;
}

export interface CustomerBalancesReportDto {
  summary: CustomerBalancesReportSummaryDto;
  rows: BaseListResponse<CustomerBalancesReportRowDto>;
}
