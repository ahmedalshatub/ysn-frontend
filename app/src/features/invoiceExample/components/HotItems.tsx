import { useTranslation } from "react-i18next";
import Card from "../../../shared/components/cards/Card";
import Button from "../../../shared/components/buttons/Button";
import ZapIcon from "../../../assets/icons/ZapIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import type { Product } from "../types/invoiceData";

interface HotItemsProps {
  products: Product[];
  onAddItem: (product: Product) => void;
}

const HotItems = ({ products, onAddItem }: HotItemsProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const hotProducts = products.filter((product) => product.isHotItem);

  return (
    <Card
      variant="elevated"
      padding="md"
      title={t("invoiceExample.fastAddItems")}
      icon={<ZapIcon className="w-4 h-4" />}
      fullHeight
    >
      <div className="flex flex-wrap gap-2">
        {hotProducts.map((product) => (
          <Button
            key={product.id}
            variant="primary"
            outline
            size="sm"
            label={`${isArabic ? product.nameAr : product.name} · ${product.price}`}
            icon={<PlusIcon className="w-3.5 h-3.5" />}
            iconPosition="left"
            onClick={() => onAddItem(product)}
          />
        ))}
      </div>
    </Card>
  );
};

export default HotItems;
