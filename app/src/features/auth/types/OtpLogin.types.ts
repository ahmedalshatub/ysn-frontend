export interface OtpLoginRequestDto {
  username: string;
  password: string;
}

export interface VerifyOtpLoginDto {
  usernameOrEmailOrPhone: string;
  otpCode: string;
}
