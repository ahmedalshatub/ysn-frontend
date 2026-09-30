import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import Input from "../../../shared/components/inputs/Input";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import ListBulletIcon from "../../../assets/icons/ListBulletIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import type { InvoiceItem } from "../types/invoiceData";

interface InvoiceTableProps {
  items: InvoiceItem[];
  onQuantityChange: (key: string, value: number) => void;
  onPriceChange: (key: string, value: string) => void;
  onDiscountChange: (key: string, value: string) => void;
  onRemove: (key: string) => void;
}

const InvoiceTable = ({
  items,
  onQuantityChange,
  onPriceChange,
  onDiscountChange,
  onRemove,
}: InvoiceTableProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const columns: Column<InvoiceItem>[] = [
    {
      key: "index",
      header: "#",
      width: "56px",
      align: "center",
      render: (_row, index) => <span className="ce-muted text-xs">{index + 1}</span>,
    },
    {
      key: "name",
      header: t("common.name"),
      minWidth: "180px",
      sortable: true,
      sortFn: (a, b) =>
        (isArabic ? a.nameAr : a.name).localeCompare(isArabic ? b.nameAr : b.name),
      render: (row) => (
        <div className="min-w-0">
          <span className="ce-text block text-sm font-medium truncate">
            {isArabic ? row.nameAr : row.name}
          </span>
          <span className="ce-muted block text-xs">
            {isArabic ? row.categoryAr : row.category}
          </span>
        </div>
      ),
    },
    {
      key: "barcode",
      header: t("invoiceExample.barcode"),
      width: "130px",
      sortable: true,
      responsive: "md",
      render: (row) => <span className="font-mono text-xs">{row.barcode}</span>,
    },
    {
      key: "quantity",
      header: t("common.quantity"),
      width: "150px",
      render: (row) => (
        <NumberInput
          value={row.quantity}
          min={1}
          size="sm"
          onChange={(value) => onQuantityChange(row.key, value)}
        />
      ),
    },
    {
      key: "price",
      header: t("common.price"),
      width: "130px",
      render: (row) => (
        <Input
          type="number"
          min={0}
          size="sm"
          value={String(row.price)}
          onChange={(e) => onPriceChange(row.key, e.target.value)}
        />
      ),
    },
    {
      key: "discount",
      header: t("common.discount"),
      width: "130px",
      render: (row) => (
        <Input
          type="number"
          min={0}
          size="sm"
          value={String(row.discount)}
          onChange={(e) => onDiscountChange(row.key, e.target.value)}
        />
      ),
    },
    {
      key: "total",
      header: t("invoiceExample.total"),
      width: "120px",
      align: "right",
      sortable: true,
      sortFn: (a, b) =>
        a.quantity * a.price - a.discount - (b.quantity * b.price - b.discount),
      render: (row) => (
        <span className="font-mono text-sm font-semibold">
          {(row.quantity * row.price - row.discount).toFixed(2)}
        </span>
      ),
    },
    {
      key: "actions",
      header: t("common.actions"),
      width: "70px",
      align: "center",
      render: (row) => (
        <Button
          variant="danger"
          outline
          size="sm"
          iconOnly
          icon={<TrashIcon className="w-4 h-4" />}
          tooltip={t("common.delete")}
          onClick={() => onRemove(row.key)}
        />
      ),
    },
  ];

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("invoiceExample.total")}
      icon={<ListBulletIcon className="w-4 h-4" />}
      actions={<Badge variant="secondary" size="sm" pill label={String(items.length)} />}
    >
      <DataTable<InvoiceItem>
        columns={columns}
        data={items}
        rowKey={(row) => row.key}
        clientSideSorting
        emptyMessage={t("invoiceExample.noItems")}
        compact
        hoverable
        rounded
      />
    </Card>
  );
};

export default InvoiceTable;
