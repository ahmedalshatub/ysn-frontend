import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWatch, type Control, type FieldValues, type Path } from "react-hook-form";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import FormMultiSelect from "../../../shared/components/inputs/FormMultiSelect";
import { useGetCustomersQuery } from "../api/Customers.api";
import { customerFullName, customerPhone, customerRoleConfigs, type CustomerListDto } from "../types/Customers.types";

interface CustomerSearchSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  initialCustomer?: CustomerListDto | null;
  roleId?: number;
  multiple?: boolean;
  error?: boolean;
  errorMessage?: string;
  onValueChange?: (value: number) => void;
}

const MIN_PHONE_DIGITS = 3;

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

const phoneDigits = (value: string) => value.replace(/\D/g, "").replace(/^964/, "").replace(/^0/, "");

const matches = (customer: CustomerListDto, search: string) => {
  if (!search) return true;
  if (normalize(customerFullName(customer)).includes(search)) return true;
  if (customer.userName && normalize(customer.userName).includes(search)) return true;
  if (customer.email && customer.email.toLowerCase().includes(search)) return true;
  const digits = phoneDigits(search);
  return digits.length >= MIN_PHONE_DIGITS && phoneDigits(customerPhone(customer)).includes(digits);
};

const CustomerSearchSelect = <T extends FieldValues>({
  name,
  control,
  label,
  initialCustomer,
  roleId,
  multiple = false,
  error,
  errorMessage,
  onValueChange,
}: CustomerSearchSelectProps<T>) => {
  const { t } = useTranslation();
  const [term, setTerm] = useState("");
  const selected = useWatch({ control, name });

  const { data, isFetching } = useGetCustomersQuery(
    {
      roleId,
      isActive: true,
      isDeleted: false,
      sortBy: "firstName",
      isAscending: true,
    },
    { skip: !!initialCustomer, refetchOnMountOrArgChange: true }
  );

  const options = useMemo(() => {
    const customers = initialCustomer ? [initialCustomer] : data?.items ?? [];
    const selectedIds = (Array.isArray(selected) ? selected : [selected]).map(Number);
    const search = normalize(term);
    return customers
      .filter((customer) => selectedIds.includes(customer.id) || matches(customer, search))
      .map((customer) => ({
        value: customer.id,
        name: customerFullName(customer),
        label: customerFullName(customer),
        description: [t(customerRoleConfigs[customer.roleId].labelKey), customerPhone(customer), customer.email, customer.cityName]
          .filter(Boolean)
          .join(" - "),
      }));
  }, [data, initialCustomer, selected, term, t]);

  if (multiple) {
    return (
      <FormMultiSelect<T>
        name={name}
        control={control}
        label={label}
        options={options}
        placeholder={t("customers.selectCustomers")}
        searchable
        error={error}
        errorMessage={errorMessage}
        onSearchChange={setTerm}
        loading={isFetching}
        emptyText={t("customers.noCustomersFound")}
      />
    );
  }

  return (
    <FormSelect<T>
      name={name}
      control={control}
      label={label}
      options={options}
      valueKey="value"
      labelKey="name"
      placeholder={t("customers.selectCustomer")}
      searchable={!initialCustomer}
      searchPlaceholder={t("customers.searchCustomer")}
      disabledStatus={!!initialCustomer}
      error={error}
      errorMessage={errorMessage}
      onSearchChange={setTerm}
      loading={isFetching}
      emptyText={t("customers.noCustomersFound")}
      onValueChange={onValueChange ? (value) => onValueChange(Number(value)) : undefined}
    />
  );
};

export default CustomerSearchSelect;
