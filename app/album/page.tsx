"use client";

import { formatDuration } from "@/lib/formatters";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Error from "../../components/error";
import { fetchAlbumDetails } from "../../lib/data";

// Album Header Skeleton Component
function AlbumHeaderSkeleton() {
  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-64 w-64 flex-shrink-0" />
        <CardBody className="flex flex-col justify-between p-6">
          <div>
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-2 h-6 w-1/2" />
            <Skeleton className="mb-4 h-4 w-1/3" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

// Album Header Component
function AlbumHeader({ album }) {
  if (!album) return null;

  // Format release date
  const releaseDate = new Date(album.release_date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(releaseDate);

  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {album.images && album.images.length > 0 ? (
          <img
            src={album.images[0].url}
            alt={album.name}
            className="h-64 w-64 flex-shrink-0 object-cover"
          />
        ) : (
          <div className="flex h-64 w-64 items-center justify-center bg-default-200">
            <svg
              className="h-16 w-16 text-default-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
            </svg>
          </div>
        )}
        <CardBody className="flex flex-col justify-between p-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{album.name}</h1>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold">By: </span>
              {album.artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link
                    href={`/artist?id=${artist.id}`}
                    className="text-primary hover:underline"
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
              album.genres.map((genre) => (
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

// Track Table Skeleton Component
function TrackTableSkeleton() {
  return (
    <Card>
      <CardBody>
        <Skeleton className="mb-4 h-8 w-1/4" />
        <Table aria-label="Loading tracks">
          <TableHeader>
            <TableColumn>TRACK</TableColumn>
            <TableColumn>ARTISTS</TableColumn>
            <TableColumn>DURATION</TableColumn>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

// Track Table Component
function TrackTable({ tracks }) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  // Sort tracks based on the current sort descriptor
  const sortedTracks = [...tracks].sort((a, b) => {
    // Default sorting (track number)
    if (sortDescriptor.column === "") {
      return a.track_number - b.track_number;
    }

    // Duration sorting
    if (sortDescriptor.column === "duration") {
      const result = a.duration_ms - b.duration_ms;
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    // Name column behaves like default (track number) sort
    if (sortDescriptor.column === "name") {
      const result = a.track_number - b.track_number;
      return sortDescriptor.direction === "ascending" ? result : -result;
    }

    return 0;
  });

  return (
    <Card>
      <Table
        aria-label="Album tracks"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            TRACK
          </TableColumn>
          <TableColumn key="artists">ARTISTS</TableColumn>
          <TableColumn key="duration" allowsSorting>
            DURATION
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedTracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-semibold text-default-400">
                    {track.track_number}.
                  </span>
                  <span>{track.name}</span>
                  {track.explicit && (
                    <Chip size="sm" color="danger" variant="flat">
                      E
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {track.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <Link
                        href={`/artist?id=${artist.id}`}
                        className="text-primary hover:underline"
                      >
                        {artist.name}
                      </Link>
                      {index < track.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatDuration(track.duration_ms)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Main Component
export default function AlbumPage() {
  const searchParams = useSearchParams();
  const albumId = searchParams.get("id");
  const [album, setAlbum] = useState<{ tracks?: { items: any[] } } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAlbumData = async () => {
      if (!albumId) {
        setIsLoading(false);
        setError("No album ID provided");
        return;
      }

      try {
        const albumData = await fetchAlbumDetails(albumId);
        setAlbum(albumData);
      } catch (error) {
        setError("Failed to load album details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbumData();
  }, [albumId]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<AlbumHeaderSkeleton />}>
        {isLoading ? <AlbumHeaderSkeleton /> : <AlbumHeader album={album} />}
      </Suspense>

      <Suspense fallback={<TrackTableSkeleton />}>
        {isLoading ? (
          <TrackTableSkeleton />
        ) : (
          album?.tracks?.items && <TrackTable tracks={album.tracks.items} />
        )}
      </Suspense>
    </div>
  );
}
