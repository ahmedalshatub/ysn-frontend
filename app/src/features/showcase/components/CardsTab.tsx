import Button from "../../../shared/components/buttons/Button";
import Card from "../../../shared/components/cards/Card";
import StatCard from "../../../shared/components/cards/StatCard";
import GradientStatCard from "../../../shared/components/cards/GradientStatCard";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import ProgressStatCard from "../../../shared/components/cards/ProgressStatCard";
import RingStatCard from "../../../shared/components/cards/RingStatCard";
import SparklineStatCard from "../../../shared/components/cards/SparklineStatCard";
import ViewCard from "../../../shared/components/cards/ViewCard";
import Badge from "../../../shared/components/badges/Badge";
import {
  SectionTitle,
  ExampleBlock,
  sparklineRevenueData,
  sparklineUsersData,
  sparklineOrdersData,
  sparklineConversionData,
} from "../types/showcaseData";

import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";

const CardsTab = () => (
  <div className="space-y-8">
    {/* ── CARD ────────────────────────────────── */}
    <SectionTitle title="Card" description="Basic card component with header, body, footer, and actions." />

    <ExampleBlock title="Basic / Footer / Header Actions">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Basic Card" subtitle="A simple card with title and subtitle."><p className="text-sm sc-subtext">Card body content goes here.</p></Card>
        <Card title="With Footer" subtitle="This card has a footer area." footer={<Button variant="primary" size="sm" label="Action" />}><p className="text-sm sc-subtext">Card body content.</p></Card>
        <Card title="Custom Header" subtitle="Card with actions in header." actions={<Badge variant="success" label="New" size="sm" />}><p className="text-sm sc-subtext">Card body content.</p></Card>
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — BASIC ─────────────────── */}
    <SectionTitle title="StatCard" description="Dashboard statistics cards with change indicators." />

    <ExampleBlock title="Standard Stats">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$48,560" icon={<StarIcon />} change={12.5} variant="primary" />
        <StatCard title="New Users" value="2,340" icon={<PlusIcon />} change={8.2} variant="success" />
        <StatCard title="Bounce Rate" value="24.3%" icon={<TrashIcon />} change={-3.1} variant="danger" />
        <StatCard title="Avg. Session" value="4m 32s" icon={<SearchIcon />} variant="info" subtitle="Last 30 days" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatCard title="Orders" value="1,248" change={5.7} variant="warning" />
        <StatCard title="Subscribers" value="9,812" change={18.3} variant="secondary" />
        <StatCard title="Tickets" value="342" change={-7.4} variant="dark" />
        <StatCard title="Page Views" value="128K" subtitle="All time" variant="info" />
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — GRADIENT ──────────────── */}
    <SectionTitle title="GradientStatCard" description="Stat cards with gradient backgrounds." />

    <ExampleBlock title="Gradient Variants">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientStatCard title="Revenue" value="$84,230" icon={<StarIcon />} change={22.4} gradient="blue" />
        <GradientStatCard title="Projects" value="156" icon={<PlusIcon />} change={11.8} gradient="purple" />
        <GradientStatCard title="Growth" value="+34.7%" icon={<DownloadIcon />} gradient="emerald" subtitle="Quarter over quarter" />
        <GradientStatCard title="Churn Rate" value="2.4%" icon={<TrashIcon />} change={-0.8} gradient="rose" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <GradientStatCard title="Active Users" value="12,480" change={15.3} gradient="amber" />
        <GradientStatCard title="Server Uptime" value="99.98%" gradient="cyan" subtitle="Last 90 days" />
        <GradientStatCard title="API Calls" value="2.4M" change={42.1} gradient="dark" />
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — PROGRESS ──────────────── */}
    <SectionTitle title="ProgressStatCard" description="Stat cards with progress bar indicator." />

    <ExampleBlock title="Progress Variants">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProgressStatCard title="Storage Used" value="48.2 GB" progress={72} icon={<DownloadIcon />} variant="primary" target="64 GB" />
        <ProgressStatCard title="Tasks Complete" value="184 / 240" progress={76.6} variant="success" target="240 tasks" />
        <ProgressStatCard title="Budget Spent" value="$18,400" progress={92} icon={<StarIcon />} variant="danger" target="$20,000" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <ProgressStatCard title="Course Progress" value="Module 7 / 12" progress={58} variant="warning" target="12 modules" />
        <ProgressStatCard title="Upload Progress" value="3.2 GB" progress={40} variant="info" target="8 GB" />
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — RING ──────────────────── */}
    <SectionTitle title="RingStatCard" description="Stat cards with circular ring progress." />

    <ExampleBlock title="Ring Variants & Sizes">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RingStatCard title="CPU Usage" value="67%" progress={67} variant="primary" size="lg" subtitle="Average this hour" />
        <RingStatCard title="Disk Space" value="234 GB" progress={78} variant="danger" icon={<DownloadIcon />} subtitle="of 300 GB used" />
        <RingStatCard title="Tasks Done" value="42 / 50" progress={84} variant="success" size="lg" subtitle="Sprint #14" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <RingStatCard title="Memory" value="8.2 GB" progress={51} variant="warning" size="sm" />
        <RingStatCard title="Battery" value="92%" progress={92} variant="success" size="sm" />
        <RingStatCard title="Errors" value="3.2%" progress={3.2} variant="danger" size="sm" />
        <RingStatCard title="Network" value="84 Mbps" progress={84} variant="info" size="sm" />
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — SPARKLINE ─────────────── */}
    <SectionTitle title="SparklineStatCard" description="Stat cards with inline sparkline charts." />

    <ExampleBlock title="Sparkline Variants">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SparklineStatCard title="Revenue Trend" value="$92,450" data={sparklineRevenueData} change={18.2} variant="primary" />
        <SparklineStatCard title="User Growth" value="2,250" data={sparklineUsersData} change={12.4} variant="success" />
        <SparklineStatCard title="Orders Decline" value="420" data={sparklineOrdersData} change={-15.6} changeLabel="vs last quarter" variant="danger" />
        <SparklineStatCard title="Conversion Rate" value="4.2%" data={sparklineConversionData} change={8.1} variant="info" />
      </div>
    </ExampleBlock>

    {/* ── STAT CARDS — MINI ──────────────────── */}
    <SectionTitle title="MiniStatCard" description="Compact stat cards for dense layouts." />

    <ExampleBlock title="Mini Variants">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <MiniStatCard icon={<StarIcon />} label="Total Revenue" value="$48.5K" change={12.5} variant="primary" />
        <MiniStatCard icon={<PlusIcon />} label="New Users" value="2,340" change={8.2} variant="success" />
        <MiniStatCard icon={<TrashIcon />} label="Bounce Rate" value="24.3%" change={-3.1} variant="danger" />
        <MiniStatCard icon={<SearchIcon />} label="Sessions" value="18.2K" change={5.4} variant="info" />
        <MiniStatCard icon={<DownloadIcon />} label="Downloads" value="9,412" change={22.8} variant="warning" />
        <MiniStatCard icon={<StarIcon />} label="Rating" value="4.8 / 5" variant="dark" />
      </div>
    </ExampleBlock>

    {/* ── VIEW CARD ──────────────────────────── */}
    <SectionTitle title="ViewCard" description="Display cards for content previews." />

    <ExampleBlock>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ViewCard title="Project Alpha" description="A cross-platform mobile application." />
        <ViewCard title="Design System" description="Comprehensive UI component library." />
      </div>
    </ExampleBlock>
  </div>
);

export default CardsTab;
