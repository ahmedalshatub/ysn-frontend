import usePermission from "../../../shared/hooks/usePermission";
import { customerRoleConfigs, customerRoleList } from "../../customers/types/Customers.types";
import type { PermissionCode } from "../../../shared/types/Permissions.types";

const useVisibleCustomerTypes = () => {
  const { can } = usePermission();
  return customerRoleList.filter((type) => can(`${customerRoleConfigs[type].module}.View` as PermissionCode));
};

export default useVisibleCustomerTypes;
