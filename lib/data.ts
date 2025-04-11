"use server";

import { cache } from "react";
import SpotifyWebApi from "spotify-web-api-node";

type TokenCache = {
  token: string;
  expiresAt: number;
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Global Variable
declare global {
  var spotifyTokenCache: TokenCache | null;
}

global.spotifyTokenCache = global.spotifyTokenCache || null;

async function getAccessToken(): Promise<string> {
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

async function withValidToken<T>(apiCall: () => Promise<T>): Promise<T> {
  const token = await getAccessToken();

  spotifyApi.setAccessToken(token);

  return apiCall();
}

export const searchArtists = cache(async (query: string) => {
  return withValidToken(() =>
    spotifyApi
      .searchArtists(query)
      .then((data) => data.body.artists?.items || []),
  );
});

export const fetchArtistDetails = cache(async (artistId: string) => {
  return withValidToken(() =>
    spotifyApi.getArtist(artistId).then((data) => data.body),
  );
});

export const fetchArtistAlbums = cache(async (artistId: string) => {
  return withValidToken(() =>
    spotifyApi
      .getArtistAlbums(artistId, { limit: 50 })
      .then((data) => data.body.items),
  );
});

export const fetchArtistPlaylists = cache(async (artistName: string) => {
  return withValidToken(() =>
    spotifyApi
      .searchPlaylists(artistName)
      .then((data) => data.body.playlists?.items || []),
  );
});

export const fetchAlbumDetails = cache(async (albumId: string) => {
  return withValidToken(() =>
    spotifyApi.getAlbum(albumId).then((data) => data.body),
  );
});

export const fetchPlaylistDetails = cache(async (playlistId: string) => {
  return withValidToken(() =>
    spotifyApi.getPlaylist(playlistId).then((data) => data.body),
  );
});
