import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import type { TvSmsServerListDto } from "../types/TvSmsServers.types";

const TvSmsServerStatusBadge = ({ server }: { server: TvSmsServerListDto }) => {
  const { t } = useTranslation();

  if (server.isDeleted) return <Badge label={t("common.deleted")} variant="danger" size="sm" />;
  return (
    <Badge
      label={server.isActive ? t("common.active") : t("common.inactive")}
      variant={server.isActive ? "success" : "secondary"}
      size="sm"
    />
  );
};

export default TvSmsServerStatusBadge;
