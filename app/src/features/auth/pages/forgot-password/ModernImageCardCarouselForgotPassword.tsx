import { useState, useEffect, useCallback } from "react";
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

const imageUrls = [
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
];
const slideKeys = ["slide-a", "slide-b", "slide-c"];

const ModernImageCardCarouselForgotPassword = () => {
  const { t } = useTranslation();
  useTitle(t("forgotPassword.title"));
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % imageUrls.length), []);
  useEffect(() => { const id = setInterval(nextSlide, 5000); return () => clearInterval(id); }, [nextSlide]);

  const getDescription = () => {
    if (step === 1) return t("forgotPassword.step1Description");
    if (step === 2) return t("forgotPassword.step2Description");
    return t("forgotPassword.step3Description");
  };

  return (
    <UnAuthLayout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden auth-modern-bg">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-1" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full blur-3xl auth-modern-blob-2" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl auth-modern-blob-3" />

        <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
          <button type="button" onClick={() => dispatch(toggleTheme())} className="rounded-full p-2.5 transition-colors backdrop-blur-sm auth-modern-theme-btn">
            {themeMode === "dark" ? (<SunIcon className="h-5 w-5" />) : (<MoonIcon className="h-5 w-5" />)}
          </button>
          <LanguageSwitcher buttonClass="rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm auth-modern-lang-btn" />
        </div>

        <div className="relative z-10 flex w-full max-w-4xl overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl auth-modern-card">
          {/* Left image carousel inside card */}
          <div className="relative hidden w-5/12 overflow-hidden lg:block rounded-s-2xl">
            {imageUrls.map((url, i) => (
              <div key={slideKeys[i]} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
                <img src={url} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            ))}
            <div className="absolute bottom-6 start-0 end-0 z-10 flex justify-center gap-2">
              {imageUrls.map((_, i) => (<button key={slideKeys[i]} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"}`} />))}
            </div>
          </div>

          {/* Right form inside card */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-7/12 lg:p-12">
            <div className="mb-8 flex flex-col items-center lg:items-start">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3" />
              <h1 className="text-2xl font-bold auth-heading">{t("forgotPassword.title")}</h1>
              <p className="mt-1 text-sm auth-subtext">{getDescription()}</p>
            </div>

            {step === 1 && <ForgotPasswordStep1 onSuccess={(email) => { setEmailOrUsername(email); setStep(2); }} onBack={() => window.history.back()} />}
            {step === 2 && <ForgotPasswordStep2 emailOrUsername={emailOrUsername} onSuccess={(token) => { setResetToken(token); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <ForgotPasswordStep3 emailOrUsername={emailOrUsername} resetToken={resetToken} onSuccess={() => { window.location.href = "/login/modern-image-card-carousel"; }} />}

            <p className="mt-6 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernImageCardCarouselForgotPassword;
