import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import type { TvSubscriptionsEndingReportFilter } from "../types/TvSubscriptionsEndingReport.types";

interface TvSubscriptionsEndingReportFiltersProps {
  values: TvSubscriptionsEndingReportFilter;
  onChange: (name: keyof TvSubscriptionsEndingReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TvSubscriptionsEndingReportFilters = ({ values, onChange, onSearch, onClear }: TvSubscriptionsEndingReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const hasCustomersOptions = [
    { value: "true", name: t("reports.tvSubscriptionsEnding.withCustomers") },
    { value: "false", name: t("reports.tvSubscriptionsEnding.withoutCustomers") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="cityId"
          label={t("reports.tvSubscriptionsEnding.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Input
          name="tvNumber"
          label={t("reports.tvSubscriptionsEnding.tvNumber")}
          value={values.tvNumber || ""}
          onChange={(event) => onChange("tvNumber", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.tvSubscriptionsEnding.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.tvSubscriptionsEnding.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Select
          name="hasCustomers"
          label={t("reports.tvSubscriptionsEnding.linkStatus")}
          value={toSelectValue(values.hasCustomers)}
          onChange={(value) => onChange("hasCustomers", fromBooleanValue(String(value)))}
          options={hasCustomersOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.tvSubscriptionsEnding.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.tvSubscriptionsEnding.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvSubscriptionsEndingReportFilters;
