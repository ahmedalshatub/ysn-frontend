import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import Select from "../../../shared/components/inputs/Select";
import { showSuccess, showInfo } from "../../../shared/components/feedback/Toast";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import type { Ticket } from "../types/ticketData";

interface AssignmentActionsProps {
  ticket: Ticket;
}

const AssignmentActions = ({ ticket }: AssignmentActionsProps) => {
  const { t } = useTranslation();

  const assigneeOptions = [
    { name: "Ahmed Hassan", value: "ahmed" },
    { name: "Lisa Wang", value: "lisa" },
    { name: "DevOps Team", value: "devops" },
    { name: "Support Team", value: "support" },
    { name: "Product Team", value: "product" },
  ];

  const statusOptions = [
    { name: t("ticketExample.status.pending"), value: "pending" },
    { name: t("ticketExample.status.in-progress"), value: "in-progress" },
    { name: t("ticketExample.status.resolved"), value: "resolved" },
    { name: t("ticketExample.status.closed"), value: "closed" },
  ];

  const canApproveReject = ticket.status === "pending" || ticket.status === "in-progress";

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("ticketExample.actions")}
      icon={<SettingsIcon className="w-4 h-4" />}
    >
      <div className="space-y-4">
        <p className="ce-muted text-xs">
          {canApproveReject
            ? t("ticketExample.actionsAvailable")
            : t("ticketExample.actionsNotAvailable")}
        </p>

        {canApproveReject && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="success"
              size="md"
              block
              label={t("ticketExample.approve")}
              icon={<CheckCircleIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => showSuccess(t("ticketExample.approve"))}
            />
            <Button
              variant="danger"
              size="md"
              block
              label={t("ticketExample.reject")}
              icon={<XCircleIcon className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => showInfo(t("ticketExample.reject"))}
            />
          </div>
        )}

        <div className="pt-4 border-t ce-divider space-y-4">
          <Select
            label={t("ticketExample.reassign")}
            placeholder={t("ticketExample.selectAssignee")}
            options={assigneeOptions}
            labelKey="name"
            valueKey="value"
            value=""
            onChange={() => showSuccess(t("ticketExample.reassigned"))}
          />
          <Select
            label={t("ticketExample.changeStatus")}
            options={statusOptions}
            labelKey="name"
            valueKey="value"
            value={ticket.status}
            onChange={() => showSuccess(t("ticketExample.statusChanged"))}
          />
        </div>
      </div>
    </Card>
  );
};

export default AssignmentActions;
