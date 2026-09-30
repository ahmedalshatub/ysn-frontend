import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { login } from "../../slices/Auth.slice";
import type { LoginResponseDto } from "../../types/Auth.types";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";
import useTitle from "../../../../shared/hooks/useTitle";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import Card from "../../../../shared/components/cards/Card";
import RegisterStep1 from "../../components/RegisterStep1";
import RegisterStep2 from "../../components/RegisterStep2";
import RegisterStep3 from "../../components/RegisterStep3";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const SimpleRegister = () => {
  const { t } = useTranslation();
  useTitle(t("register.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [registerToken, setRegisterToken] = useState("");

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // complete-registration returns the same payload as login, so the new user is
  // signed in straight away rather than being sent back to the login screen.
  const handleRegistered = (result: LoginResponseDto) => {
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
    navigate("/dashboard", { replace: true });
  };


  const getDescription = () => {
    if (step === 1) return t("register.description");
    if (step === 2) return t("register.otpDescription");
    return t("register.profileDescription");
  };

  return (
    <UnAuthLayout>
      <div className={`flex min-h-screen items-center justify-center px-4 py-8 auth-page-bg`}>
        <div className="w-full max-w-md">
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(toggleTheme())}
                  className={`rounded-lg p-2 transition-colors page-theme-btn`}
                >
                  {themeMode === "dark" ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <LanguageSwitcher />
              </div>

              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} />

              <div className="w-full text-center">
                <h1 className={`text-2xl font-bold auth-heading`}>
                  {t("register.title")}
                </h1>
                <p className={`mt-1 text-sm auth-subtext`}>
                  {getDescription()}
                </p>
              </div>

              {step === 1 && (
                <RegisterStep1
                  onSuccess={(value) => { setEmailOrPhone(value); setStep(2); }}
                  onBack={() => navigate(-1)}
                  loginPath="/login/simple"
                />
              )}
              {step === 2 && (
                <RegisterStep2
                  emailOrPhone={emailOrPhone}
                  onSuccess={(token) => { setRegisterToken(token); setStep(3); }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <RegisterStep3
                  emailOrPhone={emailOrPhone}
                  registerToken={registerToken}
                  onSuccess={handleRegistered}
                  onBack={() => setStep(2)}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default SimpleRegister;
