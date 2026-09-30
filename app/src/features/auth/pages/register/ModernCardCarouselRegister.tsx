import { useState, useEffect, useCallback } from "react";
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
import RegisterStep1 from "../../components/RegisterStep1";
import RegisterStep2 from "../../components/RegisterStep2";
import RegisterStep3 from "../../components/RegisterStep3";
import SunIcon from "../../../../assets/icons/SunIcon";
import MoonIcon from "../../../../assets/icons/MoonIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const cardSlides = [
  { icon: "🔒", title: "Secure Access", desc: "Enterprise-grade security for your data" },
  { icon: "⚡", title: "Lightning Fast", desc: "Optimized for peak performance" },
  { icon: "🌐", title: "Global Scale", desc: "Deploy anywhere in the world" },
];

const ModernCardCarouselRegister = () => {
  const { t } = useTranslation();
  useTitle(t("register.title"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [registerToken, setRegisterToken] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => setCurrentSlide((p) => (p + 1) % cardSlides.length), []);
  useEffect(() => { const id = setInterval(nextSlide, 4000); return () => clearInterval(id); }, [nextSlide]);

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
          {/* Left carousel panel inside card */}
          <div className="hidden w-5/12 items-center justify-center lg:flex auth-modern-side-panel rounded-s-2xl">
            <div className="relative z-10 flex flex-col items-center px-8 text-center">
              <div className="mb-6 text-6xl">{cardSlides[currentSlide].icon}</div>
              <h3 className="text-xl font-bold text-white">{cardSlides[currentSlide].title}</h3>
              <p className="mt-2 text-sm text-white/80">{cardSlides[currentSlide].desc}</p>
              <div className="mt-6 flex gap-2">
                {cardSlides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"}`} />))}
              </div>
            </div>
          </div>

          {/* Right form inside card */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-7/12 lg:p-12">
            <div className="mb-8 flex flex-col items-center lg:items-start">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={200} className="mb-3" />
              <h1 className="text-2xl font-bold auth-heading">{t("register.title")}</h1>
              <p className="mt-1 text-sm auth-subtext">{getDescription()}</p>
            </div>

            {step === 1 && <RegisterStep1 onSuccess={(value) => { setEmailOrPhone(value); setStep(2); }} onBack={() => navigate(-1)} loginPath="/login/modern-card-carousel" />}
            {step === 2 && <RegisterStep2 emailOrPhone={emailOrPhone} onSuccess={(token) => { setRegisterToken(token); setStep(3); }} onBack={() => setStep(1)} />}
            {step === 3 && <RegisterStep3 emailOrPhone={emailOrPhone} registerToken={registerToken} onSuccess={handleRegistered} onBack={() => setStep(2)} />}

            <p className="mt-6 text-center text-xs auth-footer">&copy; {new Date().getFullYear()} {t("common.appName")}</p>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ModernCardCarouselRegister;
