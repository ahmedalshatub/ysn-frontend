import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import FormModal from "../../../shared/components/modals/FormModal";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormPasswordInput from "../../../shared/components/inputs/FormPasswordInput";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { isPasswordAutoGenerateEnabled } from "../../../shared/utils/passwordPolicy";
import {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../api/Users.api";
import { UserRole } from "../../auth/types/Roles.types";
import UsersIcon from "../../../assets/icons/UsersIcon";

const MAX_IMAGE_MB = 5;

interface UserForm {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roleId: number;
  isActive: boolean;
  password: string;
}

interface UserModalProps {
  open: boolean;
  userId: number | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const UserModal = ({ open, userId, onClose, onSuccess }: UserModalProps) => {
  const { t } = useTranslation();
  const isEdit = userId !== null;
  const autoGenerate = isPasswordAutoGenerateEnabled();

  const { data: user } = useGetUserByIdQuery(String(userId), {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const currentSrc = useFileSrc(user?.profileImage);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().required(t("common.requiredField")).min(3, t("register.usernameMin3")),
    email: yup.string().required(t("common.requiredField")).email(t("register.emailInvalid")),
    firstName: yup.string().required(t("common.requiredField")),
    lastName: yup.string().required(t("common.requiredField")),
    phone: yup
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .matches(/^\+?[1-9]\d{1,14}$/, {
        message: t("register.phoneInvalid"),
        excludeEmptyString: true,
      })
      .optional(),
    roleId: yup.number().required(t("common.requiredField")),
    isActive: yup.boolean().required(),
    password: isEdit || autoGenerate
      ? yup.string().default("")
      : yup
          .string()
          .required(t("login.passwordRequired"))
          .min(6, t("login.passwordMin6"))
          .matches(/[A-Z]/, t("login.passwordMustContainUppercase"))
          .matches(/[a-z]/, t("login.passwordMustContainLowercase"))
          .matches(/[0-9]/, t("login.passwordMustContainDigit"))
          .matches(/[^A-Za-z0-9]/, t("login.passwordMustContainSpecialCharacter")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(schema) as Resolver<UserForm>,
    mode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      roleId: UserRole.User,
      isActive: true,
      password: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    setImage(null);
    setPreview("");
    reset(
      isEdit && user
        ? {
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone ?? "",
            roleId: user.roleId,
            isActive: user.isActive,
            password: "",
          }
        : {
            userName: "",
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            roleId: UserRole.User,
            isActive: true,
            password: "",
          }
    );
  }, [open, isEdit, user, reset]);

  const onSubmit = async (data: UserForm) => {
    try {
      if (isEdit && userId !== null) {
        await updateUser({
          id: userId,
          userName: data.userName,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone ?? "",
          isActive: data.isActive,
          roleId: Number(data.roleId),
          lastLoginAt: user?.lastLoginAt,
          profileImage: image ?? undefined,
        }).unwrap();
        showSuccess(t("usersPage.successUpdate"));
      } else {
        await createUser({
          userName: data.userName,
          email: data.email,
          password: autoGenerate ? undefined : data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phone ?? "",
          isActive: data.isActive,
          roleId: Number(data.roleId),
          profileImage: image ?? undefined,
        }).unwrap();
        showSuccess(t("usersPage.successCreate"));
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const roleOptions = [
    { value: UserRole.SuperAdmin, name: t("roles.superAdmin") },
    { value: UserRole.Admin, name: t("roles.admin") },
    { value: UserRole.User, name: t("roles.user") },
  ];

  return (
    <FormModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={isEdit ? t("usersPage.editUser") : t("usersPage.addUser")}
      submitText={isEdit ? t("common.save") : t("common.add")}
      cancelText={t("common.cancel")}
      loading={isCreating || isUpdating}
      size="lg"
      icon={<UsersIcon className="h-6 w-6" />}
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <AvatarUpload
            size={96}
            shape="circle"
            accept="image/*"
            maxSizeMB={MAX_IMAGE_MB}
            value={preview || currentSrc}
            onChange={(file, next) => {
              setImage(file);
              setPreview(next);
            }}
            onError={(message) => showError(message)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput<UserForm>
            name="userName"
            control={control}
            label={t("profile.userName")}
            error={!!errors.userName}
            errorMessage={errors.userName?.message}
          />
          <FormInput<UserForm>
            name="email"
            control={control}
            label={t("common.email")}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <FormInput<UserForm>
            name="firstName"
            control={control}
            label={t("common.firstName")}
            error={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <FormInput<UserForm>
            name="lastName"
            control={control}
            label={t("common.lastName")}
            error={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
          <FormInput<UserForm>
            name="phone"
            control={control}
            label={t("common.phone")}
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
          <FormSelect<UserForm>
            name="roleId"
            control={control}
            label={t("profile.role")}
            options={roleOptions}
            valueKey="value"
            labelKey="name"
            error={!!errors.roleId}
            errorMessage={errors.roleId?.message}
          />
        </div>

        {!isEdit && autoGenerate && (
          <Message variant="info">{t("usersPage.passwordWillBeEmailed")}</Message>
        )}
        {!isEdit && !autoGenerate && (
          <FormPasswordInput<UserForm>
            name="password"
            control={control}
            label={t("login.password")}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}

        <FormCheckbox<UserForm> name="isActive" control={control} label={t("common.active")} />
      </div>
    </FormModal>
  );
};

export default UserModal;
