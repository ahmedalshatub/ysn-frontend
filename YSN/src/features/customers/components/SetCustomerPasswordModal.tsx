import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FormModal from "../../../shared/components/modals/FormModal";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import KeyIcon from "../../../assets/icons/KeyIcon";
import { useSetCustomerPasswordMutation } from "../api/Customers.api";
import { setPasswordSchema, type SetPasswordFormValues } from "../validation/Customers.validation";
import { customerFullName, type CustomerListDto } from "../types/Customers.types";

interface SetCustomerPasswordModalProps {
  open: boolean;
  customer: CustomerListDto;
  onClose: () => void;
  onSuccess: () => void;
}

const SetCustomerPasswordModal = ({ open, customer, onClose, onSuccess }: SetCustomerPasswordModalProps) => {
  const { t } = useTranslation();
  const [setPassword, { isLoading }] = useSetCustomerPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: yupResolver(setPasswordSchema),
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: SetPasswordFormValues) => {
    try {
      await setPassword({ id: customer.id, data: values }).unwrap();
      showSuccess(t("customers.successSetPassword"));
      onSuccess();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("customers.setPassword")}
      subtitle={customerFullName(customer)}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<KeyIcon className="h-6 w-6" />}
    >
      <div className="space-y-4">
        <FormPasswordInput<SetPasswordFormValues>
          name="newPassword"
          control={control}
          label={`${t("customers.newPassword")} *`}
          error={!!errors.newPassword}
          errorMessage={fieldError(errors.newPassword?.message)}
        />
        <FormPasswordInput<SetPasswordFormValues>
          name="confirmPassword"
          control={control}
          label={`${t("customers.confirmPassword")} *`}
          error={!!errors.confirmPassword}
          errorMessage={fieldError(errors.confirmPassword?.message)}
        />
        <p className="form-hint">{t("customers.passwordHandedOver")}</p>
      </div>
    </FormModal>
  );
};

export default SetCustomerPasswordModal;
