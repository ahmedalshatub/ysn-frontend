import usePermission from "../../../shared/hooks/usePermission";
import { customerTypeConfigs, customerTypeList } from "../../customers/types/Customers.types";
import type { PermissionCode } from "../../../shared/types/Permissions.types";

const useVisibleCustomerTypes = () => {
  const { can } = usePermission();
  return customerTypeList.filter((type) => can(`${customerTypeConfigs[type].module}.View` as PermissionCode));
};

export default useVisibleCustomerTypes;
