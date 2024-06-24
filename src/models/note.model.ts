import { Schema, model } from "mongoose";
import { INote } from "src/interfaces/note.interface";

const NoteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

export default model<INote>("Note", NoteSchema);
