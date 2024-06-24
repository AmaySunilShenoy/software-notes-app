import { INote } from "src/interfaces/note.interface";
import Note from "../models/note.model";
import { HydratedDocument } from "mongoose";

// Create a new note
const createNote = async (note: INote): Promise<INote> => {
  if (!note) throw new Error("Missing note");
  if (!note.title) throw new Error("Missing title");
  try {
    const newNote: HydratedDocument<INote> = new Note(note);

    return await newNote.save();
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Get all notes
const getNotes = async (): Promise<INote[]> => {
  try {
    const notes = await Note.find();
    return notes;
  } catch (err) {
    throw new Error("Error fetching notes");
  }
};

// Get a single note
const getNote = async (id: string): Promise<INote | null> => {
  if (!id) throw new Error("Invalid item id");
  try {
    return await Note.findOne({ _id: id });
  } catch (err) {
    throw new Error("Error fetching note");
  }
};

// Update a note
const updateNote = async (id: string, note: INote): Promise<INote> => {
  if (!id) throw new Error("Invalid item id");
  if (!note) throw new Error("No update passed");
  try {
    const updatedNote = await Note.findOne({ _id: id });

    if (!updatedNote) throw new Error("Note not found");

    if (note.title) updatedNote.title = note.title;
    if (note.content) updatedNote.content = note.content;
    const result = await updatedNote.save();

    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Error updating note");
  }
};

// Delete a note
const deleteNote = async (id: string): Promise<INote> => {
  if (!id) throw new Error("Invalid item id");
  try {
    const note = await Note.findOne({ _id: id });

    if (!note) throw new Error("Note not found");
    const result = await note.remove();

    return result;
  } catch (err) {
    throw new Error("Error deleting note");
  }
};

export { createNote, getNotes, getNote, updateNote, deleteNote };
