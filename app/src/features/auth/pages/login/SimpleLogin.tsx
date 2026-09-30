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
import Card from "../../../../shared/components/cards/Card";
import FormInput from "../../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../../shared/components/inputs/FormPasswordInput";
import Button from "../../../../shared/components/buttons/Button";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const SimpleLogin = () => {
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
      <div className="auth-page-bg flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(toggleTheme())}
                  className="page-theme-btn rounded-lg p-2 transition-colors"
                >
                  {themeMode === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <LanguageSwitcher buttonClass="page-lang-btn rounded-lg px-3 py-1.5 text-sm font-medium transition-colors" />
              </div>

              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} />

              <div className="w-full text-center">
                <h1 className="auth-heading text-2xl font-bold">
                  {t("login.title")}
                </h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
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
                  <Link to="/register/simple" className="font-medium auth-link transition-colors">
                    {t("register.signUp")}
                  </Link>
                </p>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default SimpleLogin;
