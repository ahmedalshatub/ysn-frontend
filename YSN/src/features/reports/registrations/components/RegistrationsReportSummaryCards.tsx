import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../../shared/components/cards/MiniStatCard";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import UserIcon from "../../../../assets/icons/UserIcon";
import Users2Icon from "../../../../assets/icons/Users2Icon";
import PhoneIcon from "../../../../assets/icons/PhoneIcon";
import LayoutDashboardIcon from "../../../../assets/icons/LayoutDashboardIcon";
import type { RegistrationsReportSummaryDto } from "../types/RegistrationsReport.types";

interface RegistrationsReportSummaryCardsProps {
  summary?: RegistrationsReportSummaryDto;
}

const RegistrationsReportSummaryCards = ({ summary }: RegistrationsReportSummaryCardsProps) => {
  const { t } = useTranslation();

  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <MiniStatCard icon={<UsersIcon />} label={t("reports.registrations.registrationsCount")} value={summary.registrationsCount} variant="dark" />
      <MiniStatCard icon={<UserIcon />} label={t("reports.registrations.agentsCount")} value={summary.agentsCount} variant="primary" />
      <MiniStatCard icon={<Users2Icon />} label={t("reports.registrations.subAgentsCount")} value={summary.subAgentsCount} variant="info" />
      <MiniStatCard icon={<UsersIcon />} label={t("reports.registrations.clientsCount")} value={summary.clientsCount} variant="success" />
      <MiniStatCard icon={<PhoneIcon />} label={t("reports.registrations.fromAppsCount")} value={summary.fromAppsCount} variant="warning" />
      <MiniStatCard icon={<LayoutDashboardIcon />} label={t("reports.registrations.fromDashboardCount")} value={summary.fromDashboardCount} variant="dark" />
    </div>
  );
};

export default RegistrationsReportSummaryCards;
