import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportDailyFinanceReport: builder.mutation<null, DailyFinanceReportFilter>({
      query: (params) => ({
        url: "Reports/daily-finance/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("DailyFinance"),
      }),
    }),
  }),
});

export const { useGetDailyFinanceReportQuery, useExportDailyFinanceReportMutation } = dailyFinanceReportApi;
