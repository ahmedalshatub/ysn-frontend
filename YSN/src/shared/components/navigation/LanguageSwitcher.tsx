import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import { LANGUAGES, getLanguage } from "../../../core/i18n/languages";

interface LanguageSwitcherProps {
  buttonClass?: string;
  labelClass?: string;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  showIcon?: boolean;
}

// A dropdown rather than a toggle: with three or more languages a toggle makes
// the user click through the ones they do not want. The list comes from
// LANGUAGES, so adding a language needs no change here.
const LanguageSwitcher = ({
  buttonClass = "",
  labelClass = "",
  placement = "bottom-end",
  showIcon = true,
}: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const current = getLanguage(i18n.language);

  const items = LANGUAGES.map((language) => ({
    key: language.code,
    label: language.nativeName,
    active: language.code === current.code,
  }));

  return (
    <Dropdown
      items={items}
      placement={placement}
      onSelect={(code) => {
        if (code !== i18n.language) i18n.changeLanguage(code);
      }}
      trigger={
        <button
          type="button"
          className={buttonClass}
          aria-label={t("navbar.changeLanguage")}
          title={current.nativeName}
        >
          {showIcon && <GlobeIcon className="w-4 h-4" />}
          <span className={labelClass}>{current.label}</span>
        </button>
      }
    />
  );
};

export default LanguageSwitcher;
