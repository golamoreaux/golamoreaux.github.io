$(function(){
    
    var serverStateOn = false;
    var serverAddress = "40.112.223.227";
    var playerCount = 0;
    var serverName = "lamoreaux";
    var serviceUrl = "https://functionapp20180308020357.azurewebsites.net/api/activity?code=4NBDRS/PxU2mJiEzuHLB/qpNszq9jWGjzCFWdaxyGxWc5TXyv1elLQ==";
    
    $(".switch-lg :checkbox").on("change", function(){

        if (this.checked) {
            // Turn server on.

            var data = {
                "operation": "Start"
            };

            $.ajax({
                type: "GET",
                url: serviceUrl + "&operation=start",
                success: function(r){
                    console.log(r);
                }
            });
            console.log("checked");

        } else {
            // Turn server off.
            var data = {
                "operation": "Stop"
            };

            $.ajax({
                type: "GET",
                url: serviceUrl + "&operation=stop",
                success: function(r){
                    console.log(r);
                }
            });

            console.log("not checked");
        }
        
    })

    $.getJSON( serviceUrl, function( data ) {
        
        $(".switch").show();
        $(".spinner").hide();
        $(".result" ).text( data.status);

        if(data.status == "PowerState/running"){
            $('.switch-lg :checkbox').prop('checked', true);
        } else {
            $('.switch-lg :checkbox').prop('checked', false);
        }


    });

    MinecraftAPI.getServerStatus(serverAddress, {
        port: 25565 // optional, only if you need a custom port
      }, function (err, status) {
        if (err) {
            serverStateOn = false;
            $('.serverInfo').hide();
        } else {
            playerCount = status.players.now;
            serverStateOn =  status.online;

            // $('.switch-lg :checkbox').prop('checked', serverStateOn);
            $('.serverInfo .t').text(status.motd);
            $('.serverInfo .op').text(status.players.now);
            $('.serverInfo .v').text(status.server.name);

        }
    });
})