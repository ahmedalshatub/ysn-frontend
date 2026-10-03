import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import WalletIcon from "../../../assets/icons/WalletIcon";
import CardTypeDiscountsView from "../components/CardTypeDiscountsView";

const CardTypeDiscountsPage = () => {
  const { t } = useTranslation();
  useTitle(t("discounts.cardTypeDiscounts"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("discounts.cardTypeDiscounts")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.customers") }, { label: t("discounts.cardTypeDiscounts") }]}
        variant="gradient"
        icon={<WalletIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <CardTypeDiscountsView />
      </Card>
    </div>
  );
};

export default CardTypeDiscountsPage;
