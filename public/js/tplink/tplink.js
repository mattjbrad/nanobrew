tpLogin = function(){
    
    const tpLoginUrl = 'https://wap.tplinkcloud.com';
    
    var requestBody = {
        method: "login",
        params: {
            appType: "Kasa_Android",
            cloudUserName: $('#email').val(),
            cloudPassword: $('#password').val(),
            terminalUUID: uuidv4()
        }
    };
    var request = {
        url         :   tpLoginUrl,
        data        :   requestBody,
        crossDomain :   true
    };

    $.post(JSON.stringify(request), function(data) {
        console.log(data);
    });
    

}