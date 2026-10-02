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
import CustomerCardCategoryAccessTab from "../../cardCategories/components/CustomerCardCategoryAccessTab";
import usePermission from "../../../shared/hooks/usePermission";
import { Permission } from "../../../shared/types/Permissions.types";
import { CustomerType, customerFullName, customerTypeConfigs } from "../types/Customers.types";

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
  const actions = customer ? getActions(customer).filter((action) => action.label !== t("messages.messages")) : [];

  const tabs = useMemo(() => {
    const list = [{ id: "overview", label: t("customers.overviewTab") }];
    if (customer?.userType === CustomerType.Agent) list.push({ id: "subAgents", label: t("customers.subAgentsTab") });
    if (can(Permission.MessagesView)) list.push({ id: "messages", label: t("messages.messages") });
    if (can(Permission.CardCategoriesView)) list.push({ id: "cardCategories", label: t("cardCategories.customerTab") });
    return list;
  }, [customer?.userType, can, t]);

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

  const config = customerTypeConfigs[customer.userType];

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
          {activeTab === "messages" && <MessagesTab customer={customer} />}
          {activeTab === "cardCategories" && <CustomerCardCategoryAccessTab customer={customer} onChanged={refetch} />}
          {activeTab === "subAgents" && customer.userType === CustomerType.Agent && (
            <CustomersList
              customerType={CustomerType.SubAgent}
              viewKey="agentSubAgents"
              fixedFilter={{ parentAgentId: customer.id }}
            />
          )}
        </div>
      </Card>

      <CustomerDialogs
        dialog={dialog}
        customer={customer}
        createType={customer.userType}
        onClose={() => setDialog(null)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default CustomerDetailsPage;
