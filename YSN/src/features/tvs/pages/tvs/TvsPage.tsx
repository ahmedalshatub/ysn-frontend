import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUrlFilter from "../../../../shared/hooks/useUrlFilter";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import TvsView from "../../components/tvs/TvsView";
import type { CustomerTvRequest } from "../../types/Tvs.types";

const TvsPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const location = useLocation();
  const initialFilter = useUrlFilter<CustomerTvRequest>();
  useTitle(t("tvs.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("tvs.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("tvs.menuGroup") }, { label: t("tvs.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<MonitorIcon />}
        showDate
        animated
      />
      <TvsView framed actionsTarget={actionsTarget} key={location.search} initialFilter={initialFilter} />
    </div>
  );
};

export default TvsPage;
