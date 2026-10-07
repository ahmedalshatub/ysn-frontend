import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../shared/types/ExportFormat.types";
import type { TvSmsApiLogDto, TvSmsApiLogFilter, TvSmsApiLogRequest } from "../types/TvSmsApiLogs.types";

export const tvSmsApiLogsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvSmsApiLogs: builder.query<BaseListResponse<TvSmsApiLogDto>, Partial<TvSmsApiLogRequest>>({
      query: (params) => ({
        url: "TvSmsApiLogs",
        params,
      }),
    }),
    exportTvSmsApiLogs: builder.mutation<null, TvSmsApiLogFilter & ExportRequest>({
      query: (params) => ({
        url: "TvSmsApiLogs/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("TvSmsApiLogs", params.format),
      }),
    }),
  }),
});

export const { useGetTvSmsApiLogsQuery, useExportTvSmsApiLogsMutation } = tvSmsApiLogsApi;
