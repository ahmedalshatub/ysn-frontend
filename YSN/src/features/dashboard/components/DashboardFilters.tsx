import { useTranslation } from "react-i18next";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { DashboardPeriod, type DashboardFilterValues, type DashboardPeriodValue } from "../types/Dashboard.types";

interface DashboardFiltersProps {
  values: DashboardFilterValues;
  onChange: (values: DashboardFilterValues) => void;
}

const DashboardFilters = ({ values, onChange }: DashboardFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const periods = Object.values(DashboardPeriod).map((value) => ({ value, name: t(`dashboard.periods.${value}`) }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Select
        name="period"
        label={t("dashboard.period")}
        value={values.period}
        onChange={(value) => onChange({ ...values, period: value as DashboardPeriodValue })}
        options={periods}
        valueKey="value"
        labelKey="name"
        size="md"
      />
      {values.period === DashboardPeriod.Custom && (
        <>
          <DatePicker label={t("dashboard.fromDate")} value={values.fromDate || ""} onChange={(date) => onChange({ ...values, fromDate: date || undefined })} size="md" />
          <DatePicker label={t("dashboard.toDate")} value={values.toDate || ""} onChange={(date) => onChange({ ...values, toDate: date || undefined })} size="md" />
        </>
      )}
      {cities.length > 1 && (
        <Select
          name="cityId"
          label={t("dashboard.city")}
          value={values.cityId ?? ""}
          onChange={(value) => onChange({ ...values, cityId: value === "" ? undefined : Number(value) })}
          options={cities}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
      )}
    </div>
  );
};

export default DashboardFilters;
