import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Badge from "../../../shared/components/badges/Badge";
import type { Quotation } from "../types/profileData";
import { formatDate, money } from "../types/profileUtils";

interface QuotationsTabProps {
  quotations: Quotation[];
}

const statusVariantMap: Record<Quotation["status"], "success" | "warning" | "danger" | "secondary"> = {
  accepted: "success",
  pending: "warning",
  rejected: "danger",
  expired: "secondary",
};

const INITIAL_FILTERS = { search: "", status: "" };

const QuotationsTab = ({ quotations }: QuotationsTabProps) => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const statusOptions = [
    { name: t("profileExample.quotationStatus.accepted"), value: "accepted" },
    { name: t("profileExample.quotationStatus.pending"), value: "pending" },
    { name: t("profileExample.quotationStatus.rejected"), value: "rejected" },
    { name: t("profileExample.quotationStatus.expired"), value: "expired" },
  ];

  const filtered = useMemo(() => {
    const search = appliedFilters.search.trim().toLowerCase();
    return quotations.filter((quotation) => {
      if (search && !quotation.quotationNumber.toLowerCase().includes(search)) return false;
      if (appliedFilters.status && quotation.status !== appliedFilters.status) return false;
      return true;
    });
  }, [quotations, appliedFilters]);

  const columns: Column<Quotation>[] = [
    {
      key: "quotationNumber",
      header: t("profileExample.quotationNumber"),
      width: "170px",
      sortable: true,
      render: (row) => <Badge variant="dark" size="sm" pill label={row.quotationNumber} />,
    },
    {
      key: "date",
      header: t("common.date"),
      width: "140px",
      sortable: true,
      render: (row) => <span className="ce-muted text-xs">{formatDate(row.date)}</span>,
    },
    {
      key: "validUntil",
      header: t("profileExample.validUntil"),
      width: "140px",
      sortable: true,
      responsive: "md",
      render: (row) => <span className="ce-muted text-xs">{formatDate(row.validUntil)}</span>,
    },
    {
      key: "items",
      header: t("profileExample.items"),
      width: "90px",
      align: "center",
      sortable: true,
    },
    {
      key: "amount",
      header: t("profileExample.amount"),
      width: "140px",
      align: "right",
      sortable: true,
      render: (row) => <span className="font-mono text-sm font-semibold">{money(row.amount)}</span>,
    },
    {
      key: "status",
      header: t("common.status"),
      width: "130px",
      sortable: true,
      render: (row) => (
        <Badge
          variant={statusVariantMap[row.status]}
          size="sm"
          pill
          label={t(`profileExample.quotationStatus.${row.status}`)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <FilterAccordion
        onSearch={() => setAppliedFilters(filterValues)}
        onClear={() => {
          setFilterValues(INITIAL_FILTERS);
          setAppliedFilters(INITIAL_FILTERS);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t("common.search")}
            placeholder={t("profileExample.quotationNumber")}
            value={filterValues.search}
            onChange={(e) => setFilterValues((prev) => ({ ...prev, search: e.target.value }))}
          />
          <Select
            label={t("common.status")}
            options={statusOptions}
            labelKey="name"
            valueKey="value"
            value={filterValues.status}
            onChange={(value) => setFilterValues((prev) => ({ ...prev, status: String(value) }))}
            addDefaultOption
            defaultOptionLabel={t("common.all")}
          />
        </div>
      </FilterAccordion>

      <DataTable<Quotation>
        columns={columns}
        data={filtered}
        rowKey={(row) => row.id}
        title={t("profileExample.quotationsTitle")}
        clientSideSorting
        clientSidePagination
        pageSizeOptions={[
          { label: "5", value: 5 },
          { label: "10", value: 10 },
          { label: "25", value: 25 },
        ]}
        paginationMode="simple"
        emptyMessage={t("common.noData")}
        hoverable
        striped
        rounded
      />
    </div>
  );
};

export default QuotationsTab;
