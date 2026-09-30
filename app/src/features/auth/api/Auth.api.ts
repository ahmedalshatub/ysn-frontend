import { instanceApi } from "../../../app/api/instanceApi";
import type { LoginDto, LoginResponseDto, ChangePasswordDto } from "../types/Auth.types";
import type { ForgetPasswordDto, VerifyOtpDto, VerifyOtpResponseDto, ResetPasswordDto } from "../types/PasswordReset.types";
import type { OtpLoginRequestDto, VerifyOtpLoginDto } from "../types/OtpLogin.types";
import type {
  RegisterRequestDto,
  VerifyRegistrationOtpDto,
  VerifyRegistrationOtpResponseDto,
  CompleteRegistrationDto,
} from "../types/Registration.types";

export const authApi = instanceApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (body) => ({
        url: "Auth/login",
        method: "POST",
        body,
      }),
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
        url: "Auth/verify-otp",
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
    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: (body) => ({
        url: "Auth/change-password",
        method: "POST",
        body,
      }),
    }),

    registerRequest: builder.mutation<void, RegisterRequestDto>({
      query: (body) => ({
        url: "Auth/register-request",
        method: "POST",
        body,
      }),
    }),

    verifyRegistrationOtp: builder.mutation<
      VerifyRegistrationOtpResponseDto,
      VerifyRegistrationOtpDto
    >({
      query: (body) => ({
        url: "Auth/verify-registration-otp",
        method: "POST",
        body,
      }),
    }),

    completeRegistration: builder.mutation<LoginResponseDto, CompleteRegistrationDto>({
      query: (body) => {
        const formData = new FormData();
        formData.append("RegisterToken", body.registerToken);
        formData.append("Username", body.username);
        formData.append("Email", body.email);
        if (body.password) formData.append("Password", body.password);
        if (body.confirmPassword) formData.append("ConfirmPassword", body.confirmPassword);
        formData.append("FirstName", body.firstName);
        formData.append("LastName", body.lastName);
        if (body.phone) formData.append("Phone", body.phone);
        if (body.profileImage) formData.append("ProfileImage", body.profileImage);

        return {
          url: "Auth/complete-registration",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRevokeTokenMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useOtpLoginRequestMutation,
  useVerifyOtpLoginMutation,
  useChangePasswordMutation,
  useRegisterRequestMutation,
  useVerifyRegistrationOtpMutation,
  useCompleteRegistrationMutation,
} = authApi;
