const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: '' },
    email: { type: String, required: ''},
    password: { type: String, required: ''}
});

module.exports = mongoose.model('users', userSchema );