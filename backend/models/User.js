const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required']},
    email: {type: String, required: [true, 'Email is missing'], unique: [true, 'Email is already registered']},
    password: {type: String, required: [true, 'Password is required']},
    token: {type: String},
});

module.exports = mongoose.model('User', UserSchema);