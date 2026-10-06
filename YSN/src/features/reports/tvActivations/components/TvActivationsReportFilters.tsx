import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import {
  TvActivationsReportChannel,
  TvActivationsReportKind,
  TvActivationsReportStatus,
  tvActivationsReportChannelKeys,
  tvActivationsReportKindKeys,
  tvActivationsReportStatusKeys,
  type TvActivationsReportFilter,
} from "../types/TvActivationsReport.types";

interface TvActivationsReportFiltersProps {
  values: TvActivationsReportFilter;
  onChange: (name: keyof TvActivationsReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TvActivationsReportFilters = ({ values, onChange, onSearch, onClear }: TvActivationsReportFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));
  const kindOptions = Object.values(TvActivationsReportKind).map((kind) => ({ value: kind, name: t(tvActivationsReportKindKeys[kind]) }));
  const statusOptions = Object.values(TvActivationsReportStatus).map((status) => ({
    value: status,
    name: t(tvActivationsReportStatusKeys[status]),
  }));
  const channelOptions = Object.values(TvActivationsReportChannel).map((channel) => ({
    value: channel,
    name: t(tvActivationsReportChannelKeys[channel]),
  }));
  const sourceOptions = [
    { value: "false", name: t("reports.tvActivations.sourceCard") },
    { value: "true", name: t("reports.tvActivations.typedCode") },
  ];
  const needsCheckingOptions = [
    { value: "true", name: t("common.yes") },
    { value: "false", name: t("common.no") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Select
          name="cityId"
          label={t("reports.tvActivations.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => {
            onChange("cardCategoryId", cardCategoryId);
            onChange("cardTypeId", cardTypeId);
          }}
        />
        <Select
          name="isTypedCode"
          label={t("reports.tvActivations.source")}
          value={toSelectValue(values.isTypedCode)}
          onChange={(value) => onChange("isTypedCode", fromBooleanValue(String(value)))}
          options={sourceOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="kind"
          label={t("reports.tvActivations.kind")}
          value={toSelectValue(values.kind)}
          onChange={(value) => onChange("kind", fromNumberValue(String(value)))}
          options={kindOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="status"
          label={t("reports.tvActivations.status")}
          value={toSelectValue(values.status)}
          onChange={(value) => onChange("status", fromNumberValue(String(value)))}
          options={statusOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="needsChecking"
          label={t("reports.tvActivations.needsChecking")}
          value={toSelectValue(values.needsChecking)}
          onChange={(value) => onChange("needsChecking", fromBooleanValue(String(value)))}
          options={needsCheckingOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="channel"
          label={t("reports.tvActivations.channel")}
          value={toSelectValue(values.channel)}
          onChange={(value) => onChange("channel", fromNumberValue(String(value)))}
          options={channelOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.tvActivations.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.tvActivations.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="tvNumber"
          label={t("reports.tvActivations.tvNumber")}
          value={values.tvNumber || ""}
          onChange={(event) => onChange("tvNumber", event.target.value || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.tvActivations.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.tvActivations.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvActivationsReportFilters;
