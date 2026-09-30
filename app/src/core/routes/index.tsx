import { lazy } from "react";
import { UserRole } from "../../features/auth/types/Roles.types";

const Home = lazy(() => import("../../features/authGallery/pages/HomePage"));
 
const Login = lazy(() => import("../../features/auth/pages/Login"));
const SimpleLogin = lazy(() => import("../../features/auth/pages/login/SimpleLogin"));
const TwoSideLogin = lazy(() => import("../../features/auth/pages/login/TwoSideLogin"));
const CarouselLogin = lazy(() => import("../../features/auth/pages/login/CarouselLogin"));
const FullPageLogin = lazy(() => import("../../features/auth/pages/login/FullPageLogin"));
const ModernLogin = lazy(() => import("../../features/auth/pages/login/ModernLogin"));
const MinimalLogin = lazy(() => import("../../features/auth/pages/login/MinimalLogin"));
const CardCarouselLogin = lazy(() => import("../../features/auth/pages/login/CardCarouselLogin"));
const CardTwoSideLogin = lazy(() => import("../../features/auth/pages/login/CardTwoSideLogin"));
const ImageTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ImageTwoSideLogin"));
const ImageCardTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ImageCardTwoSideLogin"));
const ImageCarouselLogin = lazy(() => import("../../features/auth/pages/login/ImageCarouselLogin"));
const ImageCardCarouselLogin = lazy(() => import("../../features/auth/pages/login/ImageCardCarouselLogin"));

// Modern Login Variants
const ModernSimpleLogin = lazy(() => import("../../features/auth/pages/login/ModernSimpleLogin"));
const ModernMinimalLogin = lazy(() => import("../../features/auth/pages/login/ModernMinimalLogin"));
const ModernTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ModernTwoSideLogin"));
const ModernFullPageLogin = lazy(() => import("../../features/auth/pages/login/ModernFullPageLogin"));
const ModernCarouselLogin = lazy(() => import("../../features/auth/pages/login/ModernCarouselLogin"));
const ModernCardTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ModernCardTwoSideLogin"));
const ModernImageTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ModernImageTwoSideLogin"));
const ModernImageCardTwoSideLogin = lazy(() => import("../../features/auth/pages/login/ModernImageCardTwoSideLogin"));
const ModernCardCarouselLogin = lazy(() => import("../../features/auth/pages/login/ModernCardCarouselLogin"));
const ModernImageCarouselLogin = lazy(() => import("../../features/auth/pages/login/ModernImageCarouselLogin"));
const ModernImageCardCarouselLogin = lazy(() => import("../../features/auth/pages/login/ModernImageCardCarouselLogin"));

const SimpleForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/SimpleForgotPassword"));
const ModernForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernForgotPassword"));
const MinimalForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/MinimalForgotPassword"));
const TwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/TwoSideForgotPassword"));
const CardTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/CardTwoSideForgotPassword"));
const ImageTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ImageTwoSideForgotPassword"));
const ImageCardTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ImageCardTwoSideForgotPassword"));
const FullPageForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/FullPageForgotPassword"));
const CarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/CarouselForgotPassword"));
const CardCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/CardCarouselForgotPassword"));
const ImageCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ImageCarouselForgotPassword"));
const ImageCardCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ImageCardCarouselForgotPassword"));

// Modern Forgot Password Variants
const ModernSimpleForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernSimpleForgotPassword"));
const ModernMinimalForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernMinimalForgotPassword"));
const ModernTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernTwoSideForgotPassword"));
const ModernFullPageForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernFullPageForgotPassword"));
const ModernCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernCarouselForgotPassword"));
const ModernCardTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernCardTwoSideForgotPassword"));
const ModernImageTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernImageTwoSideForgotPassword"));
const ModernImageCardTwoSideForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernImageCardTwoSideForgotPassword"));
const ModernCardCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernCardCarouselForgotPassword"));
const ModernImageCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernImageCarouselForgotPassword"));
const ModernImageCardCarouselForgotPassword = lazy(() => import("../../features/auth/pages/forgot-password/ModernImageCardCarouselForgotPassword"));

