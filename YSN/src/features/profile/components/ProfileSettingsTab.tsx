import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import ChangePasswordModal from "../../auth/components/ChangePasswordModal";
import LockIcon from "../../../assets/icons/LockIcon";

const ProfileSettingsTab = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <h3 className="mb-4 text-base font-semibold ce-heading">{t("profile.security")}</h3>

      <div className="flex items-center justify-between gap-4 rounded-lg border ce-divider px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-medium ce-heading">{t("changePassword.title")}</p>
          <p className="mt-0.5 text-xs ce-muted">{t("profile.changePasswordHint")}</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<LockIcon className="h-4 w-4" />}
          label={t("changePassword.title")}
          onClick={() => setOpen(true)}
        />
      </div>

      <ChangePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ProfileSettingsTab;
