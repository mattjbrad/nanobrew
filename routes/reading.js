let express = require('express');
let router = express.Router();

let Reading = require('../models/reading');

router.get('/reading', (req, res) => {
    Reading.find({}, (err, readings) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(readings);
        }
    });
});

router.post('/reading', (req, res) => {
    Reading.create(req.body, (err, reading) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

router.get('/reading/:id', (req, res) => {
    Reading.findById(req.params.id, (err, reading) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

router.put('/reading/:id', (req, res) => {
    Reading.findByIdAndUpdate(req.params.id, req.body, (err, reading) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

router.delete('/reading/:id', (req, res) => {
    Brew.findByIdAndRemove(req.params.id, (err, reading) => {
        if (err) {
            console.log(reading);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

module.exports = router;