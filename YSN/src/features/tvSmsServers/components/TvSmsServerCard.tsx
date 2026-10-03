import { useTranslation } from "react-i18next";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import TvSmsServerStatusBadge from "./TvSmsServerStatusBadge";
import type { TvSmsServerListDto } from "../types/TvSmsServers.types";

interface TvSmsServerCardProps {
  server: TvSmsServerListDto;
  actions: ActionItem[];
}

const TvSmsServerCard = ({ server, actions }: TvSmsServerCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="entity-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="entity-card-title truncate">{server.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <TvSmsServerStatusBadge server={server} />
          </div>
        </div>
        {actions.length > 0 && <TableActionDropdown size="sm" actions={actions} />}
      </div>
      <div className="entity-card-body">
        <p className="entity-card-line">
          <GlobeIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate" dir="ltr">{server.baseUrl}</span>
        </p>
        <p className="entity-card-line">
          <UserIcon className="h-4 w-4 flex-shrink-0" />
          <span dir="ltr">{server.smsUserId}</span>
        </p>
        <p className="entity-card-line">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
          <span>{t("tvSmsServers.citiesCount", { count: server.citiesCount })}</span>
        </p>
      </div>
    </div>
  );
};

export default TvSmsServerCard;
