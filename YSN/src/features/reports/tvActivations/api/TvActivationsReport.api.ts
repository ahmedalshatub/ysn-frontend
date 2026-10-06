import { instanceApi } from "../../../../app/api/instanceApi";
import { excelResponseHandler } from "../../../../shared/utils/fileDownload";
import type { TvActivationsReportDto, TvActivationsReportFilter, TvActivationsReportRequest } from "../types/TvActivationsReport.types";

export const tvActivationsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvActivationsReport: builder.query<TvActivationsReportDto, TvActivationsReportRequest>({
      query: (params) => ({
        url: "Reports/tv-activations",
        params,
      }),
    }),
    exportTvActivationsReport: builder.mutation<null, TvActivationsReportFilter>({
      query: (params) => ({
        url: "Reports/tv-activations/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvActivations"),
      }),
    }),
  }),
});

export const { useGetTvActivationsReportQuery, useExportTvActivationsReportMutation } = tvActivationsReportApi;
