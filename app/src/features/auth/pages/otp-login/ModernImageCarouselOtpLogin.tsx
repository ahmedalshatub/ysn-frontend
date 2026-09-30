import { useEffect, useState, useCallback } from "react";
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
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import OtpInput from "../../../../shared/components/inputs/OtpInput";
import Button from "../../../../shared/components/buttons/Button";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const imageUrls = [
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
];
const slideKeys = ["slide-a", "slide-b", "slide-c"];

const ModernImageCarouselOtpLogin = () => {
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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => { if (isLoggedIn) navigate("/dashboard", { replace: true }); }, [isLoggedIn, navigate]);
  useEffect(() => {
    if (step !== "otp") return;
    if (timeLeft <= 0) { showError(t("otpLogin.otpExpired")); setStep("credentials"); return; }
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, timeLeft, t]);

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % imageUrls.length), []);
  useEffect(() => { const id = setInterval(nextSlide, 5000); return () => clearInterval(id); }, [nextSlide]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const schema = yup.object().shape({ username: yup.string().required(t("login.emailRequired")), password: yup.string().required(t("login.passwordRequired")) });
  const { control, handleSubmit, formState: { errors } } = useForm<OtpLoginRequestDto>({ resolver: yupResolver(schema), mode: "onBlur", defaultValues: { username: "", password: "" } });

  const onSubmitCredentials = async (data: OtpLoginRequestDto) => {
    try { await otpLoginRequest(data).unwrap(); showSuccess(t("otpLogin.otpSent")); setUsername(data.username); setOtpCode(""); setTimeLeft(120); setStep("otp"); } catch (error: any) { showError(getErrorMessage(error)); }
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
      <div className="relative flex min-h-screen overflow-hidden auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
          <button type="button" onClick={() => dispatch(toggleTheme())} className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn">
            {themeMode === "dark" ? (<SunIcon className="h-5 w-5" />) : (<MoonIcon className="h-5 w-5" />)}
          </button>
          <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
        </div>

        {/* Left image carousel panel */}
        <div className="relative hidden w-1/2 overflow-hidden lg:block">
          {imageUrls.map((url, i) => (
            <div key={slideKeys[i]} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
              <img src={url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-8 start-0 end-0 z-10 flex justify-center gap-2">
            {imageUrls.map((_, i) => (<button key={slideKeys[i]} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"}`} />))}
          </div>
        </div>

        {/* Right form */}
        <div className="relative z-10 flex w-full items-center justify-center px-4 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-col items-center lg:items-start">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3 lg:hidden" />
              <h1 className="text-2xl font-bold auth-heading">{t("otpLogin.title")}</h1>
              <p className="mt-1 text-sm auth-subtext">{step === "credentials" ? t("otpLogin.description") : t("otpLogin.otpDescription")}</p>
            </div>

            {step === "credentials" ? (
              <form onSubmit={handleSubmit(onSubmitCredentials)} className="flex flex-col gap-4">
                <FormInput<OtpLoginRequestDto> name="username" control={control} label={t("login.email")} placeholder={t("login.emailPlaceholder")} error={!!errors.username} errorMessage={errors.username?.message} />
                <FormPasswordInput<OtpLoginRequestDto> name="password" control={control} label={t("login.password")} placeholder={t("login.passwordPlaceholder")} error={!!errors.password} errorMessage={errors.password?.message} />
                <div className="flex items-center justify-end"><Link to="/forgot-password" className="text-sm font-medium transition-colors auth-link">{t("login.forgotPassword")}</Link></div>
                <Button type="submit" variant="primary" block loading={isSending} label={t("otpLogin.sendOtp")} />
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <p className={`text-center text-sm font-medium ${timeLeft < 30 ? "auth-timer-warning" : "auth-timer-text"}`}>{t("otpLogin.timeRemaining")}: {formatTime(timeLeft)}</p>
                <div><label className="mb-1.5 block text-sm font-medium auth-form-label">{t("otpLogin.otpCode")}</label><OtpInput length={8} value={otpCode} onChange={setOtpCode} onComplete={setOtpCode} variant="primary" /></div>
                <Button type="button" variant="primary" block loading={isVerifying} label={t("otpLogin.verifyOtp")} onClick={onSubmitOtp} />
                <Button type="button" variant="secondary" outline block label={t("common.back")} onClick={() => setStep("credentials")} />
              </div>
            )}

            <p className="mt-8 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernImageCarouselOtpLogin;
