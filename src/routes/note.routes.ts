import express from "express";
import * as noteController from "../controllers/note.controller";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const note = await noteController.createNote({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json({ message: "Note created successfully!", note: note });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const notes = await noteController.getNotes();
    res.status(200).json({ message: "Note read successfully!", note: notes });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const note = await noteController.getNote(req.params.id);
    res.status(200).json({ message: "Note read successfully!", note: note });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const note = await noteController.updateNote(req.params.id, {
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json({ message: "Note updated successfully!", note: note });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await noteController.deleteNote(req.params.id);
    res.status(200).send({ message: "Note deleted successfully!" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
