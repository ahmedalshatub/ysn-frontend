import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import StatCard from "../../../shared/components/cards/StatCard";
import TreeTable from "../../../shared/components/table/TreeTable";
import type { TreeTableColumn } from "../../../shared/components/table/TreeTable";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Input from "../../../shared/components/inputs/Input";
import Select from "../../../shared/components/inputs/Select";
import Button from "../../../shared/components/buttons/Button";
import Badge from "../../../shared/components/badges/Badge";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getStatusFilterOptions } from "../../../shared/utils/constants";
import { useGetAllUsersQuery } from "../../users/api/Users.api";
import AccountModal from "../components/AccountModal";
import DeleteRestoreAlerts from "../components/DeleteRestoreAlerts";
import {
  seedAccounts,
  flattenAccounts,
  filterAccounts,
  findAccount,
  getPostableIds,
  addAccount,
  updateAccount,
  setAccountDeleted,
  isLeaf,
  ACCOUNT_TYPES,
  ACCOUNT_NATURES,
} from "../types/accountsData";
import type { Account, AccountInput, AccountFilter, AccountType } from "../types/accountsData";
import HomeIcon from "../../../assets/icons/HomeIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import SplitIcon from "../../../assets/icons/SplitIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import XCircleIcon from "../../../assets/icons/XCircleIcon";
import ChevronsRightIcon from "../../../assets/icons/ChevronsRightIcon";
import MinusIcon from "../../../assets/icons/MinusIcon";

type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";

const typeVariants: Record<AccountType, BadgeVariant> = {
  asset: "primary",
  liability: "danger",
  equity: "info",
  revenue: "success",
  expense: "warning",
};

const INITIAL_FILTERS: AccountFilter = {
  name: "",
  code: "",
  type: "",
  nature: "",
  isDeleted: false,
  createdBy: undefined,
};

const money = (value: number, currency: string) => `${value.toLocaleString("en-GB")} ${currency}`;

const date = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });

