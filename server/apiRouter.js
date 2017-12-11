const express = require('express');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const Twitter = require('twitter');
const axios = require('axios');
const constants = require('./constants');
const utils = require('./utils');

let apiRouter = express.Router();
apiRouter.use(express.urlencoded({
  extended: false
}));
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

apiRouter.get('/twitter/:username', (req, res) => {
  // sendTweetsFromUser(res, req.params.username);
  getTweetsFromUser(res, req.params.username, [], null, 10);
});

apiRouter.get('/reddit/:username', (req, res) => {
  axios.get(`https://www.reddit.com/user/${req.params.username}/comments.json?t=all&limit=100&sort=new`)
    .then(resp => {
      let rawComments = resp.data.data.children;
      let cleanedComments = rawComments.map(comment => ({
        content: comment.data.body,
        contenttype: 'text/plain',
        language: 'en',
        id: comment.data.id
      }));
      sendPersonality(res, cleanedComments);
    })
    .catch(error => {
      console.log(error);
    });
});

const getTweetsFromUser = (res, user, receivedTweets, lastId, count) => {
  if (count <= 0) {
    let cleanedTweets = utils.cleanTweets(receivedTweets);
    sendPersonality(res, cleanedTweets);
    return;
  }
  let params;
  if (lastId) {
    params = {
      screen_name: user,
      include_rts: false,
      max_id: lastId
    }
  }
  else {
    params = {
      screen_name: user,
      include_rts: false
    }
  }
  client.get(
    'statuses/user_timeline',
    params,
    (err, tweets, response) => {
      if (err) {
        console.log(`error: ${JSON.stringify(err)}`);
        res.send({
          error: "User not found"
        });
      }
      else {
        let tweetsResult = [...receivedTweets, ...tweets];
        let lastId = tweetsResult[tweetsResult.length-1].id;
        getTweetsFromUser(res, user, tweetsResult, lastId, count - 1);
      }
    }
  );
};

const sendTweetsFromUser = (res, user) => {
  client.get(
    'statuses/user_timeline',
    {
      screen_name: user,
      include_rts: false
    },
    (err, tweets, response) => {
      if (err) {
        console.log(`error: ${JSON.stringify(err)}`);
        res.send({
          error: "User not found"
        });
      }
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
