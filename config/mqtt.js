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

module.exports = moscaSettings;