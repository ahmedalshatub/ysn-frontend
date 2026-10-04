import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import LayersIcon from "../../../assets/icons/LayersIcon";
import CardsView from "../components/CardsView";

const CardsPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  useTitle(t("cards.pageTitle"));
  const [searchParams] = useSearchParams();
  const cardTypeId = searchParams.get("cardTypeId");
  const initialFilter = {
    importBatchId: searchParams.get("importBatchId") || undefined,
    cardTypeId: cardTypeId ? Number(cardTypeId) : undefined,
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("cards.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("sidebar.cards") }, { label: t("cards.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<LayersIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <CardsView actionsTarget={actionsTarget} key={searchParams.toString()} initialFilter={initialFilter} />
      </Card>
    </div>
  );
};

export default CardsPage;
