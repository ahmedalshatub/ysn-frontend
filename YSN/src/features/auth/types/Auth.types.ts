export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginChallengeDto {
  challengeId: string;
  expiresAt: string;
  resendAfterSeconds: number;
}

export interface VerifyLoginCodeDto {
  challengeId: string;
  code: string;
}

export interface ResendLoginCodeDto {
  challengeId: string;
}

export interface CurrentUserDto {
  id: number;
  userName: string;
  email: string | null;
  firstName: string;
  lastName: string;
  roleId: number | null;
  roleName: string | null;
  isSuperAdmin: boolean;
  profileImage: string | null;
  forcePasswordChange: boolean;
  hasAllCities: boolean;
  cityIds: number[];
  permissions: string[];
}

export interface LoginResponseDto extends CurrentUserDto {
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginCodeState {
  challengeId: string;
  email: string;
  resendAfterSeconds: number;
  next: string;
}
