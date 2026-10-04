import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetCustomersQuery } from "../../../customers/api/Customers.api";
import { CustomerRole, customerFullName } from "../../../customers/types/Customers.types";
import ReportOptionSelect from "./ReportOptionSelect";

interface ReportAgentSelectProps {
  name: string;
  value?: number;
  onChange: (agentId: number | undefined) => void;
}

const ReportAgentSelect = ({ name, value, onChange }: ReportAgentSelectProps) => {
  const { t } = useTranslation();
  const { data } = useGetCustomersQuery(
    { roleId: CustomerRole.Agent, isDeleted: false, sortBy: "firstName", isAscending: true },
    { refetchOnMountOrArgChange: true }
  );
  const options = useMemo(() => (data?.items ?? []).map((agent) => ({ value: agent.id, label: customerFullName(agent) })), [data]);

  return <ReportOptionSelect<number> name={name} label={t("customers.parentAgent")} value={value} options={options} onChange={onChange} searchable />;
};

export default ReportAgentSelect;
