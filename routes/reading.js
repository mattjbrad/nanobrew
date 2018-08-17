let express = require('express');
let router = express.Router();
let moment = require('moment');

let Brew = require('../models/brew');
let Reading = require('../models/reading');

router.get('/brews/:brewId/graph/reading',  (req, res) => {
    Brew.findOne({_id:req.params.brewId}).populate(
        {path:'readings', 
            match: 
            { time : 
                { $gte : moment().subtract(parseInt(req.query.range), 'h')}
            }
        }).exec((err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(brew);
        }
    });
});

router.get('/archive/:brewId/graph/reading', (req, res) => {
    Brew.findOne({_id:req.params.brewId}).populate(
        {path:'readings', 
            match : {
                $and : [
                    { time : 
                        { $gte : req.query.from}
                    },
                    { time : 
                        { $lte : req.query.to}
                    }
                ]
            }
        }).exec((err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(brew);
        }
    });
});

router.post('/:brew/:brewId/reading', (req, res) => {
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

// router.put('/brews/:brewId/reading/:readingId', (req, res) => {
//     Reading.findByIdAndUpdate(req.params.readingId, req.body, (err, reading) => {
//         if (err) {
//             console.log(err);
//             res.send("Something went wrong");
//         } else {
//             res.send(reading);
//         }
//     });
// });

// router.delete('/brews/:brewId/reading/:readingId', (req, res) => {
//     Reading.findByIdAndRemove(req.params.readingId, (err, reading) => {
//         if (err) {
//             console.log(reading);
//             res.send("Something went wrong");
//         } else {
//             res.send(reading);
//         }
//     });
// });

module.exports = router;