import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Badge from "../../../shared/components/badges/Badge";
import DetailItem from "../../../shared/components/cards/DetailItem";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import UserIcon from "../../../assets/icons/UserIcon";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import MonitorIcon from "../../../assets/icons/MonitorIcon";
import LogInIcon from "../../../assets/icons/LogInIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import Users2Icon from "../../../assets/icons/Users2Icon";
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
    <div className="detail-grid">
      <DetailItem icon={<UserIcon />} label={t("customers.firstName")} value={customer.firstName} />
      <DetailItem icon={<UserIcon />} label={t("customers.lastName")} value={customer.lastName} />
      <DetailItem icon={<PhoneIcon />} label={t("customers.phoneNumber")} value={<span dir="ltr">{customerPhone(customer) || "-"}</span>} />
      <DetailItem icon={<MailIcon />} label={t("customers.email")} value={customer.email || "-"} />
      <DetailItem icon={<MapPinIcon />} label={t("customers.city")} value={customer.cityName ?? "-"} />
      {customer.roleId === CustomerRole.SubAgent && (
        <DetailItem
          icon={<LinkIcon />}
          label={t("customers.parentAgent")}
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
        <DetailItem icon={<UsersIcon />} label={t("customers.subAgentsCount")} value={customer.subAgentsCount} />
      )}
      <DetailItem icon={<WalletIcon />} label={t("customers.balance")} value={formatCurrency(customer.balance)} />
      <DetailItem
        icon={<MonitorIcon />}
        label={t("customers.maxTvCount")}
        value={customer.isUnlimitedTvs ? t("customers.unlimited") : customer.maxTvCount}
      />
      <DetailItem icon={<LogInIcon />} label={t("customers.registeredFrom")} value={registeredFrom} />
      <DetailItem icon={<CalendarIcon />} label={t("common.createdAt")} value={date(customer.createdAt)} />
      <DetailItem icon={<Users2Icon />} label={t("customers.creator")} value={customer.creator || t("customers.selfRegistered")} />
      <DetailItem icon={<CalendarIcon />} label={t("customers.lastLogin")} value={date(customer.lastLoginAt)} />
    </div>
  );
};

export default CustomerOverviewTab;
