const Note = require('../models/note.model');

// Create a new note
const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Missing Fields' });
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
};

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single note by ID
const getNote = async (req, res) => {
    try {
        if(!req.params.id) return res.status(400).json({ message: 'Missing ID' });

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        if(!req.params.id) return res.status(400).json({ message: 'Missing ID' });

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a note
const deleteNote = async (req, res) => {
    try {
        if(!req.params.id) return res.status(400).json({ message: 'Missing ID' });
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
};