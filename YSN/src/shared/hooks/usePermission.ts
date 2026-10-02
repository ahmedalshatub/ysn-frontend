import { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import type { PermissionCode } from "../types/Permissions.types";

const usePermission = () => {
  const isSuperAdmin = useSelector((state: RootState) => state.auth.isSuperAdmin);
  const permissions = useSelector((state: RootState) => state.auth.permissions);

  const can = useCallback(
    (permission?: PermissionCode | null) => !permission || isSuperAdmin || permissions.includes(permission),
    [isSuperAdmin, permissions]
  );

  const canAny = useCallback(
    (list: PermissionCode[]) => list.length === 0 || list.some((permission) => can(permission)),
    [can]
  );

  return { can, canAny, isSuperAdmin };
};

export default usePermission;
