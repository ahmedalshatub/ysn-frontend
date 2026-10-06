import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../../shared/components/modals/FormModal";
import Message from "../../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../../shared/utils/errorHandler";
import ZapIcon from "../../../../assets/icons/ZapIcon";
import { useActivateTvMutation, useGetUsableTvCardsQuery } from "../../api/TvActivations.api";
import { activateTvSchema, type ActivateTvFormValues } from "../../validation/Tvs.validation";
import { ActivateTvMode, type ActivateTvDto, type TvActivationDto } from "../../types/TvActivations.types";
import type { CustomerTvListDto } from "../../types/Tvs.types";
import ActivateTvFields from "./ActivateTvFields";
import ActivateTvConfirm from "./ActivateTvConfirm";
import TvActivationSummary from "./TvActivationSummary";

interface ActivateTvModalProps {
  open: boolean;
  tv: CustomerTvListDto;
  onClose: () => void;
  onSuccess: () => void;
}

type ActivateStep = "form" | "confirm" | "result";

const toActivateDto = (customerTvId: number, values: ActivateTvFormValues): ActivateTvDto =>
  values.mode === ActivateTvMode.Card
    ? { customerTvId, cardId: Number(values.cardId) }
    : { customerTvId, cardCode: values.cardCode.trim(), isRenewal: values.isRenewal === "true" };

const ActivateTvModal = ({ open, tv, onClose, onSuccess }: ActivateTvModalProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<ActivateStep>("form");
  const [result, setResult] = useState<TvActivationDto | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activateTv, { isLoading }] = useActivateTvMutation();
  const { data: cards, isLoading: loadingCards, refetch: refetchCards } = useGetUsableTvCardsQuery(
    { customerTvId: tv.id },
    { refetchOnMountOrArgChange: true }
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ActivateTvFormValues>({
    resolver: yupResolver(activateTvSchema) as never,
    mode: "onBlur",
    defaultValues: { mode: ActivateTvMode.Card, cardId: "", cardCode: "", isRenewal: "" },
  });

  const activate = async () => {
    setErrorMessage("");
    try {
      const activation = await activateTv(toActivateDto(tv.id, getValues())).unwrap();
      setResult(activation);
      setStep("result");
      showSuccess(t("tvActivations.successActivate"));
      onSuccess();
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      setStep("form");
      showError(message);
      refetchCards();
      onSuccess();
    }
  };

  const submit = {
    form: handleSubmit(() => setStep("confirm")),
    confirm: activate,
    result: onClose,
  }[step];

  const submitText = {
    form: t("common.next"),
    confirm: t("tvActivations.confirmActivate"),
    result: t("common.close"),
  }[step];

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={submit}
      title={t("tvActivations.activateTitle", { number: tv.tvNumber })}
      subtitle={[tv.nickname, tv.customerName, tv.cityName].filter(Boolean).join(" - ")}
      submitText={submitText}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="lg"
      icon={<ZapIcon className="h-6 w-6" />}
    >
      {step === "result" && result ? (
        <div className="space-y-6">
          <Message variant="success">{t("tvActivations.successActivate")}</Message>
          <TvActivationSummary activation={result} />
        </div>
      ) : step === "confirm" ? (
        <ActivateTvConfirm tv={tv} values={getValues()} cards={cards ?? []} onBack={() => setStep("form")} />
      ) : (
        <div className="space-y-6">
          {errorMessage && <Message variant="danger">{errorMessage}</Message>}
          <ActivateTvFields control={control} errors={errors} cards={cards ?? []} loadingCards={loadingCards} />
        </div>
      )}
    </FormModal>
  );
};

export default ActivateTvModal;
