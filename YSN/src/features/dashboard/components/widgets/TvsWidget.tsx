import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardWidget from "../DashboardWidget";
import DashboardStat from "../DashboardStat";
import { useGetTvsCountQuery } from "../../../tvs/api/Tvs.api";
import { useGetTvActivationsCountQuery } from "../../../tvs/api/TvActivations.api";
import { TvActivationStatus } from "../../../tvs/types/TvActivations.types";
import { rangeFilter, withQuery } from "../../utils/dashboardDates";
import type { DashboardWidgetProps } from "../../types/Dashboard.types";

const EndingSoonDays = 7;

const TvsWidget = ({ range }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ending = useMemo(() => {
    const now = new Date();
    const until = new Date(now);
    until.setDate(until.getDate() + EndingSoonDays);
    return { subscriptionEndsFrom: now.toISOString(), subscriptionEndsTo: until.toISOString() };
  }, []);

  const tvFilter = { cityId: range.cityId, isDeleted: false };
  const { data: active = 0, isFetching } = useGetTvsCountQuery({ ...tvFilter, isSubscriptionActive: true });
  const { data: endingSoon = 0 } = useGetTvsCountQuery({ ...tvFilter, ...ending });
  const { data: completed = 0 } = useGetTvActivationsCountQuery({ ...rangeFilter(range), status: TvActivationStatus.Completed });
  const { data: failed = 0 } = useGetTvActivationsCountQuery({ ...rangeFilter(range), status: TvActivationStatus.Failed });
  const { data: needsChecking = 0 } = useGetTvActivationsCountQuery({ ...rangeFilter(range), needsChecking: true });

  const openTvs = (filter: Record<string, string | number | boolean | undefined>) => navigate(withQuery("/tvs", { ...tvFilter, ...filter }));
  const openActivations = (filter: Record<string, string | number | boolean | undefined>) =>
    navigate(withQuery("/tv-activations", { ...rangeFilter(range), ...filter }));

  return (
    <DashboardWidget title={t("dashboard.tvs")} loading={isFetching}>
      <div className="grid grid-cols-2 gap-3">
        <DashboardStat label={t("dashboard.tvsActive")} value={active} variant="success" onClick={() => openTvs({ isSubscriptionActive: true })} />
        <DashboardStat label={t("dashboard.tvsEndingSoon")} value={endingSoon} variant="warning" onClick={() => openTvs(ending)} />
        <DashboardStat label={t("dashboard.tvActivationsCompleted")} value={completed} variant="primary" onClick={() => openActivations({ status: TvActivationStatus.Completed })} />
        <DashboardStat label={t("dashboard.tvActivationsFailed")} value={failed} variant="danger" onClick={() => openActivations({ status: TvActivationStatus.Failed })} />
        <DashboardStat label={t("dashboard.tvActivationsNeedsChecking")} value={needsChecking} variant="info" onClick={() => openActivations({ needsChecking: true })} />
      </div>
    </DashboardWidget>
  );
};

export default TvsWidget;
