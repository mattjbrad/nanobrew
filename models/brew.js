const mongoose = require('mongoose');

// define the schema for our user model
var brewSchema = new mongoose.Schema({
    name                : {type: String, required: true},
    minTemp             : {type: Number, required: true},
    maxTemp             : {type: Number, required: true},
    topic               : {type: String},
    created             : {type: Number, default:new Date().getTime()},
    finished            : Number,
    stopped             : false,
    deviceId            : String,
    token               : String,
    readings            : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reading"
    }]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Brew', brewSchema);
