import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import { customerRoleConfigs, customerRoleList } from "../../customers/types/Customers.types";
import { useGetCardCategoriesQuery } from "../../cardCategories/api/CardCategories.api";
import { CardKind, cardKindKeys, type CardTypeRequest } from "../types/CardTypes.types";

interface CardTypeFiltersProps {
  values: CardTypeRequest;
  onChange: (name: keyof CardTypeRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

type RangeField =
  | "durationMonthsFrom"
  | "durationMonthsTo"
  | "agentPriceFrom"
  | "agentPriceTo"
  | "clientPriceFrom"
  | "clientPriceTo"
  | "amountFrom"
  | "amountTo";

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardTypeFilters = ({ values, onChange, onSearch, onClear }: CardTypeFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { data: categories } = useGetCardCategoriesQuery(
    { isDeleted: false, cityId: values.cityId, sortBy: "name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const categoryOptions = useMemo(
    () => (categories?.items ?? []).map((category) => ({ value: category.id, name: `${category.name} - ${category.cityName ?? ""}` })),
    [categories]
  );
  const kindOptions = Object.values(CardKind).map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));
  const targetOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));

  const rangeInput = (name: RangeField, label: string) => (
    <Input
      name={name}
      type="number"
      label={label}
      value={values[name] ?? ""}
      onChange={(event) => onChange(name, event.target.value === "" ? undefined : Number(event.target.value))}
      size="md"
    />
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="name"
          label={t("cardTypes.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("cardCategories.city")}
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
          name="cardCategoryId"
          label={t("cardTypes.category")}
          value={toSelectValue(values.cardCategoryId)}
          onChange={(value) => onChange("cardCategoryId", fromNumberValue(String(value)))}
          options={categoryOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="kind"
          label={t("cardTypes.kind")}
          value={toSelectValue(values.kind)}
          onChange={(value) => onChange("kind", fromNumberValue(String(value)))}
          options={kindOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="targetRoleId"
          label={t("cardTypes.targets")}
          value={toSelectValue(values.targetRoleId)}
          onChange={(value) => onChange("targetRoleId", fromNumberValue(String(value)))}
          options={targetOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {rangeInput("durationMonthsFrom", t("cardTypes.durationFrom"))}
        {rangeInput("durationMonthsTo", t("cardTypes.durationTo"))}
        {rangeInput("agentPriceFrom", t("cardTypes.agentPriceFrom"))}
        {rangeInput("agentPriceTo", t("cardTypes.agentPriceTo"))}
        {rangeInput("clientPriceFrom", t("cardTypes.clientPriceFrom"))}
        {rangeInput("clientPriceTo", t("cardTypes.clientPriceTo"))}
        {rangeInput("amountFrom", t("cardTypes.amountFrom"))}
        {rangeInput("amountTo", t("cardTypes.amountTo"))}
        <Select
          name="isActive"
          label={t("cardTypes.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
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
          label={t("cardCategories.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("cardCategories.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardTypeFilters;
