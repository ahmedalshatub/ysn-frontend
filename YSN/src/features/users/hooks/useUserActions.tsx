import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LockIcon from "../../../assets/icons/LockIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import type { UserListDto } from "../types/Users.types";

export interface UserActionHandlers {
  onEdit: (user: UserListDto) => void;
  onChangeStatus: (user: UserListDto) => void;
  onResetPassword: (user: UserListDto) => void;
  onDelete: (user: UserListDto) => void;
  onRestore: (user: UserListDto) => void;
}

const useUserActions = (handlers: UserActionHandlers) => {
  const { t } = useTranslation();
  const { can, isSuperAdmin } = usePermission();
  const currentUserId = useSelector((state: RootState) => state.auth.userId);

  return useCallback(
    (user: UserListDto) => {
      if (user.isDeleted) {
        return can(Permission.UsersRestore)
          ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => handlers.onRestore(user) }]
          : [];
      }

      const isSelf = user.id === currentUserId;
      const canManage = !user.isSuperAdmin || isSuperAdmin;

      return [
        ...(can(Permission.UsersUpdate) && canManage
          ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => handlers.onEdit(user) }]
          : []),
        ...(can(Permission.UsersChangeStatus) && canManage && !isSelf
          ? [{
              label: user.isActive ? t("users.deactivate") : t("users.activate"),
              icon: <RefreshCwIcon />,
              onClick: () => handlers.onChangeStatus(user),
            }]
          : []),
        ...(can(Permission.UsersResetPassword) && canManage && !isSelf
          ? [{ label: t("users.resetPassword"), icon: <LockIcon />, onClick: () => handlers.onResetPassword(user) }]
          : []),
        ...(can(Permission.UsersDelete) && canManage && !isSelf
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => handlers.onDelete(user) }]
          : []),
      ];
    },
    [t, can, isSuperAdmin, currentUserId, handlers]
  );
};

export default useUserActions;
