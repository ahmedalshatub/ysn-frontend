import { useState, useCallback, useRef, useEffect } from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";

interface TreeSelectNodeData {
  id: string;
  label: string;
  description?: string;
  children?: TreeSelectNodeData[];
  disabled?: boolean;
}

type TreeSelectMode = "single" | "multiple" | "checkbox";

interface TreeSelectProps {
  options: TreeSelectNodeData[];
  value?: string[];
  defaultValue?: string[];
  mode?: TreeSelectMode;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onChange?: (value: string[], labels: string[]) => void;
  onSearchChange?: (term: string) => void;
  loading?: boolean;
  emptyText?: string;
  className?: string;
}

const getAllChildIds = (node: TreeSelectNodeData): string[] => {
  const ids: string[] = [node.id];
  if (node.children) node.children.forEach((c) => ids.push(...getAllChildIds(c)));
  return ids;
};

const findLabelById = (nodes: TreeSelectNodeData[], id: string): string | null => {
  for (const node of nodes) {
    if (node.id === id) return node.label;
    if (node.children) {
      const found = findLabelById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

const filterNodes = (nodes: TreeSelectNodeData[], query: string): TreeSelectNodeData[] => {
  const q = query.toLowerCase();
  return nodes.reduce<TreeSelectNodeData[]>((acc, node) => {
    const matchesLabel = node.label.toLowerCase().includes(q);
    const filteredChildren = node.children ? filterNodes(node.children, query) : [];
    if (matchesLabel || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : node.children,
      });
    }
    return acc;
  }, []);
};

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  expanded
    ? <ChevronDownIcon className={`treeselect-chevron treeselect-chevron-open`} width="12" height="12" />
    : <ChevronRightIcon className="treeselect-chevron" width="12" height="12" />
);

