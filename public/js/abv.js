var og = $('#og')[0];
var fg = $('#fg')[0];
var abv = $('#abv');

var calculateABV = function(){
    var ogReading = og.valueAsNumber;
    var fgReading = fg.valueAsNumber;
    if(ogReading&&fgReading&&abv){
        abv.val(((ogReading-fgReading)*131.25).toFixed(2));
    }
}

window.onload = function() { calculateABV(); };
og.onchange = function() { calculateABV(); };
fg.onchange = function() { calculateABV(); };
