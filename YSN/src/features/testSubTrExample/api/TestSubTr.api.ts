import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { TestSubTrDto, TestSubTrListDto, TestSubTrRequest, AddTestSubTrDto, UpdateTestSubTrDto } from "../types/TestSubTr.types";

export const testSubTrApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    createTestSubTr: builder.mutation<TestSubTrDto, AddTestSubTrDto>({
      query: (data) => {
        const formData = new FormData();
        formData.append("testTrId", data.testTrId.toString());
        formData.append("clientId", data.clientId.toString());
        formData.append("amount", data.amount.toString());
        if (data.image) formData.append("image", data.image);
        formData.append("translations", JSON.stringify(data.translations));
        return {
          url: "TestSubTrs",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateTestSubTr: builder.mutation<TestSubTrDto, { id: number } & UpdateTestSubTrDto>({
      query: ({ id, ...data }) => {
        const formData = new FormData();
        formData.append("id", id.toString());
        formData.append("testTrId", data.testTrId.toString());
        formData.append("clientId", data.clientId.toString());
        formData.append("amount", data.amount.toString());
        if (data.image) formData.append("image", data.image);
        formData.append("translations", JSON.stringify(data.translations));
        return {
          url: `TestSubTrs/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteTestSubTr: builder.mutation<void, string>({
      query: (id) => ({
        url: `TestSubTrs/${id}`,
        method: "DELETE",
      }),
    }),
    restoreTestSubTr: builder.mutation<void, string>({
      query: (id) => ({
        url: `TestSubTrs/${id}/restore`,
        method: "POST",
      }),
    }),
    getAllTestSubTrs: builder.query<BaseListResponse<TestSubTrListDto>, TestSubTrRequest>({
      query: (params) => ({
        url: "TestSubTrs",
        params,
      }),
    }),
    getTestSubTrById: builder.query<TestSubTrDto, string>({
      query: (id) => `TestSubTrs/${id}`,
    }),
  }),
});

export const {
  useCreateTestSubTrMutation,
  useUpdateTestSubTrMutation,
  useDeleteTestSubTrMutation,
  useRestoreTestSubTrMutation,
  useGetAllTestSubTrsQuery,
  useGetTestSubTrByIdQuery,
} = testSubTrApi;
