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
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { CardKind, cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import type { CardsSoldReportFilter } from "../types/CardsSoldReport.types";

interface CardsSoldReportFiltersProps {
  values: CardsSoldReportFilter;
  onChange: (name: keyof CardsSoldReportFilter, value: unknown) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardsSoldReportFilters = ({ values, onChange, onSearch, onClear }: CardsSoldReportFiltersProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const { cities } = useMyCities();
  const { control } = useForm<{ customerId: number | null }>({ defaultValues: { customerId: values.customerId ?? null } });

  const kindOptions = Object.values(CardKind).map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));
  const roleOptions = customerRoleList.map((role) => ({ value: role, name: t(customerRoleConfigs[role].pluralKey) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => {
            onChange("cardCategoryId", cardCategoryId);
            onChange("cardTypeId", cardTypeId);
          }}
        />
        <Select
          name="kind"
          label={t("reports.cardsSold.kind")}
          value={toSelectValue(values.kind)}
          onChange={(value) => onChange("kind", fromNumberValue(String(value)))}
          options={kindOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="cityId"
          label={t("reports.cardsSold.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange("cityId", fromNumberValue(String(value)))}
          options={cities}
          valueKey="id"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <CustomerSearchSelect<{ customerId: number | null }>
          name="customerId"
          control={control}
          label={t("reports.cardsSold.customer")}
          onValueChange={(customerId) => onChange("customerId", customerId || undefined)}
        />
        <Input
          name="customerName"
          label={t("reports.cardsSold.customerName")}
          value={values.customerName || ""}
          onChange={(event) => onChange("customerName", event.target.value || undefined)}
          size="md"
        />
        <Select
          name="customerRoleId"
          label={t("reports.cardsSold.customerRole")}
          value={toSelectValue(values.customerRoleId)}
          onChange={(value) => onChange("customerRoleId", fromNumberValue(String(value)))}
          options={roleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Input
          name="invoiceId"
          type="number"
          label={t("reports.cardsSold.invoiceId")}
          value={values.invoiceId ?? ""}
          onChange={(event) => onChange("invoiceId", fromNumberValue(event.target.value))}
          size="md"
        />
        {can(Permission.CardsViewSerial) && (
          <Input
            name="serialNumber"
            label={t("reports.cardsSold.serialNumber")}
            value={values.serialNumber || ""}
            onChange={(event) => onChange("serialNumber", event.target.value || undefined)}
            size="md"
          />
        )}
        <DatePicker
          label={t("reports.cardsSold.fromDate")}
          value={values.fromDate || ""}
          onChange={(date) => onChange("fromDate", date || undefined)}
          size="md"
        />
        <DatePicker
          label={t("reports.cardsSold.toDate")}
          value={values.toDate || ""}
          onChange={(date) => onChange("toDate", date || undefined)}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardsSoldReportFilters;
