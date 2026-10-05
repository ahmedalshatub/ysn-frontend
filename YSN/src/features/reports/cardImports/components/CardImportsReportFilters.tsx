import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { CardSource, cardSourceKeys } from "../../../cards/types/Cards.types";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import type { CardImportsReportFilter } from "../types/CardImportsReport.types";

interface CardImportsReportFiltersProps {
  values: CardImportsReportFilter;
  onChange: (name: keyof CardImportsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardImportsReportFilters = ({ values, onChange, onSearch, onClear }: CardImportsReportFiltersProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const { cities } = useMyCities();
  const canViewUsers = can(Permission.UsersView);
  const { data: users } = useGetAllUsersQuery({ isDeleted: false }, { skip: !canViewUsers, refetchOnMountOrArgChange: true });

  const sourceOptions = Object.values(CardSource).map((source) => ({ value: source, name: t(cardSourceKeys[source]) }));
  const userOptions = useMemo(
    () => (users?.items ?? []).map((user) => ({ value: user.id, name: `${user.firstName} ${user.lastName}` })),
    [users]
  );

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
          label={t("reports.cardImports.city")}
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
          name="source"
          label={t("reports.cardImports.source")}
          value={toSelectValue(values.source)}
          onChange={(value) => onChange("source", fromNumberValue(String(value)))}
          options={sourceOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {canViewUsers && (
          <Select
            name="createdBy"
            label={t("reports.cardImports.createdBy")}
            value={toSelectValue(values.createdBy)}
            onChange={(value) => onChange("createdBy", fromNumberValue(String(value)))}
            options={userOptions}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            searchable
            size="md"
          />
        )}
        <DatePicker
          label={t("reports.cardImports.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.cardImports.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardImportsReportFilters;
