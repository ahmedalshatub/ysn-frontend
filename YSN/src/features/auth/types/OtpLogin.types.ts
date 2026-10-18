export interface OtpLoginRequestDto {
  email: string;
  password: string;
}

export interface VerifyOtpLoginDto {
  email: string;
  otpCode: string;
}
