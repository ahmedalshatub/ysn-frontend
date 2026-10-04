import { useTranslation } from "react-i18next";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import ReportOptionSelect from "./ReportOptionSelect";

interface ReportRoleSelectProps {
  value?: number;
  onChange: (roleId: number | undefined) => void;
}

const ReportRoleSelect = ({ value, onChange }: ReportRoleSelectProps) => {
  const { t } = useTranslation();
  const options = customerRoleList.map((role) => ({ value: role, label: t(customerRoleConfigs[role].pluralKey) }));

  return <ReportOptionSelect<number> name="customerRoleId" label={t("customers.customerType")} value={value} options={options} onChange={onChange} />;
};

export default ReportRoleSelect;
