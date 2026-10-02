import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import { customerTypeConfigs, customerTypeList } from "../../customers/types/Customers.types";
import {
  TransactionStatus,
  TransactionType,
  transactionStatusKeys,
  transactionTypeKeys,
  type TransactionRequest,
} from "../types/Transactions.types";

interface TransactionFiltersProps {
  values: TransactionRequest;
  forCustomer: boolean;
  onChange: (name: keyof TransactionRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TransactionFilters = ({ values, forCustomer, onChange, onSearch, onClear }: TransactionFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const typeOptions = Object.values(TransactionType).map((type) => ({ value: type, name: t(transactionTypeKeys[type]) }));
  const statusOptions = Object.values(TransactionStatus).map((status) => ({
    value: status,
    name: t(transactionStatusKeys[status]),
  }));
  const customerTypeOptions = customerTypeList.map((type) => ({ value: type, name: t(customerTypeConfigs[type].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="type"
          label={t("transactions.type")}
          value={toSelectValue(values.type)}
          onChange={(value) => onChange("type", fromNumberValue(String(value)))}
          options={typeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="status"
          label={t("transactions.status")}
          value={toSelectValue(values.status)}
          onChange={(value) => onChange("status", fromNumberValue(String(value)))}
          options={statusOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {!forCustomer && (
          <>
            <Input
              name="customerName"
              label={t("transactions.customer")}
              value={values.customerName || ""}
              onChange={(event) => onChange("customerName", event.target.value)}
              size="md"
            />
            <Input
              name="customerPhone"
              label={t("customers.phoneNumber")}
              value={values.customerPhone || ""}
              onChange={(event) => onChange("customerPhone", event.target.value)}
              size="md"
            />
            <Select
              name="customerUserType"
              label={t("customers.customerType")}
              value={toSelectValue(values.customerUserType)}
              onChange={(value) => onChange("customerUserType", fromNumberValue(String(value)))}
              options={customerTypeOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Select
              name="cityId"
              label={t("customers.city")}
              value={toSelectValue(values.cityId)}
              onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
              options={cityOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              searchable
              size="md"
            />
          </>
        )}
        <Input
          name="description"
          label={t("transactions.description")}
          value={values.description || ""}
          onChange={(event) => onChange("description", event.target.value)}
          size="md"
        />
        <Input
          name="amountFrom"
          type="number"
          label={t("transactions.amountFrom")}
          value={values.amountFrom ?? ""}
          onChange={(event) => onChange("amountFrom", fromNumberValue(event.target.value))}
          size="md"
        />
        <Input
          name="amountTo"
          type="number"
          label={t("transactions.amountTo")}
          value={values.amountTo ?? ""}
          onChange={(event) => onChange("amountTo", fromNumberValue(event.target.value))}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("common.status")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange("isDeleted", fromBooleanValue(String(value)))}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("transactions.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("transactions.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TransactionFilters;
