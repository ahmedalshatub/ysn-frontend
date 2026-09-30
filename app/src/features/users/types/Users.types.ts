import type { BaseDto, BaseRequest } from '../../../shared/types/base';

export interface UserFilter {
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  roleId?: number;
  roleName?: string;
}

export interface UserRequest extends BaseRequest, UserFilter {}

export interface AddUser {
  userName: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  roleId: number;
  profileImage?: File;
}

export interface UpdateUser {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  lastLoginAt?: string;
  roleId: number;
  profileImage?: File;
}

export interface AdminChangePassword {
  userId: number;
  newPassword?: string;
  confirmPassword?: string;
}

export interface User extends BaseDto {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  lastLoginAt?: string;
  roleId: number;
  roleName: string;
  profileImageId?: string;
  profileImage: string;
  forcePasswordChange: boolean;
}
