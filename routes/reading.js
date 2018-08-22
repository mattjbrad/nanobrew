let express = require('express');
let router = express.Router();
let moment = require('moment');

let Brew = require('../models/brew');
let Reading = require('../models/reading');
let middleware = require('../middleware');

router.get('/brews/:id/graph/reading',  (req, res) => {
    Brew.findOne({_id:req.params.id}).populate(
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
            res.send(cleanObj(brew));
        }
    });
});

router.get('/archive/:id/graph/reading', (req, res) => {
    Brew.findOne({_id:req.params.id}).populate(
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
            res.send(cleanObj(brew));
        }
    });
});

router.post('/brews/:id/reading', middleware.checkOwnership, (req, res) => {
    Brew.findById(req.params.id, (err, brew) => {
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

router.get('/brews/:id/reading/:readingId', (req, res) => {
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

cleanObj = (brew) => {
    let cleanBrew = {
        creator: brew.creator,
        created: brew.created,
        readings: brew.readings,
        _id: brew['_id'],
        name: brew.name,
        minTemp: brew.minTemp,
        maxTemp: brew.maxTemp,
        topic: brew.topic
    };
    return cleanBrew;
};


module.exports = router;