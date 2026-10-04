import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import FileImage from "../../../shared/components/media/FileImage";
import { formatAmount } from "../../../shared/utils/formatCurrency";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import ImageIcon from "../../../assets/icons/ImageIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import { customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { cardKindKeys, isTvKind, type CardTypeListDto } from "../types/CardTypes.types";

interface CardTypeCardProps {
  cardType: CardTypeListDto;
  actions: ActionItem[];
}

const CardTypeCard = ({ cardType, actions }: CardTypeCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="entity-card">
      <div className="entity-card-image">
        <FileImage path={cardType.imageUrl} alt={cardType.name} className="h-full w-full object-contain p-3" fallback={<ImageIcon className="h-10 w-10" />} />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="entity-card-title truncate">{cardType.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge label={t(cardKindKeys[cardType.kind])} variant="info" size="sm" />
            {isTvKind(cardType.kind) && (
              <Badge label={t("cardTypes.months", { count: cardType.durationMonths ?? 0 })} variant="primary" size="sm" />
            )}
            {cardType.isDeleted ? (
              <Badge label={t("common.deleted")} variant="danger" size="sm" />
            ) : (
              <Badge
                label={cardType.isActive ? t("common.active") : t("common.inactive")}
                variant={cardType.isActive ? "success" : "secondary"}
                size="sm"
              />
            )}
          </div>
        </div>
        {actions.length > 0 && <TableActionDropdown size="sm" actions={actions} />}
      </div>
      <div className="entity-card-body">
        <p className="entity-card-line">
          <LayersIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{cardType.cardCategoryName ?? "-"}</span>
        </p>
        <p className="entity-card-line">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
          <span>{cardType.cityName ?? "-"}</span>
        </p>
        {cardType.agentPrice !== null && (
          <p className="entity-card-line">
            <span className="entity-card-line-label">{t("cardTypes.agentPrice")}</span>
            <span dir="ltr">{formatAmount(cardType.agentPrice)}</span>
          </p>
        )}
        {cardType.clientPrice !== null && (
          <p className="entity-card-line">
            <span className="entity-card-line-label">{t("cardTypes.clientPrice")}</span>
            <span dir="ltr">{formatAmount(cardType.clientPrice)}</span>
          </p>
        )}
        <p className="entity-card-line">
          <span className="entity-card-line-label">{t("cardTypes.amount")}</span>
          <span dir="ltr">{formatAmount(cardType.amount)}</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cardType.targetRoleIds.map((roleId) => (
            <Badge key={roleId} label={t(customerRoleConfigs[roleId as CustomerRoleValue].pluralKey)} variant="secondary" size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardTypeCard;
