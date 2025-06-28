"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Error from "../../components/error";
import { fetchArtistAlbums, fetchArtistDetails } from "../../lib/data";

import ArtistDetails, {
  ArtistDetailsSkeleton,
} from "@/components/artist/ArtistDetails";
import MusicCollection, {
  MusicCollectionTabsSkeleton,
} from "@/components/artist/MusicCollection";

export default function ArtistPage() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("id");
  const [artist, setArtist] = useState<{ name: string } | null>(null);
  const [musicData, setMusicData] = useState<any>({
    albums: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [artistLoading, setArtistLoading] = useState(true);
  const [musicLoading, setMusicLoading] = useState(true);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);

  useEffect(() => {
    const loadArtistData = async () => {
      if (!artistId) {
        setArtistLoading(false);

        return;
      }

      try {
        const artistData = await fetchArtistDetails(artistId);

        setArtist(artistData);
      } catch (e) {
        setError("Failed to load artist details. Please try again later.");
      } finally {
        setArtistLoading(false);
      }
    };

    loadArtistData();
  }, [artistId]);

  useEffect(() => {
    const loadMusicData = async () => {
      if (!artistId) {
        setMusicLoading(false);

        return;
      }

      try {
        const albums = await fetchArtistAlbums(artistId);

        setMusicData((prevData) => ({ ...prevData, albums }));
        setAlbumsLoaded(true);
      } catch (e) {
        setError("Failed to load albums. Please try again later.");
      } finally {
        setMusicLoading(false);
      }
    };

    if (artist && artist.name && !albumsLoaded) {
      loadMusicData();
    }
  }, [artist, albumsLoaded]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {artistLoading ? (
        <ArtistDetailsSkeleton />
      ) : (
        <ArtistDetails artist={artist} />
      )}

      <Suspense fallback={<MusicCollectionTabsSkeleton />}>
        <MusicCollection albums={musicData.albums} isLoading={musicLoading} />
      </Suspense>
    </div>
  );
}
