import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import LayersIcon from "../../../assets/icons/LayersIcon";
import { useGetCardStatsQuery } from "../api/Cards.api";
import type { CardFilter } from "../types/Cards.types";

interface CardStatsCardsProps {
  filter: CardFilter;
  refreshKey: number;
}

const CardStatsCards = ({ filter, refreshKey }: CardStatsCardsProps) => {
  const { t } = useTranslation();
  const { data } = useGetCardStatsQuery({ ...filter, refreshKey } as CardFilter, { refetchOnMountOrArgChange: true });
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MiniStatCard icon={<LayersIcon />} label={t("cards.total")} value={data.totalCount.toLocaleString()} variant="dark" />
      <MiniStatCard icon={<LayersIcon />} label={t("cardStatuses.available")} value={data.availableCount.toLocaleString()} variant="success" />
      <MiniStatCard icon={<LayersIcon />} label={t("cardStatuses.taken")} value={data.takenCount.toLocaleString()} variant="info" />
      <MiniStatCard icon={<LayersIcon />} label={t("cardStatuses.disabled")} value={data.disabledCount.toLocaleString()} variant="warning" />
    </div>
  );
};

export default CardStatsCards;
