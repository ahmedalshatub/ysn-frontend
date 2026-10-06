import { useTranslation } from "react-i18next";
import Button from "../../../../shared/components/buttons/Button";
import Message from "../../../../shared/components/feedback/Message";
import DetailItem from "../../../../shared/components/cards/DetailItem";
import ChevronLeftIcon from "../../../../assets/icons/ChevronLeftIcon";
import MonitorIcon from "../../../../assets/icons/MonitorIcon";
import UserIcon from "../../../../assets/icons/UserIcon";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import KeyIcon from "../../../../assets/icons/KeyIcon";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import { cardKindKeys, CardKind, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import { ActivateTvMode, TV_CARD_CODE_MIN_LENGTH, type UsableTvCardDto } from "../../types/TvActivations.types";
import type { CustomerTvListDto } from "../../types/Tvs.types";
import type { ActivateTvFormValues } from "../../validation/Tvs.validation";

interface ActivateTvConfirmProps {
  tv: CustomerTvListDto;
  values: ActivateTvFormValues;
  cards: UsableTvCardDto[];
  onBack: () => void;
}

const maskCode = (code: string) =>
  code.length <= TV_CARD_CODE_MIN_LENGTH ? code : `${"*".repeat(code.length - TV_CARD_CODE_MIN_LENGTH)}${code.slice(-TV_CARD_CODE_MIN_LENGTH)}`;

const ActivateTvConfirm = ({ tv, values, cards, onBack }: ActivateTvConfirmProps) => {
  const { t } = useTranslation();
  const isCard = values.mode === ActivateTvMode.Card;
  const card = isCard ? cards.find((item) => String(item.cardId) === values.cardId) : undefined;
  const kind: CardKindValue = card
    ? (card.kind as CardKindValue)
    : values.isRenewal === "true"
      ? CardKind.TvRenewal
      : CardKind.TvRegistration;

  return (
    <div className="space-y-6">
      <Message variant="warning">{t("tvActivations.confirmMessage")}</Message>
      <div className="detail-grid detail-grid-compact">
        <DetailItem icon={<MonitorIcon />} label={t("tvs.tvNumber")} value={<span className="font-mono">{tv.tvNumber}</span>} />
        <DetailItem icon={<UserIcon />} label={t("tvs.customer")} value={tv.customerName} />
        <DetailItem
          icon={<LayersIcon />}
          label={t("tvActivations.source")}
          value={isCard ? card?.cardTypeName ?? "-" : t("tvActivationSources.typedCode")}
        />
        <DetailItem
          icon={<KeyIcon />}
          label={t("tvActivations.cardCode")}
          value={<span className="font-mono">{isCard ? card?.cardCodeMasked ?? "-" : maskCode(values.cardCode.trim())}</span>}
        />
        <DetailItem icon={<ZapIcon />} label={t("tvActivations.kind")} value={t(cardKindKeys[kind])} />
        {card?.durationMonths ? (
          <DetailItem icon={<ZapIcon />} label={t("tvActivations.durationMonths")} value={t("tvActivations.months", { count: card.durationMonths })} />
        ) : null}
      </div>
      <Button
        variant="secondary"
        outline
        size="sm"
        label={t("common.back")}
        icon={<ChevronLeftIcon className="h-4 w-4" />}
        iconPosition="left"
        onClick={onBack}
      />
    </div>
  );
};

export default ActivateTvConfirm;
