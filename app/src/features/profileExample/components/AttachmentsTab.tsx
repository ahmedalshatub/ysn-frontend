import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import GridIcon from "../../../assets/icons/GridIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";
import type { Attachment } from "../types/profileData";
import { formatDate } from "../types/profileUtils";

interface AttachmentsTabProps {
  attachments: Attachment[];
}

type Tone = "danger" | "info" | "primary" | "success" | "secondary";

const typeStyle: Record<string, { icon: React.ReactNode; tone: Tone }> = {
  pdf: { icon: <ClipboardIcon className="w-5 h-5" />, tone: "danger" },
  image: { icon: <ImageIcon className="w-5 h-5" />, tone: "info" },
  doc: { icon: <FileTextIcon className="w-5 h-5" />, tone: "primary" },
  excel: { icon: <GridIcon className="w-5 h-5" />, tone: "success" },
};

const AttachmentsTab = ({ attachments }: AttachmentsTabProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          label={t("common.upload")}
          icon={<UploadIcon className="w-4 h-4" />}
          iconPosition="left"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {attachments.map((file) => {
          const style = typeStyle[file.type] ?? {
            icon: <FileTextIcon className="w-5 h-5" />,
            tone: "secondary" as Tone,
          };

          return (
            <div
              key={file.id}
              className="ce-panel rounded-xl border ce-divider p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`stat-icon-${style.tone} shrink-0 w-11 h-11 rounded-xl flex items-center justify-center`}
                >
                  {style.icon}
                </span>
                <Badge
                  variant={style.tone}
                  outline
                  size="sm"
                  pill
                  label={file.type.toUpperCase()}
                />
              </div>

              <div className="min-w-0">
                <span className="ce-panel-heading block text-sm font-semibold break-words">
                  {file.name}
                </span>
                <span className="ce-muted block text-xs mt-0.5">{file.size}</span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t ce-divider mt-auto">
                <span className="ce-muted text-xs">{formatDate(file.uploadedAt)}</span>
                <Button
                  variant="primary"
                  outline
                  size="sm"
                  label={t("common.download")}
                  icon={<DownloadIcon className="w-3.5 h-3.5" />}
                  iconPosition="left"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttachmentsTab;
