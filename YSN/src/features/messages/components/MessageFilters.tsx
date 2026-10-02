import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../shared/hooks/useMyCities";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import { customerTypeConfigs, customerTypeList } from "../../customers/types/Customers.types";
import type { MessageRequest } from "../types/Messages.types";

interface MessageFiltersProps {
  values: MessageRequest;
  forRecipient: boolean;
  onChange: (name: keyof MessageRequest, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const MessageFilters = ({ values, forRecipient, onChange, onSearch, onClear }: MessageFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();

  const typeOptions = customerTypeList.map((type) => ({ value: type, name: t(customerTypeConfigs[type].pluralKey) }));
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const readOptions = [
    { value: "true", name: t("messages.read") },
    { value: "false", name: t("messages.unread") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="subject"
          label={t("messages.subject")}
          value={values.subject || ""}
          onChange={(event) => onChange("subject", event.target.value)}
          size="md"
        />
        <Input
          name="content"
          label={t("messages.content")}
          value={values.content || ""}
          onChange={(event) => onChange("content", event.target.value)}
          size="md"
        />
        {!forRecipient && (
          <>
            <Input
              name="name"
              label={t("messages.customer")}
              value={values.name || ""}
              onChange={(event) => onChange("name", event.target.value)}
              size="md"
            />
            <Input
              name="phoneNumber"
              label={t("customers.phoneNumber")}
              value={values.phoneNumber || ""}
              onChange={(event) => onChange("phoneNumber", event.target.value)}
              size="md"
            />
            <Select
              name="userType"
              label={t("messages.customerType")}
              value={toSelectValue(values.userType)}
              onChange={(value) => onChange("userType", fromNumberValue(String(value)))}
              options={typeOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
            <Select
              name="cityId"
              label={t("messages.city")}
              value={toSelectValue(values.cityId)}
              onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
              options={cityOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              searchable
              size="md"
            />
          </>
        )}
        <Select
          name="isRead"
          label={t("messages.readStatus")}
          value={toSelectValue(values.isRead)}
          onChange={(value) => onChange("isRead", fromBooleanValue(String(value)))}
          options={readOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("common.status")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange("isDeleted", fromBooleanValue(String(value)))}
          options={getStatusFilterOptions(t)}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("messages.sentFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("messages.sentTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default MessageFilters;
