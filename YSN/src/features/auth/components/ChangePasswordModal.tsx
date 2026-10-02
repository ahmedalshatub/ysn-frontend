import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import FormModal from "../../../shared/components/modals/FormModal";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useChangePasswordMutation } from "../api/Auth.api";
import { clearForcePasswordChange } from "../slices/Auth.slice";
import type { ChangePasswordDto } from "../types/Auth.types";
import LockIcon from "../../../assets/icons/LockIcon";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  forced?: boolean;
}

const ChangePasswordModal = ({ open, onClose, onSuccess, forced }: ChangePasswordModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(t("changePassword.currentPasswordRequired")),
    newPassword: yup
      .string()
      .required(t("changePassword.newPasswordRequired"))
      .min(6, t("login.passwordMin6"))
      .matches(/[A-Z]/, t("login.passwordMustContainUppercase"))
      .matches(/[a-z]/, t("login.passwordMustContainLowercase"))
      .matches(/[0-9]/, t("login.passwordMustContainDigit"))
      .matches(/[^A-Za-z0-9]/, t("login.passwordMustContainSpecialCharacter"))
      .notOneOf([yup.ref("currentPassword")], t("changePassword.sameAsCurrent")),
    confirmPassword: yup
      .string()
      .required(t("changePassword.confirmPasswordRequired"))
      .oneOf([yup.ref("newPassword")], t("changePassword.passwordsDoNotMatch")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (open) reset({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }, [open, reset]);

  const onSubmit = async (data: ChangePasswordDto) => {
    try {
      await changePassword(data).unwrap();
      if (forced) dispatch(clearForcePasswordChange());
      showSuccess(t("changePassword.success"));
      onSuccess?.();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <FormModal
      open={open}
      onClose={forced ? () => {} : onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("changePassword.title")}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<LockIcon className="w-6 h-6" />}
      closable={!forced}
    >
      <div className="space-y-4">
        {forced && (
          <Message variant="warning">{t("changePassword.forcedMessage")}</Message>
        )}
        <FormPasswordInput<ChangePasswordDto>
          name="currentPassword"
          control={control}
          label={t("changePassword.currentPassword")}
          placeholder={t("changePassword.currentPasswordPlaceholder")}
          error={!!errors.currentPassword}
          errorMessage={errors.currentPassword?.message}
        />
        <FormPasswordInput<ChangePasswordDto>
          name="newPassword"
          control={control}
          label={t("changePassword.newPassword")}
          placeholder={t("changePassword.newPasswordPlaceholder")}
          error={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />
        <FormPasswordInput<ChangePasswordDto>
          name="confirmPassword"
          control={control}
          label={t("changePassword.confirmPassword")}
          placeholder={t("changePassword.confirmPasswordPlaceholder")}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
    </FormModal>
  );
};

export default ChangePasswordModal;
