import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Accordion from "../../../shared/components/navigation/Accordion";
import type { AccordionItemData } from "../../../shared/components/navigation/Accordion";
import DataTable from "../../../shared/components/table/DataTable";
import type { Column } from "../../../shared/components/table/DataTable";
import Badge from "../../../shared/components/badges/Badge";
import Button from "../../../shared/components/buttons/Button";
import InfoItem from "../../../shared/components/cards/InfoItem";
import { productDetail, productExtras } from "../types/productData";
import type { ProductVariant, PriceHistoryEntry, ProductDocument } from "../types/productData";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import BarChartIcon from "../../../assets/icons/BarChartIcon";
import ClipboardIcon from "../../../assets/icons/ClipboardIcon";
import ShieldCheckIcon from "../../../assets/icons/ShieldCheckIcon";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import ChevronsRightIcon from "../../../assets/icons/ChevronsRightIcon";
import MinusIcon from "../../../assets/icons/MinusIcon";

const money = (value: number) => `${value.toLocaleString("en-GB")} ${productDetail.currency}`;

const date = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });

const fileSize = (sizeKb: number) =>
  sizeKb >= 1024
    ? `${(sizeKb / 1024).toLocaleString("en-GB", { maximumFractionDigits: 1 })} MB`
    : `${sizeKb.toLocaleString("en-GB")} KB`;

