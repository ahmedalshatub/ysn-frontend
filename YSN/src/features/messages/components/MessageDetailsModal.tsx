import { useTranslation } from "react-i18next";
import Modal from "../../../shared/components/modals/Modal";
import Loader from "../../../shared/components/feedback/Loader";
import Badge from "../../../shared/components/badges/Badge";
import DetailItem from "../../../shared/components/cards/DetailItem";
import UserIcon from "../../../assets/icons/UserIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { useGetMessageQuery } from "../api/Messages.api";

interface MessageDetailsModalProps {
  open: boolean;
  messageId: number;
  onClose: () => void;
}

const MessageDetailsModal = ({ open, messageId, onClose }: MessageDetailsModalProps) => {
  const { t, i18n } = useTranslation();
  const { data: message, isLoading } = useGetMessageQuery(messageId, { refetchOnMountOrArgChange: true });

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
        <h3 className="form-modal-title text-lg">{message?.subject ?? t("messages.message")}</h3>
        {isLoading || !message ? (
          <div className="flex justify-center py-10">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                label={message.isRead ? t("messages.read") : t("messages.unread")}
                variant={message.isRead ? "success" : "warning"}
                size="sm"
              />
              {message.isDeleted && <Badge label={t("common.deleted")} variant="danger" size="sm" />}
            </div>
            <p className="message-content">{message.content}</p>
            <div className="detail-grid detail-grid-compact">
              <DetailItem icon={<UserIcon />} label={t("messages.customer")} value={message.fullName} />
              <DetailItem
                icon={<UsersIcon />}
                label={t("messages.customerType")}
                value={t(customerRoleConfigs[message.roleId as CustomerRoleValue].labelKey)}
              />
              <DetailItem icon={<MapPinIcon />} label={t("messages.city")} value={message.cityName || "-"} />
              <DetailItem icon={<MailIcon />} label={t("messages.sender")} value={message.creator || "-"} />
              <DetailItem icon={<CalendarIcon />} label={t("messages.sentAt")} value={formatDate(message.createdAt, { locale: i18n.language })} />
              <DetailItem
                icon={<CheckCircleIcon />}
                label={t("messages.readAt")}
                value={message.readAt ? formatDate(message.readAt, { locale: i18n.language }) : "-"}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MessageDetailsModal;
