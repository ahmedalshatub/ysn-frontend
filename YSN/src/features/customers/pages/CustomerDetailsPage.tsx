import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Tabs from "../../../shared/components/navigation/Tabs";
import Loader from "../../../shared/components/feedback/Loader";
import Result from "../../../shared/components/display/Result";
import UserIcon from "../../../assets/icons/UserIcon";
import { useGetCustomerQuery } from "../api/Customers.api";
import useCustomerActions, { type CustomerDialogName } from "../hooks/useCustomerActions";
import CustomerDetailsHeader from "../components/CustomerDetailsHeader";
import CustomerOverviewTab from "../components/CustomerOverviewTab";
import CustomersList from "../components/CustomersList";
import CustomerDialogs from "../components/CustomerDialogs";
import MessagesTab from "../../messages/components/MessagesTab";
import TransactionsView from "../../transactions/components/TransactionsView";
import CardsView from "../../cards/components/CardsView";
import InvoicesView from "../../invoices/components/InvoicesView";
import CardTypeDiscountsView from "../../cardTypeDiscounts/components/CardTypeDiscountsView";
import CustomerCardCategoryAccessTab from "../../cardCategories/components/CustomerCardCategoryAccessTab";
import CustomerTvsTab from "../../tvs/components/tvs/CustomerTvsTab";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import { CustomerRole, customerFullName, customerRoleConfigs } from "../types/Customers.types";

const CustomerDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const customerId = Number(id);
  const [activeTab, setActiveTab] = useState("overview");
  const [dialog, setDialog] = useState<CustomerDialogName | null>(null);
  const { can } = usePermission();

  const { data: customer, isLoading, isError, refetch } = useGetCustomerQuery(customerId, {
    skip: !customerId,
    refetchOnMountOrArgChange: true,
  });
  useTitle(customer ? customerFullName(customer) : t("customers.details"));

  const openDialog = useCallback((name: CustomerDialogName) => setDialog(name), []);
  const getActions = useCustomerActions({ onDialog: openDialog });
  const actions = customer ? getActions(customer).filter((action) => action.label !== t("messages.messages") && action.label !== t("transactions.pageTitle") && action.label !== t("cards.takenCards") && action.label !== t("invoices.pageTitle") && action.label !== t("discounts.cardTypeDiscounts") && action.label !== t("tvs.pageTitle")) : [];

  const tabs = useMemo(() => {
    const list = [{ id: "overview", label: t("customers.overviewTab") }];
    if (customer?.roleId === CustomerRole.Agent) list.push({ id: "subAgents", label: t("customers.subAgentsTab") });
    if (can(Permission.TransactionsView)) list.push({ id: "transactions", label: t("transactions.pageTitle") });
    if (can(Permission.CardTypeDiscountsView)) list.push({ id: "discounts", label: t("discounts.cardTypeDiscounts") });
    if (can(Permission.InvoicesView)) list.push({ id: "invoices", label: t("invoices.pageTitle") });
    if (can(Permission.CardsView)) list.push({ id: "cards", label: t("cards.takenCards") });
    if (can(Permission.TvsView)) list.push({ id: "tvs", label: t("tvs.pageTitle") });
    if (can(Permission.MessagesView)) list.push({ id: "messages", label: t("messages.messages") });
    if (can(Permission.CardCategoriesView)) list.push({ id: "cardCategories", label: t("cardCategories.customerTab") });
    return list;
  }, [customer?.roleId, can, t]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader variant="spinner" size="lg" />
      </div>
    );
  }

  if (isError || !customer) {
    return <Result status="404" title={t("customers.notFound")} />;
  }

  const config = customerRoleConfigs[customer.roleId];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={customerFullName(customer)}
        items={[
          { label: t("sidebar.homePage") },
          { label: t("sidebar.customers") },
          { label: t(config.pluralKey) },
          { label: customerFullName(customer) },
        ]}
        variant="gradient"
        icon={<UserIcon />}
        animated
      />

      <Card variant="elevated" padding="md">
        <CustomerDetailsHeader customer={customer} actions={actions} />
      </Card>

      <Card variant="elevated" padding="md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="pt-4">
          {activeTab === "overview" && <CustomerOverviewTab customer={customer} />}
          {activeTab === "transactions" && <TransactionsView customer={customer} onChanged={refetch} />}
          {activeTab === "discounts" && <CardTypeDiscountsView customer={customer} />}
          {activeTab === "invoices" && <InvoicesView customerId={customer.id} onChanged={refetch} />}
          {activeTab === "cards" && <CardsView fixedFilter={{ takenBy: customer.id }} />}
          {activeTab === "tvs" && <CustomerTvsTab customer={customer} />}
          {activeTab === "messages" && <MessagesTab customer={customer} />}
          {activeTab === "cardCategories" && <CustomerCardCategoryAccessTab customer={customer} onChanged={refetch} />}
          {activeTab === "subAgents" && customer.roleId === CustomerRole.Agent && (
            <CustomersList
              customerType={CustomerRole.SubAgent}
              viewKey="agentSubAgents"
              fixedFilter={{ parentAgentId: customer.id }}
            />
          )}
        </div>
      </Card>

      <CustomerDialogs
        dialog={dialog}
        customer={customer}
        createType={customer.roleId}
        onClose={() => setDialog(null)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default CustomerDetailsPage;
