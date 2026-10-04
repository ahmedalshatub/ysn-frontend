import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import type { CityListDto } from "../types/Cities.types";

interface CityOrderCardProps {
  city: CityListDto;
}

const CityOrderCard = ({ city }: CityOrderCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="entity-card entity-card-compact">
      <div className="flex items-center gap-3 ps-8">
        <span className="detail-item-icon">
          <MapPinIcon />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="entity-card-title truncate">{city.name}</h3>
          <p className="entity-card-subtitle">{t("cities.customersCount", { count: city.customersCount })}</p>
        </div>
        <Badge label={city.isActive ? t("common.active") : t("common.inactive")} variant={city.isActive ? "success" : "secondary"} size="sm" />
      </div>
    </div>
  );
};

export default CityOrderCard;
