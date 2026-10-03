import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useUpdateCardMutation } from "../api/Cards.api";
import type { CardListDto } from "../types/Cards.types";

interface ChangeCardStatusAlertProps {
  open: boolean;
  card: CardListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangeCardStatusAlert = ({ open, card, onClose, onSuccess }: ChangeCardStatusAlertProps) => {
  const { t } = useTranslation();
  const [mutate, { isLoading }] = useUpdateCardMutation();

  const handleConfirm = async () => {
    try {
      await mutate({ id: card.id, data: { isDisabled: !card.isDisabled } }).unwrap();
      showSuccess(t("cards.successStatus"));
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
      type="warning"
      title={t(card.isDisabled ? "cards.enable" : "cards.disable")}
      message={t(card.isDisabled ? "cards.enableMessage" : "cards.disableMessage", { serial: card.serialNumber })}
      confirmText={t(card.isDisabled ? "cards.enable" : "cards.disable")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default ChangeCardStatusAlert;
