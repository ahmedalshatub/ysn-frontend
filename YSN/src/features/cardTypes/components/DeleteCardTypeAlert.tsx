import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCardTypeMutation } from "../api/CardTypes.api";
import type { CardTypeListDto } from "../types/CardTypes.types";

interface DeleteCardTypeAlertProps {
  open: boolean;
  cardType: CardTypeListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteCardTypeAlert = ({ open, cardType, onClose, onSuccess }: DeleteCardTypeAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteCardTypeMutation();

  const handleConfirm = async () => {
    try {
      await mutate(cardType.id).unwrap();
      showSuccess(t("cardTypes.successDelete"));
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
      message={t("cardTypes.deleteMessage", { name: cardType.name })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteCardTypeAlert;
