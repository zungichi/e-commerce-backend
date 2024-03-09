const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

userSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

module.exports = {User};