import { Button } from "@/components/ui/button";
import { deleteNotes, getNotes, postNotes } from "@/lib/action";
import { useAllNote } from "@/store/data";
import { HomeIcon, PlusCircle, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Sidebar = () => {
  const { notes, setNotes } = useAllNote();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);
      await getNotes().then((data) => setNotes(data!));
      isLoading(false);
    };
    fetchData().catch(console.error);
    return;
  }, []);

  if (!notes) {
    return null;
  }

  const paramsId = useParams();
  const newId = notes.length + 1;

  return (
    <nav className="flex flex-col gap-2 w-[16vw] h-screen overflow-y-auto py-10 px-6 border-r">
      {!loading && (
        <>
          <Button
            title="Home dashboard"
            className="justify-start"
            asChild
            variant="ghost"
            size="sm"
          >
            <Link to="/" className="flex gap-2">
              <HomeIcon size={18} /> Home
            </Link>
          </Button>
          <p className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5">
            Notes
          </p>
          {notes.map((note) => {
            return (
              <Button
                key={note.id}
                title={note.title}
                className="justify-start"
                asChild
                variant="ghost"
                size="sm"
              >
                <div className="flex justify-between">
                  <Link
                    className="text-ellipsis overflow-hidden"
                    to={`/note/${note.id}`}
                    reloadDocument
                  >
                    {note.title}
                  </Link>
                  <button
                    onClick={() => deleteNotes(paramsId.id)}
                    className="p-1 rounded-md hover:bg-foreground hover:text-background"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </Button>
            );
          })}
          <Button
            title="Create new note"
            onClick={() =>
              postNotes({
                id: newId.toString(),
                title: "New Note",
                content: "",
              })
            }
            className="justify-between text-ellipsis overflow-hidden"
            size="sm"
            type="button"
          >
            Create Note <PlusCircle size={20} />
          </Button>
          <p className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5">
            Setings
          </p>
          <ModeToggle />
        </>
      )}
    </nav>
  );
};

export default Sidebar;
