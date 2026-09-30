import { useState } from "react";
import Button from "../../../shared/components/buttons/Button";
import Timeline from "../../../shared/components/display/Timeline";
import Calendar from "../../../shared/components/display/Calendar";
import OrgChart from "../../../shared/components/display/OrgChart";
import QRCode from "../../../shared/components/display/QRCode";
import Splitter from "../../../shared/components/display/Splitter";
import Watermark from "../../../shared/components/display/Watermark";
import Result from "../../../shared/components/display/Result";
import {
  SectionTitle,
  ExampleBlock,
  timelineBasicItems,
  timelineIconItems,
  calendarEvents,
  orgChartData,
} from "../types/showcaseData";

const DisplayTab = () => {
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);

  return (
    <div className="space-y-10">
      {/* ═══════════════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Timeline — Default (Left)" description="Basic left-aligned timeline." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems} />
      </ExampleBlock>

      <SectionTitle title="Timeline — Right Layout" description="Right-aligned timeline." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems} layout="right" />
      </ExampleBlock>

      <SectionTitle title="Timeline — Alternate Layout" description="Alternating sides." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems} layout="alternate" />
      </ExampleBlock>

      <SectionTitle title="Timeline — With Icons (Filled)" description="Icon markers with filled variant." />
      <ExampleBlock>
        <Timeline items={timelineIconItems} variant="filled" />
      </ExampleBlock>

      <SectionTitle title="Timeline — Outlined Variant" description="Outlined dot markers." />
      <ExampleBlock>
        <Timeline items={timelineIconItems} variant="outlined" />
      </ExampleBlock>

      <SectionTitle title="Timeline — Single Color" description="All dots in one color." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems} color="success" variant="filled" />
      </ExampleBlock>

      <SectionTitle title="Timeline — Alternate with Icons" description="Alternate layout + filled icons." />
      <ExampleBlock>
        <Timeline items={timelineIconItems} layout="alternate" variant="filled" />
      </ExampleBlock>

      <SectionTitle title="Timeline — No Animation" description="Static, no entrance animation." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems} animated={false} color="dark" />
      </ExampleBlock>

      <SectionTitle title="Timeline — No Connector" description="Without connecting lines." />
      <ExampleBlock>
        <Timeline items={timelineBasicItems.slice(0, 3)} showConnector={false} variant="filled" />
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          CALENDAR
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Calendar — Variants" description="Default, Bordered, and Filled." />
      <ExampleBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Default</h3>
            <Calendar value={calendarDate || undefined} onChange={setCalendarDate} events={calendarEvents} />
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Bordered</h3>
            <Calendar variant="bordered" events={calendarEvents} />
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Filled</h3>
            <Calendar variant="filled" events={calendarEvents} />
          </div>
        </div>
      </ExampleBlock>

      <SectionTitle title="Calendar — With Min/Max Dates" description="Restricted date range." />
      <ExampleBlock>
        <Calendar minDate={new Date(2026, 2, 5)} maxDate={new Date(2026, 2, 25)} events={calendarEvents} />
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          ORG CHART
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Org Chart" description="Organizational hierarchy visualizations." />
      <ExampleBlock>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Default (Vertical)</h3>
            <div className="border sc-divider rounded-lg overflow-auto">
              <OrgChart data={orgChartData} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Bordered</h3>
            <div className="border sc-divider rounded-lg overflow-auto">
              <OrgChart data={orgChartData} variant="bordered" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Filled</h3>
            <div className="border sc-divider rounded-lg overflow-auto">
              <OrgChart data={orgChartData} variant="filled" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Compact</h3>
            <div className="border sc-divider rounded-lg overflow-auto">
              <OrgChart data={orgChartData} variant="compact" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold sc-subheading mb-3">Horizontal</h3>
            <div className="border sc-divider rounded-lg overflow-auto">
              <OrgChart data={orgChartData} horizontal />
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          QR CODE
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="QR Code — Sizes" description="Different QR code sizes." />
      <ExampleBlock>
        <div className="flex flex-wrap items-end gap-6">
          <QRCode value="https://example.com" size={80} />
          <QRCode value="https://example.com" size={128} />
          <QRCode value="https://example.com" size={180} />
        </div>
      </ExampleBlock>

      <SectionTitle title="QR Code — With Border" description="Bordered QR code." />
      <ExampleBlock>
        <QRCode value="https://react.dev" size={150} bordered />
      </ExampleBlock>

      <SectionTitle title="QR Code — Custom Text" description="QR encoding arbitrary text." />
      <ExampleBlock>
        <QRCode value="Hello from the QR Code component!" size={160} />
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          SPLITTER
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Splitter — Horizontal" description="Side-by-side resizable panels." />
      <ExampleBlock>
        <div className="h-64 border sc-divider rounded-lg overflow-hidden">
          <Splitter direction="horizontal">
            <Splitter.Pane defaultSize={40} minSize={20}>
              <div className="p-4 h-full">
                <h4 className="font-semibold sc-subheading mb-2">Left Panel</h4>
                <p className="text-sm sc-text">Drag the gutter to resize.</p>
              </div>
            </Splitter.Pane>
            <Splitter.Pane minSize={20}>
              <div className="p-4 h-full">
                <h4 className="font-semibold sc-subheading mb-2">Right Panel</h4>
                <p className="text-sm sc-text">This is the right side content area.</p>
              </div>
            </Splitter.Pane>
          </Splitter>
        </div>
      </ExampleBlock>

      <SectionTitle title="Splitter — Vertical" description="Top-bottom resizable panels." />
      <ExampleBlock>
        <div className="h-80 border sc-divider rounded-lg overflow-hidden">
          <Splitter direction="vertical">
            <Splitter.Pane defaultSize={40} minSize={15}>
              <div className="p-4 h-full">
                <h4 className="font-semibold sc-subheading mb-2">Top Panel</h4>
                <p className="text-sm sc-text">Drag to resize vertically.</p>
              </div>
            </Splitter.Pane>
            <Splitter.Pane minSize={15}>
              <div className="p-4 h-full">
                <h4 className="font-semibold sc-subheading mb-2">Bottom Panel</h4>
                <p className="text-sm sc-text">This is the bottom content area.</p>
              </div>
            </Splitter.Pane>
          </Splitter>
        </div>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          RESULT
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Result — Success & Error" description="Standard outcome display." />
      <ExampleBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Result
            status="success"
            title="Successfully Purchased"
            subtitle="Order number: 2025-03-100. You will receive an email confirmation."
            extra={
              <div className="flex gap-3 justify-center">
                <Button variant="primary" label="Go Home" size="sm" />
                <Button variant="secondary" label="View Order" size="sm" />
              </div>
            }
          />
          <Result
            status="error"
            title="Submission Failed"
            subtitle="Please check your input and try again. If the problem persists, contact support."
            extra={
              <div className="flex gap-3 justify-center">
                <Button variant="danger" label="Try Again" size="sm" />
              </div>
            }
          />
        </div>
      </ExampleBlock>

      <SectionTitle title="Result — Warning & Info" description="Non-critical outcomes." />
      <ExampleBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Result status="warning" title="Action Required" subtitle="Your account needs verification before you can proceed." />
          <Result status="info" title="Information" subtitle="Your request has been submitted and is pending review." />
        </div>
      </ExampleBlock>

      <SectionTitle title="Result — Error Pages" description="404, 403, 500 error states." />
      <ExampleBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Result status="404" title="Page Not Found" subtitle="The page you're looking for doesn't exist." extra={<Button variant="primary" label="Back Home" size="sm" />} />
          <Result status="403" title="Access Denied" subtitle="You don't have permission to access this resource." />
          <Result status="500" title="Server Error" subtitle="Something went wrong on our end. Please try again later." />
        </div>
      </ExampleBlock>

      {/* ═══════════════════════════════════════════════
          WATERMARK
      ═══════════════════════════════════════════════ */}

      <SectionTitle title="Watermark — Default" description="Content protection overlay." />
      <ExampleBlock>
        <Watermark text="CONFIDENTIAL">
          <div className="h-48 rounded-lg border sc-divider p-6">
            <h4 className="text-lg font-semibold sc-subheading mb-2">Sensitive Document</h4>
            <p className="sc-text">This content is protected with a watermark overlay. The watermark is tamper-resistant and will re-render if removed from the DOM.</p>
          </div>
        </Watermark>
      </ExampleBlock>

      <SectionTitle title="Watermark — Custom Settings" description="Custom font, rotation, gap, opacity." />
      <ExampleBlock>
        <Watermark text="DRAFT" fontSize={20} rotate={-30} gap={120} opacity={0.1}>
          <div className="h-48 rounded-lg border sc-divider p-6">
            <h4 className="text-lg font-semibold sc-subheading mb-2">Draft Document</h4>
            <p className="sc-text">This watermark has custom font size, rotation, gap, and opacity settings.</p>
          </div>
        </Watermark>
      </ExampleBlock>
    </div>
  );
};

export default DisplayTab;
