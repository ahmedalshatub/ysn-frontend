import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "../../../assets/icons/EyeIcon";
import ZapIcon from "../../../assets/icons/ZapIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import type { CustomerTvListDto, TvActionName } from "../types/Tvs.types";

const useTvActions = (onAction: (name: TvActionName, tv: CustomerTvListDto) => void) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  return useCallback(
    (tv: CustomerTvListDto): ActionItem[] => {
      const live = !tv.isDeleted;
      return [
        { label: t("tvs.details"), icon: <EyeIcon />, onClick: () => onAction("view", tv) },
        ...(live && can(Permission.TvsActivate)
          ? [{ label: t("tvActivations.activate"), icon: <ZapIcon />, onClick: () => onAction("activate", tv) }]
          : []),
        ...(live && can(Permission.TvsRefreshSubscription)
          ? [{ label: t("tvs.refresh"), icon: <RefreshCwIcon />, onClick: () => onAction("refresh", tv) }]
          : []),
        ...(live && can(Permission.TvsUpdate)
          ? [{ label: t("tvs.editNickname"), icon: <EditIcon />, onClick: () => onAction("edit", tv) }]
          : []),
        ...(live && can(Permission.TvsRemove)
          ? [{ label: t("tvs.remove"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onAction("remove", tv) }]
          : []),
      ];
    },
    [t, can, onAction]
  );
};

export default useTvActions;
