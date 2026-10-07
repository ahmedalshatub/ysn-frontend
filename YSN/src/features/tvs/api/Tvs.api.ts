import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { exportResponseHandler } from "../../../shared/utils/fileDownload";
import type { ExportRequest } from "../../../shared/types/ExportFormat.types";
import type {
  AddCustomerTvDto,
  CustomerTvDto,
  CustomerTvFilter,
  CustomerTvListDto,
  CustomerTvRequest,
  UpdateCustomerTvDto,
} from "../types/Tvs.types";

export const tvsApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getTvs: builder.query<BaseListResponse<CustomerTvListDto>, Partial<CustomerTvRequest>>({
      query: (params) => ({
        url: "Tvs",
        params,
      }),
    }),
    getTv: builder.query<CustomerTvDto, number>({
      query: (id) => `Tvs/${id}`,
    }),
    getTvsCount: builder.query<number, CustomerTvFilter>({
      query: (params) => ({ url: "Tvs/count", params }),
    }),
    addTv: builder.mutation<CustomerTvDto, AddCustomerTvDto>({
      query: (body) => ({
        url: "Tvs",
        method: "POST",
        body,
      }),
    }),
    updateTv: builder.mutation<CustomerTvDto, { id: number; data: UpdateCustomerTvDto }>({
      query: ({ id, data }) => ({
        url: `Tvs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    removeTv: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Tvs/${id}`,
        method: "DELETE",
      }),
    }),
    refreshTvSubscription: builder.mutation<CustomerTvDto, number>({
      query: (id) => ({
        url: `Tvs/${id}/refresh-subscription`,
        method: "POST",
      }),
    }),
    exportTvs: builder.mutation<null, CustomerTvFilter & ExportRequest>({
      query: (params) => ({
        url: "Tvs/export",
        method: "GET",
        params,
        responseHandler: exportResponseHandler("Tvs", params.format),
      }),
    }),
  }),
});

export const {
  useGetTvsQuery,
  useGetTvQuery,
  useGetTvsCountQuery,
  useAddTvMutation,
  useUpdateTvMutation,
  useRemoveTvMutation,
  useRefreshTvSubscriptionMutation,
  useExportTvsMutation,
} = tvsApi;
