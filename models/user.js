var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = new mongoose.Schema({
        email       : {type: String, required:true},
        password    : {type: String, required:true}
});

// create the model for readings and expose it to our app
module.exports = mongoose.model('User', userSchema);
