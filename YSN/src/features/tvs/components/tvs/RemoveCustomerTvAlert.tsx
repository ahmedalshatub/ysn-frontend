import { useTranslation } from "react-i18next";
import AlertModal from "../../../../shared/components/modals/AlertModal";
import Message from "../../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { useRemoveTvMutation } from "../../api/Tvs.api";
import type { CustomerTvListDto } from "../../types/Tvs.types";

interface RemoveCustomerTvAlertProps {
  open: boolean;
  tv: CustomerTvListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const RemoveCustomerTvAlert = ({ open, tv, onClose, onSuccess }: RemoveCustomerTvAlertProps) => {
  const { t, i18n } = useTranslation();
  const [removeTv, { isLoading }] = useRemoveTvMutation();

  const handleConfirm = async () => {
    try {
      await removeTv(tv.id).unwrap();
      showSuccess(t("tvs.successRemove"));
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
      title={t("tvs.removeTitle")}
      message={t("tvs.removeMessage", { number: tv.tvNumber, customer: tv.customerName })}
      confirmText={t("tvs.remove")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    >
      <Message variant="warning">
        {tv.subscriptionEndsAt
          ? t("tvs.removeKeepsPlayingUntil", { date: formatDate(tv.subscriptionEndsAt, { locale: i18n.language }) })
          : t("tvs.removeKeepsPlaying")}
      </Message>
    </AlertModal>
  );
};

export default RemoveCustomerTvAlert;
