import { Button } from "@/components/ui/button";
import { deleteNotes, getNotes, postNotes } from "@/lib/action";
import { useAllNote } from "@/store/data";
import {
  HomeIcon,
  PanelRightOpen,
  PlusCircle,
  StickyNoteIcon,
  TrashIcon,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { FormStore } from "@/store/form";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton, useSession } from "@clerk/clerk-react";

const Sidebar = () => {
  const { session, isLoaded } = useSession();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);
  const { notes, setNotes } = useAllNote();
  const { loading, isLoading } = FormStore.loadingStore();
  const { submitType, setSubmitType } = FormStore.submitTypeStore();
  const { selectId, setSelectedId } = FormStore.selectIdStore();
  const newId = notes.length + 1;

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded) {
        isLoading(true);
      }
      await getNotes().then((data) => setNotes(data!));
      isLoading(false);
    };
    fetchData().catch(console.error);
    return;
  }, []);

  if (!notes) {
    return null;
  }

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (submitType) {
      case "create":
        setNotes([
          ...notes,
          {
            id: newId.toString(),
            title: "New Note",
            content: "",
            user: session?.user.fullName,
            userId: session?.user.id,
          },
        ]);
        postNotes({
          id: newId.toString(),
          title: "New Note",
          content: "",
          user: session?.user.fullName,
          userId: session?.user.id,
        });
        break;
      case "delete":
        deleteNotes(selectId);
        setNotes([...notes.filter((n) => n.id !== selectId)]);
        break;
      default:
        break;
    }
  };

  return (
    <nav
      className={`flex flex-col gap-2 ${
        isSidebar ? "w-[16vw] px-6" : "w-[5vw] px-1"
      } h-screen py-10 border-r transition-all`}
    >
      <Button
        title="Hide Sidebar"
        className="flex-end"
        size="icon"
        type="button"
        variant="outline"
        onClick={() => setIsSidebar(!isSidebar)}
      >
        <PanelRightOpen size={16} />
      </Button>
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <>
          <Button
            title="Home dashboard"
            className={isSidebar ? "justify-start" : ""}
            asChild
            variant="ghost"
            size={isSidebar ? "sm" : "icon"}
            type="button"
          >
            {isSidebar ? (
              <Link to="/dashboard" className="flex gap-2">
                <HomeIcon size={16} /> Home
              </Link>
            ) : (
              <Link to="/dashboard">
                <HomeIcon size={16} />
              </Link>
            )}
          </Button>
          <span className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5">
            {isSidebar ? "Notes" : <hr />}
          </span>
          <form className="flex flex-col gap-2" onSubmit={handleForm}>
            <div className="max-h-[40vh] overflow-y-auto">
              {notes
                .filter((note) => note.userId === session?.user.id)
                .map((note) => {
                  return (
                    <Button
                      key={note.id}
                      title={note.title}
                      className={isSidebar ? "justify-start" : ""}
                      asChild
                      variant="ghost"
                      size={isSidebar ? "sm" : "icon"}
                      type="button"
                    >
                      {isSidebar ? (
                        <div className="w-full flex justify-between gap-2">
                          <Link
                            className="text-ellipsis overflow-hidden"
                            to={`/dashboard/note/${note.id}`}
                          >
                            {note.title}
                          </Link>
                          <button
                            type="submit"
                            onClick={() => {
                              setSubmitType("delete");
                              setSelectedId(note.id!);
                            }}
                            className="p-1 rounded-md hover:bg-foreground hover:text-background"
                          >
                            <TrashIcon size={14} />
                          </button>
                        </div>
                      ) : (
                        <Link to={`/dashboard/note/${note.id}`}>
                          <StickyNoteIcon size={16} />
                        </Link>
                      )}
                    </Button>
                  );
                })}
            </div>
            <Button
              title="Create new note"
              onClick={() => setSubmitType("create")}
              className={
                isSidebar
                  ? "w-full justify-between text-ellipsis overflow-hidden gap-2"
                  : ""
              }
              size={isSidebar ? "sm" : "icon"}
              type="submit"
            >
              {isSidebar ? (
                <>
                  Create Note <PlusCircle size={20} />
                </>
              ) : (
                <PlusCircle size={20} />
              )}
            </Button>
          </form>
          <span className="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5">
            {isSidebar ? "Setings" : <hr />}
          </span>
          <div className="flex flex-col gap-4">
            <Button title="profile" type="button" size="icon" variant="ghost">
              <UserButton />
            </Button>
            <ModeToggle />
          </div>
        </>
      )}
    </nav>
  );
};

export default Sidebar;
