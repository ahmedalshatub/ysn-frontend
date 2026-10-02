import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import type { CityRequest } from "../types/Cities.types";

interface CityFiltersProps {
  values: CityRequest;
  onChange: (name: keyof CityRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | undefined) => (value === undefined ? "" : String(value));
const fromSelectValue = (value: string) => (value === "" ? undefined : value === "true");

const CityFilters = ({ values, onChange, onSearch, onClear }: CityFiltersProps) => {
  const { t } = useTranslation();

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          name="name"
          label={t("cities.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Select
          name="isActive"
          label={t("cities.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromSelectValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("common.status")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange("isDeleted", fromSelectValue(String(value)))}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("cities.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("cities.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CityFilters;
