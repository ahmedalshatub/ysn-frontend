import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import { customerFullName, type CustomerListDto } from "../../customers/types/Customers.types";
import InvoicesView from "./InvoicesView";

interface CustomerInvoicesModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onChanged: () => void;
}

const CustomerInvoicesModal = ({ open, customer, onClose, onChanged }: CustomerInvoicesModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{t("invoices.invoicesOf", { name: customerFullName(customer) })}</h3>
        <InvoicesView customerId={customer.id} onChanged={onChanged} />
      </div>
    </Modal>
  );
};

export default CustomerInvoicesModal;
