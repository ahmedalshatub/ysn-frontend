import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import usePermission from "../../../shared/hooks/usePermission";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import FilterAccordion from "../../../shared/components/navigation/FilterAccordion";
import Card from "../../../shared/components/cards/Card";
import HomeIcon from "../../../assets/icons/HomeIcon";
import DashboardFilters from "../components/DashboardFilters";
import WelcomeCard from "../components/WelcomeCard";
import { dashboardWidgets } from "../types/dashboardWidgets.types";
import { toRange } from "../utils/dashboardDates";
import { DashboardPeriod, type DashboardFilterValues } from "../types/Dashboard.types";
import DashboardStatCards from "../components/DashboardStatCards";

const initialValues: DashboardFilterValues = { period: DashboardPeriod.Month };

const DashboardPage = () => {
  const { t } = useTranslation();
  useTitle(t("sidebar.homePage"));
  const { can } = usePermission();
  const [draft, setDraft] = useState<DashboardFilterValues>(initialValues);
  const [values, setValues] = useState<DashboardFilterValues>(initialValues);

  const range = useMemo(() => toRange(values), [values]);
  const widgets = dashboardWidgets.filter((widget) => widget.isVisible(can));

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("sidebar.homePage")}
        items={[{ label: t("sidebar.homePage") }]}
        variant="gradient"
        icon={<HomeIcon />}
        showDate
        animated
      />

      {widgets.length === 0 ? (
        <WelcomeCard />
      ) : (
        <>
          <Card variant="elevated" padding="md">
            <FilterAccordion
              onSearch={() => setValues(draft)}
              onClear={() => {
                setDraft(initialValues);
                setValues(initialValues);
              }}
            >
              <DashboardFilters values={draft} onChange={setDraft} />
            </FilterAccordion>
          </Card>

          <DashboardStatCards range={range} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {widgets.map(({ key, wide, component: Widget }) => (
              <div key={key} className={wide ? "lg:col-span-2" : undefined}>
                <Widget range={range} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
