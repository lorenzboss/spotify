import SpotifyWebApi from "spotify-web-api-node";

type TokenCache = {
  token: string;
  expiresAt: number;
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

declare global {
  var spotifyTokenCache: TokenCache | null;
}

global.spotifyTokenCache = global.spotifyTokenCache || null;

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (global.spotifyTokenCache && global.spotifyTokenCache.expiresAt > now) {
    return global.spotifyTokenCache.token;
  }

  try {
    const data = await spotifyApi.clientCredentialsGrant();
    const token = data.body.access_token;
    const expiresIn = data.body.expires_in;

    global.spotifyTokenCache = {
      token,
      expiresAt: now + expiresIn * 1000 - 60000,
    };

    spotifyApi.setAccessToken(token);

    return token;
  } catch (error) {
    console.error("Error retrieving the access token:", error);
    throw new Error("Could not retrieve access token");
  }
}

export async function withValidToken<T>(apiCall: () => Promise<T>): Promise<T> {
  const token = await getAccessToken();

  spotifyApi.setAccessToken(token);

  return apiCall();
}

export { spotifyApi };
