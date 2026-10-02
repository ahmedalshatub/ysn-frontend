import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import UsersIcon from "../../../assets/icons/UsersIcon";
import CustomersList from "./CustomersList";
import { customerTypeConfigs, type CustomerTypeValue } from "../types/Customers.types";

interface CustomerTypePageProps {
  customerType: CustomerTypeValue;
}

const CustomerTypePage = ({ customerType }: CustomerTypePageProps) => {
  const { t } = useTranslation();
  const config = customerTypeConfigs[customerType];
  useTitle(t(config.pluralKey));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t(config.pluralKey)}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.customers") }, { label: t(config.pluralKey) }]}
        variant="gradient"
        icon={<UsersIcon />}
        showDate
        animated
      />
      <CustomersList customerType={customerType} viewKey={config.module} />
    </div>
  );
};

export default CustomerTypePage;
