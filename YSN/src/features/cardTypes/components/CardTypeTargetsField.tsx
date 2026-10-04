import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import { customerRoleConfigs, customerRoleList } from "../../customers/types/Customers.types";

interface CardTypeTargetsFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
  onChanged: (targets: number[]) => void;
}

const CardTypeTargetsField = <T extends FieldValues>({ name, control, errorMessage, onChanged }: CardTypeTargetsFieldProps<T>) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="mb-2 text-sm font-medium">{`${t("cardTypes.targets")} *`}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value: number[] = field.value ?? [];
          return (
            <div className="flex flex-wrap gap-5">
              {customerRoleList.map((type) => (
                <Checkbox
                  key={type}
                  checked={value.includes(type)}
                  onChange={(checked) => {
                    const next = checked ? [...value, type].sort() : value.filter((item) => item !== type);
                    field.onChange(next);
                    onChanged(next);
                  }}
                  label={t(customerRoleConfigs[type].pluralKey)}
                />
              ))}
            </div>
          );
        }}
      />
      {errorMessage && <p className="permissions-matrix-error mt-1">{errorMessage}</p>}
    </div>
  );
};

export default CardTypeTargetsField;
