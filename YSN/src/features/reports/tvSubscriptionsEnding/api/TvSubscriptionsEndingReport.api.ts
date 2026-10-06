import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
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
    exportTvSubscriptionsEndingReport: builder.mutation<null, TvSubscriptionsEndingReportFilter>({
      query: (params) => ({
        url: "Reports/tv-subscriptions-ending/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvSubscriptionsEnding"),
      }),
    }),
  }),
});

export const { useGetTvSubscriptionsEndingReportQuery, useExportTvSubscriptionsEndingReportMutation } = tvSubscriptionsEndingReportApi;
