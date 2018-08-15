let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let moment = require('moment');

router.get('/archive', (req, res) => {
    Brew.find({}, (err, brews) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render('archive/archive', {brews, moment});
        }
    });
});

router.get('/archive/:id', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render('archive/view', {brew, moment});
        }
    });
});

router.get('/archive/:id/created', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send({created: brew.created});
        }
    });
});

router.get('/archive/:id/graph', (req, res) => {
    res.render('archive/graph');
});

router.delete('/archive/:id', (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect('/archive');
        }
    });
});

module.exports = router;