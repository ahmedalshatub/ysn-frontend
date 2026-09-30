import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Select from "../../../shared/components/inputs/Select";
import SearchInput from "../../../shared/components/inputs/SearchInput";
import Input from "../../../shared/components/inputs/Input";
import NumberInput from "../../../shared/components/inputs/NumberInput";
import Button from "../../../shared/components/buttons/Button";
import PackageIcon from "../../../assets/icons/PackageIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import type { Product, ProductCategory } from "../types/invoiceData";

interface InvoiceItemsProps {
  products: Product[];
  categories: ProductCategory[];
  onAddProduct: (product: Product, quantity: number) => void;
}

const InvoiceItems = ({ products, categories, onAddProduct }: InvoiceItemsProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const [categoryFilter, setCategoryFilter] = useState<string | number>("");
  const [productId, setProductId] = useState<string | number>("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(1);

  const categoryOptions = categories.map((category) => ({
    name: isArabic ? category.nameAr : category.name,
    value: category.id,
  }));

  const filteredProducts = useMemo(
    () =>
      categoryFilter
        ? products.filter((product) => product.categoryId === Number(categoryFilter))
        : products,
    [products, categoryFilter],
  );

  const productOptions = filteredProducts.map((product) => ({
    value: product.id,
    label: `${isArabic ? product.nameAr : product.name} · ${product.price}`,
  }));

  const selectedProduct = products.find((product) => product.id === Number(productId)) ?? null;

  const handleBarcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const match = products.find((product) => product.barcode === barcode.trim());
    if (match) {
      onAddProduct(match, 1);
      setBarcode("");
    }
  };

  const handleAdd = () => {
    if (!selectedProduct) return;
    onAddProduct(selectedProduct, quantity);
    setProductId("");
    setQuantity(1);
  };

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("invoiceExample.product")}
      icon={<PackageIcon className="w-4 h-4" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
        <Select
          label={t("common.category")}
          placeholder={t("common.all")}
          options={categoryOptions}
          labelKey="name"
          valueKey="value"
          value={categoryFilter}
          onChange={(value) => {
            setCategoryFilter(value);
            setProductId("");
          }}
          addDefaultOption
          defaultOptionLabel={t("common.all")}
        />
        <SearchInput
          label={t("invoiceExample.product")}
          placeholder={t("invoiceExample.product")}
          options={productOptions}
          value={productId}
          onChange={setProductId}
          noResultsText={t("common.noData")}
        />
        <Input
          label={t("invoiceExample.barcode")}
          placeholder={t("invoiceExample.scanOrEnter")}
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleBarcodeKeyDown}
        />
        <div className="flex items-end gap-2">
          <NumberInput
            label={t("common.quantity")}
            value={quantity}
            min={1}
            onChange={setQuantity}
            containerClass="flex-1"
          />
          <Button
            variant="primary"
            size="md"
            label={t("invoiceExample.addItem")}
            icon={<PlusIcon className="w-4 h-4" />}
            iconPosition="left"
            disabled={!selectedProduct}
            onClick={handleAdd}
          />
        </div>
      </div>
    </Card>
  );
};

export default InvoiceItems;
