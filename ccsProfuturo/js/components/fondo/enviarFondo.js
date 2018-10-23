"use strict"

var FondoServices = require('./FondoService');

module.exports = {

    metadata: () => ({
        "name": "fondo",
        "properties": {
            "numCuenta": { "type": "int", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
		conversation.reply(FondoServices.fondo());
		conversation.transition();
		done();
    }
};
