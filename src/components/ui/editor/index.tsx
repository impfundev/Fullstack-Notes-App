import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  Loader2Icon,
  RedoIcon,
  SaveIcon,
  UndoIcon,
} from "lucide-react";
import { MenuBar } from "@/components/ui/editor/menu-bar";
import { extensions } from "@/components/ui/editor/extensions";
import { Notes } from "@/lib/types";
import { useNote } from "@/store/note";
import { updateNotes } from "@/lib/action";
import Navbar from "@/components/ui/navbar";
import { FormEvent } from "react";
import { FormStore } from "@/store/form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAllNote } from "@/store/data";
import { useSession } from "@clerk/clerk-react";

const NoteEditor = ({ note, id }: { note: Notes; id: string }) => {
  const { setNote } = useNote();
  const { notes, setNotes } = useAllNote();
  const { loading, isLoading } = FormStore.loadingStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSession();

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

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    setNote({
      ...note,
      user: session?.user.fullName,
      userId: session?.user.id,
    });
    try {
      updateNotes(id, note);
      isLoading(false);
      toast({
        description: "Your note has been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <form onSubmit={handleForm} className="flex flex-col gap-4">
      <Navbar>
        <div className="flex gap-1 md:gap-4">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            size="sm"
            className="gap-2"
          >
            <ChevronLeftIcon size={20} /> Back
          </Button>
          {editor && (
            <div className="flex gap-1">
              <Button
                type="button"
                title="undo"
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                <UndoIcon size={16} absoluteStrokeWidth />
              </Button>
              <Button
                type="button"
                title="redo"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                <RedoIcon size={16} absoluteStrokeWidth />
              </Button>
            </div>
          )}
        </div>
        <Button type="submit" size="sm" className="gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2Icon size={20} className="animate-spin" /> Save
            </>
          ) : (
            <>
              <SaveIcon size={20} /> Save
            </>
          )}
        </Button>
      </Navbar>
      <div className="pb-10 px-10 flex flex-col gap-6">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          defaultValue={note.title}
          className="bg-background text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl focus:outline-none"
          onChange={(e) => {
            setNote({
              ...note,
              title: e.target.value,
            });
            setNotes(
              notes.map((n) => {
                if (n.id === id) {
                  return { ...n, title: e.target.value };
                }

                return n;
              })
            );
          }}
        />
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <MenuBar editor={editor} />
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>
    </form>
  );
};

export default NoteEditor;