// Register variants
const CardCarouselRegister = lazy(() => import("../../features/auth/pages/register/CardCarouselRegister"));
const CardTwoSideRegister = lazy(() => import("../../features/auth/pages/register/CardTwoSideRegister"));
const CarouselRegister = lazy(() => import("../../features/auth/pages/register/CarouselRegister"));
const FullPageRegister = lazy(() => import("../../features/auth/pages/register/FullPageRegister"));
const ImageCardCarouselRegister = lazy(() => import("../../features/auth/pages/register/ImageCardCarouselRegister"));
const ImageCardTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ImageCardTwoSideRegister"));
const ImageCarouselRegister = lazy(() => import("../../features/auth/pages/register/ImageCarouselRegister"));
const ImageTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ImageTwoSideRegister"));
const MinimalRegister = lazy(() => import("../../features/auth/pages/register/MinimalRegister"));
const ModernRegister = lazy(() => import("../../features/auth/pages/register/ModernRegister"));
const ModernCardCarouselRegister = lazy(() => import("../../features/auth/pages/register/ModernCardCarouselRegister"));
const ModernCardTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ModernCardTwoSideRegister"));
const ModernCarouselRegister = lazy(() => import("../../features/auth/pages/register/ModernCarouselRegister"));
const ModernFullPageRegister = lazy(() => import("../../features/auth/pages/register/ModernFullPageRegister"));
const ModernImageCardCarouselRegister = lazy(() => import("../../features/auth/pages/register/ModernImageCardCarouselRegister"));
const ModernImageCardTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ModernImageCardTwoSideRegister"));
const ModernImageCarouselRegister = lazy(() => import("../../features/auth/pages/register/ModernImageCarouselRegister"));
const ModernImageTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ModernImageTwoSideRegister"));
const ModernMinimalRegister = lazy(() => import("../../features/auth/pages/register/ModernMinimalRegister"));
const ModernSimpleRegister = lazy(() => import("../../features/auth/pages/register/ModernSimpleRegister"));
const ModernTwoSideRegister = lazy(() => import("../../features/auth/pages/register/ModernTwoSideRegister"));
const SimpleRegister = lazy(() => import("../../features/auth/pages/register/SimpleRegister"));
const TwoSideRegister = lazy(() => import("../../features/auth/pages/register/TwoSideRegister"));

const SimpleOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/SimpleOtpLogin"));
const ModernOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernOtpLogin"));
const MinimalOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/MinimalOtpLogin"));
const TwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/TwoSideOtpLogin"));
const CardTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/CardTwoSideOtpLogin"));
const ImageTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ImageTwoSideOtpLogin"));
const ImageCardTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ImageCardTwoSideOtpLogin"));
const FullPageOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/FullPageOtpLogin"));
const CarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/CarouselOtpLogin"));
const CardCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/CardCarouselOtpLogin"));
const ImageCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ImageCarouselOtpLogin"));
const ImageCardCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ImageCardCarouselOtpLogin"));

// Modern OTP Login Variants
const ModernSimpleOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernSimpleOtpLogin"));
const ModernMinimalOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernMinimalOtpLogin"));
const ModernTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernTwoSideOtpLogin"));
const ModernFullPageOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernFullPageOtpLogin"));
const ModernCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernCarouselOtpLogin"));
const ModernCardTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernCardTwoSideOtpLogin"));
const ModernImageTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernImageTwoSideOtpLogin"));
const ModernImageCardTwoSideOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernImageCardTwoSideOtpLogin"));
const ModernCardCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernCardCarouselOtpLogin"));
const ModernImageCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernImageCarouselOtpLogin"));
const ModernImageCardCarouselOtpLogin = lazy(() => import("../../features/auth/pages/otp-login/ModernImageCardCarouselOtpLogin"));

