import { useMemo } from "react";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission, type PermissionCode } from "../../../shared/types/Permissions.types";
import { MessageTarget, type MessageTargetValue } from "../types/Messages.types";

const audiencePermissions: [MessageTargetValue, PermissionCode][] = [
  [MessageTarget.Customer, Permission.MessagesSendToCustomer],
  [MessageTarget.City, Permission.MessagesSendToCity],
  [MessageTarget.Role, Permission.MessagesSendToRole],
  [MessageTarget.RoleInCity, Permission.MessagesSendToRoleInCity],
  [MessageTarget.All, Permission.MessagesSendToAll],
];

const useMessageAudiences = () => {
  const { can } = usePermission();
  return useMemo(() => audiencePermissions.filter(([, permission]) => can(permission)).map(([target]) => target), [can]);
};

export default useMessageAudiences;
