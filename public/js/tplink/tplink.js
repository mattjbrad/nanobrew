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
            guiLoggedIn();
            getDevices();
            $('#token-bool')[0].checked = true;
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
                console.log(data);
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
                guiDeviceSelected();
                $('#device-bool')[0].checked = true;
            }
        }
        $.ajax(request);
    }
}

testConnection = function(){
    //TODO
}

toggleHeat = function(){
    $('heat-control').toggle()
}

guiLoggedIn = function(){
    $('#step1-login').hide();
    $('#step1-logged-in').show();
};

guiLogin = function(){
    $('#step1-logged-in').hide();
    $('#step1-login').show();
}

guiDeviceSelected = function(){
    $('#step2-select').hide();
    $('#step2-selected').show();
}

guiChooseDevice = function(){
    $('#step2-selected').hide();
    $('#step2-select').show();
}

resetToken = function(){

    var id = getId();
    var tpResetDeviceUrl = `/brews/${id}/devices/reset`;

    var request = {
        url         :   tpResetDeviceUrl
    };

    $.get(request, function(data){
        if (data){
            $('#token-bool')[0].checked = false;
            $('#device-bool')[0].checked = false;
            guiLogin();
            guiChooseDevice();
        } else {
            console.log('Error resetting the device control');
        }
    });

}

setupScreen = function(){

    //If there is a token already
    if($('#token-bool')[0].checked){
        guiLoggedIn();
    }

    //If a user is authenticated, but no devices to choose then retrieve the list using the token
    if(($('#token-bool')[0].checked)&&($('select option').length<2)){
        getDevices();
    }

    //If there is a device ID already linked
    if($('#device-bool')[0].checked){
        guiDeviceSelected();
    }
 }

 window.onload = setupScreen();