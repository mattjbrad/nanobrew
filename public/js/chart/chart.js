var minute_refresh = 1;

if(window.location.pathname.includes('brews')){
  window.onload = function() { refresh_data(); };
  var interval = 1000 * 60 * minute_refresh;
  setInterval(refresh_data, interval);
} else {
  window.onload = function() { setDates(refresh_data); };
}

var ctx = document.getElementById("tempChart");

var refresh_data = function(type) {

  var getUrl;
  if( window.location.pathname.includes('archive')){
    getUrl = `${window.location.pathname}/reading?from=${getFrom()}&to=${getTo()}`;
  } else if (window.location.pathname.includes('brews')){
    getUrl = `${window.location.pathname}/reading?range=${getSliderValue()}`;
  } 

  if (getUrl) {
    $.get(getUrl, function(data, status){
      var graphData = transformData(data.readings);
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: graphData.labels,
            datasets: [{
                label: 'Temperature',
                data: graphData.points,
                borderColor: "rgba(77,184,255,0.9)",
                radius:2
            }]
        },
        options: {
          legend: {
            labels:{
              fontColor: "white"
            }
          },
          scales: {
            xAxes: [{
              ticks:{
                fontColor: "white"
              },
              gridLines:{
                color:"rgba(255,255,255,0.1)"
              },
              type:'time',
              time: {
                displayFormats: {
                  hour: 'hA'
                }
              }
            }],
            yAxes : [{
              ticks:{
                fontColor:"white",
                suggestedMin:data.minTemp-2,
                suggestedMax:data.maxTemp+2
              },
              gridLines:{
                color:"rgba(255,255,255,0.1)"
              }
            }]
          },
          annotation: {
            events: ["click"],
            annotations: [
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data.minTemp,
                borderColor: "rgba(251,123,6,0.9)",
                borderWidth: 2,
              },
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data.maxTemp,
                borderColor: "rgba(166,6,6,0.9)",
                borderWidth: 2,
              }
            ]
          }
        }
      });
    });
  }
};

transformData = function(data){
    var graphData = {}; 
    var points = [];
    var labels = [];
    //variable to store when the last reading was graphed
    var lastTimeInterval;
    for (var i=0; i<data.length; i++){
      //for the next reading, get the current time code and store it
      var currentTimeInterval = moment(data[i].time).format(getFrequency());
      //If they are different, then the time interval doesn't have a reading so graph it
      if( currentTimeInterval !== lastTimeInterval){
        points.push({
          x: data[i].time,
          y: data[i].temp
      });
      labels.push(data[i].time);
      //Change the interval so it is the new value
      lastTimeInterval = currentTimeInterval;
      }
    }
    graphData.points = points;
    graphData.labels = labels;
    return graphData;
};

slider.on('change', refresh_data);

simReading = function(){
  var reading = {
    temp: $('#sim-temp').val()
  };
  var url = `${window.location.pathname.slice(0,31)}/reading`;
  console.log(url);
  $.post(url, reading, refresh_data);
}

var from = $('#datePickerFrom input');
var to = $('#datePickerTo input');

getFrom = function() {
  var date;
  if (from.val() ){
    date = moment(from.val(), 'Do MMM YYYY, h:mm:ss a').toISOString();
  }
  return date;
};

getTo = function() {
  var date;
  if (to.val() ){
    date = moment(to.val(), 'Do MMM YYYY, h:mm:ss a').toISOString();
  }
  return date;
};

getFrequency = function() {
  return $('#frequency').val();
}

setDates = function(callback) {
  to.val(moment().format('Do MMM YYYY, h:mm:ss a'));
  $.get(window.location.pathname.slice(0, 34)+'created', function(data){
    if (data){
      from.val(moment(data.created).format('Do MMM YYYY, h:mm:ss a'));
    }
    callback();
  });
}