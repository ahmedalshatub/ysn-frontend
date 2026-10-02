import { useTranslation } from "react-i18next";
import Timeline from "../../../shared/components/display/Timeline";
import Badge from "../../../shared/components/badges/Badge";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import ZapIcon from "../../../assets/icons/ZapIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import type { ReportItem } from "../types/profileData";
import { formatDate } from "../types/profileUtils";

interface ReportsTabProps {
  reports: ReportItem[];
}

type Tone = "primary" | "success" | "warning" | "info";

const typeStyle: Record<ReportItem["type"], { icon: React.ReactNode; tone: Tone }> = {
  purchase: { icon: <ShoppingCartIcon className="w-4 h-4" />, tone: "primary" },
  payment: { icon: <ZapIcon className="w-4 h-4" />, tone: "success" },
  refund: { icon: <Undo2Icon className="w-4 h-4" />, tone: "warning" },
  note: { icon: <FileTextIcon className="w-4 h-4" />, tone: "info" },
};

const ReportsTab = ({ reports }: ReportsTabProps) => {
  const { t } = useTranslation();

  const items = reports.map((report) => {
    const style = typeStyle[report.type];
    return {
      id: String(report.id),
      title: report.title,
      date: formatDate(report.date),
      icon: style.icon,
      color: style.tone,
      content: (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={style.tone}
              size="sm"
              pill
              label={t(`profileExample.reportType.${report.type}`)}
            />
            {report.amount !== undefined && (
              <span
                className={`font-mono text-sm font-semibold ${
                  report.amount >= 0 ? "ce-success-text" : "ce-danger-text"
                }`}
              >
                {report.amount >= 0 ? "+" : "-"}$
                {Math.abs(report.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
          <p className="ce-muted text-sm">{report.description}</p>
        </div>
      ),
    };
  });

  return <Timeline items={items} variant="filled" animated />;
};

export default ReportsTab;
