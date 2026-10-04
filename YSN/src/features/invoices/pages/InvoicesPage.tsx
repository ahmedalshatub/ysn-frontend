import { useState } from "react";
import { useLocation } from "react-router-dom";
import useUrlFilter from "../../../shared/hooks/useUrlFilter";
import type { InvoiceRequest } from "../types/Invoices.types";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import InvoicesView from "../components/InvoicesView";

const InvoicesPage = () => {
  const { t } = useTranslation();
  const [actionsTarget, setActionsTarget] = useState<HTMLDivElement | null>(null);
  const location = useLocation();
  const initialFilter = useUrlFilter<InvoiceRequest>();
  useTitle(t("invoices.pageTitle"));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("invoices.pageTitle")}
        items={[{ label: t("sidebar.homePage") }, { label: t("invoices.pageTitle") }]}
        actions={<div ref={setActionsTarget} className="flex flex-wrap items-center gap-2" />}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
      />
      <Card variant="elevated" padding="md">
        <InvoicesView actionsTarget={actionsTarget} key={location.search} initialFilter={initialFilter} />
      </Card>
    </div>
  );
};

export default InvoicesPage;
