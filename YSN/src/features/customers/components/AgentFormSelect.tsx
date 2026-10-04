import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import { useGetCustomersQuery } from "../api/Customers.api";
import { CustomerRole, customerFullName, customerPhone } from "../types/Customers.types";

interface AgentFormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  excludeId?: number;
  error?: boolean;
  errorMessage?: string;
}

const AgentFormSelect = <T extends FieldValues>({ name, control, excludeId, error, errorMessage }: AgentFormSelectProps<T>) => {
  const { t } = useTranslation();
  const { data } = useGetCustomersQuery(
    { roleId: CustomerRole.Agent, isActive: true, isDeleted: false, sortBy: "firstName", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );

  const options = useMemo(
    () =>
      (data?.items ?? [])
        .filter((agent) => agent.id !== excludeId)
        .map((agent) => ({ value: agent.id, name: `${customerFullName(agent)} (${customerPhone(agent)})` })),
    [data, excludeId]
  );

  return (
    <FormSelect<T>
      name={name}
      control={control}
      label={`${t("customers.parentAgent")} *`}
      options={options}
      valueKey="value"
      labelKey="name"
      placeholder={t("customers.selectAgent")}
      searchable
      error={error}
      errorMessage={errorMessage}
    />
  );
};

export default AgentFormSelect;
