import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import usePermission from "../../../../shared/hooks/usePermission";
import { Permission } from "../../../../shared/types/Permissions.types";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { useGetAllUsersQuery } from "../../../users/api/Users.api";
import type { MessagesReportFilter } from "../types/MessagesReport.types";

interface MessagesReportFiltersProps {
  values: MessagesReportFilter;
  onChange: (name: keyof MessagesReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const MessagesReportFilters = ({ values, onChange, onSearch, onClear }: MessagesReportFiltersProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });
  const canViewUsers = can(Permission.UsersView);
  const { data: users } = useGetAllUsersQuery({ isDeleted: false }, { skip: !canViewUsers, refetchOnMountOrArgChange: true });

  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const readOptions = [
    { value: "true", name: t("reports.messages.read") },
    { value: "false", name: t("reports.messages.unread") },
  ];
  const userOptions = useMemo(
    () => (users?.items ?? []).map((user) => ({ value: user.id, name: `${user.firstName} ${user.lastName}` })),
    [users]
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.messages.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Select
          name="customerRoleId"
          label={t("reports.messages.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.messages.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cities}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Input
          name="subject"
          label={t("reports.messages.subject")}
          value={values.subject || ""}
          onChange={(event) => onChange("subject", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="isRead"
          label={t("reports.messages.readStatus")}
          value={toSelectValue(values.isRead)}
          onChange={(value) => onChange("isRead", fromBooleanValue(String(value)))}
          options={readOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        {canViewUsers && (
          <Select
            name="createdBy"
            label={t("reports.messages.sender")}
            value={toSelectValue(values.createdBy)}
            onChange={(value) => onChange("createdBy", fromNumberValue(String(value)))}
            options={userOptions}
            valueKey="value"
            labelKey="name"
            placeholder={t("common.all")}
            searchable
            size="md"
          />
        )}
        <DatePicker
          label={t("reports.messages.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.messages.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default MessagesReportFilters;
