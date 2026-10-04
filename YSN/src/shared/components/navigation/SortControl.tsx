import { useTranslation } from "react-i18next";
import Select from "../inputs/Select";
import SortAscIcon from "../../../assets/icons/SortAscIcon";
import SortDescIcon from "../../../assets/icons/SortDescIcon";

interface SortOption {
  value: string;
  label: string;
}

interface SortControlProps {
  options: SortOption[];
  sortBy: string;
  isAscending: boolean;
  onChange: (sortBy: string, isAscending: boolean) => void;
}

const SortControl = ({ options, sortBy, isAscending, onChange }: SortControlProps) => {
  const { t } = useTranslation();
  const current = options.some((option) => option.value.toLowerCase() === sortBy.toLowerCase())
    ? options.find((option) => option.value.toLowerCase() === sortBy.toLowerCase())!.value
    : "";

  return (
    <div className="flex items-center gap-1">
      <div className="w-44">
        <Select
          name="sortBy"
          value={current}
          onChange={(value) => onChange(String(value), isAscending)}
          options={options}
          valueKey="value"
          labelKey="label"
          placeholder={t("common.sortBy")}
          size="sm"
        />
      </div>
      <button
        type="button"
        className="sort-control-direction"
        title={isAscending ? t("common.ascending") : t("common.descending")}
        aria-label={isAscending ? t("common.ascending") : t("common.descending")}
        onClick={() => onChange(sortBy, !isAscending)}
      >
        {isAscending ? <SortAscIcon className="h-4 w-4" /> : <SortDescIcon className="h-4 w-4" />}
      </button>
    </div>
  );
};

export type { SortOption };
export default SortControl;
