import React, { useState, useMemo } from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon";

interface TransferItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface TransferProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  titles?: [string, string];
  showSearch?: boolean;
  disabled?: boolean;
  onChange?: (targetKeys: string[], direction: "left" | "right", moveKeys: string[]) => void;
  className?: string;
}

const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  titles = ["Source", "Target"],
  showSearch = true,
  disabled = false,
  onChange,
  className = "",
}) => {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [selectedLeft, setSelectedLeft] = useState<Set<string>>(new Set());
  const [selectedRight, setSelectedRight] = useState<Set<string>>(new Set());
  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");

  const targetKeys = controlledTargetKeys ?? internalTargetKeys;

  const leftItems = useMemo(
    () => dataSource.filter((item) => !targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );

  const rightItems = useMemo(
    () => dataSource.filter((item) => targetKeys.includes(item.key)),
    [dataSource, targetKeys]
  );

  const filteredLeft = useMemo(
    () =>
      leftItems.filter((item) =>
        item.label.toLowerCase().includes(searchLeft.toLowerCase())
      ),
    [leftItems, searchLeft]
  );

  const filteredRight = useMemo(
    () =>
      rightItems.filter((item) =>
        item.label.toLowerCase().includes(searchRight.toLowerCase())
      ),
    [rightItems, searchRight]
  );

  const moveToRight = () => {
    if (disabled) return;
    const keys = Array.from(selectedLeft);
    const newTargetKeys = [...targetKeys, ...keys];
    setInternalTargetKeys(newTargetKeys);
    setSelectedLeft(new Set());
    onChange?.(newTargetKeys, "right", keys);
  };

  const moveToLeft = () => {
    if (disabled) return;
    const keys = Array.from(selectedRight);
    const newTargetKeys = targetKeys.filter((k) => !keys.includes(k));
    setInternalTargetKeys(newTargetKeys);
    setSelectedRight(new Set());
    onChange?.(newTargetKeys, "left", keys);
  };

  const toggleItem = (key: string, set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    if (disabled) return;
    const item = dataSource.find((i) => i.key === key);
    if (item?.disabled) return;
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setFn(next);
  };

  const toggleAll = (
    items: TransferItem[],
    selected: Set<string>,
    setFn: React.Dispatch<React.SetStateAction<Set<string>>>
  ) => {
    if (disabled) return;
    const selectable = items.filter((i) => !i.disabled);
    if (selectable.every((i) => selected.has(i.key))) {
      setFn(new Set());
    } else {
      setFn(new Set(selectable.map((i) => i.key)));
    }
  };

  const renderList = (
    items: TransferItem[],
    filtered: TransferItem[],
    selected: Set<string>,
    setSelected: React.Dispatch<React.SetStateAction<Set<string>>>,
    title: string,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    side: "left" | "right"
  ) => {
    const selectableFiltered = filtered.filter((i) => !i.disabled);
    const allChecked = selectableFiltered.length > 0 && selectableFiltered.every((i) => selected.has(i.key));
    const someChecked = selectableFiltered.some((i) => selected.has(i.key));

    return (
      <div className={`transfer-list transfer-list-${side}`}>
        <div className="transfer-list-header">
          <label className="transfer-checkbox-wrapper">
            <input
              type="checkbox"
              className="transfer-checkbox"
              checked={allChecked}
              ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
              onChange={() => toggleAll(filtered, selected, setSelected)}
              disabled={disabled}
            />
            <span className="transfer-header-title">{title}</span>
          </label>
          <span className="transfer-header-count">
            {selected.size}/{items.length}
          </span>
        </div>
        {showSearch && (
          <div className="transfer-search-wrapper">
            <input
              type="text"
              className="transfer-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={disabled}
            />
          </div>
        )}
        <ul className="transfer-list-body">
          {filtered.map((item) => (
            <li
              key={item.key}
              className={`transfer-item ${item.disabled ? "transfer-item-disabled" : ""} ${selected.has(item.key) ? "transfer-item-active" : ""}`}
              onClick={() => toggleItem(item.key, selected, setSelected)}
            >
              <input
                type="checkbox"
                className="transfer-checkbox"
                checked={selected.has(item.key)}
                disabled={item.disabled || disabled}
                readOnly
              />
              <div className="transfer-item-content">
                <span className="transfer-item-label">{item.label}</span>
                {item.description && (
                  <span className="transfer-item-desc">{item.description}</span>
                )}
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="transfer-empty">No items</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className={`transfer-wrapper ${disabled ? "transfer-disabled" : ""} ${className}`}>
      {renderList(leftItems, filteredLeft, selectedLeft, setSelectedLeft, titles[0], searchLeft, setSearchLeft, "left")}
      <div className="transfer-actions">
        <button
          type="button"
          className="transfer-action-btn"
          disabled={disabled || selectedLeft.size === 0}
          onClick={moveToRight}
        >
          <ChevronRightIcon strokeWidth="2.5" className="transfer-action-icon" />
        </button>
        <button
          type="button"
          className="transfer-action-btn"
          disabled={disabled || selectedRight.size === 0}
          onClick={moveToLeft}
        >
          <ChevronLeftIcon strokeWidth="2.5" className="transfer-action-icon" />
        </button>
      </div>
      {renderList(rightItems, filteredRight, selectedRight, setSelectedRight, titles[1], searchRight, setSearchRight, "right")}
    </div>
  );
};

export default Transfer;
