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
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import Button from "../../../../shared/components/buttons/Button";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const ImageCardTwoSideLogin = () => {
  const { t } = useTranslation();
  useTitle(t("login.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("next") ?? "/dashboard";

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  
  const [loginMutation, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: yupResolver(schemaResolver),
    mode: "onBlur",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      const result = await loginMutation(data).unwrap();
      dispatch(
        login({
          firstName: result.firstName,
          lastName: result.lastName,
          roleID: result.roleId,
          jwtToken: result.accessToken,
          refreshToken: result.refreshToken,
          profileImageUrl: result.profileImage || null,
          forcePasswordChange: result.forcePasswordChange,
        })
      );
      showSuccess(t("login.loginSuccess"));
      navigate(redirectUrl, { replace: true });
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <UnAuthLayout>
      <div className={`flex min-h-screen items-center justify-center px-4 py-8 auth-page-bg`}>
        <div className={`flex w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl auth-card-bg`}>
          <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center auth-bg-image"
            />
            <div className={`absolute inset-0 auth-image-overlay`} />
            <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
              <Logo orientation="portrait" theme="dark" height={160} />
              <h2 className="text-2xl font-bold text-white">
                {t("common.welcome")}
              </h2>
              <p className="max-w-xs text-base text-white/80">
                {t("common.appName")}
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2 flex-col p-8">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(toggleTheme())}
                  className={`rounded-lg p-2 transition-colors page-card-theme-btn`}
                >
                  {themeMode === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <LanguageSwitcher />
              </div>
            </div>

            <div className="md:hidden flex justify-center mb-4">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-6">
                <h1 className={`text-2xl font-bold auth-heading`}>
                  {t("login.title")}
                </h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormInput<LoginDto>
                  name="username"
                  control={control}
                  label={t("login.email")}
                  placeholder={t("login.emailPlaceholder")}
                  error={!!errors.username}
                  errorMessage={errors.username?.message}
                />
                <FormPasswordInput<LoginDto>
                  name="password"
                  control={control}
                  label={t("login.password")}
                  placeholder={t("login.passwordPlaceholder")}
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium auth-link transition-colors"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  block
                  size="lg"
                  loading={isLoading}
                  label={t("login.loginButton")}
                />
                <p className="text-center text-sm auth-subtext">
                  {t("register.noAccount")}{" "}
                  <Link to="/register/image-card-two-side" className="font-medium auth-link transition-colors">
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

export default ImageCardTwoSideLogin;
