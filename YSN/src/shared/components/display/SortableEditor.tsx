import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Button from "../buttons/Button";
import CheckIcon from "../../../assets/icons/CheckIcon";
import SortableList from "./SortableList";

interface SortableEditorProps<T> {
  initialItems: T[];
  rowKey: (item: T) => number;
  renderItem: (item: T) => ReactNode;
  saving: boolean;
  onSave: (ids: number[]) => void;
}

const SortableEditor = <T,>({ initialItems, rowKey, renderItem, saving, onSave }: SortableEditorProps<T>) => {
  const { t } = useTranslation();
  const [items, setItems] = useState(initialItems);
  const changed = items.some((item, index) => rowKey(item) !== rowKey(initialItems[index]));

  if (items.length === 0) return <p className="card-grid-empty">{t("common.noData")}</p>;

  return (
    <div className="space-y-4">
      <SortableList items={items} rowKey={rowKey} renderItem={renderItem} onChange={setItems} />
      <div className="flex justify-end">
        <Button
          variant="primary"
          icon={<CheckIcon />}
          label={t("common.saveOrder")}
          loading={saving}
          disabled={!changed}
          onClick={() => onSave(items.map(rowKey))}
        />
      </div>
    </div>
  );
};

export default SortableEditor;
