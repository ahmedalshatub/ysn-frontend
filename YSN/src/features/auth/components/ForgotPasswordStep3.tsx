import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useResetPasswordMutation } from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import Button from "../../../shared/components/buttons/Button";

interface ResetForm {
  newPassword: string;
  confirmPassword: string;
}

interface ForgotPasswordStep3Props {
  email: string;
  resetToken: string;
  onSuccess: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const ForgotPasswordStep3 = ({ email, resetToken, onSuccess, buttonVariant = "primary", size }: ForgotPasswordStep3Props) => {
  const { t } = useTranslation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required(t("errors.Auth.NewPasswordRequired"))
      .min(6, t("errors.User.PasswordMin6"))
      .matches(/[A-Z]/, t("errors.User.PasswordMustContainUppercase"))
      .matches(/[a-z]/, t("errors.User.PasswordMustContainLowercase"))
      .matches(/[0-9]/, t("errors.User.PasswordMustContainDigit"))
      .matches(/[^A-Za-z0-9]/, t("errors.User.PasswordMustContainSpecialCharacter")),
    confirmPassword: yup
      .string()
      .required(t("errors.Auth.ConfirmPasswordRequired"))
      .oneOf([yup.ref("newPassword")], t("errors.Auth.PasswordsDoNotMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      await resetPassword({
        email,
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      showSuccess(t("forgotPassword.passwordResetSuccess"));
      onSuccess();
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
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
