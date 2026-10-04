import { useMemo } from "react";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import ReportOptionSelect from "./ReportOptionSelect";

interface ReportEmployeeSelectProps {
  name: string;
  label: string;
  value?: number;
  onChange: (userId: number | undefined) => void;
}

const ReportEmployeeSelect = ({ name, label, value, onChange }: ReportEmployeeSelectProps) => {
  const { can } = usePermission();
  const allowed = can(Permission.UsersView);
  const { data } = useGetAllUsersQuery({ isDeleted: false, sortBy: "firstName", isAscending: true }, { skip: !allowed, refetchOnMountOrArgChange: true });
  const options = useMemo(() => (data?.items ?? []).map((user) => ({ value: user.id, label: user.userName })), [data]);

  if (!allowed) return null;
  return <ReportOptionSelect<number> name={name} label={label} value={value} options={options} onChange={onChange} searchable />;
};

export default ReportEmployeeSelect;
