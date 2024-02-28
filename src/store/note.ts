import { create } from "zustand";

type Note = {
  note: {
    id?: string;
    title?: string;
    content?: string;
    user?: string | null;
    userId?: string;
  };
};

type NoteAction = {
  setNote: (notes: Note["note"]) => void;
};

export const useNote = create<Note & NoteAction>((set) => ({
  note: {
    id: "",
    title: "",
    content: "",
    user: "",
    userId: "",
  },
  setNote: (note) => set(() => ({ note: note })),
}));
