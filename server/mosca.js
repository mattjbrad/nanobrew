const mosca = require('mosca');
let mongoose = require('mongoose');
let needle = require('needle');

let Brew = require('../models/brew');
let Reading = require('../models/reading');

mongoose.connect('mongodb://localhost:27017/nanobrew');

let moscaSettings = require('../config/mqtt');
let clientSettings = require('../config/client');

let server = new mosca.Server(moscaSettings);

server.on('ready', ()=>{
    console.log('MQTT Broker Successfully Connected');
});

server.on('clientConnected', function(client) {
    //prevent connections from other devices
    if (client.id!==clientSettings.id || client.id!==clientSettings.webid){
        console.log('closing client', client.id, client);
        client.close();
    }
    console.log('client connected', client.id);
});

server.on('published', (packet, client) => {
    if (packet.topic.includes('/beer/readings')){
        let payloadString = packet.payload.toString('utf-8');
        try {
            let reading = JSON.parse(payloadString);
            let id = packet.topic.substring(15);

            Brew.findById(id, (err, brew) => {
                if (err) {
                    console.log(err);
                    res.send("Something went wrong");
                } else {
                    Reading.create(reading, (err, reading) => {
                        if (err) {
                            console.log(err);
                            res.send('something went wrong');
                        } else {
                            brew.readings.push(reading);
                            brew.save();
                            checkLimits(brew, reading.temp);
                        }
                    });
                }
            });

        } catch(e) {
            console.log(e);
        }    
    }
});

function checkLimits(brew, temp){

    let minTemp = brew.minTemp;
    let maxTemp = brew.maxTemp;
    let ideal = minTemp+((maxTemp-minTemp)/2);

    if(temp<=ideal){
        triggerSwitch(brew.token, brew.deviceId, 1);
    }

    if(temp>ideal){
        triggerSwitch(brew.token, brew.deviceId, 0);
    }
}

function triggerSwitch(token, deviceId, power){

    let url = `https://eu-wap.tplinkcloud.com/?token=${token}`;
    let options = {
		headers: { 'Content-Type': 'application/json' }
    };
    let body = {
        "method":"passthrough",
         "params":{
         "deviceId":deviceId,
         "requestData":"{\"system\":{\"set_relay_state\":{\"state\":"+power+"}}}"
         }
    };

	needle.post(url, body, options,
		function (err, response){
            if(err){     
                console.log("something went wrong");
                console.log(err);
            }
		});
};

module.exports = server;