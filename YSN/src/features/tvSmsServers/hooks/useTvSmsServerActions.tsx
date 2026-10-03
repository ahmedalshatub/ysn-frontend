import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import type { TvSmsServerListDto } from "../types/TvSmsServers.types";

export type TvSmsServerDialogName = "form" | "delete" | "restore";

const useTvSmsServerActions = (onDialog: (name: TvSmsServerDialogName, server: TvSmsServerListDto) => void) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  return useCallback(
    (server: TvSmsServerListDto): ActionItem[] => {
      if (server.isDeleted) {
        return can(Permission.TvSmsServersRestore)
          ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onDialog("restore", server) }]
          : [];
      }

      return [
        ...(can(Permission.TvSmsServersUpdate)
          ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onDialog("form", server) }]
          : []),
        ...(can(Permission.TvSmsServersDelete)
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDialog("delete", server) }]
          : []),
      ];
    },
    [t, can, onDialog]
  );
};

export default useTvSmsServerActions;
