import { useState } from "react";
import Button from "../../../shared/components/buttons/Button";
import ControlButton from "../../../shared/components/buttons/ControlButton";
import Switch from "../../../shared/components/buttons/Switch";
import PopConfirm from "../../../shared/components/buttons/PopConfirm";
import Badge from "../../../shared/components/badges/Badge";
import { SectionTitle, ExampleBlock } from "../types/showcaseData";

import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";

const ButtonsTab = () => {
  const [switchVal, setSwitchVal] = useState(true);
  const [removedBadges, setRemovedBadges] = useState<string[]>([]);

  const removeBadge = (key: string) => setRemovedBadges((prev) => [...prev, key]);

  return (
    <div className="space-y-8">
      {/* ── BUTTONS ────────────────────────────────── */}
      <SectionTitle title="Buttons" description="All button variants, sizes, icons, and states." />

      <ExampleBlock title="Solid Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Primary" />
          <Button variant="secondary" label="Secondary" />
          <Button variant="success" label="Success" />
          <Button variant="danger" label="Danger" />
          <Button variant="warning" label="Warning" />
          <Button variant="info" label="Info" />
          <Button variant="dark" label="Dark" />
          <Button variant="light" label="Light" />
          <Button variant="link" label="Link" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Outline Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" outline label="Primary" />
          <Button variant="secondary" outline label="Secondary" />
          <Button variant="success" outline label="Success" />
          <Button variant="danger" outline label="Danger" />
          <Button variant="warning" outline label="Warning" />
          <Button variant="info" outline label="Info" />
          <Button variant="dark" outline label="Dark" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" label="Small" />
          <Button variant="primary" size="md" label="Medium" />
          <Button variant="primary" size="lg" label="Large" />
          <Button variant="success" size="sm" outline label="Small Outline" />
          <Button variant="success" size="md" outline label="Medium Outline" />
          <Button variant="success" size="lg" outline label="Large Outline" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Add New" icon={<PlusIcon />} />
          <Button variant="success" label="Download" icon={<DownloadIcon />} />
          <Button variant="danger" label="Delete" icon={<TrashIcon />} />
          <Button variant="info" label="Search" icon={<SearchIcon />} />
          <Button variant="warning" label="Star" icon={<StarIcon />} />
          <Button variant="primary" label="Settings" icon={<SettingsIcon />} iconPosition="right" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Icon Only">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" icon={<PlusIcon />} iconOnly tooltip="Add New" />
          <Button variant="success" icon={<DownloadIcon />} iconOnly tooltip="Download" />
          <Button variant="danger" icon={<TrashIcon />} iconOnly tooltip="Delete" />
          <Button variant="warning" icon={<StarIcon />} iconOnly tooltip="Favorite" />
          <Button variant="info" icon={<SearchIcon />} iconOnly tooltip="Search" />
          <Button variant="dark" icon={<SettingsIcon />} iconOnly tooltip="Settings" />
          <Button variant="primary" icon={<PlusIcon />} iconOnly outline tooltip="Add (outline)" />
          <Button variant="danger" icon={<TrashIcon />} iconOnly outline tooltip="Delete (outline)" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Tooltips">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Hover Me" tooltip="Top tooltip" tooltipPosition="top" />
          <Button variant="success" label="Hover Me" tooltip="Bottom tooltip" tooltipPosition="bottom" />
          <Button variant="info" label="Hover Me" tooltip="Left tooltip" tooltipPosition="left" />
          <Button variant="warning" label="Hover Me" tooltip="Right tooltip" tooltipPosition="right" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Loading States">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Loading..." loading />
          <Button variant="success" label="Saving..." loading />
          <Button variant="danger" label="Deleting..." loading />
          <Button variant="primary" label="Loading" loading outline />
          <Button variant="success" label="Loading" loading size="sm" />
          <Button variant="info" label="Loading" loading size="lg" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Disabled" disabled />
          <Button variant="success" label="Disabled" disabled />
          <Button variant="danger" label="Disabled" disabled />
          <Button variant="primary" label="Disabled Outline" disabled outline />
          <Button variant="success" label="Disabled Outline" disabled outline />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Block (Full Width)">
        <div className="space-y-3 max-w-md">
          <Button variant="primary" label="Block Primary" block />
          <Button variant="success" label="Block Success" block />
          <Button variant="danger" label="Block Danger" block outline />
        </div>
      </ExampleBlock>

      {/* ── CONTROL BUTTONS ─────────────────────────── */}
      <SectionTitle title="Control Buttons" description="Selection and action cards in different states." />

      <ExampleBlock title="Outlined">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ControlButton variant="primary" icon={<MailIcon />} title="Email" description="Send via email" />
          <ControlButton variant="success" icon={<PackageIcon />} title="Package" description="Ship as package" />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Delete" description="Remove permanently" />
          <ControlButton variant="info" icon={<HelpCircleIcon />} title="Support" description="Get help" />
          <ControlButton variant="warning" icon={<StarIcon />} title="Favorite" description="Mark as favorite" />
          <ControlButton variant="dark" icon={<SettingsIcon />} title="Settings" description="Configure options" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Filled">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ControlButton variant="primary" icon={<MailIcon />} title="Email" description="Send via email" filled />
          <ControlButton variant="success" icon={<PackageIcon />} title="Package" description="Ship as package" filled />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Delete" description="Remove item" filled />
          <ControlButton variant="info" icon={<HelpCircleIcon />} title="Support" description="Contact support" filled />
          <ControlButton variant="warning" icon={<StarIcon />} title="Favorite" description="Add to favorites" filled />
          <ControlButton variant="dark" icon={<SettingsIcon />} title="Settings" description="System settings" filled />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Selected State">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ControlButton variant="primary" icon={<MailIcon />} title="Email" description="Selected" selected />
          <ControlButton variant="success" icon={<PackageIcon />} title="Package" description="Selected" selected filled />
          <ControlButton variant="warning" icon={<StarIcon />} title="Favorite" description="Selected" selected />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Without Description & Disabled">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ControlButton variant="primary" icon={<HomeIcon />} title="Home" />
          <ControlButton variant="success" icon={<ShieldIcon />} title="Security" />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Delete" disabled />
          <ControlButton variant="info" icon={<HelpCircleIcon />} title="Help" disabled filled />
        </div>
      </ExampleBlock>

      {/* ── BADGES ──────────────────────────────────── */}
      <SectionTitle title="Badges" description="Labels, statuses, and counters in all variants." />

      <ExampleBlock title="Solid Badges">
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" label="Primary" />
          <Badge variant="secondary" label="Secondary" />
          <Badge variant="success" label="Success" />
          <Badge variant="danger" label="Danger" />
          <Badge variant="warning" label="Warning" />
          <Badge variant="info" label="Info" />
          <Badge variant="dark" label="Dark" />
          <Badge variant="light" label="Light" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Outline Badges">
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" outline label="Primary" />
          <Badge variant="secondary" outline label="Secondary" />
          <Badge variant="success" outline label="Success" />
          <Badge variant="danger" outline label="Danger" />
          <Badge variant="warning" outline label="Warning" />
          <Badge variant="info" outline label="Info" />
          <Badge variant="dark" outline label="Dark" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" size="sm" label="Small" />
          <Badge variant="primary" size="md" label="Medium" />
          <Badge variant="primary" size="lg" label="Large" />
          <Badge variant="success" size="sm" outline label="Small Outline" />
          <Badge variant="success" size="md" outline label="Medium Outline" />
          <Badge variant="success" size="lg" outline label="Large Outline" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Pill Shape">
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" pill label="Primary Pill" />
          <Badge variant="success" pill label="Success Pill" />
          <Badge variant="danger" pill label="Danger Pill" />
          <Badge variant="warning" pill label="Warning Pill" />
          <Badge variant="info" pill label="Info Pill" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" icon={<StarIcon />} label="Featured" />
          <Badge variant="success" icon={<DownloadIcon />} label="Downloaded" />
          <Badge variant="danger" icon={<TrashIcon />} label="Deleted" />
          <Badge variant="warning" icon={<MailIcon />} label="Email" />
          <Badge variant="info" icon={<SearchIcon />} label="Searching" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Removable">
        <div className="flex flex-wrap gap-3">
          {!removedBadges.includes("r1") && <Badge variant="primary" removable label="React" onRemove={() => removeBadge("r1")} />}
          {!removedBadges.includes("r2") && <Badge variant="success" removable label="Vue" onRemove={() => removeBadge("r2")} />}
          {!removedBadges.includes("r3") && <Badge variant="danger" removable label="Angular" onRemove={() => removeBadge("r3")} />}
          {!removedBadges.includes("r4") && <Badge variant="warning" removable label="Svelte" onRemove={() => removeBadge("r4")} />}
          {!removedBadges.includes("r5") && <Badge variant="info" removable label="SolidJS" onRemove={() => removeBadge("r5")} />}
          {!removedBadges.includes("r6") && <Badge variant="primary" removable pill label="Pill Removable" onRemove={() => removeBadge("r6")} />}
          {removedBadges.length > 0 && <Button variant="secondary" size="sm" label="Reset" onClick={() => setRemovedBadges([])} />}
        </div>
      </ExampleBlock>

      {/* ── SWITCHES ────────────────────────────────── */}
      <SectionTitle title="Switches" description="Toggle switches in all variants, sizes, and states." />

      <ExampleBlock title="Variants">
        <div className="flex flex-wrap gap-6">
          <Switch variant="primary" checked={switchVal} onChange={setSwitchVal} label="Primary" />
          <Switch variant="success" defaultChecked label="Success" />
          <Switch variant="danger" defaultChecked label="Danger" />
          <Switch variant="warning" defaultChecked label="Warning" />
          <Switch variant="info" defaultChecked label="Info" />
          <Switch variant="dark" defaultChecked label="Dark" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" size="sm" defaultChecked label="Small" />
          <Switch variant="primary" size="md" defaultChecked label="Medium" />
          <Switch variant="primary" size="lg" defaultChecked label="Large" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Label Position">
        <div className="flex flex-wrap gap-6">
          <Switch variant="primary" defaultChecked label="Label Right" labelPosition="right" />
          <Switch variant="success" defaultChecked label="Label Left" labelPosition="left" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Off State (Unchecked)">
        <div className="flex flex-wrap gap-6">
          <Switch variant="primary" label="Off Primary" />
          <Switch variant="success" label="Off Success" />
          <Switch variant="danger" label="Off Danger" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled">
        <div className="flex flex-wrap gap-6">
          <Switch variant="primary" disabled label="Disabled Off" />
          <Switch variant="primary" disabled defaultChecked label="Disabled On" />
          <Switch variant="success" disabled defaultChecked label="Disabled Success" />
        </div>
      </ExampleBlock>

      {/* ── POP CONFIRM ─────────────────────────────── */}
      <SectionTitle title="Pop Confirm" description="Confirmation popover before destructive or important actions." />

      <ExampleBlock title="Default">
        <div className="flex flex-wrap gap-4">
          <PopConfirm title="Delete this item?" description="This action cannot be undone." onConfirm={() => alert("Confirmed!")}>
            <Button variant="danger" outline label="Delete" size="sm" />
          </PopConfirm>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Placements">
        <div className="flex flex-wrap gap-4">
          <PopConfirm title="Delete?" description="This cannot be undone." confirmVariant="danger" placement="top" onConfirm={() => {}}>
            <Button variant="danger" outline label="Top" size="sm" />
          </PopConfirm>
          <PopConfirm title="Archive this?" confirmVariant="warning" placement="bottom" onConfirm={() => {}}>
            <Button variant="warning" outline label="Bottom" size="sm" />
          </PopConfirm>
          <PopConfirm title="Confirm?" placement="left" onConfirm={() => {}}>
            <Button variant="info" outline label="Left" size="sm" />
          </PopConfirm>
          <PopConfirm title="Confirm?" placement="right" onConfirm={() => {}}>
            <Button variant="primary" outline label="Right" size="sm" />
          </PopConfirm>
        </div>
      </ExampleBlock>

      <ExampleBlock title="Confirm Variants">
        <div className="flex flex-wrap gap-4">
          <PopConfirm title="Primary action?" confirmVariant="primary" onConfirm={() => {}}>
            <Button variant="primary" outline label="Primary Confirm" size="sm" />
          </PopConfirm>
          <PopConfirm title="Dangerous action?" confirmVariant="danger" onConfirm={() => {}}>
            <Button variant="danger" outline label="Danger Confirm" size="sm" />
          </PopConfirm>
          <PopConfirm title="Warning action?" confirmVariant="warning" onConfirm={() => {}}>
            <Button variant="warning" outline label="Warning Confirm" size="sm" />
          </PopConfirm>
          <PopConfirm title="Success action?" confirmVariant="success" onConfirm={() => {}}>
            <Button variant="success" outline label="Success Confirm" size="sm" />
          </PopConfirm>
        </div>
      </ExampleBlock>
    </div>
  );
};

export default ButtonsTab;
