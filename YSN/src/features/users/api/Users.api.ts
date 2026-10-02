import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { UpdateProfileData, UserDto, UserFilter, UserFormData, UserListDto, UserRequest } from "../types/Users.types";

const toUserFormData = (data: UserFormData) => {
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  if (data.phoneNumber) {
    formData.append("phoneNumber", data.phoneNumber);
    if (data.countryId) formData.append("countryId", String(data.countryId));
  }
  formData.append("roleId", String(data.roleId));
  formData.append("hasAllCities", String(data.hasAllCities));
  if (!data.hasAllCities) data.cityIds.forEach((cityId) => formData.append("cityIds", String(cityId)));
  formData.append("isActive", String(data.isActive));
  if (data.profileImage) formData.append("profileImage", data.profileImage);
  return formData;
};

export const userApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<BaseListResponse<UserListDto>, Partial<UserRequest>>({
      query: (params) => ({
        url: "Users",
        params,
      }),
    }),
    getUserById: builder.query<UserDto, number>({
      query: (id) => `Users/${id}`,
    }),
    createUser: builder.mutation<UserDto, UserFormData>({
      query: (data) => ({
        url: "Users",
        method: "POST",
        body: toUserFormData(data),
      }),
    }),
    updateUser: builder.mutation<UserDto, { id: number; data: UserFormData }>({
      query: ({ id, data }) => ({
        url: `Users/${id}`,
        method: "PUT",
        body: toUserFormData(data),
      }),
    }),
    changeUserStatus: builder.mutation<boolean, { id: number; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `Users/${id}/status`,
        method: "PUT",
        body: { isActive },
      }),
    }),
    resetUserPassword: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Users/${id}/reset-password`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Users/${id}`,
        method: "DELETE",
      }),
    }),
    restoreUser: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Users/${id}/restore`,
        method: "POST",
      }),
    }),
    exportUsers: builder.mutation<null, UserFilter>({
      query: (params) => ({
        url: "Users/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Employees"),
      }),
    }),
    getMyProfile: builder.query<UserDto, void>({
      query: () => "Users/profile",
    }),
    updateProfile: builder.mutation<UserDto, UpdateProfileData>({
      query: (data) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        if (data.phoneNumber) {
          formData.append("phoneNumber", data.phoneNumber);
          if (data.countryId) formData.append("countryId", String(data.countryId));
        }
        if (data.profileImage) formData.append("profileImage", data.profileImage);
        return {
          url: "Users/profile",
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useChangeUserStatusMutation,
  useResetUserPasswordMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useExportUsersMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = userApi;
