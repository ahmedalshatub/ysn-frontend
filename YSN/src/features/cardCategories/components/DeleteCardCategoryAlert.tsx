import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import Select from "../../../shared/components/inputs/Select";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCardCategoryMutation, useGetCardCategoriesQuery } from "../api/CardCategories.api";
import type { CardCategoryListDto } from "../types/CardCategories.types";

interface DeleteCardCategoryAlertProps {
  open: boolean;
  category: CardCategoryListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteCardCategoryAlert = ({ open, category, onClose, onSuccess }: DeleteCardCategoryAlertProps) => {
  const { t } = useTranslation();
  const hasCardTypes = category.cardTypesCount > 0;
  const [targetId, setTargetId] = useState<number | undefined>(undefined);
  const [deleteCategory, { isLoading }] = useDeleteCardCategoryMutation();

  const { data: sameCity } = useGetCardCategoriesQuery(
    { cityId: category.cityId, isActive: true, isDeleted: false, sortBy: "name", isAscending: true },
    { skip: !hasCardTypes, refetchOnMountOrArgChange: true }
  );
  const targetOptions = useMemo(
    () => (sameCity?.items ?? []).filter((item) => item.id !== category.id).map((item) => ({ value: item.id, name: item.name })),
    [sameCity, category.id]
  );

  const handleConfirm = async () => {
    if (hasCardTypes && !targetId) {
      showError(t("cardCategories.chooseMoveTarget"));
      return;
    }
    try {
      await deleteCategory({ id: category.id, moveCardTypesToCategoryId: targetId }).unwrap();
      showSuccess(t("cardCategories.successDelete"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <AlertModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      type="delete"
      title={t("messages.confirmDelete")}
      message={
        hasCardTypes
          ? t("cardCategories.deleteWithTypesMessage", { name: category.name, count: category.cardTypesCount })
          : t("cardCategories.deleteMessage", { name: category.name })
      }
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    >
      {hasCardTypes && (
        <Select
          name="moveTarget"
          label={t("cardCategories.moveCardTypesTo")}
          value={targetId ?? ""}
          onChange={(value) => setTargetId(value === "" ? undefined : Number(value))}
          options={targetOptions}
          valueKey="value"
          labelKey="name"
          placeholder={targetOptions.length ? t("cardCategories.selectCategory") : t("cardCategories.noOtherCategory")}
          size="md"
        />
      )}
    </AlertModal>
  );
};

export default DeleteCardCategoryAlert;
