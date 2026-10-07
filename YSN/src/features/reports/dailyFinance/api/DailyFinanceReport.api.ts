import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  DailyFinanceReportDto,
  DailyFinanceReportFilter,
  DailyFinanceReportRequest,
} from "../types/DailyFinanceReport.types";

export const dailyFinanceReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getDailyFinanceReport: builder.query<DailyFinanceReportDto, DailyFinanceReportRequest>({
      query: (params) => ({
        url: "Reports/daily-finance",
        params,
      }),
    }),
    exportDailyFinanceReport: builder.mutation<null, DailyFinanceReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/daily-finance/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("DailyFinance", params.format),
      }),
    }),
  }),
});

export const { useGetDailyFinanceReportQuery, useExportDailyFinanceReportMutation } = dailyFinanceReportApi;
