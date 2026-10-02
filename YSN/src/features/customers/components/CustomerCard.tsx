import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import MonitorIcon from "../../../assets/icons/MonitorIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import { CustomerType, customerFullName, customerPhone, customerTypeConfigs, type CustomerListDto } from "../types/Customers.types";

interface CustomerCardProps {
  customer: CustomerListDto;
  actions: ActionItem[];
  onOpen: (customer: CustomerListDto) => void;
}

const CustomerCard = ({ customer, actions, onOpen }: CustomerCardProps) => {
  const { t, i18n } = useTranslation();
  const name = customerFullName(customer);

  return (
    <div
      className="entity-card entity-card-clickable"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(customer)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(customer)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ProfileAvatar name={name} imagePath={customer.profileImage} size="lg" />
          <div className="min-w-0">
            <h3 className="entity-card-title truncate">{name}</h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <Badge label={t(customerTypeConfigs[customer.userType].labelKey)} variant="info" size="sm" />
              {customer.isDeleted ? (
                <Badge label={t("common.deleted")} variant="danger" size="sm" />
              ) : (
                <Badge
                  label={customer.isActive ? t("common.active") : t("customers.disabled")}
                  variant={customer.isActive ? "success" : "secondary"}
                  size="sm"
                />
              )}
            </div>
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
          <PhoneIcon className="h-4 w-4 flex-shrink-0" />
          <span dir="ltr">{customerPhone(customer) || "-"}</span>
        </p>
        <p className="entity-card-line">
          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
          <span>{customer.cityName ?? "-"}</span>
        </p>
        {customer.userType === CustomerType.SubAgent && (
          <p className={`entity-card-line ${customer.parentAgentIsActive ? "" : "entity-card-line-warning"}`}>
            <LinkIcon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {customer.parentAgentName ?? "-"}
              {!customer.parentAgentIsActive && ` - ${t("customers.agentNotActive")}`}
            </span>
          </p>
        )}
        <p className="entity-card-line">
          <WalletIcon className="h-4 w-4 flex-shrink-0" />
          <span>{formatCurrency(customer.balance)}</span>
        </p>
        <p className="entity-card-line">
          <MonitorIcon className="h-4 w-4 flex-shrink-0" />
          <span>{customer.isUnlimitedTvs ? t("customers.unlimited") : t("customers.maxTvs", { count: customer.maxTvCount ?? 0 })}</span>
        </p>
        <p className="entity-card-line">
          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
          <span>
            {t("customers.lastLogin")}:{" "}
            {customer.lastLoginAt ? formatDate(customer.lastLoginAt, { locale: i18n.language }) : t("customers.never")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomerCard;
