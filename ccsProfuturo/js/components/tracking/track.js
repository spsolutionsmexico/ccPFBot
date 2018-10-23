"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = {

    metadata: () => ({
        "name": "track",
        "properties": {
            "nlpVariable": { "type": "string", "required": true },
			"track": {"type": "string","required": true},
			"tempQuery": {"type": "string","required": true},
			"eleccion" : {"type": "string","required": true},
			"user" : {"type": "string","required": true}
        },
        "supportedActions": ["bienvenida","despedida","unresolved","fondo","registro", "transpaso"]
    }),

    invoke: (conversation, done) => {
        var nlpVariable = conversation.properties().nlpVariable;
        var nlpResult = conversation.variable(nlpVariable);
       
		var tmpTrack = conversation.properties().track;
	    var tmpQuery = conversation.properties().tempQuery;
		var eleccion = conversation.properties().eleccion;
		let user = conversation.properties().user;
		var action = "";
		var tracking = "";

        var intent = nlpResult.intentMatches.summary[0].intent;
		var query =  nlpResult.query;
		
		if(tmpQuery == query){
			query = "Seleccion de opciones";
			switch(eleccion) {
			 case "fondo":	
			 action = "fondo";
			 intent = "se apreto la opcion de enviar fondo";
			 break;
			 case "registro":
			 action = "registro"
			 intent = "se apreto la opcion de registro";
			 break;
			 case "transpaso":
			 action = "transpaso"
			 intent = "se apreto la opcion de transpaso";
		}
		}
		else{	
        switch(intent) {
			 case "saludos":	
			 action = "bienvenida";
			 break;
			 case "despedida":
			 action = "despedida";
			 break;
			 case "unresolvedIntent":
			 action = "unresolved";
			 break;
		}
		}	  
		tracking = tmpTrack + " (" + query + ", " + intent +" de " + user +"),";
		conversation.variable("track", tracking);
		conversation.variable("tempQuery", query);
		conversation.reply(tracking);
		conversation.keepTurn(true);
        conversation.transition(action);
        done();
    
	}
};
