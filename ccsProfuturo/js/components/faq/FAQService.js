"use strict";

const DATA_ROOT = './data/';

const FAQS = require(DATA_ROOT + 'faqs.json');

module.exports = {
    answerFor: (question) => {
        if (FAQS.hasOwnProperty(question)) {
            return FAQS[question];
        }
        else {
            return 'No tengo respuesta para eso';
        }
    }
}
