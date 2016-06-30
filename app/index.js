'use strict';

const settings = require('../settings.json');
const Botkit = require('botkit');
const controller = Botkit.slackbot();
const util = require('./util');
const tweet = require('./tweet');

var channels = {};
var users = {};
var token = null;

if(settings.dev){
    require('dotenv').config();
    token = process.env.SLACKBOT_TOKEN_MOISBO
}else{
    token = process.env.SLACKBOT_TOKEN_GA_JS
}
var bot = controller.spawn({
  token: token
});

bot.startRTM((error, whichBot, payload) => {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

bot.api.channels.list({'exclude_archived' : 1}, (err, res) => {  
    channels.list = res;
});

bot.api.users.list({'exclude_archived' : 1}, (err, res) => {  
    users = res;
});

controller.hears(['help'], settings.bot.mentions, (bot, message) => {    
    settings.bot.help.forEach((h, i)=>{
        bot.reply(message, i+1 + '. ' + h);
    });
    let msg = {
      text: "Help Menu:",
      "attachments": [
            {
                "fallback": "This bot is powered by Twitter",
                "title": "This bot is powered by Twitter",
                "image_url": "https://g.twimg.com/Twitter_logo_blue.png",
                "color": "#764FA5"
            }
        ]   
    }
    bot.reply(message, msg);
});

controller.hears(['.'], settings.bot.mentions, (bot, message) => {
    var thisChannel = message.channel;
    var found = users.members.filter( (user) => {     
        return  message.user === user.id;
    });
    var userFound = found[0];
    if (userFound && userFound.name) {
        //find in store
        controller.storage.users.get(userFound.id, (err, user) => { 
            if(!user){
                console.log('new user');
                user = { id: userFound.id, name: userFound.name };                
                controller.storage.users.save(user, (err, id) => {
                    bot.reply(message, 'Hi, ' + user.name + ' let me introduce myself.')
                    bot.reply(message, settings.bot.iam);
                    settings.bot.help.forEach((h, i)=>{
                        bot.reply(message, i+1 + '. ' + h);
                    })
                });                  
            }else{
                console.log('old user');
                bot.reply(message, settings.bot.hellos[util.random(5)] + ' ' + user.name );
                var oldNews = '';
                var isOldNews = 0;
                bot.startConversation(message, (response, convo) => {
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
                
                    let whatNews = (response, convo) => {
                        convo.ask('What are you interested about?', (response, convo) => {
                            //go to twitter find the first tweet about response.text and say it  
                            console.log('whatNews')     
                            if(response.text){                
                                searchTweets(response, convo);           
                                //convo.next();     
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

                    convo.on('end', (convo) => {
                        
                        if (convo.status === 'stopped') {
                            console.log('convo stopped');
                            bot.say({text: 'Ok. See you next time', channel: thisChannel});
                        }else{           
                            bot.say({text: 'I am really tired, We\'ll continue this some other time...', channel: thisChannel});
                            console.log(convo.status);
                        }
                    });
                });
            }
        });
    }
});
        
