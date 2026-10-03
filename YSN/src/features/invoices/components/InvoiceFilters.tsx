import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import { customerTypeConfigs, customerTypeList } from "../../customers/types/Customers.types";
import CardCategoryTypeSelects from "../../cards/components/CardCategoryTypeSelects";
import type { InvoiceRequest } from "../types/Invoices.types";

interface InvoiceFiltersProps {
  values: InvoiceRequest;
  forCustomer: boolean;
  onChange: (changes: Partial<InvoiceRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const InvoiceFilters = ({ values, forCustomer, onChange, onSearch, onClear }: InvoiceFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const typeOptions = customerTypeList.map((type) => ({ value: type, name: t(customerTypeConfigs[type].pluralKey) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="id"
          type="number"
          label={t("invoices.number")}
          value={values.id ?? ""}
          onChange={(event) => onChange({ id: fromNumberValue(event.target.value) })}
          size="md"
        />
        {!forCustomer && (
          <>
            <Input
              name="customerName"
              label={t("invoices.customer")}
              value={values.customerName || ""}
              onChange={(event) => onChange({ customerName: event.target.value })}
              size="md"
            />
            <Input
              name="customerPhone"
              label={t("customers.phoneNumber")}
              value={values.customerPhone || ""}
              onChange={(event) => onChange({ customerPhone: event.target.value })}
              size="md"
            />
            <Select
              name="customerUserType"
              label={t("customers.customerType")}
              value={toSelectValue(values.customerUserType)}
              onChange={(value) => onChange({ customerUserType: fromNumberValue(String(value)) })}
              options={typeOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Select
              name="cityId"
              label={t("customers.city")}
              value={toSelectValue(values.cityId)}
              onChange={(value) => onChange({ cityId: fromNumberValue(String(value)) })}
              options={cityOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              searchable
              size="md"
            />
          </>
        )}
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => onChange({ cardCategoryId, cardTypeId })}
        />
        <Input
          name="serialNumber"
          label={t("cards.serialNumber")}
          value={values.serialNumber || ""}
          onChange={(event) => onChange({ serialNumber: event.target.value })}
          size="md"
        />
        <Input
          name="totalPriceFrom"
          type="number"
          label={t("invoices.totalFrom")}
          value={values.totalPriceFrom ?? ""}
          onChange={(event) => onChange({ totalPriceFrom: fromNumberValue(event.target.value) })}
          size="md"
        />
        <Input
          name="totalPriceTo"
          type="number"
          label={t("invoices.totalTo")}
          value={values.totalPriceTo ?? ""}
          onChange={(event) => onChange({ totalPriceTo: fromNumberValue(event.target.value) })}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("common.status")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange({ isDeleted: fromBooleanValue(String(value)) })}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker label={t("invoices.fromDate")} value={values.fromDate || ""} onChange={(date) => onChange({ fromDate: date || undefined })} size="md" />
        <DatePicker label={t("invoices.toDate")} value={values.toDate || ""} onChange={(date) => onChange({ toDate: date || undefined })} size="md" />
      </div>
    </FilterAccordion>
  );
};

export default InvoiceFilters;
