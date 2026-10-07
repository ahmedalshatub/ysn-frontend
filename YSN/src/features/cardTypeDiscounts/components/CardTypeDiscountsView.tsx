import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/buttons/Button";
import ExportButton from "../../../shared/components/buttons/ExportButton";
import AlertModal from "../../../shared/components/modals/AlertModal";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { SortDirection } from "../../../shared/components/table/TableHeader";
import PlusIcon from "../../../assets/icons/PlusIcon";
import type { CustomerListDto } from "../../customers/types/Customers.types";
import {
  useDeleteCardTypeDiscountMutation,
  useDeleteCardTypeDiscountsMutation,
  useExportCardTypeDiscountsMutation,
  useGetCardTypeDiscountsQuery,
} from "../api/CardTypeDiscounts.api";
import CardTypeDiscountFilters from "./CardTypeDiscountFilters";
import CardTypeDiscountsTable from "./CardTypeDiscountsTable";
import AddCardTypeDiscountsModal from "./AddCardTypeDiscountsModal";
import type { CardTypeDiscountFilter, CardTypeDiscountListDto, CardTypeDiscountRequest } from "../types/CardTypeDiscounts.types";
import PageActions from "../../../shared/components/navigation/PageActions";
import ListContainer from "../../../shared/components/cards/ListContainer";
import Badge from "../../../shared/components/badges/Badge";
import Dropdown from "../../../shared/components/navigation/Dropdown";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import FilterIcon from "../../../assets/icons/FilterIcon";
import XIcon from "../../../assets/icons/XIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";

interface CardTypeDiscountsViewProps {
  framed?: boolean;
  actionsTarget?: HTMLElement | null;
  customer?: CustomerListDto | null;
}

type Selection = { mode: "ids"; ids: Set<string | number> } | { mode: "all" };

const initialValues: CardTypeDiscountRequest = { pageNumber: 1, pageSize: 25, sortBy: "createdAt", isAscending: false, isDeleted: false };

