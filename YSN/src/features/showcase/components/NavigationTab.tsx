import { useState } from "react";
import Button from "../../../shared/components/buttons/Button";
import Input from "../../../shared/components/inputs/Input";
import Breadcrumb from "../../../shared/components/navigation/Breadcrumb";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Tabs from "../../../shared/components/navigation/Tabs";
import Stepper from "../../../shared/components/navigation/Stepper";
import Accordion from "../../../shared/components/navigation/Accordion";
import Dropdown from "../../../shared/components/navigation/Dropdown";
import PanelDropdown from "../../../shared/components/navigation/PanelDropdown";
import NotificationDropdown from "../../notifications/components/NotificationDropdown";
import Toolbar from "../../../shared/components/navigation/Toolbar";
import TreeView from "../../../shared/components/navigation/TreeView";
import Drawer from "../../../shared/components/navigation/Drawer";
import {
  SectionTitle,
  ExampleBlock,
  breadcrumbItems,
  breadcrumbShortItems,
  pageBreadcrumbItems,
  pageBreadcrumbProjectItems,
  pageBreadcrumbUsersItems,
  checkoutSteps,
  accountSteps,
  projectSteps,
  errorSteps,
  accordionBasicItems,
  accordionIconItems,
  dropdownBasicItems,
  dropdownWithDescItems,
  dropdownGroupedItems,
  dropdownActiveItems,
  dropdownLongItems,
  profileTabs,
  projectTabs,
  settingsTabs,
  treeViewData,
  notificationDemoItems,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  LinkIcon,
  ImageIcon,
  UndoIcon,
  RedoIcon,
} from "../types/showcaseData";

import HomeIcon from "../../../assets/icons/HomeIcon";

