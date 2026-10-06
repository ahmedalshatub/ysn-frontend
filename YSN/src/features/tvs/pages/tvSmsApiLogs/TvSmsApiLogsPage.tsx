import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUrlFilter from "../../../../shared/hooks/useUrlFilter";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import ServerIcon from "../../../../assets/icons/ServerIcon";
import TvSmsApiLogsList from "../../components/tvSmsApiLogs/TvSmsApiLogsList";
import type { TvSmsApiLogRequest } from "../../types/TvSmsApiLogs.types";

const TvSmsApiLogsPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const location = useLocation();
  const initialFilter = useUrlFilter<TvSmsApiLogRequest>();
  useTitle(t("tvSmsApiLogs.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("tvSmsApiLogs.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("tvs.menuGroup") }, { label: t("tvSmsApiLogs.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<ServerIcon />}
        showDate
        animated
      />
      <TvSmsApiLogsList actionsTarget={actionsTarget} key={location.search} initialFilter={initialFilter} />
    </div>
  );
};

export default TvSmsApiLogsPage;
