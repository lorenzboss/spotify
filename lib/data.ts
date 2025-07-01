"use server";

import { cache } from "react";
import { spotifyApi, withValidToken } from "./token";

export const fetchArtists = cache(async (query: string) => {
  return withValidToken(() => {
    return spotifyApi
      .searchArtists(query)
      .then((data) => data.body.artists?.items || []);
  });
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

export const fetchAlbumDetails = cache(async (albumId: string) => {
  return withValidToken(() =>
    spotifyApi.getAlbum(albumId).then((data) => data.body),
  );
});
