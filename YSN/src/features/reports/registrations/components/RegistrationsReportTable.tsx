import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../shared/components/table/DataTable";
import Badge from "../../../../shared/components/badges/Badge";
import { formatDate } from "../../../../shared/hooks/dateFormatter";
import type { SortDirection } from "../../../../shared/components/table/TableHeader";
import { customerRoleConfigs, isCustomerRole, type CustomerAppValue } from "../../../customers/types/Customers.types";
import { registrationAppKeys, type RegistrationsReportRequest, type RegistrationsReportRowDto } from "../types/RegistrationsReport.types";

interface RegistrationsReportTableProps {
  items: RegistrationsReportRowDto[];
  totalCount: number;
  loading: boolean;
  filterValues: RegistrationsReportRequest;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (column: string, direction: SortDirection) => void;
}

const RegistrationsReportTable = ({ items, totalCount, loading, filterValues, onPageChange, onPageSizeChange, onSort }: RegistrationsReportTableProps) => {
  const { t, i18n } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "day",
        header: t("reports.registrations.day"),
        sortable: true,
        width: "160px",
        render: (row: RegistrationsReportRowDto) => <span>{formatDate(row.day, { locale: i18n.language })}</span>,
      },
      {
        key: "customerRoleId",
        header: t("reports.registrations.customerType"),
        sortable: true,
        width: "130px",
        render: (row: RegistrationsReportRowDto) =>
          isCustomerRole(row.customerRoleId) ? (
            <Badge label={t(customerRoleConfigs[row.customerRoleId].labelKey)} variant="info" size="sm" />
          ) : (
            <span>-</span>
          ),
      },
      {
        key: "cityName",
        header: t("reports.registrations.city"),
        sortable: true,
        render: (row: RegistrationsReportRowDto) => <span>{row.cityName || "-"}</span>,
      },
      {
        key: "registrationApp",
        header: t("reports.registrations.app"),
        sortable: true,
        render: (row: RegistrationsReportRowDto) =>
          row.registrationApp && registrationAppKeys[row.registrationApp as CustomerAppValue] ? (
            <Badge label={t(registrationAppKeys[row.registrationApp as CustomerAppValue])} variant="primary" size="sm" />
          ) : (
            <Badge label={t("customers.registeredFromDashboard")} variant="secondary" size="sm" />
          ),
      },
      {
        key: "registrationsCount",
        header: t("reports.registrations.registrationsCount"),
        sortable: true,
        width: "140px",
        render: (row: RegistrationsReportRowDto) => <span className="font-semibold">{row.registrationsCount}</span>,
      },
    ],
    [t, i18n.language]
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey={(row) => `${row.day}-${row.customerRoleId}-${row.cityId}-${row.registrationApp ?? 0}`}
      loading={loading}
      emptyMessage={t("reports.registrations.noRows")}
      currentPage={filterValues.pageNumber}
      pageSize={filterValues.pageSize}
      totalItems={totalCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortColumn={filterValues.sortBy}
      sortDirection={filterValues.isAscending ? "asc" : "desc"}
      onSort={onSort}
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

export default RegistrationsReportTable;
