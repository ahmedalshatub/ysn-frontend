import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions, getYesNoFilterOptions } from "../../../shared/utils/constants";
import { useGetCountriesQuery } from "../../countries/api/Countries.api";
import { useGetCustomersQuery } from "../api/Customers.api";
import { CustomerApp, CustomerRole, customerFullName, type CustomerRequest, type CustomerRoleValue } from "../types/Customers.types";

interface CustomerFiltersProps {
  customerType: CustomerRoleValue;
  values: CustomerRequest;
  fixedParentAgent?: boolean;
  onChange: (name: keyof CustomerRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CustomerFilters = ({ customerType, values, fixedParentAgent, onChange, onSearch, onClear }: CustomerFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { data: countryList } = useGetCountriesQuery(
    { isActive: true, isDeleted: false, sortBy: "Name", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const countries = countryList?.items;
  const isSubAgents = customerType === CustomerRole.SubAgent;
  const showAgentFilter = isSubAgents && !fixedParentAgent;
  const { data: agents } = useGetCustomersQuery(
    { roleId: CustomerRole.Agent, isDeleted: false, sortBy: "firstName", isAscending: true },
    { skip: !showAgentFilter, refetchOnMountOrArgChange: true }
  );

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const countryOptions = useMemo(
    () => (countries ?? []).map((country) => ({ value: country.id, name: `${country.phoneCode} ${country.name}` })),
    [countries]
  );
  const agentOptions = useMemo(
    () => (agents?.items ?? []).map((agent) => ({ value: agent.id, name: customerFullName(agent) })),
    [agents]
  );
  const registrationOptions = [
    { value: "dashboard", name: t("customers.registeredFromDashboard") },
    { value: String(CustomerApp.YanabeeSumer), name: t("customerApps.yanabeeSumer") },
    { value: String(CustomerApp.YanabeeSumerCards), name: t("customerApps.yanabeeSumerCards") },
  ];
  const registrationValue =
    values.registeredFromApp === false ? "dashboard" : values.registrationApp ? String(values.registrationApp) : "";

  const handleRegistrationChange = (value: string) => {
    if (value === "dashboard") {
      onChange("registrationApp", undefined);
      onChange("registeredFromApp", false);
    } else {
      onChange("registeredFromApp", undefined);
      onChange("registrationApp", fromNumberValue(value));
    }
  };

  const numberInput = (name: "maxTvCountFrom" | "maxTvCountTo" | "balanceFrom" | "balanceTo", label: string) => (
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
          label={t("customers.name")}
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder={t("common.searchByName")}
          size="md"
        />
        <Select
          name="countryId"
          label={t("customers.phoneCode")}
          value={toSelectValue(values.countryId)}
          onChange={(value) => onChange("countryId", fromNumberValue(String(value)))}
          options={countryOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Input
          name="phoneNumber"
          label={t("customers.phoneNumber")}
          value={values.phoneNumber || ""}
          onChange={(event) => onChange("phoneNumber", event.target.value)}
          size="md"
        />
        <Input
          name="email"
          label={t("customers.email")}
          value={values.email || ""}
          onChange={(event) => onChange("email", event.target.value)}
          size="md"
        />
        <Select
          name="cityId"
          label={t("customers.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        {showAgentFilter && (
          <Select
            name="parentAgentId"
            label={t("customers.parentAgent")}
            value={toSelectValue(values.parentAgentId)}
            onChange={(value) => onChange("parentAgentId", fromNumberValue(String(value)))}
            options={agentOptions}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            searchable
            size="md"
          />
        )}
        {isSubAgents && (
          <Select
            name="parentAgentIsActive"
            label={t("customers.parentAgentIsActive")}
            value={toSelectValue(values.parentAgentIsActive)}
            onChange={(value) => onChange("parentAgentIsActive", fromBooleanValue(String(value)))}
            options={getYesNoFilterOptions(t)}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            size="md"
          />
        )}
        <Select
          name="isUnlimitedTvs"
          label={t("customers.unlimitedTvs")}
          value={toSelectValue(values.isUnlimitedTvs)}
          onChange={(value) => onChange("isUnlimitedTvs", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {numberInput("maxTvCountFrom", t("customers.maxTvCountFrom"))}
        {numberInput("maxTvCountTo", t("customers.maxTvCountTo"))}
        {numberInput("balanceFrom", t("customers.balanceFrom"))}
        {numberInput("balanceTo", t("customers.balanceTo"))}
        {!isSubAgents && (
          <Select
            name="registration"
            label={t("customers.registeredFrom")}
            value={registrationValue}
            onChange={(value) => handleRegistrationChange(String(value))}
            options={registrationOptions}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            size="md"
          />
        )}
        <Select
          name="isActive"
          label={t("customers.isActive")}
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
          label={t("customers.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("customers.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("customers.lastLoginFrom")}
          value={values.lastLoginFrom || ""}
          onChange={(date) => onChange("lastLoginFrom", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("customers.lastLoginTo")}
          value={values.lastLoginTo || ""}
          onChange={(date) => onChange("lastLoginTo", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CustomerFilters;
