import { instanceApi } from "../../../app/api/instanceApi";
import type { BaseListResponse } from "../../../shared/types/base";
import { excelResponseHandler } from "../../../shared/utils/fileDownload";
import type { AddRoleDto, PermissionDto, RoleDto, RoleFilter, RoleListDto, RoleRequest, UpdateRoleDto } from "../types/Roles.types";

export const rolesApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<BaseListResponse<RoleListDto>, Partial<RoleRequest>>({
      query: (params) => ({
        url: "Roles",
        params,
      }),
    }),
    getPermissions: builder.query<PermissionDto[], void>({
      query: () => "Roles/permissions",
    }),
    getRole: builder.query<RoleDto, number>({
      query: (id) => `Roles/${id}`,
    }),
    addRole: builder.mutation<RoleDto, AddRoleDto>({
      query: (body) => ({
        url: "Roles",
        method: "POST",
        body,
      }),
    }),
    updateRole: builder.mutation<RoleDto, { id: number; data: UpdateRoleDto }>({
      query: ({ id, data }) => ({
        url: `Roles/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRole: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Roles/${id}`,
        method: "DELETE",
      }),
    }),
    restoreRole: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `Roles/${id}/restore`,
        method: "POST",
      }),
    }),
    exportRoles: builder.mutation<null, RoleFilter>({
      query: (params) => ({
        url: "Roles/export",
        method: "GET",
        params,
        responseHandler: excelResponseHandler("Roles"),
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetPermissionsQuery,
  useGetRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useRestoreRoleMutation,
  useExportRolesMutation,
} = rolesApi;
