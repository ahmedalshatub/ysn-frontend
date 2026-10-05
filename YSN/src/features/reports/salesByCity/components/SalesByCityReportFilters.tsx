import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import type { SalesByCityReportFilter } from "../types/SalesByCityReport.types";

interface SalesByCityReportFiltersProps {
  values: SalesByCityReportFilter;
  onChange: (name: keyof SalesByCityReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const SalesByCityReportFilters = ({ values, onChange, onSearch, onClear }: SalesByCityReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="cityId"
          label={t("reports.salesByCity.city")}
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
          label={t("reports.salesByCity.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
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
        <DatePicker
          label={t("reports.salesByCity.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.salesByCity.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default SalesByCityReportFilters;
