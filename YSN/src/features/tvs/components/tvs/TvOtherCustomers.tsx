import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import { customerRoleConfigs, type CustomerRoleValue } from "../../../customers/types/Customers.types";
import { tvPhone, type TvLinkedCustomerDto } from "../../types/Tvs.types";

interface TvOtherCustomersProps {
  customers: TvLinkedCustomerDto[];
}

const TvOtherCustomers = ({ customers }: TvOtherCustomersProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "customerName",
        header: t("tvs.customer"),
        render: (row: TvLinkedCustomerDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.customerName}</span>
            <span className="text-xs">
              {customerRoleConfigs[row.customerRoleId as CustomerRoleValue]
                ? t(customerRoleConfigs[row.customerRoleId as CustomerRoleValue].labelKey)
                : ""}
            </span>
          </div>
        ),
      },
      {
        key: "phoneNumber",
        header: t("customers.phoneNumber"),
        render: (row: TvLinkedCustomerDto) => <span dir="ltr">{tvPhone(row) || "-"}</span>,
      },
      {
        key: "nickname",
        header: t("tvs.nickname"),
        render: (row: TvLinkedCustomerDto) => <span>{row.nickname || "-"}</span>,
      },
      {
        key: "createdAt",
        header: t("tvs.addedAt"),
        render: (row: TvLinkedCustomerDto) => <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <div className="space-y-3">
      <h4 className="list-header-title">
        {t("tvs.otherCustomers")} <span className="list-header-count">({customers.length})</span>
      </h4>
      <DataTable
        columns={columns}
        data={customers}
        rowKey={(row) => row.customerTvId}
        emptyMessage={t("tvs.noOtherCustomers")}
        hoverable
        striped
        borderless
      />
    </div>
  );
};

export default TvOtherCustomers;
