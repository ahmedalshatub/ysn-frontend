import { useTranslation } from "react-i18next";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import { customerRoleConfigs, customerRoleList } from "../../customers/types/Customers.types";
import CardCategoryTypeSelects from "../../cards/components/CardCategoryTypeSelects";
import { DiscountType, discountTypeKeys, type CardTypeDiscountRequest } from "../types/CardTypeDiscounts.types";

interface CardTypeDiscountFiltersProps {
  values: CardTypeDiscountRequest;
  forCustomer: boolean;
  onChange: (changes: Partial<CardTypeDiscountRequest>) => void;
  onSearch: () => void;
  onClear: () => void;
}

const toSelectValue = (value: number | undefined) => (value === undefined ? "" : String(value));
const fromNumberValue = (value: string) => (value === "" ? undefined : Number(value));

const CardTypeDiscountFilters = ({ values, forCustomer, onChange, onSearch, onClear }: CardTypeDiscountFiltersProps) => {
  const { t } = useTranslation();
  const typeOptions = customerRoleList.map((type) => ({ value: type, name: t(customerRoleConfigs[type].pluralKey) }));
  const discountOptions = [DiscountType.Percent, DiscountType.Fixed].map((type) => ({ value: type, name: t(discountTypeKeys[type]) }));

  return (
    <FilterAccordion onSearch={onSearch} onClear={onClear}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!forCustomer && (
          <>
            <Input
              name="customerName"
              label={t("invoices.customer")}
              value={values.customerName || ""}
              onChange={(event) => onChange({ customerName: event.target.value })}
              size="md"
            />
            <Input
              name="customerPhone"
              label={t("customers.phoneNumber")}
              value={values.customerPhone || ""}
              onChange={(event) => onChange({ customerPhone: event.target.value })}
              size="md"
            />
            <Select
              name="customerRoleId"
              label={t("customers.customerType")}
              value={toSelectValue(values.customerRoleId)}
              onChange={(value) => onChange({ customerRoleId: fromNumberValue(String(value)) })}
              options={typeOptions}
              valueKey="value"
              labelKey="name"
              placeholder={t("common.all")}
              size="md"
            />
          </>
        )}
        <CardCategoryTypeSelects
          categoryId={values.cardCategoryId}
          cardTypeId={values.cardTypeId}
          onChange={(cardCategoryId, cardTypeId) => onChange({ cardCategoryId, cardTypeId })}
        />
        <Select
          name="discountType"
          label={t("discounts.type")}
          value={toSelectValue(values.discountType)}
          onChange={(value) => onChange({ discountType: fromNumberValue(String(value)) })}
          options={discountOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="md"
        />
      </div>
    </FilterAccordion>
  );
};

export default CardTypeDiscountFilters;
