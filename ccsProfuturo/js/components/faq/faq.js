"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

var FAQService = require('./FAQService');

module.exports = {

    metadata: () => ({
        "name": "FAQ",
        "properties": {
            "nlpVariable": { "type": "string", "required": true }
        },
        "supportedActions": [
        ]
    }),

    invoke: (conversation, done) => {
        var nlpVariable = conversation.properties().nlpVariable;
        var nlpResult = conversation.variable(nlpVariable);
        //logger.debug('FAQ: nlpResult=' + JSON.stringify(nlpResult, null, 2));
        //conversation.reply('FAQ: nlpResult=' + JSON.stringify(nlpResult, null, 2))

        if (nlpResult.intentMatches && Array.isArray(nlpResult.intentMatches.detail.final_norm)) {
            if (nlpResult.intentMatches.detail.final_norm.length > 0) {
                let faq = nlpResult.intentMatches.summary[0];
               if(faq.intent === "estado"){
				   // create image
					const MessageModel = conversation.MessageModel();
					const imageMM = MessageModel.attachmentConversationMessage("image",FAQService.answerFor(faq.intent), null)
					conversation.reply(imageMM);	
			   }
			   else{
			   conversation.reply(FAQService.answerFor(faq.intent))}
            }
        }
        else {
            conversation.reply('No estoy seguro de tu respuesta,¿puedes preguntarme de nuevo?');
        }

        conversation.transition();

        done();
    }
};
