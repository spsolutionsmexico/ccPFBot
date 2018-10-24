"use strict"
var log4js = require('log4js');
var logger = log4js.getLogger();

var TokenServices = require('./tokenService');

module.exports = {

    metadata: () => ({
        "name": "getToken",
        "properties": {
            "curp": { "type": "string", "required": true },
            "operacion": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),
    
    invoke: (conversation, done) => {
        var curp = conversation.properties().curp;
        var operacion = conversation.properties().operacion;
        //conversation.reply('curp');
        //conversation.token=TokenServices.token();
        var token=TokenServices.token();
        conversation.variable("token",token);
        //conversation.reply({text: 'curp: '+curp});
        
        if(operacion==="mi_fondo"){
            conversation.reply({text: 'El token a sido enviado a su celular'});
            conversation.transition("preguntaTokenFondo");
            conversation.action("fondo")
            conversation.keepTurn(true);
            done();
        }else{
            conversation.reply({text: 'mi_fondo /= '+operacion});
            conversation.keepTurn(true);
            conversation.transition("preguntaToken");
            done();
        }
    }
};
