import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Input from "../../../shared/components/inputs/Input";
import BarChartIcon from "../../../assets/icons/BarChartIcon";

interface InvoiceTotalsProps {
  totalAmount: number;
  totalDiscount: number;
  finalAmount: number;
  paidAmount: number;
  paymentType: string;
  onPaidAmountChange: (value: string) => void;
}

const InvoiceTotals = ({
  totalAmount,
  totalDiscount,
  finalAmount,
  paidAmount,
  paymentType,
  onPaidAmountChange,
}: InvoiceTotalsProps) => {
  const { t } = useTranslation();

  const remaining = finalAmount - paidAmount;

  const row = (label: string, value: number, tone: string) => (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b ce-divider last:border-b-0">
      <span className="ce-muted text-sm">{label}</span>
      <span className={`font-mono text-sm font-semibold ${tone}`}>{value.toFixed(2)}</span>
    </div>
  );

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("invoiceExample.total")}
      icon={<BarChartIcon className="w-4 h-4" />}
      fullHeight
    >
      <div className="ce-panel rounded-xl border ce-divider overflow-hidden">
        {row(t("invoiceExample.totalAmount"), totalAmount, "ce-panel-heading")}
        {row(t("common.discount"), totalDiscount, "ce-danger-text")}
        {paymentType === "credit" && row(t("invoiceExample.paidAmount"), paidAmount, "ce-panel-heading")}
        {paymentType === "credit" &&
          row(
            t("invoiceExample.remainingAmount"),
            remaining,
            remaining > 0 ? "ce-warning-text" : "ce-success-text",
          )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 stat-icon-success">
        <span className="text-sm font-semibold">{t("invoiceExample.finalAmount")}</span>
        <span className="font-mono text-lg font-bold">{finalAmount.toFixed(2)}</span>
      </div>

      {paymentType === "credit" && (
        <div className="mt-4">
          <Input
            label={t("invoiceExample.paidAmount")}
            type="number"
            min={0}
            value={String(paidAmount)}
            onChange={(e) => onPaidAmountChange(e.target.value)}
          />
        </div>
      )}
    </Card>
  );
};

export default InvoiceTotals;
