import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import { customerFullName, type CustomerListDto } from "../../customers/types/Customers.types";
import MessagesList from "./MessagesList";

interface MessagesModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
}

const MessagesModal = ({ open, customer, onClose }: MessagesModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} size="full">
      <div className="max-h-[85vh] space-y-4 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">
          {t("messages.messagesOf", { name: customerFullName(customer) })}
        </h3>
        <MessagesList recipient={customer} />
      </div>
    </Modal>
  );
};

export default MessagesModal;
