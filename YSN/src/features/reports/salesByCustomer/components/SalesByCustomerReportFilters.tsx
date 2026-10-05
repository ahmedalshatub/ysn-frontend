import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { CustomerRole, customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import type { SalesByCustomerReportFilter } from "../types/SalesByCustomerReport.types";

interface SalesByCustomerReportFiltersProps {
  values: SalesByCustomerReportFilter;
  onChange: (name: keyof SalesByCustomerReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

interface SalesByCustomerReportFiltersForm {
  customerId: number | null;
  parentAgentId: number | null;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const SalesByCustomerReportFilters = ({ values, onChange, onSearch, onClear }: SalesByCustomerReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<SalesByCustomerReportFiltersForm>({
    defaultValues: { customerId: values.customerId ?? null, parentAgentId: values.parentAgentId ?? null },
  });

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<SalesByCustomerReportFiltersForm>
          name="customerId"
          control={control}
          label={t("reports.salesByCustomer.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="customerName"
          label={t("reports.salesByCustomer.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.salesByCustomer.customerRole")}
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
          label={t("reports.salesByCustomer.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CustomerSearchSelect<SalesByCustomerReportFiltersForm>
          name="parentAgentId"
          control={control}
          label={t("reports.salesByCustomer.parentAgent")}
          roleId={CustomerRole.Agent}
          onValueChange={(parentAgentId) => onChange("parentAgentId", parentAgentId || undefined)}
        />
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => {
            onChange("cardCategoryId", cardCategoryId);
            onChange("cardTypeId", cardTypeId);
          }}
        />
        <Input
          name="totalFrom"
          type="number"
          label={t("reports.salesByCustomer.totalFrom")}
          value={values.totalFrom ?? ""}
          onChange={(event) => onChange("totalFrom", fromNumberValue(event.target.value))}
          size="md"
        />
        <Input
          name="totalTo"
          type="number"
          label={t("reports.salesByCustomer.totalTo")}
          value={values.totalTo ?? ""}
          onChange={(event) => onChange("totalTo", fromNumberValue(event.target.value))}
          size="md"
        />
        <DatePicker
          label={t("reports.salesByCustomer.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.salesByCustomer.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default SalesByCustomerReportFilters;
