import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useCreatePaymentMutation } from "../api/Payments.api";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import FormSection from "../../../shared/components/forms/FormSection";

interface PaymentForm {
  amount: number;
  description: string;
}

interface CreatePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CreatePaymentModal = ({ open, onClose, onCreated }: CreatePaymentModalProps) => {
  const { t } = useTranslation();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError(t("paymentsPage.amountRequired"))
      .required(t("paymentsPage.amountRequired"))
      .moreThan(0, t("paymentsPage.amountMin")),
    description: yup.string().default(""),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { amount: 0, description: "" },
  });

  useEffect(() => {
    if (open) reset({ amount: 0, description: "" });
  }, [open, reset]);

  const onSubmit = async (data: PaymentForm) => {
    try {
      const result = await createPayment({
        amount: Number(data.amount),
        description: data.description || undefined,
      }).unwrap();

      showSuccess(t("paymentsPage.created"));
      onCreated?.();
      onClose();

      // The gateway hosts the card form, so the browser has to go there.
      if (result.formUrl) {
        showSuccess(t("paymentsPage.redirecting"));
        window.location.href = result.formUrl;
      }
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("paymentsPage.createPayment")}
      submitText={t("paymentsPage.createPayment")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<FileTextIcon className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <FormSection icon={<FileTextIcon />} title={t("common.basicInfo")}>
          <FormInput<PaymentForm>
            name="amount"
            control={control}
            type="number"
            label={t("paymentsPage.amount")}
            error={!!errors.amount}
            errorMessage={errors.amount?.message}
          />
          <FormTextArea<PaymentForm>
            name="description"
            control={control}
            label={t("paymentsPage.description")}
            placeholder={t("paymentsPage.descriptionPlaceholder")}
            error={!!errors.description}
            errorMessage={errors.description?.message}
          />
        </FormSection>
      </div>
    </FormModal>
  );
};

export default CreatePaymentModal;
