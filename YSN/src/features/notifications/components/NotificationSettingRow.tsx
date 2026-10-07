import { useTranslation } from "react-i18next";
import Switch from "../../../shared/components/buttons/Switch";
import { notificationTypeNames } from "../types/NotificationTypes.types";
import type { NotificationChannelKey, NotificationTypeSettingDto } from "../types/Notifications.types";

interface NotificationSettingRowProps {
  setting: NotificationTypeSettingDto;
  emailDisabled: boolean;
  onChange: (type: number, channel: NotificationChannelKey, enabled: boolean) => void;
}

const NotificationSettingRow = ({ setting, emailDisabled, onChange }: NotificationSettingRowProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[1fr_5.5rem_5.5rem] items-center gap-2 px-4 py-3">
      <span className="text-sm ce-heading">{t(`notificationTypes.${notificationTypeNames[setting.type]}.setting`)}</span>
      <div className="flex justify-center">
        <Switch checked={setting.systemEnabled} size="sm" onChange={(checked) => onChange(setting.type, "systemEnabled", checked)} />
      </div>
      <div className="flex justify-center">
        <Switch
          checked={setting.emailEnabled}
          size="sm"
          disabled={emailDisabled}
          onChange={(checked) => onChange(setting.type, "emailEnabled", checked)}
        />
      </div>
    </div>
  );
};

export default NotificationSettingRow;
