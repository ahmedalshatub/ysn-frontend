import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toggleTheme } from "../../../core/slices/theme.slice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import useTitle from "../../../shared/hooks/useTitle";
import SunIcon from "../../../assets/icons/SunIcon";
import MoonIcon from "../../../assets/icons/MoonIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LanguageSwitcher from "../../../shared/components/navigation/LanguageSwitcher";

const NotFound = () => {
  const { t } = useTranslation();
  useTitle(t("exceptions.notFound.title"));

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
            {/* Magnifying glass */}
            <circle cx="85" cy="85" r="40" strokeWidth="6" className="error-svg-stroke" />
            <line x1="113" y1="113" x2="155" y2="155" strokeWidth="8" strokeLinecap="round" className="error-svg-stroke" />
            {/* Question mark inside */}
            <path d="M76 75c0-6 4-11 9-11s9 5 9 11c0 4-3 7-6 9-2 1-3 3-3 5" strokeWidth="4" strokeLinecap="round" className="error-svg-accent-stroke" fill="none" />
            <circle cx="85" cy="97" r="2" className="error-svg-accent-fill" />
            {/* Floating dots */}
            <circle cx="30" cy="45" r="3" className="error-svg-fill" />
            <circle cx="170" cy="35" r="4" className="error-svg-fill" />
            <circle cx="160" cy="170" r="3" className="error-svg-fill" />
            <circle cx="25" cy="160" r="5" className="error-svg-fill" />
          </svg>
        </div>

        {/* Error code */}
        <h1 className="error-code text-8xl font-extrabold tracking-tight sm:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="error-title mt-4 text-2xl font-bold sm:text-3xl">
          {t("exceptions.notFound.title")}
        </h2>

        {/* Description */}
        <p className="error-message mt-3 max-w-md text-base">
          {t("exceptions.notFound.description")}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="error-primary-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <HomeIcon className="h-4 w-4" />
            {t("exceptions.notFound.goHome")}
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="error-secondary-btn inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <Undo2Icon className="h-4 w-4" />
            {t("exceptions.notFound.goBack")}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer px-6 py-4 text-center text-xs">
        &copy; {new Date().getFullYear()} {t("common.appName")}
      </div>
    </div>
  );
};

export default NotFound;
