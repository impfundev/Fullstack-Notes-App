import axios from "axios";
import { Notes } from "./types";

const noteApiUrl = "https://65daf43b3ea883a15290ec32.mockapi.io/api/notes";

const getNotes = () => {
  const request = axios.get(noteApiUrl);
  return request.then((response) => response.data);
};

const postNotes = (newNote: Notes) => {
  const request = axios.post(noteApiUrl, newNote);
  return request.then((response) => response.data);
};

const deleteNotes = (id?: string) => {
  const request = axios.delete(`${noteApiUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateNotes = (id?: string, newObject?: Notes) => {
  const request = axios.put(`${noteApiUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export { getNotes, postNotes, deleteNotes, updateNotes };
