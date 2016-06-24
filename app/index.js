'use strict';

const settings = require('../settings.json');
const Botkit = require('botkit');
const controller = Botkit.slackbot();
const util = require('./util');
const questions = require('./questions')();

var channels = {};
var users = {};
var token = null;

if(settings.dev){
    token = process.env.SLACKBOT_TOKEN_MOISBO
}else{
    token = process.env.SLACKBOT_TOKEN_GA_JS
}
var bot = controller.spawn({
  token: token
});


bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

bot.api.channels.list({'exclude_archived' : 1}, function (err, res) {  
    channels.list = res;
});
bot.api.users.list({'exclude_archived' : 1}, function (err, res) {  
    users = res;
});

controller.hears(['pizzatime'], settings.bot.mentions, function(bot,message) {
    let askFlavor = function(response, convo) {
      convo.ask('What flavor of pizza do you want?', function(response, convo) {
        convo.say('Awesome.');
        askSize(response, convo);
        convo.next();
      });
    };
    let askSize = function(response, convo) {
      convo.ask('What size do you want?', function(response, convo) {          
          var re = new RegExp(/(large)|(extra-large)|(medium)|(small)/);
          if(re.exec(response.text)){
            convo.say('Ok. ' + response.text);
            askWhereDeliver(response, convo);
            convo.next();
          }else{
              convo.say('Hmmm we dont have that... choose between large, extra-large, medium, small');
              askSize(response, convo);
              convo.next();
          }
      });
    };
    let askWhereDeliver = function(response, convo) {
      convo.ask('So where do you want it delivered?', function(response, convo) {
        convo.say('Ok! Good bye.');
        convo.next();
      });
    };

    bot.startConversation(message, askFlavor);
});

controller.hears(['.'], settings.bot.mentions, function(bot, message) {
    var found = users.members.filter(function (user) {     
        return  message.user === user.id;
    });
    var user = found[0];
    if (user && user.name) {
        bot.reply(message, settings.bot.hellos[util.random(5)] + ' ' + user.name );
        //start with random question
        bot.startConversation(message, questions[util.random(questions.length-1)].q);
    }else{
        bot.startConversation(message, function(err, convo) {
            if (!err) {
                convo.say('I do not know your name yet!');
            }
        });
    }
});


