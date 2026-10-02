import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";

const Dashboard = () => {
  const { t } = useTranslation();
  useTitle(t("sidebar.homePage"));

  return (
    <div className="dashboard-page space-y-6">
      {/* Header */}
      <div>
        <h1 className="dashboard-heading text-2xl font-bold">
          {t("sidebar.homePage")}
        </h1>
        <p className="dashboard-subtext mt-1 text-sm">
          Welcome to the dashboard. To configure your layout, edit:
        </p>
        <ul className="dashboard-subtext mt-2 list-inside list-disc text-sm">
          <li><code>src/assets/scss/app.scss</code> — sidebar &amp; horizontal-nav SCSS</li>
          <li><code>src/assets/scss/_variables.scss</code> — sidebar-specific variables</li>
          <li><code>src/layout/SidebarWrapper.tsx</code> — sidebar component</li>
          <li><code>src/layout/Navbar.tsx</code> — navbar style</li>
          <li><code>src/routes/AllRoutes.tsx</code> — layout mode (vertical / horizontal)</li>
        </ul>
      </div>

      {/* Sample stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Users", value: "2,847", change: "+12.5%", color: "blue" },
          { label: "Revenue", value: "$48,295", change: "+8.2%", color: "emerald" },
          { label: "Orders", value: "1,249", change: "-3.1%", color: "amber" },
          { label: "Active Sessions", value: "573", change: "+24.8%", color: "purple" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="dashboard-card rounded-xl border p-5"
          >
            <p className="dashboard-muted text-sm font-medium">
              {stat.label}
            </p>
            <p className="dashboard-heading mt-2 text-2xl font-bold">
              {stat.value}
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                stat.change.startsWith("+")
                  ? "dashboard-stat-up"
                  : "dashboard-stat-down"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
