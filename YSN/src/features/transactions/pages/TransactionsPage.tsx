import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import WalletIcon from "../../../assets/icons/WalletIcon";
import TransactionsView from "../components/TransactionsView";

const TransactionsPage = () => {
  const { t } = useTranslation();
  useTitle(t("transactions.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("transactions.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("transactions.pageTitle") }]}
        variant="gradient"
        icon={<WalletIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <TransactionsView />
      </Card>
    </div>
  );
};

export default TransactionsPage;
