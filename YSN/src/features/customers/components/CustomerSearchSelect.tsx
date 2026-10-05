import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Control, FieldValues, Path } from "react-hook-form";
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

const MIN_SEARCH_LENGTH = 2;
const PAGE_SIZE = 20;

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
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [known, setKnown] = useState<CustomerListDto[]>(initialCustomer ? [initialCustomer] : []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(term.trim()), 400);
    return () => clearTimeout(timer);
  }, [term]);

  const search = debouncedTerm.length >= MIN_SEARCH_LENGTH ? debouncedTerm : "";
  const isPhone = /^[+0-9 ]+$/.test(search);
  const isEmail = search.includes("@");
  const { data, isFetching } = useGetCustomersQuery(
    {
      name: search && !isPhone && !isEmail ? search : undefined,
      phoneNumber: search && isPhone ? search.replace(/^\+?964|^0/, "") : undefined,
      email: search && isEmail ? search : undefined,
      roleId,
      isActive: true,
      isDeleted: false,
      sortBy: "firstName",
      isAscending: true,
      pageSize: PAGE_SIZE,
    },
    { skip: !!initialCustomer, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    const items = data?.items;
    if (!items?.length) return;
    setKnown((previous) => [...previous, ...items.filter((item) => !previous.some((customer) => customer.id === item.id))]);
  }, [data]);

  const options = useMemo(() => {
    const results = data?.items ?? [];
    const customers = [...results, ...known.filter((customer) => !results.some((item) => item.id === customer.id))];
    return customers.map((customer) => ({
      value: customer.id,
      name: customerFullName(customer),
      label: customerFullName(customer),
      description: [t(customerRoleConfigs[customer.roleId].labelKey), customerPhone(customer), customer.email, customer.cityName]
        .filter(Boolean)
        .join(" - "),
    }));
  }, [data, known, t]);

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
