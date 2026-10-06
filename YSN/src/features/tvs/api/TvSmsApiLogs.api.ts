import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { TvSmsApiLogDto, TvSmsApiLogFilter, TvSmsApiLogRequest } from "../types/TvSmsApiLogs.types";

export const tvSmsApiLogsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvSmsApiLogs: builder.query<BaseListResponse<TvSmsApiLogDto>, Partial<TvSmsApiLogRequest>>({
      query: (params) => ({
        url: "TvSmsApiLogs",
        params,
      }),
    }),
    exportTvSmsApiLogs: builder.mutation<null, TvSmsApiLogFilter>({
      query: (params) => ({
        url: "TvSmsApiLogs/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvSmsApiLogs"),
      }),
    }),
  }),
});

export const { useGetTvSmsApiLogsQuery, useExportTvSmsApiLogsMutation } = tvSmsApiLogsApi;
