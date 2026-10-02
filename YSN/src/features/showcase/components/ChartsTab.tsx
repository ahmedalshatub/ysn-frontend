import LineChart from "../../../shared/components/charts/LineChart";
import BarChart from "../../../shared/components/charts/BarChart";
import AreaChart from "../../../shared/components/charts/AreaChart";
import PieChart from "../../../shared/components/charts/PieChart";
import DoughnutChart from "../../../shared/components/charts/DoughnutChart";
import RadarChart from "../../../shared/components/charts/RadarChart";
import PolarAreaChart from "../../../shared/components/charts/PolarAreaChart";
import { SectionTitle, ExampleBlock } from "../types/showcaseData";
import {
  monthLabels,
  revenueDatasets,
  multiLineDatasets,
  salesBarDatasets,
  comparisonBarDatasets,
  stackedBarDatasets,
  horizontalBarLabels,
  horizontalBarDatasets,
  pieLabels,
  pieData,
  doughnutLabels,
  doughnutData,
  trafficAreaDatasets,
  stackedAreaDatasets,
  radarLabels,
  radarDatasets,
  skillRadarLabels,
  skillRadarDatasets,
  polarLabels,
  polarData,
} from "../types/showcaseData";

const ChartsTab = () => (
  <div className="space-y-10">
    {/* ═══════════════════════════════════════════════
        LINE CHARTS
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Line Chart — Revenue Trend" description="Single dataset line chart with fill." />
    <ExampleBlock>
      <LineChart labels={monthLabels} datasets={revenueDatasets} />
    </ExampleBlock>

    <SectionTitle title="Line Chart — Multi-line (Device Traffic)" description="Multiple datasets comparison." />
    <ExampleBlock>
      <LineChart labels={monthLabels} datasets={multiLineDatasets} />
    </ExampleBlock>

    {/* ═══════════════════════════════════════════════
        BAR CHARTS
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Bar Chart — Monthly Sales" description="Single dataset bar chart." />
    <ExampleBlock>
      <BarChart labels={monthLabels} datasets={salesBarDatasets} />
    </ExampleBlock>

    <SectionTitle title="Bar Chart — Year Comparison" description="Side-by-side bar comparison." />
    <ExampleBlock>
      <BarChart labels={monthLabels} datasets={comparisonBarDatasets} />
    </ExampleBlock>

    <SectionTitle title="Bar Chart — Stacked" description="Stacked bar chart." />
    <ExampleBlock>
      <BarChart labels={monthLabels} datasets={stackedBarDatasets} stacked />
    </ExampleBlock>

    <SectionTitle title="Bar Chart — Horizontal" description="Horizontal orientation without legend." />
    <ExampleBlock>
      <BarChart labels={horizontalBarLabels} datasets={horizontalBarDatasets} horizontal showLegend={false} />
    </ExampleBlock>

    {/* ═══════════════════════════════════════════════
        PIE & DOUGHNUT
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Pie Chart — Traffic Sources" description="Standard pie chart." />
    <ExampleBlock>
      <div className="max-w-lg mx-auto">
        <PieChart labels={pieLabels} data={pieData} />
      </div>
    </ExampleBlock>

    <SectionTitle title="Doughnut Chart — Device Breakdown" description="With center text." />
    <ExampleBlock>
      <div className="max-w-lg mx-auto">
        <DoughnutChart labels={doughnutLabels} data={doughnutData} centerText="45%" centerSubText="Desktop" />
      </div>
    </ExampleBlock>

    <SectionTitle title="Doughnut Chart — No Center Text" description="Bottom legend, no center label." />
    <ExampleBlock>
      <div className="max-w-lg mx-auto">
        <DoughnutChart labels={pieLabels} data={pieData} legendPosition="bottom" />
      </div>
    </ExampleBlock>

    {/* ═══════════════════════════════════════════════
        AREA CHARTS
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Area Chart — Traffic Overview" description="Single dataset filled area." />
    <ExampleBlock>
      <AreaChart labels={monthLabels} datasets={trafficAreaDatasets} />
    </ExampleBlock>

    <SectionTitle title="Area Chart — Stacked Languages" description="Stacked area chart." />
    <ExampleBlock>
      <AreaChart labels={monthLabels} datasets={stackedAreaDatasets} stacked />
    </ExampleBlock>

    {/* ═══════════════════════════════════════════════
        RADAR & POLAR
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Radar Chart — Product Comparison" description="Multi-dataset radar chart." />
    <ExampleBlock>
      <div className="max-w-xl mx-auto">
        <RadarChart labels={radarLabels} datasets={radarDatasets} />
      </div>
    </ExampleBlock>

    <SectionTitle title="Radar Chart — Skills Assessment" description="Single-dataset skills radar." />
    <ExampleBlock>
      <div className="max-w-xl mx-auto">
        <RadarChart labels={skillRadarLabels} datasets={skillRadarDatasets} />
      </div>
    </ExampleBlock>

    <SectionTitle title="Polar Area Chart — Project Time" description="Polar area distribution." />
    <ExampleBlock>
      <div className="max-w-lg mx-auto">
        <PolarAreaChart labels={polarLabels} data={polarData} />
      </div>
    </ExampleBlock>
  </div>
);

export default ChartsTab;
