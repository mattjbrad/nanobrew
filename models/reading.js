var mongoose = require('mongoose');

// define the schema for our user model
var readingSchema = mongoose.Schema({
        time        : {type: Number, default:new Date().getTime()},
        temp        : {type: Number, required:true}
});

// create the model for readings and expose it to our app
module.exports = mongoose.model('Reading', readingSchema);
