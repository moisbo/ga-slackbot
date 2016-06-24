'use strict';

//const settings = require('../settings.json');
const Twitter = require('twitter');

module.exports.search = function (query) {
    return new Promise(function (resolve, reject) {
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        client.get('search/tweets', {q: query}, function(error, tweets, response) {
            if(!error){
                resolve(tweets);
            }else{      
                reject(error);
            }
        });          
    });
};