import Dashboard from "@/components/dashboard";
import Layout from "@/components/dashboard/Layout";
import NoteEditor from "@/components/ui/editor";
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
          <h1 className="p-10">Loading data</h1>
        ) : (
          <NoteEditor note={note} id={id!} />
        )}
      </Layout>
    </Dashboard>
  );
};

export default Note;
