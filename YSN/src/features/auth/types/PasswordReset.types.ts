export interface ForgetPasswordDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otpCode: string;
}

export interface VerifyOtpResponseDto {
  resetToken: string;
}

export interface ResetPasswordDto {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}
