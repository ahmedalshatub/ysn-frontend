import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  AgentPerformanceReportDto,
  AgentPerformanceReportFilter,
  AgentPerformanceReportRequest,
} from "../types/AgentPerformanceReport.types";

export const agentPerformanceReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentPerformanceReport: builder.query<AgentPerformanceReportDto, AgentPerformanceReportRequest>({
      query: (params) => ({
        url: "Reports/agent-performance",
        params,
      }),
    }),
    exportAgentPerformanceReport: builder.mutation<null, AgentPerformanceReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/agent-performance/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("AgentPerformance", params.format),
      }),
    }),
  }),
});

export const { useGetAgentPerformanceReportQuery, useExportAgentPerformanceReportMutation } = agentPerformanceReportApi;
