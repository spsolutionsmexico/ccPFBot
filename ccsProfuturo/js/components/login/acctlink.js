"use strict";

const generator = require('uuid/v4');

module.exports = {

	metadata: () => ({
		"name": "login",
		"properties": {
			"authorizationCode": {
				"type": "string",
				"required": true
			},
			"title": {
				"type": "string",
				"required": true
			},
			"buttonPrompt": {
				"type": "string",
				"required": true
			},
			"cancelPrompt": {
				"type": "string",
				"required": true
			},
			"image": {
				"type": "string",
				"required": true
			},
			"authUrl": {
				"type": "string",
				"required": true
			},
			"callbackUrl": {
				"type": "string",
				"required": true
			}
		},
		"supportedActions": []
	}),

	invoke: (conversation, done) => {
		// retrieve Bot property values from dialog
		const buttonPrompt = conversation.properties().buttonPrompt;
		const cancelPrompt = conversation.properties().cancelPrompt;
		const title = conversation.properties().title;
		const image = conversation.properties().image;
		const authUrl = conversation.properties().authUrl;
		let callbackUrl = conversation.properties().callbackUrl;
		if ((title) && (image) && (authUrl) && (callbackUrl)) {
			const request = conversation.request();
			const callbackToken = conversation.request().message.callbackToken;
			const postbackvar = conversation.request().message.messagePayload.postback;
			// check if callback token is set on request
			if (callbackToken == null && postbackvar !== 'cancel') {
				// define response properties
				const callbackToken = generator();
				const varcallbackURL = callbackUrl + callbackToken;
				const callbackURLEncoded = encodeURIComponent(varcallbackURL);
				const varauthURL = authUrl + callbackURLEncoded;
				// create card
				const MessageModel = conversation.MessageModel();
				let cardActions = [];
				const oauthButton = MessageModel.urlActionObject(buttonPrompt, null, varauthURL);
				const cancelButton = MessageModel.postbackActionObject(cancelPrompt, null, 'cancel');
				cardActions.push(oauthButton);
				cardActions.push(cancelButton);
				const card = MessageModel.cardObject(title, null, image, null, cardActions);
				const cardMessage = MessageModel.cardConversationMessage(null, [card], null);
				conversation.reply(cardMessage);
				// imnportant set request callback with generated token
				conversation.setCallbackToken(callbackToken);
			} else {
				const callbackCode = conversation.request().message.payload.code;
				// TO DO --- code that will take the returned Authorization Code, along with clientId and secret,
				// call the OAuth server and exchange the Authorization Code for an Access Token
				if (callbackCode !== undefined) {
					conversation.variable("authorizationCode", callbackCode);
				} else {
					// handle cancel button use-case
					conversation.variable("authorizationCode", 'canceled');
				}
				conversation.transition();
				// reset
				setTimeout(function(){
					conversation.setCallbackToken(null);
					conversation.reply({text: 'Se ha expirado tu sesión'});	
				}, 2000);
				conversation.setCallbackToken(null);
			}
			done();
		} else {
			conversation.reply({
				text: "issues"
			});
			done();
		}
	}
};