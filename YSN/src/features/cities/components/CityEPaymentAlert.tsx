import { useTranslation } from "react-i18next";
import AlertModal from "../../../shared/components/modals/AlertModal";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangeCityEPaymentMutation } from "../api/Cities.api";
import type { CityListDto } from "../types/Cities.types";

interface CityEPaymentAlertProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  city: CityListDto | null;
}

const CityEPaymentAlert = ({ open, onClose, onSuccess, city }: CityEPaymentAlertProps) => {
  const { t } = useTranslation();
  const [changeEPayment, { isLoading }] = useChangeCityEPaymentMutation();
  const enabled = !city?.ePaymentEnabled;

  const handleConfirm = async () => {
    if (!city) return;
    try {
      await changeEPayment({ id: city.id, enabled }).unwrap();
      showSuccess(t(enabled ? "cities.successEPaymentOn" : "cities.successEPaymentOff", { name: city.name }));
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
      type={enabled ? "info" : "warning"}
      title={t(enabled ? "cities.turnEPaymentOn" : "cities.turnEPaymentOff")}
      message={t(enabled ? "cities.ePaymentOnMessage" : "cities.ePaymentOffMessage", { name: city?.name ?? "" })}
      confirmText={t(enabled ? "cities.turnEPaymentOn" : "cities.turnEPaymentOff")}
      cancelText={t("common.cancel")}
      loading={isLoading}
    />
  );
};

export default CityEPaymentAlert;
