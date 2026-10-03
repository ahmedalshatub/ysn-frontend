import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import { customerFullName, type CustomerListDto } from "../../customers/types/Customers.types";
import CardTypeDiscountsView from "./CardTypeDiscountsView";

interface CustomerDiscountsModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
}

const CustomerDiscountsModal = ({ open, customer, onClose }: CustomerDiscountsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("discounts.discountsOf", { name: customerFullName(customer) })}</h3>
        <CardTypeDiscountsView customer={customer} />
      </div>
    </Modal>
  );
};

export default CustomerDiscountsModal;
