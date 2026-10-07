import { instanceApi } from "../../../../app/api/instanceApi";
import { exportResponseHandler } from "../../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../../shared/types/ExportFormat.types";
import type { TvActivationsReportDto, TvActivationsReportFilter, TvActivationsReportRequest } from "../types/TvActivationsReport.types";

export const tvActivationsReportApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvActivationsReport: builder.query<TvActivationsReportDto, TvActivationsReportRequest>({
      query: (params) => ({
        url: "Reports/tv-activations",
        params,
      }),
    }),
    exportTvActivationsReport: builder.mutation<null, TvActivationsReportFilter & ExportRequest>({
      query: (params) => ({
        url: "Reports/tv-activations/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TvActivations", params.format),
      }),
    }),
  }),
});

export const { useGetTvActivationsReportQuery, useExportTvActivationsReportMutation } = tvActivationsReportApi;
