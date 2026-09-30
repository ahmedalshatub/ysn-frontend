import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../../../core/slices/theme.slice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../app/store";
import useTitle from "../../../../shared/hooks/useTitle";
import UnAuthLayout from "../../../../core/layout/UnAuthLayout";
import Logo from "../../../../shared/components/display/Logo";
import ForgotPasswordStep1 from "../../components/ForgotPasswordStep1";
import ForgotPasswordStep2 from "../../components/ForgotPasswordStep2";
import ForgotPasswordStep3 from "../../components/ForgotPasswordStep3";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const FullPageForgotPassword = () => {
  const { t } = useTranslation();
  useTitle(t("forgotPassword.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [resetToken, setResetToken] = useState("");


  const getDescription = () => {
    if (step === 1) return t("forgotPassword.description");
    if (step === 2) return t("forgotPassword.otpDescription");
    return t("forgotPassword.resetDescription");
  };

  return (
    <UnAuthLayout>
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden auth-card-side-bg">
          <div className="absolute inset-0 opacity-10 auth-pattern-overlay" />

          <div className="absolute top-8 start-8 z-10">
            <Logo orientation="landscape" theme="dark" height={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
            <Logo orientation="portrait" theme="dark" height={224} />
            <h2 className="text-3xl font-bold text-white">
              {t("common.welcome")}
            </h2>
            <p className="max-w-sm text-lg text-white/80">
              {t("common.appName")}
            </p>
          </div>
        </div>

        <div className={`flex w-full lg:w-1/2 flex-col auth-page-bg`}>
          <div className="flex items-center justify-end px-6 py-4 lg:px-8">
            <div className="flex items-center gap-2">
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
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-8 lg:px-8">
            <div className="w-full max-w-md">
              <div className="lg:hidden flex justify-center mb-6">
                <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
              </div>

              <div className="mb-10">
                <h1 className={`text-3xl font-bold mb-2 auth-heading`}>
                  {t("forgotPassword.title")}
                </h1>
                <p className={`text-sm auth-subtext`}>
                  {getDescription()}
                </p>
              </div>

              {step === 1 && (
                <ForgotPasswordStep1
                  size="lg"
                  onSuccess={(email) => { setEmailOrUsername(email); setStep(2); }}
                  onBack={() => navigate(-1)}
                />
              )}
              {step === 2 && (
                <ForgotPasswordStep2
                  size="lg"
                  emailOrUsername={emailOrUsername}
                  onSuccess={(token) => { setResetToken(token); setStep(3); }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <ForgotPasswordStep3
                  size="lg"
                  emailOrUsername={emailOrUsername}
                  resetToken={resetToken}
                  onSuccess={() => navigate("/login/full-page")}
                />
              )}
            </div>
          </div>

          <div className={`px-6 py-4 text-center text-xs auth-footer`}>
            &copy; {new Date().getFullYear()} {t("common.appName")}
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default FullPageForgotPassword;
