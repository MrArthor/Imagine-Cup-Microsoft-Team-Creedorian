const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    FullName: String,
    Email: String,
    Message: String,
});

module.exports = mongoose.model('FeedbackModel', FeedbackSchema);