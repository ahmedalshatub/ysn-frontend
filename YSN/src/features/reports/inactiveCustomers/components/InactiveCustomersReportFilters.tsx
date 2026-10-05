import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getYesNoFilterOptions } from "../../../../shared/utils/constants";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { CustomerRole, customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import type { InactiveCustomersReportFilter } from "../types/InactiveCustomersReport.types";

interface InactiveCustomersReportFiltersProps {
  values: InactiveCustomersReportFilter;
  onChange: (name: keyof InactiveCustomersReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const InactiveCustomersReportFilters = ({ values, onChange, onSearch, onClear }: InactiveCustomersReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ parentAgentId: number | null }>({ defaultValues: { parentAgentId: values.parentAgentId ?? null } });

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const activeOptions = [
    { value: "true", name: t("common.active") },
    { value: "false", name: t("common.inactive") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="customerName"
          label={t("reports.inactiveCustomers.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.inactiveCustomers.customerRole")}
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
          label={t("reports.inactiveCustomers.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cities}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CustomerSearchSelect<{ parentAgentId: number | null }>
          name="parentAgentId"
          control={control}
          label={t("reports.inactiveCustomers.parentAgent")}
          roleId={CustomerRole.Agent}
          onValueChange={(parentAgentId) => onChange("parentAgentId", parentAgentId || undefined)}
        />
        <Select
          name="hasBalance"
          label={t("reports.inactiveCustomers.hasBalance")}
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
          label={t("reports.inactiveCustomers.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={activeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.inactiveCustomers.noPurchaseSince")}
          value={values.noPurchaseSince || ""}
          onChange={(date) => onChange("noPurchaseSince", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.inactiveCustomers.noSignInSince")}
          value={values.noSignInSince || ""}
          onChange={(date) => onChange("noSignInSince", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.inactiveCustomers.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.inactiveCustomers.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default InactiveCustomersReportFilters;
