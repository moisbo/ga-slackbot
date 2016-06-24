'use strict';
module.exports = function () {
    return [ 
        {q: function ask(response, convo) {
                convo.ask('Can I tell you a joke?', function(response, convo) {
                    //go to twitter find joke and say it
                    convo.say('Joke.');
                    //askSize(response, convo);
                    convo.next();
                });
            }
        },
        {q: function ask(response, convo) {
                convo.ask('Can I tell you a joke?', function(response, convo) {
                    //go to twitter find joke and say it
                    convo.say('Joke.');
                    //askSize(response, convo);
                    convo.next();
                });
            }
        }
    ];
};