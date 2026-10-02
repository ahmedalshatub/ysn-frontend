import type { SelectOption } from "../../../shared/components/inputs/Select";
import type { TreeSelectNodeData } from "../../../shared/components/inputs/TreeSelect";
import type { Column } from "../../../shared/components/table/DataTable";
import type { TreeTableColumn, TreeTableRow } from "../../../shared/components/table/TreeTable";
import type { CarouselSlide } from "../../../shared/components/media/Carousel";
import type { AvatarGroupItem } from "../../../shared/components/media/AvatarGroup";
import type { TimelineItemData } from "../../../shared/components/display/Timeline";
import type { AccordionItemData } from "../../../shared/components/navigation/Accordion";
import type { BreadcrumbItem } from "../../../shared/components/navigation/Breadcrumb";
import type { PageBreadcrumbItem } from "../../../shared/components/navigation/PageBreadcrumb";
import type { StepItem } from "../../../shared/components/navigation/Stepper";
import type { DropdownMenuEntry } from "../../../shared/components/navigation/Dropdown";
import type { ToolbarEntry } from "../../../shared/components/navigation/Toolbar";
import type { TreeNodeData } from "../../../shared/components/navigation/TreeView";
import type { CalendarEvent } from "../../../shared/components/display/Calendar";
import type { OrgNodeData } from "../../../shared/components/display/OrgChart";
import type { TrendPoint } from "../../../shared/components/cards/SparklineStatCard";
import type { TabItem } from "../../../shared/components/navigation/Tabs";
import Badge from "../../../shared/components/badges/Badge";
import TableImage from "../../../shared/components/table/TableImage";
import TableActionButtons from "../../../shared/components/table/TableActionButtons";
import TableActionDropdown from "../../../shared/components/table/TableActionDropdown";
import StarIcon from "../../../assets/icons/StarIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
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

export interface DemoForm {
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

export type UserRow = (typeof sampleUsers)[0];

export const SectionTitle = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold sc-heading">{title}</h3>
    {description && <p className="text-sm sc-subtext mt-1">{description}</p>}
  </div>
);

export const ExampleBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="sc-example-block rounded-xl p-5 mb-6">
    {title && <p className="text-xs font-semibold uppercase tracking-wider sc-label mb-4">{title}</p>}
    {children}
  </div>
);

export const simpleOptions: SelectOption[] = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const selectOptions: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

export const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "ae", label: "UAE" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

export const languageOptions: SelectOption[] = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "rb", label: "Ruby" },
  { value: "java", label: "Java" },
];

export const frameworkOptions: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
];

export const planOptions: SelectOption[] = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

