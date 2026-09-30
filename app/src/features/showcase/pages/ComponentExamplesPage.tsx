import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../shared/components/buttons/Button";
import Switch from "../../../shared/components/buttons/Switch";
import Badge from "../../../shared/components/badges/Badge";
import ControlButton from "../../../shared/components/buttons/ControlButton";
import Input from "../../../shared/components/inputs/Input";
import FormInput from "../../../shared/components/inputs/FormInput";
import Checkbox from "../../../shared/components/inputs/Checkbox";
import FormCheckbox from "../../../shared/components/inputs/FormCheckbox";
import TextArea from "../../../shared/components/inputs/TextArea";
import FormTextArea from "../../../shared/components/inputs/FormTextArea";
import RadioButton from "../../../shared/components/inputs/RadioButton";
import FormRadioButton from "../../../shared/components/inputs/FormRadioButton";
import Select from "../../../shared/components/inputs/Select";
import FormSelect from "../../../shared/components/inputs/FormSelect";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import FormSearchInput from "../../../shared/components/inputs/FormSearchInput";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import FormNumberInput from "../../../shared/components/inputs/FormNumberInput";
import OtpInput from "../../../shared/components/inputs/OtpInput";
import FormOtpInput from "../../../shared/components/inputs/FormOtpInput";
import RichTextEditor from "../../../shared/components/inputs/RichTextEditor";
import FormRichTextEditor from "../../../shared/components/inputs/FormRichTextEditor";
import WorkflowEditor from "../../../shared/components/editors/WorkflowEditor";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import TableImage from "../../../shared/components/table/TableImage";
import TableActionButtons from "../../../shared/components/table/TableActionButtons";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import Pagination from "../../../shared/components/navigation/Pagination";
import SimplePagination from "../../../shared/components/navigation/SimplePagination";
import Breadcrumb from "../../../shared/components/navigation/Breadcrumb";
import type { BreadcrumbItem } from "../../../shared/components/navigation/Breadcrumb";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import type { PageBreadcrumbItem } from "../../../shared/components/navigation/PageBreadcrumb";
import StatCard from "../../../shared/components/cards/StatCard";
import GradientStatCard from "../../../shared/components/cards/GradientStatCard";
import ProgressStatCard from "../../../shared/components/cards/ProgressStatCard";
import RingStatCard from "../../../shared/components/cards/RingStatCard";
import SparklineStatCard from "../../../shared/components/cards/SparklineStatCard";
import type { TrendPoint } from "../../../shared/components/cards/SparklineStatCard";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import Avatar from "../../../shared/components/media/Avatar";
import AvatarGroup from "../../../shared/components/media/AvatarGroup";
import type { AvatarGroupItem } from "../../../shared/components/media/AvatarGroup";
import Dropdown from "../../../shared/components/navigation/Dropdown";
import type { DropdownMenuEntry } from "../../../shared/components/navigation/Dropdown";
import PanelDropdown from "../../../shared/components/navigation/PanelDropdown";
import Carousel from "../../../shared/components/media/Carousel";
import type { CarouselSlide } from "../../../shared/components/media/Carousel";
import CardCarousel from "../../../shared/components/media/CardCarousel";
import VideoPlayer from "../../../shared/components/media/VideoPlayer";
import Stepper from "../../../shared/components/navigation/Stepper";
import type { StepItem } from "../../../shared/components/navigation/Stepper";
import Tabs from "../../../shared/components/navigation/Tabs";
import type { TabItem } from "../../../shared/components/navigation/Tabs";
import {
  showToast,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showLoading,
  showPromise,
  showAction,
  showCustom,
  dismissToast,
} from "../../../shared/components/feedback/Toast";
import FileUpload from "../../../shared/components/inputs/FileUpload";
import LineChart from "../../../shared/components/charts/LineChart";
import BarChart from "../../../shared/components/charts/BarChart";
import PieChart from "../../../shared/components/charts/PieChart";
import DoughnutChart from "../../../shared/components/charts/DoughnutChart";
import AreaChart from "../../../shared/components/charts/AreaChart";
import RadarChart from "../../../shared/components/charts/RadarChart";
import PolarAreaChart from "../../../shared/components/charts/PolarAreaChart";
import AlertModal from "../../../shared/components/modals/AlertModal";
import FormModal from "../../../shared/components/modals/FormModal";
import Drawer from "../../../shared/components/navigation/Drawer";
import Accordion from "../../../shared/components/navigation/Accordion";
import type { AccordionItemData } from "../../../shared/components/navigation/Accordion";
import Timeline from "../../../shared/components/display/Timeline";
import type { TimelineItemData } from "../../../shared/components/display/Timeline";
import TreeView from "../../../shared/components/navigation/TreeView";
import type { TreeNodeData } from "../../../shared/components/navigation/TreeView";
import OrgChart from "../../../shared/components/display/OrgChart";
import type { OrgNodeData } from "../../../shared/components/display/OrgChart";
import Calendar from "../../../shared/components/display/Calendar";
import type { CalendarEvent } from "../../../shared/components/display/Calendar";
import Knob from "../../../shared/components/inputs/Knob";
import Slider from "../../../shared/components/inputs/Slider";
import { RangeSlider } from "../../../shared/components/inputs/Slider";
import TreeSelect from "../../../shared/components/inputs/TreeSelect";
import type { TreeSelectNodeData } from "../../../shared/components/inputs/TreeSelect";
import TreeTable from "../../../shared/components/table/TreeTable";
import type { TreeTableColumn, TreeTableRow } from "../../../shared/components/table/TreeTable";
import Toolbar from "../../../shared/components/navigation/Toolbar";
import type { ToolbarEntry } from "../../../shared/components/navigation/Toolbar";
import Message from "../../../shared/components/feedback/Message";
import ViewCard from "../../../shared/components/cards/ViewCard";
import Loader from "../../../shared/components/feedback/Loader";
import Skeleton from "../../../shared/components/feedback/Skeleton";
import Result from "../../../shared/components/display/Result";
import Watermark from "../../../shared/components/display/Watermark";
import QRCode from "../../../shared/components/display/QRCode";
import Splitter from "../../../shared/components/display/Splitter";
import Rate from "../../../shared/components/inputs/Rate";
import Transfer from "../../../shared/components/inputs/Transfer";
import ColorPicker from "../../../shared/components/inputs/ColorPicker";
import FormColorPicker from "../../../shared/components/inputs/FormColorPicker";
import DatePicker from "../../../shared/components/inputs/DatePicker";
import FormDatePicker from "../../../shared/components/inputs/FormDatePicker";
import AvatarUpload from "../../../shared/components/media/AvatarUpload";
import ImageDisplay from "../../../shared/components/media/ImageDisplay";
import GalleryViewer from "../../../shared/components/media/GalleryViewer";
import ImageViewer from "../../../shared/components/media/ImageViewer";
import PopConfirm from "../../../shared/components/buttons/PopConfirm";
import NotificationDropdown from "../../notifications/components/NotificationDropdown";
import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import BellIcon from "../../../assets/icons/BellIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import LogOutIcon from "../../../assets/icons/LogOutIcon";
import BoldIcon from "../../../assets/icons/BoldIcon";
import ItalicIcon from "../../../assets/icons/ItalicIcon";
import UnderlineIcon from "../../../assets/icons/UnderlineIcon";
import AlignLeftIcon from "../../../assets/icons/AlignLeftIcon";
import AlignCenterIcon from "../../../assets/icons/AlignCenterIcon";
import AlignRightIcon from "../../../assets/icons/AlignRightIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import FolderIcon from "../../../assets/icons/FolderIcon";

interface DemoForm {
  username: string;
  email: string;
  password: string;
  agree: boolean;
  newsletter: boolean;
  bio: string;
  notes: string;
  plan: string;
  priority: string;
  country: string;
  language: string;
  framework: string;
  searchCountry: string;
  searchLanguage: string;
  quantity: number;
  rating: number;
  otp: string;
  shortOtp: string;
  content: string;
  article: string;
}

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "mx", label: "Mexico" },
  { value: "kr", label: "South Korea" },
  { value: "it", label: "Italy" },
];

const languageOptions = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "rb", label: "Ruby" },
  { value: "java", label: "Java" },
  { value: "cs", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "swift", label: "Swift" },
];

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
];

const planOptions = [
  { value: "free", label: "Free", description: "Basic features" },
  { value: "pro", label: "Pro", description: "Advanced features" },
  { value: "enterprise", label: "Enterprise", description: "Custom solutions" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const simpleOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  avatar: string;
  joined: string;
}

const sampleUsers: UserRow[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", status: "active", avatar: "https://i.pravatar.cc/150?img=1", joined: "2024-01-15" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", role: "Editor", status: "active", avatar: "https://i.pravatar.cc/150?img=2", joined: "2024-02-20" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "Viewer", status: "pending", avatar: "https://i.pravatar.cc/150?img=3", joined: "2024-03-10" },
  { id: 4, name: "James Wilson", email: "james@example.com", role: "Editor", status: "active", avatar: "https://i.pravatar.cc/150?img=4", joined: "2024-03-22" },
  { id: 5, name: "Olivia Brown", email: "olivia@example.com", role: "Admin", status: "inactive", avatar: "https://i.pravatar.cc/150?img=5", joined: "2024-04-05" },
  { id: 6, name: "Daniel Lee", email: "daniel@example.com", role: "Viewer", status: "active", avatar: "https://i.pravatar.cc/150?img=6", joined: "2024-04-18" },
  { id: 7, name: "Sophia Martinez", email: "sophia@example.com", role: "Editor", status: "pending", avatar: "https://i.pravatar.cc/150?img=7", joined: "2024-05-01" },
  { id: 8, name: "William Taylor", email: "william@example.com", role: "Viewer", status: "active", avatar: "https://i.pravatar.cc/150?img=8", joined: "2024-05-14" },
  { id: 9, name: "Ava Anderson", email: "ava@example.com", role: "Admin", status: "active", avatar: "https://i.pravatar.cc/150?img=9", joined: "2024-06-02" },
  { id: 10, name: "Ethan Thomas", email: "ethan@example.com", role: "Editor", status: "inactive", avatar: "https://i.pravatar.cc/150?img=10", joined: "2024-06-20" },
  { id: 11, name: "Mia Jackson", email: "mia@example.com", role: "Viewer", status: "active", avatar: "https://i.pravatar.cc/150?img=11", joined: "2024-07-08" },
  { id: 12, name: "Alexander White", email: "alex@example.com", role: "Editor", status: "pending", avatar: "https://i.pravatar.cc/150?img=12", joined: "2024-07-25" },
];

const statusBadge = (status: UserRow["status"]) => {
  const map: Record<UserRow["status"], { variant: "success" | "danger" | "warning"; label: string }> = {
    active: { variant: "success", label: "Active" },
    inactive: { variant: "danger", label: "Inactive" },
    pending: { variant: "warning", label: "Pending" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant} size="sm" pill label={label} />;
};

const sparklineRevenueData: TrendPoint[] = [
  { value: 32 }, { value: 45 }, { value: 38 }, { value: 52 }, { value: 48 },
  { value: 61 }, { value: 55 }, { value: 72 }, { value: 68 }, { value: 85 },
  { value: 78 }, { value: 92 },
];

const sparklineUsersData: TrendPoint[] = [
  { value: 120 }, { value: 135 }, { value: 128 }, { value: 145 }, { value: 160 },
  { value: 155 }, { value: 170 }, { value: 185 }, { value: 178 }, { value: 195 },
  { value: 210 }, { value: 225 },
];

const sparklineOrdersData: TrendPoint[] = [
  { value: 85 }, { value: 78 }, { value: 72 }, { value: 80 }, { value: 68 },
  { value: 62 }, { value: 58 }, { value: 65 }, { value: 55 }, { value: 50 },
  { value: 48 }, { value: 42 },
];

const sparklineConversionData: TrendPoint[] = [
  { value: 2.1 }, { value: 2.4 }, { value: 2.8 }, { value: 2.5 }, { value: 3.0 },
  { value: 3.2 }, { value: 2.9 }, { value: 3.5 }, { value: 3.8 }, { value: 3.6 },
  { value: 4.0 }, { value: 4.2 },
];

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home" },
  { label: "Dashboard" },
  { label: "Analytics" },
  { label: "Reports" },
];

const breadcrumbShortItems: BreadcrumbItem[] = [
  { label: "Home" },
  { label: "Settings" },
  { label: "Profile" },
];

const pageBreadcrumbItems: PageBreadcrumbItem[] = [
  { label: "Home" },
  { label: "Dashboard" },
  { label: "Analytics" },
];

const pageBreadcrumbProjectItems: PageBreadcrumbItem[] = [
  { label: "Home" },
  { label: "Projects" },
  { label: "Web App" },
  { label: "Settings" },
];

const pageBreadcrumbUsersItems: PageBreadcrumbItem[] = [
  { label: "Admin" },
  { label: "Users" },
  { label: "Management" },
];

const avatarGroupItems: AvatarGroupItem[] = [
  { src: "https://i.pravatar.cc/150?img=1", name: "Sarah Johnson" },
  { src: "https://i.pravatar.cc/150?img=2", name: "Michael Chen" },
  { src: "https://i.pravatar.cc/150?img=3", name: "Emily Davis" },
  { src: "https://i.pravatar.cc/150?img=4", name: "James Wilson" },
  { src: "https://i.pravatar.cc/150?img=5", name: "Olivia Brown" },
  { src: "https://i.pravatar.cc/150?img=6", name: "Daniel Lee" },
  { src: "https://i.pravatar.cc/150?img=7", name: "Sophia Martinez" },
  { src: "https://i.pravatar.cc/150?img=8", name: "William Taylor" },
];

const avatarGroupInitials: AvatarGroupItem[] = [
  { name: "Sarah Johnson" },
  { name: "Michael Chen" },
  { name: "Emily Davis" },
  { name: "James Wilson" },
  { name: "Olivia Brown" },
  { name: "Daniel Lee" },
];

const dropdownBasicItems: DropdownMenuEntry[] = [
  { key: "profile", label: "My Profile", icon: <StarIcon /> },
  { key: "settings", label: "Settings", icon: <SearchIcon /> },
  { key: "downloads", label: "Downloads", icon: <DownloadIcon /> },
  { key: "divider-1", divider: true },
  { key: "logout", label: "Log Out", icon: <TrashIcon />, variant: "danger" },
];

const dropdownWithDescItems: DropdownMenuEntry[] = [
  { key: "new-project", label: "New Project", icon: <PlusIcon />, description: "Create a new project from scratch" },
  { key: "import", label: "Import", icon: <DownloadIcon />, description: "Import from external source" },
  { key: "templates", label: "Templates", icon: <StarIcon />, description: "Start from a pre-built template" },
  { key: "divider-1", divider: true },
  { key: "archive", label: "Archive All", icon: <TrashIcon />, description: "Move all items to archive", variant: "warning" },
];

const dropdownGroupedItems: DropdownMenuEntry[] = [
  { key: "header-actions", header: "Actions" },
  { key: "edit", label: "Edit", icon: <PlusIcon /> },
  { key: "duplicate", label: "Duplicate", icon: <StarIcon /> },
  { key: "header-transfer", header: "Transfer" },
  { key: "move", label: "Move to...", icon: <SearchIcon /> },
  { key: "share", label: "Share", icon: <DownloadIcon /> },
  { key: "divider-1", divider: true },
  { key: "delete", label: "Delete", icon: <TrashIcon />, variant: "danger" },
];

const dropdownActiveItems: DropdownMenuEntry[] = [
  { key: "all", label: "All Items", icon: <StarIcon /> },
  { key: "active", label: "Active", icon: <PlusIcon />, active: true },
  { key: "archived", label: "Archived", icon: <DownloadIcon /> },
  { key: "deleted", label: "Deleted", icon: <TrashIcon />, disabled: true },
];

const dropdownLongItems: DropdownMenuEntry[] = [
  { key: "h-nav", header: "Navigation" },
  { key: "home", label: "Home", icon: <StarIcon /> },
  { key: "dashboard", label: "Dashboard", icon: <SearchIcon /> },
  { key: "projects", label: "Projects", icon: <PlusIcon /> },
  { key: "h-manage", header: "Management" },
  { key: "team", label: "Team Members", icon: <StarIcon /> },
  { key: "billing", label: "Billing", icon: <DownloadIcon /> },
  { key: "integrations", label: "Integrations", icon: <PlusIcon /> },
  { key: "api", label: "API Keys", icon: <SearchIcon /> },
  { key: "h-account", header: "Account" },
  { key: "profile", label: "Profile", icon: <StarIcon /> },
  { key: "security", label: "Security", icon: <SearchIcon /> },
  { key: "notifications", label: "Notifications", icon: <DownloadIcon /> },
  { key: "divider-1", divider: true },
  { key: "logout", label: "Sign Out", icon: <TrashIcon />, variant: "danger" },
];

const notificationItems = [
  { id: 1, avatar: "https://i.pravatar.cc/150?img=1", name: "Sarah Johnson", message: "commented on your post", time: "2 min ago", read: false },
  { id: 2, avatar: "https://i.pravatar.cc/150?img=2", name: "Michael Chen", message: "shared a document with you", time: "15 min ago", read: false },
  { id: 3, avatar: "https://i.pravatar.cc/150?img=3", name: "Emily Davis", message: "invited you to a project", time: "1 hour ago", read: true },
  { id: 4, avatar: "https://i.pravatar.cc/150?img=4", name: "James Wilson", message: "mentioned you in a comment", time: "3 hours ago", read: true },
  { id: 5, avatar: "https://i.pravatar.cc/150?img=5", name: "Olivia Brown", message: "accepted your invitation", time: "Yesterday", read: true },
];

const imageSlides: CarouselSlide[] = [
  {
    id: "slide-1",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-2">Welcome to Our Platform</h3>
          <p className="text-white/70 text-lg">Build amazing things with our components</p>
        </div>
      </div>
    ),
  },
  {
    id: "slide-2",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-2">Powerful Components</h3>
          <p className="text-white/70 text-lg">50+ beautifully crafted UI components</p>
        </div>
      </div>
    ),
  },
  {
    id: "slide-3",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-2">Built with React & Tailwind</h3>
          <p className="text-white/70 text-lg">Modern stack for modern applications</p>
        </div>
      </div>
    ),
  },
  {
    id: "slide-4",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-2">Responsive Design</h3>
          <p className="text-white/70 text-lg">Looks great on every screen size</p>
        </div>
      </div>
    ),
  },
  {
    id: "slide-5",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-2">Easy to Customize</h3>
          <p className="text-white/70 text-lg">Variants, sizes, and props for everything</p>
        </div>
      </div>
    ),
  },
];

const photoSlides: CarouselSlide[] = [
  {
    id: "photo-1",
    content: (
      <div className="relative w-full h-full">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="Mountains" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">Mountain View</h3>
          <p className="text-white/70 text-sm mt-1">Swiss Alps, Switzerland</p>
        </div>
      </div>
    ),
  },
  {
    id: "photo-2",
    content: (
      <div className="relative w-full h-full">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop" alt="Beach" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">Tropical Paradise</h3>
          <p className="text-white/70 text-sm mt-1">Maldives Islands</p>
        </div>
      </div>
    ),
  },
  {
    id: "photo-3",
    content: (
      <div className="relative w-full h-full">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop" alt="Lake" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">Serene Lake</h3>
          <p className="text-white/70 text-sm mt-1">Lake Bled, Slovenia</p>
        </div>
      </div>
    ),
  },
  {
    id: "photo-4",
    content: (
      <div className="relative w-full h-full">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop" alt="Sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">Golden Sunset</h3>
          <p className="text-white/70 text-sm mt-1">Santorini, Greece</p>
        </div>
      </div>
    ),
  },
];

const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const sampleVideoPoster = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";
const sampleVideoUrl2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const sampleVideoPoster2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg";
const sampleVideoUrl3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
const sampleVideoPoster3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg";

