import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import usePermission from "../../../shared/hooks/usePermission";
import { formatDate } from "../../../shared/hooks/dateFormatter";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { Permission } from "../../../shared/types/Permissions.types";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { CustomerRole, customerRoleConfigs, type CustomerRoleValue } from "../../customers/types/Customers.types";
import { discountText, type CardTypeDiscountListDto, type CardTypeDiscountRequest } from "../types/CardTypeDiscounts.types";

interface CardTypeDiscountsTableProps {
  items: CardTypeDiscountListDto[];
  totalCount: number;
  loading: boolean;
  filterValues: CardTypeDiscountRequest;
  showCustomer: boolean;
  selectable: boolean;
  selectedRows: Set<string | number>;
  onSelectionChange: (selected: Set<string | number>) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
  onDelete: (discount: CardTypeDiscountListDto) => void;
}

const CardTypeDiscountsTable = ({
  items,
  totalCount,
  loading,
  filterValues,
  showCustomer,
  selectable,
  selectedRows,
  onSelectionChange,
  onPageChange,
  onPageSizeChange,
  onSort,
  onDelete,
}: CardTypeDiscountsTableProps) => {
  const { t, i18n } = useTranslation();
  const { can } = usePermission();

  const columns = useMemo(
    () => [
      ...(showCustomer
        ? [{
            key: "customerName",
            header: t("invoices.customer"),
            render: (row: CardTypeDiscountListDto) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium">{row.customerName}</span>
                <span className="text-xs">
                  {t(customerRoleConfigs[row.customerRoleId as CustomerRoleValue].labelKey)}
                  {row.customerCityName ? ` - ${row.customerCityName}` : ""}
                </span>
              </div>
            ),
          }]
        : []),
      {
        key: "cardTypeName",
        header: t("cards.cardType"),
        render: (row: CardTypeDiscountListDto) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.cardTypeName}</span>
            <span className="text-xs">{row.cardCategoryName}</span>
          </div>
        ),
      },
      {
        key: "price",
        header: t("discounts.price"),
        width: "120px",
        render: (row: CardTypeDiscountListDto) => (
          <span>{formatCurrency(row.customerRoleId === CustomerRole.Client ? row.clientPrice : row.agentPrice)}</span>
        ),
      },
      {
        key: "discountValue",
        header: t("discounts.discount"),
        sortable: true,
        width: "120px",
        render: (row: CardTypeDiscountListDto) => <span>{discountText(row.discountType, row.discountValue, formatCurrency)}</span>,
      },
      {
        key: "priceAfterDiscount",
        header: t("discounts.priceAfter"),
        width: "130px",
        render: (row: CardTypeDiscountListDto) => <span className="font-semibold">{formatCurrency(row.priceAfterDiscount)}</span>,
      },
      {
        key: "createdAt",
        header: t("cards.createdAt"),
        sortable: true,
        width: "150px",
        render: (row: CardTypeDiscountListDto) => (
          <div className="flex flex-col gap-1">
            <span>{formatDate(row.createdAt, { locale: i18n.language })}</span>
            {row.creator && <span className="text-xs">{row.creator}</span>}
          </div>
        ),
      },
      {
        key: "actions",
        header: t("common.actions"),
        align: "center" as const,
        width: "80px",
        render: (row: CardTypeDiscountListDto) =>
          !row.isDeleted && can(Permission.CardTypeDiscountsDelete) ? (
            <div onClick={(event) => event.stopPropagation()}>
              <TableActionDropdown
                size="sm"
                actions={[{ label: t("common.delete"), icon: <TrashIcon />, variant: "danger" as const, onClick: () => onDelete(row) }]}
              />
            </div>
          ) : null,
      },
    ],
    [t, i18n.language, can, showCustomer, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage={t("discounts.noDiscounts")}
      currentPage={filterValues.pageNumber || 1}
      pageSize={filterValues.pageSize || 25}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy || "createdAt"}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
      selectable={selectable}
      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}
      pageSizeOptions={[
        { label: "25", value: 25 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
      ]}
      hoverable
      striped
      borderless
    />
  );
};

export default CardTypeDiscountsTable;
