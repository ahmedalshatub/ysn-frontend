import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { customerRoleConfigs, isCustomerRole } from "../../../customers/types/Customers.types";

interface ReportCustomerCellProps {
  id: number;
  name: string | null;
  roleId?: number | null;
  cityName?: string | null;
  phone?: string | null;
}

const ReportCustomerCell = ({ id, name, roleId, cityName, phone }: ReportCustomerCellProps) => {
  const { t } = useTranslation();
  const details = [roleId && isCustomerRole(roleId) ? t(customerRoleConfigs[roleId].labelKey) : null, cityName, phone].filter(Boolean).join(" - ");

  return (
    <div className="flex flex-col gap-1">
      <Link to={`/customers/${id}`} className="font-medium text-primary" onClick={(event) => event.stopPropagation()}>
        {name}
      </Link>
      {details && <span className="text-xs">{details}</span>}
    </div>
  );
};

export default ReportCustomerCell;
