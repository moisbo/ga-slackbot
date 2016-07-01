'use strict';

const settings = require('../settings.json');

module.exports.random = (max) => {
    return Math.floor(Math.random() * (max-1)) + 1;
};

module.exports.yes = (text) => {
    var re = new RegExp(settings.bot.yes);
    if(re.exec(text)){
        return true;
    }else {
        return false;
    }
};