import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';

dotenv.config();
let spotifyApi: SpotifyWebApi;

interface AppCredentials {
  clientId: string;
  clientSecret: string;
}

const loadAppCredentials = (): AppCredentials => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing Spotify app credentials');
  }
  return {
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
  }
}

const authorizeSpotify = async () => {
  const { clientId, clientSecret } = loadAppCredentials();
  spotifyApi = new SpotifyWebApi({ clientId, clientSecret });
  const { body } = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(body.access_token);
}

const getTracks = async () => {
  try {
    const { body: { tracks }} = await spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ']
    });
    console.log(tracks);
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await authorizeSpotify();
  await getTracks();
})();
