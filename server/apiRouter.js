const express = require('express');
const constants = require('./constants');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

let apiRouter = express.Router();
apiRouter.use(express.urlencoded());

const personality_insights = new PersonalityInsightsV3({
  username: constants.USERNAME,
  password: constants.PASSWORD,
  version_date: '2016-10-19'
});

apiRouter.post('/personality', (req, res) => {
  personality_insights.profile(
    {
      text: req.body.text,
      consumption_preferences: true
    },
    (err, response) => {
      if (err) console.log(`error: ${err}`);
      else res.send(JSON.stringify(response, null, 2));
    }
  )
});

module.exports = apiRouter;
