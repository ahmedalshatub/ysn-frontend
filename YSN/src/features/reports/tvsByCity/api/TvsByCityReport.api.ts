import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { TvsByCityReportDto, TvsByCityReportFilter, TvsByCityReportRequest } from "../types/TvsByCityReport.types";

export const tvsByCityReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvsByCityReport: builder.query<TvsByCityReportDto, TvsByCityReportRequest>({
      query: (params) => ({
        url: "Reports/tvs-by-city",
        params,
      }),
    }),
    exportTvsByCityReport: builder.mutation<null, TvsByCityReportFilter>({
      query: (params) => ({
        url: "Reports/tvs-by-city/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvsByCity"),
      }),
    }),
  }),
});

export const { useGetTvsByCityReportQuery, useExportTvsByCityReportMutation } = tvsByCityReportApi;
