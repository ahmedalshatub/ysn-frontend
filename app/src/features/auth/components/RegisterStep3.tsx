import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCompleteRegistrationMutation } from "../api/Auth.api";
import type { LoginResponseDto } from "../types/Auth.types";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { isPasswordAutoGenerateEnabled } from "../../../shared/utils/passwordPolicy";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import Message from "../../../shared/components/feedback/Message";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import Button from "../../../shared/components/buttons/Button";

const MAX_IMAGE_MB = 10;

interface ProfileForm {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface RegisterStep3Props {
  emailOrPhone: string;
  registerToken: string;
  onSuccess: (result: LoginResponseDto) => void;
  onBack: () => void;
  buttonVariant?: "primary" | "secondary" | "dark" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

const RegisterStep3 = ({
  emailOrPhone,
  registerToken,
  onSuccess,
  onBack,
  buttonVariant = "primary",
  size,
}: RegisterStep3Props) => {
  const { t } = useTranslation();
  const autoGenerate = isPasswordAutoGenerateEnabled();
  const [completeRegistration, { isLoading }] = useCompleteRegistrationMutation();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Mirrors CompleteRegistrationDtoValidator on the API.
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t("register.usernameRequired"))
      .min(3, t("register.usernameMin3"))
      .max(50, t("register.usernameMax50")),
    firstName: yup
      .string()
      .required(t("register.firstNameRequired"))
      .min(2, t("register.firstNameMin2"))
      .max(50, t("register.firstNameMax50")),
    lastName: yup
      .string()
      .required(t("register.lastNameRequired"))
      .min(2, t("register.lastNameMin2"))
      .max(50, t("register.lastNameMax50")),
    phone: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .matches(/^\+?[1-9]\d{1,14}$/, {
        message: t("register.phoneInvalid"),
        excludeEmptyString: true,
      })
      .optional(),
    password: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("register.passwordRequired"))
          .min(8, t("register.passwordMin8"))
          .matches(/[A-Z]/, t("login.passwordMustContainUppercase"))
          .matches(/[a-z]/, t("login.passwordMustContainLowercase"))
          .matches(/[0-9]/, t("login.passwordMustContainDigit"))
          .matches(/[\W_]/, t("login.passwordMustContainSpecialCharacter")),
    confirmPassword: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("register.confirmPasswordRequired"))
          .oneOf([yup.ref("password")], t("register.passwordsDoNotMatch")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema) as Resolver<ProfileForm>,
    mode: "onBlur",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const result = await completeRegistration({
        registerToken,
        username: data.username,
        email: emailOrPhone,
        phone: data.phone || undefined,
        password: autoGenerate ? undefined : data.password,
        confirmPassword: autoGenerate ? undefined : data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage,
      }).unwrap();

      showSuccess(t("register.registerSuccess"));
      onSuccess(result);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <div className="flex justify-center">
        <AvatarUpload
          size={88}
          shape="circle"
          accept="image/*"
          maxSizeMB={MAX_IMAGE_MB}
          onChange={(file) => setProfileImage(file)}
          onError={(message) => showError(message)}
        />
      </div>

      <FormInput<ProfileForm>
        name="username"
        control={control}
        label={t("register.username")}
        placeholder={t("register.usernamePlaceholder")}
        size={size}
        error={!!errors.username}
        errorMessage={errors.username?.message}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput<ProfileForm>
          name="firstName"
          control={control}
          label={t("common.firstName")}
          placeholder={t("register.firstNamePlaceholder")}
          size={size}
          error={!!errors.firstName}
          errorMessage={errors.firstName?.message}
        />
        <FormInput<ProfileForm>
          name="lastName"
          control={control}
          label={t("common.lastName")}
          placeholder={t("register.lastNamePlaceholder")}
          size={size}
          error={!!errors.lastName}
          errorMessage={errors.lastName?.message}
        />
      </div>

      <FormInput<ProfileForm>
        name="phone"
        control={control}
        label={t("register.phoneOptional")}
        placeholder={t("register.phonePlaceholder")}
        size={size}
        error={!!errors.phone}
        errorMessage={errors.phone?.message}
      />

      {autoGenerate ? (
        <Message variant="info">{t("register.passwordWillBeEmailed")}</Message>
      ) : (
        <>
          <FormPasswordInput<ProfileForm>
            name="password"
            control={control}
            label={t("login.password")}
            placeholder={t("register.passwordPlaceholder")}
            size={size}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <FormPasswordInput<ProfileForm>
            name="confirmPassword"
            control={control}
            label={t("register.confirmPassword")}
            placeholder={t("register.confirmPasswordPlaceholder")}
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
        label={t("register.createAccount")}
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

export default RegisterStep3;
