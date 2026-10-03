import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
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

  const actions: { action: BulkCardActionValue; allowed: boolean; variant: "light" | "danger" }[] = [
    { action: BulkCardAction.ChangeCardType, allowed: can(Permission.CardsUpdate), variant: "light" },
    { action: BulkCardAction.Disable, allowed: can(Permission.CardsChangeStatus), variant: "light" },
    { action: BulkCardAction.Enable, allowed: can(Permission.CardsChangeStatus), variant: "light" },
    { action: BulkCardAction.Delete, allowed: can(Permission.CardsDelete), variant: "danger" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{t("cards.selectedCount", { count: selectedCount })}</span>
        {!allSelected && totalCount > selectedCount && (
          <Button variant="link" size="sm" label={t("cards.selectAllMatching", { count: totalCount })} onClick={onSelectAll} />
        )}
        <Button variant="link" size="sm" label={t("cards.selectByType")} onClick={onSelectByType} />
        <Button variant="link" size="sm" label={t("cards.selectByCategory")} onClick={onSelectByCategory} />
        {selectedCount > 0 && <Button variant="link" size="sm" label={t("cards.clearSelection")} onClick={onClear} />}
      </div>
      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {actions
            .filter((item) => item.allowed)
            .map((item) => (
              <Button key={item.action} variant={item.variant} size="sm" label={t(bulkCardActionKeys[item.action])} onClick={() => onAction(item.action)} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CardsSelectionBar;