export const priorityOptions: SelectOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const treeSelectData: TreeSelectNodeData[] = [
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

export const transferSourceData = [
  { key: "1", label: "JavaScript", description: "Dynamic language" },
  { key: "2", label: "TypeScript", description: "Typed JavaScript" },
  { key: "3", label: "Python", description: "General purpose" },
  { key: "4", label: "Rust", description: "Systems language" },
  { key: "5", label: "Go", description: "Compiled language" },
  { key: "6", label: "Ruby", description: "Object oriented" },
  { key: "7", label: "Java", description: "Enterprise standard", disabled: true },
  { key: "8", label: "C#", description: ".NET ecosystem" },
];

export const sampleUsers = [
  { id: 1, name: "Ahmed Al-Rashid", email: "ahmed@example.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=1", joined: "2024-01-15" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Editor", status: "Active", avatar: "https://i.pravatar.cc/150?img=2", joined: "2024-02-20" },
  { id: 3, name: "Michael Chen", email: "michael@example.com", role: "Viewer", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=3", joined: "2024-03-10" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "Editor", status: "Active", avatar: "https://i.pravatar.cc/150?img=4", joined: "2024-04-05" },
  { id: 5, name: "Omar Hassan", email: "omar@example.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=5", joined: "2024-05-12" },
  { id: 6, name: "Lisa Park", email: "lisa@example.com", role: "Viewer", status: "Pending", avatar: "https://i.pravatar.cc/150?img=6", joined: "2024-06-18" },
  { id: 7, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", avatar: "https://i.pravatar.cc/150?img=7", joined: "2024-07-22" },
  { id: 8, name: "Fatima Al-Sayed", email: "fatima@example.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=8", joined: "2024-08-30" },
  { id: 9, name: "Daniel Lee", email: "daniel@example.com", role: "Editor", status: "Active", avatar: "https://i.pravatar.cc/150?img=9", joined: "2024-09-05" },
  { id: 10, name: "Sophia Martinez", email: "sophia@example.com", role: "Viewer", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=10", joined: "2024-10-15" },
  { id: 11, name: "James Wilson", email: "james@example.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?img=11", joined: "2024-11-20" },
  { id: 12, name: "Olivia Brown", email: "olivia@example.com", role: "Moderator", status: "Active", avatar: "https://i.pravatar.cc/150?img=12", joined: "2024-12-01" },
];

export const statusBadge = (status: string) => (
  <Badge
    variant={status === "Active" ? "success" : status === "Pending" ? "warning" : status === "Inactive" ? "secondary" : "info"}
    size="sm"
    label={status}
    pill
  />
);

export const tableColumns: Column<UserRow>[] = [
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
          <p className="font-medium sc-heading truncate">{row.name}</p>
          <p className="text-xs sc-subtext truncate">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: "role", header: "Role", sortable: true, sortFn: (a, b) => a.role.localeCompare(b.role), responsive: "sm", render: (row) => <span className="text-sm">{row.role}</span> },
  {
    key: "status",
    header: "Status",
    sortable: true,
    sortFn: (a, b) => a.status.localeCompare(b.status),
    render: (row) => statusBadge(row.status),
  },
  { key: "joined", header: "Joined", sortable: true, sortFn: (a, b) => a.joined.localeCompare(b.joined), responsive: "md", render: (row) => <span className="text-sm sc-subtext">{row.joined}</span> },
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

export const clientColumns: Column<UserRow>[] = [
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
          <p className="font-medium sc-heading truncate">{row.name}</p>
          <p className="text-xs sc-subtext truncate">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: "role", header: "Role", sortable: true, sortFn: (a, b) => a.role.localeCompare(b.role), responsive: "sm", render: (row) => <span className="text-sm">{row.role}</span> },
  { key: "status", header: "Status", sortable: true, sortFn: (a, b) => a.status.localeCompare(b.status), render: (row) => statusBadge(row.status) },
  { key: "joined", header: "Joined", sortable: true, sortFn: (a, b) => a.joined.localeCompare(b.joined), responsive: "md", render: (row) => <span className="text-sm sc-subtext">{row.joined}</span> },
];

interface FileRow extends TreeTableRow {
  name: string;
  size: string;
  type: string;
  modified: string;
}

export const treeTableColumns: TreeTableColumn<FileRow>[] = [
  { key: "name", header: "Name", width: "40%" },
  { key: "size", header: "Size", width: "15%" },
  { key: "type", header: "Type", width: "20%" },
  { key: "modified", header: "Modified", width: "25%" },
];

export const treeTableData: FileRow[] = [
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

export const carouselSlides: CarouselSlide[] = [
  {
    id: "s1",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2 text-white">Welcome</h3>
          <p className="text-white/70 text-lg">Build amazing things with our components</p>
        </div>
      </div>
    ),
  },
  {
    id: "s2",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2 text-white">Powerful</h3>
          <p className="text-white/70 text-lg">50+ beautifully crafted UI components</p>
        </div>
      </div>
    ),
  },
  {
    id: "s3",
    content: (
      <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2 text-white">Modern Stack</h3>
          <p className="text-white/70 text-lg">React + Tailwind + TypeScript</p>
        </div>
      </div>
    ),
  },
];

export const photoSlides: CarouselSlide[] = [
  { id: "p1", content: <div className="relative w-full h-full"><img src="https://picsum.photos/seed/p1/1200/600" className="w-full h-full object-cover" alt="Mountain Vista" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white"><h3 className="text-2xl font-bold">Mountain Vista</h3><p className="text-white/70">Explore the peaks</p></div></div> },
  { id: "p2", content: <div className="relative w-full h-full"><img src="https://picsum.photos/seed/p2/1200/600" className="w-full h-full object-cover" alt="Ocean Breeze" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white"><h3 className="text-2xl font-bold">Ocean Breeze</h3><p className="text-white/70">Feel the waves</p></div></div> },
  { id: "p3", content: <div className="relative w-full h-full"><img src="https://picsum.photos/seed/p3/1200/600" className="w-full h-full object-cover" alt="City Lights" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white"><h3 className="text-2xl font-bold">City Lights</h3><p className="text-white/70">Urban nightlife</p></div></div> },
  { id: "p4", content: <div className="relative w-full h-full"><img src="https://picsum.photos/seed/p4/1200/600" className="w-full h-full object-cover" alt="Desert Sunset" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white"><h3 className="text-2xl font-bold">Desert Sunset</h3><p className="text-white/70">Golden horizons</p></div></div> },
];

export const avatarGroupItems: AvatarGroupItem[] = [
  { src: "https://i.pravatar.cc/150?img=10", alt: "User 1" },
  { src: "https://i.pravatar.cc/150?img=11", alt: "User 2" },
  { src: "https://i.pravatar.cc/150?img=12", alt: "User 3" },
  { src: "https://i.pravatar.cc/150?img=13", alt: "User 4" },
  { src: "https://i.pravatar.cc/150?img=14", alt: "User 5" },
  { src: "https://i.pravatar.cc/150?img=15", alt: "User 6" },
  { src: "https://i.pravatar.cc/150?img=16", alt: "User 7" },
  { src: "https://i.pravatar.cc/150?img=17", alt: "User 8" },
];

export const avatarGroupInitials: AvatarGroupItem[] = [
  { name: "Sarah Johnson", alt: "SJ" },
  { name: "Michael Chen", alt: "MC" },
  { name: "Emily Davis", alt: "ED" },
  { name: "James Wilson", alt: "JW" },
  { name: "Olivia Brown", alt: "OB" },
];

export const timelineBasicItems: TimelineItemData[] = [
  { id: "t1", title: "Project Kickoff", description: "Initial planning and team assembly.", date: "Jan 15, 2024", color: "primary" },
  { id: "t2", title: "Design Phase", description: "UI/UX design and prototype creation.", date: "Feb 10, 2024", color: "info" },
  { id: "t3", title: "Development Start", description: "Frontend and backend development began.", date: "Mar 5, 2024", color: "warning" },
  { id: "t4", title: "Testing & QA", description: "Comprehensive testing including unit and E2E.", date: "Apr 20, 2024", color: "success" },
  { id: "t5", title: "Launch", description: "Product deployed to production.", date: "May 1, 2024", color: "danger" },
];

export const timelineIconItems: TimelineItemData[] = [
  { id: "ti1", title: "Order Placed", description: "Your order #12345 has been confirmed.", date: "10:30 AM", color: "primary", icon: <SearchIcon /> },
  { id: "ti2", title: "Payment Confirmed", description: "Payment of $129.99 was successfully processed.", date: "10:32 AM", color: "success", icon: <StarIcon /> },
  { id: "ti3", title: "Preparing Shipment", description: "Your items are being packed.", date: "11:15 AM", color: "warning", icon: <DownloadIcon /> },
  { id: "ti4", title: "Out for Delivery", description: "Package is on its way.", date: "2:45 PM", color: "info", icon: <PlusIcon /> },
  { id: "ti5", title: "Delivered", description: "Package has been delivered.", date: "4:20 PM", color: "success", icon: <StarIcon /> },
];

export const timelineItems = timelineBasicItems;

export const accordionBasicItems: AccordionItemData[] = [
  { id: "1", title: "What is React?", content: "React is a JavaScript library for building user interfaces." },
  { id: "2", title: "What is TypeScript?", content: "TypeScript is a strongly typed programming language that builds on JavaScript." },
  { id: "3", title: "What is Tailwind CSS?", content: "Tailwind CSS is a utility-first CSS framework." },
  { id: "4", title: "What is Vite?", content: "Vite is a modern frontend build tool." },
];

export const accordionIconItems: AccordionItemData[] = [
  { id: "a1", title: "Account Settings", icon: <SearchIcon />, content: "Manage your account settings, profile information, and preferences." },
  { id: "a2", title: "Security & Privacy", icon: <StarIcon />, content: "Configure security settings including 2FA and session management." },
  { id: "a3", title: "Notifications", icon: <PlusIcon />, content: "Choose which notifications you want to receive." },
  { id: "a4", title: "Billing & Payments", icon: <DownloadIcon />, content: "View and manage billing information.", disabled: true },
];

export const accordionItems = accordionBasicItems;

export const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Showcase" },
];

export const breadcrumbShortItems: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Dashboard" },
];

export const pageBreadcrumbItems: PageBreadcrumbItem[] = [
  { label: "Home" },
  { label: "Components" },
  { label: "Showcase" },
];

export const pageBreadcrumbProjectItems: PageBreadcrumbItem[] = [
  { label: "Home" },
  { label: "Projects" },
  { label: "Settings" },
];

export const pageBreadcrumbUsersItems: PageBreadcrumbItem[] = [
  { label: "Home" },
  { label: "Admin" },
  { label: "Users" },
];

export const checkoutSteps: StepItem[] = [
  { id: "cart", label: "Cart", description: "Review items" },
  { id: "shipping", label: "Shipping", description: "Delivery address" },
  { id: "payment", label: "Payment", description: "Payment method" },
  { id: "confirm", label: "Confirm", description: "Place order" },
];

export const accountSteps: StepItem[] = [
  { id: "personal", label: "Personal Info", description: "Name & email" },
  { id: "security", label: "Security", description: "Password setup" },
  { id: "preferences", label: "Preferences", description: "Customize", optional: true },
  { id: "verification", label: "Verification", description: "Verify identity" },
  { id: "complete", label: "Complete", description: "All done!" },
];

export const projectSteps: StepItem[] = [
  { id: "init", label: "Initialize" },
  { id: "config", label: "Configure" },
  { id: "develop", label: "Develop" },
  { id: "test", label: "Test" },
  { id: "deploy", label: "Deploy" },
];

export const errorSteps: StepItem[] = [
  { id: "upload", label: "Upload Files", description: "Select documents" },
  { id: "validate", label: "Validate", description: "Check format", status: "error" },
  { id: "process", label: "Process", description: "Convert files" },
  { id: "done", label: "Complete", description: "Download results" },
];

export const stepperItems = checkoutSteps;

export const dropdownBasicItems: DropdownMenuEntry[] = [
  { key: "edit", label: "Edit", icon: <PlusIcon /> },
  { key: "duplicate", label: "Duplicate", icon: <StarIcon /> },
  { key: "d1", divider: true },
  { key: "archive", label: "Archive", icon: <DownloadIcon /> },
  { key: "delete", label: "Delete", variant: "danger", icon: <TrashIcon /> },
];

export const dropdownWithDescItems: DropdownMenuEntry[] = [
  { key: "project", label: "New Project", description: "Start a new project", icon: <PlusIcon /> },
  { key: "doc", label: "New Document", description: "Create a document", icon: <StarIcon /> },
  { key: "d1", divider: true },
  { key: "import", label: "Import", description: "Import from file", icon: <DownloadIcon /> },
];

export const dropdownGroupedItems: DropdownMenuEntry[] = [
  { key: "h1", header: "Actions" },
  { key: "edit", label: "Edit" },
  { key: "duplicate", label: "Duplicate" },
  { key: "d1", divider: true },
  { key: "h2", header: "Danger Zone" },
  { key: "archive", label: "Archive" },
  { key: "delete", label: "Delete", variant: "danger" },
];

export const dropdownActiveItems: DropdownMenuEntry[] = [
  { key: "all", label: "All Items", active: true },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "disabled", label: "Disabled Item", disabled: true },
];

export const dropdownLongItems: DropdownMenuEntry[] = Array.from({ length: 15 }, (_, i) => ({
  key: `item-${i}`,
  label: `Navigation Item ${i + 1}`,
}));

export const dropdownItems = dropdownBasicItems;

export const profileTabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div className="p-4 sc-example-block rounded-lg"><h3 className="font-semibold sc-heading mb-2">Overview</h3><p className="text-sm sc-subtext">Welcome to your dashboard overview.</p></div> },
  { id: "activity", label: "Activity", badge: 12, content: <div className="p-4 sc-example-block rounded-lg"><h3 className="font-semibold sc-heading mb-2">Recent Activity</h3><p className="text-sm sc-subtext">You have 12 new notifications.</p></div> },
  { id: "settings", label: "Settings", content: <div className="p-4 sc-example-block rounded-lg"><h3 className="font-semibold sc-heading mb-2">Settings</h3><p className="text-sm sc-subtext">Manage your account preferences.</p></div> },
  { id: "billing", label: "Billing", content: <div className="p-4 sc-example-block rounded-lg"><h3 className="font-semibold sc-heading mb-2">Billing</h3><p className="text-sm sc-subtext">View your invoices and payment history.</p></div> },
  { id: "integrations", label: "Integrations", badge: "New", content: <div className="p-4 sc-example-block rounded-lg"><h3 className="font-semibold sc-heading mb-2">Integrations</h3><p className="text-sm sc-subtext">Connect third-party services.</p></div> },
];

export const projectTabs: TabItem[] = [
  { id: "all", label: "All Projects", badge: 24 },
  { id: "active", label: "Active", badge: 8 },
  { id: "completed", label: "Completed", badge: 14 },
  { id: "archived", label: "Archived", badge: 2 },
  { id: "drafts", label: "Drafts", disabled: true },
];

export const settingsTabs: TabItem[] = [
  { id: "general", label: "General", content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">General application settings.</p></div> },
  { id: "security", label: "Security", content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">Password and session management.</p></div> },
  { id: "notifications", label: "Notifications", badge: 3, content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">Notification preferences.</p></div> },
  { id: "appearance", label: "Appearance", content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">Theme and display customization.</p></div> },
  { id: "api", label: "API Keys", content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">Manage API keys and webhooks.</p></div> },
  { id: "team", label: "Team", badge: 5, content: <div className="p-4 sc-example-block rounded-lg"><p className="text-sm sc-subtext">Invite members and manage roles.</p></div> },
];

export const treeViewData: TreeNodeData[] = [
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

export const toolbarItems: ToolbarEntry[] = [
  { id: "bold", icon: <BoldIcon />, tooltip: "Bold" },
  { id: "italic", icon: <ItalicIcon />, tooltip: "Italic" },
  { id: "underline", icon: <UnderlineIcon />, tooltip: "Underline" },
  { id: "div1", type: "divider" as const },
  { id: "align-left", icon: <AlignLeftIcon />, tooltip: "Align Left" },
  { id: "align-center", icon: <AlignCenterIcon />, tooltip: "Align Center" },
  { id: "align-right", icon: <AlignRightIcon />, tooltip: "Align Right" },
  { id: "div2", type: "divider" as const },
  { id: "link", icon: <LinkIcon />, tooltip: "Insert Link" },
  { id: "image", icon: <ImageIcon />, tooltip: "Insert Image" },
  { id: "div3", type: "divider" as const },
  { id: "undo", icon: <Undo2Icon />, tooltip: "Undo" },
  { id: "redo", icon: <RefreshCwIcon />, tooltip: "Redo" },
];

export { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, LinkIcon, ImageIcon, Undo2Icon as UndoIcon, RefreshCwIcon as RedoIcon };

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-03-09", title: "Team Meeting", color: "primary" },
  { id: "e2", date: "2026-03-09", title: "Code Review", color: "success" },
  { id: "e3", date: "2026-03-12", title: "Sprint Planning", color: "warning" },
  { id: "e4", date: "2026-03-15", title: "Release Day", color: "danger" },
  { id: "e5", date: "2026-03-18", title: "Design Review", color: "info" },
  { id: "e6", date: "2026-03-22", title: "Demo Day", color: "primary" },
  { id: "e7", date: "2026-03-25", title: "Retrospective", color: "secondary" },
  { id: "e8", date: "2026-03-28", title: "Workshop", color: "success" },
];

export const orgChartData: OrgNodeData = {
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

export const sparklineRevenueData: TrendPoint[] = [
  { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 },
  { value: 40 }, { value: 60 }, { value: 55 }, { value: 70 },
  { value: 65 }, { value: 80 },
];

export const sparklineUsersData: TrendPoint[] = [
  { value: 100 }, { value: 120 }, { value: 115 }, { value: 140 },
  { value: 135 }, { value: 160 }, { value: 155 }, { value: 180 },
  { value: 175 }, { value: 200 },
];

export const sparklineOrdersData: TrendPoint[] = [
  { value: 80 }, { value: 70 }, { value: 75 }, { value: 60 },
  { value: 65 }, { value: 50 }, { value: 55 }, { value: 40 },
  { value: 45 }, { value: 30 },
];

export const sparklineConversionData: TrendPoint[] = [
  { value: 2 }, { value: 2.5 }, { value: 2.3 }, { value: 3 },
  { value: 2.8 }, { value: 3.5 }, { value: 3.2 }, { value: 4 },
  { value: 3.8 }, { value: 4.2 },
];

export const sparkData = sparklineRevenueData;

export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const revenueDatasets = [
  { label: "Revenue", data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000], variant: "primary" as const, fill: true },
];

export const multiLineDatasets = [
  { label: "Desktop", data: [4500, 5200, 4800, 6100, 5900, 7200, 6800, 7500, 7100, 8200, 7800, 8500], variant: "primary" as const },
  { label: "Mobile", data: [3200, 3800, 4200, 4800, 5100, 5600, 6000, 6500, 6200, 7000, 7400, 7800], variant: "success" as const },
  { label: "Tablet", data: [1200, 1400, 1100, 1600, 1500, 1800, 1700, 2000, 1900, 2200, 2100, 2400], variant: "warning" as const },
];

export const salesBarDatasets = [
  { label: "Sales", data: [65, 59, 80, 81, 56, 55, 72, 88, 90, 76, 85, 92], variant: "primary" as const },
];

export const comparisonBarDatasets = [
  { label: "2024", data: [42, 55, 48, 62, 70, 58, 65, 72, 80, 68, 75, 82], variant: "info" as const },
  { label: "2025", data: [50, 62, 58, 70, 78, 66, 72, 80, 88, 76, 84, 92], variant: "success" as const },
];

export const stackedBarDatasets = [
  { label: "Organic", data: [30, 25, 35, 28, 40, 32, 38, 42, 36, 45, 40, 48], variant: "success" as const },
  { label: "Paid", data: [20, 18, 22, 25, 18, 20, 24, 28, 22, 26, 30, 28], variant: "primary" as const },
  { label: "Referral", data: [10, 12, 8, 14, 12, 16, 10, 14, 18, 12, 16, 20], variant: "warning" as const },
];

export const pieLabels = ["Direct", "Social", "Email", "Organic", "Referral"];
export const pieData = [35, 25, 20, 12, 8];

export const doughnutLabels = ["Desktop", "Mobile", "Tablet", "Other"];
export const doughnutData = [45, 30, 15, 10];

export const trafficAreaDatasets = [
  { label: "Visitors", data: [800, 1200, 1000, 1500, 1800, 1600, 2000, 2200, 1900, 2500, 2800, 3000], variant: "primary" as const },
  { label: "Page Views", data: [2400, 3600, 3000, 4500, 5400, 4800, 6000, 6600, 5700, 7500, 8400, 9000], variant: "info" as const },
];

export const stackedAreaDatasets = [
  { label: "CSS", data: [30, 35, 28, 40, 38, 42, 45, 50, 48, 52, 55, 58], variant: "primary" as const },
  { label: "JavaScript", data: [45, 50, 42, 55, 52, 58, 60, 65, 62, 68, 70, 75], variant: "warning" as const },
  { label: "Python", data: [25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52], variant: "success" as const },
];

export const radarLabels = ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Design"];
export const radarDatasets = [
  { label: "Model A", data: [85, 90, 70, 88, 75, 92], variant: "primary" as const },
  { label: "Model B", data: [78, 82, 88, 80, 90, 76], variant: "danger" as const },
];

export const skillRadarLabels = ["HTML", "CSS", "JavaScript", "React", "Node.js", "TypeScript", "SQL", "DevOps"];
export const skillRadarDatasets = [
  { label: "Current", data: [95, 90, 88, 92, 75, 85, 70, 65], variant: "primary" as const },
  { label: "Goal", data: [95, 95, 95, 95, 90, 95, 85, 80], variant: "success" as const, fill: false },
];

export const polarLabels = ["Research", "Design", "Development", "Testing", "Deployment"];
export const polarData = [40, 30, 50, 35, 25];

export const horizontalBarDatasets = [
  { label: "Tasks Completed", data: [42, 38, 55, 48, 62, 35], variant: "info" as const },
];
export const horizontalBarLabels = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];

export const chartLabels = monthLabels.slice(0, 6);
export const chartData1 = [30, 45, 35, 60, 50, 70];
export const chartData2 = [20, 35, 25, 45, 40, 55];

export const notificationDemoItems = [
  { id: "n1", title: "New message", message: "Sarah sent you a message", time: "2 min ago", type: "info" as const, read: false, avatar: "https://i.pravatar.cc/150?img=10" },
  { id: "n2", title: "Task completed", message: "Deployment to production was successful.", time: "15 min ago", type: "success" as const, read: false },
  { id: "n3", title: "Server warning", message: "CPU usage exceeded 90%.", time: "1 hour ago", type: "warning" as const, read: false },
  { id: "n4", title: "Build failed", message: "CI pipeline failed on feature/auth.", time: "3 hours ago", type: "error" as const, read: true },
  { id: "n5", title: "Comment added", message: "Michael commented on PR #42.", time: "Yesterday", type: "info" as const, read: true, avatar: "https://i.pravatar.cc/150?img=12" },
];

export const notificationItems = [
  { id: "ni1", name: "Sarah Johnson", message: "commented on your post", time: "2 min ago", read: false, avatar: "https://i.pravatar.cc/150?img=10" },
  { id: "ni2", name: "Michael Chen", message: "mentioned you in a comment", time: "5 min ago", read: false, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "ni3", name: "Emma Wilson", message: "liked your project", time: "1 hour ago", read: true, avatar: "https://i.pravatar.cc/150?img=4" },
];

export const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
export const sampleVideoPoster = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";
export const sampleVideoUrl2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
export const sampleVideoPoster2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg";
export const sampleVideoUrl3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
export const sampleVideoPoster3 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg";

export const galleryImages = [
  { src: "https://picsum.photos/seed/g1/600/400", alt: "Mountain landscape", caption: "Mountain Landscape" },
  { src: "https://picsum.photos/seed/g2/600/400", alt: "Ocean waves", caption: "Ocean Waves" },
  { src: "https://picsum.photos/seed/g3/600/400", alt: "Forest trail", caption: "Forest Trail" },
  { src: "https://picsum.photos/seed/g4/600/400", alt: "City skyline", caption: "City Skyline" },
  { src: "https://picsum.photos/seed/g5/600/400", alt: "Desert dunes", caption: "Desert Dunes" },
  { src: "https://picsum.photos/seed/g6/600/400", alt: "Snowy peaks", caption: "Snowy Peaks" },
];
