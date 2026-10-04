import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../../../shared/components/inputs/Input";
import Select from "../../../../shared/components/inputs/Select";
import { useGetCustomerQuery, useGetCustomersQuery } from "../../../customers/api/Customers.api";
import { customerFullName, customerPhone, customerRoleConfigs, type CustomerListDto } from "../../../customers/types/Customers.types";

interface ReportCustomerSelectProps {
  value?: number;
  roleId?: number;
  required?: boolean;
  onChange: (customerId: number | undefined) => void;
}

const MIN_SEARCH_LENGTH = 2;

const ReportCustomerSelect = ({ value, roleId, required, onChange }: ReportCustomerSelectProps) => {
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
      roleId,
      sortBy: "firstName",
      isAscending: true,
    },
    { skip: debouncedTerm.length < MIN_SEARCH_LENGTH, refetchOnMountOrArgChange: true }
  );
  const { data: selected } = useGetCustomerQuery(value ?? 0, { skip: !value, refetchOnMountOrArgChange: true });

  const options = useMemo(() => {
    const customers: CustomerListDto[] = [...(data?.items ?? [])];
    if (selected && !customers.some((customer) => customer.id === selected.id)) customers.unshift(selected);
    return customers.map((customer) => ({
      value: customer.id,
      name: `${customerFullName(customer)} - ${t(customerRoleConfigs[customer.roleId].labelKey)} (${customerPhone(customer)})`,
    }));
  }, [data, selected, t]);

  const label = `${t("reports.common.customer")}${required ? " *" : ""}`;

  return (
    <>
      <Input
        name="customerSearch"
        label={label}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={t("customers.searchCustomer")}
        size="md"
      />
      <Select
        name="customerId"
        label={t("customers.selectCustomer")}
        value={value ?? ""}
        onChange={(selectedValue) => onChange(selectedValue === "" ? undefined : Number(selectedValue))}
        options={options}
        valueKey="value"
        labelKey="name"
        placeholder={isFetching ? t("common.loading") : t("customers.selectCustomer")}
        size="md"
      />
    </>
  );
};

export default ReportCustomerSelect;
