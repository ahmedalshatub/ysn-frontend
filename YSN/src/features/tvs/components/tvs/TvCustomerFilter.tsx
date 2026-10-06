import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomerSearchSelect from "../../../customers/components/CustomerSearchSelect";

interface TvCustomerFilterProps {
  value?: number;
  onChange: (userId: number | undefined) => void;
}

const TvCustomerFilter = ({ value, onChange }: TvCustomerFilterProps) => {
  const { t } = useTranslation();
  const { control } = useForm<{ userId: number | null }>({ defaultValues: { userId: value ?? null } });

  return (
    <CustomerSearchSelect<{ userId: number | null }>
      name="userId"
      control={control}
      label={t("tvs.customer")}
      onValueChange={(userId) => onChange(userId || undefined)}
    />
  );
};

export default TvCustomerFilter;
