// NPM Dependencies
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Project dependencies
const indexRoutes = require('../routes/index');
const brewRoutes = require('../routes/brew');
const readingRoutes = require('../routes/reading');

//Setting up the express server
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static('public'));
const port = process.env.port || 3000;


//Import routes for brews, readings and other
app.use(brewRoutes);
app.use(readingRoutes);
app.use(indexRoutes);

//Start the server
app.listen(port, () => console.log(`Nanobrew listening on port ${port}!`));

//Export app for the mocha tests to run
module.exports = app;