export interface ForgetPasswordDto {
  emailOrUsername: string;
}

export interface VerifyOtpDto {
  emailOrUsername: string;
  otpCode: string;
}

export interface VerifyOtpResponseDto {
  resetToken: string;
}

export interface ResetPasswordDto {
  email: string;
  resetToken: string;
  newPassword?: string;
  confirmPassword?: string;
}
