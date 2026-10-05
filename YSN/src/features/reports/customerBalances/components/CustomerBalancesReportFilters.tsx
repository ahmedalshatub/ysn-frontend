import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../../shared/utils/constants";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { CustomerRole, customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import type { CustomerBalancesReportFilter } from "../types/CustomerBalancesReport.types";

interface CustomerBalancesReportFiltersProps {
  values: CustomerBalancesReportFilter;
  onChange: (name: keyof CustomerBalancesReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CustomerBalancesReportFilters = ({ values, onChange, onSearch, onClear }: CustomerBalancesReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ parentAgentId: number | null }>({ defaultValues: { parentAgentId: values.parentAgentId ?? null } });

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const activeOptions = [
    { value: "true", name: t("common.active") },
    { value: "false", name: t("common.inactive") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="customerName"
          label={t("reports.customerBalances.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Input
          name="customerPhone"
          label={t("reports.customerBalances.customerPhone")}
          value={values.customerPhone || ""}
          onChange={(event) => onChange("customerPhone", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.customerBalances.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.customerBalances.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CustomerSearchSelect<{ parentAgentId: number | null }>
          name="parentAgentId"
          control={control}
          label={t("reports.customerBalances.parentAgent")}
          roleId={CustomerRole.Agent}
          onValueChange={(parentAgentId) => onChange("parentAgentId", parentAgentId || undefined)}
        />
        <Input
          name="balanceFrom"
          type="number"
          label={t("reports.customerBalances.balanceFrom")}
          value={values.balanceFrom ?? ""}
          onChange={(event) => onChange("balanceFrom", fromNumberValue(event.target.value))}
          size="md"
        />
        <Input
          name="balanceTo"
          type="number"
          label={t("reports.customerBalances.balanceTo")}
          value={values.balanceTo ?? ""}
          onChange={(event) => onChange("balanceTo", fromNumberValue(event.target.value))}
          size="md"
        />
        <Select
          name="hasBalance"
          label={t("reports.customerBalances.hasBalance")}
          value={toSelectValue(values.hasBalance)}
          onChange={(value) => onChange("hasBalance", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isActive"
          label={t("reports.customerBalances.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={activeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("reports.customerBalances.isDeleted")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange("isDeleted", fromBooleanValue(String(value)))}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.customerBalances.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.customerBalances.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CustomerBalancesReportFilters;
