import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Logo from "../../../shared/components/display/Logo";
import ControlButton from "../../../shared/components/buttons/ControlButton";
import LogInIcon from "../../../assets/icons/LogInIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import SplitIcon from "../../../assets/icons/SplitIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import MaximizeIcon from "../../../assets/icons/MaximizeIcon";
import SparklesIcon from "../../../assets/icons/SparklesIcon";
import MinusIcon from "../../../assets/icons/MinusIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import ColumnsIcon from "../../../assets/icons/ColumnsIcon";
import ImagePlusIcon from "../../../assets/icons/ImagePlusIcon";
import FrameIcon from "../../../assets/icons/FrameIcon";
import GalleryIcon from "../../../assets/icons/GalleryIcon";
import GridIcon from "../../../assets/icons/GridIcon";
import WandIcon from "../../../assets/icons/WandIcon";
import ComponentIcon from "../../../assets/icons/ComponentIcon";
import CodeIcon from "../../../assets/icons/CodeIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import ServerIcon from "../../../assets/icons/ServerIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import ShieldCheckIcon from "../../../assets/icons/ShieldCheckIcon";
import TriangleAlertIcon from "../../../assets/icons/TriangleAlertIcon";

// ══════════════════════════════════════════════════════════════════
// HOME PAGE — Public landing page for the template.
// Shows all available auth pages, showcase & component examples
// organized in sections with ControlButton navigation cards.
// Route: /home (public, no auth required)
// ══════════════════════════════════════════════════════════════════

