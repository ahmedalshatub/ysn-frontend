import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type {
  AddTvSmsServerDto,
  TvSmsServerDto,
  TvSmsServerFilter,
  TvSmsServerListDto,
  TvSmsServerRequest,
  UpdateTvSmsServerDto,
} from "../types/TvSmsServers.types";

export const tvSmsServersApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvSmsServers: builder.query<BaseListResponse<TvSmsServerListDto>, Partial<TvSmsServerRequest>>({
      query: (params) => ({
        url: "TvSmsServers",
        params,
      }),
    }),
    getTvSmsServer: builder.query<TvSmsServerDto, number>({
      query: (id) => `TvSmsServers/${id}`,
    }),
    addTvSmsServer: builder.mutation<TvSmsServerDto, AddTvSmsServerDto>({
      query: (body) => ({
        url: "TvSmsServers",
        method: "POST",
        body,
      }),
    }),
    updateTvSmsServer: builder.mutation<TvSmsServerDto, { id: number; data: UpdateTvSmsServerDto }>({
      query: ({ id, data }) => ({
        url: `TvSmsServers/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTvSmsServer: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `TvSmsServers/${id}`,
        method: "DELETE",
      }),
    }),
    restoreTvSmsServer: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `TvSmsServers/${id}/restore`,
        method: "POST",
      }),
    }),
    exportTvSmsServers: builder.mutation<null, TvSmsServerFilter>({
      query: (params) => ({
        url: "TvSmsServers/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("TvSmsServers"),
      }),
    }),
  }),
});

export const {
  useGetTvSmsServersQuery,
  useGetTvSmsServerQuery,
  useAddTvSmsServerMutation,
  useUpdateTvSmsServerMutation,
  useDeleteTvSmsServerMutation,
  useRestoreTvSmsServerMutation,
  useExportTvSmsServersMutation,
} = tvSmsServersApi;
