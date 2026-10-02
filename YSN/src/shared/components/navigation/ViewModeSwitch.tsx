import { useTranslation } from "react-i18next";
import GridIcon from "../../../assets/icons/GridIcon";
import ListBulletIcon from "../../../assets/icons/ListBulletIcon";
import { ViewMode, type ViewModeType } from "../../types/ViewMode.types";

interface ViewModeSwitchProps {
  value: ViewModeType;
  onChange: (value: ViewModeType) => void;
}

const ViewModeSwitch = ({ value, onChange }: ViewModeSwitchProps) => {
  const { t } = useTranslation();
  const options = [
    { value: ViewMode.Cards, label: t("common.cardView"), icon: <GridIcon className="h-4 w-4" /> },
    { value: ViewMode.Table, label: t("common.tableView"), icon: <ListBulletIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="view-mode-switch" role="group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.label}
          aria-pressed={value === option.value}
          className={`view-mode-switch-button ${value === option.value ? "view-mode-switch-button-active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewModeSwitch;
