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
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { DiscountType, discountTypeKeys } from "../../../cardTypeDiscounts/types/CardTypeDiscounts.types";
import { DiscountSource, discountSourceKeys, type DiscountsReportFilter } from "../types/DiscountsReport.types";

interface DiscountsReportFiltersProps {
  values: DiscountsReportFilter;
  onChange: (name: keyof DiscountsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const DiscountsReportFilters = ({ values, onChange, onSearch, onClear }: DiscountsReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const customerTypeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const sourceOptions = Object.values(DiscountSource).map((source) => ({ value: source, name: t(discountSourceKeys[source]) }));
  const discountTypeOptions = [DiscountType.Percent, DiscountType.Fixed].map((type) => ({ value: type, name: t(discountTypeKeys[type]) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.discounts.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="customerName"
          label={t("reports.discounts.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.discounts.customerType")}
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
          label={t("reports.discounts.city")}
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
        <Select
          name="discountSource"
          label={t("reports.discounts.source")}
          value={toSelectValue(values.discountSource)}
          onChange={(value) => onChange("discountSource", fromNumberValue(String(value)))}
          options={sourceOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="discountType"
          label={t("reports.discounts.discountType")}
          value={toSelectValue(values.discountType)}
          onChange={(value) => onChange("discountType", fromNumberValue(String(value)))}
          options={discountTypeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.discounts.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.discounts.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default DiscountsReportFilters;
