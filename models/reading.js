var mongoose = require('mongoose');
var brewDataConn = mongoose.createConnection('mongodb://localhost:27017/nanobrew');

// define the schema for our user model
var readingSchema = mongoose.Schema({

    reading            : {
        topic       : {type: String, required:true},
        date        : {type: Date, required:true},
        temp        : {type: Number, required:true}
    }

});

// create the model for readings and expose it to our app
module.exports = brewDataConn.model('Reading', readingSchema);
