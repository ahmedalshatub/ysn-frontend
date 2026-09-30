import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../shared/hooks/useTitle";
import PageBreadcrumb from "../../../shared/components/navigation/PageBreadcrumb";
import { showSuccess, showInfo } from "../../../shared/components/feedback/Toast";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceTotals from "../components/InvoiceTotals";
import HotItems from "../components/HotItems";
import InvoiceItems from "../components/InvoiceItems";
import InvoiceTable from "../components/InvoiceTable";
import { mockClients, mockProducts, mockCategories } from "../types/invoiceData";
import type { Product, InvoiceItem } from "../types/invoiceData";
import HomeIcon from "../../../assets/icons/HomeIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";

const today = () => new Date().toISOString().slice(0, 10);

const InvoiceExample = () => {
  const { t } = useTranslation();
  useTitle(t("invoiceExample.pageTitle"));

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleClientNameChange = (value: string) => {
    setClientName(value);
    const existing = mockClients.find(
      (client) => client.name.toLowerCase() === value.toLowerCase(),
    );
    setClientPhone(existing?.phone ?? "");
    setClientAddress(existing?.address ?? "");
  };

  const addProduct = (product: Product, qty: number) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.productId === product.id);
      if (index >= 0) {
        const updated = [...prev];
        const quantity = updated[index].quantity + qty;
        updated[index] = {
          ...updated[index],
          quantity,
          total: quantity * updated[index].price - updated[index].discount,
        };
        return updated;
      }

      const category = mockCategories.find((item) => item.id === product.categoryId);
      return [
        ...prev,
        {
          key: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          nameAr: product.nameAr,
          category: category?.name ?? "",
          categoryAr: category?.nameAr ?? "",
          barcode: product.barcode,
          quantity: qty,
          price: product.price,
          discount: 0,
          total: qty * product.price,
        },
      ];
    });
  };

  const handleQuantityChange = (key: string, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, quantity: value, total: value * item.price - item.discount }
          : item,
      ),
    );
  };

  const handlePriceChange = (key: string, value: string) => {
    const price = parseFloat(value) || 0;
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, price, total: item.quantity * price - item.discount }
          : item,
      ),
    );
  };

  const handleDiscountChange = (key: string, value: string) => {
    const discount = parseFloat(value) || 0;
    setItems((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, discount, total: item.quantity * item.price - discount }
          : item,
      ),
    );
  };

  const handleRemove = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const { totalAmount, totalDiscount, finalAmount } = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discount = items.reduce((sum, item) => sum + item.discount, 0);
    return { totalAmount: total, totalDiscount: discount, finalAmount: total - discount };
  }, [items]);

  const handleClear = () => {
    setClientName("");
    setClientPhone("");
    setClientAddress("");
    setPaymentType("cash");
    setInvoiceDate(today());
    setItems([]);
    setPaidAmount(0);
    showInfo(t("invoiceExample.cleared"));
  };

  const breadcrumbItems = [
    { label: t("sidebar.homePage"), icon: <HomeIcon className="w-4 h-4" /> },
    { label: t("invoiceExample.pageTitle") },
  ];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        title={t("invoiceExample.pageTitle")}
        items={breadcrumbItems}
        variant="gradient"
        icon={<FileTextIcon />}
        showDate
        animated
      />

      <InvoiceHeader
        clients={mockClients}
        clientName={clientName}
        clientPhone={clientPhone}
        clientAddress={clientAddress}
        paymentType={paymentType}
        invoiceDate={invoiceDate}
        onClientNameChange={handleClientNameChange}
        onPhoneChange={setClientPhone}
        onAddressChange={setClientAddress}
        onPaymentTypeChange={setPaymentType}
        onDateChange={setInvoiceDate}
        onSave={() => showSuccess(t("invoiceExample.save"))}
        onSaveAndPrint={() => showSuccess(t("invoiceExample.savedAndPrinting"))}
        onClear={handleClear}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HotItems products={mockProducts} onAddItem={(product) => addProduct(product, 1)} />
        <InvoiceTotals
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
          finalAmount={finalAmount}
          paidAmount={paidAmount}
          paymentType={paymentType}
          onPaidAmountChange={(value) => setPaidAmount(parseFloat(value) || 0)}
        />
      </div>

      <InvoiceItems
        products={mockProducts}
        categories={mockCategories}
        onAddProduct={addProduct}
      />

      <InvoiceTable
        items={items}
        onQuantityChange={handleQuantityChange}
        onPriceChange={handlePriceChange}
        onDiscountChange={handleDiscountChange}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default InvoiceExample;
