export const getTwitterPersonality = (username, onComplete) => {
  let myParams = {
    method: 'POST',
    headers: new Headers({
      "Content-Type": 'application/x-www-form-urlencoded'
    }),
    body: `text=${username}`
  };
  return fetch('/api/personality', myParams)
    .then(res => {
      return res.json();
    })
    .then(data => {
      onComplete(data);
      return;
    });
}
