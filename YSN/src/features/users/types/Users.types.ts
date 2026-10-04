import type { BaseDto, BaseRequest } from "../../../shared/types/base";

export interface UserFilter {
  name?: string;
  email?: string;
  phoneNumber?: string;
  roleId?: number;
  cityId?: number;
  hasAllCities?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: number;
  fromDate?: string;
  toDate?: string;
  lastLoginFrom?: string;
  lastLoginTo?: string;
}

export interface UserRequest extends BaseRequest, UserFilter {}

export interface UserListDto extends BaseDto {
  userName: string;
  email: string | null;
  firstName: string;
  lastName: string;
  countryId: number | null;
  phoneCode: string | null;
  phoneNumber: string | null;
  roleId: number | null;
  roleName: string | null;
  isSuperAdmin: boolean;
  isActive: boolean;
  hasAllCities: boolean;
  forcePasswordChange: boolean;
  lastLoginAt: string | null;
  profileImageId: string | null;
  profileImage: string | null;
}

export interface UserCityDto {
  cityId: number;
  name: string;
}

export interface UserDto extends UserListDto {
  cities: UserCityDto[];
}

export type User = UserListDto;

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryId: number | null;
  phoneNumber: string;
  roleId: number;
  hasAllCities: boolean;
  cityIds: number[];
  isActive: boolean;
  profileImage?: File | null;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  countryId: number | null;
  phoneNumber: string;
  profileImage?: File | null;
}

export const fullName = (user: Pick<UserListDto, "firstName" | "lastName" | "userName">) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.userName;

export const fullPhone = (user: Pick<UserListDto, "phoneCode" | "phoneNumber">) =>
  user.phoneNumber ? `${user.phoneCode ?? ""} ${user.phoneNumber}`.trim() : "";
