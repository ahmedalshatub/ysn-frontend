import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import BarChartIcon from "../../../../assets/icons/BarChartIcon";
import { reportConfigs, type ReportCodeValue } from "../../types/ReportCodes.types";

interface ReportPageProps {
  code: ReportCodeValue;
  children: (actionsTarget: HTMLElement | null) => ReactNode;
}

const ReportPage = ({ code, children }: ReportPageProps) => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const title = t(reportConfigs[code].titleKey);
  useTitle(title);

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={title}
        items={[{ label: t("sidebar.homePage") }, { label: t("reports.common.reports") }, { label: title }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<BarChartIcon />}
        showDate
        animated
      />
      {children(actionsTarget)}
    </div>
  );
};

export default ReportPage;
