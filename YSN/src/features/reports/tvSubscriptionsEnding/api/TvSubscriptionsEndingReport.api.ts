import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type {
  TvSubscriptionsEndingReportDto,
  TvSubscriptionsEndingReportFilter,
  TvSubscriptionsEndingReportRequest,
} from "../types/TvSubscriptionsEndingReport.types";

export const tvSubscriptionsEndingReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvSubscriptionsEndingReport: builder.query<TvSubscriptionsEndingReportDto, TvSubscriptionsEndingReportRequest>({
      query: (params) => ({
        url: "Reports/tv-subscriptions-ending",
        params,
      }),
    }),
    exportTvSubscriptionsEndingReport: builder.mutation<null, TvSubscriptionsEndingReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/tv-subscriptions-ending/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TvSubscriptionsEnding", params.format),
      }),
    }),
  }),
});

export const { useGetTvSubscriptionsEndingReportQuery, useExportTvSubscriptionsEndingReportMutation } = tvSubscriptionsEndingReportApi;
