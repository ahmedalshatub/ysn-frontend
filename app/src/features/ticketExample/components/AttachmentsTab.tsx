import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import type { TicketAttachment } from "../types/ticketData";
import { formatFileSize, formatDate } from "../types/ticketUtils";

interface AttachmentsTabProps {
  attachments: TicketAttachment[];
}

const fileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) return { icon: <ClipboardIcon className="w-4 h-4" />, tone: "danger" };
  if (fileType.includes("image")) return { icon: <ImageIcon className="w-4 h-4" />, tone: "info" };
  if (fileType.includes("text")) return { icon: <FileTextIcon className="w-4 h-4" />, tone: "success" };
  return { icon: <HelpCircleIcon className="w-4 h-4" />, tone: "secondary" };
};

const AttachmentsTab = ({ attachments }: AttachmentsTabProps) => {
  const { t } = useTranslation();

  if (attachments.length === 0) {
    return <p className="ce-muted text-sm">{t("ticketExample.noAttachments")}</p>;
  }

  return (
    <ul className="space-y-3">
      {attachments.map((file) => {
        const { icon, tone } = fileIcon(file.fileType);
        return (
          <li
            key={file.id}
            className="ce-panel rounded-xl border ce-divider p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`stat-icon-${tone} shrink-0 w-9 h-9 rounded-lg flex items-center justify-center`}
              >
                {icon}
              </span>
              <div className="min-w-0">
                <span className="ce-panel-heading block text-sm font-semibold truncate">
                  {file.fileName}
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                  <span className="ce-muted text-xs">{formatFileSize(file.fileSize)}</span>
                  <span className="ce-muted text-xs">
                    {t("ticketExample.uploadedBy")} {file.uploadedBy}
                  </span>
                  <span className="ce-muted text-xs">{formatDate(file.uploadedAt)}</span>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              outline
              size="sm"
              iconOnly
              icon={<DownloadIcon className="w-4 h-4" />}
              tooltip={t("common.download")}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default AttachmentsTab;
