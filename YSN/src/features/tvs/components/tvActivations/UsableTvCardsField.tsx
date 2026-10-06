import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Control, FieldErrors } from "react-hook-form";
import FormRadioButton from "../../../../shared/components/inputs/FormRadioButton";
import Message from "../../../../shared/components/feedback/Message";
import Loader from "../../../../shared/components/feedback/Loader";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { cardKindKeys, type CardKindValue } from "../../../cardTypes/types/CardTypes.types";
import type { UsableTvCardDto } from "../../types/TvActivations.types";
import type { ActivateTvFormValues } from "../../validation/Tvs.validation";

interface UsableTvCardsFieldProps {
  control: Control<ActivateTvFormValues>;
  errors: FieldErrors<ActivateTvFormValues>;
  cards: UsableTvCardDto[];
  loading: boolean;
}

const UsableTvCardsField = ({ control, errors, cards, loading }: UsableTvCardsFieldProps) => {
  const { t, i18n } = useTranslation();

  const options = useMemo(
    () =>
      cards.map((card) => ({
        value: String(card.cardId),
        label: [
          card.cardTypeName ?? "-",
          t(cardKindKeys[card.kind as CardKindValue] ?? ""),
          card.durationMonths ? t("tvActivations.months", { count: card.durationMonths }) : "",
        ]
          .filter(Boolean)
          .join(" - "),
        description: [
          card.cardCodeMasked,
          card.boughtAt ? t("tvActivations.boughtAt", { date: formatDate(card.boughtAt, { locale: i18n.language }) }) : "",
          card.invoiceId ? t("tvActivations.invoiceNumber", { id: card.invoiceId }) : "",
        ]
          .filter(Boolean)
          .join(" - "),
      })),
    [cards, t, i18n.language]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader variant="spinner" size="md" />
      </div>
    );
  }

  if (cards.length === 0) return <Message variant="warning">{t("tvActivations.noUsableCards")}</Message>;

  return (
    <FormRadioButton<ActivateTvFormValues>
      name="cardId"
      control={control}
      options={options}
      direction="vertical"
      error={!!errors.cardId}
      errorMessage={errors.cardId?.message ? t(errors.cardId.message) : ""}
    />
  );
};

export default UsableTvCardsField;
