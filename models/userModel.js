const mmogooose = require('mongoose');

const userSchema = mew Mongoose.Schems({
    username: {type: String, required: true, unique: true},
    passwprd: {type: String, required: true,}
});

module.exports = mongoose.model('User', userSchema);