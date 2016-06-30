'use strict';

//const settings = require('../settings.json');
const Twitter = require('twitter');

module.exports.search = function (query, isOld) {
    return new Promise(function (resolve, reject) {
        
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        client.get('search/tweets', {q: query}, function(error, tweets, response) {
            if(!error){
                var filtered = tweets.statuses.filter(function (status) {
                    return status.lang === 'en' && status.retweeted === false;
                });                
                var filter = filtered[isOld++] === undefined ? '' : filtered[isOld++];
                resolve(filter);
            }else{      
                reject(error);
            }
        });          
    });
};