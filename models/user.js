var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
// define the schema for our user model
var userSchema = new mongoose.Schema({
        username        : {type: String, required:true},
        password        : {type: String}
});

userSchema.plugin(passportLocalMongoose);

// create the model for readings and expose it to our app
module.exports = mongoose.model('User', userSchema);
