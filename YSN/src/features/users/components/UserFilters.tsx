import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import { useGetRolesQuery } from "../../roles/api/Roles.api";
import type { UserRequest } from "../types/Users.types";

interface UserFiltersProps {
  values: UserRequest;
  onChange: (name: keyof UserRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const UserFilters = ({ values, onChange, onSearch, onClear }: UserFiltersProps) => {
  const { t } = useTranslation();
  const { data: roleList } = useGetRolesQuery(
    { isActive: true, isDeleted: false, isCustomerRole: false, sortBy: "Name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const roles = roleList?.items;
  const { cities } = useMyCities();

  const roleOptions = useMemo(() => (roles ?? []).map((role) => ({ value: role.id, name: role.name })), [roles]);
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="name"
          label={t("users.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Input
          name="email"
          label={t("users.email")}
          value={values.email || ""}
          onChange={(event) => onChange("email", event.target.value)}
          size="md"
        />
        <Input
          name="phoneNumber"
          label={t("users.phoneNumber")}
          value={values.phoneNumber || ""}
          onChange={(event) => onChange("phoneNumber", event.target.value)}
          size="md"
        />
        <Select
          name="roleId"
          label={t("users.role")}
          value={toSelectValue(values.roleId)}
          onChange={(value) => onChange("roleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="cityId"
          label={t("users.city")}
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
          name="hasAllCities"
          label={t("users.hasAllCities")}
          value={toSelectValue(values.hasAllCities)}
          onChange={(value) => onChange("hasAllCities", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isActive"
          label={t("users.isActive")}
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
          label={t("users.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("users.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("users.lastLoginFrom")}
          value={values.lastLoginFrom || ""}
          onChange={(date) => onChange("lastLoginFrom", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("users.lastLoginTo")}
          value={values.lastLoginTo || ""}
          onChange={(date) => onChange("lastLoginTo", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default UserFilters;
