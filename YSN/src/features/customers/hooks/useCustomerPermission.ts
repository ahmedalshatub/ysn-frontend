import { useCallback } from "react";
import usePermission from "../../../shared/hooks/usePermission";
import type { PermissionCode } from "../../../shared/types/Permissions.types";
import { customerRoleConfigs, type CustomerRoleValue } from "../types/Customers.types";

export type CustomerAction =
  | "View"
  | "Create"
  | "Update"
  | "ChangeType"
  | "ChangeMaxTvs"
  | "ChangeStatus"
  | "ResetPassword"
  | "ChangeCategoryAccess"
  | "ChangeDiscount"
  | "Delete"
  | "Restore"
  | "Export";

const useCustomerPermission = () => {
  const { can } = usePermission();

  return useCallback(
    (customerType: CustomerRoleValue, action: CustomerAction) =>
      can(`${customerRoleConfigs[customerType].module}.${action}` as PermissionCode),
    [can]
  );
};

export default useCustomerPermission;
