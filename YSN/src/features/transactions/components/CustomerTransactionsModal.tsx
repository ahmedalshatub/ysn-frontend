import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import { customerFullName, type CustomerListDto } from "../../customers/types/Customers.types";
import TransactionsView from "./TransactionsView";

interface CustomerTransactionsModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onChanged: () => void;
}

const CustomerTransactionsModal = ({ open, customer, onClose, onChanged }: CustomerTransactionsModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">
          {t("transactions.transactionsOf", { name: customerFullName(customer) })}
        </h3>
        <TransactionsView customer={customer} onChanged={onChanged} />
      </div>
    </Modal>
  );
};

export default CustomerTransactionsModal;