const ProductExtras = () => {
  const { t } = useTranslation();
  const x = productExtras;

  const [openPanels, setOpenPanels] = useState<string[]>(["specs"]);

  const panelTitle = (icon: React.ReactNode, text: string, count: number) => (
    <span className="flex items-center gap-2 min-w-0">
      <span className="stat-icon-primary shrink-0 w-7 h-7 rounded-lg flex items-center justify-center">
        {icon}
      </span>
      <span className="truncate">{text}</span>
      <Badge variant="secondary" size="sm" pill label={String(count)} />
    </span>
  );

  const variantColumns: Column<ProductVariant>[] = [
    { key: "sku", header: t("productDetails.sku"), sortable: true },
    { key: "color", header: t("productExtras.color"), sortable: true },
    { key: "size", header: t("productExtras.size"), sortable: true },
    {
      key: "stock",
      header: t("productDetails.inStock"),
      sortable: true,
      align: "center",
      render: (row) => (
        <Badge
          variant={row.stock === 0 ? "danger" : row.stock < 25 ? "warning" : "success"}
          size="sm"
          pill
          label={String(row.stock)}
        />
      ),
    },
    {
      key: "price",
      header: t("productDetails.sellPrice"),
      sortable: true,
      align: "right",
      render: (row) => money(row.price),
    },
  ];

  const priceColumns: Column<PriceHistoryEntry>[] = [
    { key: "date", header: t("common.date"), sortable: true, render: (row) => date(row.date) },
    {
      key: "oldPrice",
      header: t("productExtras.oldPrice"),
      sortable: true,
      align: "right",
      render: (row) => money(row.oldPrice),
    },
    {
      key: "newPrice",
      header: t("productExtras.newPrice"),
      sortable: true,
      align: "right",
      render: (row) => money(row.newPrice),
    },
    {
      key: "change",
      header: t("productExtras.change"),
      align: "center",
      sortable: true,
      sortFn: (a, b) =>
        (a.newPrice - a.oldPrice) / a.oldPrice - (b.newPrice - b.oldPrice) / b.oldPrice,
      render: (row) => {
        const diff = row.newPrice - row.oldPrice;
        const percent = Math.round((diff / row.oldPrice) * 1000) / 10;
        return (
          <Badge
            variant={diff > 0 ? "danger" : "success"}
            size="sm"
            pill
            label={`${diff > 0 ? "+" : ""}${percent}%`}
          />
        );
      },
    },
    {
      key: "reason",
      header: t("productExtras.reason"),
      sortable: true,
      render: (row) => t(`productExtras.reasons.${row.reason}`),
    },
  ];

  const documentColumns: Column<ProductDocument>[] = [
    { key: "name", header: t("productExtras.fileName"), sortable: true },
    {
      key: "type",
      header: t("productExtras.fileType"),
      sortable: true,
      align: "center",
      render: (row) => <Badge variant="info" outline size="sm" pill label={row.type} />,
    },
    {
      key: "sizeKb",
      header: t("productExtras.fileSize"),
      sortable: true,
      align: "right",
      render: (row) => fileSize(row.sizeKb),
    },
    {
      key: "uploadedAt",
      header: t("productExtras.uploadedAt"),
      sortable: true,
      render: (row) => date(row.uploadedAt),
    },
  ];

  const specCount = x.specGroups.reduce((sum, group) => sum + group.entries.length, 0);

  const items: AccordionItemData[] = [
    {
      id: "specs",
      title: panelTitle(<SettingsIcon className="w-4 h-4" />, t("productExtras.specifications"), specCount),
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {x.specGroups.map((group) => (
            <div key={group.key} className="ce-panel rounded-xl border ce-divider overflow-hidden">
              <h4 className="ce-panel-heading text-sm font-semibold px-4 py-2.5 border-b ce-divider">
                {t(`productExtras.specGroups.${group.key}`)}
              </h4>
              <dl>
                {group.entries.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex items-center justify-between gap-3 px-4 py-2 border-b ce-divider last:border-b-0"
                  >
                    <dt className="ce-muted text-xs">{t(`productExtras.specs.${entry.label}`)}</dt>
                    <dd className="ce-panel-text text-xs font-medium text-end">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "variants",
      title: panelTitle(<LayersIcon className="w-4 h-4" />, t("productExtras.variants"), x.variants.length),
      content: (
        <DataTable<ProductVariant>
          columns={variantColumns}
          data={x.variants}
          rowKey={(row) => row.id}
          clientSideSorting
          compact
          hoverable
          rounded
        />
      ),
    },
    {
      id: "priceHistory",
      title: panelTitle(<BarChartIcon className="w-4 h-4" />, t("productExtras.priceHistory"), x.priceHistory.length),
      content: (
        <DataTable<PriceHistoryEntry>
          columns={priceColumns}
          data={x.priceHistory}
          rowKey={(row) => row.id}
          clientSideSorting
          compact
          hoverable
          rounded
        />
      ),
    },
    {
      id: "documents",
      title: panelTitle(<ClipboardIcon className="w-4 h-4" />, t("productExtras.documents"), x.documents.length),
      content: (
        <DataTable<ProductDocument>
          columns={documentColumns}
          data={x.documents}
          rowKey={(row) => row.id}
          clientSideSorting
          compact
          hoverable
          rounded
        />
      ),
    },
    {
      id: "compliance",
      title: panelTitle(<ShieldCheckIcon className="w-4 h-4" />, t("productExtras.compliance"), x.certifications.length),
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <InfoItem
              icon={<ShieldCheckIcon className="w-4 h-4" />}
              title={t("productExtras.warranty")}
              value={`${x.warrantyMonths} ${t("productExtras.months")}`}
              description={x.warrantyProvider}
              variant="success"
            />
            <InfoItem
              icon={<GlobeIcon className="w-4 h-4" />}
              title={t("productExtras.countryOfOrigin")}
              value={x.countryOfOrigin}
              variant="info"
            />
            <InfoItem
              icon={<ClipboardIcon className="w-4 h-4" />}
              title={t("productExtras.hsCode")}
              value={x.hsCode}
              variant="secondary"
            />
            <InfoItem
              icon={<BarChartIcon className="w-4 h-4" />}
              title={t("productExtras.customsDuty")}
              value={`${x.customsDutyPercent}%`}
              variant="warning"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {x.certifications.map((cert) => (
              <Badge key={cert} variant="primary" outline size="sm" pill label={cert} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  const allIds = items.map((item) => item.id);
  const allOpen = openPanels.length === allIds.length;

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("productExtras.title")}
      icon={<SettingsIcon className="w-4 h-4" />}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            outline
            size="sm"
            label={t("productExtras.expandAll")}
            icon={<ChevronsRightIcon className="w-4 h-4 rotate-90" />}
            iconPosition="left"
            disabled={allOpen}
            onClick={() => setOpenPanels(allIds)}
          />
          <Button
            variant="secondary"
            outline
            size="sm"
            label={t("productExtras.collapseAll")}
            icon={<MinusIcon className="w-4 h-4" />}
            iconPosition="left"
            disabled={openPanels.length === 0}
            onClick={() => setOpenPanels([])}
          />
        </div>
      }
    >
      <Accordion
        items={items}
        variant="separated"
        multiple
        open={openPanels}
        onChange={setOpenPanels}
      />
    </Card>
  );
};

export default ProductExtras;
