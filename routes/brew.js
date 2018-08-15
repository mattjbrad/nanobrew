let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let moment = require('moment');

router.get('/brews', (req, res) => {
    Brew.find({stopped:false}, (err, brews) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render('brews', {brews, moment});
        }
    });
});

router.get('/brews/new', (req, res) => {
    res.render('new');
});

router.get('/brews/:id', (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.render('edit', {brew, moment});
        }
    });
});

router.post('/brews', (req, res) => {
    Brew.create(req.body, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            brew.topic = `/beer/readings/${brew._id}`;
            brew.save();
            res.redirect('brews');
        }
    });
});

router.get('/brews/:id/edit', (req, res) => {
    res.send(`form to edit specific brew ${req.params.id}`);
});

router.get('/brews/:id/graph', (req, res) => {
    res.render('graph');
});

router.put('/brews/:id', (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, req.body, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect(`/brews`);
        }
    });
});

router.get('/brews/:id/stop', (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, {stopped:true}, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect(`/brews`);
        }
    });
});

router.delete('/brews/:id', (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.redirect('/brews');
        }
    });
});

module.exports = router;