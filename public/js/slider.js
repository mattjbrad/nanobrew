
var slider = $('#date-range');
var max = 0;
if (slider[0]){
    max = parseInt(slider[0].max);
}

setSliderValue = function(){
    var value = slider.val();
    $('#date').text(invertValue(value));
}

var getSliderValue = function(){
    return invertValue(slider.val());
}

slider.on('input', setSliderValue);

invertValue = function(val){
    return (max+1)-val;
}