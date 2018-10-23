"use strict"

var PromoServices = require('./PromoService');

module.exports = {

    metadata: () => ({
        "name": "promos",
        "properties": {
            "name": { "type": "string", "required": true }
        },
        "supportedActions": []
    }),

    invoke: (conversation, done) => {
		conversation.reply(PromoServices.promo());
		conversation.keepTurn(true);
		conversation.transition();
		
		done();
    }
};
