import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import HomeIcon from "../../../assets/icons/HomeIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";

const NotAuthorized = () => {
  const { t } = useTranslation();
  useTitle(t("exceptions.notAuthorized.title"));

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="error-icon mb-6">
        <ShieldIcon className="mx-auto h-24 w-24" />
      </div>
      <h1 className="error-code text-7xl font-extrabold tracking-tight">403</h1>
      <h2 className="error-title mt-4 text-2xl font-bold">{t("exceptions.notAuthorized.title")}</h2>
      <p className="error-message mt-3 max-w-md text-base">{t("exceptions.notAuthorized.description")}</p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to="/dashboard"
          className="error-primary-btn inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold shadow-sm transition-colors"
        >
          <HomeIcon className="h-4 w-4" />
          {t("exceptions.notFound.goHome")}
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="error-secondary-btn inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors"
        >
          <Undo2Icon className="h-4 w-4" />
          {t("exceptions.notFound.goBack")}
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
