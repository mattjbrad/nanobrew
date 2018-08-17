// NPM Dependencies
const   express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        methodOverride = require("method-override"),
        path = require("path"),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        flash = require('connect-flash'),
        cookieParser = require('cookie-parser'),
        session = require('express-session');

//Project dependencies
const   indexRoutes = require('./routes/index'),
        brewRoutes = require('./routes/brew'),
        readingRoutes = require('./routes/reading'),
        powerRoutes = require('./routes/tplink'),
        archiveRoutes = require('./routes/archive'),
        User = require('./models/user');

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

app.use(cookieParser('malt yeast and hops'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Passport Config
app.use(require('express-session')({
    secret: 'who loves beer, I do???',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

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