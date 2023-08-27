require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const calculateSimilarityScore = require('./pullPython');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get('/login/link', (req, res) => { 
    const scope = 'user-read-private user-read-email user-top-read user-follow-read playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      // redirect_uri: "http://localhost:5173/dashboard/profile",
      redirect_uri: "https://spotimatch.netlify.app/dashboard/profile",
    }));
});

app.post('/login/auth', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // redirectUri: "http://localhost:5173/dashboard/profile",
      redirectUri: "https://spotimatch.netlify.app/dashboard/profile",
    });

    spotifyApi.authorizationCodeGrant(code).then(
      (data) => {
        res.send({
          access_token: data.body['access_token'],
          refresh_token: data.body['refresh_token'],
          expires_in: data.body['expires_in'],
        })
      }
    ).catch (error => {
      res.send(error).status(500); 
    })
});

app.post('/login/refresh', (req, res) => {
  const refresh_token = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // redirectUri: "http://localhost:5173/dashboard/profile",
    redirectUri: "https://spotimatch.netlify.app/dashboard/profile",
    refreshToken: refresh_token,
  });



  spotifyApi.refreshAccessToken().then(
      (data) => {
        res.send({
          access_token: data.body['access_token'],  
          expires_in: data.body['expires_in'],
        })
      })
})

app.post('/calculate', async (req, res) => {
  const playlist1 = req.body.playlist1.audio_features;
  const playlist2 = req.body.playlist2.audio_features;
  try {
    const val = await calculateSimilarityScore(playlist1, playlist2);
    console.log("VAL RECEIVED ", val);
    res.json(val);
  } catch (error) {
    console.log("ERROR IN COMPATABILITY SCORE");
    console.error(error);
    res.json(error)
  }
});




app.listen(3000);