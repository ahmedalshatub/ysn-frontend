import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomerSearchSelect from "../../customers/components/CustomerSearchSelect";

interface CardTakenByFilterProps {
  value?: number;
  onChange: (takenBy: number | undefined) => void;
}

const CardTakenByFilter = ({ value, onChange }: CardTakenByFilterProps) => {
  const { t } = useTranslation();
  const { control } = useForm<{ takenBy: number | null }>({ defaultValues: { takenBy: value ?? null } });

  return (
    <CustomerSearchSelect<{ takenBy: number | null }>
      name="takenBy"
      control={control}
      label={t("cards.takenBy")}
      onValueChange={(takenBy) => onChange(takenBy || undefined)}
    />
  );
};

export default CardTakenByFilter;
