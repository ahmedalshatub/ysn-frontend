import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import BarChartIcon from "../../../../assets/icons/BarChartIcon";
import EPaymentsReportView from "../components/EPaymentsReportView";

const EPaymentsReportPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  useTitle(t("reports.ePayments.title"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("reports.ePayments.title")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.reports") }, { label: t("reports.ePayments.title") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<BarChartIcon />}
        showDate
        animated
      />
      <EPaymentsReportView framed actionsTarget={actionsTarget} />
    </div>
  );
};

export default EPaymentsReportPage;
