import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import type { PermissionDto } from "../types/Roles.types";

interface PermissionItemProps {
  permission: PermissionDto;
  checked: boolean;
  disabled?: boolean;
  onToggle: (checked: boolean) => void;
}

const PermissionItem = ({ permission, checked, disabled, onToggle }: PermissionItemProps) => {
  const { t } = useTranslation();
  const endpoints = permission.endpoints ?? [];

  return (
    <div className={`permission-item ${checked ? "permission-item-checked" : ""}`}>
      <Checkbox checked={checked} disabled={disabled} onChange={onToggle} label={t(`permissionNames.${permission.code}`)} />
      <p className="permission-item-description">{t(`permissionDescriptions.${permission.code}`)}</p>
      <div className="permission-item-meta">
        <code className="permission-item-code">{permission.code}</code>
        {endpoints.map((endpoint) => (
          <code key={endpoint} className="permission-item-endpoint" dir="ltr">
            {endpoint}
          </code>
        ))}
      </div>
    </div>
  );
};

export default PermissionItem;
