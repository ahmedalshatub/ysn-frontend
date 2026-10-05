import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { TransactionType, transactionTypeKeys } from "../../../transactions/types/Transactions.types";
import {
  AccountStatementDirection,
  accountStatementInvoiceType,
  type AccountStatementReportFilter,
} from "../types/AccountStatementReport.types";

interface AccountStatementReportFiltersProps {
  values: AccountStatementReportFilter;
  forCustomer: boolean;
  onChange: (name: keyof AccountStatementReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const AccountStatementReportFilters = ({ values, forCustomer, onChange, onSearch, onClear }: AccountStatementReportFiltersProps) => {
  const { t } = useTranslation();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const typeOptions = [
    { value: accountStatementInvoiceType, name: t("reports.accountStatement.invoices") },
    ...Object.values(TransactionType).map((type) => ({ value: type, name: t(transactionTypeKeys[type]) })),
  ];
  const directionOptions = [
    { value: AccountStatementDirection.In, name: t("reports.accountStatement.directionIn") },
    { value: AccountStatementDirection.Out, name: t("reports.accountStatement.directionOut") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!forCustomer && (
          <CustomerSearchSelect<{ customerId: number | null }>
            name="customerId"
            control={control}
            label={t("reports.accountStatement.customer")}
            onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
          />
        )}
        <Select
          name="type"
          label={t("reports.accountStatement.type")}
          value={toSelectValue(values.type)}
          onChange={(value) => onChange("type", fromNumberValue(String(value)))}
          options={typeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="direction"
          label={t("reports.accountStatement.direction")}
          value={toSelectValue(values.direction)}
          onChange={(value) => onChange("direction", fromNumberValue(String(value)))}
          options={directionOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.accountStatement.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.accountStatement.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default AccountStatementReportFilters;
