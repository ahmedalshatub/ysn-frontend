import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getYesNoFilterOptions } from "../../../../shared/utils/constants";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { CardKind, cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { CardStockReportFilter } from "../types/CardStockReport.types";

interface CardStockReportFiltersProps {
  values: CardStockReportFilter;
  onChange: (name: keyof CardStockReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardStockReportFilters = ({ values, onChange, onSearch, onClear }: CardStockReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const kindOptions = Object.values(CardKind).map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));

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
          label={t("reports.cardStock.city")}
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
          name="kind"
          label={t("reports.cardStock.kind")}
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
          label={t("reports.cardStock.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.cardStock.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.cardStock.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardStockReportFilters;
