'use strict';

const tweet = require('./tweet');
const util = require('./util');

module.exports.ask =  (response, convo) => {
    var self = this;
    var oldNews = '';
    var isOldNews = 0;

    let start = (response, convo) => {
        convo.ask('Can I tell you some news?', (response, convo) => {
            console.log('start');              
            if(util.yes(response.text)){                
                whatNews(response, convo);   
                convo.next();             
            }else{
                convo.say('Ok. See you next time');
                convo.stop();
            }
        });
    };

    let whatNews = (response, convo) => {
        convo.ask('What are you interested about?', (response, convo) => {
            //go to twitter find the first tweet about response.text and say it  
            console.log('whatNews')     
            if(response.text){                
                searchTweets(response, convo);           
                convo.next();     
            }else{
                convo.say('I didn\'t get that...');            
                whatNews(response, convo);
                convo.next();            
            }
        });
    };

    let searchTweets = (response, convo) => {
        //console.log(response.text);
        if(response.text === oldNews){
            isOldNews++;
        }else{
            oldNews = response.text;
        }
        tweet
            .search(oldNews, isOldNews)
            .then( (pseudoNews) => { 
                console.log('searchTweets')
                convo.say(pseudoNews);                 
                askNext(response, convo);
                convo.next();
            })
            .catch( (error) => {
                console.log(error); 
                convo.say('I\'m tired now, maybe some other time?'); 
                convo.stop(); 
            });                 
    };

    let askNext = (response, convo) => {
        var continueText = response.text;
        convo.ask('Do you want more news about \''+ continueText + '\'?', (response, convo) => {          
            if(util.yes(response.text)){
                console.log('askNext');
                response.text = continueText;                
                searchTweets(response, convo);
                convo.next();                
            }else{
                convo.say('Ok. see you next time');
                convo.stop();
            }
        });
    };

    start(response, convo);

    convo.on('end', (convo) => {
        
        if (convo.status === 'stopped') {
            console.log('convo stopped');
        }else{
            bot.reply('I am really tired, can we continue this some other time?');
            console.log(convo.status);
        }

    })
};
