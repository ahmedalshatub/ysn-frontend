import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormModal from "../../../shared/components/modals/FormModal";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { isPasswordAutoGenerateEnabled } from "../../../shared/utils/passwordPolicy";
import { useAdminChangePasswordMutation } from "../api/Users.api";
import type { User } from "../types/Users.types";
import LockIcon from "../../../assets/icons/LockIcon";

interface ResetForm {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const ResetPasswordModal = ({ open, user, onClose }: ResetPasswordModalProps) => {
  const { t } = useTranslation();
  const autoGenerate = isPasswordAutoGenerateEnabled();
  const [adminChangePassword, { isLoading }] = useAdminChangePasswordMutation();

  const schema = yup.object().shape({
    newPassword: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("login.passwordRequired"))
          .min(6, t("login.passwordMin6"))
          .matches(/[A-Z]/, t("login.passwordMustContainUppercase"))
          .matches(/[a-z]/, t("login.passwordMustContainLowercase"))
          .matches(/[0-9]/, t("login.passwordMustContainDigit"))
          .matches(/[^A-Za-z0-9]/, t("login.passwordMustContainSpecialCharacter")),
    confirmPassword: autoGenerate
      ? yup.string().optional()
      : yup
          .string()
          .required(t("changePassword.confirmPasswordRequired"))
          .oneOf([yup.ref("newPassword")], t("changePassword.passwordsDoNotMatch")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: yupResolver(schema) as Resolver<ResetForm>,
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (open) reset({ newPassword: "", confirmPassword: "" });
  }, [open, reset]);

  const onSubmit = async (data: ResetForm) => {
    if (!user) return;
    try {
      await adminChangePassword(
        autoGenerate
          ? { userId: user.id }
          : { userId: user.id, newPassword: data.newPassword, confirmPassword: data.confirmPassword },
      ).unwrap();
      showSuccess(t("usersPage.passwordReset"));
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  if (!user) return null;

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.userName;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={t("usersPage.resetPassword")}
      subtitle={t("usersPage.resetPasswordFor", { name })}
      submitText={t("common.save")}
      cancelText={t("common.cancel")}
      loading={isLoading}
      size="md"
      icon={<LockIcon className="h-6 w-6" />}
    >
      <div className="space-y-4">
        <Message variant="warning">
          {autoGenerate ? t("usersPage.resetPasswordWillBeEmailed") : t("usersPage.resetPasswordNotice")}
        </Message>
        {!autoGenerate && (
          <>
            <FormPasswordInput<ResetForm>
              name="newPassword"
              control={control}
              label={t("usersPage.newPassword")}
              error={!!errors.newPassword}
              errorMessage={errors.newPassword?.message}
            />
            <FormPasswordInput<ResetForm>
              name="confirmPassword"
              control={control}
              label={t("changePassword.confirmPassword")}
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          </>
        )}
      </div>
    </FormModal>
  );
};

export default ResetPasswordModal;