const TreeSelectNode = ({
  node,
  level,
  expanded,
  selected,
  mode,
  onToggle,
  onSelect,
}: {
  node: TreeSelectNodeData;
  level: number;
  expanded: Set<string>;
  selected: Set<string>;
  mode: TreeSelectMode;
  onToggle: (id: string) => void;
  onSelect: (node: TreeSelectNodeData) => void;
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);
  const isDisabled = node.disabled === true;

  const childIds = hasChildren ? getAllChildIds(node).slice(1) : [];
  const allChildrenSelected = childIds.length > 0 && childIds.every((id) => selected.has(id));
  const someChildrenSelected = childIds.length > 0 && childIds.some((id) => selected.has(id)) && !allChildrenSelected;

  const checkState = mode === "checkbox" && hasChildren
    ? allChildrenSelected ? "checked" : someChildrenSelected ? "indeterminate" : isSelected ? "checked" : "unchecked"
    : isSelected ? "checked" : "unchecked";

  return (
    <div>
      <div
        className={`treeselect-node ${isSelected || allChildrenSelected ? "treeselect-node-selected" : ""} ${isDisabled ? "treeselect-node-disabled" : ""}`}
        style={{ paddingInlineStart: `${level * 16 + 8}px` }}
        onClick={() => {
          if (isDisabled) return;
          onSelect(node);
        }}
      >
        {hasChildren ? (
          <span
            className="treeselect-chevron-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (isDisabled) return;
              onToggle(node.id);
            }}
          >
            <ChevronIcon expanded={isExpanded} />
          </span>
        ) : (
          <span className="treeselect-chevron-spacer" />
        )}

        {mode === "checkbox" && (
          <span className={`treeselect-checkbox treeselect-checkbox-${checkState}`}>
            {checkState === "checked" && (
              <CheckIcon width="10" height="10" strokeWidth="3" />
            )}
            {checkState === "indeterminate" && <span className="treeselect-checkbox-dash" />}
          </span>
        )}

        <span className="treeselect-node-label flex min-w-0 flex-col">
          <span>{node.label}</span>
          {node.description && <span className="truncate text-xs ce-muted">{node.description}</span>}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeSelectNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              mode={mode}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeSelect = ({
  options,
  value: controlledValue,
  defaultValue = [],
  mode = "single",
  placeholder = "Select...",
  label,
  disabled = false,
  error = false,
  errorMessage,
  searchable = false,
  searchPlaceholder = "Search...",
  onChange,
  onSearchChange,
  loading = false,
  emptyText = "No options found",
  className = "",
}: TreeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(controlledValue || defaultValue));
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue) setSelected(new Set(controlledValue));
  }, [controlledValue]);

  useEffect(() => {
    if (!isOpen) onSearchChange?.("");
  }, [isOpen, onSearchChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (node: TreeSelectNodeData) => {
      setSelected((prev) => {
        let next: Set<string>;

        if (mode === "single") {
          next = prev.has(node.id) ? new Set() : new Set([node.id]);
          setIsOpen(false);
          setSearchQuery("");
        } else if (mode === "multiple") {
          next = new Set(prev);
          if (next.has(node.id)) next.delete(node.id);
          else next.add(node.id);
        } else {
          next = new Set(prev);
          const allIds = getAllChildIds(node);
          const allSelected = allIds.every((id) => next.has(id));
          allIds.forEach((id) => {
            if (allSelected) next.delete(id);
            else next.add(id);
          });
        }

        const arr = Array.from(next);
        const labels = arr.map((id) => findLabelById(options, id)).filter(Boolean) as string[];
        onChange?.(arr, labels);
        return next;
      });
    },
    [mode, options, onChange]
  );

  const removeTag = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      const arr = Array.from(next);
      const labels = arr.map((i) => findLabelById(options, i)).filter(Boolean) as string[];
      onChange?.(arr, labels);
      return next;
    });
  };

  const filteredOptions = searchQuery && !onSearchChange ? filterNodes(options, searchQuery) : options;
  const selectedLabels = Array.from(selected).map((id) => ({ id, label: findLabelById(options, id) || id }));

  return (
    <div className={`treeselect-wrapper ${className}`} ref={containerRef}>
      {label && <label className="treeselect-label">{label}</label>}
      <div
        className={`treeselect-trigger ${isOpen ? "treeselect-trigger-open" : ""} ${error ? "treeselect-trigger-error" : ""} ${disabled ? "treeselect-trigger-disabled" : ""}`}
        onClick={() => !disabled && setIsOpen((p) => !p)}
      >
        <div className="treeselect-trigger-content">
          {selectedLabels.length === 0 && (
            <span className="treeselect-placeholder">{placeholder}</span>
          )}
          {mode === "single" && selectedLabels.length > 0 && (
            <span className="treeselect-single-value">{selectedLabels[0].label}</span>
          )}
          {mode !== "single" && selectedLabels.length > 0 && (
            <div className="treeselect-tags">
              {selectedLabels.slice(0, 3).map((item) => (
                <span key={item.id} className="treeselect-tag">
                  {item.label}
                  <button
                    type="button"
                    className="treeselect-tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(item.id);
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
              {selectedLabels.length > 3 && (
                <span className="treeselect-tag treeselect-tag-more">+{selectedLabels.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <ChevronDownIcon className={`treeselect-arrow ${isOpen ? "treeselect-arrow-open" : ""}`} width="16" height="16" />
      </div>

      {isOpen && (
        <div className="treeselect-dropdown">
          {searchable && (
            <div className="treeselect-search-wrapper">
              <input
                type="text"
                className="treeselect-search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearchChange?.(e.target.value);
                }}
                autoFocus
              />
            </div>
          )}
          <div className="treeselect-options">
            {filteredOptions.length === 0 ? (
              <div className="treeselect-empty">{loading ? "..." : emptyText}</div>
            ) : (
              filteredOptions.map((node) => (
                <TreeSelectNode
                  key={node.id}
                  node={node}
                  level={0}
                  expanded={expanded}
                  selected={selected}
                  mode={mode}
                  onToggle={handleToggle}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
        </div>
      )}

      {error && errorMessage && <span className="treeselect-error">{errorMessage}</span>}
    </div>
  );
};

export type { TreeSelectProps, TreeSelectNodeData, TreeSelectMode };
export default TreeSelect;
