import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginDto } from "../../types/Auth.types";
import { login } from "../../slices/Auth.slice";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { useLoginMutation } from "../../api/Auth.api";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";
import useTitle from "../../../../shared/hooks/useTitle";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import Button from "../../../../shared/components/buttons/Button";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const imageUrls = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
];

const slideKeys = [
  { title: "carousel.secureTitle", description: "carousel.secureDescription" },
  { title: "carousel.analyticsTitle", description: "carousel.analyticsDescription" },
  { title: "carousel.collaborationTitle", description: "carousel.collaborationDescription" },
];

const ModernImageCardCarouselLogin = () => {
  const { t } = useTranslation();
  useTitle(t("login.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("next") ?? "/dashboard";

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [loginMutation, { isLoading }] = useLoginMutation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  const schemaResolver = yup.object().shape({
    username: yup.string().required(t("login.emailRequired")),
    password: yup
      .string()
      .required(t("login.passwordRequired"))
      .min(6, t("login.passwordMin6"))
      .matches(/[A-Z]/, t("login.passwordMustContainUppercase"))
      .matches(/[a-z]/, t("login.passwordMustContainLowercase"))
      .matches(/[0-9]/, t("login.passwordMustContainDigit"))
      .matches(/[^A-Za-z0-9]/, t("login.passwordMustContainSpecialCharacter")),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<LoginDto>({
    resolver: yupResolver(schemaResolver),
    mode: "onBlur",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      const result = await loginMutation(data).unwrap();
      dispatch(login({ firstName: result.firstName, lastName: result.lastName, roleID: result.roleId, jwtToken: result.accessToken, refreshToken: result.refreshToken, profileImageUrl: result.profileImage || null, forcePasswordChange: result.forcePasswordChange }));
      showSuccess(t("login.loginSuccess"));
      navigate(redirectUrl, { replace: true });
    } catch (error: any) { showError(getErrorMessage(error)); }
  };

  return (
    <UnAuthLayout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl auth-modern-card auth-card-min-h">
          {/* Left image slideshow panel */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-l-2xl">
            {imageUrls.map((url, index) => (
              <div key={index} className="absolute inset-0 transition-opacity duration-1000 ease-in-out auth-carousel-slide" style={{ backgroundImage: `url('${url}')`, opacity: currentSlide === index ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div>
                <Logo orientation="landscape" theme="dark" height={100} />
              </div>
              <div className="text-white">
                <div className="relative h-20">
                  {slideKeys.map((slide, index) => (
                    <div key={index} className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ opacity: currentSlide === index ? 1 : 0 }}>
                      <h2 className="text-2xl font-bold">{t(slide.title)}</h2>
                      <p className="mt-1 max-w-sm text-sm opacity-90">{t(slide.description)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {imageUrls.map((_, index) => (
                    <button key={index} type="button" onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 auth-dot-active" : "w-2 auth-dot-inactive"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right form side */}
          <div className="flex w-full md:w-1/2 flex-col p-8">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => dispatch(toggleTheme())} className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn">
                  {themeMode === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
              </div>
            </div>

            <div className="md:hidden flex justify-center mb-4">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-2xl font-bold auth-heading">{t("login.title")}</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormInput<LoginDto> name="username" control={control} label={t("login.email")} placeholder={t("login.emailPlaceholder")} error={!!errors.username} errorMessage={errors.username?.message} />
                <FormPasswordInput<LoginDto> name="password" control={control} label={t("login.password")} placeholder={t("login.passwordPlaceholder")} error={!!errors.password} errorMessage={errors.password?.message} />
                <div className="flex items-center justify-end">
                  <Link to="/forgot-password" className="text-sm font-medium auth-link transition-colors">{t("login.forgotPassword")}</Link>
                </div>
                <Button type="submit" variant="primary" block size="lg" loading={isLoading} label={t("login.loginButton")} />
                <p className="text-center text-sm auth-subtext">
                  {t("register.noAccount")}{" "}
                  <Link to="/register/modern-image-card-carousel" className="font-medium auth-link transition-colors">
                    {t("register.signUp")}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernImageCardCarouselLogin;
