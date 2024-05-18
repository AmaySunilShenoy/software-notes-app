const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');

// Create a new note
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({
            title,
            content
        });
        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {c
        res.status(500).json({ message: err.message });
    }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.title = title;
        note.content = content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        await note.remove();
        res.json({ message: 'Note removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
