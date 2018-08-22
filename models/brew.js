const mongoose = require('mongoose');

// define the schema for our user model
var brewSchema = new mongoose.Schema({
    name                : {type: String, required: true},
    minTemp             : {type: Number, required: true},
    maxTemp             : {type: Number, required: true},
    topic               : {type: String},
    created             : {type: Number, default:new Date().getTime()},
    finished            : Number,
    stopped             : {type: Boolean, default:false},
    deviceId            : String,
    token               : String,
    readings            : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reading"
    }],
    devices             : [],
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    og : Number,
    fg : Number,
    ingredients: {
        malt    : String,
        hops    : String,
        yeast   : String,
        other   : String,
        size    : Number
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Brew', brewSchema);
