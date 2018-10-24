"use strict"
var log4js = require('log4js');
var logger = log4js.getLogger();

var request = require('request'),
    	username = "rcarrasco@spsolutions.com.mx",
    	password = "Mng85747372#",
    	url = "https://18949DC7A9A64CE9BCB09F98175E3E8F.mobile.ocp.oraclecloud.com:443/mobile/system/databaseManagement/tables",
    	auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        module.exports = {

            metadata: () => ({
                "name": "dblocal",
                "properties": {
                    "name": { "type": "string", "required": true }
                },
                "supportedActions": []
            }),
        
            invoke: (conversation, done) => {
                logger.info('request start');
        		request(
                    {
                    url : url,
                    headers : {
                        "Authorization" : auth,
                        "Oracle-Mobile-Backend-Id":"c4fbbadb-7af4-4175-a114-8df5e1974e42",
                        "Content-Type":"application/json"
                    }
                    },
                function (error, response, body) {
                if(error){
                    //logger.info('error=' + error);
                    conversation.reply({text:'error: '+error});
                    done();
                }
                else{
                    logger.info('response=' + response);
                    logger.info('body=' + body);
                    var reJson= JSON.parse(body);
                    conversation.reply({text: 'resultado: ' +JSON.stringify(reJson[0].name)+':P'});
                    conversation.transition();
                    done();
                    }
                }
                );
            }
        };
        
        