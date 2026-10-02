import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import { useGetPermissionsQuery } from "../api/Roles.api";
import type { RoleRequest } from "../types/Roles.types";

interface RoleFiltersProps {
  values: RoleRequest;
  onChange: (name: keyof RoleRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");

const RoleFilters = ({ values, onChange, onSearch, onClear }: RoleFiltersProps) => {
  const { t } = useTranslation();
  const { data: permissions } = useGetPermissionsQuery(undefined, { refetchOnMountOrArgChange: true });

  const permissionOptions = useMemo(
    () =>
      (permissions ?? []).map((permission) => ({
        value: permission.id,
        name: `${t(`permissionModules.${permission.module}`)} - ${t(`permissionActions.${permission.action}`)}`,
      })),
    [permissions, t]
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="name"
          label={t("roles.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Select
          name="permissionId"
          label={t("roles.permission")}
          value={toSelectValue(values.permissionId)}
          onChange={(value) => onChange("permissionId", value === "" ? undefined : Number(value))}
          options={permissionOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="isActive"
          label={t("roles.isActive")}
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
          label={t("roles.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("roles.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default RoleFilters;
