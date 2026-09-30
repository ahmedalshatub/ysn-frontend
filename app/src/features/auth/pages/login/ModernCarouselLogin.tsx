import { useEffect } from "react";
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
import Carousel from "../../../../shared/components/media/Carousel";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import Button from "../../../../shared/components/buttons/Button";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import ShieldCheckIcon from "../../../../assets/icons/ShieldCheckIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import Users2Icon from "../../../../assets/icons/Users2Icon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const ModernCarouselLogin = () => {
  const { t } = useTranslation();
  useTitle(t("login.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("next") ?? "/dashboard";

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [loginMutation, { isLoading }] = useLoginMutation();

  const slides = [
    {
      id: 1,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <ShieldCheckIcon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("carousel.secureTitle")}</h3>
          <p className="max-w-sm text-sm opacity-80">{t("carousel.secureDescription")}</p>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <ZapIcon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("carousel.performanceTitle")}</h3>
          <p className="max-w-sm text-sm opacity-80">{t("carousel.performanceDescription")}</p>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <Users2Icon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("carousel.collaborationTitle")}</h3>
          <p className="max-w-sm text-sm opacity-80">{t("carousel.collaborationDescription")}</p>
        </div>
      ),
    },
  ];

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
      <div className="relative flex min-h-screen overflow-hidden auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        {/* Left carousel panel */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10">
          <div className="absolute inset-0 backdrop-blur-sm auth-modern-side-panel" />
          <div className="relative z-10 w-full max-w-lg px-8">
            <div className="mb-8 flex justify-center">
              <Logo orientation="portrait" theme="dark" height={224} />
            </div>
            <Carousel slides={slides} variant="minimal" animation="fade" autoPlay autoPlayInterval={5000} showArrows={false} indicator="dots" height="h-72" loop />
          </div>
        </div>

        {/* Right form side */}
        <div className="relative z-10 flex w-full lg:w-1/2 items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
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

            <div className="lg:hidden flex justify-center mb-6">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold auth-heading">{t("login.title")}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <FormInput<LoginDto> name="username" control={control} label={t("login.email")} placeholder={t("login.emailPlaceholder")} error={!!errors.username} errorMessage={errors.username?.message} />
              <FormPasswordInput<LoginDto> name="password" control={control} label={t("login.password")} placeholder={t("login.passwordPlaceholder")} error={!!errors.password} errorMessage={errors.password?.message} />
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm font-medium auth-link transition-colors">{t("login.forgotPassword")}</Link>
              </div>
              <Button type="submit" variant="primary" block size="lg" loading={isLoading} label={t("login.loginButton")} />
              <p className="text-center text-sm auth-subtext">
                {t("register.noAccount")}{" "}
                <Link to="/register/modern-carousel" className="font-medium auth-link transition-colors">
                  {t("register.signUp")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernCarouselLogin;
