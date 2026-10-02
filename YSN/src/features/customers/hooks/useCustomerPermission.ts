import { useCallback } from "react";
import usePermission from "../../../shared/hooks/usePermission";
import type { PermissionCode } from "../../../shared/types/Permissions.types";
import { customerTypeConfigs, type CustomerTypeValue } from "../types/Customers.types";

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
    (customerType: CustomerTypeValue, action: CustomerAction) =>
      can(`${customerTypeConfigs[customerType].module}.${action}` as PermissionCode),
    [can]
  );
};

export default useCustomerPermission;
