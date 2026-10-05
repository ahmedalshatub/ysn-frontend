import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getStatusFilterOptions } from "../../../../shared/utils/constants";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { TransactionStatus, transactionStatusKeys } from "../../../transactions/types/Transactions.types";
import type { EPaymentsReportFilter } from "../types/EPaymentsReport.types";

interface EPaymentsReportFiltersProps {
  values: EPaymentsReportFilter;
  onChange: (name: keyof EPaymentsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const EPaymentsReportFilters = ({ values, onChange, onSearch, onClear }: EPaymentsReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const statusOptions = Object.values(TransactionStatus).map((status) => ({ value: status, name: t(transactionStatusKeys[status]) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.ePayments.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="customerName"
          label={t("reports.ePayments.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.ePayments.customerRole")}
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
          label={t("reports.ePayments.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="status"
          label={t("reports.ePayments.status")}
          value={toSelectValue(values.status)}
          onChange={(value) => onChange("status", fromNumberValue(String(value)))}
          options={statusOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Input
          name="amountFrom"
          type="number"
          label={t("reports.ePayments.amountFrom")}
          value={values.amountFrom ?? ""}
          onChange={(event) => onChange("amountFrom", fromNumberValue(event.target.value))}
          size="md"
        />
        <Input
          name="amountTo"
          type="number"
          label={t("reports.ePayments.amountTo")}
          value={values.amountTo ?? ""}
          onChange={(event) => onChange("amountTo", fromNumberValue(event.target.value))}
          size="md"
        />
        <Input
          name="requestId"
          label={t("reports.ePayments.requestId")}
          value={values.requestId || ""}
          onChange={(event) => onChange("requestId", event.target.value || undefined)}
          size="md"
        />
        <Input
          name="referenceId"
          label={t("reports.ePayments.referenceId")}
          value={values.referenceId || ""}
          onChange={(event) => onChange("referenceId", event.target.value || undefined)}
          size="md"
        />
        <Input
          name="maskedPan"
          label={t("reports.ePayments.maskedPan")}
          value={values.maskedPan || ""}
          onChange={(event) => onChange("maskedPan", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("reports.ePayments.isDeleted")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange("isDeleted", fromBooleanValue(String(value)))}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.ePayments.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.ePayments.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default EPaymentsReportFilters;
