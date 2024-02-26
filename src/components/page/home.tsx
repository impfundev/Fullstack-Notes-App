import Dashboard from "@/components/dashboard";
import Layout from "@/components/dashboard/Layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotebookPenIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { useAllNote } from "@/store/data";
import { useEffect, useState } from "react";
import { deleteNotes, getNotes } from "@/lib/action";

const Home = () => {
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

  return (
    <Dashboard>
      <Layout>
        <div className="p-10">
          <h1 className="font-bold text-2xl">Home</h1>
          <div className="py-10 grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="w-full h-full grid content-center"
            >
              <div className="flex gap-2 items-center justify-center">
                <p className="text-4xl font-semibold">Create Note</p>
                <PlusCircleIcon size={40} />
              </div>
            </Button>
            {notes.map((note) => (
              <Card key={note.id} className="w-full">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent
                  className="prose dark:prose-invert w-full h-[160px] overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: note.content! }}
                />
                <CardFooter className="flex justify-between gap-2">
                  <Button
                    onClick={() => deleteNotes(note.id)}
                    variant="destructive"
                    className="w-full gap-2"
                  >
                    <TrashIcon size={20} />
                    Delete
                  </Button>
                  <Button className="w-full gap-2">
                    <NotebookPenIcon size={20} />
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </Dashboard>
  );
};

export default Home;
