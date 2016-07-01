# A slackbot 

This slackbot was made for a class in General Assembly

### What does it do?

A slackbot that:

1. Introduces himself and stores the user id so it does not do it again (With themporary storage)
1. Connects to twitter api and responds with tweets the user searchs
1. It will give you the worldwide trending topics

### Commands

1. `tweets`: Tell the bot @bot: 'tweets' and I will give you the tweets you want
1. `trends`: Tell the bot @bot: 'trends' and I will give you the worldwide trends
1. `help`: Tell the bot @bot: 'help' and I will display the help menu"

### Approach

1. It uses direct messages only 
1. It will show you an image when you do @bot help
1. The tweets conversation will continue to give you tweets in the conversation until you stop it
1. Will have the links of the trending topics when you search the trending topics
1. It uses random responses in hello

### Installation Instructions

1. run `npm install`
1. Create a `.env` file and add:
- `SLACKBOT_TOKEN_GA_JS`:GA slackbot api key
- `SLACKBOT_TOKEN_MOISBO`:Your own slackbot api key
- And the nessesary twitter keys and tokens
	- `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`, `TWITTER_ACCESS_TOKEN_KEY`, `TWITTER_ACCESS_TOKEN_SECRET`
1. do `npm start`

### Unsolved Problems

1. Was hard to keep it dry. The botkit API did not responde sometimes if I separate conversations into another file
1. The API says that you have to do convo.next() after each conversation, but seems erratic

