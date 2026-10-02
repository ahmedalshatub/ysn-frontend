import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { TestTrDto, TestTrListDto, TestTrRequest, AddTestTrDto, UpdateTestTrDto } from "../types/TestTr.types";

export const testTrApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    createTestTr: builder.mutation<TestTrDto, AddTestTrDto>({
      query: (body) => ({
        url: "TestTrs",
        method: "POST",
        body,
      }),
    }),
    updateTestTr: builder.mutation<TestTrDto, { id: number | string; data: UpdateTestTrDto }>({
      query: ({ id, data }) => ({
        url: `TestTrs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTestTr: builder.mutation<void, string>({
      query: (id) => ({
        url: `TestTrs/${id}`,
        method: "DELETE",
      }),
    }),
    restoreTestTr: builder.mutation<void, string>({
      query: (id) => ({
        url: `TestTrs/${id}/restore`,
        method: "POST",
      }),
    }),
    getAllTestTrs: builder.query<BaseListResponse<TestTrListDto>, TestTrRequest>({
      query: (params) => ({
        url: "TestTrs",
        params,
      }),
    }),
    getTestTrById: builder.query<TestTrDto, string>({
      query: (id) => `TestTrs/${id}`,
    }),
    getTestTrsCount: builder.query<number, void>({
      query: () => "TestTrs/count",
    }),
  }),
});

export const {
  useCreateTestTrMutation,
  useUpdateTestTrMutation,
  useDeleteTestTrMutation,
  useRestoreTestTrMutation,
  useGetAllTestTrsQuery,
  useGetTestTrByIdQuery,
  useGetTestTrsCountQuery,
} = testTrApi;
