import Dashboard from "@/components/layout/Dashboard";
import Layout from "@/components/layout/Layout";
import NoteEditor from "@/components/ui/editor";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateNotes } from "@/lib/action";
import { useNote } from "@/store/note";

const Note = () => {
  const { id } = useParams();
  const { note, setNote } = useNote();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);
      await updateNotes(id).then((response) => setNote(response));
      isLoading(false);
    };
    fetchData().catch(console.error);
    return;
  }, []);

  return (
    <Dashboard>
      <Layout>
        {loading ? (
          <>
            <Skeleton className="my-4 mx-10 h-[10vh]" />
            <Skeleton className="mx-10 h-[80vh]" />
          </>
        ) : (
          <NoteEditor note={note} id={id!} />
        )}
      </Layout>
    </Dashboard>
  );
};

export default Note;
