import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import MonitorIcon from "../../../assets/icons/MonitorIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import { CustomerRole, customerFullName, customerPhone, type CustomerListDto } from "../types/Customers.types";

interface CustomerCardProps {
  customer: CustomerListDto;
  actions: ActionItem[];
  onOpen: (customer: CustomerListDto) => void;
}

const CustomerCard = ({ customer, actions, onOpen }: CustomerCardProps) => {
  const { t, i18n } = useTranslation();
  const name = customerFullName(customer);
  const status = customer.isDeleted
    ? { label: t(customer.isSelfDeleted ? "customers.deletedByCustomer" : "common.deleted"), variant: "danger" as const }
    : customer.isActive
      ? { label: t("common.active"), variant: "success" as const }
      : { label: t("customers.disabled"), variant: "secondary" as const };

  return (
    <div
      className="entity-card entity-card-compact entity-card-clickable"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(customer)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(customer)}
    >
      <div className="flex items-center gap-3">
        <ProfileAvatar name={name} imagePath={customer.profileImage} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="entity-card-title truncate">{name}</h3>
            <Badge label={status.label} variant={status.variant} size="sm" />
          </div>
          <p className="entity-card-subtitle" dir="ltr">
            {customerPhone(customer) || "-"}
          </p>
        </div>
        {actions.length > 0 && (
          <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
            <TableActionDropdown size="sm" actions={actions} />
          </div>
        )}
      </div>

      <div className="entity-card-meta">
        <span className="entity-card-line">
          <UserIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate" dir="ltr">{customer.userName || "-"}</span>
        </span>
        <span className="entity-card-line">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{customer.cityName ?? "-"}</span>
        </span>
        <span className="entity-card-line">
          <WalletIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{formatCurrency(customer.balance)}</span>
        </span>
        <span className="entity-card-line">
          <MonitorIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{customer.isUnlimitedTvs ? t("customers.unlimited") : t("customers.maxTvs", { count: customer.maxTvCount ?? 0 })}</span>
        </span>
        <span className="entity-card-line">
          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {customer.lastLoginAt ? formatDate(customer.lastLoginAt, { locale: i18n.language }) : t("customers.never")}
          </span>
        </span>
        {customer.roleId === CustomerRole.SubAgent && (
          <span className={`entity-card-line col-span-2 ${customer.parentAgentIsActive ? "" : "entity-card-line-warning"}`}>
            <LinkIcon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {customer.parentAgentName ?? "-"}
              {!customer.parentAgentIsActive && ` - ${t("customers.agentNotActive")}`}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
