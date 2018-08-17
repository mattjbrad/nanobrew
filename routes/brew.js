let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let moment = require('moment');
let middleware = require('../middleware');

router.get('/brews', (req, res) => {
    Brew.find({stopped:false}, (err, brews) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render('brews', {brews, moment, user: req.user});
        }
    });
});

router.get('/brews/new', isLoggedIn, (req, res) => {
    res.render('new');
});

router.get('/brews/:id', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        res.render('edit', {brew, moment});
    });
});

router.post('/brews', middleware.isLoggedIn, (req, res) => {
    Brew.create(req.body, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            brew.topic = `/beer/readings/${brew._id}`;
            brew.creator.id = req.user._id;
            brew.creator.username = req.user.username;
            brew.save();
            res.redirect('brews');
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
            res.send("Something went wrong");
        } else {
            res.redirect(`/brews`);
        }
    });
});

router.get('/brews/:id/stop', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, {stopped:true}, (err) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect(`/brews`);
        }
    });
});

router.delete('/brews/:id', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect('/brews');
        }
    });
});

module.exports = router;