const NotFound = lazy(() => import("../../features/exceptions/pages/NotFound"));
const ServerError = lazy(() => import("../../features/exceptions/pages/ServerError"));
const ComponentExamples = lazy(() => import("../../features/showcase/pages/ComponentExamplesPage"));
const ComponentShowcase = lazy(() => import("../../features/showcase/pages/ComponentShowcasePage"));
const CategoriesExample1 = lazy(() => import("../../features/categoriesExample/pages/example1/CategoriesExample1"));
const CategoriesExample2 = lazy(() => import("../../features/categoriesExample/pages/example2/CategoriesExample2"));
const CategoriesExample3 = lazy(() => import("../../features/categoriesExample/pages/example3/CategoriesExample3"));
const CategoryFormPage = lazy(() => import("../../features/categoriesExample/pages/example3/CategoryFormPage"));
const TestTrExample1 = lazy(() => import("../../features/testTrExample/pages/example1/TestTrExample1"));
const TestTrExample2 = lazy(() => import("../../features/testTrExample/pages/example2/TestTrExample2"));
const TestTrExample3 = lazy(() => import("../../features/testTrExample/pages/example3/TestTrExample3"));
const TestTrFormPage = lazy(() => import("../../features/testTrExample/pages/example3/TestTrFormPage"));
const TestSubTrExample1 = lazy(() => import("../../features/testSubTrExample/pages/TestSubTrExample1"));
const CustomerStepperExample = lazy(() => import("../../features/stepperExample/pages/CustomerStepperExamplePage"));
const ProductDetails = lazy(() => import("../../features/productDetails/pages/ProductDetailsPage"));
const AccountsExample = lazy(() => import("../../features/accountsExample/pages/AccountsExamplePage"));
const ProfileExample = lazy(() => import("../../features/profileExample/pages/ProfileExamplePage"));
const PublicCard = lazy(() => import("../../features/publicCard/pages/PublicCardPage"));
const TicketList = lazy(() => import("../../features/ticketExample/pages/TicketList"));
const TicketDetails = lazy(() => import("../../features/ticketExample/pages/TicketDetails"));
const InvoiceExample = lazy(() => import("../../features/invoiceExample/pages/InvoiceExamplePage"));

const Dashboard = lazy(() => import("../../features/dashboard/pages/DashboardPage"));
const Profile = lazy(() => import("../../features/profile/pages/ProfilePage"));
const Users = lazy(() => import("../../features/users/pages/UsersPage"));
const AuditLogs = lazy(() => import("../../features/auditLogs/pages/AuditLogsPage"));
const Payments = lazy(() => import("../../features/payments/pages/PaymentsPage"));