const Home = () => {
  const navigate = useNavigate();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className="home-page min-h-screen">
      {/* ── Hero ─────────────────────────────────────── */}
      <header className="home-hero flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <Logo
          orientation="landscape"
          theme={themeMode === "dark" ? "dark" : "light"}
          height={60}
        />
        <h1 className="home-title text-3xl font-bold sm:text-4xl">
          React Redux Template
        </h1>
        <p className="home-subtitle max-w-xl text-base sm:text-lg">
          A production-ready admin template with 21 sidebar variants, multiple
          navbar styles, and dozens of pre-built auth pages. Pick a section below
          to explore.
        </p>
      </header>

      {/* ── Login Pages ──────────────────────────────── */}
      <section className="home-section px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <LogInIcon className="h-6 w-6" />
              Login Pages
            </h2>
            <p className="home-section-desc mt-1 text-sm">23 login page variants — simple forms to full-page immersive layouts.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="primary" icon={<LogInIcon />} title="Simple" onClick={() => navigate("/login/simple")} />
            <ControlButton variant="primary" icon={<SplitIcon />} title="Two Side" onClick={() => navigate("/login/two-side")} />
            <ControlButton variant="primary" icon={<ImageIcon />} title="Carousel" onClick={() => navigate("/login/carousel")} />
            <ControlButton variant="primary" icon={<MaximizeIcon />} title="Full Page" onClick={() => navigate("/login/full-page")} />
            <ControlButton variant="primary" icon={<SparklesIcon />} title="Modern" onClick={() => navigate("/login/modern")} />
            <ControlButton variant="primary" icon={<MinusIcon />} title="Minimal" onClick={() => navigate("/login/minimal")} />
            <ControlButton variant="info" icon={<LayersIcon />} title="Card Carousel" onClick={() => navigate("/login/card-carousel")} />
            <ControlButton variant="info" icon={<ColumnsIcon />} title="Card Two Side" onClick={() => navigate("/login/card-two-side")} />
            <ControlButton variant="info" icon={<ImagePlusIcon />} title="Image Two Side" onClick={() => navigate("/login/image-two-side")} />
            <ControlButton variant="info" icon={<FrameIcon />} title="Img Card Two Side" onClick={() => navigate("/login/image-card-two-side")} />
            <ControlButton variant="info" icon={<GalleryIcon />} title="Image Carousel" onClick={() => navigate("/login/image-carousel")} />
            <ControlButton variant="info" icon={<GridIcon />} title="Img Card Carousel" onClick={() => navigate("/login/image-card-carousel")} />
            {/* Modern Variants */}
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Simple" onClick={() => navigate("/login/modern-simple")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Minimal" onClick={() => navigate("/login/modern-minimal")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Two Side" onClick={() => navigate("/login/modern-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Full Page" onClick={() => navigate("/login/modern-full-page")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Carousel" onClick={() => navigate("/login/modern-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Two Side" onClick={() => navigate("/login/modern-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Two Side" onClick={() => navigate("/login/modern-image-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card TwoSd" onClick={() => navigate("/login/modern-image-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Carousel" onClick={() => navigate("/login/modern-card-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Carousel" onClick={() => navigate("/login/modern-image-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card Crsl" onClick={() => navigate("/login/modern-image-card-carousel")} />
          </div>
        </div>
      </section>

      {/* ── Register Pages ───────────────────────────── */}
      <section className="home-section home-section-alt px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <UserIcon className="h-6 w-6" />
              Register Pages
            </h2>
            <p className="home-section-desc mt-1 text-sm">23 registration page variants, one per login design, with a 3 step sign up flow.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="success" icon={<LogInIcon />} title="Simple" onClick={() => navigate("/register/simple")} />
            <ControlButton variant="success" icon={<SparklesIcon />} title="Modern" onClick={() => navigate("/register/modern")} />
            <ControlButton variant="success" icon={<MinusIcon />} title="Minimal" onClick={() => navigate("/register/minimal")} />
            <ControlButton variant="success" icon={<SplitIcon />} title="Two Side" onClick={() => navigate("/register/two-side")} />
            <ControlButton variant="success" icon={<MaximizeIcon />} title="Full Page" onClick={() => navigate("/register/full-page")} />
            <ControlButton variant="success" icon={<ImageIcon />} title="Carousel" onClick={() => navigate("/register/carousel")} />
            <ControlButton variant="info" icon={<ColumnsIcon />} title="Card Two Side" onClick={() => navigate("/register/card-two-side")} />
            <ControlButton variant="info" icon={<ImagePlusIcon />} title="Image Two Side" onClick={() => navigate("/register/image-two-side")} />
            <ControlButton variant="info" icon={<FrameIcon />} title="Img Card Two Side" onClick={() => navigate("/register/image-card-two-side")} />
            <ControlButton variant="info" icon={<LayersIcon />} title="Card Carousel" onClick={() => navigate("/register/card-carousel")} />
            <ControlButton variant="info" icon={<GalleryIcon />} title="Image Carousel" onClick={() => navigate("/register/image-carousel")} />
            <ControlButton variant="info" icon={<GridIcon />} title="Img Card Carousel" onClick={() => navigate("/register/image-card-carousel")} />
            {/* Modern Variants */}
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Simple" onClick={() => navigate("/register/modern-simple")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Minimal" onClick={() => navigate("/register/modern-minimal")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Two Side" onClick={() => navigate("/register/modern-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Full Page" onClick={() => navigate("/register/modern-full-page")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Carousel" onClick={() => navigate("/register/modern-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Two Side" onClick={() => navigate("/register/modern-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Two Side" onClick={() => navigate("/register/modern-image-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card TwoSd" onClick={() => navigate("/register/modern-image-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Carousel" onClick={() => navigate("/register/modern-card-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Carousel" onClick={() => navigate("/register/modern-image-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card Crsl" onClick={() => navigate("/register/modern-image-card-carousel")} />
          </div>
        </div>
      </section>

      {/* ── OTP Login Pages ──────────────────────────── */}
      <section className="home-section px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <LockIcon className="h-6 w-6" />
              OTP Login Pages
            </h2>
            <p className="home-section-desc mt-1 text-sm">23 OTP verification page variants with code input fields.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="success" icon={<LogInIcon />} title="Simple" onClick={() => navigate("/otp-login/simple")} />
            <ControlButton variant="success" icon={<SparklesIcon />} title="Modern" onClick={() => navigate("/otp-login/modern")} />
            <ControlButton variant="success" icon={<MinusIcon />} title="Minimal" onClick={() => navigate("/otp-login/minimal")} />
            <ControlButton variant="success" icon={<SplitIcon />} title="Two Side" onClick={() => navigate("/otp-login/two-side")} />
            <ControlButton variant="success" icon={<MaximizeIcon />} title="Full Page" onClick={() => navigate("/otp-login/full-page")} />
            <ControlButton variant="success" icon={<ImageIcon />} title="Carousel" onClick={() => navigate("/otp-login/carousel")} />
            <ControlButton variant="dark" icon={<ColumnsIcon />} title="Card Two Side" onClick={() => navigate("/otp-login/card-two-side")} />
            <ControlButton variant="dark" icon={<ImagePlusIcon />} title="Image Two Side" onClick={() => navigate("/otp-login/image-two-side")} />
            <ControlButton variant="dark" icon={<FrameIcon />} title="Img Card Two Side" onClick={() => navigate("/otp-login/image-card-two-side")} />
            <ControlButton variant="dark" icon={<LayersIcon />} title="Card Carousel" onClick={() => navigate("/otp-login/card-carousel")} />
            <ControlButton variant="dark" icon={<GalleryIcon />} title="Image Carousel" onClick={() => navigate("/otp-login/image-carousel")} />
            <ControlButton variant="dark" icon={<GridIcon />} title="Img Card Carousel" onClick={() => navigate("/otp-login/image-card-carousel")} />
            {/* Modern Variants */}
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Simple" onClick={() => navigate("/otp-login/modern-simple")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Minimal" onClick={() => navigate("/otp-login/modern-minimal")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Two Side" onClick={() => navigate("/otp-login/modern-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Full Page" onClick={() => navigate("/otp-login/modern-full-page")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Carousel" onClick={() => navigate("/otp-login/modern-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Two Side" onClick={() => navigate("/otp-login/modern-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Two Side" onClick={() => navigate("/otp-login/modern-image-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card TwoSd" onClick={() => navigate("/otp-login/modern-image-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Carousel" onClick={() => navigate("/otp-login/modern-card-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Carousel" onClick={() => navigate("/otp-login/modern-image-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card Crsl" onClick={() => navigate("/otp-login/modern-image-card-carousel")} />
          </div>
        </div>
      </section>

      {/* ── Forgot Password Pages ────────────────────── */}
      <section className="home-section home-section-alt px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <ShieldCheckIcon className="h-6 w-6" />
              Forgot Password Pages
            </h2>
            <p className="home-section-desc mt-1 text-sm">23 forgot password page variants with multi-step reset flows.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="warning" icon={<LogInIcon />} title="Simple" onClick={() => navigate("/forgot-password/simple")} />
            <ControlButton variant="warning" icon={<SparklesIcon />} title="Modern" onClick={() => navigate("/forgot-password/modern")} />
            <ControlButton variant="warning" icon={<MinusIcon />} title="Minimal" onClick={() => navigate("/forgot-password/minimal")} />
            <ControlButton variant="warning" icon={<SplitIcon />} title="Two Side" onClick={() => navigate("/forgot-password/two-side")} />
            <ControlButton variant="warning" icon={<MaximizeIcon />} title="Full Page" onClick={() => navigate("/forgot-password/full-page")} />
            <ControlButton variant="warning" icon={<ImageIcon />} title="Carousel" onClick={() => navigate("/forgot-password/carousel")} />
            <ControlButton variant="danger" icon={<ColumnsIcon />} title="Card Two Side" onClick={() => navigate("/forgot-password/card-two-side")} />
            <ControlButton variant="danger" icon={<ImagePlusIcon />} title="Image Two Side" onClick={() => navigate("/forgot-password/image-two-side")} />
            <ControlButton variant="danger" icon={<FrameIcon />} title="Img Card Two Side" onClick={() => navigate("/forgot-password/image-card-two-side")} />
            <ControlButton variant="danger" icon={<LayersIcon />} title="Card Carousel" onClick={() => navigate("/forgot-password/card-carousel")} />
            <ControlButton variant="danger" icon={<GalleryIcon />} title="Image Carousel" onClick={() => navigate("/forgot-password/image-carousel")} />
            <ControlButton variant="danger" icon={<GridIcon />} title="Img Card Carousel" onClick={() => navigate("/forgot-password/image-card-carousel")} />
            {/* Modern Variants */}
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Simple" onClick={() => navigate("/forgot-password/modern-simple")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Minimal" onClick={() => navigate("/forgot-password/modern-minimal")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Two Side" onClick={() => navigate("/forgot-password/modern-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Full Page" onClick={() => navigate("/forgot-password/modern-full-page")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Carousel" onClick={() => navigate("/forgot-password/modern-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Two Side" onClick={() => navigate("/forgot-password/modern-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Two Side" onClick={() => navigate("/forgot-password/modern-image-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card TwoSd" onClick={() => navigate("/forgot-password/modern-image-card-two-side")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Card Carousel" onClick={() => navigate("/forgot-password/modern-card-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Carousel" onClick={() => navigate("/forgot-password/modern-image-carousel")} />
            <ControlButton variant="secondary" icon={<WandIcon />} title="M. Img Card Crsl" onClick={() => navigate("/forgot-password/modern-image-card-carousel")} />
          </div>
        </div>
      </section>

      {/* ── Showcase & Examples ───────────────────────── */}
      <section className="home-section px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <LayersIcon className="h-6 w-6" />
              Showcase & Examples
            </h2>
            <p className="home-section-desc mt-1 text-sm">Explore all components in action — interactive demos and code examples.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="secondary" filled icon={<ComponentIcon />} title="Component Showcase" description="Interactive demo" onClick={() => navigate("/showcase")} />
            <ControlButton variant="secondary" filled icon={<CodeIcon />} title="Component Examples" description="Code samples" onClick={() => navigate("/components")} />
          </div>
        </div>
      </section>

      {/* ── Error Pages ──────────────────────────────── */}
      <section className="home-section home-section-alt px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="home-section-header mb-6">
            <h2 className="home-section-title flex items-center gap-2 text-xl font-bold sm:text-2xl">
              <TriangleAlertIcon className="h-6 w-6" />
              Error Pages
            </h2>
            <p className="home-section-desc mt-1 text-sm">Error and exception pages.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <ControlButton variant="danger" filled icon={<AlertIcon />} title="404 Not Found" onClick={() => navigate("/404")} />
            <ControlButton variant="danger" filled icon={<ServerIcon />} title="500 Server Error" onClick={() => navigate("/500")} />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="home-footer px-6 py-8 text-center">
        <p className="home-footer-text text-sm">
          React Redux Template &middot; Built with React, Redux Toolkit, TypeScript, Tailwind CSS & SCSS
        </p>
      </footer>
    </div>
  );
};

export default Home;
