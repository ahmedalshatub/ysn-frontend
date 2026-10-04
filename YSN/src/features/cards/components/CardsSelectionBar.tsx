import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import Button from "../../../shared/components/buttons/Button";
import Dropdown from "../../../shared/components/navigation/Dropdown";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import FilterIcon from "../../../assets/icons/FilterIcon";
import XIcon from "../../../assets/icons/XIcon";
import { BulkCardAction, bulkCardActionKeys, type BulkCardActionValue } from "../types/Cards.types";

interface CardsSelectionBarProps {
  selectedCount: number;
  totalCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onSelectByType: () => void;
  onSelectByCategory: () => void;
  onClear: () => void;
  onAction: (action: BulkCardActionValue) => void;
}

const CardsSelectionBar = ({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onSelectByType,
  onSelectByCategory,
  onClear,
  onAction,
}: CardsSelectionBarProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();

  const selectItems = [
    ...(!allSelected && totalCount > selectedCount
      ? [{ key: "all", label: t("cards.selectAllMatching", { count: totalCount }), icon: <FilterIcon /> }]
      : []),
    { key: "byType", label: t("cards.selectByType"), icon: <LayersIcon /> },
    { key: "byCategory", label: t("cards.selectByCategory"), icon: <LayersIcon /> },
    ...(selectedCount > 0 ? [{ key: "clear", label: t("cards.clearSelection"), icon: <XIcon /> }] : []),
  ];
  const selectHandlers: Record<string, () => void> = {
    all: onSelectAll,
    byType: onSelectByType,
    byCategory: onSelectByCategory,
    clear: onClear,
  };

  const actionItems = [
    { action: BulkCardAction.ChangeCardType, allowed: can(Permission.CardsUpdate) },
    { action: BulkCardAction.Disable, allowed: can(Permission.CardsChangeStatus) },
    { action: BulkCardAction.Enable, allowed: can(Permission.CardsChangeStatus) },
    { action: BulkCardAction.Delete, allowed: can(Permission.CardsDelete) },
  ]
    .filter((item) => item.allowed)
    .map((item) => ({
      key: String(item.action),
      label: t(bulkCardActionKeys[item.action]),
      variant: item.action === BulkCardAction.Delete ? ("danger" as const) : ("default" as const),
    }));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge label={t("cards.selectedCount", { count: selectedCount })} variant={selectedCount > 0 ? "primary" : "secondary"} size="sm" pill />
      <Dropdown
        trigger={<Button variant="secondary" outline size="sm" label={t("cards.select")} icon={<ChevronDownIcon className="h-4 w-4" />} iconPosition="right" />}
        items={selectItems}
        onSelect={(key) => selectHandlers[key]?.()}
      />
      {selectedCount > 0 && actionItems.length > 0 && (
        <Dropdown
          trigger={<Button variant="dark" size="sm" label={t("common.actions")} icon={<ChevronDownIcon className="h-4 w-4" />} iconPosition="right" />}
          items={actionItems}
          onSelect={(key) => onAction(Number(key) as BulkCardActionValue)}
        />
      )}
    </div>
  );
};

export default CardsSelectionBar;
