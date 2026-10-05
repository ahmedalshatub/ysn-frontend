import type { BaseListResponse } from "../../../../shared/types/base";

export interface AgentPerformanceReportFilter {
  agentId?: number;
  agentName?: string;
  cityId?: number;
  isActive?: boolean;
  fromDate?: string;
  toDate?: string;
}

export interface AgentPerformanceReportRequest extends AgentPerformanceReportFilter {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  isAscending: boolean;
}

export interface AgentPerformanceReportRowDto {
  agentId: number;
  agentName: string;
  agentPhone: string | null;
  cityId: number;
  cityName: string | null;
  isActive: boolean;
  balance: number;
  subAgentsCount: number;
  agentInvoicesCount: number;
  agentCardsCount: number;
  agentPurchasesTotal: number;
  subAgentsCardsCount: number;
  subAgentsPurchasesTotal: number;
  agentTransfersSentCount: number;
  agentTransfersSentTotal: number;
}

export interface AgentPerformanceReportSummaryDto {
  agentsCount: number;
  subAgentsCount: number;
  agentPurchasesTotal: number;
  subAgentsPurchasesTotal: number;
  agentTransfersSentTotal: number;
  totalBalance: number;
}

export interface AgentPerformanceReportDto {
  summary: AgentPerformanceReportSummaryDto;
  rows: BaseListResponse<AgentPerformanceReportRowDto>;
}
