const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        //unique: true
    },
    ContactNumber: Number,
    Address: String,
    Type: String,
    Name: String,
    Password: String
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserModel', UserSchema);