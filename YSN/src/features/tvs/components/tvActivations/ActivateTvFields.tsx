import { useWatch, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormSection from "../../../../shared/components/forms/FormSection";
import FormRadioButton from "../../../../shared/components/inputs/FormRadioButton";
import FormInput from "../../../../shared/components/inputs/FormInput";
import LayersIcon from "../../../../assets/icons/LayersIcon";
import KeyIcon from "../../../../assets/icons/KeyIcon";
import UsableTvCardsField from "./UsableTvCardsField";
import { ActivateTvMode, type UsableTvCardDto } from "../../types/TvActivations.types";
import type { ActivateTvFormValues } from "../../validation/Tvs.validation";

interface ActivateTvFieldsProps {
  control: Control<ActivateTvFormValues>;
  errors: FieldErrors<ActivateTvFormValues>;
  cards: UsableTvCardDto[];
  loadingCards: boolean;
}

const ActivateTvFields = ({ control, errors, cards, loadingCards }: ActivateTvFieldsProps) => {
  const { t } = useTranslation();
  const mode = useWatch({ control, name: "mode" });
  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <div className="space-y-8">
      <FormSection icon={<LayersIcon />} title={t("tvActivations.mode")}>
        <FormRadioButton<ActivateTvFormValues>
          name="mode"
          control={control}
          direction="horizontal"
          options={[
            { value: ActivateTvMode.Card, label: t("tvActivations.modeCard") },
            { value: ActivateTvMode.Code, label: t("tvActivations.modeCode") },
          ]}
        />
      </FormSection>
      {mode === ActivateTvMode.Card ? (
        <FormSection icon={<LayersIcon />} title={t("tvActivations.usableCards")}>
          <UsableTvCardsField control={control} errors={errors} cards={cards} loading={loadingCards} />
        </FormSection>
      ) : (
        <FormSection icon={<KeyIcon />} title={t("tvActivations.cardCode")}>
          <FormInput<ActivateTvFormValues>
            name="cardCode"
            control={control}
            label={`${t("tvActivations.cardCode")} *`}
            error={!!errors.cardCode}
            errorMessage={fieldError(errors.cardCode?.message)}
          />
          <FormRadioButton<ActivateTvFormValues>
            name="isRenewal"
            control={control}
            direction="horizontal"
            options={[
              { value: "false", label: t("tvActivations.activation"), description: t("tvActivations.activationHint") },
              { value: "true", label: t("tvActivations.renewal"), description: t("tvActivations.renewalHint") },
            ]}
            error={!!errors.isRenewal}
            errorMessage={fieldError(errors.isRenewal?.message)}
          />
        </FormSection>
      )}
    </div>
  );
};

export default ActivateTvFields;
