import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRestoreCardTypeMutation } from "../api/CardTypes.api";
import type { CardTypeListDto } from "../types/CardTypes.types";

interface RestoreCardTypeAlertProps {
  open: boolean;
  cardType: CardTypeListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RestoreCardTypeAlert = ({ open, cardType, onClose, onSuccess }: RestoreCardTypeAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useRestoreCardTypeMutation();

  const handleConfirm = async () => {
    try {
      await mutate(cardType.id).unwrap();
      showSuccess(t("cardTypes.successRestore"));
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
      title={t("messages.confirmRestore")}
      message={t("cardTypes.restoreMessage", { name: cardType.name })}
      confirmText={t("common.restore")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default RestoreCardTypeAlert;
