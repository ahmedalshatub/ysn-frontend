import React from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import Card from "../../../shared/components/cards/Card";
import StatCard from "../../../shared/components/cards/StatCard";
import InfoItem from "../../../shared/components/cards/InfoItem";
import Badge from "../../../shared/components/badges/Badge";
import ProductExtras from "../components/ProductExtras";
import { productDetail } from "../types/productData";
import HomeIcon from "../../../assets/icons/HomeIcon";
import PackageIcon from "../../../assets/icons/PackageIcon";
import ShoppingCartIcon from "../../../assets/icons/ShoppingCartIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import FolderIcon from "../../../assets/icons/FolderIcon";
import ShieldIcon from "../../../assets/icons/ShieldIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import ZapIcon from "../../../assets/icons/ZapIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import ServerIcon from "../../../assets/icons/ServerIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import ColumnsIcon from "../../../assets/icons/ColumnsIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import HelpCircleIcon from "../../../assets/icons/HelpCircleIcon";

const money = (value: number, currency: string) => `${value.toLocaleString("en-GB")} ${currency}`;

const dateTime = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

interface Section {
  key: string;
  title: string;
  icon: React.ReactNode;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    value: React.ReactNode;
    description?: string;
    variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
  }>;
}

const ProductDetails = () => {
  const { t } = useTranslation();
  useTitle(t("productDetails.title"));

  const p = productDetail;
  const lowStock = p.inStock <= p.reorderLevel;
  const statusVariant =
    p.status === "active" ? "success" : p.status === "draft" ? "warning" : "danger";

  const sections: Section[] = [
    {
      key: "general",
      title: t("productDetails.general"),
      icon: <InfoIcon className="w-4 h-4" />,
      items: [
        { icon: <ClipboardIcon className="w-4 h-4" />, title: t("productDetails.sku"), value: p.sku },
        { icon: <ColumnsIcon className="w-4 h-4" />, title: t("productDetails.barcode"), value: p.barcode },
        { icon: <FolderIcon className="w-4 h-4" />, title: t("productDetails.category"), value: p.category },
        { icon: <ShieldIcon className="w-4 h-4" />, title: t("productDetails.brand"), value: p.brand },
        {
          icon: <RefreshCwIcon className="w-4 h-4" />,
          title: t("common.status"),
          variant: statusVariant,
          value: (
            <Badge variant={statusVariant} size="sm" pill label={t(`productDetails.status_${p.status}`)} />
          ),
        },
        {
          icon: <CalendarIcon className="w-4 h-4" />,
          title: t("common.createdAt"),
          value: dateTime(p.createdAt),
          variant: "secondary",
        },
      ],
    },
    {
      key: "pricing",
      title: t("productDetails.pricing"),
      icon: <ZapIcon className="w-4 h-4" />,
      items: [
        {
          icon: <ZapIcon className="w-4 h-4" />,
          title: t("productDetails.costPrice"),
          value: money(p.costPrice, p.currency),
          variant: "secondary",
        },
        {
          icon: <ZapIcon className="w-4 h-4" />,
          title: t("productDetails.sellPrice"),
          value: money(p.sellPrice, p.currency),
        },
        {
          icon: <HelpCircleIcon className="w-4 h-4" />,
          title: t("productDetails.discount"),
          value: `${p.discountPercent}%`,
          variant: "warning",
        },
        {
          icon: <HelpCircleIcon className="w-4 h-4" />,
          title: t("productDetails.tax"),
          value: `${p.taxPercent}%`,
          variant: "info",
        },
        {
          icon: <HelpCircleIcon className="w-4 h-4" />,
          title: t("productDetails.margin"),
          value: `${Math.round(((p.sellPrice - p.costPrice) / p.sellPrice) * 100)}%`,
          description: t("productDetails.marginHint"),
          variant: "success",
        },
      ],
    },
    {
      key: "inventory",
      title: t("productDetails.inventory"),
      icon: <PackageIcon className="w-4 h-4" />,
      items: [
        {
          icon: <PackageIcon className="w-4 h-4" />,
          title: t("productDetails.inStock"),
          value: `${p.inStock} ${p.unit}`,
          variant: lowStock ? "danger" : "success",
        },
        {
          icon: <LockIcon className="w-4 h-4" />,
          title: t("productDetails.reserved"),
          value: `${p.reserved} ${p.unit}`,
          variant: "secondary",
        },
        {
          icon: <AlertIcon className="w-4 h-4" />,
          title: t("productDetails.reorderLevel"),
          value: `${p.reorderLevel} ${p.unit}`,
          description: lowStock ? t("productDetails.reorderNow") : undefined,
          variant: lowStock ? "danger" : "warning",
        },
        {
          icon: <ServerIcon className="w-4 h-4" />,
          title: t("productDetails.warehouse"),
          value: p.warehouse,
          variant: "info",
        },
        {
          icon: <GlobeIcon className="w-4 h-4" />,
          title: t("productDetails.shelf"),
          value: p.shelf,
          variant: "secondary",
        },
      ],
    },
    {
      key: "shipping",
      title: t("productDetails.shipping"),
      icon: <LayersIcon className="w-4 h-4" />,
      items: [
        {
          icon: <ColumnsIcon className="w-4 h-4" />,
          title: t("productDetails.weight"),
          value: `${p.weightKg} kg`,
        },
        {
          icon: <ColumnsIcon className="w-4 h-4" />,
          title: t("productDetails.dimensions"),
          value: `${p.lengthCm} x ${p.widthCm} x ${p.heightCm} cm`,
          variant: "info",
        },
        {
          icon: <LayersIcon className="w-4 h-4" />,
          title: t("productDetails.shippingClass"),
          value: p.shippingClass,
          variant: "warning",
        },
      ],
    },
    {
      key: "supplier",
      title: t("productDetails.supplier"),
      icon: <UsersIcon className="w-4 h-4" />,
      items: [
        {
          icon: <UsersIcon className="w-4 h-4" />,
          title: t("productDetails.supplierName"),
          value: p.supplierName,
        },
        {
          icon: <HelpCircleIcon className="w-4 h-4" />,
          title: t("common.phone"),
          value: p.supplierPhone,
          variant: "info",
        },
        {
          icon: <MailIcon className="w-4 h-4" />,
          title: t("common.email"),
          value: p.supplierEmail,
          variant: "secondary",
        },
        {
          icon: <CalendarIcon className="w-4 h-4" />,
          title: t("productDetails.leadTime"),
          value: `${p.leadTimeDays} ${t("productDetails.days")}`,
          variant: "warning",
        },
      ],
    },
  ];

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("productDetails.title") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={p.name}
        subtitle={`${p.brand} · ${p.sku}`}
        items={breadcrumbItems}
        variant="gradient"
        icon={<PackageIcon />}
        showDate
        animated
        actions={
          <Badge
            variant={statusVariant}
            size="md"
            pill
            label={t(`productDetails.status_${p.status}`)}
          />
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title={t("productDetails.sellPrice")}
          value={money(p.sellPrice, p.currency)}
          icon={<ZapIcon className="w-5 h-5" />}
          variant="primary"
          subtitle={`${t("productDetails.discount")} ${p.discountPercent}%`}
        />
        <StatCard
          title={t("productDetails.inStock")}
          value={`${p.inStock} ${p.unit}`}
          icon={<PackageIcon className="w-5 h-5" />}
          variant={lowStock ? "danger" : "success"}
          subtitle={`${t("productDetails.reserved")}: ${p.reserved}`}
        />
        <StatCard
          title={t("productDetails.unitsSold")}
          value={p.unitsSold.toLocaleString("en-GB")}
          icon={<ShoppingCartIcon className="w-5 h-5" />}
          variant="info"
          subtitle={`${t("productDetails.returns")} ${p.returnsPercent}%`}
        />
        <StatCard
          title={t("productDetails.rating")}
          value={`${p.rating} / 5`}
          icon={<StarIcon className="w-5 h-5" />}
          variant="warning"
          subtitle={`${p.reviews} ${t("productDetails.reviews")}`}
        />
      </div>

      <Card variant="elevated" padding="md" title={t("productDetails.description")}>
        <p className="ce-text text-sm leading-relaxed">{p.description}</p>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card
            key={section.key}
            variant="elevated"
            padding="md"
            title={section.title}
            icon={section.icon}
            fullHeight
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                <InfoItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  description={item.description}
                  variant={item.variant}
                />
              ))}
            </div>
          </Card>
        ))}

        <Card
          variant="elevated"
          padding="md"
          title={t("productDetails.activity")}
          icon={<RefreshCwIcon className="w-4 h-4" />}
          fullHeight
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoItem
              icon={<Undo2Icon className="w-4 h-4" />}
              title={t("productDetails.returns")}
              value={`${p.returnsPercent}%`}
              variant="danger"
            />
            <InfoItem
              icon={<StarIcon className="w-4 h-4" />}
              title={t("productDetails.reviews")}
              value={p.reviews}
              variant="info"
            />
            <InfoItem
              icon={<RefreshCwIcon className="w-4 h-4" />}
              title={t("productDetails.updatedAt")}
              value={dateTime(p.updatedAt)}
              variant="secondary"
            />
          </div>
        </Card>
      </div>

      <ProductExtras />
    </div>
  );
};

export default ProductDetails;
