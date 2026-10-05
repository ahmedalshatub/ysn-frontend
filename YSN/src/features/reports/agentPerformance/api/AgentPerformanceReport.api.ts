import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportAgentPerformanceReport: builder.mutation<null, AgentPerformanceReportFilter>({
      query: (params) => ({
        url: "Reports/agent-performance/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("AgentPerformance"),
      }),
    }),
  }),
});

export const { useGetAgentPerformanceReportQuery, useExportAgentPerformanceReportMutation } = agentPerformanceReportApi;
