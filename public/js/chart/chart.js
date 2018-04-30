var minute_refresh = 1;

// $.urlParam = function(name){
//   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//   return results[1] || 0;
// }
window.onload = function() { refresh_data(); };

var ctx = document.getElementById("tempChart");
var refresh_data = function() {

  $.get(`${window.location.pathname}/reading`, function(data, status){
    var graphData = transformData(data.readings);
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: graphData.labels,
          datasets: [{
              label: 'Temperature',
              data: graphData.points,
              borderColor: "rgba(77,184,255,0.9)",
              radius:3
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
              suggestedMin:18,
              suggestedMax:27
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
              borderColor: "rgba(166,6,6,0.9)",
              borderWidth: 2,
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: data.maxTemp,
              borderColor: "rgba(251,123,6,0.9)",
              borderWidth: 2,
            }
          ]
        }
      }
    });
  });
};

var interval = 1000 * 60 * minute_refresh;

setInterval(refresh_data, interval);

transformData = function(data){
    var graphData = {}; 
    var points = [];
    var labels = [];
    for (var i=0; i<data.length; i++){
        points.push({
            x: data[i].time,
            y: data[i].temp
        });
        labels.push(data[i].time);
    }
    graphData.points = points;
    graphData.labels = labels;
    return graphData;
};