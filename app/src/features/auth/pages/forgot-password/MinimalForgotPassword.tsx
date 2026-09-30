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

const MinimalForgotPassword = () => {
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
      <div className={`min-h-screen auth-page-bg`}>
        <div className="flex items-center justify-end px-6 py-5 sm:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className={`text-sm font-medium transition-colors auth-minimal-theme-btn`}
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

        <div className="flex flex-col items-center justify-center px-6 py-16 sm:px-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex justify-center">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} />
            </div>

            <div className="mb-10 text-center">
              <h1 className={`text-3xl font-bold tracking-tight auth-heading`}>
                {t("forgotPassword.title")}
              </h1>
              <p className={`mt-2 text-sm auth-subtext`}>
                {getDescription()}
              </p>
            </div>

            {step === 1 && (
              <ForgotPasswordStep1
                onSuccess={(email) => { setEmailOrUsername(email); setStep(2); }}
                onBack={() => navigate(-1)}
                buttonVariant="primary"
              />
            )}
            {step === 2 && (
              <ForgotPasswordStep2
                emailOrUsername={emailOrUsername}
                onSuccess={(token) => { setResetToken(token); setStep(3); }}
                onBack={() => setStep(1)}
                buttonVariant="primary"
              />
            )}
            {step === 3 && (
              <ForgotPasswordStep3
                emailOrUsername={emailOrUsername}
                resetToken={resetToken}
                onSuccess={() => navigate("/login/minimal")}
                buttonVariant="primary"
              />
            )}
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default MinimalForgotPassword;
