import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../../core/slices/theme.slice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import useTitle from "../../../shared/hooks/useTitle";
import SunIcon from "../../../assets/icons/SunIcon";
import MoonIcon from "../../../assets/icons/MoonIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import LanguageSwitcher from "../../../shared/components/navigation/LanguageSwitcher";

const ServerError = () => {
  const { t } = useTranslation();
  useTitle(t("exceptions.serverError.title"));

  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector((state: RootState) => state.theme.mode);


  return (
    <div className="error-page flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-end px-6 py-4">
        <div className="flex items-center gap-2">
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
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Illustration */}
        <div className="error-icon mb-8">
          <svg className="mx-auto h-48 w-48 sm:h-64 sm:w-64" fill="none" viewBox="0 0 200 200" stroke="currentColor" strokeWidth={1}>
            {/* Server box */}
            <rect x="50" y="30" width="100" height="140" rx="8" strokeWidth="4" className="error-svg-stroke" />
            {/* Server slots */}
            <rect x="65" y="50" width="70" height="12" rx="3" strokeWidth="2" className="error-svg-stroke" />
            <rect x="65" y="75" width="70" height="12" rx="3" strokeWidth="2" className="error-svg-stroke" />
            <rect x="65" y="100" width="70" height="12" rx="3" strokeWidth="2" className="error-svg-stroke" />
            {/* Status lights */}
            <circle cx="125" cy="56" r="3" className="error-svg-warning-fill" />
            <circle cx="125" cy="81" r="3" className="error-svg-warning-fill" />
            <circle cx="125" cy="106" r="3" className="error-svg-warning-fill" />
            {/* Warning triangle */}
            <path d="M87 130l13-22 13 22H87z" strokeWidth="3" strokeLinejoin="round" className="error-svg-warning-stroke" />
            <line x1="100" y1="134" x2="100" y2="140" strokeWidth="3" strokeLinecap="round" className="error-svg-warning-stroke" />
            <circle cx="100" cy="145" r="1.5" className="error-svg-warning-fill" />
            {/* Sparks */}
            <line x1="35" y1="60" x2="25" y2="50" strokeWidth="2" strokeLinecap="round" className="error-svg-spark-stroke" />
            <line x1="35" y1="70" x2="20" y2="70" strokeWidth="2" strokeLinecap="round" className="error-svg-spark-stroke" />
            <line x1="165" y1="60" x2="175" y2="50" strokeWidth="2" strokeLinecap="round" className="error-svg-spark-stroke" />
            <line x1="165" y1="70" x2="180" y2="70" strokeWidth="2" strokeLinecap="round" className="error-svg-spark-stroke" />
          </svg>
        </div>

        {/* Error code */}
        <h1 className="error-code text-8xl font-extrabold tracking-tight sm:text-9xl">
          500
        </h1>

        {/* Title */}
        <h2 className="error-title mt-4 text-2xl font-bold sm:text-3xl">
          {t("exceptions.serverError.title")}
        </h2>

        {/* Description */}
        <p className="error-message mt-3 max-w-md text-base">
          {t("exceptions.serverError.description")}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="error-danger-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            {t("exceptions.serverError.tryAgain")}
          </button>
          <Link
            to="/"
            className="error-secondary-btn inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <HomeIcon className="h-4 w-4" />
            {t("exceptions.serverError.goHome")}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer px-6 py-4 text-center text-xs">
        &copy; {new Date().getFullYear()} {t("common.appName")}
      </div>
    </div>
  );
};

export default ServerError;
