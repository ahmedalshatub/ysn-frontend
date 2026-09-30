import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { OtpLoginRequestDto, VerifyOtpLoginDto } from "../../types/OtpLogin.types";
import { login } from "../../slices/Auth.slice";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { useOtpLoginRequestMutation, useVerifyOtpLoginMutation } from "../../api/Auth.api";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";
import useTitle from "../../../../shared/hooks/useTitle";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import OtpInput from "../../../../shared/components/inputs/OtpInput";
import Button from "../../../../shared/components/buttons/Button";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const ImageTwoSideOtpLogin = () => {
  const { t } = useTranslation();
  useTitle(t("otpLogin.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("next") ?? "/dashboard";

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  

  const [otpLoginRequest, { isLoading: isSending }] = useOtpLoginRequestMutation();
  const [verifyOtpLogin, { isLoading: isVerifying }] = useVerifyOtpLoginMutation();

  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [username, setUsername] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => { if (isLoggedIn) navigate("/dashboard", { replace: true }); }, [isLoggedIn, navigate]);
  useEffect(() => {
    if (step !== "otp") return;
    if (timeLeft <= 0) { showError(t("otpLogin.otpExpired")); setStep("credentials"); return; }
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, timeLeft, t]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const schema = yup.object().shape({
    username: yup.string().required(t("login.emailRequired")),
    password: yup.string().required(t("login.passwordRequired")),
  });
  const { control, handleSubmit, formState: { errors } } = useForm<OtpLoginRequestDto>({
    resolver: yupResolver(schema), mode: "onBlur", defaultValues: { username: "", password: "" },
  });

  const onSubmitCredentials = async (data: OtpLoginRequestDto) => {
    try {
      await otpLoginRequest(data).unwrap();
      showSuccess(t("otpLogin.otpSent"));
      setUsername(data.username); setOtpCode(""); setTimeLeft(120); setStep("otp");
    } catch (error: any) { showError(getErrorMessage(error)); }
  };

  const onSubmitOtp = async () => {
    if (otpCode.length !== 8) { showError(t("otpLogin.otpMustBe8Digits")); return; }
    try {
      const result = await verifyOtpLogin({ usernameOrEmailOrPhone: username, otpCode } as VerifyOtpLoginDto).unwrap();
      dispatch(login({ firstName: result.firstName, lastName: result.lastName, roleID: result.roleId, jwtToken: result.accessToken, refreshToken: result.refreshToken, profileImageUrl: result.profileImage || null, forcePasswordChange: result.forcePasswordChange }));
      showSuccess(t("login.loginSuccess")); navigate(redirectUrl, { replace: true });
    } catch (error: any) { showError(getErrorMessage(error)); }
  };

  return (
    <UnAuthLayout>
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center auth-bg-image"
          />
          <div className={`absolute inset-0 auth-image-overlay`} />
          <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
            <Logo orientation="portrait" theme="dark" height={224} />
            <h2 className="text-3xl font-bold text-white">{t("common.welcome")}</h2>
            <p className="max-w-sm text-lg text-white/80">{t("common.appName")}</p>
          </div>
        </div>

        <div className={`flex w-full lg:w-1/2 items-center justify-center px-6 py-8 auth-page-bg`}>
          <div className="w-full max-w-md">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => dispatch(toggleTheme())} className={`rounded-lg p-2 transition-colors page-theme-btn`}>
                  {themeMode === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <LanguageSwitcher />
              </div>
            </div>

            <div className="lg:hidden flex justify-center mb-6">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
            </div>

            <div className="mb-8">
              <h1 className={`text-3xl font-bold auth-heading`}>{t("otpLogin.title")}</h1>
              <p className={`mt-1 text-sm auth-subtext`}>
                {step === "credentials" ? t("otpLogin.description") : t("otpLogin.otpDescription")}
              </p>
            </div>

            {step === "credentials" ? (
              <form onSubmit={handleSubmit(onSubmitCredentials)} className="flex flex-col gap-5">
                <FormInput<OtpLoginRequestDto> name="username" control={control} label={t("login.email")} placeholder={t("login.emailPlaceholder")} error={!!errors.username} errorMessage={errors.username?.message} />
                <FormPasswordInput<OtpLoginRequestDto> name="password" control={control} label={t("login.password")} placeholder={t("login.passwordPlaceholder")} error={!!errors.password} errorMessage={errors.password?.message} />
                <div className="flex items-center justify-end">
                  <Link to="/forgot-password" className="text-sm font-medium auth-link transition-colors">{t("login.forgotPassword")}</Link>
                </div>
                <Button type="submit" variant="primary" block size="lg" loading={isSending} label={t("otpLogin.sendOtp")} />
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <p className={`text-center text-sm font-medium ${timeLeft < 30 ? "auth-timer-warning" : "auth-timer-text"}`}>{t("otpLogin.timeRemaining")}: {formatTime(timeLeft)}</p>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium auth-form-label`}>{t("otpLogin.otpCode")}</label>
                  <OtpInput length={8} value={otpCode} onChange={setOtpCode} onComplete={setOtpCode} variant="primary" />
                </div>
                <Button type="button" variant="primary" block size="lg" loading={isVerifying} label={t("otpLogin.verifyOtp")} onClick={onSubmitOtp} />
                <Button type="button" variant="secondary" outline block size="lg" label={t("common.back")} onClick={() => setStep("credentials")} />
              </div>
            )}
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ImageTwoSideOtpLogin;
