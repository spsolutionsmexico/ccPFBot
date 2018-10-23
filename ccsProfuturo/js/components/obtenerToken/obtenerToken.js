"use strict"
var log4js = require('log4js');
var logger = log4js.getLogger();

var TokenServices = require('./tokenService');

module.exports = {

    metadata: () => ({
        "name": "getToken",
        "properties": {
            "curp": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),
    
    invoke: (conversation, done) => {
        var curp = conversation.properties().accountType;
        //conversation.reply('curp');
        //conversation.token=TokenServices.token();
        var token=TokenServices.token();
        conversation.variable("token",token);
        conversation.keepTurn(true);
        conversation.transition("askToken");
        done();
    }
};
