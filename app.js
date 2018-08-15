// NPM Dependencies
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const path = require("path")

//Project dependencies
const indexRoutes = require('./routes/index');
const brewRoutes = require('./routes/brew');
const readingRoutes = require('./routes/reading');
const powerRoutes = require('./routes/tplink');
const archiveRoutes = require('./routes/archive');

mongoose.connect('mongodb://localhost:27017/nanobrew');

//Setting up the express server
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // support json encoded bodies
const assetPath = path.join(__dirname, 'public');
console.log(assetPath);
app.use(express.static(assetPath));
app.use(methodOverride("_method"));

const port = process.env.port || 3000;

//Import routes for brews, readings and other
app.use(brewRoutes);
app.use(readingRoutes);
app.use(powerRoutes);
app.use(archiveRoutes);
app.use(indexRoutes);

//set up the mqtt broker for readings from the device
require('./server/mosca');

//Start the server
app.listen(port, () => console.log(`Nanobrew listening on port ${port}!`));

//Export app for the mocha tests to run
module.exports = app;