import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { CustomerRole } from "../../../customers/types/Customers.types";
import type { SubAgentsByAgentReportFilter } from "../types/SubAgentsByAgentReport.types";

interface SubAgentsByAgentReportFiltersProps {
  values: SubAgentsByAgentReportFilter;
  onChange: (name: keyof SubAgentsByAgentReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const SubAgentsByAgentReportFilters = ({ values, onChange, onSearch, onClear }: SubAgentsByAgentReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ agentId: number | null }>({ defaultValues: { agentId: values.agentId ?? null } });

  const activeOptions = [
    { value: "true", name: t("common.active") },
    { value: "false", name: t("common.inactive") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ agentId: number | null }>
          name="agentId"
          control={control}
          label={t("reports.subAgentsByAgent.agent")}
          roleId={CustomerRole.Agent}
          onValueChange={(agentId) => onChange("agentId", agentId || undefined)}
        />
        <Input
          name="subAgentName"
          label={t("reports.subAgentsByAgent.subAgentName")}
          value={values.subAgentName || ""}
          onChange={(event) => onChange("subAgentName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.subAgentsByAgent.city")}
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
          name="isActive"
          label={t("reports.subAgentsByAgent.isActive")}
          value={toSelectValue(values.isActive)}
          onChange={(value) => onChange("isActive", fromBooleanValue(String(value)))}
          options={activeOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("reports.subAgentsByAgent.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.subAgentsByAgent.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default SubAgentsByAgentReportFilters;
