import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { CardKind, cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { PriceListReportFilter } from "../types/PriceListReport.types";

interface PriceListReportFiltersProps {
  values: PriceListReportFilter;
  onChange: (name: keyof PriceListReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const PriceListReportFilters = ({ values, onChange, onSearch, onClear }: PriceListReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const kindOptions = Object.values(CardKind).map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));
  const activeOptions = [
    { value: "true", name: t("common.active") },
    { value: "false", name: t("common.inactive") },
  ];

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
          name="cityId"
          label={t("reports.priceList.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cities}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="kind"
          label={t("reports.priceList.kind")}
          value={toSelectValue(values.kind)}
          onChange={(value) => onChange("kind", fromNumberValue(String(value)))}
          options={kindOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isActive"
          label={t("reports.priceList.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={activeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default PriceListReportFilters;
