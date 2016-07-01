'use strict';

const Twitter = require('twitter');
//var inspect = require('util').inspect;

module.exports.search =  (query, isOld) => {
    return new Promise( (resolve, reject) => {
        
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        client.get('search/tweets', {q: query}, (error, tweets) => {
            if(!error){
                var filtered = tweets.statuses.filter( (status) => {
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

module.exports.trends = (query) => {
    return new Promise( (resolve, reject) => {
        
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        client.get('trends/place', {id: query}, (error, trend) => {
            //console.log(error);
            //console.log(inspect(trends[0].trends, false, null));
            //console.log(response);            
            /** Trend result object example
             *  name: '#En6MesesPeñalosa',
                url: 'http://twitter.com/search?q=%23En6MesesPe%C3%B1alosa',
                promoted_content: null,
                query: '%23En6MesesPe%C3%B1alosa',
                tweet_volume: null } 
            */
            if(!error){
                let trends = [];
                trend[0].trends.forEach((trend)=>{   
                    if(!trend.promoted_content){         
                        trends.push({
                            "title": trend.name,
                            "title_link": trend.url,
                            "color": "#764FA5"
                        });
                    }
                });
                resolve(trends);
            }else{      
                reject(error);
            }
        });          
    });
};

