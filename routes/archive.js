let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let moment = require('moment');
let middleware = require('../middleware');

router.get('/archive', (req, res) => {
    Brew.find({}, (err, brews) => {
        if (err) {
            console.log(err);
            req.flash('error', 'We couldn\'t find any brews');
            res.redirect("/");
        } else {
            res.render('archive/archive', {brews, moment});
        }
    });
});

router.get('/archive/:id', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            req.flash('error', 'We couldn\'t find that brew ');
            res.redirect('/archive');
        } else {
            res.render('archive/view', {brew, moment});
        }
    });
});

router.get('/archive/:id/created', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry we couldn\t find that data');
            res.send("Something went wrong");
        } else {
            res.send({created: brew.created});
        }
    });
});

router.get('/archive/:id/graph', (req, res) => {
    res.render('archive/graph');
});

router.delete('/archive/:id', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry we could\t delete that brew');
            res.redirect("/archive");
        } else {
            req.flash('success', 'Brew successfully deleted');
            res.redirect('/archive');
        }
    });
});

module.exports = router;