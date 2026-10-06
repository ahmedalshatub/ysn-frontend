import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../../shared/components/navigation/FilterAccordion";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import DatePicker from "../../../../shared/components/inputs/DatePicker";
import useMyCities from "../../../../shared/hooks/useMyCities";
import { getYesNoFilterOptions } from "../../../../shared/utils/constants";
import { customerRoleConfigs, customerRoleList } from "../../../customers/types/Customers.types";
import { CardKind, cardKindKeys } from "../../../cardTypes/types/CardTypes.types";
import CardCategoryTypeSelects from "../../../cards/components/CardCategoryTypeSelects";
import TvCustomerFilter from "../tvs/TvCustomerFilter";
import {
  tvActivationChannelKeys,
  tvActivationChannelList,
  tvActivationSourceKeys,
  tvActivationSourceList,
  tvActivationStatusKeys,
  tvActivationStatusList,
  type TvActivationRequest,
} from "../../types/TvActivations.types";

interface TvActivationFiltersProps {
  values: TvActivationRequest;
  forTv: boolean;
  onChange: (changes: Partial<TvActivationRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: boolean | number | undefined) => (value === undefined ? "" : String(value));
const fromBooleanValue = (value: string) => (value === "" ? undefined : value === "true");
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const TvActivationFilters = ({ values, forTv, onChange, onSearch, onClear }: TvActivationFiltersProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const typeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const statusOptions = tvActivationStatusList.map((status) => ({ value: status, name: t(tvActivationStatusKeys[status]) }));
  const sourceOptions = tvActivationSourceList.map((source) => ({ value: source, name: t(tvActivationSourceKeys[source]) }));
  const channelOptions = tvActivationChannelList.map((channel) => ({ value: channel, name: t(tvActivationChannelKeys[channel]) }));
  const kindOptions = [CardKind.TvRegistration, CardKind.TvRenewal].map((kind) => ({ value: kind, name: t(cardKindKeys[kind]) }));

  const select = (name: keyof TvActivationRequest, label: string, options: { value: number | string; name: string }[], boolean = false) => (
    <Select
      name={name}
      label={label}
      value={toSelectValue(values[name] as boolean | number | undefined)}
      onChange={(value) => onChange({ [name]: boolean ? fromBooleanValue(String(value)) : fromNumberValue(String(value)) })}
      options={options}
      valueKey="value"
      labelKey="name"
      placeholder={t("common.all")}
      size="md"
    />
  );

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!forTv && (
          <>
            <Input
              name="tvNumber"
              label={t("tvs.tvNumber")}
              value={values.tvNumber || ""}
              onChange={(event) => onChange({ tvNumber: event.target.value })}
              size="md"
            />
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
          </>
        )}
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
        {select("roleId", t("customers.customerType"), typeOptions)}
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => onChange({ cardCategoryId, cardTypeId })}
        />
        {select("source", t("tvActivations.source"), sourceOptions)}
        {select("kind", t("tvActivations.kind"), kindOptions)}
        {select("status", t("common.status"), statusOptions)}
        {select("needsChecking", t("tvActivations.needsChecking"), getYesNoFilterOptions(t), true)}
        {select("channel", t("tvActivations.channel"), channelOptions)}
        <DatePicker
          label={t("tvActivations.createdFrom")}
          value={values.fromDate || ""}
          onChange={(date) => onChange({ fromDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvActivations.createdTo")}
          value={values.toDate || ""}
          onChange={(date) => onChange({ toDate: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvActivations.completedFrom")}
          value={values.completedFrom || ""}
          onChange={(date) => onChange({ completedFrom: date || undefined })}
          size="md"
        />
        <DatePicker
          label={t("tvActivations.completedTo")}
          value={values.completedTo || ""}
          onChange={(date) => onChange({ completedTo: date || undefined })}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default TvActivationFilters;
