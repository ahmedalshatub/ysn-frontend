import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import InfoItem from "../../../shared/components/cards/InfoItem";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { CustomerApp, CustomerRole, customerPhone, type CustomerDto } from "../types/Customers.types";

interface CustomerOverviewTabProps {
  customer: CustomerDto;
}

const CustomerOverviewTab = ({ customer }: CustomerOverviewTabProps) => {
  const { t, i18n } = useTranslation();
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language }) : t("customers.never"));
  const registeredFrom =
    customer.registrationApp === CustomerApp.YanabeeSumer
      ? t("customerApps.yanabeeSumer")
      : customer.registrationApp === CustomerApp.YanabeeSumerCards
        ? t("customerApps.yanabeeSumerCards")
        : t("customers.registeredFromDashboard");

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <InfoItem title={t("customers.firstName")} value={customer.firstName} />
      <InfoItem title={t("customers.lastName")} value={customer.lastName} />
      <InfoItem title={t("customers.phoneNumber")} value={<span dir="ltr">{customerPhone(customer) || "-"}</span>} />
      <InfoItem title={t("customers.email")} value={customer.email || "-"} />
      <InfoItem title={t("customers.city")} value={customer.cityName ?? "-"} />
      {customer.roleId === CustomerRole.SubAgent && (
        <InfoItem
          title={t("customers.parentAgent")}
          value={
            <div className="flex flex-wrap items-center gap-2">
              {customer.parentAgentId ? (
                <Link to={`/customers/${customer.parentAgentId}`} className="text-primary">
                  {customer.parentAgentName}
                </Link>
              ) : (
                "-"
              )}
              {!customer.parentAgentIsActive && <Badge label={t("customers.agentNotActive")} variant="warning" size="sm" />}
            </div>
          }
        />
      )}
      {customer.roleId === CustomerRole.Agent && (
        <InfoItem title={t("customers.subAgentsCount")} value={customer.subAgentsCount} />
      )}
      <InfoItem title={t("customers.balance")} value={formatCurrency(customer.balance)} />
      <InfoItem title={t("customers.maxTvCount")} value={customer.isUnlimitedTvs ? t("customers.unlimited") : customer.maxTvCount} />
      <InfoItem title={t("customers.registeredFrom")} value={registeredFrom} />
      <InfoItem title={t("common.createdAt")} value={date(customer.createdAt)} />
      <InfoItem title={t("customers.creator")} value={customer.creator || t("customers.selfRegistered")} />
      <InfoItem title={t("customers.lastLogin")} value={date(customer.lastLoginAt)} />
    </div>
  );
};

export default CustomerOverviewTab;
