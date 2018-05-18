var mongoose = require('mongoose');

// define the schema for our user model
var readingSchema = new mongoose.Schema({
        time        : {type: Date, default: Date.now},
        temp        : {type: Number, required:true}
});

// create the model for readings and expose it to our app
module.exports = mongoose.model('Reading', readingSchema);
