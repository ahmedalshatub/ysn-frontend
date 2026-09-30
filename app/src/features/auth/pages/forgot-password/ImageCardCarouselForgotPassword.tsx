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
import LanguageSwitcher from "../../../../shared/components/navigation/LanguageSwitcher";

const imageUrls = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
];

const slideKeys = [
  { title: "carousel.secureTitle", description: "carousel.secureDescription" },
  { title: "carousel.analyticsTitle", description: "carousel.analyticsDescription" },
  { title: "carousel.collaborationTitle", description: "carousel.collaborationDescription" },
];

const ImageCardCarouselForgotPassword = () => {
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
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
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
        <div className={`flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl auth-card-bg auth-card-min-h`}>
          <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-l-2xl">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out auth-carousel-slide"
                style={{
                  backgroundImage: `url('${url}')`,
                  opacity: currentSlide === index ? 1 : 0,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div>
                <Logo orientation="landscape" theme="dark" height={100} />
              </div>
              <div className="text-white">
                <div className="relative h-20">
                  {slideKeys.map((slide, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{ opacity: currentSlide === index ? 1 : 0 }}
                    >
                      <h2 className="text-2xl font-bold">{t(slide.title)}</h2>
                      <p className="mt-1 max-w-sm text-sm opacity-90">{t(slide.description)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {imageUrls.map((_, index) => (
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
                  onSuccess={() => navigate("/login/image-card-carousel")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ImageCardCarouselForgotPassword;
