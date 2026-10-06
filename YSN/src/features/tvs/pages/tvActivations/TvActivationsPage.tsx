import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUrlFilter from "../../../../shared/hooks/useUrlFilter";
import useTitle from "../../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../../shared/components/navigation/PageBreadcrumb";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import TvActivationsView from "../../components/tvActivations/TvActivationsView";
import type { TvActivationRequest } from "../../types/TvActivations.types";

const TvActivationsPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const location = useLocation();
  const initialFilter = useUrlFilter<TvActivationRequest>();
  useTitle(t("tvActivations.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("tvActivations.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("tvs.menuGroup") }, { label: t("tvActivations.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<ZapIcon />}
        showDate
        animated
      />
      <TvActivationsView framed actionsTarget={actionsTarget} key={location.search} initialFilter={initialFilter} />
    </div>
  );
};

export default TvActivationsPage;
