export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  userName: string;
  firstName: string;
  lastName: string;
  roleId: number;
  roleName: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
  forcePasswordChange: boolean;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
