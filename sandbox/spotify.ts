import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';
import fs from 'fs';

dotenv.config();
let spotifyApi: SpotifyWebApi;

interface AppCredentials {
  clientId: string;
  clientSecret: string;
}

interface AppTokens {
  accessToken: string;
  refreshToken: string;
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

const loadAppTokens = (): Partial<AppTokens> => {
  const creds = fs.readFileSync('./creds.json');
  const { SPOTIFY_ACCESS_TOKEN, SPOTIFY_REFRESH_TOKEN } = JSON.parse(creds.toString('utf-8'));
  return {
    accessToken: SPOTIFY_ACCESS_TOKEN,
    refreshToken: SPOTIFY_REFRESH_TOKEN,
  }
}

const getSpotifyUrl = async () => {
  const { clientId } = loadAppCredentials();
  spotifyApi = new SpotifyWebApi({ clientId, redirectUri: 'http://www.google.com' });
  const authorizeUrl = spotifyApi.createAuthorizeURL([
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'playlist-modify-public',
  ], 'cats', true);
  console.log(authorizeUrl);
}

const authCodeGrantFlow = async (code: string) => {
  const { clientId, clientSecret } = loadAppCredentials();
  spotifyApi = new SpotifyWebApi({ clientId, clientSecret, redirectUri: 'http://www.google.com' });
  const { body: { access_token, refresh_token } } = await spotifyApi.authorizationCodeGrant(code);
  fs.writeFileSync('./creds.json', JSON.stringify({
    SPOTIFY_ACCESS_TOKEN: access_token,
    SPOTIFY_REFRESH_TOKEN: refresh_token,
  }))
}

interface AuthorizedStatus {
  isAuthorized: boolean
}
const authorizeSpotify = async (): Promise<AuthorizedStatus> => {
  const { clientId, clientSecret } = loadAppCredentials();
  const { accessToken, refreshToken } = loadAppTokens();
  spotifyApi = new SpotifyWebApi({ clientId, clientSecret, redirectUri: 'http://www.google.com' });
  if (!refreshToken) {
    getSpotifyUrl();
    return { isAuthorized: false };
  }
  if (!accessToken) {
    spotifyApi.setRefreshToken(refreshToken);
    const { body: { access_token } } = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(access_token);
    fs.writeFileSync('./creds.json', JSON.stringify({
      SPOTIFY_ACCESS_TOKEN: access_token,
      SPOTIFY_REFRESH_TOKEN: refreshToken,
    }))
    return { isAuthorized: true };
  }
  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);
  return { isAuthorized: true };
}

interface Seeds {
  seedArtists: string[];
  seedTracks: string[];
}

const randomIndexGenerator = (): number[] => {
  return new Array(5).map(() => Math.floor(Math.random() * 10));
}

const getSeedFromUserTopTracks = async (): Promise<Seeds> => {
  try {
    const { body: { items } } = await spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 10 });
    return {
      seedArtists: randomIndexGenerator().map(index => items[index].artists[0].id),
      seedTracks: randomIndexGenerator().map(index => items[index].id),
    }
  } catch (err) {
    console.log('getSeedFromUserTopTracks error');
    throw new Error(err);
  }
}

const getTrackVibesFromTone = async () => {

}

const getTracks = async () => {
  // 10 tracks
  // get seed information from top tracks
  // get recommendation settings from map
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
  const { isAuthorized } = await authorizeSpotify();
  if (!isAuthorized) {
    await authCodeGrantFlow('');
  }
  if (isAuthorized) {
    await getSeedFromUserTopTracks();
  }
})();
