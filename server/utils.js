const cleanTweets = (tweets) => {
  return tweets.map(tweet => {
    if ('text' in tweet) {
      return {
        content: tweet.text,
        contenttype: 'text/plain',
        language: 'en',
        id: tweet.id.toString()
      };
    }
    else {
      return {
        text: ""
      };
    }
  });
};

module.exports = {
  cleanTweets: cleanTweets
};
