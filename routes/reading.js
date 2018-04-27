let express = require('express');
let router = express.Router();

let Brew = require('../models/brew');
let Reading = require('../models/reading');


router.get('/brews/:brewId/reading', (req, res) => {
    Brew.findOne({_id:req.params.brewId}).populate("readings").exec((err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            console.log(brew);
            res.send(brew.readings);
        }
    });
});

router.post('/brews/:brewId/reading', (req, res) => {

    Brew.findById(req.params.brewId, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            Reading.create(req.body, (err, reading) => {
                if (err) {
                    console.log(err);
                    res.send('something went wrong');
                } else {
                    brew.readings.push(reading);
                    brew.save();
                    res.send(reading);
                }
            });
        }
    })
});

router.get('/brews/:brewId/reading/:readingId', (req, res) => {
    Reading.findById(req.params.readingId, (err, reading) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

router.put('/brews/:brewId/reading/:readingId', (req, res) => {
    Reading.findByIdAndUpdate(req.params.readingId, req.body, (err, reading) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

router.delete('/brews/:brewId/reading/:readingId', (req, res) => {
    Reading.findByIdAndRemove(req.params.readingId, (err, reading) => {
        if (err) {
            console.log(reading);
            res.send("Something went wrong");
        } else {
            res.send(reading);
        }
    });
});

module.exports = router;