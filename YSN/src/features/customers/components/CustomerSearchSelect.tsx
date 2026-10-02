import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
import Input from "../../../shared/components/inputs/Input";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import { useGetCustomersQuery } from "../api/Customers.api";
import { customerFullName, customerPhone, customerTypeConfigs, type CustomerListDto } from "../types/Customers.types";

interface CustomerSearchSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  initialCustomer?: CustomerListDto | null;
  userType?: number;
  error?: boolean;
  errorMessage?: string;
}

const MIN_SEARCH_LENGTH = 2;

const CustomerSearchSelect = <T extends FieldValues>({
  name,
  control,
  label,
  initialCustomer,
  userType,
  error,
  errorMessage,
}: CustomerSearchSelectProps<T>) => {
  const { t } = useTranslation();
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(term.trim()), 400);
    return () => clearTimeout(timer);
  }, [term]);

  const isPhone = /^[+0-9 ]+$/.test(debouncedTerm);
  const { data, isFetching } = useGetCustomersQuery(
    {
      name: isPhone ? undefined : debouncedTerm,
      phoneNumber: isPhone ? debouncedTerm.replace(/^\+?964|^0/, "") : undefined,
      userType,
      isActive: true,
      isDeleted: false,
      sortBy: "firstName",
      isAscending: true,
    },
    { skip: debouncedTerm.length < MIN_SEARCH_LENGTH, refetchOnMountOrArgChange: true }
  );

  const options = useMemo(() => {
    const customers = [...(data?.items ?? [])];
    if (initialCustomer && !customers.some((customer) => customer.id === initialCustomer.id)) customers.unshift(initialCustomer);
    return customers.map((customer) => ({
      value: customer.id,
      name: `${customerFullName(customer)} - ${t(customerTypeConfigs[customer.userType].labelKey)} (${customerPhone(customer)})`,
    }));
  }, [data, initialCustomer, t]);

  return (
    <div className="grid grid-cols-1 gap-2">
      {!initialCustomer && (
        <Input
          name={`${name}-search`}
          label={label}
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder={t("customers.searchCustomer")}
          size="md"
        />
      )}
      <FormSelect<T>
        name={name}
        control={control}
        label={initialCustomer ? label : undefined}
        options={options}
        valueKey="value"
        labelKey="name"
        placeholder={isFetching ? t("common.loading") : t("customers.selectCustomer")}
        disabledStatus={!!initialCustomer}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default CustomerSearchSelect;
