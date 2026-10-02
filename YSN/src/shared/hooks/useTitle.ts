import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Sets the browser tab title to "<app name> - <page title>", with the app name
// taken from common.appName so it follows the current language.
const useTitle = (title: string) => {
  const { t, i18n } = useTranslation();
  const appName = t("common.appName");
  const fullTitle = title ? `${appName} - ${title}` : appName;

  useEffect(() => {
    document.title = fullTitle;
    return () => {
      // Fall back to the bare app name in whatever language is active now.
      document.title = i18n.t("common.appName");
    };
  }, [fullTitle, i18n]);
};

export default useTitle;
