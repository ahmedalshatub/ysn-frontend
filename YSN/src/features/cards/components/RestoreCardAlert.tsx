import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCardMutation } from "../api/Cards.api";
import type { CardListDto } from "../types/Cards.types";

interface RestoreCardAlertProps {
  open: boolean;
  card: CardListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreCardAlert = ({ open, card, onClose, onSuccess }: RestoreCardAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreCardMutation();

  const handleConfirm = async () => {
    try {
      await mutate(card.id).unwrap();
      showSuccess(t("cards.successRestore"));
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
      type="info"
      title={t("cards.confirmRestore")}
      message={t("cards.restoreMessage", { serial: card.serialNumber })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCardAlert;
