import Error from "../../components/error";
import { fetchArtistAlbums, fetchArtistDetails } from "../../lib/data";
import ArtistDetails from "./components/ArtistDetails";
import MusicCollection from "./components/MusicCollection";

interface ArtistPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ArtistPage({ searchParams }: ArtistPageProps) {
  const params = await searchParams;
  const artistId = params?.id;

  if (!artistId) {
    return <Error error="No artist ID provided!" />;
  }

  // Fetch artist details and albums concurrently
  const [artistData, albumsData] = await Promise.allSettled([
    fetchArtistDetails(artistId),
    fetchArtistAlbums(artistId),
  ]);

  const artist = artistData.status === "fulfilled" ? artistData.value : null;
  const albums = albumsData.status === "fulfilled" ? albumsData.value : [];

  if (!artist) {
    return <Error error="Artist not found!" />;
  }

  return (
    <div className="container mx-auto">
      <ArtistDetails artist={artist} />
      <MusicCollection albums={albums} />
    </div>
  );
}
