let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let moment = require('moment');
let middleware = require('../middleware');

router.get('/brews', (req, res) => {
    req.flash('info', 'Hello');
    Brew.find({stopped:false}, (err, brews) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong getting the brews');
            res.redirect("/");
        } else {
            res.render('brews', {brews, moment});
        }
    });
});

router.get('/brews/new', middleware.isLoggedIn, (req, res) => {
    res.render('new');
});

router.get('/brews/:id', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong getting that brew');
            res.redirect("/brews");
        } else {
            res.render('edit', {brew, moment});
        }
    });
});

router.post('/brews', middleware.isLoggedIn, (req, res) => {
    Brew.create(req.body, (err, brew) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry we couldn\t create that brew');
            res.redirect("/brews");
        } else {
            brew.topic = `/beer/readings/${brew._id}`;
            brew.creator.id = req.user._id;
            brew.creator.username = req.user.username;
            brew.save();
            req.flash('success', 'Your brew was created');
            res.redirect(`/brews/${brew._id}`);
        }
    });
});

router.get('/brews/:id/graph', (req, res) => {
    res.render('graph');
});

router.put('/brews/:id', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong updating that brew');
            res.redirect(`/brews/${req.params.id}`);
        } else {
            req.flash('success', 'Brew was updated');
            res.redirect(`/brews`);
        }
    });
});

router.get('/brews/:id/stop', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, {stopped:true}, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong stopping that brew');
            res.redirect(`/brews/${req.params.id}`);
        } else {
            req.flash('success', 'Your brew was stopped');
            res.redirect(`/brews/${req.params.id}`);
        }
    });
});

router.delete('/brews/:id', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong deleting that brew');
            res.redirect(`/brews/${req.params.id}`);
        } else {
            req.flash('success', 'That brew was deleted');
            res.redirect('/brews');
        }
    });
});

module.exports = router;