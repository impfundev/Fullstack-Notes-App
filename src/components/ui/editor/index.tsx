import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { RedoIcon, SaveIcon, UndoIcon } from "lucide-react";
import { MenuBar } from "@/components/ui/editor/menu-bar";
import { extensions } from "@/components/ui/editor/extensions";
import { Notes } from "@/lib/types";
import { useNote } from "@/store/note";
import { updateNotes } from "@/lib/action";
import Navbar from "@/components/ui/navbar";

const NoteEditor = ({ note, id }: { note: Notes; id: string }) => {
  const { setNote } = useNote();

  const editor = useEditor({
    extensions,
    content: note.content,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert focus:outline-none max-w-none",
      },
    },
    onUpdate({ editor }) {
      const content = editor.getHTML();
      setNote({
        ...note,
        content,
      });
    },
  });

  return (
    <>
      <Navbar>
        <Button
          onClick={() => updateNotes(id, note)}
          size="sm"
          className="gap-2"
        >
          <SaveIcon size={20} /> Save
        </Button>
      </Navbar>
      <div className="px-10 flex flex-col gap-6">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          defaultValue={note.title}
          className="bg-background text-foreground text-4xl focus:outline-none"
          onChange={(e) => {
            setNote({
              ...note,
              title: e.target.value,
            });
          }}
        />
        {editor && (
          <>
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <MenuBar editor={editor} />
            </BubbleMenu>
            <div className="flex gap-1">
              <Button
                title="undo"
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                <UndoIcon size={16} absoluteStrokeWidth />
              </Button>
              <Button
                title="redo"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                <RedoIcon size={16} absoluteStrokeWidth />
              </Button>
            </div>
          </>
        )}
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default NoteEditor;
