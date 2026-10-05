import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getYesNoFilterOptions } from "../../../../shared/utils/constants";
import { CustomerApp, customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { registrationAppKeys, type RegistrationsReportFilter } from "../types/RegistrationsReport.types";

interface RegistrationsReportFiltersProps {
  values: RegistrationsReportFilter;
  onChange: (name: keyof RegistrationsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const RegistrationsReportFilters = ({ values, onChange, onSearch, onClear }: RegistrationsReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const customerTypeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const appOptions = Object.values(CustomerApp).map((app) => ({ value: app, name: t(registrationAppKeys[app]) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="customerRoleId"
          label={t("reports.registrations.customerType")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={customerTypeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.registrations.city")}
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
          name="registrationApp"
          label={t("reports.registrations.app")}
          value={toSelectValue(values.registrationApp)}
          onChange={(value) => onChange("registrationApp", fromNumberValue(String(value)))}
          options={appOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="registeredFromApp"
          label={t("reports.registrations.fromApp")}
          value={toSelectValue(values.registeredFromApp)}
          onChange={(value) => onChange("registeredFromApp", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.registrations.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.registrations.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default RegistrationsReportFilters;
