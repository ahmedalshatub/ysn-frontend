import { useTranslation } from "react-i18next";
import Modal from "../../../../shared/components/modals/Modal";
import { customerFullName, type CustomerListDto } from "../../../customers/types/Customers.types";
import TvsView from "./TvsView";

interface CustomerTvsModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
}

const CustomerTvsModal = ({ open, customer, onClose }: CustomerTvsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("tvs.tvsOf", { name: customerFullName(customer) })}</h3>
        <TvsView customer={customer} />
      </div>
    </Modal>
  );
};

export default CustomerTvsModal;
