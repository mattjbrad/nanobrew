getId = function(){
    return window.location.pathname.replace('/brews/', '');
}

tpLogin = function(){
    
    var id = getId();
    const tpLoginUrl = `/brews/${id}/login`;

    var request = {
        url         :   tpLoginUrl,
        data        :      {
            email    : $('#email').val(),
            password: $('#password').val()
        }
    };

    $.post(tpLoginUrl, request.data, function(data, status) {
        if(status==='success'){
            console.log('calling get devices');
            getDevices();
            $('#login-form').hide();
            $('#login-div p').text('Logged in like a dream');
        }
    });

}

getDevices = function(){
    var id = getId();

    var tpGetDeviceUrl = `/brews/${id}/devices`;

    var request = {
        url         :   tpGetDeviceUrl,
        data        :      {
            method    : 'getDeviceList'
        }
    };

    $.get(request, function(data){
        if (data){
            for (var i = 0; i<data.length ; i++){
                var listItem = $("<option></option>").text(data[i].alias).attr("value", data[i].deviceId);
                $('#devices').append(listItem);
            }
        } else {
            console.log('No devices are linked to this account');
        }
    });
}

setDevice = function(){

    var deviceId = $("#devices").val();
    var url = window.location.pathname+'/devices'
    if (deviceId !== null){
        var request = {
            url: url,
            type: 'put',
            data: {deviceId : deviceId},
            success: function(result) {
                console.log(result);
                $('#select-device').hide();
                $('#device-div p').text('Device has been linked succesfully');
            }
        }
        console.log(request);
        $.ajax(request);
    }
}

testDevice = function(){

    var url = window.location.pathname+'/devices/test';
    


}