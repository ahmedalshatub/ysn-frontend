import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { tvSmsApiCallKeys, tvSmsApiCallList, type TvSmsApiLogRequest } from "../../types/TvSmsApiLogs.types";

interface TvSmsApiLogFiltersProps {
  values: TvSmsApiLogRequest;
  onChange: (changes: Partial<TvSmsApiLogRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

type NumberField = "tvId" | "tvActivationId" | "providerStatusCode" | "httpStatus" | "durationMsFrom" | "durationMsTo";

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TvSmsApiLogFilters = ({ values, onChange, onSearch, onClear }: TvSmsApiLogFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const callOptions = tvSmsApiCallList.map((call) => ({ value: call, name: t(tvSmsApiCallKeys[call]) }));
  const resultOptions = [
    { value: "true", name: t("tvSmsApiLogs.succeeded") },
    { value: "false", name: t("tvSmsApiLogs.failed") },
  ];

  const numberInput = (name: NumberField, label: string) => (
    <Input
      name={name}
      type="number"
      label={label}
      value={values[name] ?? ""}
      onChange={(event) => onChange({ [name]: fromNumberValue(event.target.value) })}
      size="md"
    />
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="cityId"
          label={t("tvs.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange({ cityId: fromNumberValue(String(value)) })}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Input
          name="baseUrl"
          label={t("tvSmsApiLogs.baseUrl")}
          value={values.baseUrl || ""}
          onChange={(event) => onChange({ baseUrl: event.target.value })}
          size="md"
        />
        <Select
          name="call"
          label={t("tvSmsApiLogs.call")}
          value={toSelectValue(values.call)}
          onChange={(value) => onChange({ call: fromNumberValue(String(value)) })}
          options={callOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="succeeded"
          label={t("tvSmsApiLogs.result")}
          value={toSelectValue(values.succeeded)}
          onChange={(value) => onChange({ succeeded: fromBooleanValue(String(value)) })}
          options={resultOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {numberInput("tvId", t("tvSmsApiLogs.tvId"))}
        {numberInput("tvActivationId", t("tvSmsApiLogs.activationId"))}
        {numberInput("httpStatus", t("tvSmsApiLogs.httpStatus"))}
        {numberInput("providerStatusCode", t("tvSmsApiLogs.providerStatusCode"))}
        {numberInput("durationMsFrom", t("tvSmsApiLogs.durationFrom"))}
        {numberInput("durationMsTo", t("tvSmsApiLogs.durationTo"))}
        <DatePicker
          label={t("tvSmsApiLogs.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange({ fromDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvSmsApiLogs.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange({ toDate: date || undefined })}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvSmsApiLogFilters;
