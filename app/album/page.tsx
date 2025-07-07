import { TrackTable } from "@/app/album/components/TrackTable";
import Error from "@/components/error";
import { RecordIcon } from "@/components/icons";
import { fetchAlbumDetails } from "@/lib/data";
import { formatDate } from "@/lib/formatters";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Image from "next/image";
import Link from "next/link";

interface AlbumPageProps {
  searchParams: Promise<{ id?: string }>;
}

function AlbumHeader({ album }: { album: any }) {
  if (!album) return null;

  const releaseDate = new Date(album.release_date);
  const formattedDate = formatDate(releaseDate);

  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {album.images && album.images.length > 0 ? (
          <Image
            alt={album.name}
            className="aspect-square w-full flex-shrink-0 object-cover sm:w-64"
            height={256}
            src={album.images[0].url}
            width={256}
          />
        ) : (
          <div className="flex aspect-square h-64 w-64 items-center justify-center bg-default-200">
            <RecordIcon />
          </div>
        )}
        <CardBody className="flex flex-col justify-between p-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{album.name}</h1>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold">By: </span>
              {album.artists.map((artist: any, index: number) => (
                <span key={artist.id}>
                  <Link
                    className="text-primary hover:underline"
                    href={`/artist?id=${artist.id}`}
                  >
                    {artist.name}
                  </Link>
                  {index < album.artists.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
            <p className="mb-4 text-default-600">
              Release date: {formattedDate}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat">
              {album.album_type.charAt(0).toUpperCase() +
                album.album_type.slice(1)}
            </Chip>
            <Chip color="secondary" variant="flat">
              {album.total_tracks}{" "}
              {album.total_tracks === 1 ? "track" : "tracks"}
            </Chip>
            {album.genres &&
              album.genres.length > 0 &&
              album.genres.map((genre: string) => (
                <Chip key={genre} color="default" variant="flat">
                  {genre}
                </Chip>
              ))}
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

async function AlbumContent({ albumId }: { albumId: string }) {
  try {
    const album = await fetchAlbumDetails(albumId);

    return (
      <div>
        <AlbumHeader album={album} />
        {album?.tracks?.items && <TrackTable tracks={album.tracks.items} />}
      </div>
    );
  } catch (error) {
    return <Error error={error} />;
  }
}

export default async function AlbumPage({ searchParams }: AlbumPageProps) {
  const params = await searchParams;
  const albumId = params?.id;

  if (!albumId) {
    return <Error error="No album ID provided!" />;
  }

  return (
    <div className="container mx-auto">
      <AlbumContent albumId={albumId} />
    </div>
  );
}
