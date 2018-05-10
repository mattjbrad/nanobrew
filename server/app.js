// NPM Dependencies
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override");

var Brew = require('../models/brew');
var Reading = require('../models/reading');

//Project dependencies
const indexRoutes = require('../routes/index');
const brewRoutes = require('../routes/brew');
const readingRoutes = require('../routes/reading');
const powerRoutes = require('../routes/tplink');

var mosca = require('./mosca');

mongoose.connect('mongodb://localhost:27017/nanobrew');

//Setting up the express server
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static('public'));
app.use(methodOverride("_method"));

const port = process.env.port || 3000;

//Import routes for brews, readings and other
app.use(brewRoutes);
app.use(readingRoutes);
app.use(powerRoutes);
app.use(indexRoutes);

//Start the server
app.listen(port, () => console.log(`Nanobrew listening on port ${port}!`));

//Export app for the mocha tests to run
module.exports = app;