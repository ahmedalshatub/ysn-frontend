import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import CardCategoryTypeSelects from "./CardCategoryTypeSelects";
import CardTakenByFilter from "./CardTakenByFilter";
import { CardSource, CardStatus, cardSourceKeys, cardStatusKeys, type CardFilter, type CardRequest } from "../types/Cards.types";

interface CardFiltersProps {
  values: CardRequest;
  fixedFilter?: CardFilter;
  onChange: (changes: Partial<CardRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardFilters = ({ values, fixedFilter, onChange, onSearch, onClear }: CardFiltersProps) => {
  const { t } = useTranslation();
  const statusOptions = Object.values(CardStatus).map((status) => ({ value: status, name: t(cardStatusKeys[status]) }));
  const sourceOptions = Object.values(CardSource).map((source) => ({ value: source, name: t(cardSourceKeys[source]) }));
  const typeFixed = fixedFilter?.cardTypeId !== undefined || fixedFilter?.cardCategoryId !== undefined;

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!typeFixed && (
          <CardCategoryTypeSelects
            categoryId={values.cardCategoryId}
            cardTypeId={values.cardTypeId}
            onChange={(cardCategoryId, cardTypeId) => onChange({ cardCategoryId, cardTypeId })}
          />
        )}
        <Input
          name="serialNumber"
          label={t("cards.serialNumber")}
          value={values.serialNumber || ""}
          onChange={(event) => onChange({ serialNumber: event.target.value })}
          size="md"
        />
        <Select
          name="status"
          label={t("cards.status")}
          value={toSelectValue(values.status)}
          onChange={(value) => onChange({ status: fromNumberValue(String(value)) })}
          options={statusOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="source"
          label={t("cards.source")}
          value={toSelectValue(values.source)}
          onChange={(value) => onChange({ source: fromNumberValue(String(value)) })}
          options={sourceOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isTaken"
          label={t("cards.isTaken")}
          value={toSelectValue(values.isTaken)}
          onChange={(value) => onChange({ isTaken: fromBooleanValue(String(value)) })}
          options={[
            { value: "true", name: t("common.yes") },
            { value: "false", name: t("common.no") },
          ]}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {fixedFilter?.takenBy === undefined && (
          <CardTakenByFilter key={values.takenBy === undefined ? "empty" : "chosen"} value={values.takenBy} onChange={(takenBy) => onChange({ takenBy })} />
        )}
        <DatePicker
          label={t("cards.takenFrom")}
          value={values.takenFrom || ""}
          onChange={(date) => onChange({ takenFrom: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("cards.takenTo")}
          value={values.takenTo || ""}
          onChange={(date) => onChange({ takenTo: date || undefined })}
          size="md"
        />
        <Input
          name="importBatchId"
          label={t("cards.batch")}
          value={values.importBatchId || ""}
          onChange={(event) => onChange({ importBatchId: event.target.value || undefined })}
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
        <DatePicker
          label={t("cards.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange({ fromDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("cards.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange({ toDate: date || undefined })}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardFilters;
