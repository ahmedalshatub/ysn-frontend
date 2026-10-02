import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import { messageTargetKeys, type MessageTargetValue } from "../types/Messages.types";

interface MessageAudienceSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  audiences: MessageTargetValue[];
}

const MessageAudienceSelect = <T extends FieldValues>({ name, control, audiences }: MessageAudienceSelectProps<T>) => {
  const { t } = useTranslation();
  const options = audiences.map((target) => ({ value: target, name: t(messageTargetKeys[target]) }));

  return (
    <FormSelect<T>
      name={name}
      control={control}
      label={`${t("messages.audience")} *`}
      options={options}
      valueKey="value"
      labelKey="name"
    />
  );
};

export default MessageAudienceSelect;
