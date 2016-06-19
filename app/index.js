'use strict';

var Botkit = require('botkit');
var controller = Botkit.slackbot();

var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
});

bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

bot.api.channels.list({'exclude_archived' : 1}, function (err, res) {  
    console.log(res);
});

controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Did you say my name?');
});

controller.hears(['.'], ['direct_mention'], function(whichBot, message) {
  whichBot.reply(message, 'How can I help?');
});

controller.on('slash_command',function(whichBot, message) {
    whichBot.replyPublic(message,'Everyone can see this part of the slash command');
    whichBot.replyPrivate(message,'Only the person who used the slash command can see this.');
});

controller.hears(['pizzatime'], ['mention'], function(bot,message) {
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

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        }else{
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                }
            });
        }
    });
});


