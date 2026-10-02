import { instanceApi } from "../../../app/api/instanceApi";
import type {
  ChangePasswordDto,
  CurrentUserDto,
  LoginChallengeDto,
  LoginDto,
  LoginResponseDto,
  ResendLoginCodeDto,
  VerifyLoginCodeDto,
} from "../types/Auth.types";
import type { ForgetPasswordDto, VerifyOtpDto, VerifyOtpResponseDto, ResetPasswordDto } from "../types/PasswordReset.types";

export const authApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginChallengeDto, LoginDto>({
      query: (body) => ({
        url: "Auth/login",
        method: "POST",
        body,
      }),
    }),
    verifyLoginCode: builder.mutation<LoginResponseDto, VerifyLoginCodeDto>({
      query: (body) => ({
        url: "Auth/verify-login-code",
        method: "POST",
        body,
      }),
    }),
    resendLoginCode: builder.mutation<LoginChallengeDto, ResendLoginCodeDto>({
      query: (body) => ({
        url: "Auth/resend-login-code",
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
  useVerifyLoginCodeMutation,
  useResendLoginCodeMutation,
  useGetCurrentUserQuery,
  useRevokeTokenMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
