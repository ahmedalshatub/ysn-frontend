import { useState, useCallback } from "react";
import ChevronRightIcon from "../../../assets/icons/ChevronRightIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import FolderIconBase from "../../../assets/icons/FolderIcon";
import FileTextIcon from "../../../assets/icons/FileTextIcon";

interface TreeNodeData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNodeData[];
  disabled?: boolean;
}

interface TreeViewProps {
  data: TreeNodeData[];
  selectable?: boolean;
  multiSelect?: boolean;
  checkable?: boolean;
  defaultExpanded?: string[];
  defaultSelected?: string[];
  defaultChecked?: string[];
  onSelect?: (ids: string[]) => void;
  onCheck?: (ids: string[]) => void;
  onExpand?: (ids: string[]) => void;
  showLines?: boolean;
  showIcons?: boolean;
  className?: string;
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <ChevronRightIcon
    className={`tree-chevron ${expanded ? "tree-chevron-open" : ""}`}
    width="14"
    height="14"
  />
);

const FolderIcon = ({ open: _open }: { open: boolean }) => (
  <FolderIconBase className="tree-node-icon" width="16" height="16" />
);

const FileIcon = () => (
  <FileTextIcon className="tree-node-icon" width="16" height="16" />
);

const getAllChildIds = (node: TreeNodeData): string[] => {
  const ids: string[] = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids.push(...getAllChildIds(child));
    });
  }
  return ids;
};

const TreeNode = ({
  node,
  level,
  expanded,
  selected,
  checked,
  selectable,
  checkable,
  showLines,
  showIcons,
  onToggle,
  onSelect,
  onCheck,
}: {
  node: TreeNodeData;
  level: number;
  expanded: Set<string>;
  selected: Set<string>;
  checked: Set<string>;
  selectable: boolean;
  checkable: boolean;
  showLines: boolean;
  showIcons: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onCheck: (node: TreeNodeData) => void;
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);
  const isChecked = checked.has(node.id);
  const isDisabled = node.disabled === true;

  const childIds = hasChildren ? getAllChildIds(node).slice(1) : [];
  const allChildrenChecked = childIds.length > 0 && childIds.every((id) => checked.has(id));
  const someChildrenChecked = childIds.length > 0 && childIds.some((id) => checked.has(id)) && !allChildrenChecked;

  const checkState = hasChildren
    ? allChildrenChecked
      ? "checked"
      : someChildrenChecked
        ? "indeterminate"
        : isChecked
          ? "checked"
          : "unchecked"
    : isChecked
      ? "checked"
      : "unchecked";

  const handleClick = () => {
    if (isDisabled) return;
    if (hasChildren) onToggle(node.id);
    if (selectable) onSelect(node.id);
  };

  const handleCheckChange = () => {
    if (isDisabled) return;
    onCheck(node);
  };

  return (
    <div className={`tree-node-group ${showLines ? "tree-lines" : ""}`}>
      <div
        className={`tree-node ${isSelected ? "tree-node-selected" : ""} ${isDisabled ? "tree-node-disabled" : ""}`}
        style={{ paddingLeft: `${level * 20 + 4}px` }}
        onClick={handleClick}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <span className="tree-toggle-area">
          {hasChildren ? <ChevronIcon expanded={isExpanded} /> : <span className="tree-toggle-spacer" />}
        </span>

        {checkable && (
          <span
            className={`tree-checkbox tree-checkbox-${checkState}`}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckChange();
            }}
          >
            {checkState === "checked" && (
              <CheckIcon width="10" height="10" strokeWidth="3" />
            )}
            {checkState === "indeterminate" && <span className="tree-checkbox-dash" />}
          </span>
        )}

        {showIcons && (
          node.icon || (hasChildren ? <FolderIcon open={isExpanded} /> : <FileIcon />)
        )}

        <span className="tree-label">{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div className="tree-children" role="group">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              checked={checked}
              selectable={selectable}
              checkable={checkable}
              showLines={showLines}
              showIcons={showIcons}
              onToggle={onToggle}
              onSelect={onSelect}
              onCheck={onCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  data,
  selectable = false,
  multiSelect = false,
  checkable = false,
  defaultExpanded = [],
  defaultSelected = [],
  defaultChecked = [],
  onSelect,
  onCheck,
  onExpand,
  showLines = false,
  showIcons = true,
  className = "",
}: TreeViewProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));
  const [selected, setSelected] = useState<Set<string>>(new Set(defaultSelected));
  const [checked, setChecked] = useState<Set<string>>(new Set(defaultChecked));

  const handleToggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onExpand?.(Array.from(next));
        return next;
      });
    },
    [onExpand]
  );

  const handleSelect = useCallback(
    (id: string) => {
      setSelected((prev) => {
        let next: Set<string>;
        if (multiSelect) {
          next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
        } else {
          next = prev.has(id) ? new Set() : new Set([id]);
        }
        onSelect?.(Array.from(next));
        return next;
      });
    },
    [multiSelect, onSelect]
  );

  const handleCheck = useCallback(
    (node: TreeNodeData) => {
      setChecked((prev) => {
        const next = new Set(prev);
        const allIds = getAllChildIds(node);
        const allChecked = allIds.every((id) => next.has(id));
        allIds.forEach((id) => {
          if (allChecked) next.delete(id);
          else next.add(id);
        });
        onCheck?.(Array.from(next));
        return next;
      });
    },
    [onCheck]
  );

  return (
    <div className={`tree-view ${className}`} role="tree">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          selected={selected}
          checked={checked}
          selectable={selectable}
          checkable={checkable}
          showLines={showLines}
          showIcons={showIcons}
          onToggle={handleToggle}
          onSelect={handleSelect}
          onCheck={handleCheck}
        />
      ))}
    </div>
  );
};

export type { TreeViewProps, TreeNodeData };
export default TreeView;
