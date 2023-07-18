const mongoose = require('mongoose');

const DocsSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required']},
    content: {type: String, required: [true, 'Content is required']},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Docs', DocsSchema);