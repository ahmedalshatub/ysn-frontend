import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import FileImage from "../../../shared/components/media/FileImage";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import type { CardCategoryListDto } from "../types/CardCategories.types";

interface CardCategoryCardProps {
  category: CardCategoryListDto;
  actions: ActionItem[];
  onOpen: (category: CardCategoryListDto) => void;
}

const CardCategoryCard = ({ category, actions, onOpen }: CardCategoryCardProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="entity-card entity-card-clickable"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(category)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(category)}
    >
      <div className="entity-card-image">
        <FileImage
          path={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-contain p-3"
          fallback={<ImageIcon className="h-10 w-10" />}
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="entity-card-title truncate">{category.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {category.isDeleted ? (
              <Badge label={t("common.deleted")} variant="danger" size="sm" />
            ) : (
              <Badge
                label={category.isActive ? t("common.active") : t("common.inactive")}
                variant={category.isActive ? "success" : "secondary"}
                size="sm"
              />
            )}
          </div>
        </div>
        {actions.length > 0 && (
          <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
            <TableActionDropdown size="sm" actions={actions} />
          </div>
        )}
      </div>
      <div className="entity-card-body">
        <p className="entity-card-line">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
          <span>{category.cityName ?? "-"}</span>
        </p>
        <p className="entity-card-line">
          <LayersIcon className="h-4 w-4 flex-shrink-0" />
          <span>{t("cardCategories.cardTypesCount", { count: category.cardTypesCount })}</span>
        </p>
      </div>
    </div>
  );
};

export default CardCategoryCard;
