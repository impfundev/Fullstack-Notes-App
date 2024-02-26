import { create } from "zustand";

type Notes = {
  notes: {
    id?: string;
    title?: string;
    content?: string;
  }[];
};

type NoteAction = {
  setNotes: (notes: Notes["notes"]) => void;
};

export const useAllNote = create<Notes & NoteAction>((set) => ({
  notes: [],
  setNotes: (notes) => set(() => ({ notes: notes })),
}));
