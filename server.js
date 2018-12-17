const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
  consumer_key: 'kf1yq3DIeDFzL3D2HkJRc7Rg0',
  consumer_secret: 'X4UHEjrCZOQt70XQtvW6GLMj54YGOpsnr62wHeXymaT9LMdAzk',
  access_token: '1073008654050299905-OKuIZB7PFiTxTaGqUn4xyZrXxb4uHL',
  access_token_secret: 'ls6eh9iKybdF66RJ3KwTnBt9SqTfK4HoxbZ8t4be6NVTq'
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/user', (req, res) => {
  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

let cache = [];
let cacheAge = 0;

app.get('/api/home', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    // cacheAge = Date.now();
    // const params = { tweet_mode: 'extended', count: 200 };
    // if (req.query.since) {
    //   params.since_id = req.query.since;
    // }
    client
      // .get(`statuses/home_timeline`, params)
      .get(`statuses/home_timeline`)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});
//
// app.post('/api/favorite/:id', (req, res) => {
//   const path = req.body.state ? 'create' : 'destroy';
//   client
//     .post(`favorites/${path}`, { id: req.params.id })
//     .then(tweet => res.send(tweet))
//     .catch(error => res.send(error));
// });

// app.post('/api/retweet/:id', (req, res) => {
//   const path = req.body.state ? 'retweet' : 'unretweet';
//   client
//     .post(`statuses/retweet/${req.params.id}`)
//     .then(tweet => res.send(tweet))
//     .catch(error => res.send(error));
// });

app.listen(3000, () => console.log('Server running'));
