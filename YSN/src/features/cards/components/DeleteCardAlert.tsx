import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useDeleteCardMutation } from "../api/Cards.api";
import type { CardListDto } from "../types/Cards.types";

interface DeleteCardAlertProps {
  open: boolean;
  card: CardListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteCardAlert = ({ open, card, onClose, onSuccess }: DeleteCardAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useDeleteCardMutation();

  const handleConfirm = async () => {
    try {
      await mutate(card.id).unwrap();
      showSuccess(t("cards.successDelete"));
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
      title={t("cards.confirmDelete")}
      message={t("cards.deleteMessage", { serial: card.serialNumber })}
      confirmText={t("common.delete")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default DeleteCardAlert;
