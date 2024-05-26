const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    }, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
    
});

module.exports = mongoose.model('Note', NoteSchema);