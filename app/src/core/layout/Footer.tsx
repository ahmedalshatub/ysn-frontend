import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} {t("common.appName")}
      </p>
    </footer>
  );
};

export default Footer;
