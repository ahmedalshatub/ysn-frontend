import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import Tabs from "../../../shared/components/navigation/Tabs";
import ProfileHeader from "../components/ProfileHeader";
import InvoicesTab from "../components/InvoicesTab";
import QuotationsTab from "../components/QuotationsTab";
import AttachmentsTab from "../components/AttachmentsTab";
import ReportsTab from "../components/ReportsTab";
import ChartsTab from "../components/ChartsTab";
import GalleryTab from "../components/GalleryTab";
import CarouselTab from "../components/CarouselTab";
import {
  mockClient,
  mockInvoices,
  mockQuotations,
  mockAttachments,
  mockReports,
} from "../types/profileData";
import HomeIcon from "../../../assets/icons/HomeIcon";
import UserIcon from "../../../assets/icons/UserIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import GalleryIcon from "../../../assets/icons/GalleryIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import BarChartIcon from "../../../assets/icons/BarChartIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";

const ProfileExample = () => {
  const { t } = useTranslation();
  useTitle(t("profileExample.pageTitle"));

  const tabs = [
    {
      id: "invoices",
      label: t("profileExample.invoicesTab"),
      icon: <FileTextIcon className="w-4 h-4" />,
      badge: mockInvoices.length,
      content: <InvoicesTab invoices={mockInvoices} />,
    },
    {
      id: "quotations",
      label: t("profileExample.quotationsTab"),
      icon: <CheckCircleIcon className="w-4 h-4" />,
      badge: mockQuotations.length,
      content: <QuotationsTab quotations={mockQuotations} />,
    },
    {
      id: "attachments",
      label: t("profileExample.filesTab"),
      icon: <ClipboardIcon className="w-4 h-4" />,
      badge: mockAttachments.length,
      content: <AttachmentsTab attachments={mockAttachments} />,
    },
    {
      id: "reports",
      label: t("profileExample.reportsTab"),
      icon: <LayersIcon className="w-4 h-4" />,
      badge: mockReports.length,
      content: <ReportsTab reports={mockReports} />,
    },
    {
      id: "charts",
      label: t("profileExample.chartsTab"),
      icon: <BarChartIcon className="w-4 h-4" />,
      content: <ChartsTab />,
    },
    {
      id: "gallery",
      label: t("profileExample.imagesTab"),
      icon: <ImageIcon className="w-4 h-4" />,
      content: <GalleryTab />,
    },
    {
      id: "carousel",
      label: t("profileExample.carouselTab"),
      icon: <GalleryIcon className="w-4 h-4" />,
      content: <CarouselTab />,
    },
  ];

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("profileExample.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("profileExample.pageTitle")}
        subtitle={mockClient.company}
        items={breadcrumbItems}
        variant="gradient"
        icon={<UserIcon />}
        showDate
        animated
      />

      <ProfileHeader client={mockClient} />

      <Card variant="elevated" padding="md">
        <Tabs tabs={tabs} variant="pills" color="primary" animated />
      </Card>
    </div>
  );
};

export default ProfileExample;
