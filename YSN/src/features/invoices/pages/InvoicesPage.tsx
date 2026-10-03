import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import InvoicesView from "../components/InvoicesView";

const InvoicesPage = () => {
  const { t } = useTranslation();
  useTitle(t("invoices.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("invoices.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("invoices.pageTitle") }]}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <InvoicesView />
      </Card>
    </div>
  );
};

export default InvoicesPage;