const checkoutSteps: StepItem[] = [
  { id: "cart", label: "Cart", description: "Review items" },
  { id: "shipping", label: "Shipping", description: "Delivery address" },
  { id: "payment", label: "Payment", description: "Payment method" },
  { id: "confirm", label: "Confirmation", description: "Order summary" },
];

const accountSteps: StepItem[] = [
  { id: "personal", label: "Personal Info", description: "Name & email" },
  { id: "security", label: "Security", description: "Password setup" },
  { id: "preferences", label: "Preferences", description: "Customize experience", optional: true },
  { id: "verification", label: "Verification", description: "Verify identity" },
  { id: "complete", label: "Complete", description: "All done!" },
];

const projectSteps: StepItem[] = [
  { id: "init", label: "Initialize" },
  { id: "config", label: "Configure" },
  { id: "develop", label: "Develop" },
  { id: "test", label: "Test" },
  { id: "deploy", label: "Deploy" },
];

const errorSteps: StepItem[] = [
  { id: "upload", label: "Upload Files", description: "Select documents" },
  { id: "validate", label: "Validate", description: "Check format", status: "error" },
  { id: "process", label: "Process", description: "Convert files" },
  { id: "done", label: "Complete", description: "Download results" },
];

const profileTabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div className="p-4 ce-page rounded-lg"><h3 className="font-semibold ce-heading mb-2">Overview</h3><p className="text-sm ce-text">Welcome to your dashboard overview. Here you can see a summary of your account activity.</p></div> },
  { id: "activity", label: "Activity", badge: 12, content: <div className="p-4 ce-page rounded-lg"><h3 className="font-semibold ce-heading mb-2">Recent Activity</h3><p className="text-sm ce-text">You have 12 new notifications and 3 pending tasks.</p></div> },
  { id: "settings", label: "Settings", content: <div className="p-4 ce-page rounded-lg"><h3 className="font-semibold ce-heading mb-2">Settings</h3><p className="text-sm ce-text">Manage your account preferences, notifications, and privacy settings.</p></div> },
  { id: "billing", label: "Billing", content: <div className="p-4 ce-page rounded-lg"><h3 className="font-semibold ce-heading mb-2">Billing</h3><p className="text-sm ce-text">View your invoices, payment history, and manage your subscription plan.</p></div> },
  { id: "integrations", label: "Integrations", badge: "New", content: <div className="p-4 ce-page rounded-lg"><h3 className="font-semibold ce-heading mb-2">Integrations</h3><p className="text-sm ce-text">Connect third-party services and manage API keys.</p></div> },
];

const projectTabs: TabItem[] = [
  { id: "all", label: "All Projects", badge: 24 },
  { id: "active", label: "Active", badge: 8 },
  { id: "completed", label: "Completed", badge: 14 },
  { id: "archived", label: "Archived", badge: 2 },
  { id: "drafts", label: "Drafts", disabled: true },
];

const settingsTabs: TabItem[] = [
  { id: "general", label: "General", content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">General application settings and preferences.</p></div> },
  { id: "security", label: "Security", content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">Password, 2FA, and session management.</p></div> },
  { id: "notifications", label: "Notifications", badge: 3, content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">Email, push, and in-app notification preferences.</p></div> },
  { id: "appearance", label: "Appearance", content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">Theme, font size, and display customization.</p></div> },
  { id: "api", label: "API Keys", content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">Manage your API keys and webhooks.</p></div> },
  { id: "team", label: "Team", badge: 5, content: <div className="p-4 ce-page rounded-lg"><p className="text-sm ce-text">Invite members, manage roles and permissions.</p></div> },
];

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const revenueDatasets = [
  { label: "Revenue", data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000], variant: "primary" as const, fill: true },
];

const multiLineDatasets = [
  { label: "Desktop", data: [4500, 5200, 4800, 6100, 5900, 7200, 6800, 7500, 7100, 8200, 7800, 8500], variant: "primary" as const },
  { label: "Mobile", data: [3200, 3800, 4200, 4800, 5100, 5600, 6000, 6500, 6200, 7000, 7400, 7800], variant: "success" as const },
  { label: "Tablet", data: [1200, 1400, 1100, 1600, 1500, 1800, 1700, 2000, 1900, 2200, 2100, 2400], variant: "warning" as const },
];

const salesBarDatasets = [
  { label: "Sales", data: [65, 59, 80, 81, 56, 55, 72, 88, 90, 76, 85, 92], variant: "primary" as const },
];

const comparisonBarDatasets = [
  { label: "2024", data: [42, 55, 48, 62, 70, 58, 65, 72, 80, 68, 75, 82], variant: "info" as const },
  { label: "2025", data: [50, 62, 58, 70, 78, 66, 72, 80, 88, 76, 84, 92], variant: "success" as const },
];

const stackedBarDatasets = [
  { label: "Organic", data: [30, 25, 35, 28, 40, 32, 38, 42, 36, 45, 40, 48], variant: "success" as const },
  { label: "Paid", data: [20, 18, 22, 25, 18, 20, 24, 28, 22, 26, 30, 28], variant: "primary" as const },
  { label: "Referral", data: [10, 12, 8, 14, 12, 16, 10, 14, 18, 12, 16, 20], variant: "warning" as const },
];

const pieLabels = ["Direct", "Social", "Email", "Organic", "Referral"];
const pieData = [35, 25, 20, 12, 8];

const doughnutLabels = ["Desktop", "Mobile", "Tablet", "Other"];
const doughnutData = [45, 30, 15, 10];

const trafficAreaDatasets = [
  { label: "Visitors", data: [800, 1200, 1000, 1500, 1800, 1600, 2000, 2200, 1900, 2500, 2800, 3000], variant: "primary" as const },
  { label: "Page Views", data: [2400, 3600, 3000, 4500, 5400, 4800, 6000, 6600, 5700, 7500, 8400, 9000], variant: "info" as const },
];

const stackedAreaDatasets = [
  { label: "CSS", data: [30, 35, 28, 40, 38, 42, 45, 50, 48, 52, 55, 58], variant: "primary" as const },
  { label: "JavaScript", data: [45, 50, 42, 55, 52, 58, 60, 65, 62, 68, 70, 75], variant: "warning" as const },
  { label: "Python", data: [25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52], variant: "success" as const },
];

const radarLabels = ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Design"];
const radarDatasets = [
  { label: "Model A", data: [85, 90, 70, 88, 75, 92], variant: "primary" as const },
  { label: "Model B", data: [78, 82, 88, 80, 90, 76], variant: "danger" as const },
];

const skillRadarLabels = ["HTML", "CSS", "JavaScript", "React", "Node.js", "TypeScript", "SQL", "DevOps"];
const skillRadarDatasets = [
  { label: "Current", data: [95, 90, 88, 92, 75, 85, 70, 65], variant: "primary" as const },
  { label: "Goal", data: [95, 95, 95, 95, 90, 95, 85, 80], variant: "success" as const, fill: false },
];

const polarLabels = ["Research", "Design", "Development", "Testing", "Deployment"];
const polarData = [40, 30, 50, 35, 25];

const horizontalBarDatasets = [
  { label: "Tasks Completed", data: [42, 38, 55, 48, 62, 35], variant: "info" as const },
];
const horizontalBarLabels = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];

const accordionBasicItems: AccordionItemData[] = [
  { id: "1", title: "What is React?", content: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components." },
  { id: "2", title: "What is TypeScript?", content: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional static typing and class-based object-oriented programming." },
  { id: "3", title: "What is Tailwind CSS?", content: "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup." },
  { id: "4", title: "What is Vite?", content: "Vite is a modern frontend build tool that provides an extremely fast development environment and bundles your code for production." },
];

const accordionIconItems: AccordionItemData[] = [
  {
    id: "a1",
    title: "Account Settings",
    icon: <UserIcon width="16" height="16" />,
    content: "Manage your account settings, profile information, and preferences. You can update your display name, email address, and profile picture from this section.",
  },
  {
    id: "a2",
    title: "Security & Privacy",
    icon: <LockIcon width="16" height="16" />,
    content: "Configure your security settings including two-factor authentication, password changes, and active sessions management.",
  },
  {
    id: "a3",
    title: "Notifications",
    icon: <BellIcon width="16" height="16" />,
    content: "Choose which notifications you want to receive via email, push notifications, or in-app alerts.",
  },
  {
    id: "a4",
    title: "Billing & Payments",
    icon: <ShoppingCartIcon width="16" height="16" />,
    content: "View and manage your billing information, payment methods, subscription plans, and invoice history.",
    disabled: true,
  },
];

const timelineBasicItems: TimelineItemData[] = [
  { id: "t1", title: "Project Kickoff", description: "Initial planning and team assembly for the project.", date: "Jan 15, 2024", color: "primary" },
  { id: "t2", title: "Design Phase", description: "UI/UX design and prototype creation completed.", date: "Feb 10, 2024", color: "info" },
  { id: "t3", title: "Development Start", description: "Frontend and backend development began in parallel.", date: "Mar 5, 2024", color: "warning" },
  { id: "t4", title: "Testing & QA", description: "Comprehensive testing including unit, integration, and E2E tests.", date: "Apr 20, 2024", color: "success" },
  { id: "t5", title: "Launch", description: "Product deployed to production and made available to users.", date: "May 1, 2024", color: "danger" },
];

const timelineIconItems: TimelineItemData[] = [
  {
    id: "ti1",
    title: "Order Placed",
    description: "Your order #12345 has been confirmed.",
    date: "10:30 AM",
    color: "primary",
    icon: <ShoppingCartIcon width="14" height="14" />,
  },
  {
    id: "ti2",
    title: "Payment Confirmed",
    description: "Payment of $129.99 was successfully processed.",
    date: "10:32 AM",
    color: "success",
    icon: <CheckIcon width="14" height="14" />,
  },
  {
    id: "ti3",
    title: "Preparing Shipment",
    description: "Your items are being packed and prepared for delivery.",
    date: "11:15 AM",
    color: "warning",
    icon: <PackageIcon width="14" height="14" />,
  },
  {
    id: "ti4",
    title: "Out for Delivery",
    description: "Package is on its way to your address.",
    date: "2:45 PM",
    color: "info",
    icon: <LogOutIcon width="14" height="14" />,
  },
  {
    id: "ti5",
    title: "Delivered",
    description: "Package has been delivered successfully.",
    date: "4:20 PM",
    color: "success",
    icon: <HomeIcon width="14" height="14" />,
  },
];

const treeViewData: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "Button.tsx", label: "Button.tsx" },
          { id: "Input.tsx", label: "Input.tsx" },
          { id: "Modal.tsx", label: "Modal.tsx" },
        ],
      },
      {
        id: "pages",
        label: "pages",
        children: [
          { id: "Home.tsx", label: "Home.tsx" },
          { id: "About.tsx", label: "About.tsx" },
          { id: "Contact.tsx", label: "Contact.tsx", disabled: true },
        ],
      },
      { id: "App.tsx", label: "App.tsx" },
      { id: "main.tsx", label: "main.tsx" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "favicon.ico", label: "favicon.ico" },
      { id: "robots.txt", label: "robots.txt" },
    ],
  },
  { id: "package.json", label: "package.json" },
  { id: "tsconfig.json", label: "tsconfig.json" },
];

const orgData: OrgNodeData = {
  id: "ceo",
  name: "Sarah Johnson",
  title: "CEO",
  children: [
    {
      id: "cto",
      name: "Michael Chen",
      title: "CTO",
      children: [
        { id: "lead-fe", name: "Emily Park", title: "Frontend Lead" },
        { id: "lead-be", name: "James Wilson", title: "Backend Lead" },
        { id: "lead-devops", name: "Lisa Brown", title: "DevOps Lead" },
      ],
    },
    {
      id: "cfo",
      name: "Robert Taylor",
      title: "CFO",
      children: [
        { id: "accounting", name: "Anna White", title: "Accounting Manager" },
        { id: "finance", name: "David Lee", title: "Finance Analyst" },
      ],
    },
    {
      id: "cmo",
      name: "Jessica Martinez",
      title: "CMO",
      children: [
        { id: "marketing", name: "Tom Anderson", title: "Marketing Lead" },
        { id: "design", name: "Sophie Kim", title: "Design Lead" },
      ],
    },
  ],
};

const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-03-09", title: "Team Meeting", color: "primary" },
  { id: "e2", date: "2026-03-09", title: "Code Review", color: "success" },
  { id: "e3", date: "2026-03-12", title: "Sprint Planning", color: "warning" },
  { id: "e4", date: "2026-03-15", title: "Release Day", color: "danger" },
  { id: "e5", date: "2026-03-18", title: "Design Review", color: "info" },
  { id: "e6", date: "2026-03-22", title: "Demo Day", color: "primary" },
  { id: "e7", date: "2026-03-25", title: "Retrospective", color: "secondary" },
  { id: "e8", date: "2026-03-28", title: "Workshop", color: "success" },
];

