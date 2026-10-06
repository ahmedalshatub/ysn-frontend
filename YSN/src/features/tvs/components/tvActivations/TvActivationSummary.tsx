import { useTranslation } from "react-i18next";
import DetailItem from "../../../../shared/components/cards/DetailItem";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import MapPinIcon from "../../../../assets/icons/MapPinIcon";
import UserIcon from "../../../../assets/icons/UserIcon";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import KeyIcon from "../../../../assets/icons/KeyIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import CheckCircleIcon from "../../../../assets/icons/CheckCircleIcon";
import InfoIcon from "../../../../assets/icons/InfoIcon";
import { cardKindKeys, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import {
  tvActivationSourceKeys,
  tvActivationStatusKeys,
  tvActivationStatusVariants,
  type TvActivationListDto,
} from "../../types/TvActivations.types";
import useProviderMessage from "../../hooks/useProviderMessage";

interface TvActivationSummaryProps {
  activation: TvActivationListDto;
}

const TvActivationSummary = ({ activation }: TvActivationSummaryProps) => {
  const { t, i18n } = useTranslation();
  const providerMessage = useProviderMessage();
  const date = (value: string | null) => (value ? formatDate(value, { locale: i18n.language, includeTime: true }) : "-");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          label={t(tvActivationStatusKeys[activation.status])}
          variant={tvActivationStatusVariants[activation.status]}
          size="sm"
        />
        {activation.needsChecking && <Badge label={t("tvActivations.needsChecking")} variant="warning" size="sm" />}
      </div>
      <div className="detail-grid detail-grid-compact">
        <DetailItem icon={<MonitorIcon />} label={t("tvs.tvNumber")} value={<span className="font-mono">{activation.tvNumber}</span>} />
        <DetailItem icon={<MapPinIcon />} label={t("tvs.city")} value={activation.cityName || "-"} />
        <DetailItem icon={<UserIcon />} label={t("tvs.customer")} value={activation.customerName} />
        <DetailItem icon={<LayersIcon />} label={t("tvActivations.source")} value={t(tvActivationSourceKeys[activation.source] ?? "")} />
        <DetailItem icon={<LayersIcon />} label={t("tvActivations.cardType")} value={activation.cardTypeName || "-"} />
        <DetailItem icon={<KeyIcon />} label={t("tvActivations.cardCode")} value={<span className="font-mono">{activation.cardCodeMasked}</span>} />
        <DetailItem icon={<ZapIcon />} label={t("tvActivations.kind")} value={t(cardKindKeys[activation.kind as CardKindValue] ?? "")} />
        <DetailItem
          icon={<CalendarIcon />}
          label={t("tvActivations.durationMonths")}
          value={activation.durationMonths ? t("tvActivations.months", { count: activation.durationMonths }) : "-"}
        />
        <DetailItem icon={<InfoIcon />} label={t("tvActivations.providerMessage")} value={providerMessage(activation.providerMessage)} />
        <DetailItem icon={<CalendarIcon />} label={t("tvActivations.createdAt")} value={date(activation.createdAt)} />
        <DetailItem icon={<CheckCircleIcon />} label={t("tvActivations.completedAt")} value={date(activation.completedAt)} />
      </div>
    </div>
  );
};

export default TvActivationSummary;
