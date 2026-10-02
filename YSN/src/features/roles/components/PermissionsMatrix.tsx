import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import type { PermissionDto, PermissionModuleGroup } from "../types/Roles.types";

interface PermissionsMatrixProps {
  permissions: PermissionDto[];
  value: number[];
  onChange: (value: number[]) => void;
  disabled?: boolean;
  error?: string;
}

const groupByModule = (permissions: PermissionDto[]): PermissionModuleGroup[] => {
  const groups: PermissionModuleGroup[] = [];
  [...permissions]
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .forEach((permission) => {
      const group = groups.find((item) => item.module === permission.module);
      if (group) group.permissions.push(permission);
      else groups.push({ module: permission.module, permissions: [permission] });
    });
  return groups;
};

const PermissionsMatrix = ({ permissions, value, onChange, disabled, error }: PermissionsMatrixProps) => {
  const { t } = useTranslation();
  const groups = useMemo(() => groupByModule(permissions), [permissions]);
  const selected = useMemo(() => new Set(value), [value]);

  const allSelected = permissions.length > 0 && permissions.every((permission) => selected.has(permission.id));

  const toggle = (ids: number[], checked: boolean) => {
    const next = new Set(selected);
    ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
    onChange([...next]);
  };

  return (
    <div className="space-y-4">
      <div className="permissions-matrix-header">
        <Checkbox
          checked={allSelected}
          disabled={disabled}
          onChange={(checked) => toggle(permissions.map((permission) => permission.id), checked)}
          label={t("roles.selectAll")}
        />
        <span className="permissions-matrix-count">
          {t("roles.selectedCount", { count: value.length, total: permissions.length })}
        </span>
      </div>

      {error && <p className="permissions-matrix-error">{error}</p>}

      <div className="permissions-matrix">
        {groups.map((group) => {
          const ids = group.permissions.map((permission) => permission.id);
          const groupSelected = ids.every((id) => selected.has(id));
          return (
            <div key={group.module} className="permissions-matrix-row">
              <div className="permissions-matrix-module">
                <Checkbox
                  checked={groupSelected}
                  disabled={disabled}
                  onChange={(checked) => toggle(ids, checked)}
                  label={t(`permissionModules.${group.module}`)}
                />
              </div>
              <div className="permissions-matrix-actions">
                {group.permissions.map((permission) => (
                  <Checkbox
                    key={permission.id}
                    checked={selected.has(permission.id)}
                    disabled={disabled}
                    onChange={(checked) => toggle([permission.id], checked)}
                    label={t(`permissionActions.${permission.action}`)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsMatrix;
