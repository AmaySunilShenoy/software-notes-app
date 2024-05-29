const Note = require('../models/note.model');

// Create a new note
const createNote = async (note) => {
    if(!note) throw new Error('Missing note');
    if (!note.title) throw new Error('Missing title');
    try {
        const newNote = new Note(note);
        const result = await newNote.save();
        
        return result
    } catch (err) {
        throw new Error(err);
    }
};

// Get all notes
const getNotes = async () => {
    try {
        const notes = await Note.find();
        return notes;
    } catch (err) {
        throw new Error('Error fetching notes');
    }
};

// Get a single note
const getNote = async (id) => {
    if (!id) throw new Error('Invalid item id');
    try {
        const note = await Note.findOne(id);

        return note;
    }
    catch (err) {
        throw new Error('Error fetching note');
    }
}

// Update a note
const updateNote = async (id, note) => {
    if (!id) throw new Error('Invalid item id');
    if (!note) throw new Error('No update passed')
    try {
        const updatedNote = await Note.findOne(id);

        if(!updatedNote) throw new Error('Note not found');

        if(note.title) updatedNote.title = note.title;
        if(note.content) updatedNote.content = note.content;
        const result = await updatedNote.save();
    
        return result;
    }
    catch (err) {
        console.log(err)
        throw new Error('Error updating note');
    }
}

// Delete a note
const deleteNote = async (id) => {
    if (!id) throw new Error('Invalid item id');
    try {
        const note = await Note.findOne(id);

        if(!note) throw new Error('Note not found');
        const result = await note.remove();

        return result;
    }
    catch (err) {
        throw new Error('Error deleting note');
    }
}




module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
};