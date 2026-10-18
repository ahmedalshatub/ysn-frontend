import { instanceApi } from "../../../app/api/instanceApi";
import type {
  ChangePasswordDto,
  CurrentUserDto,
  LoginDto,
  LoginResponseDto,
} from "../types/Auth.types";
import type { OtpLoginRequestDto, VerifyOtpLoginDto } from "../types/OtpLogin.types";
import type { ForgetPasswordDto, VerifyOtpDto, VerifyOtpResponseDto, ResetPasswordDto } from "../types/PasswordReset.types";

export const authApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (body) => ({
        url: "Auth/login",
        method: "POST",
        body,
      }),
    }),
    otpLoginRequest: builder.mutation<void, OtpLoginRequestDto>({
      query: (body) => ({
        url: "Auth/otp-login-request",
        method: "POST",
        body,
      }),
    }),
    verifyOtpLogin: builder.mutation<LoginResponseDto, VerifyOtpLoginDto>({
      query: (body) => ({
        url: "Auth/verify-otp-login",
        method: "POST",
        body,
      }),
    }),
    getCurrentUser: builder.query<CurrentUserDto, void>({
      query: () => "Auth/me",
    }),
    revokeToken: builder.mutation<void, void>({
      query: () => ({
        url: "Auth/revoke-token",
        method: "POST",
      }),
    }),
    forgetPassword: builder.mutation<void, ForgetPasswordDto>({
      query: (body) => ({
        url: "Auth/forget-password",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponseDto, VerifyOtpDto>({
      query: (body) => ({
        url: "Auth/verify-reset-code",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordDto>({
      query: (body) => ({
        url: "Auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: (body) => ({
        url: "Auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useOtpLoginRequestMutation,
  useVerifyOtpLoginMutation,
  useGetCurrentUserQuery,
  useRevokeTokenMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
