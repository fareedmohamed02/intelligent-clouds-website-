import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  Bold,
  Code,
  Code2,
  Eraser,
  Heading2,
  Heading3,
  Heading4,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  TableIcon,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pickAndUploadImage } from "@/components/MediaUploader";
import { toast } from "@/components/ui/toast";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string, json?: unknown) => void;
  className?: string;
  placeholder?: string;
};

export function RichTextEditor({
  value,
  onChange,
  className,
  placeholder = "Write content…",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    onUpdate: ({ editor: current }) => {
      onChange(current.getHTML(), current.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[180px] px-3 py-2 focus:outline-none text-text-900",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async () => {
    try {
      const url = await pickAndUploadImage();
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      if (err instanceof Error && err.message === "No file selected") return;
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const setCodeLanguage = () => {
    const previous = (editor.getAttributes("codeBlock").language as string) || "";
    const language = window.prompt("Code language (optional)", previous);
    if (language === null) return;
    if (editor.isActive("codeBlock")) {
      editor
        .chain()
        .focus()
        .updateAttributes("codeBlock", { language: language || null })
        .run();
      return;
    }
    editor.chain().focus().toggleCodeBlock().run();
    if (language) {
      editor.chain().focus().updateAttributes("codeBlock", { language }).run();
    }
  };

  return (
    <div className={cn("overflow-hidden rounded-[10px] border border-border-200 bg-white", className)}>
      <div className="flex flex-wrap gap-1 border-b border-border-200 bg-surface-50 p-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          label="H4"
        >
          <Heading4 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="Ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          label="Inline code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={setCodeLanguage}
          label="Code block"
        >
          <Code2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("link")} onClick={setLink} label="Link">
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => void addImage()} label="Image">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          label="Table"
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontal rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          label="Clear formatting"
        >
          <Eraser className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Undo">
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Redo">
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "default" : "ghost"}
      className="h-8 w-8"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  );
}
