import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import Loader from "../../../shared/components/feedback/Loader";
import { useFileSrc } from "../../../shared/components/media/FileImage";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useUpdateProfileMutation } from "../../users/api/Users.api";
import { fullPhone, type UserDto } from "../../users/types/Users.types";

const MAX_IMAGE_MB = 5;

interface ProfileInfoTabProps {
  user?: UserDto;
  loading: boolean;
  onPhotoSaved: (imagePath: string | null) => void;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="profile-surface rounded-lg border px-4 py-3">
    <p className="profile-field-label text-xs font-medium uppercase tracking-wide">{label}</p>
    <div className="profile-field-value mt-1 text-sm font-semibold break-words">{children}</div>
  </div>
);

const ProfileInfoTab = ({ user, loading, onPhotoSaved }: ProfileInfoTabProps) => {
  const { t } = useTranslation();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();

  const currentSrc = useFileSrc(user?.profileImage);
  const [pending, setPending] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPending(null);
    setPreview("");
  }, [user?.profileImage]);

  const handleSave = async () => {
    if (!user || !pending) return;
    try {
      const updated = await updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        countryId: user.countryId,
        phoneNumber: user.phoneNumber ?? "",
        profileImage: pending,
      }).unwrap();

      showSuccess(t("profile.photoUpdated"));
      setPending(null);
      setPreview("");
      onPhotoSaved(updated?.profileImage ?? null);
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return (
    <div className="space-y-6">
      <div className="profile-surface flex flex-col items-center gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:gap-6">
        <AvatarUpload
          size={112}
          shape="circle"
          accept="image/*"
          maxSizeMB={MAX_IMAGE_MB}
          value={preview || currentSrc}
          onChange={(file, next) => {
            setPending(file);
            setPreview(next);
          }}
          onError={(message) => showError(message)}
        />

        <div className="min-w-0 flex-1 text-center sm:text-start">
          <h3 className="text-lg font-bold ce-heading break-words">{fullName || user.userName}</h3>
          <p className="mt-0.5 text-sm ce-muted break-words">{user.email}</p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Badge variant="info">{user.roleName ?? "-"}</Badge>
            <Badge variant={user.isActive ? "success" : "secondary"}>
              {user.isActive ? t("common.active") : t("common.inactive")}
            </Badge>
          </div>

          <p className="mt-3 text-xs ce-muted">{t("profile.photoHint")}</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          loading={isSaving}
          disabled={!pending}
          label={t("profile.savePhoto")}
          onClick={handleSave}
        />
      </div>

      <div>
        <div className="mb-3">
          <h3 className="text-base font-semibold ce-heading">{t("profile.accountInfo")}</h3>
          <p className="mt-0.5 text-xs ce-muted">{t("profile.readOnlyNotice")}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label={t("profile.userName")}>{user.userName}</Field>
          <Field label={t("common.email")}>{user.email}</Field>
          <Field label={t("common.phone")}><span dir="ltr">{fullPhone(user) || "-"}</span></Field>
          <Field label={t("common.firstName")}>{user.firstName || "-"}</Field>
          <Field label={t("common.lastName")}>{user.lastName || "-"}</Field>
          <Field label={t("profile.role")}>{user.roleName}</Field>
          <Field label={t("profile.lastLogin")}>
            {user.lastLoginAt
              ? new Date(user.lastLoginAt).toLocaleString("en-GB")
              : t("profile.never")}
          </Field>
          <Field label={t("profile.memberSince")}>
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB") : "-"}
          </Field>
          <Field label={t("common.status")}>
            <Badge variant={user.isActive ? "success" : "secondary"}>
              {user.isActive ? t("common.active") : t("common.inactive")}
            </Badge>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoTab;
