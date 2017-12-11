export const getTwitterPersonality = (username, onComplete) => {
  let myParams = {
    headers: new Headers({
      "Content-Type": 'application/x-www-form-urlencoded'
    })
  };
  return fetch(`/api/twitter/${username}`, myParams)
    .then(res => {
      return res.json();
    })
    .then(data => {
      onComplete(data);
      return;
    });
}

export const getRedditPersonality = (username, onComplete) => {
  let myParams = {
    headers: new Headers({
      "Content-Type": 'application/x-www-form-urlencoded'
    })
  };
  return fetch(`/api/reddit/${username}`, myParams)
    .then(res => {
      return res.json();
    })
    .then(data => {
      onComplete(data);
      return;
    });
}
