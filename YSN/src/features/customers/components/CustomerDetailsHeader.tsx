import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import Button from "../../../shared/components/buttons/Button";
import ProfileAvatar from "../../../shared/components/media/ProfileAvatar";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import type { ActionItem } from "../../../shared/types/ActionItem.types";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import { customerFullName, customerPhone, customerTypeConfigs, type CustomerDto } from "../types/Customers.types";

interface CustomerDetailsHeaderProps {
  customer: CustomerDto;
  actions: ActionItem[];
}

const CustomerDetailsHeader = ({ customer, actions }: CustomerDetailsHeaderProps) => {
  const { t } = useTranslation();
  const name = customerFullName(customer);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <ProfileAvatar name={name} imagePath={customer.profileImage} size="2xl" />
        <div className="min-w-0">
          <h2 className="entity-details-title">{name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
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
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            <span className="entity-card-line">
              <PhoneIcon className="h-4 w-4" />
              <span dir="ltr">{customerPhone(customer) || "-"}</span>
            </span>
            <span className="entity-card-line">
              <MapPinIcon className="h-4 w-4" />
              {customer.cityName ?? "-"}
            </span>
            <span className="entity-card-line">
              <WalletIcon className="h-4 w-4" />
              {formatCurrency(customer.balance)}
            </span>
          </div>
        </div>
      </div>
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant === "danger" ? "danger" : "secondary"}
              outline
              size="sm"
              label={action.label}
              icon={action.icon}
              iconPosition="left"
              onClick={action.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsHeader;
