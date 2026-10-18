import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { OtpLoginRequestDto } from "../../types/OtpLogin.types";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { useOtpLoginRequestMutation, useVerifyOtpLoginMutation } from "../../api/Auth.api";
import { login } from "../../slices/Auth.slice";
import { showError, showSuccess } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import { isCustomerRole } from "../../../customers/types/Customers.types";
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

const CODE_LENGTH = 6;
const RESEND_AFTER_SECONDS = 60;

const OtpLogin = () => {
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
  const [credentials, setCredentials] = useState<OtpLoginRequestDto>({ email: "", password: "" });
  const [code, setCode] = useState("");
  const [resendIn, setResendIn] = useState(RESEND_AFTER_SECONDS);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, resendIn]);

  const schemaResolver = yup.object().shape({
    email: yup.string().trim().required(t("login.emailRequired")).email(t("login.invalidEmail")),
    password: yup.string().required(t("login.passwordRequired")),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<OtpLoginRequestDto>({
    resolver: yupResolver(schemaResolver),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const sendCode = async (data: OtpLoginRequestDto) => {
    const request = { email: data.email.trim(), password: data.password };
    try {
      await otpLoginRequest(request).unwrap();
      setCredentials(request);
      setCode("");
      setResendIn(RESEND_AFTER_SECONDS);
      setStep("otp");
    } catch (error: any) { showError(getErrorMessage(error)); }
  };

  const onVerify = async () => {
    if (code.length !== CODE_LENGTH) {
      showError(t("otpLogin.codeMustBe6Digits"));
      return;
    }
    try {
      const result = await verifyOtpLogin({ email: credentials.email, otpCode: code }).unwrap();
      if (result.roleId !== null && isCustomerRole(result.roleId)) {
        showError(t("errors.Auth.DashboardNotAllowed"));
        return;
      }
      dispatch(login(result));
      showSuccess(t("login.loginSuccess"));
      navigate(redirectUrl, { replace: true });
    } catch (error: any) {
      setCode("");
      showError(getErrorMessage(error));
    }
  };

  const onResend = async () => {
    try {
      await otpLoginRequest(credentials).unwrap();
      setResendIn(RESEND_AFTER_SECONDS);
      setCode("");
      showSuccess(t("otpLogin.codeSent"));
    } catch (error: any) { showError(getErrorMessage(error)); }
  };

  return (
    <UnAuthLayout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
          <button type="button" onClick={() => dispatch(toggleTheme())} className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn">
            {themeMode === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="rounded-2xl border p-8 shadow-2xl backdrop-blur-xl auth-modern-card">
            <div className="mb-8 flex flex-col items-center">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3" />
              <h1 className="text-2xl font-bold auth-heading">{t("otpLogin.title")}</h1>
              {step === "otp" && (
                <p className="mt-1 text-center text-sm auth-subtext">{t("otpLogin.description", { email: credentials.email })}</p>
              )}
            </div>

            {step === "credentials" ? (
              <form onSubmit={handleSubmit(sendCode)} className="flex flex-col gap-4">
                <FormInput<OtpLoginRequestDto> name="email" type="email" control={control} label={t("login.email")} placeholder={t("login.emailPlaceholder")} error={!!errors.email} errorMessage={errors.email?.message} />
                <FormPasswordInput<OtpLoginRequestDto> name="password" control={control} label={t("login.password")} placeholder={t("login.passwordPlaceholder")} error={!!errors.password} errorMessage={errors.password?.message} />
                <div className="flex items-center justify-end">
                  <Link to="/forgot-password" className="text-sm font-medium transition-colors auth-link">{t("login.forgotPassword")}</Link>
                </div>
                <Button type="submit" variant="primary" block size="lg" loading={isSending} label={t("otpLogin.sendCode")} />
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium auth-form-label">{t("otpLogin.code")}</label>
                  <OtpInput length={CODE_LENGTH} value={code} onChange={setCode} onComplete={setCode} variant="primary" />
                </div>
                <Button type="button" variant="primary" block size="lg" loading={isVerifying} label={t("otpLogin.verify")} onClick={onVerify} />
                <Button
                  type="button"
                  variant="secondary"
                  outline
                  block
                  loading={isSending}
                  disabled={resendIn > 0}
                  label={resendIn > 0 ? t("otpLogin.resendIn", { seconds: resendIn }) : t("otpLogin.resend")}
                  onClick={onResend}
                />
                <Button type="button" variant="secondary" outline block label={t("common.back")} onClick={() => setStep("credentials")} />
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default OtpLogin;
