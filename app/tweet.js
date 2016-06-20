'use strict';

//const settings = require('../settings.json');
const Twitter = require('twitter');

module.exports.search = function (query, cb) {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    if(client.options.consumer_key != undefined){
        client.get('search/tweets', {q: query}, function(error, tweets, response) {
            var separator = "============";
            if(!error){
                //console.log(separator);
                //console.log(response);
                console.log(separator);
                console.log(tweets);
                cb(tweets);
            }else{
                console.log(separator);
                console.log(error);       
                cb(null);
            }
        });
    }else{
        cb(null);
    }
};