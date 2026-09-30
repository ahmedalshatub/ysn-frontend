import { useState, useEffect, useCallback } from "react";
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
import ShieldCheckIcon from "../../../../assets/icons/ShieldCheckIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const cardSlides = [
  {
    icon: (
<ShieldCheckIcon className="h-12 w-12" />
    ),
    titleKey: "carousel.secureTitle",
    descKey: "carousel.secureDescription",
  },
  {
    icon: (
<ZapIcon className="h-12 w-12" />
    ),
    titleKey: "carousel.performanceTitle",
    descKey: "carousel.performanceDescription",
  },
  {
    icon: (
<UsersIcon className="h-12 w-12" />
    ),
    titleKey: "carousel.collaborationTitle",
    descKey: "carousel.collaborationDescription",
  },
];

const CardCarouselForgotPassword = () => {
  const { t } = useTranslation();
  useTitle(t("forgotPassword.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % cardSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);


  const getDescription = () => {
    if (step === 1) return t("forgotPassword.description");
    if (step === 2) return t("forgotPassword.otpDescription");
    return t("forgotPassword.resetDescription");
  };

  return (
    <UnAuthLayout>
      <div className={`flex min-h-screen items-center justify-center px-4 py-8 auth-page-bg`}>
        <div className={`flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl auth-card-bg auth-card-min-h-lg`}>
          <div className={`hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 auth-card-side-bg`}>
            <div className="mb-8 flex justify-center">
              <Logo orientation="portrait" theme="dark" height={200} />
            </div>

            <div className="relative w-full text-center text-white auth-carousel-text-area">
              {cardSlides.map((slide, index) => (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: currentSlide === index ? 1 : 0 }}
                >
                  <div className="opacity-80">{slide.icon}</div>
                  <h3 className="text-xl font-bold">{t(slide.titleKey)}</h3>
                  <p className="max-w-xs text-sm opacity-80">{t(slide.descKey)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              {cardSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 auth-dot-active" : "w-2 auth-dot-inactive"
                  }`}
                />
              ))}
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
                  {t("forgotPassword.title")}
                </h1>
                <p className={`mt-1 text-sm auth-subtext`}>
                  {getDescription()}
                </p>
              </div>

              {step === 1 && (
                <ForgotPasswordStep1
                  onSuccess={(email) => { setEmailOrUsername(email); setStep(2); }}
                  onBack={() => navigate(-1)}
                />
              )}
              {step === 2 && (
                <ForgotPasswordStep2
                  emailOrUsername={emailOrUsername}
                  onSuccess={(token) => { setResetToken(token); setStep(3); }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <ForgotPasswordStep3
                  emailOrUsername={emailOrUsername}
                  resetToken={resetToken}
                  onSuccess={() => navigate("/login/card-carousel")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default CardCarouselForgotPassword;
