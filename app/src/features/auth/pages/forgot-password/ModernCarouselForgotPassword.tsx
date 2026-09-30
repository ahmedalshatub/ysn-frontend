import { useState } from "react";
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
import ShieldCheckIcon from "../../../../assets/icons/ShieldCheckIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import Users2Icon from "../../../../assets/icons/Users2Icon";
import Carousel from "../../../../shared/components/media/Carousel";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const ModernCarouselForgotPassword = () => {
  const { t } = useTranslation();
  useTitle(t("forgotPassword.title"));
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [resetToken, setResetToken] = useState("");

  const getDescription = () => {
    if (step === 1) return t("forgotPassword.step1Description");
    if (step === 2) return t("forgotPassword.step2Description");
    return t("forgotPassword.step3Description");
  };

  const carouselSlides = [
    {
      id: 1,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <ShieldCheckIcon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("login.welcomeDescription")}</h3>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <ZapIcon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("common.appName")}</h3>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center text-white">
          <Users2Icon className="h-16 w-16 opacity-80" strokeWidth={1.5} />
          <h3 className="text-2xl font-bold">{t("login.welcomeDescription")}</h3>
        </div>
      ),
    },
  ];

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

        {/* Left carousel panel */}
        <div className="relative hidden w-1/2 items-center justify-center lg:flex auth-modern-side-panel">
          <div className="relative z-10 w-full max-w-lg px-8">
            <Carousel slides={carouselSlides} autoPlay autoPlayInterval={5000} indicator="dots" showArrows={false} className="rounded-xl overflow-hidden" />
          </div>
        </div>

        {/* Right form */}
        <div className="relative z-10 flex w-full items-center justify-center px-4 lg:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-col items-center lg:items-start">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3 lg:hidden" />
              <h1 className="text-2xl font-bold auth-heading">{t("forgotPassword.title")}</h1>
              <p className="mt-1 text-sm auth-subtext">{getDescription()}</p>
            </div>

            {step === 1 && <ForgotPasswordStep1 onSuccess={(email) => { setEmailOrUsername(email); setStep(2); }} onBack={() => window.history.back()} />}
            {step === 2 && <ForgotPasswordStep2 emailOrUsername={emailOrUsername} onSuccess={(token) => { setResetToken(token); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <ForgotPasswordStep3 emailOrUsername={emailOrUsername} resetToken={resetToken} onSuccess={() => { window.location.href = "/login/modern-carousel"; }} />}

            <p className="mt-8 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernCarouselForgotPassword;
