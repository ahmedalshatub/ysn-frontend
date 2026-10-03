import { useTranslation } from "react-i18next";
import Select from "../../../shared/components/inputs/Select";
import Input from "../../../shared/components/inputs/Input";
import { DiscountType, discountTypeKeys, type DiscountTypeValue } from "../types/CardTypeDiscounts.types";

interface DiscountValueFieldsProps {
  type: DiscountTypeValue;
  value: number | undefined;
  allowNone: boolean;
  error?: string;
  onChange: (type: DiscountTypeValue, value: number | undefined) => void;
}

const DiscountValueFields = ({ type, value, allowNone, error, onChange }: DiscountValueFieldsProps) => {
  const { t } = useTranslation();
  const options = Object.values(DiscountType)
    .filter((item) => allowNone || item !== DiscountType.None)
    .map((item) => ({ value: item, name: t(discountTypeKeys[item]) }));

  return (
    <>
      <Select
        name="discountType"
        label={t("discounts.type")}
        value={type}
        onChange={(next) => onChange(Number(next) as DiscountTypeValue, Number(next) === DiscountType.None ? undefined : value)}
        options={options}
        valueKey="value"
        labelKey="name"
        size="md"
      />
      {type !== DiscountType.None && (
        <Input
          name="discountValue"
          type="number"
          label={type === DiscountType.Percent ? t("discounts.percentValue") : t("discounts.fixedValue")}
          value={value ?? ""}
          onChange={(event) => onChange(type, event.target.value === "" ? undefined : Number(event.target.value))}
          error={!!error}
          errorMessage={error}
          size="md"
        />
      )}
    </>
  );
};

export default DiscountValueFields;
