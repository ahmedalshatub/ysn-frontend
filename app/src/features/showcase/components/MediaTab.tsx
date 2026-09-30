import Avatar from "../../../shared/components/media/Avatar";
import AvatarGroup from "../../../shared/components/media/AvatarGroup";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import ImageDisplay from "../../../shared/components/media/ImageDisplay";
import ImageViewer from "../../../shared/components/media/ImageViewer";
import GalleryViewer from "../../../shared/components/media/GalleryViewer";
import Carousel from "../../../shared/components/media/Carousel";
import CardCarousel from "../../../shared/components/media/CardCarousel";
import VideoPlayer from "../../../shared/components/media/VideoPlayer";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import GradientStatCard from "../../../shared/components/cards/GradientStatCard";
import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import {
  SectionTitle,
  ExampleBlock,
  carouselSlides,
  photoSlides,
  avatarGroupItems,
  avatarGroupInitials,
  galleryImages,
  sampleVideoUrl,
  sampleVideoPoster,
  sampleVideoUrl2,
  sampleVideoPoster2,
  sampleVideoUrl3,
  sampleVideoPoster3,
} from "../types/showcaseData";

const MediaTab = () => (
  <div className="space-y-8">
    {/* ── AVATAR ─────────────────────────────── */}
    <SectionTitle title="Avatar" description="User profile images with sizes, initials, variants, and status indicators." />

    <ExampleBlock title="Sizes">
      <div className="flex flex-wrap items-end gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=1" size="xs" />
        <Avatar src="https://i.pravatar.cc/150?img=2" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=4" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=5" size="xl" />
      </div>
    </ExampleBlock>

    <ExampleBlock title="Initials & Variants">
      <div className="flex flex-wrap items-end gap-4">
        <Avatar name="AH" size="lg" />
        <Avatar name="SJ" size="lg" variant="success" />
        <Avatar name="KR" size="lg" variant="danger" />
        <Avatar name="LM" size="lg" variant="warning" />
        <Avatar name="NP" size="lg" variant="info" />
        <Avatar name="QR" size="lg" variant="dark" />
      </div>
    </ExampleBlock>

    {/* ── AVATAR GROUP ───────────────────────── */}
    <SectionTitle title="AvatarGroup" description="Stacked avatar groups with max display and initials." />

    <ExampleBlock title="With Images / Initials">
      <div className="space-y-4">
        <AvatarGroup items={avatarGroupItems} max={4} size="md" />
        <AvatarGroup items={avatarGroupItems} max={6} size="lg" />
        <AvatarGroup items={avatarGroupInitials} max={3} size="md" />
      </div>
    </ExampleBlock>

    {/* ── AVATAR UPLOAD ──────────────────────── */}
    <SectionTitle title="AvatarUpload" description="Avatar with image upload capability." />

    <ExampleBlock>
      <div className="flex gap-8 items-end">
        <AvatarUpload size={80} shape="circle" />
        <AvatarUpload size={80} shape="square" />
        <AvatarUpload size={100} shape="circle" disabled />
      </div>
    </ExampleBlock>

    {/* ── IMAGE DISPLAY ──────────────────────── */}
    <SectionTitle title="ImageDisplay" description="Image presentation with various styles." />

    <ExampleBlock title="Grid">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          <ImageDisplay key={i} src={img.src} alt={img.alt} rounded className="h-32 object-cover" />
        ))}
      </div>
    </ExampleBlock>

    {/* ── IMAGE VIEWER ───────────────────────── */}
    <SectionTitle title="ImageViewer" description="Image viewer with toolbar." />

    <ExampleBlock>
      <div className="max-w-md">
        <ImageViewer src={galleryImages[0].src} alt={galleryImages[0].alt} />
      </div>
    </ExampleBlock>

    {/* ── GALLERY VIEWER ─────────────────────── */}
    <SectionTitle title="GalleryViewer" description="Gallery grid with lightbox." />

    <ExampleBlock>
      <GalleryViewer images={galleryImages} columns={4} />
    </ExampleBlock>

    {/* ── CAROUSEL ───────────────────────────── */}
    <SectionTitle title="Carousel" description="Image and content sliders with variants, animations, and indicators." />

    <ExampleBlock title="Default">
      <Carousel slides={carouselSlides} indicator="dots" height="h-72" />
    </ExampleBlock>

    <ExampleBlock title="Card Variant">
      <Carousel slides={photoSlides} variant="card" indicator="bars" height="h-80" />
    </ExampleBlock>

    <ExampleBlock title="Gradient Variant">
      <Carousel slides={carouselSlides} variant="gradient" indicator="numbers" height="h-72" />
    </ExampleBlock>

    <ExampleBlock title="Minimal with Progress">
      <Carousel slides={photoSlides} variant="minimal" indicator="progress" height="h-80" />
    </ExampleBlock>

    <ExampleBlock title="Fade Animation + AutoPlay">
      <Carousel slides={carouselSlides} animation="fade" autoPlay autoPlayInterval={3000} indicator="dots" height="h-72" />
    </ExampleBlock>

    <ExampleBlock title="Scale Animation">
      <Carousel slides={photoSlides} animation="scale" variant="card" indicator="bars" height="h-80" />
    </ExampleBlock>

    <ExampleBlock title="Outside Arrows">
      <Carousel slides={carouselSlides} arrowStyle="outside" indicator="dots" height="h-72" />
    </ExampleBlock>

    {/* ── CARD CAROUSEL ──────────────────────── */}
    <SectionTitle title="CardCarousel" description="Horizontal card carousel with peek and gap options." />

    <ExampleBlock title="Medium Gap + Peek">
      <CardCarousel gap="md" peek>
        <MiniStatCard variant="primary" label="Revenue" value="$45,231" icon={<StarIcon />} change={12.5} />
        <MiniStatCard variant="success" label="Orders" value="1,234" icon={<DownloadIcon />} change={8.2} />
        <MiniStatCard variant="warning" label="Users" value="5,678" icon={<PlusIcon />} change={-3.1} />
        <MiniStatCard variant="danger" label="Bounce" value="24.5%" icon={<TrashIcon />} change={-5.4} />
        <MiniStatCard variant="info" label="Sessions" value="12,456" icon={<SearchIcon />} change={15.7} />
        <MiniStatCard variant="dark" label="Conversion" value="3.24%" icon={<StarIcon />} change={2.1} />
      </CardCarousel>
    </ExampleBlock>

    <ExampleBlock title="Large Gap">
      <CardCarousel gap="lg">
        <GradientStatCard gradient="blue" title="Total Sales" value="$128,430" icon={<StarIcon />} change={18.2} />
        <GradientStatCard gradient="emerald" title="Revenue" value="$84,254" icon={<DownloadIcon />} change={12.5} />
        <GradientStatCard gradient="purple" title="Customers" value="2,456" icon={<PlusIcon />} change={6.8} />
        <GradientStatCard gradient="amber" title="Growth" value="+24.5%" icon={<TrashIcon />} change={-1.3} />
        <GradientStatCard gradient="rose" title="Profit" value="$32,100" icon={<SearchIcon />} change={9.4} />
      </CardCarousel>
    </ExampleBlock>

    {/* ── VIDEO PLAYER ───────────────────────── */}
    <SectionTitle title="VideoPlayer" description="Video playback with variants, sizes, and autoplay options." />

    <ExampleBlock title="Default">
      <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} />
    </ExampleBlock>

    <ExampleBlock title="Cinema Variant">
      <VideoPlayer src={sampleVideoUrl2} poster={sampleVideoPoster2} variant="cinema" />
    </ExampleBlock>

    <ExampleBlock title="Rounded Variant">
      <VideoPlayer src={sampleVideoUrl3} poster={sampleVideoPoster3} variant="rounded" />
    </ExampleBlock>

    <ExampleBlock title="Minimal">
      <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} variant="minimal" />
    </ExampleBlock>

    <ExampleBlock title="Sizes">
      <div className="space-y-4">
        <VideoPlayer src={sampleVideoUrl2} poster={sampleVideoPoster2} size="md" variant="cinema" />
        <VideoPlayer src={sampleVideoUrl3} poster={sampleVideoPoster3} size="sm" variant="rounded" />
      </div>
    </ExampleBlock>

    <ExampleBlock title="Muted Autoplay Loop">
      <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} size="md" autoPlay muted loop />
    </ExampleBlock>
  </div>
);

export default MediaTab;
