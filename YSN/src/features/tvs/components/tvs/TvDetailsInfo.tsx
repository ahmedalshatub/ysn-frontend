import { useTranslation } from "react-i18next";
import Badge from "../../../../shared/components/badges/Badge";
import DetailItem from "../../../../shared/components/cards/DetailItem";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import MapPinIcon from "../../../../assets/icons/MapPinIcon";
import UserIcon from "../../../../assets/icons/UserIcon";
import PhoneIcon from "../../../../assets/icons/PhoneIcon";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import RefreshCwIcon from "../../../../assets/icons/RefreshCwIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import KeyIcon from "../../../../assets/icons/KeyIcon";
import TrashIcon from "../../../../assets/icons/TrashIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import { customerRoleConfigs, type CustomerRoleValue } from "../../../customers/types/Customers.types";
import SubscriptionBadge from "./SubscriptionBadge";
import { tvPhone, type CustomerTvDto } from "../../types/Tvs.types";

interface TvDetailsInfoProps {
  tv: CustomerTvDto;
}

const TvDetailsInfo = ({ tv }: TvDetailsInfoProps) => {
  const { t, i18n } = useTranslation();
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language, includeTime: true }) : "-");
  const roleConfig = customerRoleConfigs[tv.customerRoleId as CustomerRoleValue];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <SubscriptionBadge tv={tv} />
        <Badge label={tv.isDeleted ? t("tvs.removed") : t("tvs.linked")} variant={tv.isDeleted ? "danger" : "success"} size="sm" />
      </div>
      <div className="detail-grid detail-grid-compact">
        <DetailItem icon={<MonitorIcon />} label={t("tvs.tvNumber")} value={<span className="font-mono">{tv.tvNumber}</span>} />
        <DetailItem icon={<InfoIcon />} label={t("tvs.nickname")} value={tv.nickname || "-"} />
        <DetailItem icon={<KeyIcon />} label={t("tvs.internalNumber")} value={tv.internalNumber} />
        <DetailItem icon={<MapPinIcon />} label={t("tvs.city")} value={tv.cityName || "-"} />
        <DetailItem
          icon={<UserIcon />}
          label={t("tvs.customer")}
          value={`${tv.customerName}${roleConfig ? ` - ${t(roleConfig.labelKey)}` : ""}`}
        />
        <DetailItem icon={<PhoneIcon />} label={t("customers.phoneNumber")} value={<span dir="ltr">{tvPhone(tv) || "-"}</span>} />
        <DetailItem icon={<CalendarIcon />} label={t("tvs.endsAt")} value={date(tv.subscriptionEndsAt)} />
        <DetailItem icon={<RefreshCwIcon />} label={t("tvs.lastChecked")} value={date(tv.subscriptionCheckedAt)} />
        <DetailItem icon={<ZapIcon />} label={t("tvs.lastActivation")} value={date(tv.lastActivationAt)} />
        <DetailItem icon={<ZapIcon />} label={t("tvs.activationsCount")} value={tv.activationsCount} />
        <DetailItem icon={<CalendarIcon />} label={t("tvs.addedAt")} value={`${date(tv.createdAt)}${tv.creator ? ` - ${tv.creator}` : ""}`} />
        {tv.isDeleted && (
          <DetailItem
            icon={<TrashIcon />}
            label={t("tvs.removedAt")}
            value={`${date(tv.deletedAt)}${tv.deletedByName ? ` - ${tv.deletedByName}` : ""}`}
          />
        )}
      </div>
    </div>
  );
};

export default TvDetailsInfo;
