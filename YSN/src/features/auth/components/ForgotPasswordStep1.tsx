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
  onSuccess: (email: string) => void;
  onBack: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const ForgotPasswordStep1 = ({ onSuccess, onBack, buttonVariant = "primary", size }: ForgotPasswordStep1Props) => {
  const { t } = useTranslation();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const schema = yup.object().shape({
    email: yup.string().trim().required(t("login.emailRequired")).email(t("login.invalidEmail")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordDto>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgetPasswordDto) => {
    try {
      const email = data.email.trim();
      await forgetPassword({ email }).unwrap();
      showSuccess(t("forgotPassword.otpSent"));
      onSuccess(email);
    } catch (error: any) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <FormInput<ForgetPasswordDto>
        name="email"
        type="email"
        control={control}
        label={t("login.email")}
        placeholder={t("login.emailPlaceholder")}
        size={size}
        error={!!errors.email}
        errorMessage={errors.email?.message}
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
