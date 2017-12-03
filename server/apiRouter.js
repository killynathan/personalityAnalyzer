const express = require('express');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const Twitter = require('twitter');
const constants = require('./constants');
const utils = require('./utils');

let apiRouter = express.Router();
apiRouter.use(express.urlencoded());
apiRouter.use(express.json());
apiRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const personality_insights = new PersonalityInsightsV3({
  username: constants.WATSON_USERNAME,
  password: constants.WATSON_PASSWORD,
  version_date: '2016-10-19'
});

const client = new Twitter({
  consumer_key: constants.TWITTER_CONSUMER_KEY,
  consumer_secret: constants.TWITTER_CONSUMER_SECRET,
  bearer_token: constants.TWITTER_BEARER_TOKEN
});

apiRouter.post('/personality', (req, res) => {
  sendTweetsFromUser(res, req.body.text);
});

// apiRouter.post('/personality', (req, res) => {
//   sendPersonality(req.body.text, res);
// });

const sendTweetsFromUser = (res, user) => {
  client.get(
    'statuses/user_timeline',
    {
      screen_name: user,
      include_rts: false
    },
    (err, tweets, response) => {
      if (err) console.log(`error: ${err}`);
      else {
        let tweetsResult = tweets;
        let lastId = tweetsResult[tweetsResult.length-1].id;

        client.get(
          'statuses/user_timeline',
          {
            screen_name: user,
            include_rts: false,
            max_id: lastId
          },
          (err, tweets, response) => {
            if (err) console.log(`error: ${err}`);
            else {
              tweetsResult = [...tweetsResult, ...tweets];
              let lastId = tweetsResult[tweetsResult.length-1].id;

              client.get(
                'statuses/user_timeline',
                {
                  screen_name: user,
                  include_rts: false,
                  max_id: lastId
                },
                (err, tweets, response) => {
                  if (err) console.log(`error: ${err}`);
                  else {
                    tweetsResult = [...tweetsResult, ...tweets];
                    let lastId = tweetsResult[tweetsResult.length-1].id;

                    // res.send(JSON.stringify(utils.cleanTweets(tweetsResult), null, 2));
                    let cleanedTweets = utils.cleanTweets(tweetsResult);
                    // res.send(JSON.stringify(cleanedTweets));
                    sendPersonality(res, cleanedTweets);
                  }
              });
            }
        });
      }
    });
}
//res.send(JSON.stringify(utils.cleanTweets(tweets), null, 2));
const sendPersonality = (res, data) => {
  let params = {
    content_items: data,
    consumption_preferences: true,
    raw_scores: true,
    headers: {
      'accept-language': 'en',
      'accept': 'application/json'
    }
  };
  personality_insights.profile(params, (err, response) => {
      if (err) console.log(`error: ${err}`);
      else res.send(JSON.stringify(response, null, 2));
    }
  )
}

module.exports = apiRouter;
