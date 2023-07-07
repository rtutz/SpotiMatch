require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const calculateSimilarityScore = require('./pullPython')

app.use(cors());
app.use(express.json());

app.get('/login/link', (req, res) => { 
    const scope = 'user-read-private user-read-email user-top-read user-follow-read playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: "http://localhost:5173/dashboard/profile",
    }));
});

app.post('/login/auth', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: "http://localhost:5173/dashboard/profile",
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
    redirectUri: "http://localhost:5173/dashboard/profile",
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
  const playlist1 = req.body.playlist1;
  const playlist2 = req.body.playlist2;

  try {
    const val = await calculateSimilarityScore(playlist1, playlist2);
    console.log(val);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json(error)
  }
});


app.listen(3000, () => {console.log('listening on port 3000')});