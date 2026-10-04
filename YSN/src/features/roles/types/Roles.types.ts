import type { BaseDto, BaseRequest } from "../../../shared/types/base";
import type { DataLanguageType } from "../../../shared/types/DataLanguage.types";

export interface RoleFilter {
  name?: string;
  permissionId?: number;
  isSystem?: boolean;
  isCustomerRole?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
}

export interface RoleRequest extends BaseRequest, RoleFilter {}

export interface RoleListDto extends BaseDto {
  name: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  permissionsCount: number;
  usersCount: number;
}

export interface RoleTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  description: string | null;
  roleId: number;
}

export interface RoleDto extends BaseDto {
  isSystem: boolean;
  isActive: boolean;
  translations: RoleTranslationDto[];
  permissionIds: number[];
}

export interface AddRoleTranslationDto {
  languageCode: DataLanguageType;
  name: string;
  description: string | null;
}

export interface AddRoleDto {
  isActive: boolean;
  translations: AddRoleTranslationDto[];
  permissionIds: number[];
}

export type UpdateRoleDto = AddRoleDto;

export interface PermissionDto {
  id: number;
  code: string;
  module: string;
  action: string;
  sortOrder: number;
  scope: number;
  endpoints?: string[];
}

export interface PermissionModuleGroup {
  module: string;
  permissions: PermissionDto[];
}

export const PermissionScope = {
  Dashboard: 1,
  App: 2,
} as const;

export const SUPER_ADMIN_ROLE_ID = 1;

export const CUSTOMER_ROLE_IDS = [4, 5, 6];

export const isCustomerRoleId = (roleId: number) => CUSTOMER_ROLE_IDS.includes(roleId);

export const isLockedRole = (role: { id: number; isSystem: boolean }) => role.isSystem || isCustomerRoleId(role.id);
