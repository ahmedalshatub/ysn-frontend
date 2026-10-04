import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import FormInput from "../../../shared/components/inputs/FormInput";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import Loader from "../../../shared/components/feedback/Loader";
import Message from "../../../shared/components/feedback/Message";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { DataLanguage } from "../../../shared/types/DataLanguage.types";
import ShieldIcon from "../../../assets/icons/ShieldIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import FormSection from "../../../shared/components/forms/FormSection";
import CheckIcon from "../../../assets/icons/CheckIcon";
import XIcon from "../../../assets/icons/XIcon";
import { useAddRoleMutation, useGetPermissionsQuery, useGetRoleQuery, useUpdateRoleMutation } from "../api/Roles.api";
import PermissionsMatrix from "../components/PermissionsMatrix";
import { roleSchema, type RoleFormValues } from "../validation/Roles.validation";
import type { AddRoleDto } from "../types/Roles.types";

const emptyValues: RoleFormValues = {
  isActive: true,
  translations: [
    { languageCode: DataLanguage.Arabic, name: "", description: "" },
    { languageCode: DataLanguage.English, name: "", description: "" },
  ],
  permissionIds: [],
};

const RoleFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const roleId = id ? Number(id) : null;
  const isEdit = roleId !== null;
  useTitle(isEdit ? t("roles.editRole") : t("roles.addRole"));

  const { data: role, isLoading: isLoadingRole } = useGetRoleQuery(roleId as number, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  });
  const { data: permissions, isLoading: isLoadingPermissions } = useGetPermissionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [addRole, { isLoading: isAdding }] = useAddRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: yupResolver(roleSchema) as never,
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!isEdit || !role) return;
    const arabic = role.translations.find((translation) => translation.languageCode === DataLanguage.Arabic);
    const english = role.translations.find((translation) => translation.languageCode === DataLanguage.English);
    reset({
      isActive: role.isActive,
      translations: [
        { languageCode: DataLanguage.Arabic, name: arabic?.name || "", description: arabic?.description || "" },
        { languageCode: DataLanguage.English, name: english?.name || "", description: english?.description || "" },
      ],
      permissionIds: role.permissionIds,
    });
  }, [isEdit, role, reset]);

  const isLocked = !!role?.isSystem;

  const onSubmit = async (values: RoleFormValues) => {
    const data: AddRoleDto = {
      isActive: values.isActive,
      translations: (values.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode as AddRoleDto["translations"][number]["languageCode"],
        name: translation.name.trim(),
        description: translation.description?.trim() || null,
      })),
      permissionIds: values.permissionIds,
    };

    try {
      if (isEdit && roleId !== null) {
        await updateRole({ id: roleId, data }).unwrap();
        showSuccess(t("roles.successUpdate"));
      } else {
        await addRole(data).unwrap();
        showSuccess(t("roles.successCreate"));
      }
      navigate("/roles");
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  const fieldError = (message?: string) => (message ? t(message) : "");
  const saving = isAdding || isUpdating;

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={isEdit ? t("roles.editRole") : t("roles.addRole")}
        items={[
          { label: t("sidebar.homePage") },
          { label: t("sidebar.administration") },
          { label: t("roles.pageTitle") },
          { label: isEdit ? t("roles.editRole") : t("roles.addRole") },
        ]}
        variant="gradient"
        icon={<ShieldIcon />}
        animated
      />

      {(isLoadingRole || isLoadingPermissions) && (
        <div className="flex justify-center py-16">
          <Loader variant="spinner" size="lg" />
        </div>
      )}

      {!isLoadingRole && !isLoadingPermissions && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isLocked && <Message variant="warning">{t("roles.systemRoleLocked")}</Message>}

          <Card variant="elevated" padding="lg">
            <div className="space-y-8">
              <FormSection icon={<GlobeIcon />} title={t("common.arabicTranslation")}>
                <FormInput<RoleFormValues>
                  name="translations.0.name"
                  control={control}
                  label={`${t("roles.nameArabic")} *`}
                  disabledStatus={isLocked}
                  error={!!errors.translations?.[0]?.name}
                  errorMessage={fieldError(errors.translations?.[0]?.name?.message)}
                />
                <FormTextArea<RoleFormValues>
                  name="translations.0.description"
                  control={control}
                  label={t("roles.descriptionArabic")}
                  rows={3}
                  error={!!errors.translations?.[0]?.description}
                  errorMessage={fieldError(errors.translations?.[0]?.description?.message)}
                />
              </FormSection>
              <FormSection icon={<GlobeIcon />} title={t("common.englishTranslation")}>
                <FormInput<RoleFormValues>
                  name="translations.1.name"
                  control={control}
                  label={`${t("roles.nameEnglish")} *`}
                  disabledStatus={isLocked}
                  error={!!errors.translations?.[1]?.name}
                  errorMessage={fieldError(errors.translations?.[1]?.name?.message)}
                />
                <FormTextArea<RoleFormValues>
                  name="translations.1.description"
                  control={control}
                  label={t("roles.descriptionEnglish")}
                  rows={3}
                  error={!!errors.translations?.[1]?.description}
                  errorMessage={fieldError(errors.translations?.[1]?.description?.message)}
                />
              </FormSection>
              <FormSection icon={<InfoIcon />} title={t("roles.details")}>
                <FormCheckbox<RoleFormValues>
                  name="isActive"
                  control={control}
                  label={t("roles.isActive")}
                  description={t("roles.isActiveHint")}
                  disabledStatus={isLocked}
                />
              </FormSection>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <div className="form-section-title mb-4">
              <ShieldIcon className="h-4 w-4 text-primary" />
              <h3>{t("roles.permissions")}</h3>
            </div>
            <Controller
              name="permissionIds"
              control={control}
              render={({ field }) => (
                <PermissionsMatrix
                  permissions={permissions ?? []}
                  value={isLocked ? (permissions ?? []).map((permission) => permission.id) : field.value ?? []}
                  onChange={field.onChange}
                  disabled={isLocked}
                  error={fieldError(errors.permissionIds?.message)}
                />
              )}
            />
          </Card>

          <Card variant="elevated" padding="md">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                icon={<XIcon />}
                onClick={() => navigate("/roles")}
                disabled={saving}
                label={t("common.cancel")}
              />
              {!isLocked && (
                <Button
                  type="submit"
                  variant="primary"
                  icon={<CheckIcon />}
                  loading={saving}
                  label={isEdit ? t("common.save") : t("common.add")}
                />
              )}
            </div>
          </Card>
        </form>
      )}
    </div>
  );
};

export default RoleFormPage;
