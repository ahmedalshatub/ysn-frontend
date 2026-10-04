import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import Badge from "../../../shared/components/badges/Badge";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import type { PermissionModuleGroup } from "../types/Roles.types";
import PermissionItem from "./PermissionItem";

interface PermissionGroupCardProps {
  group: PermissionModuleGroup;
  selected: Set<number>;
  expanded: boolean;
  disabled?: boolean;
  onToggleExpanded: () => void;
  onToggle: (ids: number[], checked: boolean) => void;
}

const PermissionGroupCard = ({ group, selected, expanded, disabled, onToggleExpanded, onToggle }: PermissionGroupCardProps) => {
  const { t } = useTranslation();
  const ids = group.permissions.map((permission) => permission.id);
  const selectedCount = ids.filter((id) => selected.has(id)).length;

  return (
    <div className="permission-group">
      <div className="permission-group-header">
        <Checkbox checked={selectedCount === ids.length && ids.length > 0} disabled={disabled} onChange={(checked) => onToggle(ids, checked)} />
        <button type="button" className="permission-group-toggle" onClick={onToggleExpanded} aria-expanded={expanded}>
          <div className="min-w-0 flex-1 text-start">
            <h4 className="permission-group-title">{t(`permissionModules.${group.module}`)}</h4>
            <p className="permission-group-description">{t(`permissionModuleDescriptions.${group.module}`)}</p>
          </div>
          <Badge label={`${selectedCount} / ${ids.length}`} variant={selectedCount > 0 ? "primary" : "secondary"} size="sm" pill />
          <ChevronDownIcon className={`permission-group-chevron ${expanded ? "permission-group-chevron-open" : ""}`} />
        </button>
      </div>
      {expanded && (
        <div className="permission-group-body">
          {group.permissions.map((permission) => (
            <PermissionItem
              key={permission.id}
              permission={permission}
              checked={selected.has(permission.id)}
              disabled={disabled}
              onToggle={(checked) => onToggle([permission.id], checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PermissionGroupCard;
