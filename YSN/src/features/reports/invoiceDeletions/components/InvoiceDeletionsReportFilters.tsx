import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import { fullName } from "../../../users/types/Users.types";
import type { InvoiceDeletionsReportFilter } from "../types/InvoiceDeletionsReport.types";

interface InvoiceDeletionsReportFiltersProps {
  values: InvoiceDeletionsReportFilter;
  onChange: (name: keyof InvoiceDeletionsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const InvoiceDeletionsReportFilters = ({ values, onChange, onSearch, onClear }: InvoiceDeletionsReportFiltersProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });
  const canListEmployees = can(Permission.UsersView);
  const { data: employees } = useGetAllUsersQuery({}, { skip: !canListEmployees, refetchOnMountOrArgChange: true });

  const customerTypeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const employeeOptions = useMemo(
    () => (employees?.items ?? []).map((employee) => ({ value: employee.id, name: fullName(employee) })),
    [employees]
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.invoiceDeletions.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="customerName"
          label={t("reports.invoiceDeletions.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.invoiceDeletions.customerType")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={customerTypeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.invoiceDeletions.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => {
            onChange("cardCategoryId", cardCategoryId);
            onChange("cardTypeId", cardTypeId);
          }}
        />
        {canListEmployees && (
          <Select
            name="deletedBy"
            label={t("reports.invoiceDeletions.deletedBy")}
            value={toSelectValue(values.deletedBy)}
            onChange={(value) => onChange("deletedBy", fromNumberValue(String(value)))}
            options={employeeOptions}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            searchable
            size="md"
          />
        )}
        <DatePicker
          label={t("reports.invoiceDeletions.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.invoiceDeletions.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default InvoiceDeletionsReportFilters;
