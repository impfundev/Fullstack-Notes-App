import { Button } from "@/components/ui/button";
import { deleteNotes, getNotes, postNotes } from "@/lib/action";
import { useAllNote } from "@/store/data";
import { PlusCircle, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
          <Button className="justify-start" asChild variant="ghost" size="sm">
            <Link to="/">Home</Link>
          </Button>
          {notes.map((note) => {
            return (
              <Button
                key={note.id}
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
        </>
      )}
    </nav>
  );
};

export default Sidebar;
