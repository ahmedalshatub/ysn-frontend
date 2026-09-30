import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Tabs from "../../../shared/components/navigation/Tabs";
import Badge from "../../../shared/components/badges/Badge";
import Button from "../../../shared/components/buttons/Button";
import Result from "../../../shared/components/display/Result";
import TicketInfoCard from "../components/TicketInfoCard";
import AssignmentActions from "../components/AssignmentActions";
import CommentsTab from "../components/CommentsTab";
import AttachmentsTab from "../components/AttachmentsTab";
import HistoryTab from "../components/HistoryTab";
import { mockTickets } from "../types/ticketData";
import { statusVariantMap, priorityVariantMap } from "../types/ticketUtils";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";

const TicketDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ticket = mockTickets.find((entry) => entry.id === Number(id));
  useTitle(ticket ? `${ticket.ticketNumber} - ${ticket.title}` : t("ticketExample.pageTitle"));

  if (!ticket) {
    return (
      <div className="space-y-6">
        <Card variant="elevated" padding="lg">
          <Result
            status="404"
            title={t("ticketExample.notFound")}
            extra={
              <Button
                variant="primary"
                size="md"
                label={t("common.backToList")}
                onClick={() => navigate("/ticket-example")}
              />
            }
          />
        </Card>
      </div>
    );
  }

  const tabs = [
    {
      id: "comments",
      label: t("ticketExample.tabs.comments"),
      icon: <FileTextIcon className="w-4 h-4" />,
      badge: ticket.comments.length,
      content: <CommentsTab comments={ticket.comments} />,
    },
    {
      id: "attachments",
      label: t("ticketExample.tabs.attachments"),
      icon: <ClipboardIcon className="w-4 h-4" />,
      badge: ticket.attachments.length,
      content: <AttachmentsTab attachments={ticket.attachments} />,
    },
    {
      id: "history",
      label: t("ticketExample.tabs.history"),
      icon: <CalendarIcon className="w-4 h-4" />,
      badge: ticket.history.length,
      content: <HistoryTab history={ticket.history} />,
    },
  ];

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("ticketExample.pageTitle") },
    { label: ticket.ticketNumber },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={ticket.ticketNumber}
        subtitle={ticket.title}
        items={breadcrumbItems}
        variant="gradient"
        icon={<ClipboardIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("common.backToList")}
            icon={<ChevronLeftIcon className="w-4 h-4 rtl:rotate-180" />}
            iconPosition="left"
            className="font-bold"
            onClick={() => navigate("/ticket-example")}
          />
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          <Card variant="elevated" padding="md" title={ticket.title}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant={statusVariantMap[ticket.status]}
                size="sm"
                pill
                label={t(`ticketExample.status.${ticket.status}`)}
              />
              <Badge
                variant={priorityVariantMap[ticket.priority]}
                size="sm"
                pill
                label={t(`ticketExample.priority.${ticket.priority}`)}
              />
              <Badge
                variant="secondary"
                outline
                size="sm"
                pill
                label={t(`ticketExample.categories.${ticket.category}`)}
              />
            </div>

            <p className="ce-text text-sm leading-relaxed">{ticket.description}</p>
          </Card>

          <Card variant="elevated" padding="md">
            <Tabs tabs={tabs} variant="pills" color="primary" animated />
          </Card>
        </div>

        <div className="space-y-6">
          <TicketInfoCard ticket={ticket} />
          <AssignmentActions ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
