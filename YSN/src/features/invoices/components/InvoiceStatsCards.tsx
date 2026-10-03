import { useTranslation } from "react-i18next";
import MiniStatCard from "../../../shared/components/cards/MiniStatCard";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import FileTextIcon from "../../../assets/icons/FileTextIcon";
import LayersIcon from "../../../assets/icons/LayersIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import Undo2Icon from "../../../assets/icons/Undo2Icon";
import { useGetInvoiceStatsQuery } from "../api/Invoices.api";
import type { InvoiceFilter } from "../types/Invoices.types";

interface InvoiceStatsCardsProps {
  filter: InvoiceFilter;
  refreshKey: number;
}

const InvoiceStatsCards = ({ filter, refreshKey }: InvoiceStatsCardsProps) => {
  const { t } = useTranslation();
  const { data } = useGetInvoiceStatsQuery({ ...filter, refreshKey } as InvoiceFilter, { refetchOnMountOrArgChange: true });
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <MiniStatCard icon={<FileTextIcon />} label={t("invoices.pageTitle")} value={data.invoicesCount.toLocaleString()} variant="dark" />
      <MiniStatCard icon={<LayersIcon />} label={t("invoices.cardsSold")} value={data.cardsSold.toLocaleString()} variant="info" />
      <MiniStatCard icon={<WalletIcon />} label={t("invoices.salesTotal")} value={formatCurrency(data.salesTotal)} variant="success" />
      <MiniStatCard icon={<Undo2Icon />} label={t("invoices.deleted")} value={data.deletedCount.toLocaleString()} variant="warning" />
      <MiniStatCard icon={<Undo2Icon />} label={t("invoices.refunded")} value={formatCurrency(data.refundedTotal)} variant="danger" />
    </div>
  );
};

export default InvoiceStatsCards;
