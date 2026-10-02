import Loader from "../../../shared/components/feedback/Loader";
import Skeleton from "../../../shared/components/feedback/Skeleton";
import { SectionTitle, ExampleBlock } from "../types/showcaseData";

const FeedbackTab = () => (
  <div className="space-y-10">
    {/* ═══════════════════════════════════════════════
        LOADER
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Loader — Variants" description="All loader animation styles." />
    <ExampleBlock>
      <div className="flex flex-wrap items-center gap-8">
        <Loader variant="spinner" label="Spinner" />
        <Loader variant="dots" label="Dots" />
        <Loader variant="pulse" label="Pulse" />
        <Loader variant="bars" label="Bars" />
        <Loader variant="ring" label="Ring" />
        <Loader variant="bounce" label="Bounce" />
      </div>
    </ExampleBlock>

    <SectionTitle title="Loader — Sizes" description="XS through XL." />
    <ExampleBlock>
      <div className="flex flex-wrap items-end gap-8">
        <Loader size="xs" label="XS" />
        <Loader size="sm" label="SM" />
        <Loader size="md" label="MD" />
        <Loader size="lg" label="LG" />
        <Loader size="xl" label="XL" />
      </div>
    </ExampleBlock>

    <SectionTitle title="Loader — Colors" description="Theme color variants." />
    <ExampleBlock>
      <div className="flex flex-wrap items-center gap-8">
        <Loader color="primary" label="Primary" />
        <Loader color="success" label="Success" />
        <Loader color="danger" label="Danger" />
        <Loader color="warning" label="Warning" />
        <Loader color="info" label="Info" />
        <Loader color="secondary" label="Secondary" />
      </div>
    </ExampleBlock>

    <SectionTitle title="Loader — Dots Colors" description="Dots variant with colors." />
    <ExampleBlock>
      <div className="flex flex-wrap items-center gap-8">
        <Loader variant="dots" color="primary" />
        <Loader variant="dots" color="success" />
        <Loader variant="dots" color="danger" />
        <Loader variant="dots" color="warning" />
      </div>
    </ExampleBlock>

    <SectionTitle title="Loader — Overlay" description="Full-container overlay loader." />
    <ExampleBlock>
      <div className="relative h-40 rounded-lg border sc-divider overflow-hidden">
        <div className="p-4">
          <p className="sc-text">This content is behind an overlay loader.</p>
          <p className="sc-muted text-sm mt-2">The loader covers the parent container.</p>
        </div>
        <Loader overlay label="Loading..." />
      </div>
    </ExampleBlock>

    {/* ═══════════════════════════════════════════════
        SKELETON
    ═══════════════════════════════════════════════ */}

    <SectionTitle title="Skeleton — Text Lines" description="Multi-line text placeholder." />
    <ExampleBlock>
      <Skeleton variant="text" lines={4} />
    </ExampleBlock>

    <SectionTitle title="Skeleton — Variants" description="Circular, Rectangular, Rounded." />
    <ExampleBlock>
      <div className="flex flex-wrap items-center gap-6">
        <Skeleton variant="circular" width={64} height={64} />
        <Skeleton variant="rectangular" width={200} height={100} />
        <Skeleton variant="rounded" width={200} height={100} />
      </div>
    </ExampleBlock>

    <SectionTitle title="Skeleton — Group (Card)" description="Avatar + text lines group." />
    <ExampleBlock>
      <div className="max-w-sm">
        <Skeleton.Group avatar lines={3} />
      </div>
    </ExampleBlock>

    <SectionTitle title="Skeleton — Multiple Groups (List)" description="Repeated list item skeletons." />
    <ExampleBlock>
      <div className="space-y-4 max-w-md">
        <Skeleton.Group avatar avatarSize={40} lines={2} />
        <Skeleton.Group avatar avatarSize={40} lines={2} />
        <Skeleton.Group avatar avatarSize={40} lines={2} />
      </div>
    </ExampleBlock>
  </div>
);

export default FeedbackTab;
