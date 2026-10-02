import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import type { CardCategoryListDto } from "../types/CardCategories.types";

export type CardCategoryDialogName = "form" | "delete" | "restore";

interface CardCategoryActionOptions {
  onOpenTypes: (category: CardCategoryListDto) => void;
  onDialog: (name: CardCategoryDialogName, category: CardCategoryListDto) => void;
}

const useCardCategoryActions = ({ onOpenTypes, onDialog }: CardCategoryActionOptions) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  return useCallback(
    (category: CardCategoryListDto): ActionItem[] => {
      if (category.isDeleted) {
        return can(Permission.CardCategoriesRestore)
          ? [{ label: t("common.restore"), icon: <Undo2Icon />, onClick: () => onDialog("restore", category) }]
          : [];
      }

      return [
        ...(can(Permission.CardTypesView)
          ? [{ label: t("cardCategories.cardTypes"), icon: <LayersIcon />, onClick: () => onOpenTypes(category) }]
          : []),
        ...(can(Permission.CardCategoriesUpdate)
          ? [{ label: t("common.edit"), icon: <EditIcon />, onClick: () => onDialog("form", category) }]
          : []),
        ...(can(Permission.CardCategoriesDelete)
          ? [{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDialog("delete", category) }]
          : []),
      ];
    },
    [t, can, onOpenTypes, onDialog]
  );
};

export default useCardCategoryActions;
