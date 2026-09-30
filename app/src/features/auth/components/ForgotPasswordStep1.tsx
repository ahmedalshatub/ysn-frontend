import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ForgetPasswordDto } from "../types/PasswordReset.types";
import { useForgetPasswordMutation } from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import FormInput from "../../../shared/components/inputs/FormInput";
import Button from "../../../shared/components/buttons/Button";

interface ForgotPasswordStep1Props {
  onSuccess: (emailOrUsername: string) => void;
  onBack: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const ForgotPasswordStep1 = ({ onSuccess, onBack, buttonVariant = "primary", size }: ForgotPasswordStep1Props) => {
  const { t } = useTranslation();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const schema = yup.object().shape({
    emailOrUsername: yup
      .string()
      .required(t("errors.PasswordReset.UsernameOrEmailIsRequired"))
      .min(3, t("login.emailRequired")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordDto>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { emailOrUsername: "" },
  });

  const onSubmit = async (data: ForgetPasswordDto) => {
    try {
      await forgetPassword(data).unwrap();
      showSuccess(t("forgotPassword.otpSent"));
      onSuccess(data.emailOrUsername);
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <FormInput<ForgetPasswordDto>
        name="emailOrUsername"
        control={control}
        label={t("forgotPassword.emailOrUsername")}
        placeholder={t("forgotPassword.emailOrUsernamePlaceholder")}
        size={size}
        error={!!errors.emailOrUsername}
        errorMessage={errors.emailOrUsername?.message}
      />
      <Button
        type="submit"
        variant={buttonVariant}
        block
        size={size || "lg"}
        loading={isLoading}
        label={t("forgotPassword.sendOtp")}
      />
      <Button
        type="button"
        variant="secondary"
        outline
        block
        size={size || "lg"}
        label={t("common.back")}
        onClick={onBack}
      />
    </form>
  );
};

export default ForgotPasswordStep1;
