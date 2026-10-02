import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { CategoryDto, CategoryRequest, AddCategoryDto } from "../types/Categories.types";

export const categoryApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<CategoryDto, AddCategoryDto>({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image) formData.append("image", data.image);
        return {
          url: "Categories",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateCategory: builder.mutation<CategoryDto, { id: number; data: { name: string; image?: File } }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        formData.append("id", id.toString());
        formData.append("name", data.name);
        if (data.image) formData.append("image", data.image);
        return {
          url: `Categories/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Categories/${id}`,
        method: "DELETE",
      }),
    }),
    restoreCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Categories/${id}/restore`,
        method: "PATCH",
      }),
    }),
    getAllCategories: builder.query<BaseListResponse<CategoryDto>, CategoryRequest>({
      query: (params) => ({
        url: "Categories",
        params,
      }),
    }),
    getCategoryById: builder.query<CategoryDto, number>({
      query: (id) => `Categories/${id}`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
