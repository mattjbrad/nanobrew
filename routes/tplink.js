let express = require('express');
let router = express.Router();
let Brew = require('../models/brew');
let uuidv4 = require('uuid/v4');
let needle = require('needle');

let middleware = require('../middleware');
const tpLinkUrl = 'https://wap.tplinkcloud.com';
const options = {
    headers: { 'Content-Type': 'application/json' }
};

router.post('/brews/:id/login', middleware.checkOwnership, (req, res) => {
    let requestBody = {
        method: "login",
        params: {
            appType: "Kasa_Android",
            cloudUserName: req.body.email,
            cloudPassword: req.body.password,
            terminalUUID:  uuidv4()
        }
    };

    if(requestBody.params.cloudUserName && requestBody.params.cloudPassword){  
        needle.post(tpLinkUrl, requestBody , options,
            (err, result) => {
                if (result.statusCode === 200){
                    var jsonResponse = JSON.parse(result.body);
                    let token = { token : jsonResponse.result.token };
                    Brew.findByIdAndUpdate(req.params.id, token, (err, brew) => {
                        if (err) {
                            console.log(err);
                            res.send('Something went wrong logging in, try again please');
                        } else {
                            brew.save();
                            res.send(!!token);                        
                        }
                    });
                }
            });
    }
});

router.get('/brews/:id/devices', middleware.checkOwnership, (req, res) => {
    let requestBody = {method:'getDeviceList'};
    Brew.findById(req.params.id, (err, brew) => {
        if (err) {
            console.log(err);
            res.send('something went wrong');
        } else {
            needle.post(tpLinkUrl+`?token=${brew.token}`, requestBody, options, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send('Something went wrong');
                } else {
                    console.log(result.body);
                    let jsonResponse = JSON.parse(result.body);
                    console.log(jsonResponse);
                    let devices = jsonResponse.result.deviceList;
                    var data = [];
                    devices.forEach((device) => {
                        data.push({
                            alias           : device.alias,
                            deviceId        : device.deviceId,
                            appServerUrl    : device.appServerUrl
                        });
                    });
                    res.send(data);
                }
            })
        }
    });
});

router.get('/brews/:id/devices/reset', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, {
        token : '',
        deviceId:''
    }, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(cleanObj(brew));
        }
    });
});

router.put('/brews/:id/devices', middleware.checkOwnership, (req, res) => {
    Brew.findByIdAndUpdate(req.params.id, req.body, (err, brew) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            res.send(cleanObj(brew));
        }
    });
});

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