import { useState, useRef, useEffect, useCallback } from "react";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";

type AccordionVariant = "default" | "bordered" | "filled" | "separated" | "ghost";

interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  variant?: AccordionVariant;
  multiple?: boolean;
  defaultOpen?: string[];
  open?: string[];
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  onChange?: (openItems: string[]) => void;
  className?: string;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <ChevronDownIcon
    className={`accordion-chevron ${isOpen ? "accordion-chevron-open" : ""}`}
    width="16"
    height="16"
  />
);

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
  showIcon,
  iconPosition,
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  showIcon: boolean;
  iconPosition: "left" | "right";
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!item.disabled) onToggle();
    }
  };

  return (
    <div className={`accordion-item ${isOpen ? "accordion-item-open" : ""} ${item.disabled ? "accordion-item-disabled" : ""}`}>
      <button
        type="button"
        className="accordion-trigger"
        onClick={() => !item.disabled && onToggle()}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-disabled={item.disabled}
        tabIndex={item.disabled ? -1 : 0}
      >
        {iconPosition === "left" && showIcon && <ChevronIcon isOpen={isOpen} />}
        <div className="accordion-trigger-content">
          {item.icon && <span className="accordion-item-icon">{item.icon}</span>}
          <span className="accordion-trigger-title">{item.title}</span>
        </div>
        {iconPosition === "right" && showIcon && <ChevronIcon isOpen={isOpen} />}
      </button>
      <div
        className="accordion-content-wrapper"
        style={{ height }}
      >
        <div ref={contentRef} className="accordion-content">
          {item.content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  items,
  variant = "default",
  multiple = false,
  defaultOpen = [],
  open,
  showIcon = true,
  iconPosition = "right",
  onChange,
  className = "",
}: AccordionProps) => {
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpen);
  const openItems = open ?? internalOpen;

  const toggleItem = useCallback(
    (id: string) => {
      const apply = (prev: string[]) => {
        const next = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : multiple
            ? [...prev, id]
            : [id];
        onChange?.(next);
        return next;
      };

      if (open) {
        apply(open);
        return;
      }
      setInternalOpen(apply);
    },
    [multiple, onChange, open]
  );

  return (
    <div className={`accordion accordion-${variant} ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
          showIcon={showIcon}
          iconPosition={iconPosition}
        />
      ))}
    </div>
  );
};

export type { AccordionProps, AccordionItemData, AccordionVariant };
export default Accordion;
