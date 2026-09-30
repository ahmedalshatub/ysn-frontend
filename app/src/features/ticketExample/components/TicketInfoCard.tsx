import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Badge from "../../../shared/components/badges/Badge";
import Avatar from "../../../shared/components/media/Avatar";
import InfoIcon from "../../../assets/icons/InfoIcon";
import type { Ticket } from "../types/ticketData";
import { statusVariantMap, priorityVariantMap, formatDate, formatDateTime } from "../types/ticketUtils";

interface TicketInfoCardProps {
  ticket: Ticket;
}

const TicketInfoCard = ({ ticket }: TicketInfoCardProps) => {
  const { t } = useTranslation();

  const field = (label: string, value: React.ReactNode) => (
    <div className="px-4 py-3">
      <span className="ce-muted block text-xs">{label}</span>
      <div className="mt-1.5">{value}</div>
    </div>
  );

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("ticketExample.ticketInfo")}
      icon={<InfoIcon className="w-4 h-4" />}
    >
      <div className="ce-panel rounded-xl border ce-divider grid grid-cols-1 sm:grid-cols-2 gap-px">
        {field(
          t("common.status"),
          <Badge
            variant={statusVariantMap[ticket.status]}
            size="sm"
            pill
            label={t(`ticketExample.status.${ticket.status}`)}
          />,
        )}
        {field(
          t("ticketExample.priorityLabel"),
          <Badge
            variant={priorityVariantMap[ticket.priority]}
            size="sm"
            pill
            label={t(`ticketExample.priority.${ticket.priority}`)}
          />,
        )}
        {field(
          t("ticketExample.category"),
          <Badge
            variant="secondary"
            outline
            size="sm"
            pill
            label={t(`ticketExample.categories.${ticket.category}`)}
          />,
        )}
        {field(
          t("ticketExample.assignedTo"),
          <div className="flex items-center gap-2 min-w-0">
            <Avatar
              src={ticket.assignedToAvatar}
              name={ticket.assignedTo}
              size="xs"
              variant="primary"
            />
            <span className="ce-panel-heading text-sm truncate">{ticket.assignedTo}</span>
          </div>,
        )}
        {field(
          t("ticketExample.createdBy"),
          <div className="flex items-center gap-2 min-w-0">
            <Avatar
              src={ticket.createdByAvatar}
              name={ticket.createdBy}
              size="xs"
              variant="info"
            />
            <span className="ce-panel-heading text-sm truncate">{ticket.createdBy}</span>
          </div>,
        )}
        {field(
          t("ticketExample.createdAt"),
          <span className="ce-panel-heading text-sm">{formatDate(ticket.createdAt)}</span>,
        )}
        {field(
          t("ticketExample.updatedAt"),
          <span className="ce-panel-heading text-sm">{formatDateTime(ticket.updatedAt)}</span>,
        )}
      </div>
    </Card>
  );
};

export default TicketInfoCard;
