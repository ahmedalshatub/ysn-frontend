import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/table/DataTable";
import Badge from "../../../shared/components/badges/Badge";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import FileImage from "../../../shared/components/media/FileImage";
import useMyCities from "../../../shared/hooks/useMyCities";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import ImageIcon from "../../../assets/icons/ImageIcon";
import type { CustomerDto } from "../../customers/types/Customers.types";
import { useGetCustomerCardCategoryAccessQuery, useSetCustomerCategoryAccessMutation } from "../api/CardCategories.api";
import {
  CardCategoryAccess,
  cardCategoryAccessKeys,
  cardCategoryVisibilityKeys,
  type CustomerCardCategoryAccessDto,
  type CustomerCardCategoryAccessRequest,
} from "../types/CardCategories.types";

interface CardCategoryAccessTableProps {
  customer: CustomerDto;
  canChange: boolean;
  refreshKey: number;
}

const initialValues: CustomerCardCategoryAccessRequest = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "sortOrder",
  isAscending: true,
};

const CardCategoryAccessTable = ({ customer, canChange, refreshKey }: CardCategoryAccessTableProps) => {
  const { t } = useTranslation();
  const { cities } = useMyCities();
  const [values, setValues] = useState<CustomerCardCategoryAccessRequest>(initialValues);
  const [setAccess] = useSetCustomerCategoryAccessMutation();

  const { data, isLoading, isFetching, refetch } = useGetCustomerCardCategoryAccessQuery(
    { id: customer.id, params: { ...values, name: values.name || undefined } },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (refreshKey > 0) refetch();
  }, [refreshKey, refetch]);

  const accessOptions = useMemo(
    () => Object.values(CardCategoryAccess).map((access) => ({ value: access, name: t(cardCategoryAccessKeys[access]) })),
    [t]
  );
  const cityOptions = useMemo(() => cities.map((city) => ({ value: city.id, name: city.name })), [cities]);
  const visibleOptions = [
    { value: "true", name: t("cardCategories.visibleNow") },
    { value: "false", name: t("cardCategories.hiddenNow") },
  ];

  const handleAccessChange = useCallback(
    async (row: CustomerCardCategoryAccessDto, access: number) => {
      try {
        await setAccess({ id: customer.id, cardCategoryId: row.cardCategoryId, access }).unwrap();
        showSuccess(t("cardCategories.successAccess"));
        refetch();
      } catch (error) {
        showError(getErrorMessage(error));
      }
    },
    [setAccess, customer.id, t, refetch]
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: t("cardCategories.name"),
        sortable: true,
        render: (row: CustomerCardCategoryAccessDto) => (
          <div className="flex items-center gap-3">
            <div className="table-thumbnail">
              <FileImage path={row.imageUrl} alt={row.name} className="h-full w-full object-cover" fallback={<ImageIcon className="h-5 w-5" />} />
            </div>
            <span className="font-medium">{row.name}</span>
          </div>
        ),
      },
      {
        key: "cityName",
        header: t("cardCategories.city"),
        sortable: true,
        width: "140px",
        render: (row: CustomerCardCategoryAccessDto) => <span>{row.cityName ?? "-"}</span>,
      },
      {
        key: "access",
        header: t("cardCategories.access"),
        width: "170px",
        render: (row: CustomerCardCategoryAccessDto) =>
          canChange ? (
            <Select
              name={`access-${row.cardCategoryId}`}
              value={row.access}
              onChange={(value) => handleAccessChange(row, Number(value))}
              options={accessOptions}
              valueKey="value"
              labelKey="name"
              size="sm"
            />
          ) : (
            <span>{t(cardCategoryAccessKeys[row.access])}</span>
          ),
      },
      {
        key: "isVisible",
        header: t("cardCategories.visibility"),
        width: "220px",
        render: (row: CustomerCardCategoryAccessDto) => (
          <div className="flex flex-col gap-1">
            <Badge
              label={row.isVisible ? t("cardCategories.visibleNow") : t("cardCategories.hiddenNow")}
              variant={row.isVisible ? "success" : "secondary"}
              size="sm"
            />
            <span className="text-xs">{t(cardCategoryVisibilityKeys[row.visibilityReason])}</span>
          </div>
        ),
      },
    ],
    [t, canChange, accessOptions, handleAccessChange]
  );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Input
          name="accessName"
          label={t("cardCategories.name")}
          value={values.name || ""}
          onChange={(event) => setValues((previous) => ({ ...previous, pageNumber: 1, name: event.target.value }))}
          size="sm"
        />
        <Select
          name="accessCity"
          label={t("cardCategories.city")}
          value={values.cityId ?? ""}
          onChange={(value) => setValues((previous) => ({ ...previous, pageNumber: 1, cityId: value === "" ? undefined : Number(value) }))}
          options={cityOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="sm"
        />
        <Select
          name="accessValue"
          label={t("cardCategories.access")}
          value={values.access ?? ""}
          onChange={(value) => setValues((previous) => ({ ...previous, pageNumber: 1, access: value === "" ? undefined : Number(value) }))}
          options={accessOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="sm"
        />
        <Select
          name="accessVisible"
          label={t("cardCategories.visibility")}
          value={values.isVisible === undefined ? "" : String(values.isVisible)}
          onChange={(value) =>
            setValues((previous) => ({ ...previous, pageNumber: 1, isVisible: value === "" ? undefined : value === "true" }))
          }
          options={visibleOptions}
          valueKey="value"
          labelKey="name"
          placeholder={t("common.all")}
          size="sm"
        />
      </div>
      <DataTable
        columns={columns}
        data={data?.items || []}
        rowKey={(row) => row.cardCategoryId}
        loading={isLoading || isFetching}
        emptyMessage={t("common.noData")}
        currentPage={values.pageNumber || 1}
        pageSize={values.pageSize || 25}
        totalItems={data?.totalCount || 0}
        onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
        onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
        sortColumn={values.sortBy}
        sortDirection={values.isAscending ? "asc" : "desc"}
        onSort={(column: string, direction: SortDirection) =>
          setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
        }
        hoverable
        striped
        borderless
      />
    </div>
  );
};

export default CardCategoryAccessTable;
