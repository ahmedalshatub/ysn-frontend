import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import Loader from "../../../shared/components/feedback/Loader";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useGetNotificationSettingsQuery, useUpdateNotificationSettingsMutation } from "../api/Notifications.api";
import { notificationSettingGroups } from "../types/NotificationTypes.types";
import NotificationSettingsGroup from "./NotificationSettingsGroup";
import type { EmailLanguage, NotificationChannelKey, NotificationTypeSettingDto } from "../types/Notifications.types";

const NotificationSettings = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetNotificationSettingsQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateSettings, { isLoading: isSaving }] = useUpdateNotificationSettingsMutation();
  const [types, setTypes] = useState<NotificationTypeSettingDto[]>([]);
  const [emailLanguage, setEmailLanguage] = useState<EmailLanguage>("ar");

  useEffect(() => {
    if (!data) return;
    setTypes(Array.isArray(data.types) ? data.types : []);
    setEmailLanguage(data.emailLanguage === "en" ? "en" : "ar");
  }, [data]);

  const change = (changed: number[], channel: NotificationChannelKey, enabled: boolean) =>
    setTypes((previous) => previous.map((setting) => (changed.includes(setting.type) ? { ...setting, [channel]: enabled } : setting)));

  const save = async () => {
    try {
      await updateSettings({ emailLanguage, types }).unwrap();
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

  const emailDisabled = !data?.hasEmail;

  return (
    <div className="space-y-5">
      <p className="text-sm ce-muted">{t("notifications.settingsHint")}</p>

      <div className="grid gap-4 rounded-lg border ce-divider p-4 md:grid-cols-2">
        <Select
          label={t("notifications.emailLanguage")}
          value={emailLanguage}
          onChange={(value) => setEmailLanguage(value as EmailLanguage)}
          options={[
            { value: "ar", label: t("navbar.arabic") },
            { value: "en", label: t("navbar.english") },
          ]}
          disabled={emailDisabled}
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm ce-muted">{t("notifications.emailAddress")}</span>
          <span className="text-sm font-medium ce-heading">{data?.email || t("notifications.noEmail")}</span>
        </div>
      </div>

      {notificationSettingGroups.map((group) => {
        const settings = types.filter((setting) => group.types.includes(setting.type));
        if (settings.length === 0) return null;
        return (
          <NotificationSettingsGroup
            key={group.key}
            groupKey={group.key}
            settings={settings}
            emailDisabled={emailDisabled}
            onChange={(type, channel, enabled) => change([type], channel, enabled)}
            onChangeAll={change}
          />
        );
      })}

      <div className="flex justify-end">
        <Button variant="primary" loading={isSaving} label={t("common.save")} onClick={save} />
      </div>
    </div>
  );
};

export default NotificationSettings;
