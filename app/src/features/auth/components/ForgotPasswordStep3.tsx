import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useResetPasswordMutation } from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { isPasswordAutoGenerateEnabled } from "../../../shared/utils/passwordPolicy";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import Message from "../../../shared/components/feedback/Message";
import Button from "../../../shared/components/buttons/Button";

interface ResetForm {
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordStep3Props {
  emailOrUsername: string;
  resetToken: string;
  onSuccess: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const ForgotPasswordStep3 = ({ emailOrUsername, resetToken, onSuccess, buttonVariant = "primary", size }: ForgotPasswordStep3Props) => {
  const { t } = useTranslation();
  const autoGenerate = isPasswordAutoGenerateEnabled();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const schema = yup.object().shape({
    newPassword: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("errors.PasswordReset.NewPasswordIsRequired"))
          .min(6, t("errors.PasswordReset.NewPasswordMin6")),
    confirmPassword: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("errors.PasswordReset.ConfirmPasswordIsRequired"))
          .oneOf([yup.ref("newPassword")], t("errors.PasswordReset.PasswordsDoNotMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: yupResolver(schema) as Resolver<ResetForm>,
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      await resetPassword({
        email: emailOrUsername,
        resetToken,
        newPassword: autoGenerate ? undefined : data.newPassword,
        confirmPassword: autoGenerate ? undefined : data.confirmPassword,
      }).unwrap();
      showSuccess(t("forgotPassword.passwordResetSuccess"));
      onSuccess();
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      {autoGenerate ? (
        <Message variant="info">{t("forgotPassword.passwordWillBeEmailed")}</Message>
      ) : (
        <>
          <FormPasswordInput<ResetForm>
            name="newPassword"
            control={control}
            label={t("forgotPassword.newPassword")}
            placeholder={t("forgotPassword.newPasswordPlaceholder")}
            size={size}
            error={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
          />
          <FormPasswordInput<ResetForm>
            name="confirmPassword"
            control={control}
            label={t("forgotPassword.confirmPassword")}
            placeholder={t("forgotPassword.confirmPasswordPlaceholder")}
            size={size}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </>
      )}
      <Button
        type="submit"
        variant={buttonVariant}
        block
        size={size || "lg"}
        loading={isLoading}
        label={t("forgotPassword.resetPassword")}
      />
    </form>
  );
};

export default ForgotPasswordStep3;
