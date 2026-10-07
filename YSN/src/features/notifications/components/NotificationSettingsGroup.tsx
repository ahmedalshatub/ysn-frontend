import { useTranslation } from "react-i18next";
import Switch from "../../../shared/components/buttons/Switch";
import NotificationSettingRow from "./NotificationSettingRow";
import type { NotificationChannelKey, NotificationTypeSettingDto } from "../types/Notifications.types";

interface NotificationSettingsGroupProps {
  groupKey: string;
  settings: NotificationTypeSettingDto[];
  emailDisabled: boolean;
  onChange: (type: number, channel: NotificationChannelKey, enabled: boolean) => void;
  onChangeAll: (types: number[], channel: NotificationChannelKey, enabled: boolean) => void;
}

const NotificationSettingsGroup = ({ groupKey, settings, emailDisabled, onChange, onChangeAll }: NotificationSettingsGroupProps) => {
  const { t } = useTranslation();
  const types = settings.map((setting) => setting.type);
  const allSystem = settings.every((setting) => setting.systemEnabled);
  const allEmail = settings.every((setting) => setting.emailEnabled);

  return (
    <div className="overflow-hidden rounded-lg border ce-divider">
      <div className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-2 border-b ce-divider px-4 py-3">
        <span className="text-sm font-semibold ce-heading">{t(`notifications.groups.${groupKey}`)}</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs ce-muted">{t("notifications.channelSystem")}</span>
          <Switch checked={allSystem} size="sm" onChange={(checked) => onChangeAll(types, "systemEnabled", checked)} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs ce-muted">{t("notifications.channelEmail")}</span>
          <Switch checked={allEmail} size="sm" disabled={emailDisabled} onChange={(checked) => onChangeAll(types, "emailEnabled", checked)} />
        </div>
      </div>
      <div className="divide-y ce-divider">
        {settings.map((setting) => (
          <NotificationSettingRow key={setting.type} setting={setting} emailDisabled={emailDisabled} onChange={onChange} />
        ))}
      </div>
    </div>
  );
};

export default NotificationSettingsGroup;
