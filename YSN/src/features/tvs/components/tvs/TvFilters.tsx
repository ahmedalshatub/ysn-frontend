import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import TvCustomerFilter from "./TvCustomerFilter";
import type { CustomerTvRequest } from "../../types/Tvs.types";

interface TvFiltersProps {
  values: CustomerTvRequest;
  forCustomer: boolean;
  onChange: (changes: Partial<CustomerTvRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TvFilters = ({ values, forCustomer, onChange, onSearch, onClear }: TvFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const typeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const subscriptionOptions = [
    { value: "true", name: t("tvs.subscriptionActive") },
    { value: "false", name: t("tvs.subscriptionEndedOrUnknown") },
  ];
  const linkOptions = [
    { value: "false", name: t("tvs.linked") },
    { value: "true", name: t("tvs.removed") },
  ];

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          name="tvNumber"
          label={t("tvs.tvNumber")}
          value={values.tvNumber || ""}
          onChange={(event) => onChange({ tvNumber: event.target.value })}
          size="md"
        />
        <Input
          name="nickname"
          label={t("tvs.nickname")}
          value={values.nickname || ""}
          onChange={(event) => onChange({ nickname: event.target.value })}
          size="md"
        />
        {!forCustomer && (
          <>
            <TvCustomerFilter
              key={values.userId === undefined ? "empty" : "chosen"}
              value={values.userId}
              onChange={(userId) => onChange({ userId })}
            />
            <Input
              name="customerName"
              label={t("tvs.customerName")}
              value={values.customerName || ""}
              onChange={(event) => onChange({ customerName: event.target.value })}
              size="md"
            />
            <Input
              name="phoneNumber"
              label={t("customers.phoneNumber")}
              value={values.phoneNumber || ""}
              onChange={(event) => onChange({ phoneNumber: event.target.value })}
              size="md"
            />
            <Select
              name="roleId"
              label={t("customers.customerType")}
              value={toSelectValue(values.roleId)}
              onChange={(value) => onChange({ roleId: fromNumberValue(String(value)) })}
              options={typeOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
          </>
        )}
        <Select
          name="cityId"
          label={t("tvs.city")}
          value={toSelectValue(values.cityId)}
          onChange={(value) => onChange({ cityId: fromNumberValue(String(value)) })}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          searchable
          size="md"
        />
        <Select
          name="isSubscriptionActive"
          label={t("tvs.subscription")}
          value={toSelectValue(values.isSubscriptionActive)}
          onChange={(value) => onChange({ isSubscriptionActive: fromBooleanValue(String(value)) })}
          options={subscriptionOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <Select
          name="isDeleted"
          label={t("common.status")}
          value={toSelectValue(values.isDeleted)}
          onChange={(value) => onChange({ isDeleted: fromBooleanValue(String(value)) })}
          options={linkOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
        <DatePicker
          label={t("tvs.endsFrom")}
          value={values.subscriptionEndsFrom || ""}
          onChange={(date) => onChange({ subscriptionEndsFrom: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvs.endsTo")}
          value={values.subscriptionEndsTo || ""}
          onChange={(date) => onChange({ subscriptionEndsTo: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvs.addedFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange({ fromDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvs.addedTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange({ toDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvs.removedFrom")}
          value={values.removedFrom || ""}
          onChange={(date) => onChange({ removedFrom: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvs.removedTo")}
          value={values.removedTo || ""}
          onChange={(date) => onChange({ removedTo: date || undefined })}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvFilters;
