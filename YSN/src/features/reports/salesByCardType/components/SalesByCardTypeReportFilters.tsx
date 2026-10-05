import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { CardKind, cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { SalesByCardTypeReportFilter } from "../types/SalesByCardTypeReport.types";

interface SalesByCardTypeReportFiltersProps {
  values: SalesByCardTypeReportFilter;
  onChange: (name: keyof SalesByCardTypeReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const SalesByCardTypeReportFilters = ({ values, onChange, onSearch, onClear }: SalesByCardTypeReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const kindOptions = Object.values(CardKind).map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));
  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => {
            onChange("cardCategoryId", cardCategoryId);
            onChange("cardTypeId", cardTypeId);
          }}
        />
        <Select
          name="kind"
          label={t("reports.salesByCardType.kind")}
          value={toSelectValue(values.kind)}
          onChange={(value) => onChange("kind", fromNumberValue(String(value)))}
          options={kindOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.salesByCardType.city")}
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
          name="customerRoleId"
          label={t("reports.salesByCardType.customerRole")}
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
          label={t("reports.salesByCardType.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <DatePicker
          label={t("reports.salesByCardType.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.salesByCardType.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default SalesByCardTypeReportFilters;
