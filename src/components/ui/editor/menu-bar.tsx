import { EditorContextValue } from "@tiptap/react";
import { useCallback } from "react";

import {
  BoldIcon,
  CodeIcon,
  CodeSquareIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  Link2Icon,
  Link2OffIcon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  RemoveFormattingIcon,
  RulerIcon,
  StrikethroughIcon,
  WrapTextIcon,
} from "lucide-react";
import { Button } from "../button";

export const MenuBar = ({ editor }: EditorContextValue) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Input url, use 'https://'", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="w-full max-w-md bg-background p-2 border rounded-md flex gap-1 overflow-x-auto z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "bg-foreground text-background" : ""
        }
      >
        <BoldIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? "bg-foreground text-background" : ""
        }
      >
        <ItalicIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike") ? "bg-foreground text-background" : ""
        }
      >
        <StrikethroughIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <RemoveFormattingIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph") ? "bg-foreground text-background" : ""
        }
      >
        <PilcrowIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading1Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading2Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading3Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading4Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading5Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "bg-foreground text-background"
            : ""
        }
      >
        <Heading6Icon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-foreground text-background" : ""
        }
      >
        <ListIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "bg-foreground text-background" : ""
        }
      >
        <ListOrderedIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code") ? "bg-foreground text-background" : ""
        }
      >
        <CodeIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock") ? "bg-foreground text-background" : ""
        }
      >
        <CodeSquareIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote") ? "bg-foreground text-background" : ""
        }
      >
        <QuoteIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <RulerIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <WrapTextIcon size={16} absoluteStrokeWidth />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={setLink}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "bg-foreground text-background" : ""
        }
      >
        {editor.isActive("bold") ? (
          <Link2OffIcon size={16} absoluteStrokeWidth />
        ) : (
          <Link2Icon size={16} absoluteStrokeWidth />
        )}
      </Button>
    </div>
  );
};
