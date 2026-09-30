import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import type { User, UserRequest, AddUser, UpdateUser, AdminChangePassword } from "../types/Users.types";

export const userApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<User, AddUser>({
      query: (data) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("phone", data.phoneNumber);
        formData.append("isActive", data.isActive.toString());
        formData.append("roleId", data.roleId.toString());
        if (data.profileImage) formData.append("profileImage", data.profileImage);
        return {
          url: "Users",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateUser: builder.mutation<User, UpdateUser>({
      query: (data) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("phone", data.phoneNumber);
        formData.append("isActive", data.isActive.toString());
        formData.append("roleId", data.roleId.toString());
        if (data.lastLoginAt) formData.append("lastLoginAt", data.lastLoginAt);
        if (data.profileImage) formData.append("profileImage", data.profileImage);
        return {
          url: `Users/${data.id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `Users/${id}`,
        method: "DELETE",
      }),
    }),
    restoreUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `Users/${id}/restore`,
        method: "POST",
      }),
    }),
    getAllUsers: builder.query<BaseListResponse<User>, UserRequest>({
      query: (params) => ({
        url: "Users",
        params,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `Users/${id}`,
    }),
    getMyProfile: builder.query<User, void>({
      query: () => "Users/profile",
    }),
    getUsersCount: builder.query<number, void>({
      query: () => "Users/count",
    }),
    adminChangePassword: builder.mutation<void, AdminChangePassword>({
      query: (body) => ({
        url: "Users/admin-change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetMyProfileQuery,
  useGetUsersCountQuery,
  useAdminChangePasswordMutation,
} = userApi;
