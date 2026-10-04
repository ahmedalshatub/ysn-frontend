import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Loader from "../../../shared/components/feedback/Loader";

interface DashboardWidgetProps {
  title: string;
  loading?: boolean;
  empty?: boolean;
  children: ReactNode;
}

const DashboardWidget = ({ title, loading, empty, children }: DashboardWidgetProps) => {
  const { t } = useTranslation();

  const body = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-10">
          <Loader variant="spinner" size="md" />
        </div>
      );
    }
    if (empty) return <p className="py-10 text-center text-sm ce-muted">{t("dashboard.noData")}</p>;
    return children;
  };

  return (
    <Card variant="elevated" padding="md">
      <h3 className="mb-4 text-base font-semibold ce-heading">{title}</h3>
      {body()}
    </Card>
  );
};

export default DashboardWidget;
