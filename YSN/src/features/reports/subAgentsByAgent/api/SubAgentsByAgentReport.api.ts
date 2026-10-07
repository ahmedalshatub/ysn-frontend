import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  SubAgentsByAgentReportDto,
  SubAgentsByAgentReportFilter,
  SubAgentsByAgentReportRequest,
} from "../types/SubAgentsByAgentReport.types";

export const subAgentsByAgentReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubAgentsByAgentReport: builder.query<SubAgentsByAgentReportDto, SubAgentsByAgentReportRequest>({
      query: (params) => ({
        url: "Reports/sub-agents-by-agent",
        params,
      }),
    }),
    exportSubAgentsByAgentReport: builder.mutation<null, SubAgentsByAgentReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/sub-agents-by-agent/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("SubAgentsByAgent", params.format),
      }),
    }),
  }),
});

export const { useGetSubAgentsByAgentReportQuery, useExportSubAgentsByAgentReportMutation } = subAgentsByAgentReportApi;
