const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');
const noteController = require('../controllers/note.controller');

router.post('/', async(req, res) => {
  try {
    const note = await noteController.createNote({
      title: req.body.title,
      content: req.body.content
    });
    res.status(200).json({'message': 'Note created successfully!', 'note': note});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async(req, res) => {
    try {
    const notes = await noteController.getNotes();
    res.status(200).json({'message': 'Note read successfully!', 'note': notes});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async(req, res) => {
    try {
    const note = await noteController.getNote(req.params.id);
    res.status(200).json({'message': 'Note read successfully!', 'note': note});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async(req, res) => {
    try {
    const note = await noteController.updateNote(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });
    res.status(201).json({'message': 'Note updated successfully!', 'note': note});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
)

router.delete('/:id', async(req, res) => {
    try {
    await noteController.deleteNote(req.params.id);
    res.status(200).send({'message': 'Note deleted successfully!'});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
)

module.exports = router;
