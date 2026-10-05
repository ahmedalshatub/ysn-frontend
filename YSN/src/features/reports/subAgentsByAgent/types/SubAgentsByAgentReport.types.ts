import type { BaseListResponse } from "../../../../shared/types/base";

export interface SubAgentsByAgentReportFilter {
  agentId?: number;
  subAgentName?: string;
  cityId?: number;
  isActive?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface SubAgentsByAgentReportRequest extends SubAgentsByAgentReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface SubAgentsByAgentReportRowDto {
  agentId: number;
  agentName: string;
  subAgentId: number;
  subAgentName: string;
  subAgentPhone: string | null;
  cityId: number;
  cityName: string | null;
  isActive: boolean;
  balance: number;
  invoicesCount: number;
  cardsCount: number;
  purchasesTotal: number;
  agentTransfersReceivedCount: number;
  agentTransfersReceivedTotal: number;
}

export interface SubAgentsByAgentReportSummaryDto {
  agentsCount: number;
  subAgentsCount: number;
  totalBalance: number;
  purchasesTotal: number;
  agentTransfersReceivedTotal: number;
}

export interface SubAgentsByAgentReportDto {
  summary: SubAgentsByAgentReportSummaryDto;
  rows: BaseListResponse<SubAgentsByAgentReportRowDto>;
}
