import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import type { CardTypeListDto } from "../types/CardTypes.types";

export type CardTypeDialogName = "form" | "delete" | "restore" | "cards";

const useCardTypeActions = (onDialog: (name: CardTypeDialogName, cardType: CardTypeListDto) => void) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  return useCallback(
    (cardType: CardTypeListDto): ActionItem[] => {
      if (cardType.isDeleted) {
        return can(Permission.CardTypesRestore)
          ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onDialog("restore", cardType) }]
          : [];
      }

      return [
        ...(can(Permission.CardsView)
          ? [{ label: t("cards.pageTitle"), icon: <LayersIcon />, onClick: () => onDialog("cards", cardType) }]
          : []),
        ...(can(Permission.CardTypesUpdate)
          ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onDialog("form", cardType) }]
          : []),
        ...(can(Permission.CardTypesDelete)
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDialog("delete", cardType) }]
          : []),
      ];
    },
    [t, can, onDialog]
  );
};

export default useCardTypeActions;
