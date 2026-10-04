import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import MailIcon from "../../../assets/icons/MailIcon";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import useSendMessageForm from "../hooks/useSendMessageForm";
import SendMessageFields from "./SendMessageFields";

interface SendMessageModalProps {
  open: boolean;
  customer?: CustomerListDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SendMessageModal = ({ open, customer, onClose, onSuccess }: SendMessageModalProps) => {
  const { t } = useTranslation();
  const form = useSendMessageForm(customer, () => {
    onSuccess();
    onClose();
  });

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={form.submit}
      title={t("messages.sendMessage")}
      submitText={t("messages.send")}
      cancelText={t("common.cancel")}
      loading={form.isLoading}
      size="lg"
      icon={<MailIcon className="h-6 w-6" />}
    >
      <SendMessageFields form={form} customer={customer} />
    </FormModal>
  );
};

export default SendMessageModal;
