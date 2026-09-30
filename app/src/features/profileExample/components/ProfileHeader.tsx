import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Avatar from "../../../shared/components/media/Avatar";
import Badge from "../../../shared/components/badges/Badge";
import StatCard from "../../../shared/components/cards/StatCard";
import MailIcon from "../../../assets/icons/MailIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import ZapIcon from "../../../assets/icons/ZapIcon";
import type { ClientProfile } from "../types/profileData";
import { formatDate } from "../types/profileUtils";

interface ProfileHeaderProps {
  client: ClientProfile;
}

const ProfileHeader = ({ client }: ProfileHeaderProps) => {
  const { t } = useTranslation();

  const contact = (icon: React.ReactNode, text: string) => (
    <span className="flex items-center gap-1.5 min-w-0">
      <span className="ce-muted shrink-0">{icon}</span>
      <span className="ce-text text-sm truncate">{text}</span>
    </span>
  );

  return (
    <Card variant="elevated" padding="md">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-center">
        <div className="xl:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-start">
          <Avatar
            src={client.avatar || undefined}
            name={client.name}
            size="2xl"
            variant="primary"
            status={client.status === "active" ? "online" : "offline"}
            bordered
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="ce-heading text-xl font-bold">{client.name}</h2>
              <Badge
                variant={client.status === "active" ? "success" : "secondary"}
                size="sm"
                pill
                label={client.status === "active" ? t("common.active") : t("common.inactive")}
              />
            </div>

            <p className="ce-muted text-sm mt-1">
              {client.position} @ {client.company}
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5">
              {contact(<MailIcon className="w-4 h-4" />, client.email)}
              {contact(<HelpCircleIcon className="w-4 h-4" />, client.phone)}
              {contact(<GlobeIcon className="w-4 h-4" />, `${client.city}, ${client.country}`)}
              {contact(
                <CalendarIcon className="w-4 h-4" />,
                `${t("profileExample.customerSince")}: ${formatDate(client.joinDate)}`,
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title={t("profileExample.totalOrders")}
            value={client.totalOrders}
            icon={<ShoppingCartIcon className="w-5 h-5" />}
            variant="success"
            change={12.5}
            changeLabel={t("common.vsLastMonth")}
          />
          <StatCard
            title={t("profileExample.totalSpent")}
            value={`$${client.totalSpent.toLocaleString("en-US")}`}
            icon={<ZapIcon className="w-5 h-5" />}
            variant="primary"
            change={8.3}
            changeLabel={t("common.vsLastMonth")}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
