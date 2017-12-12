let emojiStrip = require('emoji-strip');

const cleanTweets = (tweets) => {
  return tweets.map(tweet => {
    if ('text' in tweet) {
      return {
        content: cleanText(tweet.text),
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

const cleanText = text => {
  let newlineRe = /\n/g;
  let text1 = text.replace(newlineRe, "");
  let linkRe = /(?:https?|ftp):\/\/[\n\S]+/g;
  let text2 = text1.replace(linkRe, "");
  let badCharsRe = /([^a-z0-9 '.!,;]+)/gi;
  return text2.replace(badCharsRe, "");
};

const cleanRedditUserData = data => {
  let rawComments = data.data.children;
  let cleanedData = rawComments.map(comment => ({
    content: cleanText(comment.data.body),
    contenttype: 'text/plain',
    language: 'en',
    id: comment.data.id
  }));
  return cleanedData;
};

module.exports = {
  cleanTweets: cleanTweets,
  cleanRedditUserData: cleanRedditUserData
};