const NavigationTab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPos, setDrawerPos] = useState<"left" | "right" | "top" | "bottom">("right");
  const [drawerSize, setDrawerSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);

  return (
    <div className="space-y-8">
      {/* ── BREADCRUMB ───────────────────────── */}
      <SectionTitle title="Breadcrumb" description="Navigation path indicators with separators, variants, and sizes." />

      <ExampleBlock title="Separators">
        <div className="space-y-3">
          {(["chevron", "slash", "arrow", "dot", "dash"] as const).map((sep) => (
            <div key={sep}>
              <p className="text-xs font-medium sc-subtext mb-1 capitalize">{sep}</p>
              <Breadcrumb items={breadcrumbItems} separator={sep} />
            </div>
          ))}
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants">
        <div className="space-y-3">
          {(["contained", "pills", "arrows", "dots", "bordered"] as const).map((v) => (
            <div key={v}>
              <p className="text-xs font-medium sc-subtext mb-1 capitalize">{v}</p>
              <Breadcrumb items={breadcrumbItems} variant={v} />
            </div>
          ))}
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes & Home Icon">
        <div className="space-y-3">
          <div><p className="text-xs font-medium sc-subtext mb-1">Small + Home Icon</p><Breadcrumb items={breadcrumbShortItems} size="sm" homeIcon /></div>
          <div><p className="text-xs font-medium sc-subtext mb-1">Medium + Home Icon</p><Breadcrumb items={breadcrumbShortItems} size="md" homeIcon /></div>
          <div><p className="text-xs font-medium sc-subtext mb-1">Large + Home Icon</p><Breadcrumb items={breadcrumbShortItems} size="lg" homeIcon /></div>
        </div>
      </ExampleBlock>

      {/* ── PAGE BREADCRUMB ──────────────────── */}
      <SectionTitle title="PageBreadcrumb" description="Full page breadcrumb with title, subtitle, icon, and variants." />

      <ExampleBlock title="Default">
        <PageBreadcrumb title="Component Showcase" items={pageBreadcrumbItems} />
      </ExampleBlock>

      <ExampleBlock title="Gradient with Icon & Date">
        <PageBreadcrumb title="Dashboard" subtitle="Welcome back!" items={pageBreadcrumbItems} variant="gradient" icon={<HomeIcon />} showDate />
      </ExampleBlock>

      <ExampleBlock title="Different Paths">
        <div className="space-y-4">
          <PageBreadcrumb title="Projects" subtitle="All active projects" items={pageBreadcrumbProjectItems} variant="gradient" />
          <PageBreadcrumb title="User Management" items={pageBreadcrumbUsersItems} />
        </div>
      </ExampleBlock>

      {/* ── TABS ─────────────────────────────── */}
      <SectionTitle title="Tabs" description="Tabbed navigation with line, pills, sizes, colors, and full-width." />

      <ExampleBlock title="Line (Default)">
        <Tabs tabs={profileTabs} />
      </ExampleBlock>

      <ExampleBlock title="Pills">
        <Tabs tabs={projectTabs} variant="pills" />
      </ExampleBlock>

      <ExampleBlock title="Line Full Width">
        <Tabs tabs={profileTabs} fullWidth />
      </ExampleBlock>

      <ExampleBlock title="Pills Full Width">
        <Tabs tabs={projectTabs} variant="pills" fullWidth />
      </ExampleBlock>

      <ExampleBlock title="Colors & Sizes">
        <div className="space-y-4">
          <Tabs tabs={settingsTabs} color="success" />
          <Tabs tabs={profileTabs.slice(0, 3)} variant="pills" color="danger" />
          <Tabs tabs={projectTabs.slice(0, 3)} color="dark" />
          <Tabs tabs={profileTabs.slice(0, 3)} size="sm" />
          <Tabs tabs={projectTabs.slice(0, 3)} variant="pills" size="lg" />
        </div>
      </ExampleBlock>

      {/* ── STEPPER ──────────────────────────── */}
      <SectionTitle title="Stepper" description="Multi-step progress indicator with variants, orientations, and sizes." />

      <ExampleBlock title="Default (Horizontal) — Interactive">
        <Stepper steps={checkoutSteps} activeStep={currentStep} onStepClick={setCurrentStep} clickable />
        <div className="flex gap-3 mt-4">
          <Button variant="secondary" size="sm" label="Back" disabled={currentStep === 0} onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} />
          <Button variant="primary" size="sm" label="Next" disabled={currentStep === checkoutSteps.length - 1} onClick={() => setCurrentStep(Math.min(checkoutSteps.length - 1, currentStep + 1))} />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Variants">
        <div className="space-y-6">
          <div><p className="text-sm sc-subtext mb-2">Outlined</p><Stepper steps={accountSteps} activeStep={2} variant="outlined" /></div>
          <div><p className="text-sm sc-subtext mb-2">Filled</p><Stepper steps={accountSteps} activeStep={2} variant="filled" /></div>
          <div><p className="text-sm sc-subtext mb-2">Gradient</p><Stepper steps={projectSteps} activeStep={1} variant="gradient" /></div>
          <div><p className="text-sm sc-subtext mb-2">Minimal</p><Stepper steps={projectSteps} activeStep={2} variant="minimal" /></div>
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Error Step">
        <Stepper steps={errorSteps} activeStep={2} />
      </ExampleBlock>

      <ExampleBlock title="Label Positions">
        <div className="space-y-6">
          <div><p className="text-sm sc-subtext mb-2">Label Right</p><Stepper steps={checkoutSteps} activeStep={1} labelPlacement="right" clickable /></div>
          <div><p className="text-sm sc-subtext mb-2">Alternate Labels</p><Stepper steps={accountSteps} activeStep={2} labelPlacement="alternate" /></div>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Vertical">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Stepper steps={checkoutSteps} activeStep={2} orientation="vertical" />
          <Stepper steps={projectSteps} activeStep={1} orientation="vertical" variant="gradient" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="space-y-6">
          <div><p className="text-sm sc-subtext mb-2">Small</p><Stepper steps={checkoutSteps} activeStep={1} size="sm" /></div>
          <div><p className="text-sm sc-subtext mb-2">Large</p><Stepper steps={checkoutSteps} activeStep={1} size="lg" /></div>
        </div>
      </ExampleBlock>

      {/* ── ACCORDION ────────────────────────── */}
      <SectionTitle title="Accordion" description="Collapsible content panels with basic and icon variants." />

      <ExampleBlock title="Basic">
        <Accordion items={accordionBasicItems} />
      </ExampleBlock>

      <ExampleBlock title="With Icons & Disabled">
        <Accordion items={accordionIconItems} />
      </ExampleBlock>

      {/* ── DROPDOWN ─────────────────────────── */}
      <SectionTitle title="Dropdown" description="Menu dropdowns with descriptions, groups, active states, and scrollable lists." />

      <ExampleBlock title="Variants">
        <div className="flex flex-wrap gap-4">
          <Dropdown items={dropdownBasicItems} trigger={<Button variant="primary" size="sm" label="Basic" />} />
          <Dropdown items={dropdownWithDescItems} trigger={<Button variant="secondary" outline size="sm" label="With Descriptions" />} />
          <Dropdown items={dropdownGroupedItems} trigger={<Button variant="info" size="sm" label="Grouped" />} />
          <Dropdown items={dropdownActiveItems} trigger={<Button variant="success" size="sm" label="Active Items" />} />
          <Dropdown items={dropdownLongItems} trigger={<Button variant="dark" size="sm" label="Scrollable (15)" />} />
        </div>
      </ExampleBlock>

      {/* ── PANEL DROPDOWN ───────────────────── */}
      <SectionTitle title="PanelDropdown" description="Rich panel dropdown with header, footer, and custom content." />

      <ExampleBlock>
        <div className="flex gap-4">
          <PanelDropdown
            trigger={<Button variant="primary" size="sm" label="Quick Actions" />}
            header={<div className="p-3 border-b"><p className="font-semibold sc-heading">Quick Actions</p></div>}
            footer={<div className="p-3 border-t"><Button variant="primary" size="sm" label="View All" block /></div>}
          >
            <div className="p-3 space-y-2">
              <Button variant="secondary" outline size="sm" label="Create Project" block />
              <Button variant="secondary" outline size="sm" label="Invite Team" block />
              <Button variant="secondary" outline size="sm" label="Generate Report" block />
            </div>
          </PanelDropdown>
        </div>
      </ExampleBlock>

      {/* ── NOTIFICATION DROPDOWN ────────────── */}
      <SectionTitle title="NotificationDropdown" description="Bell icon dropdown for notifications." />

      <ExampleBlock>
        <NotificationDropdown notifications={notificationDemoItems} unreadCount={3} onMarkAllRead={() => {}} onClear={() => {}} onViewAll={() => {}} />
      </ExampleBlock>

      {/* ── TOOLBAR ──────────────────────────── */}
      <SectionTitle title="Toolbar" description="Action bar with grouped tools and dividers." />

      <ExampleBlock title="Text Editor Toolbar">
        <Toolbar
          items={[
            { id: "bold", icon: <BoldIcon />, tooltip: "Bold", active: boldActive, onClick: () => setBoldActive((p) => !p) },
            { id: "italic", icon: <ItalicIcon />, tooltip: "Italic", active: italicActive, onClick: () => setItalicActive((p) => !p) },
            { id: "underline", icon: <UnderlineIcon />, tooltip: "Underline", active: underlineActive, onClick: () => setUnderlineActive((p) => !p) },
            { id: "d1", type: "divider" as const },
            { id: "align-left", icon: <AlignLeftIcon />, tooltip: "Align Left" },
            { id: "align-center", icon: <AlignCenterIcon />, tooltip: "Align Center" },
            { id: "align-right", icon: <AlignRightIcon />, tooltip: "Align Right" },
            { id: "d2", type: "divider" as const },
            { id: "link", icon: <LinkIcon />, tooltip: "Insert Link" },
            { id: "image", icon: <ImageIcon />, tooltip: "Insert Image" },
            { id: "d3", type: "divider" as const },
            { id: "undo", icon: <UndoIcon />, tooltip: "Undo" },
            { id: "redo", icon: <RedoIcon />, tooltip: "Redo" },
          ]}
        />
      </ExampleBlock>

      <ExampleBlock title="Toolbar Variants">
        <div className="space-y-4">
          {(["default", "bordered", "filled", "floating"] as const).map((v) => (
            <div key={v}>
              <p className="text-sm sc-subtext mb-2 capitalize">{v}</p>
              <Toolbar
                variant={v}
                items={[
                  { id: `${v}-b`, icon: <BoldIcon />, tooltip: "Bold" },
                  { id: `${v}-i`, icon: <ItalicIcon />, tooltip: "Italic" },
                  { id: `${v}-u`, icon: <UnderlineIcon />, tooltip: "Underline" },
                  { id: `${v}-d`, type: "divider" as const },
                  { id: `${v}-al`, icon: <AlignLeftIcon />, tooltip: "Left" },
                  { id: `${v}-ac`, icon: <AlignCenterIcon />, tooltip: "Center" },
                ]}
              />
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ── TREE VIEW ────────────────────────── */}
      <SectionTitle title="TreeView" description="Hierarchical folder/file tree." />

      <ExampleBlock>
        <div className="max-w-sm">
          <TreeView data={treeViewData} />
        </div>
      </ExampleBlock>

      {/* ── DRAWER ───────────────────────────── */}
      <SectionTitle title="Drawer" description="Slide-out panels from any edge with multiple sizes." />

      <ExampleBlock title="Positions & Sizes">
        <div className="flex flex-wrap gap-3">
          {(["right", "left", "top", "bottom"] as const).map((pos) => (
            <Button key={pos} variant="primary" outline size="sm" label={`Open ${pos}`} onClick={() => { setDrawerPos(pos); setDrawerSize("md"); setDrawerOpen(true); }} />
          ))}
          {(["sm", "lg", "xl"] as const).map((sz) => (
            <Button key={sz} variant="secondary" outline size="sm" label={`Size ${sz.toUpperCase()}`} onClick={() => { setDrawerPos("right"); setDrawerSize(sz); setDrawerOpen(true); }} />
          ))}
        </div>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Example Drawer" subtitle={`Position: ${drawerPos}, Size: ${drawerSize}`} position={drawerPos} size={drawerSize}>
          <div className="p-4 space-y-4">
            <p className="sc-heading">Drawer content goes here.</p>
            <Input label="Name" placeholder="Enter name" />
            <Button variant="primary" label="Save" block />
          </div>
        </Drawer>
      </ExampleBlock>
    </div>
  );
};

export default NavigationTab;
