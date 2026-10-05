import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getYesNoFilterOptions } from "../../../../shared/utils/constants";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { CustomerRole } from "../../../customers/types/Customers.types";
import type { AgentPerformanceReportFilter } from "../types/AgentPerformanceReport.types";

interface AgentPerformanceReportFiltersProps {
  values: AgentPerformanceReportFilter;
  onChange: (name: keyof AgentPerformanceReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const AgentPerformanceReportFilters = ({ values, onChange, onSearch, onClear }: AgentPerformanceReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ agentId: number | null }>({ defaultValues: { agentId: values.agentId ?? null } });

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ agentId: number | null }>
          name="agentId"
          control={control}
          label={t("reports.agentPerformance.agent")}
          roleId={CustomerRole.Agent}
          onValueChange={(agentId) => onChange("agentId", agentId || undefined)}
        />
        <Input
          name="agentName"
          label={t("reports.agentPerformance.agentName")}
          value={values.agentName || ""}
          onChange={(event) => onChange("agentName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.agentPerformance.city")}
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
          name="isActive"
          label={t("reports.agentPerformance.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={getYesNoFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.agentPerformance.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.agentPerformance.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default AgentPerformanceReportFilters;
