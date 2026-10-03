import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import Button from "../../../shared/components/buttons/Button";
import Loader from "../../../shared/components/feedback/Loader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useGetNotificationSettingsQuery, useUpdateNotificationSettingsMutation } from "../api/Notifications.api";
import { notificationTypeNames } from "../types/NotificationTypes.types";

const NotificationSettings = () => {
  const { t } = useTranslation();
  const { data: settings, isLoading } = useGetNotificationSettingsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateSettings, { isLoading: isSaving }] = useUpdateNotificationSettingsMutation();
  const [disabled, setDisabled] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (settings) setDisabled(new Set(settings.filter((setting) => !setting.isEnabled).map((setting) => setting.type)));
  }, [settings]);

  const toggle = (type: number, enabled: boolean) =>
    setDisabled((previous) => {
      const next = new Set(previous);
      if (enabled) next.delete(type);
      else next.add(type);
      return next;
    });

  const save = async () => {
    try {
      await updateSettings({ disabledTypes: [...disabled] }).unwrap();
      showSuccess(t("notifications.settingsSaved"));
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <p className="text-sm ce-muted">{t("notifications.settingsHint")}</p>
      <div className="space-y-3">
        {(settings ?? []).map((setting) => (
          <Checkbox
            key={setting.type}
            checked={!disabled.has(setting.type)}
            onChange={(checked) => toggle(setting.type, checked)}
            label={t(`notificationTypes.${notificationTypeNames[setting.type]}.setting`)}
          />
        ))}
      </div>
      <Button variant="primary" size="sm" block loading={isSaving} label={t("common.save")} onClick={save} />
    </div>
  );
};

export default NotificationSettings;