const AccountsExample = () => {
  const { t, i18n } = useTranslation();
  useTitle(t("accountsExample.pageTitle"));

  const isArabic = i18n.language.startsWith("ar");

  const [accounts, setAccounts] = useState<Account[]>(seedAccounts);
  const [filterValues, setFilterValues] = useState<AccountFilter>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<AccountFilter>(INITIAL_FILTERS);
  const [expanded, setExpanded] = useState<string[]>(["1", "1-1"]);

  const { data: usersData } = useGetAllUsersQuery(
    { sortBy: "userName", isAscending: true },
    { refetchOnMountOrArgChange: true },
  );
  const creatorOptions = (usersData?.items ?? []).map((user) => ({
    name: user.userName,
    value: user.id,
  }));

  const [dialogs, setDialogs] = useState({
    addUpdateModal: false,
    alert: false,
    alertType: true,
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [parentAccountId, setParentAccountId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const visibleAccounts = useMemo(
    () => filterAccounts(accounts, appliedFilters),
    [accounts, appliedFilters],
  );

  const postableIds = useMemo(() => getPostableIds(accounts), [accounts]);

  const stats = useMemo(() => {
    const all = flattenAccounts(accounts);
    return {
      total: all.length,
      postable: all.filter(isLeaf).length,
      deleted: all.filter((account) => account.isDeleted).length,
      depth: all.reduce((max, account) => Math.max(max, account.level), 0),
    };
  }, [accounts]);

  const visibleCount = useMemo(() => flattenAccounts(visibleAccounts).length, [visibleAccounts]);

  const branchIds = useMemo(
    () => flattenAccounts(visibleAccounts).filter((a) => !isLeaf(a)).map((a) => a.id),
    [visibleAccounts],
  );

  const label = useCallback(
    (account: Account) => (isArabic ? account.nameAr : account.name),
    [isArabic],
  );

  const handleFilterChange = (name: string, value: unknown) => {
    let processedValue = value;

    if (name === "isDeleted") {
      const status = String(value);
      processedValue = status === "" ? undefined : status === "true";
    }

    setFilterValues((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSearch = () => setAppliedFilters(filterValues);

  const handleClearFilter = () => {
    setFilterValues(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
  };

  const handleOpenAddRoot = () => {
    setSelectedAccountId(null);
    setParentAccountId(null);
    setIsEditing(false);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenAddChild = (parentId: string) => {
    setSelectedAccountId(null);
    setParentAccountId(parentId);
    setIsEditing(false);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleOpenEdit = (id: string) => {
    setSelectedAccountId(id);
    setParentAccountId(null);
    setIsEditing(true);
    setDialogs((prev) => ({ ...prev, addUpdateModal: true }));
  };

  const handleCloseModal = () => {
    setDialogs((prev) => ({ ...prev, addUpdateModal: false }));
    setSelectedAccountId(null);
    setParentAccountId(null);
    setIsEditing(false);
  };

  const handleCloseAlert = () => {
    setDialogs((prev) => ({ ...prev, alert: false }));
    setSelectedAccountId(null);
  };

  const handleSubmitAccount = (values: AccountInput) => {
    const duplicate = flattenAccounts(accounts).find(
      (account) => account.code === values.code && account.id !== selectedAccountId,
    );
    if (duplicate) {
      showError(t("accountsExample.codeTaken", { code: values.code }));
      return;
    }

    if (isEditing && selectedAccountId) {
      setAccounts((prev) => updateAccount(prev, selectedAccountId, values));
      showSuccess(t("messages.updatedSuccessfully"));
    } else {
      setAccounts((prev) => addAccount(prev, parentAccountId, values, 1, "superadmin"));
      if (parentAccountId) setExpanded((prev) => [...new Set([...prev, parentAccountId])]);
      showSuccess(t("messages.savedSuccessfully"));
    }
    handleCloseModal();
  };

  const handleConfirmAlert = () => {
    if (!selectedAccountId) return;
    setAccounts((prev) => setAccountDeleted(prev, selectedAccountId, dialogs.alertType));
    showSuccess(
      dialogs.alertType ? t("messages.deletedSuccessfully") : t("messages.restoredSuccessfully"),
    );
    handleCloseAlert();
  };

  const getRowActions = (account: Account) => {
    if (account.isDeleted) {
      return [
        {
          label: t("common.restore"),
          icon: <Undo2Icon className="w-4 h-4" />,
          onClick: () => {
            setSelectedAccountId(account.id);
            setDialogs((prev) => ({ ...prev, alert: true, alertType: false }));
          },
        },
      ];
    }

    return [
      {
        label: t("accountsExample.addChild"),
        icon: <SplitIcon className="w-4 h-4" />,
        onClick: () => handleOpenAddChild(account.id),
      },
      {
        label: t("common.edit"),
        icon: <EditIcon className="w-4 h-4" />,
        onClick: () => handleOpenEdit(account.id),
      },
      {
        label: t("common.delete"),
        icon: <TrashIcon className="w-4 h-4" />,
        variant: "danger" as const,
        onClick: () => {
          setSelectedAccountId(account.id);
          setDialogs((prev) => ({ ...prev, alert: true, alertType: true }));
        },
      },
    ];
  };

  const columns: TreeTableColumn<Account>[] = [
    {
      key: "code",
      header: t("accountsExample.code"),
      width: "130px",
      render: (row) => <span className="font-mono text-xs font-semibold">{row.code}</span>,
    },
    {
      key: "name",
      header: t("accountsExample.name"),
      render: (row) => (
        <span className={row.isDeleted ? "ce-muted line-through" : "ce-text font-medium"}>
          {label(row)}
        </span>
      ),
    },
    {
      key: "type",
      header: t("accountsExample.type"),
      width: "130px",
      render: (row) => (
        <Badge
          variant={typeVariants[row.type]}
          size="sm"
          pill
          label={t(`accountsExample.types.${row.type}`)}
        />
      ),
    },
    {
      key: "nature",
      header: t("accountsExample.nature"),
      width: "110px",
      render: (row) => (
        <span className="ce-muted text-xs">{t(`accountsExample.natures.${row.nature}`)}</span>
      ),
    },
    {
      key: "balance",
      header: t("accountsExample.balance"),
      width: "190px",
      align: "right",
      render: (row) => (
        <span className="font-mono text-xs font-semibold">{money(row.balance, row.currency)}</span>
      ),
    },
    {
      key: "postable",
      header: t("accountsExample.postable"),
      width: "110px",
      align: "center",
      render: (row) =>
        postableIds.has(row.id) ? (
          <Badge
            variant="success"
            size="sm"
            pill
            icon={<CheckCircleIcon className="w-3 h-3" />}
            label={t("accountsExample.yes")}
          />
        ) : (
          <Badge
            variant="secondary"
            size="sm"
            pill
            icon={<XCircleIcon className="w-3 h-3" />}
            label={t("accountsExample.no")}
          />
        ),
    },
    {
      key: "creator",
      header: t("common.createdBy"),
      width: "140px",
      render: (row) => <span className="ce-muted text-xs">{row.creator}</span>,
    },
    {
      key: "createdAt",
      header: t("common.createdAt"),
      width: "130px",
      render: (row) => <span className="ce-muted text-xs">{date(row.createdAt)}</span>,
    },
    {
      key: "isDeleted",
      header: t("common.status"),
      width: "110px",
      render: (row) => (
        <Badge
          variant={row.isDeleted ? "danger" : "success"}
          size="sm"
          pill
          label={row.isDeleted ? t("common.deleted") : t("common.active")}
        />
      ),
    },
    {
      key: "actions",
      header: t("common.actions"),
      width: "80px",
      align: "center",
      render: (row) => <TableActionDropdown size="sm" actions={getRowActions(row)} />,
    },
  ];

  const typeOptions = ACCOUNT_TYPES.map((type) => ({
    name: t(`accountsExample.types.${type}`),
    value: type,
  }));

  const natureOptions = ACCOUNT_NATURES.map((nature) => ({
    name: t(`accountsExample.natures.${nature}`),
    value: nature,
  }));

  const selectedAccount = selectedAccountId ? findAccount(accounts, selectedAccountId) : undefined;
  const parentAccount = parentAccountId ? findAccount(accounts, parentAccountId) : undefined;

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("accountsExample.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("accountsExample.pageTitle")}
        subtitle={t("accountsExample.seededFrom")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<LayersIcon />}
        showDate
        animated
        actions={
          <Button
            variant="dark"
            size="md"
            label={t("accountsExample.addRootAccount")}
            onClick={handleOpenAddRoot}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            className="font-bold"
          />
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title={t("accountsExample.totalAccounts")}
          value={stats.total}
          icon={<LayersIcon className="w-5 h-5" />}
          variant="primary"
        />
        <StatCard
          title={t("accountsExample.postableAccounts")}
          value={stats.postable}
          icon={<CheckCircleIcon className="w-5 h-5" />}
          variant="success"
        />
        <StatCard
          title={t("accountsExample.deletedAccounts")}
          value={stats.deleted}
          icon={<TrashIcon className="w-5 h-5" />}
          variant="danger"
        />
        <StatCard
          title={t("accountsExample.maxDepth")}
          value={stats.depth}
          icon={<SplitIcon className="w-5 h-5" />}
          variant="info"
        />
      </div>

      <Card variant="elevated" padding="md">
        <FilterAccordion onSearch={handleSearch} onClear={handleClearFilter}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Input
              label={t("accountsExample.name")}
              placeholder={t("common.searchByName")}
              value={filterValues.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
            <Input
              label={t("accountsExample.code")}
              placeholder={t("accountsExample.searchByCode")}
              value={filterValues.code}
              onChange={(e) => handleFilterChange("code", e.target.value)}
            />
            <Select
              label={t("accountsExample.type")}
              options={typeOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.type}
              onChange={(value) => handleFilterChange("type", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
            <Select
              label={t("accountsExample.nature")}
              options={natureOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.nature}
              onChange={(value) => handleFilterChange("nature", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
            <Select
              label={t("common.status")}
              options={getStatusFilterOptions(t)}
              labelKey="name"
              valueKey="value"
              value={filterValues.isDeleted === undefined ? "" : String(filterValues.isDeleted)}
              onChange={(value) => handleFilterChange("isDeleted", value)}
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
            <Select
              label={t("common.createdBy")}
              options={creatorOptions}
              labelKey="name"
              valueKey="value"
              value={filterValues.createdBy === undefined ? "" : filterValues.createdBy}
              onChange={(value) =>
                handleFilterChange("createdBy", value === "" ? undefined : Number(value))
              }
              addDefaultOption
              defaultOptionLabel={t("common.all")}
            />
          </div>
        </FilterAccordion>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="ce-heading text-sm font-semibold">
              {t("accountsExample.tableTitle")}
            </h3>
            <Badge variant="secondary" size="sm" pill label={String(visibleCount)} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              outline
              size="sm"
              label={t("productExtras.expandAll")}
              icon={<ChevronsRightIcon className="w-4 h-4 rotate-90" />}
              iconPosition="left"
              disabled={expanded.length === branchIds.length}
              onClick={() => setExpanded(branchIds)}
            />
            <Button
              variant="secondary"
              outline
              size="sm"
              label={t("productExtras.collapseAll")}
              icon={<MinusIcon className="w-4 h-4" />}
              iconPosition="left"
              disabled={expanded.length === 0}
              onClick={() => setExpanded([])}
            />
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <TreeTable<Account>
            columns={columns}
            data={visibleAccounts}
            expanded={expanded}
            onExpandedChange={setExpanded}
            emptyMessage={t("common.noData")}
            bordered
            striped
          />
        </div>
      </Card>

      <AccountModal
        open={dialogs.addUpdateModal}
        editingAccount={isEditing ? (selectedAccount ?? null) : null}
        parentAccount={parentAccount ?? null}
        accounts={accounts}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAccount}
      />

      <DeleteRestoreAlerts
        open={dialogs.alert}
        isDelete={dialogs.alertType}
        childCount={selectedAccount?.children?.length ?? 0}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmAlert}
      />
    </div>
  );
};

export default AccountsExample;
