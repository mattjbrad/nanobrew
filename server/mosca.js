var request = require('request');
const mosca = require('mosca');
let mongoose = require('mongoose');

let Brew = require('../models/brew');
let Reading = require('../models/reading');

mongoose.connect('mongodb://localhost:27017/nanobrew');

let pubsubsettings = {
    type: 'mqtt',
    json: false,
    mqtt: require('mqtt'),
    host: '127.0.0.1',
    port: 1883
  };

let moscaSettings = {
    port : 1884,
    backend: pubsubsettings
};

let server = new mosca.Server(moscaSettings);

server.on('ready', ()=>{
    console.log('Mosca Started');
});

server.on('published', (packet, client) => {
    if (packet.topic.includes('/beer/readings')){
        var payloadString = packet.payload.toString('utf-8');
        try {
            var reading = JSON.parse(payloadString);
            var id = packet.topic.substring(15);

            Brew.findById(id, (err, brew) => {
                if (err) {
                    console.log(err);
                    res.send("Something went wrong");
                } else {
                    console.log(brew);
                    Reading.create(reading, (err, reading) => {
                        if (err) {
                            console.log(err);
                            res.send('something went wrong');
                        } else {
                            brew.readings.push(reading);
                            brew.save();
                        }
                    });
                }
            });
        } catch(e) {
            console.log(e);
        }    
    }
});

// server.on('clientConnected', function(client){
//     console.log('client connected', client.id);
// });
    

// module.exports = function(server, mongo) {

// 	//{"d": { "temp" : 25.0}} - example message that works with mqtt spy

// 	//{"d": { "topic":"/beer/readings/matt", "temp" : 25.0, "date":"2014-07-08T09:02:21.377"}}

// 	server.on('ready', setup);

// 	function setup() {
// 		initialiseSwitch();
// 	};

// 	server.on('clientConnected', function(client){
// 		console.log('client connected', client.id);
// 	});

// 	server.on('published', readingReceived);

// 	function readingReceived(packet, client){
	
// 		let topic = packet.topic;

// 		if(topic.includes('/beer/readings/')){

// 			var reading = packet.payload.toString('utf8');
// 			var jsonReading = JSON.parse(reading);

// 			var document  = { reading : {
// 								topic : topic,
// 								date : new Date(),
// 								temp: jsonReading.d.temp }
// 							};
// 			var temp = document.reading.temp;

// 			//This needs to find the current brew as well!!!!!

// 			let query = {'data.current':true, 'data.topic':topic};

// 			Brew.findOne(query).exec()
// 				.then((result) => checkLimits(result, temp))
// 				.catch((err) => { return err; }
// 			);

// 			mongo.insertReading('brewData', document);
			
// 		}
// 	}

// 	function checkLimits(result, temp){

// 		let minTemp = result.data.minTemp;
// 		let maxTemp = result.data.maxTemp;

// 		var ideal = minTemp+((maxTemp-minTemp)/2);

// 		if(temp<=ideal&&heating===false){
// 			triggerSwitch(1);
// 		}

// 		if(temp>ideal&&heating===true){
// 			triggerSwitch(0);
// 		}
// 	}

// }


// function initialiseSwitch(){

// 	var options = {
// 		headers: { 'Content-Type': 'application/json' }
// 	};
// 	needle.post(tpConfig.tpUrl+'?token='+tpConfig.token,
// 		{
// 			"method":"passthrough",
// 			 "params":{
// 			 "deviceId":"\""+tpConfig.deviceId+"\"",
// 			 "requestData":"{\"system\":{\"set_relay_state\":{\"state\":0}}}"
// 			 }
// 		}, options,
// 		function (err, response){

// 			if(!err && response.statusCode==200){
// 				console.log('Wifi Plug initialised, power set to off');
// 			}

// 	});

// }

// function triggerSwitch(power){

// 	var options = {
// 		headers: { 'Content-Type': 'application/json' }
// 	};
// 	needle.post(tpConfig.tpUrl+'?token='+tpConfig.token,
// 		{
// 			"method":"passthrough",
// 			 "params":{
// 			 "deviceId":"\""+tpConfig.deviceId+"\"",
// 			 "requestData":"{\"system\":{\"set_relay_state\":{\"state\":"+power+"}}}"
// 			 }
// 		}, options,
// 		function (err, response){

// 			if(!err && response.statusCode==200){
// 				heating = !heating;
// 				console.log('switch triggered, set to '+heating);
// 			}
// 		}
// 	}

// function newToken(email, password, uuid){

// 	let options = {
// 		headers: { 'Content-Type': 'application/json' }
// 	};
// 	let body = {
// 		"method": "login",
// 		"params": {
// 		"appType": "Kasa_Android",
// 		"cloudUserName": ""+email+"",
// 		"cloudPassword": ""+password+"",
// 		"terminalUUID": ""+uuid_gen()+""
// 		}
// 	};

// 	console.log(body);

// 	needle.post('https://wap.tplinkcloud.com', body , options,
// 		function(err, response){
// 			let token = response.body.token;
// 		});
// }

// }

	