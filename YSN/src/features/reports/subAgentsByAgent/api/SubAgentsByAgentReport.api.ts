import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportSubAgentsByAgentReport: builder.mutation<null, SubAgentsByAgentReportFilter>({
      query: (params) => ({
        url: "Reports/sub-agents-by-agent/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("SubAgentsByAgent"),
      }),
    }),
  }),
});

export const { useGetSubAgentsByAgentReportQuery, useExportSubAgentsByAgentReportMutation } = subAgentsByAgentReportApi;
