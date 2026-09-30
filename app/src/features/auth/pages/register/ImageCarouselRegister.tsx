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

const ImageCarouselRegister = () => {
  const { t } = useTranslation();
  useTitle(t("register.title"));

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [registerToken, setRegisterToken] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

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
      <div className="flex min-h-screen">
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
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
          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <div>
              <Logo orientation="landscape" theme="dark" height={120} />
            </div>
            <div className="text-white">
              <div className="relative h-24">
                {slideKeys.map((slide, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{ opacity: currentSlide === index ? 1 : 0 }}
                  >
                    <h2 className="text-3xl font-bold">{t(slide.title)}</h2>
                    <p className="mt-2 max-w-md text-base opacity-90">{t(slide.description)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
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

        <div className={`flex w-full lg:w-1/2 items-center justify-center px-6 py-8 auth-page-bg`}>
          <div className="w-full max-w-md">
            <div className="flex items-center justify-end mb-4">
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

            <div className="lg:hidden flex justify-center mb-6">
              <Logo orientation="landscape" theme={themeMode === "dark" ? "dark" : "light"} height={120} />
            </div>

            <div className="mb-8">
              <h1 className={`text-3xl font-bold auth-heading`}>
                {t("register.title")}
              </h1>
              <p className={`mt-2 text-sm auth-subtext`}>
                {getDescription()}
              </p>
            </div>

            {step === 1 && (
              <RegisterStep1
                onSuccess={(value) => { setEmailOrPhone(value); setStep(2); }}
                onBack={() => navigate(-1)}
                loginPath="/login/image-carousel"
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
        </div>
      </div>
    </UnAuthLayout>
  );
};

export default ImageCarouselRegister;
