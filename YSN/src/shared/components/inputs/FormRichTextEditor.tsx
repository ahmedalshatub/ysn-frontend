import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BoldIcon from "../../../assets/icons/BoldIcon";
import ItalicIcon from "../../../assets/icons/ItalicIcon";
import UnderlineIcon from "../../../assets/icons/UnderlineIcon";
import StrikethroughIcon from "../../../assets/icons/StrikethroughIcon";
import ListBulletIcon from "../../../assets/icons/ListBulletIcon";
import ListOrderedIcon from "../../../assets/icons/ListOrderedIcon";
import AlignLeftIcon from "../../../assets/icons/AlignLeftIcon";
import AlignCenterIcon from "../../../assets/icons/AlignCenterIcon";
import AlignRightIcon from "../../../assets/icons/AlignRightIcon";
import QuoteIcon from "../../../assets/icons/QuoteIcon";
import CodeIcon from "../../../assets/icons/CodeIcon";
import LinkIcon from "../../../assets/icons/LinkIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import HorizontalRuleIcon from "../../../assets/icons/HorizontalRuleIcon";
import RefreshCcwIcon from "../../../assets/icons/RefreshCcwIcon";
import RefreshCwIcon from "../../../assets/icons/RefreshCwIcon";

type RichTextSize = "sm" | "md" | "lg";

interface FormRichTextEditorProps<T extends FieldValues> {
  id?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  size?: RichTextSize;
  disabledStatus?: boolean;
  error?: boolean;
  errorMessage?: string;
  containerClass?: string;
  className?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  minHeight?: string;
  rules?: Record<string, unknown>;
}

const toolbarSizeStyles: Record<RichTextSize, string> = {
  sm: "p-1.5 gap-0.5",
  md: "p-2 gap-1",
  lg: "p-3 gap-1.5",
};

const buttonSizeStyles: Record<RichTextSize, string> = {
  sm: "w-7 h-7 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-9 h-9 text-base",
};

const editorPaddingStyles: Record<RichTextSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

const minHeightStyles: Record<RichTextSize, string> = {
  sm: "120px",
  md: "180px",
  lg: "260px",
};

interface InnerRichTextProps {
  id?: string;
  fieldValue: string;
  fieldOnChange: (html: string) => void;
  placeholderText: string;
  size: RichTextSize;
  disabled: boolean;
  error: boolean;
  className: string;
  tooltip?: string;
  tooltipPosition: "top" | "bottom" | "left" | "right";
  resolvedMinHeight: string;
}

const InnerRichText: React.FC<InnerRichTextProps> = ({
  id,
  fieldValue,
  fieldOnChange,
  placeholderText,
  size,
  disabled,
  error,
  className,
  tooltip,
  tooltipPosition,
  resolvedMinHeight,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        underline: false,
        link: false,
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholderText }),
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: fieldValue || "",
    editable: !disabled,
    onUpdate: ({ editor: ed }) => {
      fieldOnChange(ed.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && fieldValue !== undefined && editor.getHTML() !== fieldValue) {
      editor.commands.setContent(fieldValue || "", { emitUpdate: false });
    }
  }, [fieldValue, editor]);

  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  const handleAddLink = () => {
    if (!editor) return;
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const handleAddImage = () => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const ToolbarButton: React.FC<{
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
  }> = ({ onClick, active, disabled: btnDisabled, title, children }) => {
    const btnClass = [
      "flex items-center justify-center rounded transition-colors duration-150",
      buttonSizeStyles[size],
      active ? "editor-toolbar-active" : "editor-toolbar-inactive",
      btnDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button type="button" className={btnClass} onClick={onClick} disabled={btnDisabled} title={title}>
        {children}
      </button>
    );
  };

  const Separator = () => <div className="w-px h-5 rte-separator mx-0.5" />;

  const borderClass = error ? "input-error" : "rte-border-default";
  const focusClass = error ? "input-focus-danger" : "input-focus-primary";

  const editorContent = (
    <div
      id={id}
      className={[
        "rte-wrapper rounded-lg border overflow-hidden transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-offset-0",
        borderClass,
        focusClass,
        disabled ? "rte-disabled" : "rte-bg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "rte-toolbar flex flex-wrap items-center border-b",
          toolbarSizeStyles[size],
          disabled ? "pointer-events-none" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} disabled={disabled} title="Bold">
          <BoldIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} disabled={disabled} title="Italic">
          <ItalicIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} disabled={disabled} title="Underline">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")} disabled={disabled} title="Strikethrough">
          <StrikethroughIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive("heading", { level: 1 })} disabled={disabled} title="Heading 1">
          <span className="font-bold text-xs">H1</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} disabled={disabled} title="Heading 2">
          <span className="font-bold text-xs">H2</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} disabled={disabled} title="Heading 3">
          <span className="font-bold text-xs">H3</span>
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} disabled={disabled} title="Bullet List">
          <ListBulletIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} disabled={disabled} title="Ordered List">
          <ListOrderedIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} disabled={disabled} title="Align Left">
          <AlignLeftIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} disabled={disabled} title="Align Center">
          <AlignCenterIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} disabled={disabled} title="Align Right">
          <AlignRightIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} disabled={disabled} title="Blockquote">
          <QuoteIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive("codeBlock")} disabled={disabled} title="Code Block">
          <CodeIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={handleAddLink} active={editor?.isActive("link")} disabled={disabled} title="Insert Link">
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleAddImage} disabled={disabled} title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} disabled={disabled} title="Horizontal Rule">
          <HorizontalRuleIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} disabled={disabled || !editor?.can().undo()} title="Undo">
          <RefreshCcwIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} disabled={disabled || !editor?.can().redo()} title="Redo">
          <RefreshCwIcon className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <EditorContent
        editor={editor}
        className={[
          "prose prose-sm max-w-none",
          editorPaddingStyles[size],
          "[&_.tiptap]:outline-none [&_.tiptap]:min-h-[var(--editor-min-h)]",
          "[&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ "--editor-min-h": resolvedMinHeight } as React.CSSProperties}
      />
    </div>
  );

  if (tooltip) {
    return (
      <div className="tooltip-wrapper w-full">
        {editorContent}
        <span className={`tooltip-content tooltip-${tooltipPosition}`}>{tooltip}</span>
      </div>
    );
  }

  return editorContent;
};

const FormRichTextEditor = <T extends FieldValues>({
  id,
  label,
  name,
  control,
  placeholder = "Start typing...",
  size = "md",
  disabledStatus = false,
  error = false,
  errorMessage = "",
  containerClass = "",
  className = "",
  tooltip,
  tooltipPosition = "top",
  minHeight,
  rules,
}: FormRichTextEditorProps<T>) => {
  const resolvedMinHeight = minHeight || minHeightStyles[size];

  return (
    <div className={`flex flex-col gap-1.5 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="form-label text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InnerRichText
            id={id}
            fieldValue={field.value as string}
            fieldOnChange={field.onChange}
            placeholderText={placeholder}
            size={size}
            disabled={disabledStatus}
            error={error}
            className={className}
            tooltip={tooltip}
            tooltipPosition={tooltipPosition}
            resolvedMinHeight={resolvedMinHeight}
          />
        )}
      />
      {error && errorMessage && (
        <span className="input-error-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormRichTextEditor;