const dashboardRoutes: any = [
  {
    path: "/users",
    name: "Users",
    element: <Users />,
    allowedRoles: [UserRole.SuperAdmin],
  },
  {
    path: "/audit-logs",
    name: "Audit Logs",
    element: <AuditLogs />,
    allowedRoles: [UserRole.SuperAdmin],
  },
  {
    path: "/payments",
    name: "Payments",
    element: <Payments />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/profile",
    name: "Profile",
    element: <Profile />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
];

const categoryRoutes: any = [
  {
    path: "/categories-example",
    name: "Categories Example",
    element: <CategoriesExample1 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/categories-example-2",
    name: "Categories Example 2",
    element: <CategoriesExample2 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/categories-example-3",
    name: "Categories Example 3",
    element: <CategoriesExample3 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/categories-example-3/add",
    name: "Add Category",
    element: <CategoryFormPage />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/categories-example-3/edit/:id",
    name: "Edit Category",
    element: <CategoryFormPage />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
];

const testTrRoutes: any = [
  {
    path: "/test-tr-example-1",
    name: "Test TR Example 1",
    element: <TestTrExample1 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/test-tr-example-2",
    name: "Test TR Example 2",
    element: <TestTrExample2 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/test-tr-example-3",
    name: "Test TR Example 3",
    element: <TestTrExample3 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/test-tr-example-3/add",
    name: "Add Test TR",
    element: <TestTrFormPage />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/test-tr-example-3/edit/:id",
    name: "Edit Test TR",
    element: <TestTrFormPage />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/test-sub-tr-example-1",
    name: "Test Sub TR Example 1",
    element: <TestSubTrExample1 />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
];

const exampleRoutes: any = [
  {
    path: "/profile-example",
    name: "Profile Example",
    element: <ProfileExample />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/ticket-example",
    name: "Ticket Example",
    element: <TicketList />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/ticket-example/:id",
    name: "Ticket Details",
    element: <TicketDetails />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/invoice-example",
    name: "Invoice Example",
    element: <InvoiceExample />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/stepper-example",
    name: "Customer Stepper Example",
    element: <CustomerStepperExample />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/product-details",
    name: "Product Details",
    element: <ProductDetails />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
  {
    path: "/accounts-example",
    name: "Chart of Accounts",
    element: <AccountsExample />,
    allowedRoles: [UserRole.SuperAdmin, UserRole.Admin, UserRole.User],
  },
];

const reportsRoutes: any = [];

const authRoutes: any = [
  {
    path: "/home",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/login",
    name: "Simple Login",
    element: <SimpleLogin />,
  },
  {
    path: "/login/simple",
    name: "Simple Login",
    element: <SimpleLogin />,
  },
  {
    path: "/login/two-side",
    name: "Two Side Login",
    element: <TwoSideLogin />,
  },
  {
    path: "/login/carousel",
    name: "Carousel Login",
    element: <CarouselLogin />,
  },
  {
    path: "/login/full-page",
    name: "Full Page Login",
    element: <FullPageLogin />,
  },
  {
    path: "/login/modern",
    name: "Modern Login",
    element: <ModernLogin />,
  },
  {
    path: "/login/minimal",
    name: "Minimal Login",
    element: <MinimalLogin />,
  },
  {
    path: "/login/card-carousel",
    name: "Card Carousel Login",
    element: <CardCarouselLogin />,
  },
  {
    path: "/login/card-two-side",
    name: "Card Two Side Login",
    element: <CardTwoSideLogin />,
  },
  {
    path: "/login/image-two-side",
    name: "Image Two Side Login",
    element: <ImageTwoSideLogin />,
  },
  {
    path: "/login/image-card-two-side",
    name: "Image Card Two Side Login",
    element: <ImageCardTwoSideLogin />,
  },
  {
    path: "/login/image-carousel",
    name: "Image Carousel Login",
    element: <ImageCarouselLogin />,
  },
  {
    path: "/login/image-card-carousel",
    name: "Image Card Carousel Login",
    element: <ImageCardCarouselLogin />,
  },
  {
    path: "/login/modern-simple",
    name: "Modern Simple Login",
    element: <ModernSimpleLogin />,
  },
  {
    path: "/login/modern-minimal",
    name: "Modern Minimal Login",
    element: <ModernMinimalLogin />,
  },
  {
    path: "/login/modern-two-side",
    name: "Modern Two Side Login",
    element: <ModernTwoSideLogin />,
  },
  {
    path: "/login/modern-full-page",
    name: "Modern Full Page Login",
    element: <ModernFullPageLogin />,
  },
  {
    path: "/login/modern-carousel",
    name: "Modern Carousel Login",
    element: <ModernCarouselLogin />,
  },
  {
    path: "/login/modern-card-two-side",
    name: "Modern Card Two Side Login",
    element: <ModernCardTwoSideLogin />,
  },
  {
    path: "/login/modern-image-two-side",
    name: "Modern Image Two Side Login",
    element: <ModernImageTwoSideLogin />,
  },
  {
    path: "/login/modern-image-card-two-side",
    name: "Modern Image Card Two Side Login",
    element: <ModernImageCardTwoSideLogin />,
  },
  {
    path: "/login/modern-card-carousel",
    name: "Modern Card Carousel Login",
    element: <ModernCardCarouselLogin />,
  },
  {
    path: "/login/modern-image-carousel",
    name: "Modern Image Carousel Login",
    element: <ModernImageCarouselLogin />,
  },
  {
    path: "/login/modern-image-card-carousel",
    name: "Modern Image Card Carousel Login",
    element: <ModernImageCardCarouselLogin />,
  },
  {
    path: "/otp-login",
    name: "Simple OTP Login",
    element: <SimpleOtpLogin />,
  },
  {
    path: "/otp-login/simple",
    name: "Simple OTP Login",
    element: <SimpleOtpLogin />,
  },
  {
    path: "/otp-login/modern",
    name: "Modern OTP Login",
    element: <ModernOtpLogin />,
  },
  {
    path: "/otp-login/minimal",
    name: "Minimal OTP Login",
    element: <MinimalOtpLogin />,
  },
  {
    path: "/otp-login/two-side",
    name: "Two Side OTP Login",
    element: <TwoSideOtpLogin />,
  },
  {
    path: "/otp-login/card-two-side",
    name: "Card Two Side OTP Login",
    element: <CardTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/image-two-side",
    name: "Image Two Side OTP Login",
    element: <ImageTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/image-card-two-side",
    name: "Image Card Two Side OTP Login",
    element: <ImageCardTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/full-page",
    name: "Full Page OTP Login",
    element: <FullPageOtpLogin />,
  },
  {
    path: "/otp-login/carousel",
    name: "Carousel OTP Login",
    element: <CarouselOtpLogin />,
  },
  {
    path: "/otp-login/card-carousel",
    name: "Card Carousel OTP Login",
    element: <CardCarouselOtpLogin />,
  },
  {
    path: "/otp-login/image-carousel",
    name: "Image Carousel OTP Login",
    element: <ImageCarouselOtpLogin />,
  },
  {
    path: "/otp-login/image-card-carousel",
    name: "Image Card Carousel OTP Login",
    element: <ImageCardCarouselOtpLogin />,
  },
  {
    path: "/otp-login/modern-simple",
    name: "Modern Simple OTP Login",
    element: <ModernSimpleOtpLogin />,
  },
  {
    path: "/otp-login/modern-minimal",
    name: "Modern Minimal OTP Login",
    element: <ModernMinimalOtpLogin />,
  },
  {
    path: "/otp-login/modern-two-side",
    name: "Modern Two Side OTP Login",
    element: <ModernTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/modern-full-page",
    name: "Modern Full Page OTP Login",
    element: <ModernFullPageOtpLogin />,
  },
  {
    path: "/otp-login/modern-carousel",
    name: "Modern Carousel OTP Login",
    element: <ModernCarouselOtpLogin />,
  },
  {
    path: "/otp-login/modern-card-two-side",
    name: "Modern Card Two Side OTP Login",
    element: <ModernCardTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/modern-image-two-side",
    name: "Modern Image Two Side OTP Login",
    element: <ModernImageTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/modern-image-card-two-side",
    name: "Modern Image Card Two Side OTP Login",
    element: <ModernImageCardTwoSideOtpLogin />,
  },
  {
    path: "/otp-login/modern-card-carousel",
    name: "Modern Card Carousel OTP Login",
    element: <ModernCardCarouselOtpLogin />,
  },
  {
    path: "/otp-login/modern-image-carousel",
    name: "Modern Image Carousel OTP Login",
    element: <ModernImageCarouselOtpLogin />,
  },
  {
    path: "/otp-login/modern-image-card-carousel",
    name: "Modern Image Card Carousel OTP Login",
    element: <ModernImageCardCarouselOtpLogin />,
  },
  {
    path: "/register",
    name: "Simple Register",
    element: <SimpleRegister />,
  },
  {
    path: "/register/card-carousel",
    name: "Card Carousel Register",
    element: <CardCarouselRegister />,
  },
  {
    path: "/register/card-two-side",
    name: "Card Two Side Register",
    element: <CardTwoSideRegister />,
  },
  {
    path: "/register/carousel",
    name: "Carousel Register",
    element: <CarouselRegister />,
  },
  {
    path: "/register/full-page",
    name: "Full Page Register",
    element: <FullPageRegister />,
  },
  {
    path: "/register/image-card-carousel",
    name: "Image Card Carousel Register",
    element: <ImageCardCarouselRegister />,
  },
  {
    path: "/register/image-card-two-side",
    name: "Image Card Two Side Register",
    element: <ImageCardTwoSideRegister />,
  },
  {
    path: "/register/image-carousel",
    name: "Image Carousel Register",
    element: <ImageCarouselRegister />,
  },
  {
    path: "/register/image-two-side",
    name: "Image Two Side Register",
    element: <ImageTwoSideRegister />,
  },
  {
    path: "/register/minimal",
    name: "Minimal Register",
    element: <MinimalRegister />,
  },
  {
    path: "/register/modern",
    name: "Modern Register",
    element: <ModernRegister />,
  },
  {
    path: "/register/modern-card-carousel",
    name: "Modern Card Carousel Register",
    element: <ModernCardCarouselRegister />,
  },
  {
    path: "/register/modern-card-two-side",
    name: "Modern Card Two Side Register",
    element: <ModernCardTwoSideRegister />,
  },
  {
    path: "/register/modern-carousel",
    name: "Modern Carousel Register",
    element: <ModernCarouselRegister />,
  },
  {
    path: "/register/modern-full-page",
    name: "Modern Full Page Register",
    element: <ModernFullPageRegister />,
  },
  {
    path: "/register/modern-image-card-carousel",
    name: "Modern Image Card Carousel Register",
    element: <ModernImageCardCarouselRegister />,
  },
  {
    path: "/register/modern-image-card-two-side",
    name: "Modern Image Card Two Side Register",
    element: <ModernImageCardTwoSideRegister />,
  },
  {
    path: "/register/modern-image-carousel",
    name: "Modern Image Carousel Register",
    element: <ModernImageCarouselRegister />,
  },
  {
    path: "/register/modern-image-two-side",
    name: "Modern Image Two Side Register",
    element: <ModernImageTwoSideRegister />,
  },
  {
    path: "/register/modern-minimal",
    name: "Modern Minimal Register",
    element: <ModernMinimalRegister />,
  },
  {
    path: "/register/modern-simple",
    name: "Modern Simple Register",
    element: <ModernSimpleRegister />,
  },
  {
    path: "/register/modern-two-side",
    name: "Modern Two Side Register",
    element: <ModernTwoSideRegister />,
  },
  {
    path: "/register/simple",
    name: "Simple Register",
    element: <SimpleRegister />,
  },
  {
    path: "/register/two-side",
    name: "Two Side Register",
    element: <TwoSideRegister />,
  },
  {
    path: "/forgot-password",
    name: "Simple Forgot Password",
    element: <SimpleForgotPassword />,
  },
  {
    path: "/forgot-password/simple",
    name: "Simple Forgot Password",
    element: <SimpleForgotPassword />,
  },
  {
    path: "/forgot-password/modern",
    name: "Modern Forgot Password",
    element: <ModernForgotPassword />,
  },
  {
    path: "/forgot-password/minimal",
    name: "Minimal Forgot Password",
    element: <MinimalForgotPassword />,
  },
  {
    path: "/forgot-password/two-side",
    name: "Two Side Forgot Password",
    element: <TwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/card-two-side",
    name: "Card Two Side Forgot Password",
    element: <CardTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/image-two-side",
    name: "Image Two Side Forgot Password",
    element: <ImageTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/image-card-two-side",
    name: "Image Card Two Side Forgot Password",
    element: <ImageCardTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/full-page",
    name: "Full Page Forgot Password",
    element: <FullPageForgotPassword />,
  },
  {
    path: "/forgot-password/carousel",
    name: "Carousel Forgot Password",
    element: <CarouselForgotPassword />,
  },
  {
    path: "/forgot-password/card-carousel",
    name: "Card Carousel Forgot Password",
    element: <CardCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/image-carousel",
    name: "Image Carousel Forgot Password",
    element: <ImageCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/image-card-carousel",
    name: "Image Card Carousel Forgot Password",
    element: <ImageCardCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/modern-simple",
    name: "Modern Simple Forgot Password",
    element: <ModernSimpleForgotPassword />,
  },
  {
    path: "/forgot-password/modern-minimal",
    name: "Modern Minimal Forgot Password",
    element: <ModernMinimalForgotPassword />,
  },
  {
    path: "/forgot-password/modern-two-side",
    name: "Modern Two Side Forgot Password",
    element: <ModernTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/modern-full-page",
    name: "Modern Full Page Forgot Password",
    element: <ModernFullPageForgotPassword />,
  },
  {
    path: "/forgot-password/modern-carousel",
    name: "Modern Carousel Forgot Password",
    element: <ModernCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/modern-card-two-side",
    name: "Modern Card Two Side Forgot Password",
    element: <ModernCardTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/modern-image-two-side",
    name: "Modern Image Two Side Forgot Password",
    element: <ModernImageTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/modern-image-card-two-side",
    name: "Modern Image Card Two Side Forgot Password",
    element: <ModernImageCardTwoSideForgotPassword />,
  },
  {
    path: "/forgot-password/modern-card-carousel",
    name: "Modern Card Carousel Forgot Password",
    element: <ModernCardCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/modern-image-carousel",
    name: "Modern Image Carousel Forgot Password",
    element: <ModernImageCarouselForgotPassword />,
  },
  {
    path: "/forgot-password/modern-image-card-carousel",
    name: "Modern Image Card Carousel Forgot Password",
    element: <ModernImageCardCarouselForgotPassword />,
  },
  {
    path: "/components",
    name: "Component Examples",
    element: <ComponentExamples />,
  },
  {
    path: "/showcase",
    name: "Component Showcase",
    element: <ComponentShowcase />,
  },
  {
    path: "/card/:id",
    name: "Employee Card",
    element: <PublicCard />,
  },
  {
    path: "/404",
    name: "Not Found",
    element: <NotFound />,
  },
  {
    path: "/500",
    name: "Server Error",
    element: <ServerError />,
  },
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
  },
];

const allAdminRoutes = [...dashboardRoutes, ...categoryRoutes, ...testTrRoutes, ...exampleRoutes, ...reportsRoutes];
const allBlankRoutes = [...authRoutes];

export { allAdminRoutes, allBlankRoutes };