const treeSelectOptions: TreeSelectNodeData[] = [
  {
    id: "electronics",
    label: "Electronics",
    children: [
      {
        id: "phones",
        label: "Phones",
        children: [
          { id: "iphone", label: "iPhone" },
          { id: "samsung", label: "Samsung" },
          { id: "pixel", label: "Google Pixel" },
        ],
      },
      {
        id: "laptops",
        label: "Laptops",
        children: [
          { id: "macbook", label: "MacBook" },
          { id: "thinkpad", label: "ThinkPad" },
          { id: "dell-xps", label: "Dell XPS" },
        ],
      },
      { id: "tablets", label: "Tablets" },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    children: [
      { id: "shirts", label: "Shirts" },
      { id: "pants", label: "Pants" },
      { id: "shoes", label: "Shoes", disabled: true },
    ],
  },
  { id: "books", label: "Books" },
];

interface FileRow extends TreeTableRow {
  name: string;
  size: string;
  type: string;
  modified: string;
}

const treeTableData: FileRow[] = [
  {
    id: "f1",
    name: "src",
    size: "—",
    type: "Folder",
    modified: "Mar 9, 2026",
    children: [
      {
        id: "f1-1",
        name: "components",
        size: "—",
        type: "Folder",
        modified: "Mar 8, 2026",
        children: [
          { id: "f1-1-1", name: "Button.tsx", size: "4.2 KB", type: "TypeScript", modified: "Mar 7, 2026" },
          { id: "f1-1-2", name: "Input.tsx", size: "6.8 KB", type: "TypeScript", modified: "Mar 6, 2026" },
          { id: "f1-1-3", name: "Modal.tsx", size: "3.5 KB", type: "TypeScript", modified: "Mar 5, 2026" },
        ],
      },
      {
        id: "f1-2",
        name: "pages",
        size: "—",
        type: "Folder",
        modified: "Mar 7, 2026",
        children: [
          { id: "f1-2-1", name: "Home.tsx", size: "2.1 KB", type: "TypeScript", modified: "Mar 6, 2026" },
          { id: "f1-2-2", name: "About.tsx", size: "1.8 KB", type: "TypeScript", modified: "Mar 4, 2026" },
        ],
      },
      { id: "f1-3", name: "App.tsx", size: "1.2 KB", type: "TypeScript", modified: "Mar 9, 2026" },
    ],
  },
  {
    id: "f2",
    name: "public",
    size: "—",
    type: "Folder",
    modified: "Mar 1, 2026",
    children: [
      { id: "f2-1", name: "favicon.ico", size: "16 KB", type: "Image", modified: "Feb 20, 2026" },
      { id: "f2-2", name: "index.html", size: "0.8 KB", type: "HTML", modified: "Feb 20, 2026" },
    ],
  },
  { id: "f3", name: "package.json", size: "1.4 KB", type: "JSON", modified: "Mar 9, 2026" },
];

const treeTableColumns: TreeTableColumn<FileRow>[] = [
  { key: "name", header: "Name", width: "40%" },
  { key: "size", header: "Size", width: "15%" },
  { key: "type", header: "Type", width: "20%" },
  { key: "modified", header: "Modified", width: "25%" },
];

/* ─── Data for new components ─── */
const transferDataSource = [
  { key: "1", label: "JavaScript", description: "Dynamic language" },
  { key: "2", label: "TypeScript", description: "Typed JavaScript" },
  { key: "3", label: "Python", description: "General purpose" },
  { key: "4", label: "Rust", description: "Systems language" },
  { key: "5", label: "Go", description: "Compiled language" },
  { key: "6", label: "Ruby", description: "Object oriented" },
  { key: "7", label: "Java", description: "Enterprise standard", disabled: true },
  { key: "8", label: "C#", description: ".NET ecosystem" },
];

const galleryImages = [
  { src: "https://picsum.photos/seed/g1/600/400", alt: "Mountain landscape", caption: "Mountain Landscape" },
  { src: "https://picsum.photos/seed/g2/600/400", alt: "Ocean waves", caption: "Ocean Waves" },
  { src: "https://picsum.photos/seed/g3/600/400", alt: "Forest trail", caption: "Forest Trail" },
  { src: "https://picsum.photos/seed/g4/600/400", alt: "City skyline", caption: "City Skyline" },
  { src: "https://picsum.photos/seed/g5/600/400", alt: "Desert dunes", caption: "Desert Dunes" },
  { src: "https://picsum.photos/seed/g6/600/400", alt: "Snowy peaks", caption: "Snowy Peaks" },
];

const notificationDemoItems = [
  { id: "n1", title: "New message", message: "Sarah sent you a message: 'Can we discuss the project?'", time: "2 min ago", type: "info" as const, read: false, avatar: "https://i.pravatar.cc/150?img=10" },
  { id: "n2", title: "Task completed", message: "The deployment to production was successful.", time: "15 min ago", type: "success" as const, read: false },
  { id: "n3", title: "Server warning", message: "CPU usage exceeded 90% on production server.", time: "1 hour ago", type: "warning" as const, read: false },
  { id: "n4", title: "Build failed", message: "CI pipeline failed on branch feature/auth.", time: "3 hours ago", type: "error" as const, read: true },
  { id: "n5", title: "Comment added", message: "Michael commented on your pull request #42.", time: "Yesterday", type: "info" as const, read: true, avatar: "https://i.pravatar.cc/150?img=12" },
];

const ComponentExamples = () => {
  const { control } = useForm<DemoForm>({
    defaultValues: { username: "", email: "", password: "", agree: false, newsletter: true, bio: "", notes: "", plan: "", priority: "", country: "", language: "", framework: "", searchCountry: "", searchLanguage: "", quantity: 0, rating: 5, otp: "", shortOtp: "", content: "", article: "" },
  });

  const [tableSelectedRows, setTableSelectedRows] = useState<Set<string | number>>(new Set());
  const [tablePage, setTablePage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(5);
  const [tableSortCol, setTableSortCol] = useState("name");
  const [tableSortDir, setTableSortDir] = useState<"asc" | "desc">("asc");
  const [paginationPage, setPaginationPage] = useState(1);
  const [simplePaginationPage, setSimplePaginationPage] = useState(1);
  const [simpleTablePage, setSimpleTablePage] = useState(1);
  const [stepperStep, setStepperStep] = useState(1);
  const [stepperStep2, setStepperStep2] = useState(2);
  const [visibleBadges, setVisibleBadges] = useState<Record<string, boolean>>({
    react: true, typescript: true, bug: true, tag: true, v2: true,
  });
  const removeBadge = (key: string) => setVisibleBadges((prev) => ({ ...prev, [key]: false }));
  const [alertInfo, setAlertInfo] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertDanger, setAlertDanger] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertLoading, setAlertLoading] = useState(false);
  const [alertCustom, setAlertCustom] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formNotify, setFormNotify] = useState(true);
  const [drawerRight, setDrawerRight] = useState(false);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [drawerTop, setDrawerTop] = useState(false);
  const [drawerBottom, setDrawerBottom] = useState(false);
  const [drawerSm, setDrawerSm] = useState(false);
  const [drawerLg, setDrawerLg] = useState(false);
  const [drawerXl, setDrawerXl] = useState(false);
  const [drawerFull, setDrawerFull] = useState(false);
  const [drawerWithFooter, setDrawerWithFooter] = useState(false);
  const [drawerNoDivider, setDrawerNoDivider] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [knobVal1, setKnobVal1] = useState(65);
  const [knobVal2, setKnobVal2] = useState(40);
  const [knobVal3, setKnobVal3] = useState(80);
  const [sliderVal, setSliderVal] = useState(50);
  const [rangeVal, setRangeVal] = useState<[number, number]>([20, 70]);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [underlineActive, setUnderlineActive] = useState(false);
  const [rateVal, setRateVal] = useState(3);
  const [rateHalf, setRateHalf] = useState(2.5);
  const [transferKeys, setTransferKeys] = useState<string[]>(["2", "5"]);
  const [colorVal, setColorVal] = useState("#3b82f6");
  const [dateVal, setDateVal] = useState("");

  const sortedUsers = [...sampleUsers].sort((a, b) => {
    const aVal = a[tableSortCol as keyof UserRow] ?? "";
    const bVal = b[tableSortCol as keyof UserRow] ?? "";
    const cmp = String(aVal).localeCompare(String(bVal));
    return tableSortDir === "asc" ? cmp : -cmp;
  });

  const pagedUsers = sortedUsers.slice(
    (tablePage - 1) * tablePageSize,
    tablePage * tablePageSize
  );

  const userColumns: Column<UserRow>[] = [
    {
      key: "name",
      header: "User",
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      minWidth: "200px",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <TableImage src={row.avatar} alt={row.name} size={36} shape="circle" />
          <div className="min-w-0">
            <p className="font-medium ce-heading truncate">{row.name}</p>
            <p className="text-xs ce-muted truncate">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      sortFn: (a, b) => a.role.localeCompare(b.role),
      responsive: "sm",
      render: (row) => <span className="text-sm ce-text">{row.role}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      render: (row) => statusBadge(row.status),
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
      sortFn: (a, b) => a.joined.localeCompare(b.joined),
      responsive: "md",
      render: (row) => <span className="text-sm ce-muted">{row.joined}</span>,
    },
    {
      key: "actions-buttons",
      header: "Quick Actions",
      align: "center",
      responsive: "lg",
      render: (row) => (
        <TableActionButtons
          size="sm"
          actions={[
            { icon: <StarIcon />, variant: "warning", tooltip: "Favorite", onClick: () => alert(`Starred ${row.name}`) },
            { icon: <DownloadIcon />, variant: "info", tooltip: "Download", onClick: () => alert(`Download ${row.name}`) },
            { icon: <TrashIcon />, variant: "danger", tooltip: "Delete", onClick: () => alert(`Delete ${row.name}`) },
          ]}
        />
      ),
    },
    {
      key: "actions-dropdown",
      header: "",
      align: "center",
      width: "60px",
      render: (row) => (
        <TableActionDropdown
          size="sm"
          actions={[
            { label: "View Profile", icon: <SearchIcon />, onClick: () => alert(`View ${row.name}`) },
            { label: "Edit User", icon: <PlusIcon />, onClick: () => alert(`Edit ${row.name}`) },
            { label: "Download", icon: <DownloadIcon />, onClick: () => alert(`Download ${row.name}`) },
            { divider: true, label: "", onClick: () => {} },
            { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert(`Delete ${row.name}`) },
          ]}
        />
      ),
    },
  ];

  const clientColumns: Column<UserRow>[] = [
    {
      key: "name",
      header: "User",
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      minWidth: "200px",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <TableImage src={row.avatar} alt={row.name} size={36} shape="circle" />
          <div className="min-w-0">
            <p className="font-medium ce-heading truncate">{row.name}</p>
            <p className="text-xs ce-muted truncate">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      sortFn: (a, b) => a.role.localeCompare(b.role),
      responsive: "sm",
      render: (row) => <span className="text-sm ce-text">{row.role}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      render: (row) => statusBadge(row.status),
    },
    {
      key: "joined",
      header: "Joined",
      sortable: true,
      sortFn: (a, b) => a.joined.localeCompare(b.joined),
      responsive: "md",
      render: (row) => <span className="text-sm ce-muted">{row.joined}</span>,
    },
  ];
  return (
    <div className="min-h-screen ce-page p-8">
      <h1 className="text-3xl font-bold ce-heading mb-8">Component Examples</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Solid Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
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
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Outline Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" outline label="Primary" />
          <Button variant="secondary" outline label="Secondary" />
          <Button variant="success" outline label="Success" />
          <Button variant="danger" outline label="Danger" />
          <Button variant="warning" outline label="Warning" />
          <Button variant="info" outline label="Info" />
          <Button variant="dark" outline label="Dark" />
          <Button variant="light" outline label="Light" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" label="Small" />
          <Button variant="primary" size="md" label="Medium" />
          <Button variant="primary" size="lg" label="Large" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Icons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" icon={<StarIcon />} label="Favorite" />
          <Button variant="success" icon={<DownloadIcon />} label="Download" />
          <Button variant="danger" icon={<TrashIcon />} label="Delete" iconPosition="right" />
          <Button variant="info" icon={<SearchIcon />} label="Search" />
          <Button variant="dark" icon={<PlusIcon />} label="Add Item" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Icon Only</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" icon={<StarIcon />} iconOnly size="sm" tooltip="Favorite" />
          <Button variant="danger" icon={<TrashIcon />} iconOnly tooltip="Delete" />
          <Button variant="success" icon={<PlusIcon />} iconOnly size="lg" tooltip="Add" />
          <Button variant="info" icon={<SearchIcon />} iconOnly outline tooltip="Search" tooltipPosition="right" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Tooltips</h2>
        <div className="flex flex-wrap items-center gap-8">
          <Button variant="primary" label="Top" tooltip="Tooltip on top" tooltipPosition="top" />
          <Button variant="secondary" label="Bottom" tooltip="Tooltip on bottom" tooltipPosition="bottom" />
          <Button variant="success" label="Left" tooltip="Tooltip on left" tooltipPosition="left" />
          <Button variant="danger" label="Right" tooltip="Tooltip on right" tooltipPosition="right" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Loading</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" loading label="Loading" />
          <Button variant="secondary" loading label="Loading" />
          <Button variant="success" loading outline label="Loading" />
          <Button variant="warning" loading label="Loading" />
          <Button variant="light" loading label="Loading" />
          <Button variant="link" loading label="Loading" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled label="Disabled" />
          <Button variant="danger" disabled outline label="Disabled" />
          <Button variant="success" disabled icon={<PlusIcon />} label="Disabled" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Block</h2>
        <div className="flex flex-col gap-3 max-w-md">
          <Button variant="primary" block label="Block Primary" />
          <Button variant="danger" block outline label="Block Outline Danger" />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Switch</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Variants</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" label="Primary" defaultChecked />
          <Switch variant="secondary" label="Secondary" defaultChecked />
          <Switch variant="success" label="Success" defaultChecked />
          <Switch variant="danger" label="Danger" defaultChecked />
          <Switch variant="warning" label="Warning" defaultChecked />
          <Switch variant="info" label="Info" defaultChecked />
          <Switch variant="dark" label="Dark" defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" size="sm" label="Small" defaultChecked />
          <Switch variant="primary" size="md" label="Medium" defaultChecked />
          <Switch variant="primary" size="lg" label="Large" defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Label Position</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" label="Label Right" defaultChecked />
          <Switch variant="success" label="Label Left" labelPosition="left" defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Off State</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" label="Unchecked" />
          <Switch variant="danger" label="Unchecked" />
          <Switch variant="success" label="Unchecked" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Switch variant="primary" label="Disabled On" defaultChecked disabled />
          <Switch variant="primary" label="Disabled Off" disabled />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Badges</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Solid Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" label="Primary" />
          <Badge variant="secondary" label="Secondary" />
          <Badge variant="success" label="Success" />
          <Badge variant="danger" label="Danger" />
          <Badge variant="warning" label="Warning" />
          <Badge variant="info" label="Info" />
          <Badge variant="dark" label="Dark" />
          <Badge variant="light" label="Light" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Outline Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" outline label="Primary" />
          <Badge variant="secondary" outline label="Secondary" />
          <Badge variant="success" outline label="Success" />
          <Badge variant="danger" outline label="Danger" />
          <Badge variant="warning" outline label="Warning" />
          <Badge variant="info" outline label="Info" />
          <Badge variant="dark" outline label="Dark" />
          <Badge variant="light" outline label="Light" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" size="sm" label="Small" />
          <Badge variant="primary" size="md" label="Medium" />
          <Badge variant="primary" size="lg" label="Large" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Pill Shape</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" pill label="Primary" />
          <Badge variant="success" pill label="Success" />
          <Badge variant="danger" pill label="Danger" />
          <Badge variant="warning" pill outline label="Warning" />
          <Badge variant="info" pill outline label="Info" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Icons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" icon={<StarIcon />} label="Featured" />
          <Badge variant="success" icon={<DownloadIcon />} label="Downloaded" />
          <Badge variant="danger" icon={<TrashIcon />} label="Deleted" iconPosition="right" />
          <Badge variant="info" icon={<SearchIcon />} pill label="Search" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Removable</h2>
        <div className="flex flex-wrap items-center gap-3">
          {visibleBadges.react && <Badge variant="primary" label="React" removable onRemove={() => removeBadge("react")} />}
          {visibleBadges.typescript && <Badge variant="success" label="TypeScript" removable pill onRemove={() => removeBadge("typescript")} />}
          {visibleBadges.bug && <Badge variant="danger" label="Bug" removable onRemove={() => removeBadge("bug")} />}
          {visibleBadges.tag && <Badge variant="info" outline label="Tag" removable pill onRemove={() => removeBadge("tag")} />}
          {visibleBadges.v2 && <Badge variant="dark" label="v2.0" removable size="lg" onRemove={() => removeBadge("v2")} />}
          {!Object.values(visibleBadges).some(Boolean) && (
            <button type="button" className="text-sm ce-link hover:underline cursor-pointer" onClick={() => setVisibleBadges({ react: true, typescript: true, bug: true, tag: true, v2: true })}>
              Reset badges
            </button>
          )}
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Control Button</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Outlined Variants</h2>
        <div className="flex flex-wrap items-start gap-4">
          <ControlButton variant="primary" icon={<StarIcon />} title="Favorites" description="View saved items" />
          <ControlButton variant="secondary" icon={<SearchIcon />} title="Search" description="Find anything" />
          <ControlButton variant="success" icon={<DownloadIcon />} title="Download" description="Get your files" />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Delete" description="Remove items" />
          <ControlButton variant="warning" icon={<PlusIcon />} title="Create" description="Add new entry" />
          <ControlButton variant="info" icon={<SearchIcon />} title="Explore" description="Discover more" />
          <ControlButton variant="dark" icon={<StarIcon />} title="Premium" description="Upgrade now" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Filled Variants</h2>
        <div className="flex flex-wrap items-start gap-4">
          <ControlButton variant="primary" filled icon={<StarIcon />} title="Favorites" description="View saved items" />
          <ControlButton variant="secondary" filled icon={<SearchIcon />} title="Search" description="Find anything" />
          <ControlButton variant="success" filled icon={<DownloadIcon />} title="Download" description="Get your files" />
          <ControlButton variant="danger" filled icon={<TrashIcon />} title="Delete" description="Remove items" />
          <ControlButton variant="warning" filled icon={<PlusIcon />} title="Create" description="Add new entry" />
          <ControlButton variant="info" filled icon={<SearchIcon />} title="Explore" description="Discover more" />
          <ControlButton variant="dark" filled icon={<StarIcon />} title="Premium" description="Upgrade now" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Selected State</h2>
        <div className="flex flex-wrap items-start gap-4">
          <ControlButton variant="primary" icon={<StarIcon />} title="Option A" description="Selected outline" selected />
          <ControlButton variant="success" filled icon={<DownloadIcon />} title="Option B" description="Selected filled" selected />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Option C" description="Not selected" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Without Description</h2>
        <div className="flex flex-wrap items-start gap-4">
          <ControlButton variant="primary" icon={<StarIcon />} title="Favorites" />
          <ControlButton variant="success" filled icon={<PlusIcon />} title="Create" />
          <ControlButton variant="danger" icon={<TrashIcon />} title="Delete" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled</h2>
        <div className="flex flex-wrap items-start gap-4">
          <ControlButton variant="primary" icon={<StarIcon />} title="Disabled" description="Outline disabled" disabled />
          <ControlButton variant="danger" filled icon={<TrashIcon />} title="Disabled" description="Filled disabled" disabled />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Input</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Basic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          <Input id="basic-1" label="Username" placeholder="Enter username" />
          <Input id="basic-2" label="Email" type="email" placeholder="Enter email" />
          <Input id="basic-3" label="Password" type="password" placeholder="Enter password" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          <Input id="size-sm" label="Small" size="sm" placeholder="Small input" />
          <Input id="size-md" label="Medium" size="md" placeholder="Medium input" />
          <Input id="size-lg" label="Large" size="lg" placeholder="Large input" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Error State</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input id="err-1" label="Email" placeholder="Enter email" error errorMessage="Invalid email address" />
          <Input id="err-2" label="Password" type="password" placeholder="Enter password" error errorMessage="Password is required" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled & Read Only</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input id="dis-1" label="Disabled" placeholder="Disabled input" disabled />
          <Input id="ro-1" label="Read Only" defaultValue="Read only value" readOnly />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Tooltip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Input id="tip-1" label="With Tooltip" placeholder="Hover me" tooltip="This is a helpful tooltip" tooltipPosition="top" />
          <Input id="tip-2" label="Tooltip Right" placeholder="Hover me" tooltip="Tooltip on the right" tooltipPosition="right" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With DataList</h2>
        <div className="max-w-sm">
          <Input id="dl-1" label="Framework" placeholder="Type to search..." dataList={["React", "Vue", "Angular", "Svelte", "Next.js"]} />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Form Input (react-hook-form)</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          <FormInput<DemoForm> id="form-user" label="Username" name="username" control={control} placeholder="Enter username" />
          <FormInput<DemoForm> id="form-email" label="Email" name="email" control={control} placeholder="Enter email" type="email" />
          <FormInput<DemoForm> id="form-pass" label="Password" name="password" control={control} placeholder="Enter password" type="password" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Input with Error</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <FormInput<DemoForm> id="form-err-1" label="Username" name="username" control={control} placeholder="Enter username" error errorMessage="Username is required" />
          <FormInput<DemoForm> id="form-err-2" label="Email" name="email" control={control} placeholder="Enter email" error errorMessage="Must be a valid email" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Input Disabled & Read Only</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <FormInput<DemoForm> id="form-dis" label="Disabled" name="username" control={control} placeholder="Disabled" disabledStatus />
          <FormInput<DemoForm> id="form-ro" label="Read Only" name="email" control={control} placeholder="Read only" readOnlyStatus />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Input with Tooltip</h2>
        <div className="max-w-sm">
          <FormInput<DemoForm> id="form-tip" label="Username" name="username" control={control} placeholder="Hover me" tooltip="Must be at least 3 characters" tooltipPosition="right" />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Checkbox</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Variants</h2>
        <div className="flex flex-wrap items-start gap-6">
          <Checkbox variant="primary" label="Primary" defaultChecked />
          <Checkbox variant="secondary" label="Secondary" defaultChecked />
          <Checkbox variant="success" label="Success" defaultChecked />
          <Checkbox variant="danger" label="Danger" defaultChecked />
          <Checkbox variant="warning" label="Warning" defaultChecked />
          <Checkbox variant="info" label="Info" defaultChecked />
          <Checkbox variant="dark" label="Dark" defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="flex flex-wrap items-start gap-6">
          <Checkbox variant="primary" size="sm" label="Small" defaultChecked />
          <Checkbox variant="primary" size="md" label="Medium" defaultChecked />
          <Checkbox variant="primary" size="lg" label="Large" defaultChecked />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Description</h2>
        <div className="flex flex-col gap-4">
          <Checkbox variant="primary" label="Terms & Conditions" description="I agree to the terms of service and privacy policy" defaultChecked />
          <Checkbox variant="success" label="Newsletter" description="Receive weekly updates and news" />
          <Checkbox variant="info" label="Notifications" description="Enable push notifications for updates" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Unchecked</h2>
        <div className="flex flex-wrap items-start gap-6">
          <Checkbox variant="primary" label="Unchecked" />
          <Checkbox variant="danger" label="Unchecked" />
          <Checkbox variant="success" label="Unchecked" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Error State</h2>
        <div className="flex flex-col gap-4">
          <Checkbox variant="primary" label="Accept terms" error errorMessage="You must accept the terms" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled</h2>
        <div className="flex flex-wrap items-start gap-6">
          <Checkbox variant="primary" label="Disabled checked" defaultChecked disabled />
          <Checkbox variant="primary" label="Disabled unchecked" disabled />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Form Checkbox (react-hook-form)</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Checkboxes</h2>
        <div className="flex flex-col gap-4">
          <FormCheckbox<DemoForm> id="form-agree" name="agree" control={control} variant="primary" label="I agree to terms" description="By checking this you accept our terms and conditions" />
          <FormCheckbox<DemoForm> id="form-news" name="newsletter" control={control} variant="success" label="Subscribe to newsletter" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Checkbox with Error</h2>
        <div className="flex flex-col gap-4">
          <FormCheckbox<DemoForm> id="form-cb-err" name="agree" control={control} variant="danger" label="Accept terms" error errorMessage="This field is required" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Checkbox Disabled</h2>
        <div className="flex flex-wrap items-start gap-6">
          <FormCheckbox<DemoForm> id="form-cb-dis" name="newsletter" control={control} variant="primary" label="Disabled" disabledStatus />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">TextArea</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Basic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <TextArea id="ta-1" label="Bio" placeholder="Tell us about yourself..." />
          <TextArea id="ta-2" label="Notes" placeholder="Write your notes here..." rows={6} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          <TextArea id="ta-sm" label="Small" size="sm" placeholder="Small textarea" rows={3} />
          <TextArea id="ta-md" label="Medium" size="md" placeholder="Medium textarea" rows={3} />
          <TextArea id="ta-lg" label="Large" size="lg" placeholder="Large textarea" rows={3} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Resize Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <TextArea id="ta-rn" label="No Resize" placeholder="Cannot resize" resize="none" rows={3} />
          <TextArea id="ta-rv" label="Vertical Resize" placeholder="Resize vertically" resize="vertical" rows={3} />
          <TextArea id="ta-rh" label="Horizontal Resize" placeholder="Resize horizontally" resize="horizontal" rows={3} />
          <TextArea id="ta-rb" label="Both Directions" placeholder="Resize both ways" resize="both" rows={3} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Error State</h2>
        <div className="max-w-md">
          <TextArea id="ta-err" label="Description" placeholder="Enter description..." error errorMessage="Description is required" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled & Read Only</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <TextArea id="ta-dis" label="Disabled" placeholder="Disabled textarea" disabled />
          <TextArea id="ta-ro" label="Read Only" defaultValue="This content is read only and cannot be edited by the user." readOnly />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Tooltip</h2>
        <div className="max-w-md">
          <TextArea id="ta-tip" label="Feedback" placeholder="Hover me..." tooltip="Please provide detailed feedback" tooltipPosition="top" rows={3} />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Form TextArea (react-hook-form)</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled TextAreas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <FormTextArea<DemoForm> id="form-bio" label="Bio" name="bio" control={control} placeholder="Tell us about yourself..." />
          <FormTextArea<DemoForm> id="form-notes" label="Notes" name="notes" control={control} placeholder="Write your notes..." rows={6} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form TextArea with Error</h2>
        <div className="max-w-md">
          <FormTextArea<DemoForm> id="form-ta-err" label="Bio" name="bio" control={control} placeholder="Enter bio..." error errorMessage="Bio is required" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form TextArea Disabled & Read Only</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <FormTextArea<DemoForm> id="form-ta-dis" label="Disabled" name="bio" control={control} placeholder="Disabled" disabledStatus />
          <FormTextArea<DemoForm> id="form-ta-ro" label="Read Only" name="notes" control={control} placeholder="Read only" readOnlyStatus />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Radio Button</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Vertical (default)</h2>
        <div className="max-w-sm">
          <RadioButton name="plan-v" variant="primary" defaultValue="free" options={planOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Horizontal</h2>
        <RadioButton
          name="color-h"
          variant="success"
          direction="horizontal"
          defaultValue="green"
          options={[
            { value: "red", label: "Red" },
            { value: "green", label: "Green" },
            { value: "blue", label: "Blue" },
          ]}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          <RadioButton name="v-primary" variant="primary" defaultValue="a" options={simpleOptions} />
          <RadioButton name="v-danger" variant="danger" defaultValue="a" options={simpleOptions} />
          <RadioButton name="v-success" variant="success" defaultValue="a" options={simpleOptions} />
          <RadioButton name="v-warning" variant="warning" defaultValue="a" options={simpleOptions} />
          <RadioButton name="v-info" variant="info" defaultValue="a" options={simpleOptions} />
          <RadioButton name="v-dark" variant="dark" defaultValue="a" options={simpleOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          <RadioButton name="s-sm" variant="primary" size="sm" defaultValue="a" options={simpleOptions} />
          <RadioButton name="s-md" variant="primary" size="md" defaultValue="a" options={simpleOptions} />
          <RadioButton name="s-lg" variant="primary" size="lg" defaultValue="a" options={simpleOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Error State</h2>
        <div className="max-w-sm">
          <RadioButton name="err-radio" variant="primary" error errorMessage="Please select an option" options={simpleOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Disabled</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <RadioButton name="dis-all" variant="primary" defaultValue="a" disabled options={simpleOptions} />
          <RadioButton name="dis-one" variant="primary" defaultValue="a" options={[{ value: "a", label: "Enabled" }, { value: "b", label: "This one disabled", disabled: true }]} />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Form Radio Button (react-hook-form)</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Radio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <FormRadioButton<DemoForm> id="form-plan" name="plan" control={control} variant="primary" options={planOptions} />
          <FormRadioButton<DemoForm> id="form-priority" name="priority" control={control} variant="danger" direction="horizontal" options={priorityOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Radio with Error</h2>
        <div className="max-w-sm">
          <FormRadioButton<DemoForm> id="form-radio-err" name="plan" control={control} variant="primary" error errorMessage="Please select a plan" options={planOptions.slice(0, 2)} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Radio Disabled</h2>
        <div className="max-w-sm">
          <FormRadioButton<DemoForm> id="form-radio-dis" name="priority" control={control} variant="primary" disabledStatus options={priorityOptions.slice(0, 2)} />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Select</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Basic Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <Select id="basic-select" label="Country" options={countryOptions} />
          <Select id="default-opt" label="With Default Option" addDefaultOption defaultOptionLabel="All Countries" options={countryOptions.slice(0, 3)} />
          <Select id="preselected" label="Preselected" defaultValue="react" options={frameworkOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Searchable Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <Select id="search-select" label="Search Countries" searchable searchPlaceholder="Type to search..." options={countryOptions} />
          <Select id="search-lang" label="Search Languages" searchable variant="success" options={languageOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl">
          <Select id="v-pri" label="Primary" variant="primary" defaultValue="a" options={simpleOptions} />
          <Select id="v-sec" label="Secondary" variant="secondary" defaultValue="a" options={simpleOptions} />
          <Select id="v-dan" label="Danger" variant="danger" defaultValue="a" options={simpleOptions} />
          <Select id="v-suc" label="Success" variant="success" defaultValue="a" options={simpleOptions} />
          <Select id="v-war" label="Warning" variant="warning" defaultValue="a" options={simpleOptions} />
          <Select id="v-inf" label="Info" variant="info" defaultValue="a" options={simpleOptions} />
          <Select id="v-drk" label="Dark" variant="dark" defaultValue="a" options={simpleOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <Select id="s-sm" label="Small" size="sm" options={simpleOptions} />
          <Select id="s-md" label="Medium" size="md" options={simpleOptions} />
          <Select id="s-lg" label="Large" size="lg" options={simpleOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Error & Disabled</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <Select id="sel-err" label="With Error" error errorMessage="Please select a country" options={countryOptions.slice(0, 2)} />
          <Select id="sel-dis" label="Disabled" disabled defaultValue="us" options={countryOptions.slice(0, 2)} />
          <Select
            id="sel-dis-opt"
            label="Disabled Options"
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom", disabled: true },
              { value: "ca", label: "Canada" },
              { value: "au", label: "Australia", disabled: true },
            ]}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">With Tooltip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <Select id="sel-tip-top" label="Tooltip Top" tooltip="Choose your preferred country" tooltipPosition="top" options={countryOptions.slice(0, 2)} />
          <Select id="sel-tip-right" label="Tooltip Right" tooltip="Select a framework" tooltipPosition="right" options={frameworkOptions.slice(0, 2)} />
        </div>
      </section>

      <hr className="my-10 ce-divider" />

      <h1 className="text-3xl font-bold ce-heading mb-8">Form Select (react-hook-form)</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Form Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormSelect<DemoForm> id="form-country" label="Country" name="country" control={control} variant="primary" options={countryOptions.slice(0, 5)} />
          <FormSelect<DemoForm> id="form-language" label="Language (Searchable)" name="language" control={control} variant="success" searchable options={languageOptions.slice(0, 7)} />
          <FormSelect<DemoForm> id="form-framework" label="Framework" name="framework" control={control} variant="info" options={frameworkOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Select Error & Disabled</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormSelect<DemoForm> id="form-sel-err" label="With Error" name="country" control={control} error errorMessage="Country is required" options={countryOptions.slice(0, 2)} />
          <FormSelect<DemoForm> id="form-sel-dis" label="Disabled" name="language" control={control} disabledStatus options={languageOptions.slice(0, 2)} />
          <FormSelect<DemoForm> id="form-sel-tooltip" label="With Tooltip" name="framework" control={control} tooltip="Choose your framework" variant="dark" searchable options={frameworkOptions.slice(0, 4)} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Search Input — Basic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <SearchInput id="search-basic" label="Search Country" options={countryOptions} placeholder="Type to search..." />
          <SearchInput id="search-preselect" label="Pre-selected" options={languageOptions} defaultValue="ts" />
          <SearchInput id="search-noresults" label="Custom No Results" options={frameworkOptions} noResultsText="Nothing matched" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Search Input — Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <SearchInput id="search-sm" label="Small" options={countryOptions} size="sm" />
          <SearchInput id="search-md" label="Medium" options={countryOptions} size="md" />
          <SearchInput id="search-lg" label="Large" options={countryOptions} size="lg" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Search Input — Error, Disabled & Read Only</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <SearchInput id="search-err" label="With Error" options={countryOptions} error errorMessage="Please select a country" />
          <SearchInput id="search-dis" label="Disabled" options={languageOptions} disabled defaultValue="py" />
          <SearchInput id="search-ro" label="Read Only" options={frameworkOptions} readOnly defaultValue="react" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Search Input — With Tooltip</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <SearchInput id="search-tt-top" label="Tooltip Top" options={countryOptions} tooltip="Search for a country" tooltipPosition="top" />
          <SearchInput id="search-tt-right" label="Tooltip Right" options={languageOptions} tooltip="Pick a language" tooltipPosition="right" />
          <SearchInput id="search-tt-bottom" label="Tooltip Bottom" options={frameworkOptions} tooltip="Choose framework" tooltipPosition="bottom" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Form Search Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormSearchInput<DemoForm> id="form-search-country" label="Search Country" name="searchCountry" control={control} options={countryOptions} />
          <FormSearchInput<DemoForm> id="form-search-lang" label="Search Language" name="searchLanguage" control={control} options={languageOptions} />
          <FormSearchInput<DemoForm> id="form-search-lg" label="Large Size" name="searchCountry" control={control} options={countryOptions} size="lg" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Search Input — Error, Disabled & Tooltip</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormSearchInput<DemoForm> id="form-search-err" label="With Error" name="searchCountry" control={control} error errorMessage="Country is required" options={countryOptions} />
          <FormSearchInput<DemoForm> id="form-search-dis" label="Disabled" name="searchLanguage" control={control} disabledStatus options={languageOptions} />
          <FormSearchInput<DemoForm> id="form-search-tt" label="With Tooltip" name="searchCountry" control={control} tooltip="Search and select a country" options={countryOptions} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Number Input — Basic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <NumberInput id="num-basic" label="Default" />
          <NumberInput id="num-default" label="With Default Value" defaultValue={10} />
          <NumberInput id="num-step" label="Step by 5" step={5} defaultValue={0} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Number Input — Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <NumberInput id="num-primary" label="Primary" variant="primary" defaultValue={3} />
          <NumberInput id="num-success" label="Success" variant="success" defaultValue={7} />
          <NumberInput id="num-danger" label="Danger" variant="danger" defaultValue={1} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mt-4">
          <NumberInput id="num-warning" label="Warning" variant="warning" defaultValue={2} />
          <NumberInput id="num-info" label="Info" variant="info" defaultValue={4} />
          <NumberInput id="num-dark" label="Dark" variant="dark" defaultValue={6} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Number Input — Colored Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <NumberInput id="num-colored" label="Colored (Danger − / Success +)" coloredButtons defaultValue={5} />
          <NumberInput id="num-colored-sm" label="Small Colored" coloredButtons size="sm" defaultValue={2} min={0} max={10} />
          <NumberInput id="num-colored-lg" label="Large Colored" coloredButtons size="lg" defaultValue={8} min={0} max={20} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Number Input — Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <NumberInput id="num-sm" label="Small" size="sm" defaultValue={1} />
          <NumberInput id="num-md" label="Medium" size="md" defaultValue={2} />
          <NumberInput id="num-lg" label="Large" size="lg" defaultValue={3} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Number Input — Min / Max & States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <NumberInput id="num-minmax" label="Min 0 / Max 10" min={0} max={10} defaultValue={5} variant="info" />
          <NumberInput id="num-err" label="With Error" error errorMessage="Quantity is required" defaultValue={0} />
          <NumberInput id="num-dis" label="Disabled" disabled defaultValue={8} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mt-4">
          <NumberInput id="num-ro" label="Read Only" readOnly defaultValue={42} />
          <NumberInput id="num-tt" label="With Tooltip" tooltip="Adjust the quantity" tooltipPosition="top" defaultValue={3} variant="success" />
          <NumberInput id="num-decimal" label="Decimal Step (0.5)" step={0.5} defaultValue={1.5} min={0} max={5} variant="warning" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Form Number Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormNumberInput<DemoForm> id="form-qty" label="Quantity" name="quantity" control={control} min={0} max={100} variant="primary" />
          <FormNumberInput<DemoForm> id="form-rating" label="Rating (1-10)" name="rating" control={control} min={1} max={10} variant="success" />
          <FormNumberInput<DemoForm> id="form-num-lg" label="Large Dark" name="quantity" control={control} size="lg" variant="dark" />
          <FormNumberInput<DemoForm> id="form-num-colored" label="Colored Buttons" name="quantity" control={control} coloredButtons min={0} max={50} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Form Number Input — Error, Disabled & Tooltip</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <FormNumberInput<DemoForm> id="form-num-err" label="With Error" name="quantity" control={control} error errorMessage="Must be at least 1" variant="danger" />
          <FormNumberInput<DemoForm> id="form-num-dis" label="Disabled" name="rating" control={control} disabledStatus />
          <FormNumberInput<DemoForm> id="form-num-tt" label="With Tooltip" name="quantity" control={control} tooltip="Set the amount" variant="info" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">OTP Input — Different Lengths</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <OtpInput id="otp-4" label="4-Digit PIN" length={4} variant="primary" />
          <OtpInput id="otp-6" label="6-Digit Code (Default)" length={6} variant="success" />
          <OtpInput id="otp-8" label="8-Digit Code" length={8} variant="info" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">OTP Input — Variants & Sizes</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <OtpInput id="otp-danger" label="Danger Variant" length={6} variant="danger" />
          <OtpInput id="otp-dark" label="Dark Variant" length={6} variant="dark" />
          <OtpInput id="otp-sm" label="Small" length={4} size="sm" variant="primary" />
          <OtpInput id="otp-lg" label="Large" length={4} size="lg" variant="success" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">OTP Input — States</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <OtpInput id="otp-masked" label="Masked (Password)" length={6} masked variant="dark" />
          <OtpInput id="otp-err" label="With Error" length={6} error errorMessage="Invalid verification code" variant="danger" />
          <OtpInput id="otp-dis" label="Disabled" length={6} disabled defaultValue="123456" />
          <OtpInput id="otp-tt" label="With Tooltip" length={4} tooltip="Enter the code sent to your phone" variant="info" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Form OTP Input</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <FormOtpInput<DemoForm> id="form-otp" label="Verification Code (6)" name="otp" control={control} length={6} variant="primary" />
          <FormOtpInput<DemoForm> id="form-otp-short" label="Short PIN (4)" name="shortOtp" control={control} length={4} variant="success" />
          <FormOtpInput<DemoForm> id="form-otp-err" label="With Error" name="otp" control={control} length={6} error errorMessage="Code is required" variant="danger" />
          <FormOtpInput<DemoForm> id="form-otp-dis" label="Disabled" name="otp" control={control} length={6} disabledStatus />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Rich Text Editor</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <RichTextEditor id="rte-basic" label="Basic Editor" placeholder="Write something amazing..." />
          <RichTextEditor id="rte-sm" label="Small Editor" size="sm" placeholder="Compact editor..." />
          <RichTextEditor id="rte-lg" label="Large Editor" size="lg" placeholder="Lots of room to write..." />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Rich Text Editor — States</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <RichTextEditor id="rte-content" label="With Default Content" defaultValue="<h2>Hello World</h2><p>This is a <strong>rich text</strong> editor with <em>formatting</em> support.</p><ul><li>Bold, Italic, Underline</li><li>Headings & Lists</li><li>Links & Images</li></ul>" />
          <RichTextEditor id="rte-err" label="With Error" error errorMessage="Content is required" />
          <RichTextEditor id="rte-dis" label="Disabled" disabled defaultValue="<p>This editor is disabled and cannot be edited.</p>" />
          <RichTextEditor id="rte-tt" label="With Tooltip" tooltip="Format your content here" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Controlled Form Rich Text Editor</h2>
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          <FormRichTextEditor<DemoForm> id="form-rte" label="Article Content" name="content" control={control} placeholder="Write your article..." />
          <FormRichTextEditor<DemoForm> id="form-rte-sm" label="Short Notes" name="article" control={control} size="sm" placeholder="Quick notes..." />
          <FormRichTextEditor<DemoForm> id="form-rte-err" label="With Error" name="content" control={control} error errorMessage="Content must not be empty" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Workflow Editor</h2>
        <div className="grid grid-cols-1 gap-6">
          <WorkflowEditor id="wf-basic" label="Basic Workflow" height="500px" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Workflow Editor — States</h2>
        <div className="grid grid-cols-1 gap-6">
          <WorkflowEditor id="wf-compact" label="Compact (No MiniMap)" height="350px" showMiniMap={false} />
          <WorkflowEditor id="wf-err" label="With Error" height="400px" error errorMessage="Workflow has validation errors" />
          <WorkflowEditor id="wf-dis" label="Disabled (Read Only)" height="400px" disabled />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Full Featured</h2>
        <DataTable<UserRow>
          columns={userColumns}
          data={pagedUsers}
          rowKey={(row) => row.id}
          title="Users"
          selectable
          selectedRows={tableSelectedRows}
          onSelectionChange={setTableSelectedRows}
          pageSize={tablePageSize}
          onPageSizeChange={(size) => { setTablePageSize(size); setTablePage(1); }}
          currentPage={tablePage}
          totalItems={sampleUsers.length}
          onPageChange={setTablePage}
          sortColumn={tableSortCol}
          sortDirection={tableSortDir}
          onSort={(col, dir) => { setTableSortCol(col); setTableSortDir(dir); }}
          striped
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Compact & Borderless</h2>
        <DataTable<UserRow>
          columns={userColumns.slice(0, 4)}
          data={sampleUsers.slice(0, 5)}
          rowKey={(row) => row.id}
          compact
          borderless
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Loading State</h2>
        <DataTable<UserRow>
          columns={userColumns.slice(0, 4)}
          data={[]}
          rowKey={(row) => row.id}
          title="Loading Data"
          loading
          pageSize={5}
          onPageSizeChange={() => {}}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Empty State</h2>
        <DataTable<UserRow>
          columns={userColumns.slice(0, 4)}
          data={[]}
          rowKey={(row) => row.id}
          title="Empty Table"
          emptyMessage="No users found matching your criteria"
          pageSize={5}
          onPageSizeChange={() => {}}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Simple Pagination (Prev / Next)</h2>
        <DataTable<UserRow>
          columns={userColumns.slice(0, 4)}
          data={sampleUsers.slice((simpleTablePage - 1) * 5, simpleTablePage * 5)}
          rowKey={(row) => row.id}
          title="Users (Simple Nav)"
          pageSize={5}
          onPageSizeChange={() => {}}
          currentPage={simpleTablePage}
          totalItems={sampleUsers.length}
          onPageChange={setSimpleTablePage}
          paginationMode="simple"
          hoverable
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Data Table — Client-Side Managed (Just Pass Data)</h2>
        <p className="text-sm ce-muted mb-3">Sorting and pagination handled internally — no external state needed. Click a row to see onRowClick.</p>
        <DataTable<UserRow>
          columns={clientColumns}
          data={sampleUsers}
          rowKey={(row) => row.id}
          title="Auto-Managed Users"
          clientSidePagination
          clientSideSorting
          pageSize={5}
          selectable
          selectedRows={tableSelectedRows}
          onSelectionChange={setTableSelectedRows}
          onRowClick={(row) => alert(`Clicked: ${row.name} (${row.email})`)}
          striped
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Pagination — Full (Page Numbers)</h2>
        <div className="flex flex-col gap-6 ce-panel p-6 rounded-xl border ce-divider">
          <div>
            <p className="text-sm ce-muted mb-3">Default</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Rounded</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} variant="rounded" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Minimal</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} variant="minimal" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Small Size</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} size="sm" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Large Size</p>
            <Pagination currentPage={paginationPage} totalPages={20} onPageChange={setPaginationPage} size="lg" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Pagination — Simple (Previous / Next)</h2>
        <div className="flex flex-col gap-6 ce-panel p-6 rounded-xl border ce-divider">
          <div>
            <p className="text-sm ce-muted mb-3">Default</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Rounded</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} variant="rounded" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Minimal</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} variant="minimal" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Without Page Info</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} showPageInfo={false} />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Small Size</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} size="sm" />
          </div>
          <div>
            <p className="text-sm ce-muted mb-3">Large Size</p>
            <SimplePagination currentPage={simplePaginationPage} totalPages={20} onPageChange={setSimplePaginationPage} size="lg" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Table Action Buttons — Variants</h2>
        <div className="flex flex-col gap-4 ce-panel p-6 rounded-xl border ce-divider">
          <div>
            <p className="text-sm ce-muted mb-2">Icon Only</p>
            <TableActionButtons
              actions={[
                { icon: <StarIcon />, variant: "warning", tooltip: "Star", onClick: () => alert("Star") },
                { icon: <DownloadIcon />, variant: "info", tooltip: "Download", onClick: () => alert("Download") },
                { icon: <TrashIcon />, variant: "danger", tooltip: "Delete", onClick: () => alert("Delete") },
              ]}
            />
          </div>
          <div>
            <p className="text-sm ce-muted mb-2">Icon + Text</p>
            <TableActionButtons
              actions={[
                { icon: <StarIcon />, label: "Star", variant: "warning", onClick: () => alert("Star") },
                { icon: <DownloadIcon />, label: "Download", variant: "info", onClick: () => alert("Download") },
                { icon: <TrashIcon />, label: "Delete", variant: "danger", onClick: () => alert("Delete") },
              ]}
            />
          </div>
          <div>
            <p className="text-sm ce-muted mb-2">Text Only</p>
            <TableActionButtons
              actions={[
                { label: "Approve", variant: "success", onClick: () => alert("Approve") },
                { label: "Reject", variant: "danger", onClick: () => alert("Reject") },
                { label: "Pending", variant: "warning", onClick: () => alert("Pending") },
              ]}
            />
          </div>
          <div>
            <p className="text-sm ce-muted mb-2">Disabled</p>
            <TableActionButtons
              actions={[
                { icon: <StarIcon />, label: "Disabled", variant: "primary", disabled: true, onClick: () => {} },
                { icon: <TrashIcon />, label: "Active", variant: "danger", onClick: () => alert("Active") },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Table Action Dropdown — Variants</h2>
        <div className="flex items-start gap-8 ce-panel p-6 rounded-xl border ce-divider">
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Icon + Text</p>
            <TableActionDropdown
              actions={[
                { label: "View", icon: <SearchIcon />, onClick: () => alert("View") },
                { label: "Edit", icon: <PlusIcon />, onClick: () => alert("Edit") },
                { divider: true, label: "", onClick: () => {} },
                { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
              ]}
            />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Text Only</p>
            <TableActionDropdown
              actions={[
                { label: "View Profile", onClick: () => alert("View") },
                { label: "Send Message", onClick: () => alert("Message") },
                { label: "Remove", variant: "danger", onClick: () => alert("Remove") },
              ]}
            />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">With Disabled</p>
            <TableActionDropdown
              actions={[
                { label: "Active Action", icon: <StarIcon />, onClick: () => alert("Active") },
                { label: "Disabled Action", icon: <DownloadIcon />, disabled: true, onClick: () => {} },
                { divider: true, label: "", onClick: () => {} },
                { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
              ]}
            />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Small</p>
            <TableActionDropdown
              size="sm"
              actions={[
                { label: "View", onClick: () => alert("View") },
                { label: "Delete", variant: "danger", onClick: () => alert("Delete") },
              ]}
            />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Large</p>
            <TableActionDropdown
              size="lg"
              actions={[
                { label: "View", icon: <SearchIcon />, onClick: () => alert("View") },
                { label: "Delete", icon: <TrashIcon />, variant: "danger", onClick: () => alert("Delete") },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Table Image — Shapes & Sizes</h2>
        <div className="flex items-center gap-6 ce-panel p-6 rounded-xl border ce-divider">
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Circle</p>
            <TableImage src="https://i.pravatar.cc/150?img=15" alt="Circle" size={48} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Rounded</p>
            <TableImage src="https://i.pravatar.cc/150?img=16" alt="Rounded" size={48} shape="rounded" />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Square</p>
            <TableImage src="https://i.pravatar.cc/150?img=17" alt="Square" size={48} shape="square" />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Small</p>
            <TableImage src="https://i.pravatar.cc/150?img=18" alt="Small" size={28} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Large</p>
            <TableImage src="https://i.pravatar.cc/150?img=19" alt="Large" size={64} shape="circle" />
          </div>
          <div className="text-center">
            <p className="text-sm ce-muted mb-2">Fallback</p>
            <TableImage src="" alt="No image" size={48} shape="circle" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Basic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$48,560"
            icon={<StarIcon />}
            change={12.5}
            variant="primary"
          />
          <StatCard
            title="New Users"
            value="2,340"
            icon={<PlusIcon />}
            change={8.2}
            variant="success"
          />
          <StatCard
            title="Bounce Rate"
            value="24.3%"
            icon={<TrashIcon />}
            change={-3.1}
            variant="danger"
          />
          <StatCard
            title="Avg. Session"
            value="4m 32s"
            icon={<SearchIcon />}
            variant="info"
            subtitle="Last 30 days"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <StatCard title="Orders" value="1,248" change={5.7} variant="warning" />
          <StatCard title="Subscribers" value="9,812" change={18.3} variant="secondary" />
          <StatCard title="Tickets" value="342" change={-7.4} variant="dark" />
          <StatCard title="Page Views" value="128K" subtitle="All time" variant="info" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Gradient</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GradientStatCard
            title="Revenue"
            value="$84,230"
            icon={<StarIcon />}
            change={22.4}
            gradient="blue"
          />
          <GradientStatCard
            title="Projects"
            value="156"
            icon={<PlusIcon />}
            change={11.8}
            gradient="purple"
          />
          <GradientStatCard
            title="Growth"
            value="+34.7%"
            icon={<DownloadIcon />}
            gradient="emerald"
            subtitle="Quarter over quarter"
          />
          <GradientStatCard
            title="Churn Rate"
            value="2.4%"
            icon={<TrashIcon />}
            change={-0.8}
            gradient="rose"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <GradientStatCard title="Active Users" value="12,480" change={15.3} gradient="amber" />
          <GradientStatCard title="Server Uptime" value="99.98%" gradient="cyan" subtitle="Last 90 days" />
          <GradientStatCard title="API Calls" value="2.4M" change={42.1} gradient="dark" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProgressStatCard
            title="Storage Used"
            value="48.2 GB"
            progress={72}
            icon={<DownloadIcon />}
            variant="primary"
            target="64 GB"
          />
          <ProgressStatCard
            title="Tasks Complete"
            value="184 / 240"
            progress={76.6}
            variant="success"
            target="240 tasks"
          />
          <ProgressStatCard
            title="Budget Spent"
            value="$18,400"
            progress={92}
            icon={<StarIcon />}
            variant="danger"
            target="$20,000"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <ProgressStatCard
            title="Course Progress"
            value="Module 7 / 12"
            progress={58}
            variant="warning"
            target="12 modules"
          />
          <ProgressStatCard
            title="Upload Progress"
            value="3.2 GB"
            progress={40}
            variant="info"
            target="8 GB"
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Ring</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <RingStatCard
            title="CPU Usage"
            value="67%"
            progress={67}
            variant="primary"
            size="lg"
            subtitle="Average this hour"
          />
          <RingStatCard
            title="Disk Space"
            value="234 GB"
            progress={78}
            variant="danger"
            icon={<DownloadIcon />}
            subtitle="of 300 GB used"
          />
          <RingStatCard
            title="Tasks Done"
            value="42 / 50"
            progress={84}
            variant="success"
            size="lg"
            subtitle="Sprint #14"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <RingStatCard title="Memory" value="8.2 GB" progress={51} variant="warning" size="sm" />
          <RingStatCard title="Battery" value="92%" progress={92} variant="success" size="sm" />
          <RingStatCard title="Errors" value="3.2%" progress={3.2} variant="danger" size="sm" />
          <RingStatCard title="Network" value="84 Mbps" progress={84} variant="info" size="sm" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Sparkline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SparklineStatCard
            title="Revenue Trend"
            value="$92,450"
            data={sparklineRevenueData}
            change={18.2}
            variant="primary"
          />
          <SparklineStatCard
            title="User Growth"
            value="2,250"
            data={sparklineUsersData}
            change={12.4}
            variant="success"
          />
          <SparklineStatCard
            title="Orders Decline"
            value="420"
            data={sparklineOrdersData}
            change={-15.6}
            changeLabel="vs last quarter"
            variant="danger"
          />
          <SparklineStatCard
            title="Conversion Rate"
            value="4.2%"
            data={sparklineConversionData}
            change={8.1}
            variant="info"
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Stat Cards — Mini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <MiniStatCard icon={<StarIcon />} label="Total Revenue" value="$48.5K" change={12.5} variant="primary" />
          <MiniStatCard icon={<PlusIcon />} label="New Users" value="2,340" change={8.2} variant="success" />
          <MiniStatCard icon={<TrashIcon />} label="Bounce Rate" value="24.3%" change={-3.1} variant="danger" />
          <MiniStatCard icon={<SearchIcon />} label="Sessions" value="18.2K" change={5.4} variant="info" />
          <MiniStatCard icon={<DownloadIcon />} label="Downloads" value="9,412" change={22.8} variant="warning" />
          <MiniStatCard icon={<StarIcon />} label="Rating" value="4.8 / 5" variant="dark" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Breadcrumb — Default (Separators)</h2>
        <div className="flex flex-col gap-5 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Chevron (default)</p>
            <Breadcrumb items={breadcrumbItems} separator="chevron" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Slash</p>
            <Breadcrumb items={breadcrumbItems} separator="slash" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Arrow</p>
            <Breadcrumb items={breadcrumbItems} separator="arrow" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Dot</p>
            <Breadcrumb items={breadcrumbItems} separator="dot" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Dash</p>
            <Breadcrumb items={breadcrumbItems} separator="dash" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Breadcrumb — Variants</h2>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Contained</p>
            <Breadcrumb items={breadcrumbItems} variant="contained" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Pills</p>
            <Breadcrumb items={breadcrumbItems} variant="pills" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Arrows</p>
            <Breadcrumb items={breadcrumbItems} variant="arrows" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Dots</p>
            <Breadcrumb items={breadcrumbItems} variant="dots" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Bordered</p>
            <Breadcrumb items={breadcrumbItems} variant="bordered" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Breadcrumb — Sizes & Home Icon</h2>
        <div className="flex flex-col gap-5 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Small with Home Icon</p>
            <Breadcrumb items={breadcrumbShortItems} size="sm" homeIcon />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Medium with Home Icon</p>
            <Breadcrumb items={breadcrumbShortItems} size="md" homeIcon />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Large with Home Icon</p>
            <Breadcrumb items={breadcrumbShortItems} size="lg" homeIcon />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — Default</h2>
        <PageBreadcrumb
          title="Analytics Dashboard"
          items={pageBreadcrumbItems}
          subtitle="Monitor your key performance metrics"
          icon={<StarIcon />}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — Card</h2>
        <PageBreadcrumb
          title="Project Settings"
          items={pageBreadcrumbProjectItems}
          subtitle="Configure your project preferences"
          variant="card"
          icon={<SearchIcon />}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — Gradient</h2>
        <PageBreadcrumb
          title="User Management"
          items={pageBreadcrumbUsersItems}
          subtitle="View and manage all user accounts"
          variant="gradient"
          icon={<PlusIcon />}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — Modern</h2>
        <PageBreadcrumb
          title="Reports & Analytics"
          items={pageBreadcrumbItems}
          subtitle="Deep dive into your data"
          variant="modern"
          icon={<DownloadIcon />}
          dateFormat="long"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — Minimal</h2>
        <PageBreadcrumb
          title="Profile Settings"
          items={breadcrumbShortItems}
          variant="minimal"
          icon={<StarIcon />}
          dateFormat="short"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Page Breadcrumb — With Actions</h2>
        <PageBreadcrumb
          title="Team Dashboard"
          items={pageBreadcrumbItems}
          subtitle="Manage your team's performance"
          variant="card"
          icon={<StarIcon />}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm" icon={<PlusIcon />} label="Add New" />
              <Button variant="secondary" size="sm" outline icon={<DownloadIcon />} label="Export" />
            </div>
          }
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Sizes</h2>
        <div className="flex flex-wrap items-end gap-4 ce-panel rounded-2xl border ce-divider p-6">
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=1" size="xs" />
            <p className="text-xs ce-muted mt-2">XS</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=2" size="sm" />
            <p className="text-xs ce-muted mt-2">SM</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=3" size="md" />
            <p className="text-xs ce-muted mt-2">MD</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=4" size="lg" />
            <p className="text-xs ce-muted mt-2">LG</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=5" size="xl" />
            <p className="text-xs ce-muted mt-2">XL</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=6" size="2xl" />
            <p className="text-xs ce-muted mt-2">2XL</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Shapes</h2>
        <div className="flex flex-wrap items-center gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=10" size="lg" shape="circle" />
            <p className="text-xs ce-muted mt-2">Circle</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=11" size="lg" shape="rounded" />
            <p className="text-xs ce-muted mt-2">Rounded</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=12" size="lg" shape="square" />
            <p className="text-xs ce-muted mt-2">Square</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Initials (Variants)</h2>
        <div className="flex flex-wrap items-center gap-4 ce-panel rounded-2xl border ce-divider p-6">
          <Avatar name="Sarah Johnson" variant="primary" size="lg" />
          <Avatar name="Michael Chen" variant="secondary" size="lg" />
          <Avatar name="Emily Davis" variant="success" size="lg" />
          <Avatar name="James Wilson" variant="danger" size="lg" />
          <Avatar name="Olivia Brown" variant="warning" size="lg" />
          <Avatar name="Daniel Lee" variant="info" size="lg" />
          <Avatar name="Sophia Martinez" variant="dark" size="lg" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Icon Avatars</h2>
        <div className="flex flex-wrap items-center gap-4 ce-panel rounded-2xl border ce-divider p-6">
          <Avatar icon={<StarIcon />} variant="primary" size="lg" />
          <Avatar icon={<PlusIcon />} variant="success" size="lg" />
          <Avatar icon={<SearchIcon />} variant="info" size="lg" />
          <Avatar icon={<DownloadIcon />} variant="warning" size="lg" />
          <Avatar icon={<TrashIcon />} variant="danger" size="lg" />
          <Avatar icon={<StarIcon />} variant="dark" size="lg" shape="rounded" />
          <Avatar icon={<PlusIcon />} variant="primary" size="lg" shape="square" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Status Indicators</h2>
        <div className="flex flex-wrap items-center gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=20" size="lg" status="online" />
            <p className="text-xs ce-muted mt-2">Online</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=21" size="lg" status="offline" />
            <p className="text-xs ce-muted mt-2">Offline</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=22" size="lg" status="busy" />
            <p className="text-xs ce-muted mt-2">Busy</p>
          </div>
          <div className="text-center">
            <Avatar src="https://i.pravatar.cc/150?img=23" size="lg" status="away" />
            <p className="text-xs ce-muted mt-2">Away</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 ce-panel rounded-2xl border ce-divider p-6 mt-4">
          <Avatar name="Sarah J" variant="primary" size="lg" status="online" />
          <Avatar name="Mike C" variant="success" size="lg" status="busy" />
          <Avatar name="Emily D" variant="danger" size="lg" status="away" />
          <Avatar icon={<StarIcon />} variant="info" size="lg" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=24" size="xl" status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=25" size="2xl" status="busy" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Bordered</h2>
        <div className="flex flex-wrap items-center gap-4 ce-dark-panel rounded-2xl p-6">
          <Avatar src="https://i.pravatar.cc/150?img=30" size="lg" bordered />
          <Avatar src="https://i.pravatar.cc/150?img=31" size="lg" bordered />
          <Avatar name="Alice M" variant="primary" size="lg" bordered />
          <Avatar name="Bob K" variant="success" size="lg" bordered />
          <Avatar src="https://i.pravatar.cc/150?img=32" size="xl" bordered status="online" />
          <Avatar src="https://i.pravatar.cc/150?img=33" size="2xl" bordered status="busy" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar — Fallback</h2>
        <div className="flex flex-wrap items-center gap-4 ce-panel rounded-2xl border ce-divider p-6">
          <div className="text-center">
            <Avatar size="lg" variant="primary" />
            <p className="text-xs ce-muted mt-2">No data</p>
          </div>
          <div className="text-center">
            <Avatar src="https://invalid-url.com/404.jpg" size="lg" name="Fallback" variant="success" />
            <p className="text-xs ce-muted mt-2">Bad URL → Initials</p>
          </div>
          <div className="text-center">
            <Avatar src="" size="lg" variant="secondary" />
            <p className="text-xs ce-muted mt-2">Empty src</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar Group — Sizes</h2>
        <div className="flex flex-col gap-5 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">XS</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="xs" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">SM</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="sm" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">MD</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="md" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">LG</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="lg" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">XL</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="xl" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar Group — Max Limit</h2>
        <div className="flex flex-col gap-5 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Max 3 of 8</p>
            <AvatarGroup items={avatarGroupItems} max={3} size="lg" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">Max 5 of 8</p>
            <AvatarGroup items={avatarGroupItems} max={5} size="lg" />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-2">All 8 shown</p>
            <AvatarGroup items={avatarGroupItems} max={8} size="lg" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Avatar Group — Initials</h2>
        <div className="flex flex-col gap-5 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-2">With initials fallback</p>
            <AvatarGroup items={avatarGroupInitials} max={4} size="lg" />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — Basic</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Default</p>
            <Dropdown
              trigger={<Button variant="primary" label="Options" icon={<StarIcon />} size="sm" />}
              items={dropdownBasicItems}
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Right aligned</p>
            <Dropdown
              trigger={<Button variant="secondary" label="Actions" size="sm" />}
              items={dropdownBasicItems}
              placement="bottom-end"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Small</p>
            <Dropdown
              trigger={<Button variant="info" label="Small" size="sm" outline />}
              items={dropdownBasicItems}
              size="sm"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Large</p>
            <Dropdown
              trigger={<Button variant="dark" label="Large" size="sm" />}
              items={dropdownBasicItems}
              size="lg"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — With Descriptions</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <Dropdown
            trigger={<Button variant="primary" label="Create New" icon={<PlusIcon />} size="sm" />}
            items={dropdownWithDescItems}
            width="min-w-[260px]"
            onSelect={(key) => alert(`Selected: ${key}`)}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — Grouped Headers</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <Dropdown
            trigger={<Button variant="secondary" label="More Options" size="sm" />}
            items={dropdownGroupedItems}
            onSelect={(key) => alert(`Selected: ${key}`)}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — Active & Disabled States</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <Dropdown
            trigger={<Button variant="success" label="Filter" icon={<SearchIcon />} size="sm" />}
            items={dropdownActiveItems}
            onSelect={(key) => alert(`Selected: ${key}`)}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — Scrollable (Long List)</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6">
          <Dropdown
            trigger={<Button variant="dark" label="Navigation" size="sm" />}
            items={dropdownLongItems}
            width="min-w-[220px]"
            maxHeight="max-h-64"
            onSelect={(key) => alert(`Selected: ${key}`)}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Dropdown — Icon Trigger</h2>
        <div className="flex flex-wrap items-start gap-8 ce-panel rounded-2xl border ce-divider p-6">
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Icon Button</p>
            <Dropdown
              trigger={<Button variant="primary" icon={<StarIcon />} iconOnly size="sm" />}
              items={dropdownBasicItems}
              placement="bottom-start"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Avatar Trigger</p>
            <Dropdown
              trigger={<Avatar src="https://i.pravatar.cc/150?img=10" size="md" status="online" />}
              items={dropdownBasicItems}
              placement="bottom-start"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
          <div>
            <p className="text-xs font-medium ce-muted mb-3">Badge Trigger</p>
            <Dropdown
              trigger={<Badge variant="primary" label="Menu" icon={<StarIcon />} />}
              items={dropdownBasicItems}
              placement="bottom-start"
              onSelect={(key) => alert(`Selected: ${key}`)}
            />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Panel Dropdown — User Profile</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6 min-h-[380px]">
          <PanelDropdown
            trigger={
              <div className="flex items-center gap-3 rounded-xl border ce-divider px-3 py-2 hover:ce-page transition-colors duration-200">
                <Avatar src="https://i.pravatar.cc/150?img=10" size="sm" status="online" />
                <div className="text-left">
                  <p className="text-sm font-medium ce-heading">Sarah Johnson</p>
                  <p className="text-xs ce-muted">admin@example.com</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 ce-muted" />
              </div>
            }
            placement="bottom-start"
            width="w-72"
            header={
              <div className="flex items-center gap-3">
                <Avatar src="https://i.pravatar.cc/150?img=10" size="lg" status="online" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold ce-heading truncate">Sarah Johnson</p>
                  <p className="text-xs ce-muted truncate">admin@example.com</p>
                  <div className="mt-1">
                    <Badge variant="success" label="Pro Plan" size="sm" />
                  </div>
                </div>
              </div>
            }
            footer={
              <button className="w-full text-center text-sm font-medium ce-danger-text hover:ce-danger-text transition-colors duration-200">
                Sign Out
              </button>
            }
          >
            <div className="py-1">
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm ce-text hover:ce-page transition-colors duration-100">
                <UserIcon className="w-4 h-4 ce-muted" />
                My Profile
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm ce-text hover:ce-page transition-colors duration-100">
                <SettingsIcon className="w-4 h-4 ce-muted" />
                Settings
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm ce-text hover:ce-page transition-colors duration-100">
                <FolderIcon className="w-4 h-4 ce-muted" />
                My Projects
              </button>
              <div className="my-1 border-t ce-divider" />
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm ce-text hover:ce-page transition-colors duration-100">
                <HelpCircleIcon className="w-4 h-4 ce-muted" />
                Help & Support
              </button>
            </div>
          </PanelDropdown>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold ce-subheading mb-4">Panel Dropdown — Notifications</h2>
        <div className="flex flex-wrap items-start gap-6 ce-panel rounded-2xl border ce-divider p-6 min-h-[420px]">
          <PanelDropdown
            trigger={
              <div className="relative">
                <Button variant="secondary" icon={<StarIcon />} iconOnly outline size="sm" />
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 ce-danger-bg text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  2
                </span>
              </div>
            }
            placement="bottom-end"
            width="w-80"
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold ce-heading">Notifications</h3>
                <Badge variant="danger" label="2 new" size="sm" pill />
              </div>
            }
            footer={
              <button className="w-full text-center text-sm font-medium auth-link transition-colors duration-200">
                View All Notifications
              </button>
            }
          >
            <div>
              {notificationItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-start gap-3 w-full px-4 py-3 hover:ce-page transition-colors duration-100 text-left ${!item.read ? "ce-icon-primary-bg/50" : ""}`}
                >
                  <Avatar src={item.avatar} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm ce-heading">
                      <span className="font-semibold">{item.name}</span>{" "}
                      <span className="ce-muted">{item.message}</span>
                    </p>
                    <p className="text-xs ce-muted mt-0.5">{item.time}</p>
                  </div>
                  {!item.read && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full ce-dot-primary mt-2" />
                  )}
                </button>
              ))}
            </div>
          </PanelDropdown>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Default</h2>
        <Carousel slides={imageSlides} indicator="dots" height="h-80" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Card Variant</h2>
        <Carousel slides={photoSlides} variant="card" indicator="bars" height="h-96" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Gradient Variant</h2>
        <Carousel slides={imageSlides} variant="gradient" indicator="numbers" height="h-80" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Minimal with Progress</h2>
        <Carousel slides={photoSlides} variant="minimal" indicator="progress" height="h-96" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Fade Animation + AutoPlay</h2>
        <Carousel slides={imageSlides} animation="fade" autoPlay autoPlayInterval={3000} indicator="dots" height="h-80" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Scale Animation</h2>
        <Carousel slides={photoSlides} animation="scale" variant="card" indicator="bars" height="h-96" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Carousel — Outside Arrows</h2>
        <Carousel slides={imageSlides} arrowStyle="outside" indicator="dots" height="h-80" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">CardCarousel</h2>
        <CardCarousel gap="md" peek>
          <MiniStatCard variant="primary" label="Revenue" value="$45,231" icon={<StarIcon />} change={12.5} />
          <MiniStatCard variant="success" label="Orders" value="1,234" icon={<DownloadIcon />} change={8.2} />
          <MiniStatCard variant="warning" label="Users" value="5,678" icon={<PlusIcon />} change={-3.1} />
          <MiniStatCard variant="danger" label="Bounce" value="24.5%" icon={<TrashIcon />} change={-5.4} />
          <MiniStatCard variant="info" label="Sessions" value="12,456" icon={<SearchIcon />} change={15.7} />
          <MiniStatCard variant="dark" label="Conversion" value="3.24%" icon={<StarIcon />} change={2.1} />
        </CardCarousel>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">CardCarousel — Large Gap</h2>
        <CardCarousel gap="lg">
          <GradientStatCard gradient="blue" title="Total Sales" value="$128,430" icon={<StarIcon />} change={18.2} />
          <GradientStatCard gradient="emerald" title="Revenue" value="$84,254" icon={<DownloadIcon />} change={12.5} />
          <GradientStatCard gradient="purple" title="Customers" value="2,456" icon={<PlusIcon />} change={6.8} />
          <GradientStatCard gradient="amber" title="Growth" value="+24.5%" icon={<TrashIcon />} change={-1.3} />
          <GradientStatCard gradient="rose" title="Profit" value="$32,100" icon={<SearchIcon />} change={9.4} />
        </CardCarousel>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Default</h2>
        <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Cinema Variant</h2>
        <VideoPlayer src={sampleVideoUrl2} poster={sampleVideoPoster2} variant="cinema" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Rounded Variant</h2>
        <VideoPlayer src={sampleVideoUrl3} poster={sampleVideoPoster3} variant="rounded" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Minimal</h2>
        <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} variant="minimal" showSpeedControl={false} showPip={false} />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Medium Size</h2>
        <VideoPlayer src={sampleVideoUrl2} poster={sampleVideoPoster2} size="md" variant="cinema" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Small Size</h2>
        <VideoPlayer src={sampleVideoUrl3} poster={sampleVideoPoster3} size="sm" variant="rounded" showSpeedControl={false} showPip={false} />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">VideoPlayer — Muted Autoplay Loop</h2>
        <VideoPlayer src={sampleVideoUrl} poster={sampleVideoPoster} size="md" autoPlay muted loop showPlayOverlay={false} />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Default (Horizontal)</h2>
        <Stepper steps={checkoutSteps} activeStep={stepperStep} onStepClick={setStepperStep} clickable />
        <div className="flex items-center gap-3 mt-6">
          <Button variant="secondary" size="sm" onClick={() => setStepperStep(Math.max(0, stepperStep - 1))} disabled={stepperStep === 0} label="Back" />
          <Button variant="primary" size="sm" onClick={() => setStepperStep(Math.min(checkoutSteps.length, stepperStep + 1))} label={stepperStep >= checkoutSteps.length - 1 ? "Finish" : "Next"} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Outlined Variant</h2>
        <Stepper steps={accountSteps} activeStep={2} variant="outlined" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Filled Variant</h2>
        <Stepper steps={projectSteps} activeStep={3} variant="filled" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Gradient Variant</h2>
        <Stepper steps={checkoutSteps} activeStep={2} variant="gradient" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Minimal Variant</h2>
        <Stepper steps={projectSteps} activeStep={2} variant="minimal" showStepNumbers={false} />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — With Error Step</h2>
        <Stepper steps={errorSteps} activeStep={1} variant="default" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Label Right</h2>
        <Stepper steps={checkoutSteps} activeStep={stepperStep2} labelPlacement="right" onStepClick={setStepperStep2} clickable variant="gradient" />
        <div className="flex items-center gap-3 mt-6">
          <Button variant="secondary" size="sm" onClick={() => setStepperStep2(Math.max(0, stepperStep2 - 1))} disabled={stepperStep2 === 0} label="Back" />
          <Button variant="primary" size="sm" onClick={() => setStepperStep2(Math.min(checkoutSteps.length, stepperStep2 + 1))} label={stepperStep2 >= checkoutSteps.length - 1 ? "Finish" : "Next"} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Alternate Labels</h2>
        <Stepper steps={accountSteps} activeStep={2} labelPlacement="alternate" variant="filled" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Vertical</h2>
        <Stepper steps={accountSteps} activeStep={2} orientation="vertical" variant="default" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Vertical Gradient</h2>
        <Stepper steps={checkoutSteps} activeStep={1} orientation="vertical" variant="gradient" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Small Size</h2>
        <Stepper steps={projectSteps} activeStep={3} size="sm" variant="filled" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Stepper — Large Size</h2>
        <Stepper steps={checkoutSteps} activeStep={1} size="lg" variant="gradient" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Line (Default)</h2>
        <Tabs tabs={profileTabs} defaultTab="overview" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Pills</h2>
        <Tabs tabs={profileTabs} defaultTab="overview" variant="pills" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Line Full Width</h2>
        <Tabs tabs={projectTabs} defaultTab="all" fullWidth />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Pills Full Width</h2>
        <Tabs tabs={projectTabs} defaultTab="all" variant="pills" fullWidth />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Line with Content</h2>
        <Tabs tabs={settingsTabs} defaultTab="general" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Pills with Content</h2>
        <Tabs tabs={settingsTabs} defaultTab="general" variant="pills" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Success Color</h2>
        <Tabs tabs={profileTabs} defaultTab="overview" color="success" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Danger Pills</h2>
        <Tabs tabs={profileTabs} defaultTab="activity" variant="pills" color="danger" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Dark Color</h2>
        <Tabs tabs={profileTabs} defaultTab="settings" color="dark" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Small Size</h2>
        <Tabs tabs={projectTabs} defaultTab="all" size="sm" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Tabs — Large Pills</h2>
        <Tabs tabs={projectTabs} defaultTab="active" variant="pills" size="lg" color="info" />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — Basic Types</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => showToast("This is a default toast")}>
            Default
          </Button>
          <Button variant="success" onClick={() => showSuccess("Operation completed successfully!")}>
            Success
          </Button>
          <Button variant="danger" onClick={() => showError("Something went wrong!")}>
            Error
          </Button>
          <Button variant="info" onClick={() => showInfo("Here is some useful information")}>
            Info
          </Button>
          <Button variant="warning" onClick={() => showWarning("Please be careful with this action")}>
            Warning
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — With Description</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="success"
            onClick={() =>
              showSuccess("File uploaded", {
                description: "Your file has been uploaded and processed successfully.",
              })
            }
          >
            Success with Description
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showError("Upload failed", {
                description: "The file size exceeds the maximum limit of 10MB.",
              })
            }
          >
            Error with Description
          </Button>
          <Button
            variant="info"
            onClick={() =>
              showInfo("New update available", {
                description: "Version 2.4.0 is ready to install. Restart to apply changes.",
              })
            }
          >
            Info with Description
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — With Action Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showAction(
                "Message archived",
                "Undo",
                () => showSuccess("Message restored"),
              )
            }
          >
            With Undo Action
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showAction(
                "3 items deleted",
                "Undo",
                () => showSuccess("Items restored successfully"),
                { description: "These items have been moved to trash." }
              )
            }
          >
            Delete with Undo
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — Loading & Promise</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              const id = showLoading("Uploading file...");
              setTimeout(() => {
                dismissToast(id);
                showSuccess("File uploaded successfully!");
              }, 2500);
            }}
          >
            Loading Toast
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showPromise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                  loading: "Saving changes...",
                  success: "All changes saved!",
                  error: "Failed to save changes",
                }
              )
            }
          >
            Promise Toast
          </Button>
          <Button
            variant="info"
            onClick={() =>
              showPromise(
                new Promise((_resolve, reject) => setTimeout(reject, 2000)),
                {
                  loading: "Sending email...",
                  success: "Email sent!",
                  error: "Failed to send email. Please try again.",
                }
              )
            }
          >
            Promise Error Toast
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — Custom Duration & Position</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => showSuccess("This stays for 10 seconds", { duration: 10000 })}
          >
            Long Duration (10s)
          </Button>
          <Button
            variant="secondary"
            onClick={() => showInfo("This disappears quickly", { duration: 1500 })}
          >
            Short Duration (1.5s)
          </Button>
          <Button
            variant="dark"
            onClick={() => showInfo("Persistent toast — close manually", { duration: Infinity })}
          >
            Persistent Toast
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — Custom with Icon</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="warning"
            onClick={() =>
              showCustom(
                "New star received!",
                "Someone starred your repository.",
                <StarIcon className="w-5 h-5 ce-warning-text" />
              )
            }
          >
            Star Icon Toast
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showCustom(
                "Download complete",
                "Your file is ready in the downloads folder.",
                <DownloadIcon className="w-5 h-5 ce-link" />
              )
            }
          >
            Download Icon Toast
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Toast — Dismiss All</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              showSuccess("Toast 1");
              setTimeout(() => showInfo("Toast 2"), 200);
              setTimeout(() => showWarning("Toast 3"), 400);
            }}
          >
            Show Multiple Toasts
          </Button>
          <Button variant="danger" onClick={() => dismissToast()}>
            Dismiss All
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Default</h2>
        <FileUpload
          label="Upload Files"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Minimal Variant</h2>
        <FileUpload
          variant="minimal"
          label="Attachments"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Bordered Variant</h2>
        <FileUpload
          variant="bordered"
          label="Documents"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Filled Variant</h2>
        <FileUpload
          variant="filled"
          label="Media Files"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Images Only</h2>
        <FileUpload
          label="Profile Picture"
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
          maxFiles={1}
          multiple={false}
          description="Upload a profile picture (PNG, JPG, GIF, WebP)"
          maxSize={5 * 1024 * 1024}
          onChange={(files) => console.log("Image:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — PDF Documents</h2>
        <FileUpload
          variant="bordered"
          label="Upload Documents"
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={5}
          maxSize={20 * 1024 * 1024}
          description="Upload PDF documents (max 5 files, 20MB each)"
          onChange={(files) => console.log("PDFs:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Small Size</h2>
        <FileUpload
          size="sm"
          label="Quick Upload"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Large Size</h2>
        <FileUpload
          size="lg"
          variant="filled"
          label="Drag & Drop Zone"
          description="Drag your files here or click to browse"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — No Preview</h2>
        <FileUpload
          label="Code Files"
          showPreview={false}
          accept={{
            "text/*": [".txt", ".csv", ".json"],
            "application/json": [".json"],
          }}
          description="Upload text or JSON files"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — With Error</h2>
        <FileUpload
          label="Required Document"
          error="Please upload at least one file"
          onChange={(files) => console.log("Files:", files)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">File Upload — Disabled</h2>
        <FileUpload
          label="Locked Upload"
          disabled
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Line Chart — Revenue Trend</h2>
        <LineChart
          labels={monthLabels}
          datasets={revenueDatasets}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Line Chart — Multi-line (Device Traffic)</h2>
        <LineChart
          labels={monthLabels}
          datasets={multiLineDatasets}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Bar Chart — Monthly Sales</h2>
        <BarChart
          labels={monthLabels}
          datasets={salesBarDatasets}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Bar Chart — Year Comparison</h2>
        <BarChart
          labels={monthLabels}
          datasets={comparisonBarDatasets}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Bar Chart — Stacked</h2>
        <BarChart
          labels={monthLabels}
          datasets={stackedBarDatasets}
          stacked
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Bar Chart — Horizontal</h2>
        <BarChart
          labels={horizontalBarLabels}
          datasets={horizontalBarDatasets}
          horizontal
          showLegend={false}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Pie Chart — Traffic Sources</h2>
        <div className="max-w-lg mx-auto">
          <PieChart
            labels={pieLabels}
            data={pieData}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Doughnut Chart — Device Breakdown</h2>
        <div className="max-w-lg mx-auto">
          <DoughnutChart
            labels={doughnutLabels}
            data={doughnutData}
            centerText="45%"
            centerSubText="Desktop"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Doughnut Chart — No Center Text</h2>
        <div className="max-w-lg mx-auto">
          <DoughnutChart
            labels={pieLabels}
            data={pieData}
            legendPosition="bottom"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Area Chart — Traffic Overview</h2>
        <AreaChart
          labels={monthLabels}
          datasets={trafficAreaDatasets}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Area Chart — Stacked Languages</h2>
        <AreaChart
          labels={monthLabels}
          datasets={stackedAreaDatasets}
          stacked
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Radar Chart — Product Comparison</h2>
        <div className="max-w-xl mx-auto">
          <RadarChart
            labels={radarLabels}
            datasets={radarDatasets}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Radar Chart — Skills Assessment</h2>
        <div className="max-w-xl mx-auto">
          <RadarChart
            labels={skillRadarLabels}
            datasets={skillRadarDatasets}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Polar Area Chart — Project Time</h2>
        <div className="max-w-lg mx-auto">
          <PolarAreaChart
            labels={polarLabels}
            data={polarData}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Info</h2>
        <Button variant="info" onClick={() => setAlertInfo(true)}>Show Info Alert</Button>
        <AlertModal
          open={alertInfo}
          onClose={() => setAlertInfo(false)}
          type="info"
          message="Your account settings have been updated. Changes will take effect immediately."
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Success</h2>
        <Button variant="success" onClick={() => setAlertSuccess(true)}>Show Success Alert</Button>
        <AlertModal
          open={alertSuccess}
          onClose={() => setAlertSuccess(false)}
          type="success"
          title="Payment Successful!"
          message="Your payment of $49.99 has been processed. A receipt has been sent to your email."
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Warning</h2>
        <Button variant="warning" onClick={() => setAlertWarning(true)}>Show Warning Alert</Button>
        <AlertModal
          open={alertWarning}
          onClose={() => setAlertWarning(false)}
          type="warning"
          title="Unsaved Changes"
          message="You have unsaved changes that will be lost if you leave this page. Are you sure you want to continue?"
          onConfirm={() => setAlertWarning(false)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Danger / Error</h2>
        <Button variant="danger" onClick={() => setAlertDanger(true)}>Show Error Alert</Button>
        <AlertModal
          open={alertDanger}
          onClose={() => setAlertDanger(false)}
          type="danger"
          title="Connection Failed"
          message="Unable to connect to the server. Please check your internet connection and try again."
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Confirm Action</h2>
        <Button variant="primary" onClick={() => setAlertConfirm(true)}>Publish Article</Button>
        <AlertModal
          open={alertConfirm}
          onClose={() => setAlertConfirm(false)}
          type="confirm"
          title="Publish Article?"
          message="This will make your article visible to all users. You can unpublish it later from the dashboard."
          confirmText="Yes, Publish"
          onConfirm={() => setAlertConfirm(false)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Delete Confirmation</h2>
        <Button variant="danger" onClick={() => setAlertDelete(true)}>Delete Account</Button>
        <AlertModal
          open={alertDelete}
          onClose={() => setAlertDelete(false)}
          type="delete"
          title="Delete Account?"
          message="This action is permanent and cannot be undone. All your data, projects, and settings will be permanently removed."
          confirmText="Yes, Delete"
          cancelText="Keep Account"
          onConfirm={() => setAlertDelete(false)}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — With Loading</h2>
        <Button variant="danger" onClick={() => { setAlertLoading(true); setDeleteLoading(false); }}>Delete with Loading</Button>
        <AlertModal
          open={alertLoading}
          onClose={() => setAlertLoading(false)}
          type="delete"
          title="Delete Project?"
          message="This will permanently delete the project and all associated files."
          confirmText="Delete Project"
          loading={deleteLoading}
          onConfirm={() => {
            setDeleteLoading(true);
            setTimeout(() => {
              setDeleteLoading(false);
              setAlertLoading(false);
            }, 2000);
          }}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Alert Modal — Custom Content</h2>
        <Button variant="dark" onClick={() => setAlertCustom(true)}>Show Custom Alert</Button>
        <AlertModal
          open={alertCustom}
          onClose={() => setAlertCustom(false)}
          type="warning"
          title="Storage Almost Full"
          message="You've used 90% of your storage quota."
          confirmText="Upgrade Plan"
          onConfirm={() => setAlertCustom(false)}
        >
          <div className="w-full ce-panel rounded-full h-3 mt-2 mb-1">
            <div className="ce-warning-bg h-3 rounded-full" style={{ width: "90%" }} />
          </div>
          <p className="text-xs ce-muted">4.5 GB of 5 GB used</p>
        </AlertModal>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Form Modal — Add User</h2>
        <Button variant="primary" icon={<PlusIcon className="w-4 h-4" />} onClick={() => { setFormName(""); setFormEmail(""); setFormRole(""); setFormBio(""); setAddUserModal(true); }}>
          Add New User
        </Button>
        <FormModal
          open={addUserModal}
          onClose={() => setAddUserModal(false)}
          title="Add New User"
          subtitle="Fill in the details to create a new user account"
          submitText="Create User"
          loading={addUserLoading}
          icon={
            <UserIcon className="w-5 h-5" />
          }
          onSubmit={() => {
            setAddUserLoading(true);
            setTimeout(() => {
              setAddUserLoading(false);
              setAddUserModal(false);
            }, 1500);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Full Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Email Address</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Role</label>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all ce-panel"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Bio</label>
              <textarea
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                placeholder="Write a short bio..."
                rows={3}
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-user"
                checked={formNotify}
                onChange={(e) => setFormNotify(e.target.checked)}
                className="w-4 h-4 ce-link rounded ce-divider ce-focus-ring"
              />
              <label htmlFor="notify-user" className="text-sm ce-text">Send welcome email notification</label>
            </div>
          </div>
        </FormModal>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Form Modal — Edit User</h2>
        <Button variant="secondary" onClick={() => { setFormName("Ahmed Al-Shatub"); setFormEmail("ahmed@example.com"); setFormRole("admin"); setFormBio("Senior developer with 8 years of experience."); setEditUserModal(true); }}>
          Edit User
        </Button>
        <FormModal
          open={editUserModal}
          onClose={() => setEditUserModal(false)}
          title="Edit User"
          subtitle="Update the user's profile information"
          submitText="Save Changes"
          submitVariant="success"
          icon={
            <EditIcon className="w-5 h-5" />
          }
          onSubmit={() => setEditUserModal(false)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 ce-page rounded-xl mb-2">
              <div className="w-14 h-14 rounded-full ce-icon-primary-bg flex items-center justify-center ce-link font-bold text-lg flex-shrink-0">
                {formName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold ce-subheading">{formName}</p>
                <p className="text-xs ce-muted">{formEmail}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ce-text mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium ce-text mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Role</label>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all ce-panel"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium ce-text mb-1.5">Bio</label>
              <textarea
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </FormModal>
      </section>

      <section>
        <h2 className="text-2xl font-bold ce-heading mb-6">Form Modal — Settings</h2>
        <Button variant="dark" onClick={() => setSettingsModal(true)}>
          Open Settings
        </Button>
        <FormModal
          open={settingsModal}
          onClose={() => setSettingsModal(false)}
          title="Project Settings"
          subtitle="Manage your project configuration"
          size="xl"
          submitText="Apply Settings"
          submitVariant="dark"
          icon={
            <SettingsIcon className="w-5 h-5" />
          }
          footerExtra={<p className="text-xs ce-muted">Last updated 2 hours ago</p>}
          onSubmit={() => setSettingsModal(false)}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold ce-subheading mb-3">General</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium ce-text mb-1.5">Project Name</label>
                  <input
                    type="text"
                    defaultValue="My Awesome Project"
                    className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium ce-text mb-1.5">Project URL</label>
                  <input
                    type="text"
                    defaultValue="my-awesome-project"
                    className="w-full px-3 py-2.5 text-sm border ce-divider rounded-lg focus:outline-none focus:ring-2 ce-focus-ring focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="h-px ce-panel" />
            <div>
              <h4 className="text-sm font-semibold ce-subheading mb-3">Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 ce-page rounded-lg cursor-pointer hover:ce-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium ce-text">Email Notifications</p>
                    <p className="text-xs ce-muted">Receive updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 ce-link rounded ce-divider ce-focus-ring" />
                </label>
                <label className="flex items-center justify-between p-3 ce-page rounded-lg cursor-pointer hover:ce-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium ce-text">Push Notifications</p>
                    <p className="text-xs ce-muted">Browser push notifications</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 ce-link rounded ce-divider ce-focus-ring" />
                </label>
                <label className="flex items-center justify-between p-3 ce-page rounded-lg cursor-pointer hover:ce-panel transition-colors">
                  <div>
                    <p className="text-sm font-medium ce-text">Weekly Digest</p>
                    <p className="text-xs ce-muted">Summary of weekly activity</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 ce-link rounded ce-divider ce-focus-ring" />
                </label>
              </div>
            </div>
            <div className="h-px ce-panel" />
            <div>
              <h4 className="text-sm font-semibold ce-subheading mb-3">Danger Zone</h4>
              <div className="p-4 border ce-danger-border rounded-lg ce-danger-light-bg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium ce-danger-text">Delete Project</p>
                    <p className="text-xs ce-danger-text">This action is irreversible</p>
                  </div>
                  <button type="button" className="px-3 py-1.5 text-xs font-semibold ce-danger-text border ce-danger-border rounded-lg hover:ce-panel transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FormModal>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Drawer</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Positions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setDrawerRight(true)}>Right Drawer</Button>
            <Button variant="secondary" onClick={() => setDrawerLeft(true)}>Left Drawer</Button>
            <Button variant="info" onClick={() => setDrawerTop(true)}>Top Drawer</Button>
            <Button variant="warning" onClick={() => setDrawerBottom(true)}>Bottom Drawer</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={() => setDrawerSm(true)}>Small</Button>
            <Button variant="primary" onClick={() => setDrawerLg(true)}>Large</Button>
            <Button variant="primary" onClick={() => setDrawerXl(true)}>Extra Large</Button>
            <Button variant="primary" onClick={() => setDrawerFull(true)}>Full Width</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Footer & Options</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="success" onClick={() => setDrawerWithFooter(true)}>With Footer</Button>
            <Button variant="dark" onClick={() => setDrawerNoDivider(true)}>No Dividers</Button>
          </div>
        </div>

        <Drawer open={drawerRight} onClose={() => setDrawerRight(false)} title="Right Drawer" subtitle="Default position">
          <div className="space-y-4">
            <p className="text-sm ce-text">This is a right-positioned drawer, which is the default. It slides in from the right side of the screen.</p>
            <div className="p-4 ce-icon-primary-bg rounded-lg">
              <p className="text-sm font-medium ce-heading">Drawer Content</p>
              <p className="text-xs ce-link mt-1">You can place any content inside the drawer body.</p>
            </div>
          </div>
        </Drawer>

        <Drawer open={drawerLeft} onClose={() => setDrawerLeft(false)} position="left" title="Left Drawer" subtitle="Navigation style">
          <div className="space-y-3">
            {["Dashboard", "Profile", "Settings", "Reports", "Analytics"].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-lg hover:ce-panel cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full ce-panel flex items-center justify-center text-xs font-medium ce-text">{item[0]}</div>
                <span className="text-sm font-medium ce-text">{item}</span>
              </div>
            ))}
          </div>
        </Drawer>

        <Drawer open={drawerTop} onClose={() => setDrawerTop(false)} position="top" size="sm" title="Top Drawer">
          <p className="text-sm ce-text">This drawer slides down from the top of the screen.</p>
        </Drawer>

        <Drawer open={drawerBottom} onClose={() => setDrawerBottom(false)} position="bottom" size="md" title="Bottom Drawer">
          <div className="space-y-3">
            <p className="text-sm ce-text">This drawer slides up from the bottom, great for mobile-style sheets.</p>
            <div className="grid grid-cols-3 gap-3">
              {["Share", "Copy", "Edit", "Delete", "Archive", "Export"].map((action) => (
                <button key={action} type="button" className="p-3 text-sm font-medium ce-text ce-page rounded-lg hover:ce-panel transition-colors">{action}</button>
              ))}
            </div>
          </div>
        </Drawer>

        <Drawer open={drawerSm} onClose={() => setDrawerSm(false)} size="sm" title="Small Drawer">
          <p className="text-sm ce-text">A compact drawer for simple actions.</p>
        </Drawer>

        <Drawer open={drawerLg} onClose={() => setDrawerLg(false)} size="lg" title="Large Drawer" subtitle="More space for content">
          <div className="space-y-4">
            <p className="text-sm ce-text">This drawer has more room for detailed content and forms.</p>
            <div className="space-y-3">
              <Input label="Full Name" placeholder="Enter your name" />
              <Input label="Email" placeholder="Enter your email" />
              <TextArea label="Message" placeholder="Type your message here..." />
            </div>
          </div>
        </Drawer>

        <Drawer open={drawerXl} onClose={() => setDrawerXl(false)} size="xl" title="Extra Large Drawer">
          <p className="text-sm ce-text">Extra large drawer for complex layouts and data displays.</p>
        </Drawer>

        <Drawer open={drawerFull} onClose={() => setDrawerFull(false)} size="full" title="Full Width Drawer">
          <p className="text-sm ce-text">This drawer takes the full width of the screen.</p>
        </Drawer>

        <Drawer
          open={drawerWithFooter}
          onClose={() => setDrawerWithFooter(false)}
          title="Edit Profile"
          subtitle="Update your personal information"
          icon={<UserIcon width="18" height="18" />}
          footer={
            <div className="flex gap-3">
              <Button variant="light" onClick={() => setDrawerWithFooter(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDrawerWithFooter(false)}>Save Changes</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Input label="Display Name" placeholder="Your name" />
            <Input label="Email" placeholder="your@email.com" />
            <TextArea label="Bio" placeholder="Tell us about yourself..." />
          </div>
        </Drawer>

        <Drawer
          open={drawerNoDivider}
          onClose={() => setDrawerNoDivider(false)}
          title="No Dividers"
          showDivider={false}
        >
          <p className="text-sm ce-text">This drawer has no dividers between header, body, and footer sections for a cleaner look.</p>
        </Drawer>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Accordion</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <Accordion items={accordionBasicItems} defaultOpen={["1"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Multiple Expand</h3>
          <Accordion items={accordionBasicItems} multiple defaultOpen={["1", "3"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Bordered</h3>
          <Accordion items={accordionBasicItems} variant="bordered" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Filled</h3>
          <Accordion items={accordionBasicItems} variant="filled" defaultOpen={["2"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Separated</h3>
          <Accordion items={accordionBasicItems} variant="separated" defaultOpen={["1"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Icon Left</h3>
          <Accordion items={accordionBasicItems} iconPosition="left" variant="bordered" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Icons & Disabled</h3>
          <Accordion items={accordionIconItems} variant="separated" defaultOpen={["a1"]} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Timeline</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default (Left)</h3>
          <Timeline items={timelineBasicItems} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Right Layout</h3>
          <Timeline items={timelineBasicItems} layout="right" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Alternate Layout</h3>
          <Timeline items={timelineBasicItems} layout="alternate" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Icons</h3>
          <Timeline items={timelineIconItems} variant="filled" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Outlined Variant</h3>
          <Timeline items={timelineIconItems} variant="outlined" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Single Color</h3>
          <Timeline items={timelineBasicItems} color="success" variant="filled" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Alternate with Icons</h3>
          <Timeline items={timelineIconItems} layout="alternate" variant="filled" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">No Animation</h3>
          <Timeline items={timelineBasicItems} animated={false} color="dark" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">No Connector</h3>
          <Timeline items={timelineBasicItems.slice(0, 3)} showConnector={false} variant="filled" />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Tree View</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default with Icons</h3>
          <div className="max-w-md border ce-divider rounded-lg p-3">
            <TreeView data={treeViewData} defaultExpanded={["src", "components"]} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Selectable</h3>
          <div className="max-w-md border ce-divider rounded-lg p-3">
            <TreeView data={treeViewData} selectable defaultExpanded={["src"]} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Checkable with Lines</h3>
          <div className="max-w-md border ce-divider rounded-lg p-3">
            <TreeView data={treeViewData} checkable showLines defaultExpanded={["src", "components", "pages"]} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Multi-Select without Icons</h3>
          <div className="max-w-md border ce-divider rounded-lg p-3">
            <TreeView data={treeViewData} selectable multiSelect showIcons={false} defaultExpanded={["src"]} />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Org Chart</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default (Vertical)</h3>
          <div className="border ce-divider rounded-lg overflow-auto">
            <OrgChart data={orgData} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Bordered</h3>
          <div className="border ce-divider rounded-lg overflow-auto">
            <OrgChart data={orgData} variant="bordered" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Filled</h3>
          <div className="border ce-divider rounded-lg overflow-auto">
            <OrgChart data={orgData} variant="filled" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Compact</h3>
          <div className="border ce-divider rounded-lg overflow-auto">
            <OrgChart data={orgData} variant="compact" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Horizontal</h3>
          <div className="border ce-divider rounded-lg overflow-auto">
            <OrgChart data={orgData} horizontal />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Calendar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
            <Calendar
              value={calendarDate || undefined}
              onChange={setCalendarDate}
              events={calendarEvents}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Bordered</h3>
            <Calendar variant="bordered" events={calendarEvents} />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Filled</h3>
            <Calendar variant="filled" events={calendarEvents} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Min/Max Dates</h3>
          <Calendar
            minDate={new Date(2026, 2, 5)}
            maxDate={new Date(2026, 2, 25)}
            events={calendarEvents}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Knob</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap items-end gap-8">
            <Knob size="sm" value={knobVal1} onChange={setKnobVal1} label="Small" />
            <Knob size="md" value={knobVal1} onChange={setKnobVal1} label="Medium" />
            <Knob size="lg" value={knobVal1} onChange={setKnobVal1} label="Large" />
            <Knob size="xl" value={knobVal1} onChange={setKnobVal1} label="Extra Large" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Colors</h3>
          <div className="flex flex-wrap items-end gap-8">
            <Knob color="primary" value={65} label="Primary" readOnly />
            <Knob color="success" value={80} label="Success" readOnly />
            <Knob color="warning" value={45} label="Warning" readOnly />
            <Knob color="danger" value={30} label="Danger" readOnly />
            <Knob color="info" value={70} label="Info" readOnly />
            <Knob color="dark" value={55} label="Dark" readOnly />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Interactive</h3>
          <div className="flex flex-wrap items-end gap-8">
            <Knob
              value={knobVal2}
              onChange={setKnobVal2}
              color="success"
              size="lg"
              label="Volume"
              valueTemplate={(v) => `${Math.round(v)}%`}
            />
            <Knob
              value={knobVal3}
              onChange={setKnobVal3}
              color="danger"
              size="lg"
              min={0}
              max={360}
              step={5}
              label="Angle"
              valueTemplate={(v) => `${Math.round(v)}°`}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled & Read Only</h3>
          <div className="flex flex-wrap items-end gap-8">
            <Knob value={50} disabled label="Disabled" />
            <Knob value={75} readOnly color="info" label="Read Only" />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Slider</h2>

        <div className="max-w-lg space-y-6">
          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
            <Slider value={sliderVal} onChange={setSliderVal} label="Brightness" showValue />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Colors</h3>
            <div className="space-y-4">
              <Slider defaultValue={60} color="primary" label="Primary" showValue />
              <Slider defaultValue={45} color="success" label="Success" showValue />
              <Slider defaultValue={75} color="warning" label="Warning" showValue />
              <Slider defaultValue={30} color="danger" label="Danger" showValue />
              <Slider defaultValue={55} color="info" label="Info" showValue />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
            <div className="space-y-4">
              <Slider defaultValue={40} size="sm" label="Small" showValue />
              <Slider defaultValue={60} size="md" label="Medium" showValue />
              <Slider defaultValue={80} size="lg" label="Large" showValue />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">With Ticks</h3>
            <Slider
              defaultValue={50}
              min={0}
              max={100}
              step={25}
              showTicks
              tickCount={5}
              showValue
              label="Volume"
              valueTemplate={(v) => `${Math.round(v)}%`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Step Slider</h3>
            <Slider
              defaultValue={20}
              min={0}
              max={100}
              step={10}
              color="success"
              showValue
              label="Progress"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Range Slider</h3>
            <RangeSlider
              value={rangeVal}
              onChange={setRangeVal}
              label="Price Range"
              showValue
              color="primary"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled</h3>
            <Slider defaultValue={50} disabled label="Disabled" showValue />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Tree Select</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <TreeSelect
            options={treeSelectOptions}
            label="Single Select"
            placeholder="Choose a category..."
            searchable
          />

          <TreeSelect
            options={treeSelectOptions}
            label="Multiple Select"
            mode="multiple"
            placeholder="Choose categories..."
            searchable
          />

          <TreeSelect
            options={treeSelectOptions}
            label="Checkbox Mode"
            mode="checkbox"
            placeholder="Select items..."
            searchable
          />

          <TreeSelect
            options={treeSelectOptions}
            label="With Error"
            error
            errorMessage="Please select at least one option"
            placeholder="Required field..."
          />

          <TreeSelect
            options={treeSelectOptions}
            label="Disabled"
            disabled
            placeholder="Cannot select..."
          />

          <TreeSelect
            options={treeSelectOptions}
            label="Pre-selected"
            mode="checkbox"
            defaultValue={["iphone", "samsung"]}
            searchable
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Tree Table</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <TreeTable
            data={treeTableData}
            columns={treeTableColumns}
            defaultExpanded={["f1", "f1-1"]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Selectable & Bordered</h3>
          <TreeTable
            data={treeTableData}
            columns={treeTableColumns}
            selectable
            bordered
            defaultExpanded={["f1"]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Striped & Compact</h3>
          <TreeTable
            data={treeTableData}
            columns={treeTableColumns}
            striped
            compact
            defaultExpanded={["f1", "f1-1", "f1-2", "f2"]}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Toolbar</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Text Editor Toolbar</h3>
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
              { id: "undo", icon: <Undo2Icon />, tooltip: "Undo" },
              { id: "redo", icon: <RefreshCwIcon />, tooltip: "Redo" },
            ] satisfies ToolbarEntry[]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Variants</h3>
          <div className="space-y-4">
            {(["default", "bordered", "filled", "floating"] as const).map((v) => (
              <div key={v}>
                <span className="text-sm ce-muted mb-2 block capitalize">{v}</span>
                <Toolbar
                  variant={v}
                  items={[
                    { id: `${v}-b`, icon: <BoldIcon />, tooltip: "Bold" },
                    { id: `${v}-i`, icon: <ItalicIcon />, tooltip: "Italic" },
                    { id: `${v}-u`, icon: <UnderlineIcon />, tooltip: "Underline" },
                    { id: `${v}-d`, type: "divider" as const },
                    { id: `${v}-link`, icon: <LinkIcon />, tooltip: "Link" },
                    { id: `${v}-img`, icon: <ImageIcon />, tooltip: "Image" },
                  ] satisfies ToolbarEntry[]}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="space-y-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s}>
                <span className="text-sm ce-muted mb-2 block capitalize">{s}</span>
                <Toolbar
                  size={s}
                  items={[
                    { id: `${s}-b`, icon: <BoldIcon />, label: "Bold" },
                    { id: `${s}-i`, icon: <ItalicIcon />, label: "Italic" },
                    { id: `${s}-d`, type: "divider" as const },
                    { id: `${s}-undo`, icon: <Undo2Icon />, label: "Undo" },
                    { id: `${s}-redo`, icon: <RefreshCwIcon />, label: "Redo" },
                  ] satisfies ToolbarEntry[]}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Vertical</h3>
          <Toolbar
            vertical
            variant="floating"
            items={[
              { id: "vb", icon: <BoldIcon />, tooltip: "Bold" },
              { id: "vi", icon: <ItalicIcon />, tooltip: "Italic" },
              { id: "vu", icon: <UnderlineIcon />, tooltip: "Underline" },
              { id: "vd", type: "divider" as const },
              { id: "vlink", icon: <LinkIcon />, tooltip: "Link" },
              { id: "vimg", icon: <ImageIcon />, tooltip: "Image" },
            ] satisfies ToolbarEntry[]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Disabled Items</h3>
          <Toolbar
            items={[
              { id: "db", icon: <BoldIcon />, tooltip: "Bold" },
              { id: "di", icon: <ItalicIcon />, tooltip: "Italic" },
              { id: "dd", type: "divider" as const },
              { id: "dundo", icon: <Undo2Icon />, tooltip: "Undo", disabled: true },
              { id: "dredo", icon: <RefreshCwIcon />, tooltip: "Redo", disabled: true },
            ] satisfies ToolbarEntry[]}
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Message</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <div className="space-y-3">
            <Message variant="info">This is an informational message for your reference.</Message>
            <Message variant="success">Operation completed successfully!</Message>
            <Message variant="warning">Please review your settings before proceeding.</Message>
            <Message variant="danger">An error occurred while processing your request.</Message>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Title</h3>
          <div className="space-y-3">
            <Message variant="info" title="Did you know?">You can customize your dashboard layout by dragging and dropping widgets.</Message>
            <Message variant="success" title="Payment Received">Your payment of $49.99 has been successfully processed and a receipt has been sent to your email.</Message>
            <Message variant="warning" title="Storage Almost Full">You have used 90% of your storage quota. Consider upgrading your plan or removing unused files.</Message>
            <Message variant="danger" title="Connection Lost">Unable to connect to the server. Please check your internet connection and try again.</Message>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Closable</h3>
          <div className="space-y-3">
            <Message variant="info" title="Tip" closable>Click the close button to dismiss this message.</Message>
            <Message variant="success" closable>Your profile has been updated.</Message>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Bordered</h3>
          <div className="space-y-3">
            <Message variant="info" bordered title="Note">This message uses a left border accent style.</Message>
            <Message variant="success" bordered>File uploaded and processed.</Message>
            <Message variant="warning" bordered title="Caution">This action cannot be undone.</Message>
            <Message variant="danger" bordered>Authentication failed. Please login again.</Message>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Filled</h3>
          <div className="space-y-3">
            <Message variant="info" filled title="System Update">A new version is available. Please update to get the latest features.</Message>
            <Message variant="success" filled>All tests passed successfully!</Message>
            <Message variant="warning" filled>Your trial expires in 3 days.</Message>
            <Message variant="danger" filled title="Critical Error">Database connection failed. Contact support immediately.</Message>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Without Icon</h3>
          <Message variant="info" showIcon={false}>A simple message without an icon for a clean look.</Message>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Filled + Closable</h3>
          <div className="space-y-3">
            <Message variant="info" filled closable title="Reminder">Don't forget to save your changes before leaving this page.</Message>
            <Message variant="danger" filled closable>Session expired. Please re-authenticate.</Message>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VIEW CARD
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">View Card</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default — Vertical</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ViewCard
              title="Project Alpha"
              subtitle="Web Application"
              description="A modern web application built with React and TypeScript for enterprise clients."
              image="https://picsum.photos/seed/vc1/400/250"
              status={{ label: "Active", color: "success" }}
              actions={[
                { key: "view", label: "View", variant: "primary", onClick: () => alert("View") },
                { key: "edit", label: "Edit", variant: "secondary", onClick: () => alert("Edit") },
              ]}
              metadata={[
                { label: "Team", value: "Frontend" },
                { label: "Due", value: "Mar 2026" },
              ]}
            />
            <ViewCard
              title="Design System"
              subtitle="UI Kit"
              description="Comprehensive design system with 100+ components and tokens."
              image="https://picsum.photos/seed/vc2/400/250"
              status={{ label: "In Progress", color: "warning" }}
              variant="bordered"
              actions={[
                { key: "open", label: "Open", variant: "primary", onClick: () => alert("Open") },
              ]}
            />
            <ViewCard
              title="Analytics Dashboard"
              subtitle="Data Visualization"
              description="Real-time analytics dashboard with charts and reports."
              image="https://picsum.photos/seed/vc3/400/250"
              status={{ label: "Completed", color: "info" }}
              variant="elevated"
              badge={<span className="text-xs ce-icon-primary-bg ce-link px-2 py-0.5 rounded-full">New</span>}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Horizontal Shape</h3>
          <div className="space-y-4">
            <ViewCard
              shape="horizontal"
              title="Team Meeting Notes"
              subtitle="Weekly Standup"
              description="Discussion of sprint progress and blockers."
              image="https://picsum.photos/seed/vc4/400/300"
              variant="bordered"
              metadata={[
                { label: "Date", value: "Mar 10, 2026" },
                { label: "Attendees", value: "8" },
              ]}
              actions={[
                { key: "read", label: "Read More", variant: "primary", onClick: () => alert("Read") },
              ]}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Square Shape — Filled Variant</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <ViewCard shape="square" variant="filled" title="Users" subtitle="1,234" icon={<StarIcon />} />
            <ViewCard shape="square" variant="filled" title="Revenue" subtitle="$45.2K" icon={<DownloadIcon />} />
            <ViewCard shape="square" variant="filled" title="Orders" subtitle="892" icon={<PlusIcon />} />
            <ViewCard shape="square" variant="filled" title="Growth" subtitle="+12.5%" icon={<SearchIcon />} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Animated</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ViewCard
              title="Hover Me"
              subtitle="Animated Card"
              description="This card has a subtle hover animation effect."
              variant="elevated"
              animated
              actions={[{ key: "go", label: "Go", variant: "primary" }]}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LOADER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Loader</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Variants</h3>
          <div className="flex flex-wrap items-center gap-8">
            <Loader variant="spinner" label="Spinner" />
            <Loader variant="dots" label="Dots" />
            <Loader variant="pulse" label="Pulse" />
            <Loader variant="bars" label="Bars" />
            <Loader variant="ring" label="Ring" />
            <Loader variant="bounce" label="Bounce" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap items-end gap-8">
            <Loader size="xs" label="XS" />
            <Loader size="sm" label="SM" />
            <Loader size="md" label="MD" />
            <Loader size="lg" label="LG" />
            <Loader size="xl" label="XL" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Colors</h3>
          <div className="flex flex-wrap items-center gap-8">
            <Loader color="primary" label="Primary" />
            <Loader color="success" label="Success" />
            <Loader color="danger" label="Danger" />
            <Loader color="warning" label="Warning" />
            <Loader color="info" label="Info" />
            <Loader color="secondary" label="Secondary" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Dots — Colors</h3>
          <div className="flex flex-wrap items-center gap-8">
            <Loader variant="dots" color="primary" />
            <Loader variant="dots" color="success" />
            <Loader variant="dots" color="danger" />
            <Loader variant="dots" color="warning" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Overlay</h3>
          <div className="relative h-40 rounded-lg border ce-divider overflow-hidden">
            <div className="p-4">
              <p className="ce-text">This content is behind an overlay loader.</p>
              <p className="ce-muted text-sm mt-2">The loader covers the parent container.</p>
            </div>
            <Loader overlay label="Loading..." />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SKELETON
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Skeleton</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Text Lines</h3>
          <Skeleton variant="text" lines={4} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Variants</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Skeleton variant="circular" width={64} height={64} />
            <Skeleton variant="rectangular" width={200} height={100} />
            <Skeleton variant="rounded" width={200} height={100} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Skeleton Group (Card)</h3>
          <div className="max-w-sm">
            <Skeleton.Group avatar lines={3} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Multiple Groups (List)</h3>
          <div className="space-y-4 max-w-md">
            <Skeleton.Group avatar avatarSize={40} lines={2} />
            <Skeleton.Group avatar avatarSize={40} lines={2} />
            <Skeleton.Group avatar avatarSize={40} lines={2} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RESULT
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Result</h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Result
            status="warning"
            title="Action Required"
            subtitle="Your account needs verification before you can proceed."
          />
          <Result
            status="info"
            title="Information"
            subtitle="Your request has been submitted and is pending review."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Result
            status="404"
            title="Page Not Found"
            subtitle="The page you're looking for doesn't exist."
            extra={<Button variant="primary" label="Back Home" size="sm" />}
          />
          <Result
            status="403"
            title="Access Denied"
            subtitle="You don't have permission to access this resource."
          />
          <Result
            status="500"
            title="Server Error"
            subtitle="Something went wrong on our end. Please try again later."
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WATERMARK
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Watermark</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <Watermark text="CONFIDENTIAL">
            <div className="h-48 rounded-lg border ce-divider p-6">
              <h4 className="text-lg font-semibold ce-subheading mb-2">Sensitive Document</h4>
              <p className="ce-text">This content is protected with a watermark overlay. The watermark is tamper-resistant and will re-render if removed from the DOM.</p>
            </div>
          </Watermark>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Custom Settings</h3>
          <Watermark text="DRAFT" fontSize={20} rotate={-30} gap={120} opacity={0.1}>
            <div className="h-48 rounded-lg border ce-divider p-6">
              <h4 className="text-lg font-semibold ce-subheading mb-2">Draft Document</h4>
              <p className="ce-text">This watermark has custom font size, rotation, gap, and opacity settings.</p>
            </div>
          </Watermark>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          QR CODE
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">QR Code</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap items-end gap-6">
            <QRCode value="https://example.com" size={80} />
            <QRCode value="https://example.com" size={128} />
            <QRCode value="https://example.com" size={180} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Border</h3>
          <QRCode value="https://react.dev" size={150} bordered />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Custom Text</h3>
          <QRCode value="Hello from the QR Code component!" size={160} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SPLITTER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Splitter</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Horizontal</h3>
          <div className="h-64 border ce-divider rounded-lg overflow-hidden">
            <Splitter direction="horizontal">
              <Splitter.Pane defaultSize={40} minSize={20}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold ce-subheading mb-2">Left Panel</h4>
                  <p className="text-sm ce-text">Drag the gutter to resize.</p>
                </div>
              </Splitter.Pane>
              <Splitter.Pane minSize={20}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold ce-subheading mb-2">Right Panel</h4>
                  <p className="text-sm ce-text">This is the right side content area.</p>
                </div>
              </Splitter.Pane>
            </Splitter>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Vertical</h3>
          <div className="h-80 border ce-divider rounded-lg overflow-hidden">
            <Splitter direction="vertical">
              <Splitter.Pane defaultSize={40} minSize={15}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold ce-subheading mb-2">Top Panel</h4>
                  <p className="text-sm ce-text">Drag to resize vertically.</p>
                </div>
              </Splitter.Pane>
              <Splitter.Pane minSize={15}>
                <div className="p-4 h-full">
                  <h4 className="font-semibold ce-subheading mb-2">Bottom Panel</h4>
                  <p className="text-sm ce-text">This is the bottom content area.</p>
                </div>
              </Splitter.Pane>
            </Splitter>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RATE
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Rate</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <Rate value={rateVal} onChange={setRateVal} />
          <p className="text-sm ce-muted mt-1">Value: {rateVal}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Half Stars</h3>
          <Rate value={rateHalf} allowHalf onChange={setRateHalf} />
          <p className="text-sm ce-muted mt-1">Value: {rateHalf}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-col gap-3">
            <Rate defaultValue={3} size="sm" />
            <Rate defaultValue={3} size="md" />
            <Rate defaultValue={3} size="lg" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Colors</h3>
          <div className="flex flex-col gap-3">
            <Rate defaultValue={4} color="primary" />
            <Rate defaultValue={4} color="warning" />
            <Rate defaultValue={4} color="danger" />
            <Rate defaultValue={4} color="success" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">10 Stars — Read Only</h3>
          <Rate count={10} defaultValue={7} disabled />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Allow Clear</h3>
          <Rate defaultValue={3} allowClear />
          <p className="text-xs ce-muted mt-1">Click the current rating again to clear</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRANSFER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Transfer</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default (with Search)</h3>
          <Transfer
            dataSource={transferDataSource}
            targetKeys={transferKeys}
            titles={["Available", "Selected"]}
            showSearch
            onChange={(keys) => setTransferKeys(keys)}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Without Search</h3>
          <Transfer
            dataSource={transferDataSource}
            defaultTargetKeys={["1", "3"]}
            titles={["Source", "Target"]}
            showSearch={false}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled</h3>
          <Transfer
            dataSource={transferDataSource}
            defaultTargetKeys={["2"]}
            disabled
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          COLOR PICKER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Color Picker</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <ColorPicker value={colorVal} onChange={setColorVal} />
          <p className="text-sm ce-muted mt-2">Selected: {colorVal}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <ColorPicker size="sm" defaultValue="#ef4444" />
            <ColorPicker size="md" defaultValue="#22c55e" />
            <ColorPicker size="lg" defaultValue="#8b5cf6" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled</h3>
          <ColorPicker defaultValue="#f59e0b" disabled />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Form Color Picker</h3>
          <div className="max-w-sm">
            <FormColorPicker
              label="Brand Color"
              defaultValue="#3b82f6"
              hint="Choose your brand primary color"
            />
            <FormColorPicker
              label="Error State"
              defaultValue="#ef4444"
              error="This color doesn't meet contrast requirements"
              required
              className="mt-4"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DATE PICKER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Date Picker</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <div className="max-w-xs">
            <DatePicker value={dateVal} onChange={setDateVal} placeholder="Select a date" />
            {dateVal && <p className="text-sm ce-muted mt-2">Selected: {dateVal}</p>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <DatePicker size="sm" placeholder="Small" />
            <DatePicker size="md" placeholder="Medium" />
            <DatePicker size="lg" placeholder="Large" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Min/Max</h3>
          <div className="max-w-xs">
            <DatePicker placeholder="2025 only" minDate="2025-01-01" maxDate="2025-12-31" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled</h3>
          <div className="max-w-xs">
            <DatePicker defaultValue="2025-06-15" disabled />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Form Date Picker</h3>
          <div className="max-w-sm">
            <FormDatePicker label="Start Date" placeholder="Pick start date" hint="Choose a future date" />
            <FormDatePicker label="End Date" placeholder="Pick end date" error="End date is required" required className="mt-4" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AVATAR UPLOAD
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Avatar Upload</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Circle (Default)</h3>
          <AvatarUpload onChange={(file) => file && console.log("Uploaded:", file.name)} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Square</h3>
          <AvatarUpload shape="square" size={100} onChange={(file) => file && console.log("Uploaded:", file.name)} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Default Value</h3>
          <AvatarUpload defaultValue="https://i.pravatar.cc/150?img=32" size={120} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Disabled</h3>
          <AvatarUpload disabled defaultValue="https://i.pravatar.cc/150?img=20" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMAGE DISPLAY
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Image Display</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Basic</h3>
          <ImageDisplay src="https://picsum.photos/seed/img1/600/400" alt="Sample image" width={300} height={200} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">With Caption, Rounded, Shadow</h3>
          <ImageDisplay
            src="https://picsum.photos/seed/img2/600/400"
            alt="Landscape"
            width={350}
            height={220}
            rounded
            shadow
            caption="Beautiful mountain landscape"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Bordered + Preview</h3>
          <ImageDisplay
            src="https://picsum.photos/seed/img3/600/400"
            alt="Preview demo"
            width={300}
            height={200}
            bordered
            preview
          />
          <p className="text-xs ce-muted mt-1">Click to preview in lightbox</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Object Fit Variants</h3>
          <div className="flex flex-wrap gap-4">
            <ImageDisplay src="https://picsum.photos/seed/img4/600/400" alt="Cover" width={150} height={150} objectFit="cover" bordered caption="Cover" />
            <ImageDisplay src="https://picsum.photos/seed/img4/600/400" alt="Contain" width={150} height={150} objectFit="contain" bordered caption="Contain" />
            <ImageDisplay src="https://picsum.photos/seed/img4/600/400" alt="Fill" width={150} height={150} objectFit="fill" bordered caption="Fill" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY VIEWER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Gallery Viewer</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">3 Columns (Default)</h3>
          <GalleryViewer images={galleryImages} columns={3} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">4 Columns — Small Gap</h3>
          <GalleryViewer images={galleryImages} columns={4} gap="sm" />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">2 Columns — Large Gap</h3>
          <GalleryViewer images={galleryImages.slice(0, 4)} columns={2} gap="lg" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMAGE VIEWER
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Image Viewer</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default (with Toolbar)</h3>
          <div className="h-96 border ce-divider rounded-lg overflow-hidden">
            <ImageViewer src="https://picsum.photos/seed/viewer1/1200/800" alt="Zoomable image" />
          </div>
          <p className="text-xs ce-muted mt-1">Use toolbar buttons or mouse wheel to zoom. Drag to pan.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Without Toolbar</h3>
          <div className="h-64 border ce-divider rounded-lg overflow-hidden">
            <ImageViewer src="https://picsum.photos/seed/viewer2/1200/800" alt="No toolbar" toolbar={false} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          POPCONFIRM
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">PopConfirm</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default (Top)</h3>
          <PopConfirm
            title="Delete this item?"
            description="This action cannot be undone."
            onConfirm={() => alert("Deleted!")}
          >
            <Button variant="danger" label="Delete" size="sm" />
          </PopConfirm>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Placements</h3>
          <div className="flex flex-wrap items-center gap-4">
            <PopConfirm title="Confirm?" placement="top" onConfirm={() => alert("Top")}>
              <Button variant="secondary" label="Top" size="sm" />
            </PopConfirm>
            <PopConfirm title="Confirm?" placement="bottom" onConfirm={() => alert("Bottom")}>
              <Button variant="secondary" label="Bottom" size="sm" />
            </PopConfirm>
            <PopConfirm title="Confirm?" placement="left" onConfirm={() => alert("Left")}>
              <Button variant="secondary" label="Left" size="sm" />
            </PopConfirm>
            <PopConfirm title="Confirm?" placement="right" onConfirm={() => alert("Right")}>
              <Button variant="secondary" label="Right" size="sm" />
            </PopConfirm>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Confirm Variants</h3>
          <div className="flex flex-wrap items-center gap-4">
            <PopConfirm title="Delete?" confirmVariant="danger" confirmText="Delete" onConfirm={() => alert("Danger")}>
              <Button variant="danger" label="Danger" size="sm" />
            </PopConfirm>
            <PopConfirm title="Proceed?" confirmVariant="warning" confirmText="Proceed" onConfirm={() => alert("Warning")}>
              <Button variant="warning" label="Warning" size="sm" />
            </PopConfirm>
            <PopConfirm title="Submit?" confirmVariant="success" confirmText="Submit" onConfirm={() => alert("Success")}>
              <Button variant="success" label="Success" size="sm" />
            </PopConfirm>
            <PopConfirm title="Continue?" confirmVariant="primary" confirmText="Continue" onConfirm={() => alert("Primary")}>
              <Button variant="primary" label="Primary" size="sm" />
            </PopConfirm>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NOTIFICATION DROPDOWN
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Notification Dropdown</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Default</h3>
          <NotificationDropdown
            notifications={notificationDemoItems}
            unreadCount={3}
            onMarkAllRead={() => alert("Marked all read")}
            onViewAll={() => alert("View all")}
            onClear={() => alert("Cleared")}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Empty State</h3>
          <NotificationDropdown
            notifications={[]}
            unreadCount={0}
            emptyText="No notifications yet"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Custom Title</h3>
          <NotificationDropdown
            notifications={notificationDemoItems.slice(0, 2)}
            unreadCount={2}
            title="Alerts"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ACCORDION — GHOST VARIANT
      ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold ce-heading">Accordion — Ghost Variant</h2>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Ghost</h3>
          <Accordion items={accordionBasicItems} variant="ghost" defaultOpen={["1"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Ghost — Multiple</h3>
          <Accordion items={accordionBasicItems} variant="ghost" multiple defaultOpen={["1", "2"]} />
        </div>

        <div>
          <h3 className="text-lg font-semibold ce-subheading mb-3">Ghost — Icon Left</h3>
          <Accordion items={accordionBasicItems} variant="ghost" iconPosition="left" />
        </div>
      </section>
    </div>
  );
};

export default ComponentExamples;
