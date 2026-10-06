import { useTranslation } from "react-i18next";
import Badge from "../../../../shared/components/badges/Badge";
import {
  SubscriptionState,
  getSubscriptionState,
  subscriptionStateKeys,
  subscriptionStateVariants,
  type CustomerTvListDto,
} from "../../types/Tvs.types";

interface SubscriptionBadgeProps {
  tv: Pick<CustomerTvListDto, "subscriptionEndsAt" | "isSubscriptionActive" | "daysLeft" | "isEstimated">;
}

const SubscriptionBadge = ({ tv }: SubscriptionBadgeProps) => {
  const { t } = useTranslation();
  const state = getSubscriptionState(tv);
  const label =
    state === SubscriptionState.Active && tv.daysLeft != null
      ? `${t(subscriptionStateKeys[state])} - ${t("tvs.daysLeft", { count: tv.daysLeft })}`
      : t(subscriptionStateKeys[state]);

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Badge label={label} variant={subscriptionStateVariants[state]} size="sm" />
      {tv.isEstimated && <Badge label={t("tvs.estimated")} variant="info" size="sm" />}
    </div>
  );
};

export default SubscriptionBadge;
