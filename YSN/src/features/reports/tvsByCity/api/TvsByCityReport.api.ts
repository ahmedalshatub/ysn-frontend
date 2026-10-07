import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { TvsByCityReportDto, TvsByCityReportFilter, TvsByCityReportRequest } from "../types/TvsByCityReport.types";

export const tvsByCityReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvsByCityReport: builder.query<TvsByCityReportDto, TvsByCityReportRequest>({
      query: (params) => ({
        url: "Reports/tvs-by-city",
        params,
      }),
    }),
    exportTvsByCityReport: builder.mutation<null, TvsByCityReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/tvs-by-city/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TvsByCity", params.format),
      }),
    }),
  }),
});

export const { useGetTvsByCityReportQuery, useExportTvsByCityReportMutation } = tvsByCityReportApi;
