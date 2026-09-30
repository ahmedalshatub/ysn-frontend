import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { RegisterRequestDto } from "../types/Registration.types";
import { useRegisterRequestMutation } from "../api/Auth.api";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import FormInput from "../../../shared/components/inputs/FormInput";
import Button from "../../../shared/components/buttons/Button";

interface RegisterStep1Props {
  onSuccess: (emailOrPhone: string) => void;
  onBack: () => void;
  loginPath?: string;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const RegisterStep1 = ({
  onSuccess,
  onBack,
  loginPath = "/",
  buttonVariant = "primary",
  size,
}: RegisterStep1Props) => {
  const { t } = useTranslation();
  const [registerRequest, { isLoading }] = useRegisterRequestMutation();

  const schema = yup.object().shape({
    emailOrPhone: yup
      .string()
      .required(t("register.emailRequired"))
      .email(t("register.emailInvalid")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequestDto>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { emailOrPhone: "" },
  });

  const onSubmit = async (data: RegisterRequestDto) => {
    try {
      await registerRequest(data).unwrap();
      showSuccess(t("register.otpSent"));
      onSuccess(data.emailOrPhone);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <FormInput<RegisterRequestDto>
        name="emailOrPhone"
        control={control}
        label={t("register.email")}
        placeholder={t("register.emailPlaceholder")}
        size={size}
        error={!!errors.emailOrPhone}
        errorMessage={errors.emailOrPhone?.message}
      />
      <Button
        type="submit"
        variant={buttonVariant}
        block
        size={size || "lg"}
        loading={isLoading}
        label={t("register.sendOtp")}
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
      <p className="text-center text-sm auth-subtext">
        {t("register.haveAccount")}{" "}
        <Link to={loginPath} className="font-medium auth-link transition-colors">
          {t("register.signIn")}
        </Link>
      </p>
    </form>
  );
};

export default RegisterStep1;
