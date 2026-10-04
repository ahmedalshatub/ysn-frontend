import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../shared/components/inputs/Input";
import Button from "../../../shared/components/buttons/Button";
import CheckIcon from "../../../assets/icons/CheckIcon";
import XIcon from "../../../assets/icons/XIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import ChevronUpIcon from "../../../assets/icons/ChevronUpIcon";
import type { PermissionDto, PermissionModuleGroup } from "../types/Roles.types";
import PermissionGroupCard from "./PermissionGroupCard";

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
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const selected = useMemo(() => new Set(value), [value]);

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    const all = groupByModule(permissions);
    if (!query) return all;
    return all
      .map((group) => {
        const moduleText = `${t(`permissionModules.${group.module}`)} ${t(`permissionModuleDescriptions.${group.module}`)}`.toLowerCase();
        const matches = group.permissions.filter((permission) =>
          moduleText.includes(query) ||
          [permission.code, t(`permissionNames.${permission.code}`), t(`permissionDescriptions.${permission.code}`), ...(permission.endpoints ?? [])]
            .some((text) => text.toLowerCase().includes(query))
        );
        return { ...group, permissions: matches };
      })
      .filter((group) => group.permissions.length > 0);
  }, [permissions, search, t]);

  const searching = search.trim().length > 0;
  const visibleIds = groups.flatMap((group) => group.permissions.map((permission) => permission.id));

  const toggle = (ids: number[], checked: boolean) => {
    const next = new Set(selected);
    ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
    onChange([...next]);
  };

  const toggleExpanded = (module: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(module)) next.delete(module);
      else next.add(module);
      return next;
    });

  return (
    <div className="space-y-4">
      <div className="permissions-toolbar">
        <div className="w-full md:max-w-sm">
          <Input name="permissionSearch" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("roles.searchPermissions")} size="md" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            outline
            size="sm"
            label={t("roles.expandAll")}
            icon={<ChevronDownIcon className="h-4 w-4" />}
            iconPosition="left"
            onClick={() => setExpanded(new Set(groups.map((group) => group.module)))}
          />
          <Button
            type="button"
            variant="secondary"
            outline
            size="sm"
            label={t("roles.collapseAll")}
            icon={<ChevronUpIcon className="h-4 w-4" />}
            iconPosition="left"
            onClick={() => setExpanded(new Set())}
          />
          {!disabled && (
            <>
              <Button
                type="button"
                variant="secondary"
                outline
                size="sm"
                label={t("roles.selectAll")}
                icon={<CheckIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => toggle(visibleIds, true)}
              />
              <Button
                type="button"
                variant="secondary"
                outline
                size="sm"
                label={t("roles.deselectAll")}
                icon={<XIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => toggle(visibleIds, false)}
              />
            </>
          )}
          <span className="permissions-matrix-count">{t("roles.selectedCount", { count: value.length, total: permissions.length })}</span>
        </div>
      </div>

      {error && <p className="permissions-matrix-error">{error}</p>}

      {groups.length === 0 ? (
        <p className="card-grid-empty">{t("roles.noPermissionsMatch")}</p>
      ) : (
        <div className="permission-groups">
          {groups.map((group) => (
            <PermissionGroupCard
              key={group.module}
              group={group}
              selected={selected}
              expanded={searching || expanded.has(group.module)}
              disabled={disabled}
              onToggleExpanded={() => toggleExpanded(group.module)}
              onToggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PermissionsMatrix;
