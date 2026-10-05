import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import BarChartIcon from "../../../../assets/icons/BarChartIcon";
import InvoiceDeletionsReportView from "../components/InvoiceDeletionsReportView";

const InvoiceDeletionsReportPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  useTitle(t("reports.invoiceDeletions.title"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("reports.invoiceDeletions.title")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.reports") }, { label: t("reports.invoiceDeletions.title") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<BarChartIcon />}
        showDate
        animated
      />
      <InvoiceDeletionsReportView framed actionsTarget={actionsTarget} />
    </div>
  );
};

export default InvoiceDeletionsReportPage;
