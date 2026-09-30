export interface RegisterRequestDto {
  emailOrPhone: string;
}

export interface VerifyRegistrationOtpDto {
  emailOrPhone: string;
  otpCode: string;
}

export interface VerifyRegistrationOtpResponseDto {
  registerToken: string;
}

export interface CompleteRegistrationDto {
  registerToken: string;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  profileImage?: File | null;
}
