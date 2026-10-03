import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import { useGetCitiesQuery } from "../../cities/api/Cities.api";
import type { TvSmsServerRequest } from "../types/TvSmsServers.types";

interface TvSmsServerFiltersProps {
  values: TvSmsServerRequest;
  onChange: (name: keyof TvSmsServerRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | undefined) => (value === undefined ? "" : String(value));
const fromSelectValue = (value: string) => (value === "" ? undefined : value === "true");

const TvSmsServerFilters = ({ values, onChange, onSearch, onClear }: TvSmsServerFiltersProps) => {
  const { t } = useTranslation();
  const { data: cities } = useGetCitiesQuery({ isDeleted: false });

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          name="name"
          label={t("tvSmsServers.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Input
          name="baseUrl"
          label={t("tvSmsServers.baseUrl")}
          value={values.baseUrl || ""}
          onChange={(event) => onChange("baseUrl", event.target.value)}
          size="md"
        />
        <Input
          name="smsUserId"
          label={t("tvSmsServers.smsUserId")}
          value={values.smsUserId || ""}
          onChange={(event) => onChange("smsUserId", event.target.value)}
          size="md"
        />
        <Select
          name="cityId"
          label={t("tvSmsServers.city")}
          value={values.cityId ?? ""}
          onChange={(value) => onChange("cityId", value === "" ? undefined : Number(value))}
          options={cities?.items ?? []}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="isActive"
          label={t("tvSmsServers.isActive")}
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
          label={t("tvSmsServers.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("tvSmsServers.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvSmsServerFilters;
