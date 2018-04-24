const mongoose = require('mongoose');
const dbConn = mongoose.createConnection('mongodb://localhost:27017/nanobrew');
const moment = require('moment');

// define the schema for our user model
var brewSchema = mongoose.Schema({
    name                : {type: String, required: true},
    minTemp             : {type: Number, required: true},
    maxTemp             : {type: Number, required: true},
    topic               : {type: String, required: true},
    created             : {type: Number, default:new moment()},
    finished            : Number,
    stopped             : false,
    readings            : {
        id  :   {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reading"
        }
    }
});

// create the model for users and expose it to our app
module.exports = dbConn.model('Brew', brewSchema);