const CardTypeDiscountsView = ({ framed, actionsTarget, customer }: CardTypeDiscountsViewProps) => {
  const { t } = useTranslation();
  const { can } = usePermission();
  const [values, setValues] = useState<CardTypeDiscountRequest>(initialValues);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<CardTypeDiscountListDto | "selection" | null>(null);
  const [selection, setSelection] = useState<Selection>({ mode: "ids", ids: new Set() });

  const filter: CardTypeDiscountFilter = {
    userId: customer?.id,
    customerName: customer ? undefined : values.customerName || undefined,
    customerPhone: customer ? undefined : values.customerPhone || undefined,
    customerRoleId: customer ? undefined : values.customerRoleId,
    cardCategoryId: values.cardCategoryId,
    cardTypeId: values.cardTypeId,
    discountType: values.discountType,
    isDeleted: false,
  };
  const { data, isLoading, isFetching, refetch } = useGetCardTypeDiscountsQuery(
    { ...filter, pageNumber: values.pageNumber, pageSize: values.pageSize, sortBy: values.sortBy, isAscending: values.isAscending },
    { refetchOnMountOrArgChange: true }
  );
  const [exportDiscounts, { isLoading: isExporting }] = useExportCardTypeDiscountsMutation();
  const [deleteOne, { isLoading: deletingOne }] = useDeleteCardTypeDiscountMutation();
  const [deleteMany, { isLoading: deletingMany }] = useDeleteCardTypeDiscountsMutation();
  const canDelete = can(Permission.CardTypeDiscountsDelete);
  const selectedCount = selection.mode === "all" ? data?.totalCount ?? 0 : selection.ids.size;

  const reload = () => {
    refetch();
    setSelection({ mode: "ids", ids: new Set() });
  };
  const handleDelete = useCallback((discount: CardTypeDiscountListDto) => setDeleting(discount), []);

  const confirmDelete = async () => {
    try {
      if (deleting === "selection") {
        const removed = await deleteMany(selection.mode === "all" ? { filter } : { ids: Array.from(selection.ids).map(Number) }).unwrap();
        showSuccess(t("discounts.successDeleteMany", { count: removed }));
      } else if (deleting) {
        await deleteOne(deleting.id).unwrap();
        showSuccess(t("discounts.successDelete"));
      }
      setDeleting(null);
      reload();
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className={framed ? "space-y-6" : "space-y-4"}>
      <ListContainer plain={!framed}>
        <CardTypeDiscountFilters
          values={values}
          forCustomer={!!customer}
          onChange={(changes) => setValues((previous) => ({ ...previous, pageNumber: 1, ...changes }))}
          onSearch={reload}
          onClear={() => setValues(initialValues)}
        />
      </ListContainer>
      <ListContainer plain={!framed}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="list-header-title">
            {t("discounts.cardTypeDiscounts")} <span className="list-header-count">({data?.totalCount ?? 0})</span>
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <PageActions target={actionsTarget}>
            {can(Permission.CardTypeDiscountsExport) && <ExportButton loading={isExporting} onExport={(format) => exportDiscounts({ ...filter, format }).unwrap()} />}
            {can(Permission.CardTypeDiscountsCreate) && (
              <Button
                variant="dark"
                size="md"
                label={t("discounts.addCardTypeDiscounts")}
                icon={<PlusIcon className="h-4 w-4" />}
                iconPosition="left"
                onClick={() => setAdding(true)}
              />
            )}
            </PageActions>
          </div>
        </div>
        {canDelete && selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={t("cards.selectedCount", { count: selectedCount })} variant="primary" size="sm" pill />
            <Dropdown
              trigger={<Button variant="secondary" outline size="sm" label={t("cards.select")} icon={<ChevronDownIcon className="h-4 w-4" />} iconPosition="right" />}
              items={[
                ...(selection.mode === "ids" && (data?.totalCount ?? 0) > selection.ids.size
                  ? [{ key: "all", label: t("cards.selectAllMatching", { count: data?.totalCount ?? 0 }), icon: <FilterIcon /> }]
                  : []),
                { key: "clear", label: t("cards.clearSelection"), icon: <XIcon /> },
              ]}
              onSelect={(key) => setSelection(key === "all" ? { mode: "all" } : { mode: "ids", ids: new Set() })}
            />
            <Button variant="danger" size="sm" label={t("discounts.removeSelected")} icon={<TrashIcon className="h-4 w-4" />} iconPosition="left" onClick={() => setDeleting("selection")} />
          </div>
        )}
        <CardTypeDiscountsTable
          items={data?.items || []}
          totalCount={data?.totalCount || 0}
          loading={isLoading || isFetching}
          filterValues={values}
          showCustomer={!customer}
          selectable={canDelete && selection.mode === "ids"}
          selectedRows={selection.mode === "ids" ? selection.ids : new Set()}
          onSelectionChange={(ids) => setSelection({ mode: "ids", ids })}
          onPageChange={(page) => setValues((previous) => ({ ...previous, pageNumber: page }))}
          onPageSizeChange={(size) => setValues((previous) => ({ ...previous, pageSize: size, pageNumber: 1 }))}
          onSort={(column: string, direction: SortDirection) =>
            setValues((previous) => ({ ...previous, sortBy: column, isAscending: direction === "asc", pageNumber: 1 }))
          }
          onDelete={handleDelete}
        />
      </ListContainer>

      {adding && <AddCardTypeDiscountsModal open customer={customer} onClose={() => setAdding(false)} onSuccess={reload} />}
      {deleting && (
        <AlertModal
          open
          onClose={() => setDeleting(null)}
          onConfirm={confirmDelete}
          type="delete"
          title={t("discounts.confirmDelete")}
          message={
            deleting === "selection"
              ? t("discounts.deleteManyMessage", { count: selectedCount })
              : t("discounts.deleteMessage", { type: deleting.cardTypeName, customer: deleting.customerName })
          }
          confirmText={t("common.delete")}
          cancelText={t("common.cancel")}
          loading={deletingOne || deletingMany}
        />
      )}
    </div>
  );
};

export default CardTypeDiscountsView;
